import skills from '../data/skills.ts';

export default function SkillsSection() {
  return (
    <section className="px-6 py-16 sm:px-10 sm:py-20 lg:px-20 lg:py-24 xl:px-40" id="skills">
      <div className="container mx-auto max-w-screen-lg">
        <h2 className="mb-8 text-center font-serif text-3xl font-bold leading-tight tracking-tight sm:mb-12 sm:text-4xl">
          Skills &amp; Expertise
        </h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <div
                key={index}
                className="hover:border-primary group flex flex-col rounded-xl border border-[#3b4754] bg-[#1b2127] p-6 transition-colors duration-200"
              >
                <div className="mb-4 flex items-center gap-4">
                  <div className="text-primary group-hover:bg-primary rounded-full bg-[#283039] p-3 transition-colors group-hover:text-white">
                    <IconComponent />
                  </div>
                  <h3 className="text-lg font-bold leading-tight text-white">{category.title}</h3>
                </div>
                <ul className="space-y-2">
                  {category.skills.map((skill, skillIndex) => (
                    <li
                      key={skillIndex}
                      className="font-mono text-xs text-gray-300 transition-colors group-hover:text-gray-200 sm:text-sm"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
