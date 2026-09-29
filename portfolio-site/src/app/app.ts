import { AfterViewInit, Component, ElementRef, OnDestroy, inject } from '@angular/core';
import { animate, stagger } from 'animejs';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements AfterViewInit, OnDestroy {
  private readonly host = inject(ElementRef<HTMLElement>);
  private revealObserver?: IntersectionObserver;

  readonly projects = [
    {
      number: '01',
      title: 'Web APIs',
      category: 'C# · .NET · HTTP',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=85',
      alt: 'Analytics dashboard displayed on a laptop',
      tone: 'project-card--coral'
    },
    {
      number: '02',
      title: 'Service architecture',
      category: 'Boundaries · Reliability · Scale',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=85',
      alt: 'Detailed circuit board representing connected services',
      tone: 'project-card--blue'
    },
    {
      number: '03',
      title: 'Data workflows',
      category: 'Integrations · Background processing',
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=85',
      alt: 'Team collaborating around a shared computer',
      tone: 'project-card--lime'
    },
    {
      number: '04',
      title: 'Engineering quality',
      category: 'Testing · Observability · Maintainability',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=85',
      alt: 'Digital network visualization across the globe',
      tone: 'project-card--lavender'
    }
  ];

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

    const revealItems = Array.from(root.querySelectorAll('[data-reveal]'));
    if (!('IntersectionObserver' in window) || revealItems.length === 0) {
      return;
    }

    document.documentElement.classList.add('motion-ready');
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
    document.documentElement.classList.remove('motion-ready');
  }
}
