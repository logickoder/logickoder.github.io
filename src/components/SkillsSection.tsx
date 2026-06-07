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
                className="hover:border-primary/60 group flex flex-col rounded-xl border border-gray-800 bg-[#161a1e] p-6 transition-colors duration-200"
              >
                <div className="mb-5 flex items-center gap-3">
                  <div className="text-primary border-primary/30 bg-primary/10 group-hover:bg-primary group-hover:text-white inline-flex items-center justify-center rounded-lg border p-2.5 transition-colors">
                    <IconComponent />
                  </div>
                  <h3 className="font-serif text-lg font-bold leading-tight text-white">
                    {category.title}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="border-primary/30 bg-primary/10 text-primary rounded-full border px-2.5 py-0.5 font-mono text-xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
