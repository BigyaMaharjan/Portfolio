import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { projects } from './data/profile.data';

@Component({
  selector: 'app-case-study-page',
  imports: [RouterLink],
  templateUrl: './case-study-page.html',
  styleUrl: './case-study-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CaseStudyPage {
  private readonly route = inject(ActivatedRoute);
  private readonly params = toSignal(this.route.paramMap, { initialValue: this.route.snapshot.paramMap });
  readonly project = computed(() => projects.find((item) => item.slug === this.params().get('slug')));
}