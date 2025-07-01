import { ApiIcon, ArchitectureIcon, CodeIcon, DevOpsIcon, FlutterIcon, TeamIcon } from './icons';

const skillCategories = [
  {
    icon: FlutterIcon,
    title: 'Mobile Development',
    skills: ['Flutter & Dart', 'Android SDK (Kotlin)', 'Jetpack Compose', 'React Native']
  },
  {
    icon: CodeIcon,
    title: 'Frontend Development',
    skills: ['React.js & Next.js', 'Responsive UI Design', 'State Management']
  },
  {
    icon: ApiIcon,
    title: 'Backend & APIs',
    skills: ['Firebase Services', 'Node.js', 'RESTful APIs', 'GraphQL']
  },
  {
    icon: DevOpsIcon,
    title: 'DevOps & Tooling',
    skills: ['CI/CD (GitHub Actions)', 'Gradle Optimization', 'App Store Publishing']
  },
  {
    icon: ArchitectureIcon,
    title: 'Architecture & Practices',
    skills: ['Clean Architecture', 'Modular Codebases', 'Performance Optimization']
  },
  {
    icon: TeamIcon,
    title: 'Collaboration & Leadership',
    skills: ['Technical Communication', 'Documentation', 'Mentorship']
  }
];

export const SkillsSection = () => {
  return (
    <section className="px-6 py-16 sm:px-10 sm:py-20 lg:px-20 lg:py-24 xl:px-40" id="skills">
      <div className="container mx-auto max-w-screen-lg">
        <h2 className="mb-8 text-center text-3xl font-bold leading-tight tracking-tight sm:mb-12 sm:text-4xl">
          Skills & Expertise
        </h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <div
                key={index}
                className="group flex transform flex-col rounded-xl border border-[#3b4754] bg-[#1b2127] p-6 transition-all duration-300 hover:-translate-y-2 hover:border-primary hover:shadow-xl"
              >
                <div className="mb-4 flex items-center gap-4">
                  <div className="rounded-full bg-[#283039] p-3 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                    <IconComponent />
                  </div>
                  <h3 className="text-lg font-bold leading-tight text-white">{category.title}</h3>
                </div>
                <ul className="space-y-2">
                  {category.skills.map((skill, skillIndex) => (
                    <li
                      key={skillIndex}
                      className="text-sm text-gray-300 transition-colors group-hover:text-gray-200"
                    >
                      • {skill}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Additional Skills Highlight */}
        <div className="mt-12 text-center">
          <p className="text-base text-gray-400 sm:text-lg">
            Specialized in <span className="font-semibold text-primary">SDK development</span>,
            <span className="font-semibold text-primary"> cross-platform solutions</span>, and
            <span className="font-semibold text-primary"> performance optimization</span> for
            fintech, logistics, and AI applications.
          </p>
        </div>
      </div>
    </section>
  );
};
