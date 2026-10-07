import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import type { Project } from './data/portfolio.models';
import { projects } from './data/projects.data';

@Component({
  selector: 'app-case-study-page',
  imports: [RouterLink],
  templateUrl: './case-study-page.html',
  styleUrl: './case-study-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CaseStudyPage {
  private readonly route = inject(ActivatedRoute);
  private readonly params = toSignal(this.route.paramMap, {
    initialValue: this.route.snapshot.paramMap,
  });
  readonly project = computed(() =>
    projects.find((item) => item.slug === this.params().get('slug')),
  );
  readonly relatedProjects = computed(() => {
    const currentProject = this.project();
    if (!currentProject) {
      return [];
    }

    return currentProject.relatedProjects
      .map((slug) => projects.find((item) => item.slug === slug))
      .filter((item): item is Project => item !== undefined);
  });
}
