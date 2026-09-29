import { AfterViewInit, Component, ElementRef, OnDestroy, inject } from '@angular/core';
import { animate, stagger } from 'animejs';
import { FocusSection } from './focus-section';
import { approachSteps, portfolioProfile } from './portfolio.data';

@Component({
  selector: 'app-root',
  imports: [FocusSection],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements AfterViewInit, OnDestroy {
  private readonly host = inject(ElementRef<HTMLElement>);
  private revealObserver?: IntersectionObserver;
  readonly profile = portfolioProfile;
  readonly approachSteps = approachSteps;

  ngAfterViewInit(): void {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const root = this.host.nativeElement as HTMLElement;
    const heroItems = Array.from(root.querySelectorAll('[data-hero-enter]'));

    animate(heroItems, {
      opacity: [0, 1],
      y: [20, 0],
      duration: 850,
      delay: stagger(100),
      ease: 'out(3)'
    });

    const revealItems = Array.from(root.querySelectorAll('[data-reveal]'))
      .filter((item) => !item.closest('app-focus-section'));
    if (!('IntersectionObserver' in window) || revealItems.length === 0) {
      return;
    }

    this.revealObserver = new IntersectionObserver((entries, observer) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) {
          continue;
        }

        animate(entry.target, {
          opacity: [0, 1],
          y: [22, 0],
          duration: 700,
          ease: 'out(3)'
        });
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.12 });

    revealItems.forEach((item) => this.revealObserver?.observe(item));
  }

  ngOnDestroy(): void {
    this.revealObserver?.disconnect();
  }
}
