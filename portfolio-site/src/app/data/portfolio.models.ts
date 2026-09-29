export interface SocialLinks {
  readonly github: string;
  readonly linkedin: string;
}

export interface Metric {
  readonly value: string;
  readonly label: string;
  readonly note?: string;
}

export interface Profile {
  readonly name: string;
  readonly title: string;
  readonly location: string;
  readonly availability: string;
  readonly email: string;
  readonly shortBio: string;
  readonly longBio: string;
  readonly resumeUrl: string;
  readonly social: SocialLinks;
  readonly heroMetrics: readonly Metric[];
  readonly focusAreas: readonly string[];
}

export interface ProjectOutcome {
  readonly value: string;
  readonly label: string;
  readonly note: string;
}

export interface Project {
  readonly slug: string;
  readonly name: string;
  readonly eyebrow: string;
  readonly oneLiner: string;
  readonly problem: string;
  readonly role: string;
  readonly architecture: string;
  readonly decisions: readonly string[];
  readonly stack: readonly string[];
  readonly outcomes: readonly ProjectOutcome[];
  readonly githubUrl?: string;
  readonly liveUrl?: string;
  readonly confidentiality: string;
  readonly featured: boolean;
}

export interface Experience {
  readonly company: string;
  readonly role: string;
  readonly location: string;
  readonly start: string;
  readonly end: string;
  readonly summary: string;
  readonly highlights: readonly string[];
  readonly stack: readonly string[];
}

export interface CapabilityGroup {
  readonly id: string;
  readonly title: string;
  readonly summary: string;
  readonly items: readonly string[];
}