import type { Education, Metric, Profile } from './portfolio.models';

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
  heroMetrics: [
    { value: '15+', label: 'core .NET modules optimized', note: 'Resume-reported' },
    { value: '20%', label: 'reduction in response times', note: 'Across core module optimization' },
    { value: '30%', label: 'increase in functionality coverage', note: 'Across client environments' }
  ] satisfies readonly Metric[],
  focusAreas: ['FinTech', 'Distributed systems', 'APIs & platform engineering', 'Microservices']
};

export const education: readonly Education[] = [
  {
    institution: 'Patan Multiple Campus',
    credential: "Bachelor's in Computer Science Information Technology",
    location: 'Lalitpur, Nepal',
    graduation: 'April 2023'
  }
];

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
