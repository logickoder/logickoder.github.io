import skills from '../data/skills.ts';
import { motion } from 'framer-motion';

export default function SkillsSection() {
  return (
    <section className="px-6 py-16 sm:px-10 sm:py-20 lg:px-20 lg:py-24 xl:px-40" id="skills">
      <div className="container mx-auto max-w-screen-lg">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8 text-center text-3xl font-bold leading-tight tracking-tight sm:mb-12 sm:text-4xl"
        >
          Skills & Expertise
        </motion.h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="hover:border-primary group flex transform flex-col rounded-xl border border-[#3b4754] bg-[#1b2127] p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
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
                      className="text-sm text-gray-300 transition-colors group-hover:text-gray-200"
                    >
                      • {skill}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

        {/* Additional Skills Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-base text-gray-400 sm:text-lg">
            Specialized in <span className="text-primary font-semibold">SDK development</span>,
            <span className="text-primary font-semibold"> cross-platform systems</span>, and
            <span className="text-primary font-semibold"> performance optimization</span> for
            fintech, logistics, and consumer apps.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
