import type { Education, Experience } from './portfolio.models';

export const education: readonly Education[] = [
  {
    institution: 'Patan Multiple Campus',
    credential: "Bachelor's in Computer Science Information Technology",
    location: 'Lalitpur, Nepal',
    graduation: 'April 2023',
  },
];

export const experience: readonly Experience[] = [
  {
    company: 'AMNIL Technologies',
    role: 'Associate Software Developer',
    location: 'Manbhawan, Lalitpur',
    start: 'January 2024',
    end: 'Present',
    summary: 'Contributes to software development projects using .NET technologies.',
    highlights: [
      'Developed and optimized 15+ core modules using .NET frameworks.',
      'Reduced system response times by 20% through core module optimization.',
      'Integrated features that increased functionality coverage by 30% across client environments.',
    ],
    stack: ['C#', '.NET'],
  },
  {
    company: 'AMNIL Technologies',
    role: '.NET Intern',
    location: 'Manbhawan, Lalitpur',
    start: 'May 2023',
    end: 'August 2023',
    summary: 'Gained hands-on software development experience and contributed to team projects.',
    highlights: ['Contributed to team projects using .NET technologies.'],
    stack: ['C#', '.NET'],
  },
];

export const experienceSectors = ['Banking', 'Telecom', 'Government', 'SaaS'] as const;

export const systemTypes = [
  'Automated recharge',
  'Workflows',
  'Reporting',
  'Vouchers',
  'Enterprise applications',
] as const;
