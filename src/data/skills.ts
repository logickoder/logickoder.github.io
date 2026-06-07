import {
  ApiIcon,
  ArchitectureIcon,
  CodeIcon,
  DevOpsIcon,
  FlutterIcon,
  TeamIcon
} from '../components/icons';

const skills = [
  {
    icon: FlutterIcon,
    title: 'Mobile (primary)',
    skills: [
      'Android (SDK, Jetpack Compose)',
      'Kotlin Multiplatform (KMM)',
      'Compose Multiplatform (CMP)',
      'Flutter',
      'React Native'
    ]
  },
  {
    icon: CodeIcon,
    title: 'Languages',
    skills: ['Kotlin', 'Java', 'Dart', 'JavaScript', 'TypeScript', 'Python']
  },
  {
    icon: ApiIcon,
    title: 'Frontend',
    skills: ['React', 'Next.js', 'Vite', 'Tailwind CSS']
  },
  {
    icon: ApiIcon,
    title: 'Networking / SDK',
    skills: ['OkHttp', 'Retrofit', 'Ktor', 'Reflection-based runtime traversal']
  },
  {
    icon: DevOpsIcon,
    title: 'Backend & Cloud',
    skills: ['Node.js (Express)', 'AWS Lambda', 'MongoDB', 'PostgreSQL', 'Firebase']
  },
  {
    icon: ArchitectureIcon,
    title: 'Architecture',
    skills: ['Clean Architecture', 'MVI', 'Modular Design', 'KMP DI (Koin)']
  },
  {
    icon: TeamIcon,
    title: 'CI / CD',
    skills: ['GitHub Actions', 'Xcode Cloud', 'AWS OpenID Connect deploy']
  }
];

export default skills;
