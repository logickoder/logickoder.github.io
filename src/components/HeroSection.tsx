import useSmoothScroll from '../hooks/useSmoothScroll.ts';

export default function HeroSection() {
  const { scroll } = useSmoothScroll();
  return (
    <section className="px-6 py-10 sm:px-10 sm:py-16 lg:px-20 lg:py-24 xl:px-40" id="hero">
      <div className="container mx-auto max-w-screen-lg">
        <div className="@container">
          <div
            className="@[480px]:gap-8 relative flex min-h-[400px] flex-col items-start justify-end gap-6 overflow-hidden rounded-2xl border border-gray-700/30 bg-cover bg-center bg-no-repeat p-6 shadow-2xl sm:min-h-[480px] sm:p-10"
            style={{
              backgroundImage: `linear-gradient(135deg, rgba(12, 127, 242, 0.1), rgba(0, 0, 0, 0.7)), linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.7)), url("https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80")`
            }}
          >
            {/* Subtle overlay pattern */}
            <div className="absolute inset-0 bg-gradient-to-tr from-primary-600/5 via-transparent to-primary-400/5"></div>

            <div className="relative z-10 flex flex-col gap-3 text-left">
              <h1 className="@[480px]:text-5xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-tight bg-gradient-to-r from-white via-gray-100 to-gray-200 bg-clip-text text-4xl font-black leading-tight tracking-tight text-transparent lg:text-6xl">
                Jeffery Orazulike
              </h1>
              <h2 className="@[480px]:text-lg @[480px]:font-normal @[480px]:leading-relaxed max-w-xl text-base font-normal leading-relaxed text-gray-200/90">
                Mobile &amp; Frontend Engineer with 5+ years of experience building high-quality
                applications. Passionate about creating intuitive and engaging user experiences.
              </h2>
            </div>
            <a
              className="@[480px]:h-12 @[480px]:px-6 @[480px]:text-base @[480px]:font-bold @[480px]:leading-normal @[480px]:tracking-[0.015em] relative z-10 flex h-10 min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-gradient-to-r from-primary-600 to-primary-500 px-4 text-sm font-bold leading-normal tracking-[0.015em] text-white transition-all duration-300 hover:-translate-y-1 hover:from-primary-500 hover:to-primary-400 hover:shadow-lg hover:shadow-primary-500/25 focus:ring-4 focus:ring-primary-500/50"
              href="#projects"
              onClick={(e) => scroll('#projects', e)}
            >
              <span className="truncate">View Projects</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
