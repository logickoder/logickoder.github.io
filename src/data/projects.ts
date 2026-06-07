export interface Project {
  title: string;
  description: string;
  technologies: string[];
  category: 'Mobile' | 'Web' | 'Full-Stack';
  image?: string;
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
  year?: number;
  // When set, a deep-dive case study lives at /projects/<caseStudySlug>.
  caseStudySlug?: string;
}

const projects: Project[] = [
  {
    title: 'Retrostash',
    description:
      "Annotation-driven KMP caching library for Retrofit, OkHttp, and Ktor. Solves POST-query caching (GraphQL, search) and mutation-driven cache invalidation that stock OkHttp can't. Published to Maven Central and Swift Package Manager. Targets Android, JVM, iOS, and wasmJs.",
    technologies: ['Kotlin Multiplatform', 'Ktor', 'OkHttp', 'Retrofit'],
    category: 'Mobile',
    githubUrl: 'https://github.com/logickoder/retrostash',
    liveUrl: 'https://logickoder.dev/retrostash',
    featured: true,
    year: 2026,
    caseStudySlug: 'retrostash'
  },
  {
    title: 'Knock',
    description:
      'Local-first calendar alarm app on Compose Multiplatform (KMP). Turns calendar events into full-screen, lock-screen-bypassing alarms that ring until dismissed. Multi-source ingest (Android calendar provider, Google OAuth, ICS subscriptions, manual entry). Architectural mandate: never weaken alarm reliability.',
    technologies: ['Kotlin Multiplatform', 'Compose Multiplatform', 'Room (KMP)', 'Ktor'],
    category: 'Mobile',
    featured: true,
    year: 2026,
    caseStudySlug: 'knock'
  },
  {
    title: 'Nag',
    description:
      'High-friction persistent-reminder utility on Kotlin Multiplatform (Android-first). Active-Until-Done state with an escalation ladder — full-screen intent, louder vibration, screen-on strobe, continuous alarm. Only an explicit "I Did It" tap stops the loop. Quick Settings tile + app shortcuts for sub-second entry.',
    technologies: ['Kotlin Multiplatform', 'Compose Multiplatform', 'AlarmManager'],
    category: 'Mobile',
    featured: true,
    year: 2026,
    caseStudySlug: 'nag'
  },
  {
    title: 'AppStorys SDK',
    description:
      'Unified UI analytics SDK leveraging reflection and internal API bridging to traverse both traditional XML View hierarchies and modern Compose SemanticsNode trees at runtime for deep metadata capture.',
    technologies: ['Android', 'Flutter', 'React Native', 'Reflection'],
    category: 'Mobile',
    githubUrl: 'https://github.com/appversal/AppStorys-Android-SDK',
    liveUrl: 'https://appstorys.com/',
    featured: true,
    year: 2025,
    caseStudySlug: 'appstorys-sdk'
  },
  {
    title: 'Keyguarde',
    description:
      'An Android app to monitor notifications for user-defined keywords, alerting users of relevant messages.',
    technologies: ['Jetpack Compose', 'Android'],
    category: 'Mobile',
    githubUrl: 'https://github.com/logickoder/keyguarde',
    liveUrl: 'https://play.google.com/store/apps/details?id=dev.logickoder.keyguarde',
    image:
      'https://www.upwork.com/att/download/portfolio/persons/uid/1243946981776035840/profile/projects/files/b7b4ca57-49b5-4d5b-9ca7-b98612aabb3c',
    featured: true,
    year: 2025
  },
  {
    title: 'InCrop',
    description:
      'Web app for cropping and sharing conversation screenshots, with automatic focus on main content.',
    technologies: ['React.js', 'Tailwind CSS', 'TypeScript'],
    category: 'Web',
    githubUrl: 'https://github.com/logickoder/incrop',
    liveUrl: 'https://incrop.logickoder.dev',
    image:
      'https://www.upwork.com/att/download/portfolio/persons/uid/1243946981776035840/profile/projects/files/583a45e8-097b-40fd-b9e1-74282671c326',
    featured: true,
    year: 2024
  },
  {
    title: 'FuelCheck',
    description:
      'Real-time fuel tracking app displaying prices, availability, and queue lengths in Abuja.',
    technologies: ['Flutter'],
    category: 'Mobile',
    image:
      'https://www.upwork.com/att/download/portfolio/persons/uid/1243946981776035840/profile/projects/files/a592ef31-f000-49fb-851c-0d07d2255190',
    liveUrl: 'https://play.google.com/store/apps/details?id=dev.logickoder.fuelcheck',
    featured: true,
    year: 2024
  },
  {
    title: 'Transact',
    description:
      'A multi-tenant kiosk cross-platform application designed for customer transaction management and visit tracking.',
    technologies: ['Kotlin Multiplatform', 'Jetpack Compose'],
    category: 'Mobile',
    featured: true,
    year: 2024
  },
  {
    title: 'Firebase App Distribution Action',
    description:
      'Open-source GitHub Action wrapping Firebase App Distribution for drop-in CI delivery. Used as internal-build delivery pipeline across multiple engagements.',
    technologies: ['TypeScript', 'GitHub Actions', 'Firebase'],
    category: 'Full-Stack',
    githubUrl: 'https://github.com/logickoder/firebase-distribution',
    featured: false,
    year: 2025,
    caseStudySlug: 'firebase-distribution-action'
  },
  {
    title: 'Pay with Mona SDK',
    description: 'SDK enabling seamless payment integration for the Mona platform.',
    technologies: ['Android', 'Flutter', 'React Native'],
    category: 'Mobile',
    githubUrl: 'https://github.com/roryspies/pay_with_mona_kotlin',
    featured: false,
    year: 2025
  },
  {
    title: 'Farmex & YieldMax',
    description: 'Apps for farm inventory and yield management, built in React Native and Java.',
    technologies: ['React Native', 'Java', 'Android'],
    category: 'Mobile',
    featured: false,
    year: 2023
  },
  {
    title: 'iKooK',
    description:
      'A chef booking platform with apps and dashboards allowing users to book chefs and manage events, developed as the lead frontend engineer.',
    technologies: ['React', 'Flutter'],
    category: 'Full-Stack',
    image:
      'https://www.upwork.com/att/download/portfolio/persons/uid/1243946981776035840/profile/projects/files/d5c7de3d-e28c-4c13-aac9-86c681fa49d4',
    liveUrl: 'https://ikook.co.uk',
    featured: false,
    year: 2024
  },
  {
    title: 'Zenky Launcher – Internal Use Only',
    description:
      "A high-performance Android launcher developed for BytebyBit's internal productivity tools. Features included advanced gesture controls, app drawer customization, and deep OS integration.",
    technologies: ['Android', 'Jetpack Compose'],
    category: 'Mobile',
    featured: false,
    year: 2024
  }
];

export default projects;
