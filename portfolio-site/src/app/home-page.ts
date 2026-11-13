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
import { Avatar } from './avatar';
import { MotionPreferenceService } from './core/motion-preference.service';
import { education, experience, experienceSectors } from './data/experience.data';
import { profile } from './data/profile.data';
import { projects } from './data/projects.data';
import { techGroups } from './data/tech-stack.data';

@Component({
  selector: 'app-home-page',
  imports: [RouterLink, Avatar],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage implements AfterViewInit, OnDestroy {
  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly zone = inject(NgZone);
  private readonly motionPreference = inject(MotionPreferenceService);

  private scrollCraft?: ScrollCraftInstance;
  private motionObserver?: MutationObserver;

  readonly profile = profile;
  readonly techGroups = techGroups;
  readonly projects = projects;
  readonly experienceSectors = experienceSectors;
  readonly copyStatus = signal('');
  readonly staticMode = signal(false);

  readonly timeline = [
    {
      when: 'Jan 2024 - Present',
      title: experience[0].role,
      org: `${experience[0].company} / ${experience[0].location}`,
      detail: experience[0].summary,
      stack: experience[0].stack,
      current: true,
    },
    {
      when: 'May - Aug 2023',
      title: experience[1].role,
      org: `${experience[1].company} / ${experience[1].location}`,
      detail: experience[1].summary,
      stack: experience[1].stack,
      current: false,
    },
    {
      when: '2023',
      title: education[0].credential,
      org: `${education[0].institution} / ${education[0].location}`,
      detail: `Graduated ${education[0].graduation}. Where the curiosity about how systems work started.`,
      stack: [] as readonly string[],
      current: false,
    },
  ] as const;

  readonly playerStats = [
    { target: 5, suffix: '', label: 'Systems shipped', note: 'Banking, telecom, government, SaaS, health.' },
    { target: 4, suffix: '', label: 'Domains worked', note: 'Banking, telecom, government, SaaS.' },
    { target: 15, suffix: '+', label: 'Core modules optimized', note: 'Résumé-reported.' },
    { target: 20, suffix: '%', label: 'Faster responses', note: 'Core module optimization.' },
    { target: 30, suffix: '%', label: 'More coverage', note: 'Across client environments.' },
    { target: 2, suffix: '', label: 'Roles at AMNIL', note: 'Intern, then associate developer.' },
  ] as const;

  readonly heroLogos = [
    'csharp',
    'dot-net',
    'postgresql',
    'apachekafka',
    'docker',
    'angular',
    'git',
    'jenkins',
  ] as const;

  readonly cardFacts = [
    { key: 'Class', value: 'Backend Engineer' },
    { key: 'Guild', value: 'AMNIL Technologies' },
    { key: 'Server', value: profile.location },
    { key: 'Status', value: profile.availability },
  ] as const;

  ngAfterViewInit(): void {
    const root = this.host.nativeElement;
    this.zone.runOutsideAngular(() => {
      this.syncMotion(root);
      document.fonts?.ready.then(() => this.scrollCraft?.layout());
    });

    this.motionObserver = new MutationObserver(() => this.syncMotion(root));
    this.motionObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-motion'],
    });
  }

  ngOnDestroy(): void {
    this.motionObserver?.disconnect();
    this.scrollCraft?.destroy();
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
    if (this.motionPreference.reducedMotion() || !window.ScrollCraft) {
      this.scrollCraft?.destroy();
      this.scrollCraft = undefined;
      this.zone.run(() => this.staticMode.set(true));
      this.markStatic(root);
      return;
    }

    this.zone.run(() => this.staticMode.set(false));
    this.scrollCraft?.destroy();
    this.scrollCraft = window.ScrollCraft.mount(root, {});
    this.scrollCraft.layout();
  }

  private markStatic(root: HTMLElement): void {
    root.querySelectorAll('[data-sc-in], [data-sc-stagger] > *').forEach((element) => {
      element.classList.add('sc-in');
    });
  }
}
