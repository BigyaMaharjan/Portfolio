import type { CapabilityGroup, Experience, Profile, Project } from './portfolio.models';

export const profile: Profile = {
  name: 'Bigya Maharjan',
  title: 'Backend Software Developer',
  location: 'Kathmandu, Nepal',
  availability: 'OPEN TO WORK',
  email: 'bigyamaharjan2000@gmail.com',
  shortBio: "I'm naturally curious about how things work under the hood. Whether it's tracking down a slow query, fixing a stubborn background job, or designing a cleaner way to solve a problem, I enjoy the process of figuring things out. I'm always learning, experimenting, and looking for a better way to build things.",
  longBio: "I'm a Software Engineer who enjoys building backend systems and, more importantly, figuring out how to make them work better. I work primarily with .NET and have had the opportunity to build systems across banking, telecom, government, and SaaS, working on everything from automated recharge and workflows to reporting, vouchers, and enterprise applications.",
  resumeUrl: '/files/Bigya-Maharjan-Resume.pdf',
  social: {
    github: 'https://github.com/BigyaMaharjan',
    linkedin: 'https://www.linkedin.com/in/bigya-maharjan-b7441b299/'
  },
  heroMetrics: [],
  focusAreas: ['FinTech', 'Distributed systems', 'APIs & platform engineering', 'Microservices']
};

export const approachSteps = [
  {
    id: 'understand',
    title: 'Understand the system',
    description: 'Find the underlying behavior, constraints, and opportunities to improve.'
  },
  {
    id: 'build',
    title: 'Build with care',
    description: 'Use .NET and clear backend design to solve the problem at hand.'
  },
  {
    id: 'improve',
    title: 'Keep improving',
    description: 'Learn from how systems behave and make the next change better.'
  }
] as const;

export const projects: readonly Project[] = [];

export const experience: readonly Experience[] = [];

export const experienceSectors = ['Banking', 'Telecom', 'Government', 'SaaS'] as const;

export const systemTypes = [
  'Automated recharge',
  'Workflows',
  'Reporting',
  'Vouchers',
  'Enterprise applications'
] as const;

export const capabilityGroups: readonly CapabilityGroup[] = [
  {
    id: 'backend-api',
    title: 'Backend & API design',
    summary: 'Building service behavior and interfaces with .NET.',
    items: ['C#', '.NET', 'APIs & platform engineering']
  },
  {
    id: 'distributed-data',
    title: 'Data, messaging & distributed systems',
    summary: 'Working with connected services, background workflows, and reporting systems.',
    items: ['Distributed systems', 'Microservices', 'Background workflows', 'Reporting']
  },
  {
    id: 'domains',
    title: 'Product domains',
    summary: 'Experience across varied business and public-service environments.',
    items: ['FinTech', 'Banking', 'Telecom', 'Government', 'SaaS']
  }
];