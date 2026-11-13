import type { Project } from './portfolio.models';

export const projects: readonly Project[] = [
  {
    slug: 'ncell-modular',
    name: 'Ncell Modular',
    eyebrow: 'PROFESSIONAL PROJECT',
    category: 'Telecom · Recharge workflows',
    oneLiner:
      'Automated scheduled and low-balance recharges through background jobs, webhooks, and Kafka messages.',
    context:
      'A telecom recharge system with scheduled top-ups and a threshold-based recharge workflow.',
    problem:
      'Users needed balances topped up on selected dates and recharge work triggered when a balance fell below a configured limit.',
    role: 'Developer',
    architecture:
      'Hangfire schedules top-ups and triggers webhooks for dated recharges. A threshold-based job publishes a Kafka message when a balance drops below its configured limit.',
    decisions: [],
    execution:
      'Implemented Hangfire scheduling and webhook triggers for dated top-ups, plus a threshold-based process that publishes messages to Kafka.',
    stack: ['C#', '.NET', 'Hangfire', 'Kafka'],
    outcomes: [],
    relatedProjects: [],
    storeLinks: [
      {
        platform: 'Google Play',
        url: 'https://play.google.com/store/apps/details?id=com.mventus.ncell.activity&hl=en',
      },
      { platform: 'App Store', url: 'https://apps.apple.com/np/app/ncell/id922410448' },
    ],
    confidentiality: 'Details summarized from résumé; confirm sharing scope.',
    featured: true,
  },
  {
    slug: 'gibl-banking-intranet',
    name: 'Banking Intranet System (GIBL)',
    eyebrow: 'PROFESSIONAL PROJECT',
    category: 'Banking · Enterprise application',
    oneLiner:
      'Improved query performance, background-job stability, and internal email handling in a banking intranet system.',
    context: 'A banking intranet system supporting internal application workflows.',
    problem:
      'The résumé identifies complex SQL queries, frequently accessed data and third-party token generation, plus Hangfire timeout/crash issues, as areas addressed.',
    role: 'Developer',
    architecture:
      'Work covered SQL query optimization, caching of frequently accessed data and generated third-party tokens, a database schema for resilient error-message logging, custom internal mail capture, and Hangfire job scheduling.',
    decisions: [
      {
        title: 'Internal mail capture',
        choice:
          'Designed a custom mail-capturing solution to intercept email internally instead of relying on Microsoft Graph.',
        tradeoff:
          'The résumé documents the selected approach, but not further alternatives or trade-offs.',
      },
    ],
    execution:
      'Optimized SQL queries, added caching, designed an error logging schema, stabilized Hangfire jobs and cron schedules, and wrote unit and integration tests for high-risk services.',
    stack: ['C#', '.NET', 'SQL', 'Hangfire'],
    outcomes: [],
    relatedProjects: [],
    storeLinks: [
      {
        platform: 'Google Play',
        url: 'https://play.google.com/store/search?q=global+chautari&c=apps&hl=en',
      },
      { platform: 'App Store', url: 'https://apps.apple.com/np/app/global-chautari/id6777895784' },
    ],
    confidentiality: 'Details summarized from résumé; confirm sharing scope.',
    featured: true,
  },
  {
    slug: 'access-control-management',
    name: 'Access Control Management System',
    eyebrow: 'PROFESSIONAL PROJECT',
    category: 'Enterprise application · Workflow automation',
    oneLiner:
      'Defined operations and applications, then created workflow instances and application tasks from the selected operation.',
    context:
      'An access-control system for defining operations and the applications associated with them.',
    problem:
      'The system needed to create and execute operation workflows and application task instances based on the selected application and operation.',
    role: 'Developer',
    architecture:
      'Workflow Core models the operation-level workflow and the application task instances created for an operation.',
    decisions: [],
    execution:
      'Designed operation/application definitions and implemented logic to dynamically create and execute workflow instances and application task instances.',
    stack: ['C#', '.NET', 'Workflow Core'],
    outcomes: [],
    relatedProjects: [],
    confidentiality: 'Details summarized from résumé; confirm sharing scope.',
    featured: true,
  },
  {
    slug: 'medical-inventory-system',
    name: 'Medical Inventory System',
    eyebrow: 'PROFESSIONAL PROJECT',
    category: 'Healthcare · Application security',
    oneLiner:
      'Addressed VAPT-identified vulnerabilities with rate limiting, concurrent-login restrictions, and Google reCAPTCHA.',
    context:
      'A medical inventory application with security findings identified through VAPT assessment.',
    problem:
      'The application needed security mechanisms to address vulnerabilities identified during VAPT assessments.',
    role: 'Developer',
    architecture:
      'Implemented request rate limiting, concurrent-login restrictions, and Google reCAPTCHA integration. The résumé also notes Angular interface components for daily-user workflows.',
    decisions: [],
    execution:
      'Implemented the security controls and designed Angular interface components to support daily-user workflows.',
    stack: ['C#', '.NET', 'Angular', 'Google reCAPTCHA'],
    outcomes: [],
    relatedProjects: [],
    confidentiality: 'Details summarized from résumé; confirm sharing scope.',
    featured: true,
  },
  {
    slug: 'property-tour-system',
    name: 'Property Tour System',
    eyebrow: 'PROFESSIONAL PROJECT',
    category: 'SaaS · Microservices',
    oneLiner:
      'A microservices-based application where users upload property photos and videos and create virtual tours.',
    context: 'A platform for property owners to share media and create virtual property tours.',
    problem: 'Users needed to upload property images and videos and present them as virtual tours.',
    role: 'Developer',
    architecture:
      'The résumé describes a microservices-based application supporting media uploads and virtual tour creation. Specific service boundaries, storage, and deployment details are not listed.',
    decisions: [],
    execution:
      'Developed the microservices-based application supporting property media uploads and virtual tour creation.',
    stack: ['C#', '.NET', 'Microservices', 'Image/video uploads'],
    outcomes: [],
    relatedProjects: [],
    storeLinks: [
      {
        platform: 'Google Play',
        url: 'https://play.google.com/store/search?q=global+chautari&c=apps&hl=en',
      },
      { platform: 'App Store', url: 'https://apps.apple.com/np/app/global-chautari/id6777895784' },
    ],
    confidentiality: 'Details summarized from résumé; confirm sharing scope.',
    featured: true,
  },
];
