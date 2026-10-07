import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { profile } from './data/profile.data';

@Component({
  selector: 'app-resume-page',
  templateUrl: './resume-page.html',
  styleUrl: './resume-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResumePage {
  readonly profile = profile;
  readonly resumePdfUrl = inject(DomSanitizer).bypassSecurityTrustResourceUrl(profile.resumeUrl);
}
