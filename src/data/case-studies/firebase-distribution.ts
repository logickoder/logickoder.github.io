import type { CaseStudy } from './types';

const firebaseDistribution: CaseStudy = {
  slug: 'firebase-distribution-action',
  title: 'Firebase App Distribution Action',
  tagline: 'Open-source GitHub Action wrapping Firebase App Distribution for drop-in CI delivery',
  year: 2025,
  role: 'Sole author and maintainer',
  status: 'shipped',
  tech: ['TypeScript', 'GitHub Actions', 'Firebase App Distribution', 'Node.js'],
  links: [
    { label: 'GitHub', href: 'https://github.com/logickoder/firebase-distribution' }
  ],
  summary:
    "A reusable GitHub Action that delivers Android builds to Firebase App Distribution without per-project CLI plumbing. Built originally for one engagement, reused at every Android job I've held since.",
  sections: [
    { type: 'heading', level: 2, text: 'Problem' },
    {
      type: 'prose',
      content:
        "Every Android team I joined had a hand-rolled Firebase distribution step in their CI — wget the Firebase CLI, juggle service-account credentials, parse changelog from the commit, retry on flaky uploads. Each implementation slightly different. Each broken in slightly different ways. Each owned by no one."
    },
    { type: 'heading', level: 2, text: 'Approach' },
    {
      type: 'prose',
      content:
        'Standard GitHub Action contract — pass the APK path, service-account JSON, app ID, tester groups. The Action does the CLI dance, surfaces clear errors, retries on transient network failures, supports optional release notes from a file or inline string.'
    },
    {
      type: 'code',
      language: 'yaml',
      code: `- uses: logickoder/firebase-distribution@v1
  with:
    app-id: \${{ secrets.FIREBASE_APP_ID }}
    service-credentials-file: \${{ secrets.FIREBASE_SA }}
    file: app/build/outputs/apk/release/app-release.apk
    groups: qa, internal
    release-notes: \${{ github.event.head_commit.message }}`
    },
    { type: 'heading', level: 2, text: 'Design decisions' },
    { type: 'heading', level: 3, text: 'TypeScript over composite Action' },
    {
      type: 'prose',
      content:
        'Composite Actions stitching shell commands work until they need to handle errors or branch on Firebase CLI output. TypeScript with `@actions/core` + `@actions/exec` is the lower-friction long-term choice — proper logging, masked secrets, clean retry logic.'
    },
    { type: 'heading', level: 3, text: 'Service-account file, not API key' },
    {
      type: 'prose',
      content:
        'Firebase App Distribution accepts both an API key flow and a service-account flow. Service-account is the only sane choice for CI — scoped permissions, revocable, auditable.'
    },
    { type: 'heading', level: 2, text: 'Outcome' },
    {
      type: 'list',
      items: [
        'Replaced the hand-rolled Firebase distribution step at multiple engagements',
        'Single source of truth for the upload flow — fix once, ship everywhere',
        'No more "the CI broke and only Adam knows why" — the implementation is in one repo, owned'
      ]
    }
  ]
};

export default firebaseDistribution;
