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
    liveUrl: 'https://incrop.vercel.app',
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
      'https://play-lh.googleusercontent.com/9yjyi9equy6qZWozwyNFm6_woeftLlGUtTSobAnoZKeVx5N95cho2ikQ5auh0yucAA=w416-h235-rw',
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
    title: 'Zenky',
    description:
      'A customizable Android launcher with gesture controls, and performance optimization for enhanced user experience.',
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
    image:
      'https://play-lh.googleusercontent.com/SLxHWremOWxwoSAIvrMdHowjGUrDxShkRx7sIyeQWSsqX1HRZcz1NxsJN-HqXOS8lw=w416-h235-rw',
    liveUrl: 'https://play.google.com/store/apps/details?id=com.farmex.vendor',
    featured: false,
    year: '2025'
  }
];

export default projects;
