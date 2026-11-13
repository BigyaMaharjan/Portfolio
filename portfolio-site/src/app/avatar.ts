import { ChangeDetectionStrategy, Component, input } from '@angular/core';

let avatarSeq = 0;

@Component({
  selector: 'app-avatar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg
      [attr.width]="size()"
      [attr.height]="size()"
      viewBox="0 0 240 240"
      role="img"
      aria-label="Illustrated portrait of Bigya Maharjan as a hooded developer"
    >
      <defs>
        <linearGradient [attr.id]="ringId" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="var(--accent-blue)" />
          <stop offset="0.5" stop-color="var(--accent)" />
          <stop offset="1" stop-color="var(--accent-warm)" />
        </linearGradient>
        <clipPath [attr.id]="clipId">
          <circle cx="120" cy="120" r="112" />
        </clipPath>
      </defs>

      <circle cx="120" cy="120" r="112" fill="var(--surface-raised)" />
      <g [attr.clip-path]="'url(#' + clipId + ')'">
        <rect x="8" y="8" width="224" height="224" fill="var(--surface)" />
        <circle cx="120" cy="96" r="86" fill="var(--accent)" opacity="0.08" />

        <path
          d="M58 156 C58 84 84 54 120 54 C156 54 182 84 182 156 Z"
          fill="var(--surface-raised)"
          stroke="var(--border-strong)"
          stroke-width="3"
        />

        <path
          d="M94 96 h52 a16 16 0 0 1 16 16 v20 a28 28 0 0 1 -28 28 h-28 a28 28 0 0 1 -28 -28 v-20 a16 16 0 0 1 16 -16 z"
          fill="#e7b48f"
        />

        <path
          d="M104 168 q16 10 32 0"
          fill="none"
          stroke="#a9764f"
          stroke-width="4"
          stroke-linecap="round"
        />

        <rect x="78" y="108" width="84" height="28" rx="14" fill="var(--accent)" opacity="0.92" />
        <rect
          x="78"
          y="108"
          width="84"
          height="28"
          rx="14"
          fill="none"
          stroke="var(--accent-strong)"
          stroke-width="2"
        />
        <rect x="86" y="115" width="24" height="6" rx="3" fill="#ffffff" opacity="0.55" />

        <path
          d="M68 112 C68 70 90 46 120 46 C150 46 172 70 172 112"
          fill="none"
          stroke="var(--accent-warm)"
          stroke-width="9"
          stroke-linecap="round"
        />
        <rect x="52" y="98" width="22" height="44" rx="11" fill="var(--accent-warm)" />
        <rect x="166" y="98" width="22" height="44" rx="11" fill="var(--accent-warm)" />

        <path
          d="M42 220 C42 174 78 154 120 154 C162 154 198 174 198 220 Z"
          fill="var(--surface-raised)"
          stroke="var(--border-strong)"
          stroke-width="3"
        />
      </g>

      <circle
        cx="120"
        cy="120"
        r="112"
        fill="none"
        [attr.stroke]="'url(#' + ringId + ')'"
        stroke-width="4"
      />
    </svg>
  `,
  styles: `
    :host {
      display: inline-block;
      line-height: 0;
    }

    svg {
      display: block;
      max-width: 100%;
      height: auto;
      filter: drop-shadow(0 24px 60px color-mix(in srgb, var(--accent) 22%, transparent));
    }
  `,
})
export class Avatar {
  readonly size = input(260);
  protected readonly ringId = `avatar-ring-${avatarSeq}`;
  protected readonly clipId = `avatar-clip-${avatarSeq++}`;
}
