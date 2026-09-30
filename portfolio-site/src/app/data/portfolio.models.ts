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

export interface ProjectDecision {
  readonly title: string;
  readonly choice: string;
  readonly tradeoff: string;
}

export interface DiagramNode {
  readonly id: string;
  readonly label: string;
  readonly detail?: string;
  readonly kind: 'entry' | 'service' | 'data' | 'external';
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
}

export interface DiagramEdge {
  readonly id: string;
  readonly from: string;
  readonly to: string;
  readonly label?: string;
  readonly x1: number;
  readonly y1: number;
  readonly x2: number;
  readonly y2: number;
}

export interface ArchitectureDiagram {
  readonly title: string;
  readonly description: string;
  readonly caption: string;
  readonly width: number;
  readonly height: number;
  readonly nodes: readonly DiagramNode[];
  readonly edges: readonly DiagramEdge[];
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
  readonly architectureDiagram: ArchitectureDiagram;
  readonly decisions: readonly ProjectDecision[];
  readonly execution: string;
  readonly stack: readonly string[];
  readonly outcomes: readonly ProjectOutcome[];
  readonly lessons?: string;
  readonly relatedProjects: readonly string[];
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