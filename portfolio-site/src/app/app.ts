import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  HostListener,
  ViewChild,
  effect,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { filter } from 'rxjs';
import { MotionPreferenceService } from './core/motion-preference.service';
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
export class App {
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private readonly pageTitle = inject(Title);
  private readonly meta = inject(Meta);
  readonly themePreference = inject(ThemePreferenceService);
  readonly motionPreference = inject(MotionPreferenceService);
  readonly profile = profile;
  readonly menuOpen = signal(false);
  readonly compactHeader = signal(false);
  readonly copyStatus = signal('');
  readonly currentYear = new Date().getFullYear();

  @ViewChild('primaryNav') private primaryNav?: ElementRef<HTMLElement>;
  @ViewChild('menuButton') private menuButton?: ElementRef<HTMLButtonElement>;

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
        this.closeMenu();
        this.updatePageMetadata(event.urlAfterRedirects);
        this.scrollToFragment(event.urlAfterRedirects);
      });
  }

  @HostListener('window:scroll')
  updateHeaderState(): void {
    this.compactHeader.set(window.scrollY > 12);
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

  async copyEmail(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.profile.email);
      this.copyStatus.set('Email copied');
    } catch {
      this.copyStatus.set('Copy unavailable. Email: ' + this.profile.email);
    }
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
