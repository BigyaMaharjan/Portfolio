export interface TechItem {
  readonly name: string;
  readonly slug?: string;
  readonly mark?: string;
}

export interface TechGroup {
  readonly id: string;
  readonly title: string;
  readonly summary: string;
  readonly items: readonly TechItem[];
}

export const techGroups: readonly TechGroup[] = [
  {
    id: 'backend',
    title: 'Backend & APIs',
    summary: 'Application services, domain modules, and the APIs around them.',
    items: [
      { name: 'C#', slug: 'csharp' },
      { name: 'ASP.NET / .NET', slug: 'dot-net' },
      { name: 'ABP Framework', mark: 'ABP' },
      { name: 'Entity Framework', slug: 'entityframeworkcore' },
      { name: 'REST APIs', mark: 'API' },
    ],
  },
  {
    id: 'data',
    title: 'Data, messaging & distributed systems',
    summary: 'Relational data, scheduled work, and event-driven integration.',
    items: [
      { name: 'PostgreSQL', slug: 'postgresql' },
      { name: 'SQL Server', slug: 'microsoftsqlserver' },
      { name: 'Apache Kafka', slug: 'apachekafka' },
      { name: 'Hangfire', mark: 'HF' },
      { name: 'Workflow Core', mark: 'WC' },
      { name: 'Microservices', mark: 'MS' },
    ],
  },
  {
    id: 'delivery',
    title: 'Frontend & delivery',
    summary: 'Interfaces, containerization, CI, and source control.',
    items: [
      { name: 'Angular', slug: 'angular' },
      { name: 'Docker', slug: 'docker' },
      { name: 'Jenkins', slug: 'jenkins' },
      { name: 'Git', slug: 'git' },
    ],
  },
  {
    id: 'quality',
    title: 'Quality & application security',
    summary: 'Testing service behavior and closing security findings.',
    items: [
      { name: 'Unit testing', mark: 'UT' },
      { name: 'Integration testing', mark: 'IT' },
      { name: 'VAPT remediation', mark: 'VA' },
      { name: 'Rate limiting', mark: 'RL' },
      { name: 'Google reCAPTCHA', slug: 'google' },
    ],
  },
];
