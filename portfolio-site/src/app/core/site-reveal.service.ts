import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SiteRevealService {
  readonly revealed = signal(false);

  reveal(): void {
    this.revealed.set(true);
  }
}
