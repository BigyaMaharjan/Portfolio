export interface SocialLinks {
  readonly github: string;
  readonly linkedin: string;
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
  readonly focusAreas: readonly string[];
}

export interface Education {
  readonly institution: string;
  readonly credential: string;
  readonly location: string;
  readonly graduation: string;
}

export interface ProjectOutcome {
  readonly value: string;
  readonly label: string;
  readonly note: string;
}

export interface ProjectStoreLink {
  readonly platform: 'Google Play' | 'App Store';
  readonly url?: string;
}

export interface ProjectDecision {
  readonly title: string;
  readonly choice: string;
  readonly tradeoff: string;
}

export interface Project {
  readonly slug: string;
  readonly name: string;
  readonly eyebrow: string;
  readonly category: string;
  readonly oneLiner: string;
  readonly context: string;
  readonly problem: string;
  readonly baseline?: string;
  readonly role: string;
  readonly timeframe?: string;
  readonly architecture: string;
  readonly decisions: readonly ProjectDecision[];
  readonly execution: string;
  readonly stack: readonly string[];
  readonly outcomes: readonly ProjectOutcome[];
  readonly lessons?: string;
  readonly relatedProjects: readonly string[];
  readonly githubUrl?: string;
  readonly liveUrl?: string;
  readonly storeLinks?: readonly ProjectStoreLink[];
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
