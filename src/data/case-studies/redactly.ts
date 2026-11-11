import type { CaseStudy } from './types';

const redactly: CaseStudy = {
  slug: 'redactly',
  title: 'Redactly',
  tagline: 'Anonymize a chat export before an AI model ever sees it',
  year: 2026,
  role: 'Sole author',
  status: 'shipped',
  tech: ['React 19', 'TypeScript', 'Web Worker', 'IndexedDB', 'PWA', 'Zustand'],
  links: [
    { label: 'Try it', href: 'https://logickoder.dev/redactly/' },
    { label: 'GitHub', href: 'https://github.com/logickoder/redactly' }
  ],
  summary:
    'A privacy-first PWA that strips names, contact details and unsafe content from WhatsApp chat exports so you can hand them to Claude or ChatGPT. Everything runs in the browser. No server, no uploads.',
  sections: [
    { type: 'heading', level: 2, text: 'Problem' },
    {
      type: 'prose',
      content:
        "A friend told me about a problem they kept running into. In the middle of a conversation, sometimes a negotiation, they'd want an AI to read the chat and help them think it through. But pasting it in meant handing over names, phone numbers and emails, theirs and the other person's. Redacting by hand is slow and you miss things, and the tools that do it for you want the file uploaded to their server first, which defeats the point."
    },
    { type: 'heading', level: 2, text: 'Approach' },
    {
      type: 'prose',
      content:
        'Drop in a `.txt` export or paste the text. Redactly finds every sender, gives each one an alias, masks personal details, filters content a model would refuse, and hands back the same chat with its timestamps and line breaks intact. Parsing and redaction run in a Web Worker, so a large chat never freezes the page.'
    },
    {
      type: 'code',
      language: 'text',
      code: `before  [10:42] Ada Okafor: call me on 0803 123 4567
after   [10:42] Participant 1: call me on [PHONE]`
    },
    { type: 'heading', level: 2, text: 'Design decisions' },
    { type: 'heading', level: 3, text: 'Aliases, not deletions' },
    {
      type: 'prose',
      content:
        'Each sender keeps a stable alias, so the model can still follow who said what. Aggressive mode also catches name fragments inside message bodies, and you can add names that appear in messages but never sent one. Alias mappings persist, so a repeat contact gets the same alias next time.'
    },
    { type: 'heading', level: 3, text: 'PII by category' },
    {
      type: 'prose',
      content:
        'Emails, links and phone numbers each have their own switch and their own token (`[EMAIL]`, `[LINK]`, `[PHONE]`), so you decide what the model gets to see.'
    },
    { type: 'heading', level: 3, text: 'A filter that reads leetspeak' },
    {
      type: 'prose',
      content:
        'Models refuse chats with certain content. The filter has three tiers (general profanity, slurs, graphic violence), catches leetspeak spellings, and takes your own word list and allowlist. It can mask a word or soften it.'
    },
    { type: 'heading', level: 3, text: 'Nothing leaves the device' },
    {
      type: 'prose',
      content:
        'History lives in IndexedDB on your machine. It works offline after the first visit and installs as an app. Analytics are opt-in, cookieless and off by default, and honour Do Not Track.'
    },
    { type: 'heading', level: 2, text: 'Outcome' },
    {
      type: 'list',
      items: [
        'Shipped against its PRD (v1.2) as an installable PWA at logickoder.dev/redactly',
        'Date-range trimming, clipboard or file export, and saved history',
        'Off-thread parsing for large exports'
      ]
    },
    { type: 'heading', level: 2, text: "What I'd do next" },
    {
      type: 'list',
      items: ['Format presets tuned for different AI tools', 'Editing the pasted text before parsing']
    }
  ]
};

export default redactly;
