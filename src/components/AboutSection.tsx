export const AboutSection = () => {
  return (
    <section
      className="bg-[#161a1e] px-6 py-16 sm:px-10 sm:py-20 lg:px-20 lg:py-24 xl:px-40"
      id="about"
    >
      <div className="container mx-auto max-w-screen-lg">
        <h2 className="mb-8 text-center text-3xl font-bold leading-tight tracking-tight sm:mb-12 sm:text-left sm:text-4xl">
          About Me
        </h2>
        <div className="space-y-6">
          <p className="text-lg font-medium leading-relaxed text-white sm:text-xl">
            Hi, I'm Jeffery Orazulike — a passionate Software Engineer specializing in mobile and
            frontend development.
          </p>
          <p className="text-base font-normal leading-relaxed text-gray-300 sm:text-lg sm:leading-loose">
            With over four years of experience building cross-platform solutions, I've delivered
            performant and business-focused applications across fintech, logistics, AI, and consumer
            tech.
          </p>
          <p className="text-base font-normal leading-relaxed text-gray-300 sm:text-lg sm:leading-loose">
            My core expertise lies in developing high-quality Android and Flutter applications,
            integrating complex SDKs, and optimizing user experience across devices. I'm also
            skilled in React and Next.js for modern web frontends.
          </p>
          <p className="text-base font-normal leading-relaxed text-gray-300 sm:text-lg sm:leading-loose">
            I love solving challenging problems and bringing ideas to life — whether that's creating
            a customizable Android launcher, building seamless hardware integrations, or designing
            intuitive interfaces for startups and established businesses alike.
          </p>
          <p className="text-base font-normal leading-relaxed text-gray-300 sm:text-lg sm:leading-loose">
            When I'm not coding, you'll find me exploring emerging technologies, writing about
            development best practices, or tinkering with new project ideas.
          </p>
          <div className="pt-4">
            <p className="text-lg font-medium text-primary">
              If you're looking for a reliable engineer who combines technical depth with a strong
              sense of ownership, let's connect.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
