export const site = {
  name: 'Jeffery Orazulike',
  title: 'Software & AI Engineer',
  url: 'https://logickoder.dev',
  domain: 'logickoder.dev',
  handle: '@logickoder',
  substack: 'https://logickoder.substack.com',
  medium: 'https://medium.com/@logickoder',
  email: 'jeffery@logickoder.dev',
  location: 'Lagos',
  status: 'Open to new projects',
  // Generalist CV, kept in sync by career/cv/sync/cvsync.py. Must be shared as "Anyone with the link: Viewer".
  cvUrl: 'https://docs.google.com/document/d/1jq7_9BmibW87fxOcJ0LNeBGIIFQANfpYYgo5apffSN0/view',
  description:
    'Software & AI Engineer in Lagos. Six years of mobile, now agents and circuits. Android, Kotlin Multiplatform, React, Python. Maintainer of Retrostash and bankstract.',
  social: [
    { label: 'GitHub', href: 'https://github.com/logickoder' },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/logickoder' },
    { label: 'X', href: 'https://x.com/logickoder' },
    { label: 'Substack', href: 'https://logickoder.substack.com' }
  ]
} as const;

export interface Job {
  org: string;
  role: string;
  dates: string;
}

// Source of truth: career/cv/cv.md in the vault. Order: present roles, then ended by end date.
export const jobs: Job[] = [
  { org: 'Grimaldi Group', role: 'Senior Android Engineer', dates: 'Aug 2022 – Present' },
  { org: 'Product Studio (VFD Group)', role: 'Android Engineer, consultancy', dates: 'Sep 2026 – Present' },
  { org: 'HNG Zedu review org', role: 'Reviewer and org admin', dates: 'Oct 2026 – Present' },
  { org: 'WebMD (via Tight Line)', role: 'Senior Android Engineer', dates: 'Nov 2025 – Oct 2026' },
  { org: 'BytebyBit', role: 'Senior Android Engineer', dates: 'May 2024 – Oct 2026' },
  { org: 'Wekoya', role: 'Software Engineer', dates: 'Jul 2026 – Sep 2026' },
  { org: 'Kylzion Labs', role: 'Full-Stack Engineer', dates: 'Feb 2026 – Aug 2026' },
  { org: 'iKooK', role: 'Frontend Engineer', dates: 'Jul 2024 – May 2025' }
];

export const credentials =
  'Claude Certified Architect – Foundations (Anthropic, 2026) · BSc Computer Engineering, UNILAG (2027 expected) · Mentor, 8 HNG cohorts';
