import type { CapabilityGroup } from './portfolio.models';

export const capabilityGroups: readonly CapabilityGroup[] = [
  {
    id: 'backend-api',
    title: 'Backend & API design',
    summary: 'Build application services and backend modules with the .NET ecosystem.',
    items: ['C#', 'ASP.NET', 'ABP Framework', 'Entity Framework']
  },
  {
    id: 'distributed-data',
    title: 'Data, messaging & distributed systems',
    summary: 'Work with relational data, scheduled jobs, and event-driven integrations.',
    items: ['PostgreSQL', 'SQL', 'Kafka', 'Hangfire', 'Workflow Core']
  },
  {
    id: 'delivery',
    title: 'Infrastructure & delivery',
    summary: 'Use containerization, CI, and source control in application delivery.',
    items: ['Docker', 'Jenkins', 'Git']
  },
  {
    id: 'quality-security',
    title: 'Quality & application security',
    summary: 'Test service behavior and address security findings in application workflows.',
    items: ['Unit testing', 'Integration testing', 'VAPT remediation', 'Rate limiting', 'Google reCAPTCHA']
  }
];