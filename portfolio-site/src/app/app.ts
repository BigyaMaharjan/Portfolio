import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  HostListener,
  NgZone,
  ViewChild,
  effect,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { filter } from 'rxjs';
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
export class App implements AfterViewInit {
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private readonly zone = inject(NgZone);
  private readonly pageTitle = inject(Title);
  private readonly meta = inject(Meta);
  readonly themePreference = inject(ThemePreferenceService);
  readonly profile = profile;
  readonly menuOpen = signal(false);
  readonly currentYear = new Date().getFullYear();
  private readonly pointerFine = window.matchMedia('(pointer: fine)').matches;
  private progressFrame = 0;

  @ViewChild('primaryNav') private primaryNav?: ElementRef<HTMLElement>;
  @ViewChild('menuButton') private menuButton?: ElementRef<HTMLButtonElement>;
  @ViewChild('scrollProgress') private scrollProgress?: ElementRef<HTMLElement>;

  private readonly onScroll = (): void => this.scheduleProgress();

  constructor() {
    effect(() => {
      this.meta.updateTag({
        name: 'theme-color',
        content: this.themePreference.theme() === 'dark' ? '#0a0e1f' : '#eef1ff',
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
        this.scheduleProgress();
      });
  }

  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => {
      window.addEventListener('scroll', this.onScroll, { passive: true });
      window.addEventListener('resize', this.onScroll, { passive: true });
    });
    this.updateProgress();

    this.destroyRef.onDestroy(() => {
      window.removeEventListener('scroll', this.onScroll);
      window.removeEventListener('resize', this.onScroll);
      if (this.progressFrame) {
        cancelAnimationFrame(this.progressFrame);
      }
    });
  }

  @HostListener('document:pointermove', ['$event'])
  handlePointerMove(event: PointerEvent): void {
    if (!this.pointerFine) {
      return;
    }

    document.documentElement.style.setProperty('--pointer-x', `${event.clientX}px`);
    document.documentElement.style.setProperty('--pointer-y', `${event.clientY}px`);
    document.documentElement.classList.add('pointer-active');
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

  private scheduleProgress(): void {
    if (this.progressFrame) {
      return;
    }

    this.progressFrame = requestAnimationFrame(() => {
      this.progressFrame = 0;
      this.updateProgress();
    });
  }

  private updateProgress(): void {
    const element = this.scrollProgress?.nativeElement;
    if (!element) {
      return;
    }

    const max = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    element.style.transform = `scaleX(${ratio.toFixed(4)})`;
  }

  private updatePageMetadata(url: string): void {
    let route = this.router.routerState.snapshot.root;
    while (route.firstChild) {
      route = route.firstChild;
    }

    const project = route.paramMap.get('slug');
    const caseStudy = project ? projects.find((item) => item.slug === project) : undefined;
    const pageTitle = caseStudy
      ? `${caseStudy.name} | Case Study | ${profile.name}`
      : (route.title ?? 'Bigya Maharjan | Software Developer');
    const description =
      caseStudy?.oneLiner ??
      (route.data['description'] as string) ??
      'Bigya Maharjan is a software developer building systems with C# and .NET.';
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
}
