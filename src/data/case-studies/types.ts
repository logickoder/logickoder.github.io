export type CaseStudySection =
  | { type: 'heading'; level: 2 | 3; text: string }
  | { type: 'prose'; content: string }
  | { type: 'list'; items: string[] }
  | { type: 'code'; language: string; code: string }
  | { type: 'quote'; text: string; attribution?: string };

export interface CaseStudyLink {
  label: string;
  href: string;
}

export interface CaseStudyBadge {
  alt: string;
  src: string;
  href?: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  tagline: string;
  year: number;
  role: string;
  tech: string[];
  status: 'shipped' | 'in-progress' | 'archived' | 'confidential abstract';
  links?: CaseStudyLink[];
  badges?: CaseStudyBadge[];
  summary: string;
  sections: CaseStudySection[];
}
