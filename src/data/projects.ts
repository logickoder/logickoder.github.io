export type ProjectCategory = 'Mobile' | 'Web' | 'Full-stack' | 'Tools';

export type MiniUi = 'bankstract' | 'agent-bridge' | 'retrostash' | 'redactly';

interface ProjectLink {
  label: string;
  href: string;
}

export interface Project {
  title: string;
  kind: string;
  line: string;
  stack: string;
  category: ProjectCategory;
  /** Year group on /projects. Grimaldi work uses `group` instead. */
  year?: number;
  group?: 'grimaldi';
  links: ProjectLink[];
  caseStudySlug?: string;
  /**
   * Home page slot, 1–4. Rule: verifiable (live link or public repo), backs the
   * headline, shipped or updated in the last 12 months, nothing confidential.
   */
  featured?: 1 | 2 | 3 | 4;
  mini?: MiniUi;
  /** Longer copy for the home page row. */
  homeLine?: string;
  homeStack?: string;
  homeCta?: string;
}

const gh = (repo: string): ProjectLink => ({ label: 'GitHub', href: `https://github.com/${repo}` });

export const grimaldiNote = 'Aug 2022 to now · internal apps for PTML terminal ops · no public repos';

const projects: Project[] = [
  // Grimaldi Group (employer since Aug 2022, internal apps). CV-level detail only, no links.
  // Kind = type of work only; the group header already says Grimaldi.
  {
    group: 'grimaldi',
    category: 'Mobile',
    title: 'Releasing App',
    kind: 'Compose Multiplatform · in production',
    line: 'Cargo-releasing app for PTML terminal operators. Owned since 2022: printing, GPS and terminal maps, camera capture, encrypted traffic, one build per company and server. Then moved it to Compose Multiplatform: one codebase on Android (production), desktop, web (Wasm) and a native CLI.',
    stack: 'Kotlin Multiplatform · Compose Multiplatform · Ktor · Room',
    links: []
  },
  {
    group: 'grimaldi',
    category: 'Mobile',
    title: 'PTML Launcher',
    kind: 'Android · Device Owner kiosk',
    line: 'Kiosk launcher that replaced paid MDM on a ~100-device fleet. Policy lockdown, remote config and fleet-wide remote commands.',
    stack: 'Kotlin · Jetpack Compose · DevicePolicyManager · Firebase',
    links: []
  },
  {
    group: 'grimaldi',
    category: 'Full-stack',
    title: 'Helm',
    kind: 'Backend · admin dashboard',
    line: 'Self-hosted backend and admin dashboard for the launcher fleet. Replaces its Firebase dependency with a config store, device pulse history and WebSocket commands.',
    stack: 'C# · .NET 10 · Blazor · ASP.NET Core',
    links: []
  },
  {
    group: 'grimaldi',
    category: 'Tools',
    title: 'PTML Releases',
    kind: 'Release tooling · whole stack',
    line: 'Release tooling for every app in the stack: generates per-app and shared build values, renames APKs by application ID and version, and writes the final release output.',
    stack: 'Python',
    links: []
  },
  {
    group: 'grimaldi',
    category: 'Mobile',
    title: 'Driver App',
    kind: 'Android · delivery orders',
    line: 'Terminal Delivery Order acceptance for truck drivers, one build per environment. Native Android, now moving to Kotlin Multiplatform on the Releasing App\'s shared modules.',
    stack: 'Kotlin · Android · Kotlin Multiplatform',
    links: []
  },
  {
    group: 'grimaldi',
    category: 'Mobile',
    title: 'Management App',
    kind: 'Android · operations dashboards',
    line: 'Terminal operations for management: vessel schedule and line-up, discharge progress, delivery, stock and barge reports, bill-of-lading search with barcode scanning and lock/unlock, push notifications. Modules shown per user from server-side permissions. Later redesigned every screen.',
    stack: 'Kotlin · Jetpack Compose · CameraX + ML Kit · Retrofit',
    links: []
  },

  // 2026
  {
    year: 2026,
    category: 'Full-stack',
    title: 'bankstract',
    kind: 'Live SaaS · open-source engine',
    line: 'Parses Nigerian bank statements (FBN, Opay, PalmPay, Zenith) in memory, no disk writes. Python engine on PyPI, hosted SaaS with Paystack subscriptions.',
    stack: 'Python · FastAPI · Next.js · Better Auth · Hetzner',
    links: [{ label: 'Live', href: 'https://bankstract.logickoder.dev' }, gh('logickoder/bankstract')],
    caseStudySlug: 'bankstract',
    featured: 1,
    mini: 'bankstract',
    homeLine:
      'Open-source engine and hosted SaaS for parsing Nigerian bank statements. Four bank parsers, in-memory streaming, zero disk writes.',
    homeStack: 'Python (PyPI) · Next.js 16 · FastAPI · Hetzner',
    homeCta: 'Read the case study'
  },
  {
    year: 2026,
    category: 'Tools',
    title: 'agent-bridge',
    kind: 'Open-source tool · MIT · npm',
    line: 'Live messaging between agent CLI sessions as named peers. Claude Code, Antigravity and opencode.',
    stack: 'TypeScript · MCP · Unix socket',
    links: [gh('logickoder/agent-bridge')],
    caseStudySlug: 'agent-bridge',
    featured: 2,
    mini: 'agent-bridge',
    homeCta: 'Read the case study'
  },
  {
    year: 2026,
    category: 'Mobile',
    title: 'Retrostash',
    kind: 'Library · Maven Central + SPM',
    line: 'Annotation-driven caching for Retrofit, OkHttp and Ktor. POST query caching and tag-based invalidation on mutation.',
    stack: 'Kotlin Multiplatform · Ktor · OkHttp',
    links: [gh('logickoder/retrostash')],
    caseStudySlug: 'retrostash',
    featured: 3,
    mini: 'retrostash',
    homeLine: 'Annotation-driven caching for Retrofit, OkHttp and Ktor. POST query caching and mutation-driven invalidation.',
    homeStack: 'Kotlin Multiplatform · Android · JVM · iOS · wasmJs',
    homeCta: 'Read the case study'
  },
  {
    year: 2026,
    category: 'Tools',
    title: 'Zedu review infrastructure',
    kind: 'HNG Zedu · reviewer and org admin',
    line: 'Shared GitHub Actions for four intern repos, safe for fork PRs, with security scans and a reviewer queue. A /test comment boots an Android emulator or Linux desktop with the PR\'s build and streams it to the reviewer\'s browser.',
    stack: 'GitHub Actions · Docker · Coolify · noVNC · KVM',
    links: [gh('zedu-hng/zedu-ci')],
    caseStudySlug: 'zedu-review-infra'
  },
  {
    year: 2026,
    category: 'Tools',
    title: 'Wallet importer',
    kind: 'Open-source CLI · npm',
    line: 'Imports bank transactions into BudgetBakers Wallet, straight from bankstract output. Keeps the time of day, handles several accounts per run, pairs transfers, and rolls a batch back.',
    stack: 'TypeScript · Node.js',
    links: [gh('logickoder/budgetbakers-wallet-importer')],
    caseStudySlug: 'wallet-importer'
  },
  {
    year: 2026,
    category: 'Web',
    title: 'Danfo',
    kind: 'Web app · launching soon',
    line: 'Turns a Nigerian bank statement into an import file for your budgeting app: YNAB, Cashew, or any of 12 apps through OFX. Free, no account, nothing stored.',
    stack: 'Next.js 16 · Cloudflare Workers · bankstract',
    links: []
  },
  {
    year: 2026,
    category: 'Mobile',
    title: 'Knock',
    kind: 'App · Compose Multiplatform',
    line: 'Local-first calendar alarms. Turns events into full-screen alarms that ring until dismissed.',
    stack: 'Kotlin Multiplatform · Room (KMP) · Ktor',
    links: [],
    caseStudySlug: 'knock'
  },
  {
    year: 2026,
    category: 'Mobile',
    title: 'Nag',
    kind: 'App · on hold until Knock ships',
    line: 'Persistent reminders with an escalation ladder. Only an explicit "I did it" stops the loop.',
    stack: 'Kotlin Multiplatform · AlarmManager',
    links: [],
    caseStudySlug: 'nag'
  },
  {
    year: 2026,
    category: 'Web',
    title: 'Redactly',
    kind: 'PWA · client-side',
    line: 'Anonymizes WhatsApp chat exports before you share them with AI models. Runs 100% in the browser.',
    stack: 'React 19 · TypeScript · Web Worker · IndexedDB',
    links: [{ label: 'Live', href: 'https://logickoder.dev/redactly/' }, gh('logickoder/redactly')],
    caseStudySlug: 'redactly',
    featured: 4,
    mini: 'redactly',
    homeCta: 'Read the case study'
  },
  {
    year: 2026,
    category: 'Mobile',
    title: 'Medscape & Univadis',
    kind: 'WebMD · contract via Tight Line',
    line: 'Main work: Native Articles, the module that moved article screens from WebViews to native. One Compose module on strict MVI feeds both apps, with the Swift side on iOS and shared logic in KMM; product reported higher retention after launch. Also work on other modules, analytics and session tracking, and fixes across the core Medscape and Univadis apps.',
    stack: 'Jetpack Compose · MVI · Swift · Kotlin Multiplatform',
    links: [
      { label: 'Medscape · Play', href: 'https://play.google.com/store/apps/details?id=com.medscape.android' },
      { label: 'Medscape · App Store', href: 'https://apps.apple.com/us/app/medscape/id321367289' },
      { label: 'Univadis · Play', href: 'https://play.google.com/store/apps/details?id=fr.univadis.consult' },
      { label: 'Univadis · App Store', href: 'https://apps.apple.com/ca/app/univadis/id922433715' }
    ]
  },
  {
    year: 2026,
    category: 'Mobile',
    title: 'StudyPal',
    kind: 'Wekoya · contract',
    line: 'Rebuilt the study app into vertical slices and ran it as sole engineer: streaming AI agent chat over a custom SSE client, an AI quiz engine with multimodal grading, six real-time multiplayer game modes over Socket.IO.',
    stack: 'React Native · Expo · TypeScript · Socket.IO',
    links: [
      { label: 'Play', href: 'https://play.google.com/store/apps/details?id=com.wekoya.app' },
      { label: 'App Store', href: 'https://apps.apple.com/us/app/wekoya/id6814532038' }
    ]
  },
  {
    year: 2026,
    category: 'Full-stack',
    title: 'MasseMarket',
    kind: 'Kylzion Labs · contract',
    line: 'Mobile and web clients for a live prediction-markets platform on one design-token system. Real-time trading over SignalR, multi-outcome markets, signup, KYC and market creation in production.',
    stack: 'Flutter · Next.js · SignalR',
    links: []
  },
  {
    year: 2026,
    category: 'Full-stack',
    title: 'Ecompliance',
    kind: 'ConsultLink (NL) · contract',
    line: 'Accounting and compliance app with role-gated portals for admins, bookkeepers and clients. OCR receipt reading and spreadsheet import, over a Laravel API.',
    stack: 'Next.js 16 · React 19 · TypeScript · TanStack Query · tesseract.js',
    links: []
  },


  // 2025
  {
    year: 2025,
    category: 'Web',
    title: 'ConsultLink',
    kind: 'ConsultLink (NL) · contract · 2024–2025',
    line: 'Platform that connects clients with consultants for legal, tax and administrative work. Real-time chat, invoices and quotations with tax, two-factor sign-in. Team of three.',
    stack: 'Next.js 16 · TypeScript · Redux Toolkit · TanStack Query · Laravel Echo',
    links: [{ label: 'Live', href: 'https://app.consultlink.nl' }]
  },
  {
    year: 2025,
    category: 'Mobile',
    title: 'AppStorys SDK',
    kind: 'Appversal · SDK',
    line: 'UI analytics SDK that walks XML View and Compose SemanticsNode trees at runtime.',
    stack: 'Android · Flutter · React Native · Reflection',
    links: [{ label: 'Site', href: 'https://appstorys.com/' }],
    caseStudySlug: 'appstorys-sdk'
  },
  {
    year: 2025,
    category: 'Mobile',
    title: 'Keyguarde',
    kind: 'App · Google Play',
    line: 'Watches notifications for keywords you pick and alerts you on a match.',
    stack: 'Jetpack Compose · Android',
    links: [
      { label: 'Play', href: 'https://play.google.com/store/apps/details?id=dev.logickoder.keyguarde' },
      gh('logickoder/keyguarde')
    ]
  },
  {
    year: 2025,
    category: 'Tools',
    title: 'Firebase App Distribution Action',
    kind: 'GitHub Action · open source',
    line: 'Drop-in CI delivery to Firebase App Distribution. The internal-build pipeline across several engagements.',
    stack: 'TypeScript · GitHub Actions · Node.js',
    links: [gh('logickoder/firebase-distribution')],
    caseStudySlug: 'firebase-distribution-action'
  },
  {
    year: 2025,
    category: 'Mobile',
    title: 'Farmex Agent & Vendor',
    kind: 'Extension Africa · contract',
    line: 'Two React Native apps: a field-agent app with an offline sync engine and OTA updates, and a vendor app for stock, orders and payouts.',
    stack: 'React Native · TypeScript · TanStack Query · MMKV',
    links: []
  },
  {
    year: 2025,
    category: 'Mobile',
    title: 'Android VPN app · 16 KB pages',
    kind: 'Upwork client · contract',
    line: 'Made an OpenVPN-based Android app work on 16 KB page-size devices after the client\'s own rebuild broke it. Rebuilt the native OpenVPN libraries from the latest upstream, updated the app\'s loader code, confirmed 16 KB alignment on every arm64 library, and handed over a fork plus a recorded build guide.',
    stack: 'Android NDK · CMake · C/C++ · OpenVPN',
    links: []
  },
  {
    year: 2025,
    category: 'Mobile',
    title: 'Pay with Mona SDK',
    kind: 'Mona · SDK contract',
    line: 'Payment SDK for the Mona platform across native and cross-platform apps.',
    stack: 'Android · Flutter · React Native',
    links: [gh('roryspies/pay_with_mona_kotlin')]
  },

  // 2024
  {
    year: 2024,
    category: 'Web',
    title: 'InCrop',
    kind: 'Web app',
    line: 'Crops and shares conversation screenshots, focused on the main content.',
    stack: 'React · TypeScript · Tailwind CSS',
    links: [{ label: 'Live', href: 'https://incrop.logickoder.dev' }, gh('logickoder/incrop')]
  },
  {
    year: 2024,
    category: 'Mobile',
    title: 'FuelCheck',
    kind: 'App · Google Play',
    line: 'Fuel prices, availability and queue lengths in Abuja.',
    stack: 'Flutter',
    links: [{ label: 'Play', href: 'https://play.google.com/store/apps/details?id=dev.logickoder.fuelcheck' }]
  },
  {
    year: 2024,
    category: 'Mobile',
    title: 'Transact',
    kind: 'App · kiosk',
    line: 'Multi-tenant kiosk app for customer transactions and visit tracking.',
    stack: 'Kotlin Multiplatform · Jetpack Compose',
    links: []
  },
  {
    year: 2024,
    category: 'Full-stack',
    title: 'iKooK',
    kind: 'iKooK · lead frontend',
    line: 'Chef booking platform: customer apps, web portal and admin dashboard.',
    stack: 'React · Flutter',
    links: [{ label: 'Live', href: 'https://ikook.co.uk' }]
  },

  // 2023
  {
    year: 2023,
    category: 'Mobile',
    title: 'YieldMax',
    kind: 'App · agritech',
    line: 'Farm yield management app for Android. Same problem space as Farmex, two years earlier.',
    stack: 'Java · Android',
    links: []
  }
];

export default projects;

export function featuredProjects(): Project[] {
  return projects
    .filter((p): p is Project & { featured: 1 | 2 | 3 | 4 } => p.featured !== undefined)
    .sort((a, b) => a.featured - b.featured);
}
