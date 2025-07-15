export interface Project {
  title: string;
  description: string;
  technologies: string[];
  category: 'Mobile' | 'Web' | 'Full-Stack';
  image?: string;
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
  year?: string;
}

const projects: Project[] = [
  {
    title: 'InCrop',
    description:
      'A web app to share cropped conversations while removing unnecessary parts, keeping only the main areas visible.',
    technologies: ['React', 'Tailwind CSS', 'TypeScript', 'Vike'],
    category: 'Web',
    githubUrl: 'https://github.com/logickoder/incrop',
    liveUrl: 'https://incrop.logickoder.dev',
    image:
      'https://www.upwork.com/att/download/portfolio/persons/uid/1243946981776035840/profile/projects/files/583a45e8-097b-40fd-b9e1-74282671c326',
    featured: true,
    year: '2024'
  },
  {
    title: 'Keyguarde',
    description:
      'An Android app that monitors notifications for user-defined keywords and alerts the user, helping to filter important messages from noisy chats.',
    technologies: ['Kotlin', 'Jetpack Compose', 'Android'],
    category: 'Mobile',
    githubUrl: 'https://github.com/logickoder/keyguarde',
    liveUrl: 'https://play.google.com/store/apps/details?id=dev.logickoder.keyguarde',
    image:
      'https://www.upwork.com/att/download/portfolio/persons/uid/1243946981776035840/profile/projects/files/b7b4ca57-49b5-4d5b-9ca7-b98612aabb3c',
    featured: true,
    year: '2025'
  },
  {
    title: 'Pay with Mona Kotlin SDK',
    description:
      'A Kotlin SDK for integrating payment capabilities into Android apps via the Pay with Mona platform.',
    technologies: ['Kotlin', 'Jetpack Compose', 'Android', 'Key Exchange'],
    category: 'Mobile',
    githubUrl: 'https://github.com/roryspies/pay_with_mona_kotlin',
    featured: false,
    year: '2025'
  },
  {
    title: 'AppStorys SDK',
    description:
      'An analytics SDK for Android apps that captures view tree metadata for xml and compose and sends it over to the backend.',
    technologies: ['Kotlin', 'Android', 'Jetpack Compose', 'XML'],
    category: 'Mobile',
    githubUrl: 'https://github.com/appversal/AppStorys-Android-SDK',
    liveUrl: 'https://appstorys.com/',
    featured: true,
    year: '2025'
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
    year: '2024'
  },
  {
    title: 'Zenky Launcher – Internal Use Only',
    description:
      'A high-performance Android launcher developed for BytebyBit’s internal productivity tools. Features included advanced gesture controls, app drawer customization, and deep OS integration. (Not publicly distributed.)',
    technologies: ['Android', 'Kotlin', 'Jetpack Compose'],
    category: 'Mobile',
    featured: false,
    year: '2023'
  },
  {
    title: 'FuelCheck',
    description:
      'FuelCheck is a real-time fuel tracking app I built to help users find fuel availability, prices, and queue lengths in Abuja. The app collects and updates data via both user submissions and automated processes to ensure accuracy and speed.',
    technologies: ['Dart', 'Flutter'],
    category: 'Mobile',
    image:
      'https://www.upwork.com/att/download/portfolio/persons/uid/1243946981776035840/profile/projects/files/a592ef31-f000-49fb-851c-0d07d2255190',
    liveUrl: 'https://play.google.com/store/apps/details?id=dev.logickoder.fuelcheck',
    featured: false,
    year: '2024'
  },
  {
    title: 'Farmex',
    description:
      'Farmex is a comprehensive farm management app designed to help farmers track their crops, manage resources, and optimize yields. It features real-time data collection, crop monitoring, and resource management tools.',
    technologies: ['React', 'React Native', 'Android'],
    category: 'Mobile',
    image: 'https://farmex.extensionafrica.com/images/farmex-logo-main-with-tagline.png',
    liveUrl: 'https://play.google.com/store/apps/details?id=com.farmex.vendor',
    featured: false,
    year: '2025'
  },
  {
    title: 'ConsultLink',
    description:
      'A web platform connecting consultants with clients for various projects, similar to Upwork or Fiverr. Built with Next.js for optimised full-stack performance.',
    technologies: ['React', 'Next.js'],
    category: 'Web',
    liveUrl: 'https://consultlink.nl',
    featured: false,
    year: '2024'
  },
  {
    title: 'YieldMax',
    description:
      'A native Android farm inventory management tool that helps farmers efficiently track and manage farm yield and inventory.',
    technologies: ['Java', 'Android', 'XML'],
    category: 'Mobile',
    liveUrl: 'https://play.google.com/store/apps/details?id=kitovu.com.technology',
    featured: false,
    year: '2024'
  }
];

export default projects;
