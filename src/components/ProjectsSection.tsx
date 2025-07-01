const projects = [
  {
    title: 'Mobile App for Fitness Tracking',
    description: 'A fitness tracking app with personalized workout plans and progress tracking.',
    href: '#'
  },
  {
    title: 'Web Dashboard for Data Analytics',
    description: 'A web dashboard for visualizing and analyzing large datasets.',
    href: '#'
  },
  {
    title: 'E-commerce Platform for Local Artisans',
    description: 'An e-commerce platform showcasing and selling products from local artisans.',
    href: '#'
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
          Projects
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group flex flex-col overflow-hidden rounded-xl bg-[#1b2127] shadow-lg transition-shadow duration-300 hover:shadow-xl"
            >
              <div className="relative aspect-video w-full overflow-hidden bg-gray-800 bg-cover bg-center bg-no-repeat">
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-colors duration-300 group-hover:bg-black/40 group-hover:opacity-100">
                  <a
                    className="rounded-md border border-white px-4 py-2 text-white transition-colors hover:bg-white/10"
                    href={project.href}
                  >
                    View Details
                  </a>
                </div>
              </div>
              <div className="flex-grow p-6">
                <h3 className="mb-2 text-lg font-semibold leading-tight text-white">
                  {project.title}
                </h3>
                <p className="text-sm font-normal leading-relaxed text-[#9cabba]">
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
