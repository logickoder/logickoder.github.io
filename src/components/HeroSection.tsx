import useSmoothScroll from '../hooks/useSmoothScroll.ts';
import { motion } from 'framer-motion';

export default function HeroSection() {
  const { scroll } = useSmoothScroll();
  return (
    <section
      className="relative flex min-h-[85vh] flex-col justify-center overflow-hidden px-6 py-20 sm:px-10 sm:py-24 lg:px-20 xl:px-40"
      id="hero"
    >
      {/* Background image — desaturated, low-opacity */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-25"
        style={{ backgroundImage: 'url("/hero.webp")' }}
        aria-hidden="true"
      />
      {/* Editorial gradient overlay — strong left, soft right */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-chinese-black via-chinese-black/95 to-chinese-black/40"
        aria-hidden="true"
      />
      {/* Vertical bottom shadow for legibility */}
      <div
        className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-chinese-black to-transparent"
        aria-hidden="true"
      />

      <div className="container relative z-10 mx-auto max-w-screen-lg">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="font-serif text-5xl font-black leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-7xl xl:text-8xl"
          >
            Jeffery Orazulike
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="text-primary mt-4 font-mono text-xs uppercase leading-relaxed tracking-[0.18em] sm:mt-5 sm:text-sm"
          >
            Senior Mobile Engineer — Android · KMM · Flutter · React
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="mt-8 max-w-2xl text-base leading-relaxed text-gray-300 sm:text-lg sm:leading-loose"
          >
            I ship infrastructure. Retrostash (KMP caching library on Maven Central), custom
            Android launchers, low-latency Lambdas, KMP and Compose Multiplatform shipped at scale.
            Currently working with the WebMD / Medscape team — migrating legacy WebViews into
            native Jetpack Compose. 6 years in.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.7 }}
            className="mt-10 flex flex-wrap items-center gap-4 sm:mt-12"
          >
            <a
              className="bg-primary hover:bg-primary-600 inline-flex h-12 items-center justify-center rounded-lg px-6 text-sm font-bold tracking-wide text-white transition-colors sm:text-base"
              href="#projects"
              onClick={(e) => scroll('#projects', e)}
            >
              View Projects
            </a>
            <a
              className="border-primary text-primary hover:bg-primary/10 inline-flex h-12 items-center justify-center rounded-lg border px-6 text-sm font-bold tracking-wide transition-colors sm:text-base"
              href="#now"
              onClick={(e) => scroll('#now', e)}
            >
              What I'm Building Now
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
