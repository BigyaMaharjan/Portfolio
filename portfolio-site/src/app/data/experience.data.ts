import type { Experience } from './portfolio.models';

export const experience: readonly Experience[] = [];

export const experienceSectors = ['Banking', 'Telecom', 'Government', 'SaaS'] as const;

export const systemTypes = [
  'Automated recharge',
  'Workflows',
  'Reporting',
  'Vouchers',
  'Enterprise applications'
] as const;