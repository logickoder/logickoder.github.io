import { motion } from 'framer-motion';

export default function AboutSection() {
  return (
    <section
      className="bg-[#161a1e] px-6 py-16 sm:px-10 sm:py-20 lg:px-20 lg:py-24 xl:px-40"
      id="about"
    >
      <div className="container mx-auto max-w-screen-lg">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8 text-center text-3xl font-bold leading-tight tracking-tight sm:mb-12 sm:text-left sm:text-4xl"
        >
          About Me
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-6"
        >
          <p className="text-lg font-medium leading-relaxed text-white sm:text-xl">
            Hi, I'm Jeffery Orazulike — a Senior Software Engineer specializing in mobile and
            frontend development.
          </p>
          <p className="text-base font-normal leading-relaxed text-gray-300 sm:text-lg sm:leading-loose">
            With 5+ years of experience designing scalable mobile and web solutions, I have a proven
            record of delivering high-quality products across fintech, logistics, and consumer apps.
          </p>
          <p className="text-base font-normal leading-relaxed text-gray-300 sm:text-lg sm:leading-loose">
            My core expertise lies in Android (Kotlin/Java), Flutter, and React Native. I am skilled
            in building SDKs, architecting cross-platform systems, and leading end-to-end
            development. I am committed to creating secure, performant, and intuitive user
            experiences.
          </p>
          <p className="text-base font-normal leading-relaxed text-gray-300 sm:text-lg sm:leading-loose">
            I love solving challenging problems and bringing ideas to life — whether that's creating
            a customizable Android launcher, building seamless hardware integrations, or designing
            intuitive interfaces for startups and established businesses alike.
          </p>

          <div className="pt-4">
            <p className="text-primary text-lg font-medium">
              If you're looking for a reliable engineer who combines technical depth with a strong
              sense of ownership, let's connect.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
