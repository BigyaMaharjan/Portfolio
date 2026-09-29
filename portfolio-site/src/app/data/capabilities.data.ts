import type { CapabilityGroup } from './portfolio.models';

export const capabilityGroups: readonly CapabilityGroup[] = [
  {
    id: 'backend-api',
    title: 'Backend & API design',
    summary: 'Building backend systems primarily with C# and .NET.',
    items: ['C#', '.NET', 'APIs & platform engineering']
  },
  {
    id: 'distributed-data',
    title: 'Data, messaging & distributed systems',
    summary: 'Experience with distributed systems, background workflows, and reporting.',
    items: ['Distributed systems', 'Microservices', 'Background workflows', 'Reporting']
  },
  {
    id: 'domains',
    title: 'Product domains',
    summary: 'Backend work across business and public-service environments.',
    items: ['FinTech', 'Banking', 'Telecom', 'Government', 'SaaS']
  }
];