import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  inject,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { animate, stagger } from 'animejs';
import { MotionPreferenceService } from './core/motion-preference.service';
import { capabilityGroups } from './data/capabilities.data';
import { education, experience, experienceSectors, systemTypes } from './data/experience.data';
import { profile } from './data/profile.data';
import { projects } from './data/projects.data';

@Component({
  selector: 'app-home-page',
  imports: [RouterLink],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage implements AfterViewInit, OnDestroy {
  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly motionPreference = inject(MotionPreferenceService);
  private observer?: IntersectionObserver;

  readonly profile = profile;
  readonly capabilities = capabilityGroups;
  readonly education = education;
  readonly experience = experience;
  readonly experienceSectors = experienceSectors;
  readonly projects = projects.filter((project) => project.featured);
  readonly systemTypes = systemTypes;
  readonly copyStatus = signal('');

  ngAfterViewInit(): void {
    if (this.motionPreference.reducedMotion()) {
      return;
    }

    const root = this.host.nativeElement as HTMLElement;
    const heroItems = Array.from(root.querySelectorAll('[data-hero-enter]'));
    animate(heroItems, {
      opacity: [0, 1],
      y: [14, 0],
      duration: 560,
      delay: stagger(75),
      ease: 'out(3)',
    });

    const revealItems = Array.from(root.querySelectorAll('[data-reveal]'));
    if (!('IntersectionObserver' in window)) {
      return;
    }

    this.observer = new IntersectionObserver(
      (entries, observer) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) {
            continue;
          }

          animate(entry.target, {
            opacity: [0, 1],
            y: [14, 0],
            duration: 460,
            ease: 'out(3)',
          });
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.08 },
    );

    revealItems.forEach((item) => this.observer?.observe(item));
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  async copyEmail(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.profile.email);
      this.copyStatus.set('Email copied');
    } catch {
      this.copyStatus.set('Copy unavailable. Email: ' + this.profile.email);
    }
  }
}
