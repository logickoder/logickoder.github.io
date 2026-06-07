export default function AboutSection() {
  return (
    <section
      className="bg-[#161a1e] px-6 py-16 sm:px-10 sm:py-20 lg:px-20 lg:py-24 xl:px-40"
      id="about"
    >
      <div className="container mx-auto max-w-screen-lg">
        <h2 className="mb-8 text-center font-serif text-3xl font-bold leading-tight tracking-tight sm:mb-12 sm:text-left sm:text-4xl">
          About Me
        </h2>
        <div className="space-y-6">
          <p className="text-lg font-medium leading-relaxed text-white sm:text-xl">
            I&apos;m Jeffery. Mobile engineer in Lagos.
          </p>
          <p className="text-base font-normal leading-relaxed text-gray-300 sm:text-lg sm:leading-loose">
            I ship infrastructure people don&apos;t notice until it breaks — caching layers,
            build-distribution actions, custom Android launchers, low-latency event pipelines.
            Mobile native (Kotlin / Jetpack Compose) is the home base. Day-to-day I also ship in{' '}
            <strong className="text-white">TypeScript</strong> and{' '}
            <strong className="text-white">Python</strong> — open-source GitHub Actions, low-latency
            Node / AWS Lambda services, React / Next.js dashboards, data tooling. Kotlin
            Multiplatform, Compose Multiplatform, Flutter, and React Native come along when the
            job needs them.
          </p>
          <p className="text-base font-normal leading-relaxed text-gray-300 sm:text-lg sm:leading-loose">
            Currently working with the WebMD / Medscape team — migrating legacy WebViews into
            native Jetpack Compose on a strict MVI architecture. Maintaining{' '}
            <a
              href="https://logickoder.dev/retrostash"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Retrostash
            </a>
            , my open-source KMP caching library, on Maven Central and Swift Package Manager.
            Building Knock (KMP calendar alarm) and Nag (KMP persistent reminder) as personal apps.
          </p>
          <p className="text-base font-normal leading-relaxed text-gray-300 sm:text-lg sm:leading-loose">
            Computer Engineering at the University of Lagos.
          </p>

          <div className="pt-4">
            <p className="text-primary text-lg font-medium">
              I lead with code, not chat. The projects below are the resume.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
