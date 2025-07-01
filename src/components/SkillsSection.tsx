import { CloudIcon, CodeIcon, DatabaseIcon, DesktopIcon, MobileIcon } from './icons';

const skills = [
  {
    icon: CodeIcon,
    title: 'Frontend Development'
  },
  {
    icon: MobileIcon,
    title: 'Mobile Development'
  },
  {
    icon: DesktopIcon,
    title: 'Responsive Design'
  },
  {
    icon: DatabaseIcon,
    title: 'Backend Integration'
  },
  {
    icon: CloudIcon,
    title: 'Cloud Services'
  },
  {
    icon: DatabaseIcon,
    title: 'Server-Side Rendering'
  }
];

export const SkillsSection = () => {
  return (
    <section className="px-6 py-16 sm:px-10 sm:py-20 lg:px-20 lg:py-24 xl:px-40" id="skills">
      <div className="container mx-auto max-w-screen-lg">
        <h2 className="mb-8 text-center text-3xl font-bold leading-tight tracking-tight sm:mb-12 sm:text-4xl">
          Skills
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
          {skills.map((skill, index) => {
            const IconComponent = skill.icon;
            return (
              <div
                key={index}
                className="flex transform flex-col items-center gap-4 rounded-xl border border-[#3b4754] bg-[#1b2127] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-lg"
              >
                <div className="rounded-full bg-[#283039] p-3 text-primary">
                  <IconComponent />
                </div>
                <h3 className="text-center text-lg font-bold leading-tight text-white">
                  {skill.title}
                </h3>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
