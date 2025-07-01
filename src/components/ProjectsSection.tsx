import { ArrowRightIcon } from './icons';

interface Project {
  title: string;
  description: string;
  technologies: string[];
  category: 'Mobile' | 'Web' | 'Full-Stack';
  image?: string;
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
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
    featured: true
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
    featured: true
  },
  {
    title: 'Pay with Mona Kotlin SDK',
    description:
      'A Kotlin SDK for integrating payment capabilities into Android apps via the Pay with Mona platform.',
    technologies: ['Kotlin', 'Jetpack Compose', 'Android', 'Key Exchange'],
    category: 'Mobile',
    githubUrl: 'https://github.com/roryspies/pay_with_mona_kotlin',
    featured: false
  },
  {
    title: 'AppStorys SDK',
    description:
      'An analytics SDK for Android apps that captures view tree metadata for xml and compose and sends it over to the backend.',
    technologies: ['Kotlin', 'Android', 'Jetpack Compose', 'XML'],
    category: 'Mobile',
    githubUrl: 'https://github.com/appversal/AppStorys-Android-SDK',
    liveUrl: 'https://appstorys.com/',
    featured: false
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
    featured: false
  },
  {
    title: 'Zenky',
    description:
      'A customizable Android launcher with  gesture controls, and performance optimization for enhanced user experience.',
    technologies: ['Android', 'Kotlin', 'Jetpack Compose'],
    category: 'Mobile',
    featured: false
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
    featured: false
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
    featured: false
  }
];

export const ProjectsSection = () => {
  return (
    <section
      className="bg-[#161a1e] px-6 py-16 sm:px-10 sm:py-20 lg:px-20 lg:py-24 xl:px-40"
      id="projects"
    >
      <div className="container mx-auto max-w-screen-lg">
        <h2 className="mb-8 text-center text-3xl font-bold leading-tight tracking-tight sm:mb-12 sm:text-4xl">
          Featured Projects
        </h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group flex flex-col overflow-hidden rounded-xl border border-[#3b4754] bg-[#1b2127] shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-xl"
            >
              {/* Project Image Placeholder */}
              <div className="relative aspect-video w-full overflow-hidden bg-gradient-to-br from-primary/20 to-primary/5">
                <div className="absolute inset-0 flex items-center justify-center">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="rounded-full bg-primary/20 p-4">
                      <div className="h-8 w-8 rounded bg-primary/40"></div>
                    </div>
                  )}
                </div>
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-all duration-300 group-hover:bg-black/40 group-hover:opacity-100">
                  <div className="flex gap-3">
                    {project.githubUrl && (
                      <a
                        className="rounded-md border border-white px-3 py-2 text-sm text-white transition-colors hover:bg-white/10"
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Code
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        className="rounded-md bg-primary px-3 py-2 text-sm text-white transition-colors hover:bg-primary/80"
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
                {project.featured && (
                  <div className="absolute left-3 top-3">
                    <span className="rounded-full bg-primary px-2 py-1 text-xs font-semibold text-white">
                      Featured
                    </span>
                  </div>
                )}
              </div>

              {/* Project Content */}
              <div className="flex flex-1 flex-col p-6">
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="text-lg font-semibold leading-tight text-white">
                    {project.title}
                  </h3>
                  <span className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                    {project.category}
                  </span>
                </div>

                <p className="mb-4 flex-1 text-sm leading-relaxed text-[#9cabba]">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="rounded bg-[#283039] px-2 py-1 text-xs text-gray-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <p className="mb-4 text-gray-400">
            Interested in collaborating or learning more about my work?
          </p>
          <a
            href="mailto:chukwudumebiorazulike@gmail.com"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-white transition-colors hover:bg-primary/80"
          >
            Let's Connect
            <ArrowRightIcon />
          </a>
        </div>
      </div>
    </section>
  );
};
