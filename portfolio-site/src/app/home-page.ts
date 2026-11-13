import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  inject,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { MotionPreferenceService } from './core/motion-preference.service';
import { capabilityGroups } from './data/capabilities.data';
import { education, experience, experienceSectors, systemTypes } from './data/experience.data';
import { approachSteps, profile } from './data/profile.data';
import { projects } from './data/projects.data';

const clamp01 = (value: number): number => Math.min(1, Math.max(0, value));

@Component({
  selector: 'app-home-page',
  imports: [RouterLink],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage implements AfterViewInit, OnDestroy {
  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly zone = inject(NgZone);
  private readonly motionPreference = inject(MotionPreferenceService);

  private scrollCraft?: ScrollCraftInstance;
  private methodFrame = 0;
  private traceFrame = 0;
  private methodObserver?: IntersectionObserver;
  private methodVisible = false;
  private motionObserver?: MutationObserver;
  private cleanups: Array<() => void> = [];

  readonly profile = profile;
  readonly capabilities = capabilityGroups;
  readonly education = education;
  readonly experience = experience;
  readonly experienceSectors = experienceSectors;
  readonly projects = projects.filter((project) => project.featured);
  readonly systemTypes = systemTypes;
  readonly approachSteps = approachSteps;
  readonly copyStatus = signal('');
  readonly staticMode = signal(false);

  readonly chapters = [
    { id: 'top', num: '·', name: 'Title' },
    { id: 'systems', num: 'I', name: 'Systems' },
    { id: 'method', num: 'II', name: 'Method' },
    { id: 'range', num: 'III', name: 'Range' },
    { id: 'evidence', num: 'IV', name: 'Evidence' },
    { id: 'contact', num: 'V', name: 'Close' },
  ] as const;

  readonly plateLetters = ['A', 'B', 'C', 'D', 'E'] as const;
  readonly rangeLetters = ['A', 'B', 'C', 'D', 'E', 'F'] as const;
  readonly sectorNotes = [
    'Internal workflows, query performance, and background jobs.',
    'Scheduled recharge, webhooks, and event-driven triggers.',
    'Process-heavy internal applications and access control.',
    'Microservices and customer-facing product workflows.',
  ] as const;
  readonly metrics = profile.heroMetrics.map((metric, index) => ({
    ...metric,
    target: [15, 20, 30][index] ?? 0,
    suffix: index === 0 ? '+' : '%',
  }));

  ngAfterViewInit(): void {
    const root = this.host.nativeElement;
    this.zone.runOutsideAngular(() => {
      this.syncMotion(root);
      this.initTrace(root);
      this.initMethod(root);
      document.fonts?.ready.then(() => {
        this.scrollCraft?.layout();
        this.updateMethod(root);
        this.updateTrace(root);
      });
    });

    this.motionObserver = new MutationObserver(() => this.syncMotion(root));
    this.motionObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-motion'],
    });
  }

  ngOnDestroy(): void {
    this.motionObserver?.disconnect();
    this.methodObserver?.disconnect();
    this.scrollCraft?.destroy();
    cancelAnimationFrame(this.methodFrame);
    cancelAnimationFrame(this.traceFrame);
    this.cleanups.forEach((cleanup) => cleanup());
    this.cleanups = [];
  }

  async copyEmail(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.profile.email);
      this.copyStatus.set('Email copied');
    } catch {
      this.copyStatus.set('Copy unavailable. Email: ' + this.profile.email);
    }
  }

  private syncMotion(root: HTMLElement): void {
    const reduce = this.motionPreference.reducedMotion();
    if (reduce) {
      this.scrollCraft?.destroy();
      this.scrollCraft = undefined;
      cancelAnimationFrame(this.methodFrame);
      this.methodFrame = 0;
      root.querySelector<HTMLElement>('[data-sc-pan]')?.style.removeProperty('transform');
      this.zone.run(() => this.staticMode.set(true));
      this.markStatic(root);
      this.updateMethod(root);
      this.updateTrace(root);
      return;
    }

    if (!window.ScrollCraft) {
      this.zone.run(() => this.staticMode.set(true));
      this.markStatic(root);
      return;
    }

    this.zone.run(() => this.staticMode.set(false));
    this.scrollCraft?.destroy();
    this.scrollCraft = window.ScrollCraft.mount(root, {});
    this.scrollCraft.layout();
    this.startMethodLoop(root);
    this.updateTrace(root);
  }

  private markStatic(root: HTMLElement): void {
    root.querySelectorAll('[data-sc-in], [data-sc-stagger] > *').forEach((element) => {
      element.classList.add('sc-in');
    });
  }

  private initTrace(root: HTMLElement): void {
    const update = (): void => {
      this.traceFrame = 0;
      this.updateTrace(root);
    };
    const onScroll = (): void => {
      if (this.traceFrame) {
        return;
      }
      this.traceFrame = requestAnimationFrame(update);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    this.cleanups.push(() => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    });
    this.updateTrace(root);
  }

  private updateTrace(root: HTMLElement): void {
    const max = document.documentElement.scrollHeight - innerHeight;
    const progress = max > 0 ? clamp01(scrollY / max) : 0;
    root.style.setProperty('--trace-progress', progress.toFixed(4));

    const links = Array.from(root.querySelectorAll<HTMLAnchorElement>('[data-trace]'));
    let activeId: string = this.chapters[0].id;
    for (const chapter of this.chapters) {
      const section = root.querySelector<HTMLElement>('#' + chapter.id);
      if (section && section.getBoundingClientRect().top <= innerHeight * 0.38) {
        activeId = chapter.id;
      }
    }

    for (const link of links) {
      const current = link.dataset['trace'] === activeId;
      link.classList.toggle('is-active', current);
      if (current) {
        link.setAttribute('aria-current', 'location');
      } else {
        link.removeAttribute('aria-current');
      }
    }

    const current = this.chapters.find((chapter) => chapter.id === activeId);
    const label = root.querySelector<HTMLElement>('[data-trace-current]');
    if (current && label) {
      label.textContent = `${current.num} / ${current.name}`;
    }
  }

  private initMethod(root: HTMLElement): void {
    const svg = root.querySelector<SVGSVGElement>('#method-diagram');
    if (!svg) {
      return;
    }

    for (const path of Array.from(svg.querySelectorAll<SVGPathElement>('[data-draw]'))) {
      path.dataset['length'] = String(path.getTotalLength());
      path.style.strokeDasharray = path.dataset['length'];
    }

    const act = root.querySelector<HTMLElement>('#method');
    if (act && 'IntersectionObserver' in window) {
      this.methodObserver = new IntersectionObserver(
        (entries) => {
          this.methodVisible = entries[0]?.isIntersecting ?? false;
          if (this.methodVisible) {
            this.startMethodLoop(root);
          }
        },
        { rootMargin: '240px 0px' },
      );
      this.methodObserver.observe(act);
    } else {
      this.methodVisible = true;
    }

    this.startMethodLoop(root);
  }

  private startMethodLoop(root: HTMLElement): void {
    cancelAnimationFrame(this.methodFrame);
    this.methodFrame = 0;

    const tick = (): void => {
      this.updateMethod(root);
      if (this.motionPreference.reducedMotion() || !this.methodVisible) {
        this.methodFrame = 0;
        return;
      }
      this.methodFrame = requestAnimationFrame(tick);
    };

    this.updateMethod(root);
    this.methodFrame = requestAnimationFrame(tick);
  }

  private updateMethod(root: HTMLElement): void {
    const act = root.querySelector<HTMLElement>('#method');
    const svg = root.querySelector<SVGSVGElement>('#method-diagram');
    if (!act || !svg) {
      return;
    }

    const raw = getComputedStyle(act).getPropertyValue('--sc-p').trim();
    const rect = act.getBoundingClientRect();
    const fallback = clamp01((innerHeight - rect.top) / (rect.height + innerHeight));
    const p = this.motionPreference.reducedMotion()
      ? 1
      : raw
        ? clamp01(parseFloat(raw))
        : fallback;

    const paths = Array.from(svg.querySelectorAll<SVGPathElement>('[data-draw]'));
    const nodes = Array.from(svg.querySelectorAll<SVGGElement>('[data-method-node]'));
    const pulse = svg.querySelector<SVGCircleElement>('#method-pulse');
    let pulsePath: SVGPathElement | undefined;
    let pulseLocal = 0;

    paths.forEach((path, index) => {
      const length = Number(path.dataset['length']) || 0;
      const local = clamp01((p - index * 0.035) / 0.72);
      path.style.strokeDashoffset = String(length * (1 - local));
      if (local > 0 && local < 1) {
        pulsePath = path;
        pulseLocal = local;
      }
    });

    nodes.forEach((node, index) => {
      node.classList.toggle('is-live', p >= index / Math.max(nodes.length - 1, 1) * 0.78);
    });

    if (pulse) {
      if (this.motionPreference.reducedMotion() || p < 0.015) {
        pulse.style.opacity = '0';
      } else {
        pulse.style.opacity = '1';
        if (!pulsePath && paths.length) {
          pulsePath = paths[paths.length - 1];
          pulseLocal = 1;
        }
        if (pulsePath) {
          const length = Number(pulsePath.dataset['length']) || 0;
          const point = pulsePath.getPointAtLength(length * pulseLocal);
          pulse.setAttribute('cx', String(point.x));
          pulse.setAttribute('cy', String(point.y));
        }
      }
    }

    const steps = Array.from(root.querySelectorAll<HTMLElement>('[data-method-step]'));
    const active = Math.min(steps.length - 1, Math.floor(p * steps.length));
    steps.forEach((step, index) => step.classList.toggle('is-active', index === active));
  }
}
