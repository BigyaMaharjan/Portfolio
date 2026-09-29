import { AfterViewInit, Component, ElementRef, OnDestroy, computed, inject, signal } from '@angular/core';
import { animate, stagger } from 'animejs';
import { focusAreas, focusFilters, type FocusFilter } from './portfolio.data';

@Component({
  selector: 'app-focus-section',
  templateUrl: './focus-section.html',
  styleUrl: './focus-section.css'
})
export class FocusSection implements AfterViewInit, OnDestroy {
  private readonly host = inject(ElementRef<HTMLElement>);
  private revealObserver?: IntersectionObserver;

  readonly areas = focusAreas;
  readonly filters = focusFilters;
  readonly activeFilter = signal<FocusFilter>('All');
  readonly visibleAreas = computed(() => {
    const filter = this.activeFilter();
    return filter === 'All'
      ? this.areas
      : this.areas.filter((area) => area.category === filter);
  });

  ngAfterViewInit(): void {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      return;
    }

    const root = this.host.nativeElement as HTMLElement;
    const revealItems = Array.from(root.querySelectorAll('[data-focus-reveal]'));
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

  setFilter(filter: FocusFilter): void {
    this.activeFilter.set(filter);

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const root = this.host.nativeElement as HTMLElement;
    requestAnimationFrame(() => {
      const cards = Array.from(root.querySelectorAll('.focus-card'));
      animate(cards, {
        opacity: [0, 1],
        y: [14, 0],
        duration: 480,
        delay: stagger(55),
        ease: 'out(3)'
      });
    });
  }

  ngOnDestroy(): void {
    this.revealObserver?.disconnect();
  }
}