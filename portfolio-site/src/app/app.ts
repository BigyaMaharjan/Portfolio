import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  HostListener,
  OnDestroy,
  ViewChild,
  effect,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { filter } from 'rxjs';
import { animate, type JSAnimation } from 'animejs';
import { MotionPreferenceService } from './core/motion-preference.service';
import { SiteRevealService } from './core/site-reveal.service';
import { ThemePreferenceService } from './core/theme-preference.service';
import { profile } from './data/profile.data';
import { projects } from './data/projects.data';

@Component({
  selector: 'app-root',
  imports: [RouterLink, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App implements OnDestroy {
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private readonly pageTitle = inject(Title);
  private readonly meta = inject(Meta);
  readonly themePreference = inject(ThemePreferenceService);
  readonly motionPreference = inject(MotionPreferenceService);
  private readonly siteReveal = inject(SiteRevealService);
  readonly siteRevealed = this.siteReveal.revealed;
  readonly profile = profile;
  readonly menuOpen = signal(false);
  readonly compactHeader = signal(false);
  readonly copyStatus = signal('');
  readonly showInitialLoader = signal(true);
  readonly initialLoaderComplete = signal(false);
  readonly initialLoaderExpanding = signal(false);
  readonly loaderProgress = signal(0);
  readonly scrollProgress = signal(0);
  readonly currentYear = new Date().getFullYear();

  @ViewChild('primaryNav') private primaryNav?: ElementRef<HTMLElement>;
  @ViewChild('menuButton') private menuButton?: ElementRef<HTMLButtonElement>;

  private initialNavigationResolved = false;
  private resolveInitialNavigation: (() => void) | undefined;
  private readonly initialNavigationReady = new Promise<void>((resolve) => {
    this.resolveInitialNavigation = resolve;
  });
  private progressTimer?: number;
  private expansionFallback?: number;

  // --- scroll progress bar & cursor follower ---
  private mouseX = 0;
  private mouseY = 0;
  private cursorX = 0;
  private cursorY = 0;
  private targetScale = 1;
  private scaleT = 1;
  private loaderAnim?: JSAnimation;
  private cursorRafId?: number;

  @ViewChild('cursorFollower', { static: true })
  private cursorFollower?: ElementRef<HTMLDivElement>;

  constructor() {
    effect(() => {
      this.meta.updateTag({
        name: 'theme-color',
        content: this.themePreference.theme() === 'dark' ? '#111817' : '#f4f7f5',
      });
    });

    this.updatePageMetadata(this.router.url);
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((event) => {
        this.markInitialNavigationReady();
        this.closeMenu();
        this.updatePageMetadata(event.urlAfterRedirects);
        this.scrollToFragment(event.urlAfterRedirects);
      });

    if (this.router.navigated) {
      this.markInitialNavigationReady();
    }

    // --- cursor visibility (hidden with reduced motion / on touch) ---
    effect(() => {
      const show =
        !this.motionPreference.reducedMotion() && window.matchMedia('(pointer: fine)').matches;
      document.documentElement.style.setProperty('--cursor-visible', show ? 'visible' : 'hidden');
    });

    void this.startInitialLoader();
  }

  @HostListener('window:scroll')
  updateHeaderState(): void {
    this.compactHeader.set(window.scrollY > 12);
    const max = document.documentElement.scrollHeight - window.innerHeight;
    this.scrollProgress.set(max <= 0 ? 0 : Math.min(100, (window.scrollY / max) * 100));
  }

  @HostListener('document:keydown', ['$event'])
  handleDocumentKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape' && this.menuOpen()) {
      this.closeMenu(true);
      return;
    }

    if (
      event.key !== 'Tab' ||
      !this.menuOpen() ||
      !window.matchMedia('(max-width: 900px)').matches
    ) {
      return;
    }

    const focusable = Array.from(
      this.primaryNav?.nativeElement.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      ) ?? [],
    );
    const first = focusable[0];
    const last = focusable.at(-1);

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  }

  toggleMenu(): void {
    if (this.menuOpen()) {
      this.closeMenu(true);
      return;
    }

    this.menuOpen.set(true);
    setTimeout(() => this.primaryNav?.nativeElement.querySelector('a')?.focus(), 0);
  }

  closeMenu(returnFocus = false): void {
    if (!this.menuOpen()) {
      return;
    }

    this.menuOpen.set(false);
    if (returnFocus) {
      setTimeout(() => this.menuButton?.nativeElement.focus(), 0);
    }
  }

  // --- cursor follower ---
  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    this.mouseX = event.clientX;
    this.mouseY = event.clientY;
    this.startCursorLoop();
  }

  @HostListener('document:mouseleave')
  onMouseLeave(): void {
    this.targetScale = 1;
    if (this.cursorRafId !== undefined) {
      cancelAnimationFrame(this.cursorRafId);
      this.cursorRafId = undefined;
    }
  }

  @HostListener('document:mouseover', ['$event'])
  onMouseOver(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (target.closest('a[href], button, [role="button"]')) {
      this.targetScale = 1.67;
    }
  }

  @HostListener('document:mouseout', ['$event'])
  onMouseOut(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (target.closest('a[href], button, [role="button"]')) {
      this.targetScale = 1;
    }
  }

  @HostListener('document:mousedown')
  onMouseDown(): void {
    this.targetScale = 0.7;
  }

  @HostListener('document:mouseup')
  onMouseUp(): void {
    this.targetScale = 1;
  }

  private startCursorLoop(): void {
    const cursorEl = this.cursorFollower?.nativeElement;
    if (!cursorEl || this.cursorRafId !== undefined) {
      return;
    }
    const loop = () => {
      this.cursorX += (this.mouseX - this.cursorX) * 0.15;
      this.cursorY += (this.mouseY - this.cursorY) * 0.15;
      this.scaleT += (this.targetScale - this.scaleT) * 0.2;
      cursorEl.style.transform = `translate(${this.cursorX.toFixed(2)}px, ${this.cursorY.toFixed(2)}px) translate(-50%, -50%) scale(${this.scaleT.toFixed(3)})`;
      this.cursorRafId = requestAnimationFrame(loop);
    };
    this.cursorRafId = requestAnimationFrame(loop);
  }

  async copyEmail(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.profile.email);
      this.copyStatus.set('Email copied');
    } catch {
      this.copyStatus.set('Copy unavailable. Email: ' + this.profile.email);
    }
  }

  handleLoaderTransition(event: TransitionEvent): void {
    if (!(event.target instanceof HTMLElement)) {
      return;
    }

    if (
      !this.initialLoaderExpanding() &&
      event.target.classList.contains('initial-loader__fill') &&
      event.propertyName === 'width' &&
      this.loaderProgress() === 100
    ) {
      this.initialLoaderExpanding.set(true);
      this.expandLoaderWithAnime();
      return;
    }
  }

  ngOnDestroy(): void {
    if (this.progressTimer !== undefined) {
      window.clearInterval(this.progressTimer);
    }
    if (this.expansionFallback !== undefined) {
      window.clearTimeout(this.expansionFallback);
    }
    if (this.cursorRafId !== undefined) {
      cancelAnimationFrame(this.cursorRafId);
    }
    this.loaderAnim?.cancel();
  }

  private expandLoaderWithAnime(): void {
    const root = document.documentElement;
    const accent = getComputedStyle(root).getPropertyValue('--accent').trim();
    const progressEl = document.querySelector<HTMLElement>('.initial-loader__progress');
    if (!progressEl) {
      return;
    }

    this.loaderAnim?.cancel();
    this.loaderAnim = animate(progressEl, {
      width: { to: '100vw', duration: 760, ease: 'outExpo' },
      height: { to: '100dvh', duration: 760, ease: 'outExpo' },
      borderRadius: { to: '0', duration: 760, ease: 'outExpo' },
      backgroundColor: { to: accent, duration: 300, ease: 'linear' },
      onComplete: () => {
        this.revealSiteOverlay();
      },
    });
  }

  private revealSiteOverlay(): void {
    this.siteReveal.reveal();

    const overlay = document.querySelector<HTMLElement>('.initial-loader');
    if (!overlay) {
      this.finishInitialLoader();
      return;
    }

    this.loaderAnim?.cancel();
    this.loaderAnim = animate(overlay, {
      opacity: [1, 0],
      duration: 500,
      ease: 'out(2)',
      onComplete: () => {
        this.finishInitialLoader();
      },
    });
  }

  private async startInitialLoader(): Promise<void> {
    const startedAt = performance.now();
    this.progressTimer = window.setInterval(() => {
      this.loaderProgress.update((progress) => Math.min(progress + 3, 92));
    }, 110);

    try {
      const response = await fetch(new URL('env.json', document.baseURI), { cache: 'no-store' });
      if (response.ok) {
        const config = (await response.json()) as { showInitialLoader?: boolean };
        this.showInitialLoader.set(config.showInitialLoader ?? true);
      }
    } catch {
      this.showInitialLoader.set(true);
    }

    if (!this.showInitialLoader() || this.motionPreference.reducedMotion()) {
      this.finishInitialLoader();
      return;
    }

    await Promise.all([this.initialNavigationReady, document.fonts?.ready ?? Promise.resolve()]);

    const remainingDisplayTime = 1200 - (performance.now() - startedAt);
    if (remainingDisplayTime > 0) {
      await new Promise<void>((resolve) => window.setTimeout(resolve, remainingDisplayTime));
    }

    if (this.motionPreference.reducedMotion()) {
      this.finishInitialLoader();
      return;
    }

    if (this.progressTimer !== undefined) {
      window.clearInterval(this.progressTimer);
      this.progressTimer = undefined;
    }

    this.loaderProgress.set(100);
    this.expansionFallback = window.setTimeout(() => {
      if (!this.initialLoaderExpanding()) {
        this.expandLoaderWithAnime();
      }
    }, 500);
  }

  private markInitialNavigationReady(): void {
    if (this.initialNavigationResolved) {
      return;
    }

    this.initialNavigationResolved = true;
    this.resolveInitialNavigation?.();
    this.resolveInitialNavigation = undefined;
  }

  private finishInitialLoader(): void {
    if (this.progressTimer !== undefined) {
      window.clearInterval(this.progressTimer);
      this.progressTimer = undefined;
    }
    if (this.expansionFallback !== undefined) {
      window.clearTimeout(this.expansionFallback);
      this.expansionFallback = undefined;
    }

    this.siteReveal.reveal();
    this.initialLoaderComplete.set(true);
  }

  private updatePageMetadata(url: string): void {
    let route = this.router.routerState.snapshot.root;
    while (route.firstChild) {
      route = route.firstChild;
    }

    const project = route.paramMap.get('slug');
    const caseStudy = project ? projects.find((item) => item.slug === project) : undefined;
    const pageTitle = caseStudy
      ? `${caseStudy.name} — Case Study | ${profile.name}`
      : (route.title ?? 'Bigya Maharjan — Backend Software Developer');
    const description =
      caseStudy?.oneLiner ??
      (route.data['description'] as string) ??
      'Bigya Maharjan is a backend software developer building systems with C# and .NET.';
    const canonicalPath = url.split(/[?#]/, 1)[0] || '/';
    const canonicalUrl = new URL(canonicalPath, window.location.origin).href;

    this.pageTitle.setTitle(pageTitle);
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ property: 'og:title', content: pageTitle });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:url', content: canonicalUrl });
    document
      .querySelector<HTMLLinkElement>('link[rel="canonical"]')
      ?.setAttribute('href', canonicalUrl);
  }

  private scrollToFragment(url: string): void {
    const fragment = url.split('#')[1];
    if (!fragment) {
      return;
    }

    setTimeout(() => {
      const target = document.getElementById(decodeURIComponent(fragment));
      if (!target) {
        return;
      }

      const headerHeight =
        document.querySelector('.site-header')?.getBoundingClientRect().height ?? 0;
      const targetTop = target.getBoundingClientRect().top + window.scrollY - headerHeight;
      window.scrollTo({ top: Math.max(0, targetTop), behavior: 'instant' });
    }, 0);
  }
}
