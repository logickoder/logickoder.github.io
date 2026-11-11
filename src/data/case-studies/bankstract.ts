import type { CaseStudy } from './types';

const bankstract: CaseStudy = {
  slug: 'bankstract',
  title: 'bankstract',
  tagline: 'Nigerian bank statements in, reconciled transactions out',
  year: 2026,
  role: 'Sole author and maintainer',
  status: 'shipped',
  tech: ['Python', 'pdfplumber', 'PyMuPDF', 'pydantic', 'FastAPI', 'Next.js', 'Hetzner'],
  links: [
    { label: 'Live', href: 'https://bankstract.logickoder.dev' },
    { label: 'GitHub', href: 'https://github.com/logickoder/bankstract' },
    { label: 'PyPI', href: 'https://pypi.org/project/bankstract' }
  ],
  summary:
    'Open-source Python engine that turns Nigerian bank statements (PDF and XLSX) into typed, reconciled transactions, plus a hosted SaaS on top of it. Four banks today: First Bank, Opay, PalmPay and Zenith. Parsing stays in memory and nothing touches disk.',
  sections: [
    { type: 'heading', level: 2, text: 'Problem' },
    {
      type: 'prose',
      content:
        "My budgeting app went stale because typing transactions in by hand cost more than the visibility was worth. Every Nigerian bank exports a PDF, every one is laid out differently, and none of them offers an API. Every developer here solves this once, badly, in private. There's no Plaid for Nigeria, so lenders and bookkeeping tools build the same parser in-house."
    },
    { type: 'heading', level: 2, text: 'Approach' },
    {
      type: 'prose',
      content:
        'One parser module per bank behind a small contract: `detect()` says whether a file belongs to that bank, `parse()` returns transactions or raises a typed `ParseError`. Money is `Decimal`, never float. `auto` picks the parser for you, so callers never hard-code a bank.'
    },
    {
      type: 'code',
      language: 'bash',
      code: `pip install bankstract

bankstract auto statement.pdf -o transactions.csv
bankstract inspect statement.pdf   # tamper signals as JSON`
    },
    { type: 'heading', level: 2, text: 'Design decisions' },
    { type: 'heading', level: 3, text: 'Reconcile every row' },
    {
      type: 'prose',
      content:
        "Each row's running balance must equal the previous balance plus or minus its debit or credit. A mismatch raises `ReconciliationError` with the row index. That one check catches the failure mode that killed my first script: rows silently dropped by a bad page break."
    },
    { type: 'heading', level: 3, text: "Don't trust a sign" },
    {
      type: 'prose',
      content:
        'Debit and credit columns carry no sign, so a negative value means the parser misread the layout. It raises `LayoutDriftError` instead of passing reconciliation and reaching consumers as a clean result. Zero is always written unsigned, never `-0.00`.'
    },
    { type: 'heading', level: 3, text: 'Check the document, not only the numbers' },
    {
      type: 'prose',
      content:
        '`inspect()` reports tamper signals: reconciliation, revisions, the producing software, fonts and font sizes, and fills drawn over text, including a cover cut into thin strips.'
    },
    { type: 'heading', level: 3, text: 'Isolate hostile files' },
    {
      type: 'prose',
      content:
        'Every entry point takes `isolate=True`. The call runs in a child process with a time limit (60s by default) and, on Linux, a memory limit (2048 MB). A worker that runs out of either raises `ResourceLimitError`, which is deliberately not a `ParseError`.'
    },
    { type: 'heading', level: 2, text: 'The hosted side' },
    {
      type: 'prose',
      content:
        'bankstract.logickoder.dev runs Next.js and FastAPI on one Hetzner box behind caddy-docker-proxy, with Better Auth and Paystack subscriptions. The engine is MIT and the cloud is AGPL-3.0, so a fintech security review can read the whole path a statement takes.'
    },
    { type: 'heading', level: 2, text: 'Outcome' },
    {
      type: 'list',
      items: [
        'On PyPI as `bankstract` (0.18.3), with parsers for First Bank, Opay, PalmPay and Zenith',
        'Live SaaS at bankstract.logickoder.dev',
        'Typed error hierarchy, reconciliation, tamper signals and process isolation in the public API'
      ]
    },
    { type: 'heading', level: 2, text: "What I'd do next" },
    {
      type: 'list',
      items: ['GTB and Wise parsers', 'Batch XLSX import', 'OCR for scanned statements']
    }
  ]
};

export default bankstract;
