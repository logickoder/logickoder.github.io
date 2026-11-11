import type { CaseStudy } from './types';

const zeduReviewInfra: CaseStudy = {
  slug: 'zedu-review-infra',
  title: 'Zedu review infrastructure',
  tagline: 'PR review for an intern cohort: safe CI for forks, and real devices in the browser',
  year: 2026,
  role: 'Reviewer and org admin, HNG Zedu',
  status: 'shipped',
  tech: ['GitHub Actions', 'Docker', 'Coolify', 'noVNC', 'Android emulator (KVM)', 'oauth2-proxy'],
  links: [{ label: 'zedu-ci on GitHub', href: 'https://github.com/zedu-hng/zedu-ci' }],
  summary:
    'The review pipeline behind the HNG Zedu org: shared GitHub Actions workflows for the web, mobile, desktop and backend repos, and device previews that boot an Android emulator or a Linux desktop from a PR comment and stream it to the reviewer\'s browser.',
  sections: [
    { type: 'heading', level: 2, text: 'Problem' },
    {
      type: 'prose',
      content:
        'Intern teams open pull requests from forks, many of them, all at once. Fork PRs can\'t safely get write access or secrets, yet reviewers still need checks, routing and builds. And to review a mobile or desktop change, a reviewer had to download a build or wait on a hosted device service.'
    },
    { type: 'heading', level: 2, text: 'Approach' },
    {
      type: 'prose',
      content:
        'One repo, `zedu-ci`, holds reusable workflows that every product repo calls, each reference pinned to a full commit SHA. Jobs that need write access never check out PR code. Untrusted code only runs in read-only jobs that use config from the base branch.'
    },
    {
      type: 'code',
      language: 'text',
      code: `/test android    →  Android 14 emulator on KVM, streamed over noVNC
/test desktop    →  Linux desktop session with the PR's build
/claim /release  →  take or hand back a PR in the reviewer queue`
    },
    { type: 'heading', level: 2, text: 'Design decisions' },
    { type: 'heading', level: 3, text: 'Split trusted and untrusted work' },
    {
      type: 'prose',
      content:
        'PR rules, team routing, lead approval and the fork build relay run with `pull_request_target` and never touch PR code. Scans run on the PR in read-only jobs: Semgrep, ClamAV and an obfuscation scan everywhere, plus Gitleaks on mobile and Trivy on desktop.'
    },
    { type: 'heading', level: 3, text: 'Devices in the browser, locked down' },
    {
      type: 'prose',
      content:
        'A `/test` comment starts a session on the PR\'s own build. Only the reviewers team gets in, through oauth2-proxy. Each session has its own 32-byte token. Containers run with a read-only root and dropped capabilities, egress firewall rules are re-applied at boot, and a session lasts 30 minutes with one 15-minute extension. It replaced uploading fork builds to Appetize.'
    },
    { type: 'heading', level: 3, text: 'A queue reviewers can work through' },
    {
      type: 'prose',
      content:
        'Each team holds at most five unclaimed PRs. Reviewers claim and release with a comment, and a merge needs one approval. Web previews deploy per team on the org\'s Coolify server.'
    },
    { type: 'heading', level: 2, text: 'What I built' },
    {
      type: 'list',
      items: [
        'Device previews end to end: the session agent, images and lockdown',
        'Fork build relay, build gate, lead approval, team routing and the obfuscation scan',
        'Per-team web previews on Coolify',
        'Most of zedu-ci (113 of 167 commits); a co-maintainer built the assignment, nudge and feedback workflows'
      ]
    },
    { type: 'heading', level: 2, text: 'Outcome' },
    {
      type: 'list',
      items: [
        '4 product repos call the shared workflows, every reference pinned by SHA',
        '30 workflow files in the public zedu-ci repo',
        'Reviewers test Android and desktop changes from a PR comment, with nothing to download'
      ]
    }
  ]
};

export default zeduReviewInfra;
