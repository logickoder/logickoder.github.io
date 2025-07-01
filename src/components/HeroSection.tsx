export const HeroSection = () => {
  return (
    <section className="px-6 py-10 sm:px-10 sm:py-16 lg:px-20 lg:py-24 xl:px-40" id="hero">
      <div className="container mx-auto max-w-screen-lg">
        <div className="@container">
          <div
            className="@[480px]:gap-8 flex min-h-[400px] flex-col items-start justify-end gap-6 rounded-xl bg-cover bg-center bg-no-repeat p-6 shadow-2xl sm:min-h-[480px] sm:p-10"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.7)), url("https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80")`
            }}
          >
            <div className="flex flex-col gap-2 text-left">
              <h1 className="@[480px]:text-5xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-tight text-4xl font-black leading-tight tracking-tight text-white lg:text-6xl">
                Jeffery Orazulike
              </h1>
              <h2 className="@[480px]:text-lg @[480px]:font-normal @[480px]:leading-relaxed max-w-xl text-base font-normal leading-relaxed text-gray-200">
                Mobile &amp; Frontend Engineer with 5+ years of experience building high-quality
                applications. Passionate about creating intuitive and engaging user experiences.
              </h2>
            </div>
            <a
              className="@[480px]:h-12 @[480px]:px-6 @[480px]:text-base @[480px]:font-bold @[480px]:leading-normal @[480px]:tracking-[0.015em] flex h-10 min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-primary px-4 text-sm font-bold leading-normal tracking-[0.015em] text-white transition-colors hover:bg-[#0a6cce] focus:ring-4 focus:ring-primary/50"
              href="#projects"
            >
              <span className="truncate">View Projects</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
