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
}

const projects: Project[] = [
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
    title: 'Transact',
    description:
      'A multi-tenant kiosk cross-platform application designed for customer transaction management and visit tracking.',
    technologies: ['Kotlin Multiplatform', 'Jetpack Compose'],
    category: 'Mobile',
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
    title: 'Farmex & YieldMax',
    description: 'Apps for farm inventory and yield management, built in React Native and Java.',
    technologies: ['React Native', 'Java', 'Android'],
    category: 'Mobile',
    featured: false,
    year: 2023
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
    title: 'AppStorys SDK',
    description: 'Analytics SDK capturing view tree metadata for mobile apps.',
    technologies: ['Android', 'Flutter', 'React Native'],
    category: 'Mobile',
    githubUrl: 'https://github.com/appversal/AppStorys-Android-SDK',
    liveUrl: 'https://appstorys.com/',
    featured: false,
    year: 2025
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
      'A high-performance Android launcher developed for BytebyBit’s internal productivity tools. Features included advanced gesture controls, app drawer customization, and deep OS integration.',
    technologies: ['Android', 'Jetpack Compose'],
    category: 'Mobile',
    featured: false,
    year: 2024
  }
];

export default projects;

