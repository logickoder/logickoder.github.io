import type { CaseStudy } from './types';
import retrostash from './retrostash';
import appstorys from './appstorys';
import knock from './knock';
import nag from './nag';
import firebaseDistribution from './firebase-distribution';
import bankstract from './bankstract';
import agentBridge from './agent-bridge';
import redactly from './redactly';
import zeduReviewInfra from './zedu-review-infra';
import walletImporter from './wallet-importer';

export type { CaseStudySection } from './types';

export function getAdjacentCaseStudies(slug: string): {
  prev?: CaseStudy;
  next?: CaseStudy;
} {
  const list = listCaseStudies();
  const index = list.findIndex((entry) => entry.slug === slug);
  if (index === -1) return {};
  return { prev: list[index - 1], next: list[index + 1] };
}

export function estimateReadingMinutes(study: CaseStudy): number {
  const WORDS_PER_MINUTE = 220;
  let words = countWords(study.tagline) + countWords(study.summary);
  for (const section of study.sections) {
    if (section.type === 'prose') {
      words += countWords(section.content);
    } else if (section.type === 'heading') {
      words += countWords(section.text);
    } else if (section.type === 'list') {
      for (const item of section.items) {
        words += countWords(item);
      }
    } else if (section.type === 'quote') {
      words += countWords(section.text);
      if (section.attribution) {
        words += countWords(section.attribution);
      }
    } else if (section.type === 'code') {
      // Code blocks read slower; weight tokens as words.
      words += section.code.split(/\s+/).filter(Boolean).length;
    }
  }
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

const caseStudies: Record<string, CaseStudy> = {
  [bankstract.slug]: bankstract,
  [agentBridge.slug]: agentBridge,
  [redactly.slug]: redactly,
  [zeduReviewInfra.slug]: zeduReviewInfra,
  [walletImporter.slug]: walletImporter,
  [retrostash.slug]: retrostash,
  [appstorys.slug]: appstorys,
  [knock.slug]: knock,
  [nag.slug]: nag,
  [firebaseDistribution.slug]: firebaseDistribution
};

export default caseStudies;

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies[slug];
}

export function listCaseStudies(): CaseStudy[] {
  return Object.values(caseStudies).sort((a, b) => b.year - a.year);
}
