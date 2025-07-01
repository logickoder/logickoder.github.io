import { Logo } from './assets';

export default function App() {
  return (
    <div className="group/design-root dark relative flex size-full min-h-screen flex-col overflow-x-hidden">
      <header className="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#283039] bg-[#111418]/80 px-6 py-4 backdrop-blur-md sm:px-10">
        <div className="flex items-center gap-3 text-white sm:gap-4">
          <div className="size-5 text-primary sm:size-6">
            <Logo />
          </div>
          <h2 className="text-lg font-bold leading-tight tracking-[-0.015em] text-white sm:text-xl">
            logickoder
          </h2>
        </div>
        <nav className="hidden flex-1 items-center justify-end gap-6 sm:flex lg:gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              className="text-sm font-medium leading-normal transition-colors hover:text-primary"
              href={link.href}
            >
              {link.label}
            </a>
          ))}
          <div
            className="aspect-square size-10 rounded-full border-2 border-primary bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuCqCUTruDc99C_6FYeJx7TGT60R89HIDHESgya1Hu3cwN8p6qR3gKqLOvggetC_EOc2kbzUtqb1kWyhc-8hxZ_uHSiwSBGyQhPd9kosDa5jgIjD4fVExzmkgpA02jzSpWbY3eAhZm_D7auJmkEotQy6OcQU-X1xWJHmhV-CEMrX4oF3PbAhO9iOUiX_L8j5oExpWx8sextvYVL785iN4phkxKD2_15JN_pINoLxcvdsVqR9HL3lOq1Lz0-hWM9LsXlkQ1nExdRY9KyF");`
            }}
          ></div>
        </nav>
        <button className="text-white focus:outline-none sm:hidden">
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </svg>
        </button>
      </header>
      <main className="flex-1">
        <section className="px-6 py-10 sm:px-10 sm:py-16 lg:px-20 lg:py-24 xl:px-40" id="hero">
          <div className="container mx-auto max-w-screen-lg">
            <div className="@container">
              <div
                className="@[480px]:gap-8 flex min-h-[400px] flex-col items-start justify-end gap-6 rounded-xl bg-cover bg-center bg-no-repeat p-6 shadow-2xl sm:min-h-[480px] sm:p-10"
                // style='background-image: linear-gradient(rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.7) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuCf-lYD39yqqifOTvgIxgwaKutAHlix3-8suL1R4Hhhb2Ikmt3T4OsxSwpoBv5-D_bo3Hz2LiQCY9ORWSE7FcOQ-SiPBOQNrldvbmSfXIm4QeMlxmqs9oT7KPaWe0VJX4Q7ChZFAqMQCVapYsDISkYZQuivqhWFMiLhvcGxc_MifOxuUUOCWdqxBTJowaLwEq6ZnrpiYpK_iOUJK2eEAy8o-zk2KENeTERkDDBUKQ6FVKOPgs0B1sz-JhyS2ukorU4kkY9bzn3BgtB0");'
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
        <section
          className="bg-[#161a1e] px-6 py-16 sm:px-10 sm:py-20 lg:px-20 lg:py-24 xl:px-40"
          id="about"
        >
          <div className="container mx-auto max-w-screen-lg">
            <h2 className="mb-8 text-center text-3xl font-bold leading-tight tracking-tight sm:mb-12 sm:text-left sm:text-4xl">
              About Me
            </h2>
            <p className="text-base font-normal leading-relaxed text-gray-300 sm:text-lg sm:leading-loose">
              I'm a seasoned mobile and frontend engineer with a proven track record of delivering
              exceptional user experiences. My expertise spans across various platforms and
              technologies, allowing me to create robust and scalable applications. I'm passionate
              about staying up-to-date with the latest industry trends and continuously improving my
              skills. I thrive in collaborative environments and enjoy tackling complex challenges
              to build innovative solutions.
            </p>
          </div>
        </section>
        <section className="px-6 py-16 sm:px-10 sm:py-20 lg:px-20 lg:py-24 xl:px-40" id="skills">
          <div className="container mx-auto max-w-screen-lg">
            <h2 className="mb-8 text-center text-3xl font-bold leading-tight tracking-tight sm:mb-12 sm:text-4xl">
              Skills
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
              <div className="flex transform flex-col items-center gap-4 rounded-xl border border-[#3b4754] bg-[#1b2127] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-lg">
                <div className="rounded-full bg-[#283039] p-3 text-primary">
                  <svg
                    fill="currentColor"
                    height="32px"
                    viewBox="0 0 256 256"
                    width="32px"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M69.12,94.15,28.5,128l40.62,33.85a8,8,0,1,1-10.24,12.29l-48-40a8,8,0,0,1,0-12.29l48-40a8,8,0,0,1,10.24,12.3Zm176,27.7-48-40a8,8,0,1,0-10.24,12.3L227.5,128l-40.62,33.85a8,8,0,1,0,10.24,12.29l48-40a8,8,0,0,0,0-12.29ZM162.73,32.48a8,8,0,0,0-10.25,4.79l-64,176a8,8,0,0,0,4.79,10.26A8.14,8.14,0,0,0,96,224a8,8,0,0,0,7.52-5.27l64-176A8,8,0,0,0,162.73,32.48Z"></path>
                  </svg>
                </div>
                <h3 className="text-center text-lg font-bold leading-tight text-white">
                  Frontend Development
                </h3>
              </div>
              <div className="flex transform flex-col items-center gap-4 rounded-xl border border-[#3b4754] bg-[#1b2127] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-lg">
                <div className="rounded-full bg-[#283039] p-3 text-primary">
                  <svg
                    fill="currentColor"
                    height="32px"
                    viewBox="0 0 256 256"
                    width="32px"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M176,16H80A24,24,0,0,0,56,40V216a24,24,0,0,0,24,24h96a24,24,0,0,0,24-24V40A24,24,0,0,0,176,16ZM72,64H184V192H72Zm8-32h96a8,8,0,0,1,8,8v8H72V40A8,8,0,0,1,80,32Zm96,192H80a8,8,0,0,1-8-8v-8H184v8A8,8,0,0,1,176,224Z"></path>
                  </svg>
                </div>
                <h3 className="text-center text-lg font-bold leading-tight text-white">
                  Mobile Development
                </h3>
              </div>
              <div className="flex transform flex-col items-center gap-4 rounded-xl border border-[#3b4754] bg-[#1b2127] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-lg">
                <div className="rounded-full bg-[#283039] p-3 text-primary">
                  <svg
                    fill="currentColor"
                    height="32px"
                    viewBox="0 0 256 256"
                    width="32px"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M232,168h-8V72a24,24,0,0,0-24-24H56A24,24,0,0,0,32,72v96H24a8,8,0,0,0-8,8v16a24,24,0,0,0,24,24H216a24,24,0,0,0,24-24V176A8,8,0,0,0,232,168ZM48,72a8,8,0,0,1,8-8H200a8,8,0,0,1,8,8v96H48ZM224,192a8,8,0,0,1-8,8H40a8,8,0,0,1-8-8v-8H224ZM152,88a8,8,0,0,1-8,8H112a8,8,0,0,1,0-16h32A8,8,0,0,1,152,88Z"></path>
                  </svg>
                </div>
                <h3 className="text-center text-lg font-bold leading-tight text-white">
                  Responsive Design
                </h3>
              </div>
              <div className="flex transform flex-col items-center gap-4 rounded-xl border border-[#3b4754] bg-[#1b2127] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-lg">
                <div className="rounded-full bg-[#283039] p-3 text-primary">
                  <svg
                    fill="currentColor"
                    height="32px"
                    viewBox="0 0 256 256"
                    width="32px"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M128,24C74.17,24,32,48.6,32,80v96c0,31.4,42.17,56,96,56s96-24.6,96-56V80C224,48.6,181.83,24,128,24Zm80,104c0,9.62-7.88,19.43-21.61,26.92C170.93,163.35,150.19,168,128,168s-42.93-4.65-58.39-13.08C55.88,147.43,48,137.62,48,128V111.36c17.06,15,46.23,24.64,80,24.64s62.94-9.68,80-24.64ZM69.61,53.08C85.07,44.65,105.81,40,128,40s42.93,4.65,58.39,13.08C200.12,60.57,208,70.38,208,80s-7.88,19.43-21.61,26.92C170.93,115.35,150.19,120,128,120s-42.93-4.65-58.39-13.08C55.88,99.43,48,89.62,48,80S55.88,60.57,69.61,53.08ZM186.39,202.92C170.93,211.35,150.19,216,128,216s-42.93-4.65-58.39-13.08C55.88,195.43,48,185.62,48,176V159.36c17.06,15,46.23,24.64,80,24.64s62.94-9.68,80-24.64V176C208,185.62,200.12,195.43,186.39,202.92Z"></path>
                  </svg>
                </div>
                <h3 className="text-center text-lg font-bold leading-tight text-white">
                  Backend Integration
                </h3>
              </div>
              <div className="flex transform flex-col items-center gap-4 rounded-xl border border-[#3b4754] bg-[#1b2127] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-lg">
                <div className="rounded-full bg-[#283039] p-3 text-primary">
                  <svg
                    fill="currentColor"
                    height="32px"
                    viewBox="0 0 256 256"
                    width="32px"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M160,40A88.09,88.09,0,0,0,81.29,88.67,64,64,0,1,0,72,216h88a88,88,0,0,0,0-176Zm0,160H72a48,48,0,0,1,0-96c1.1,0,2.2,0,3.29.11A88,88,0,0,0,72,128a8,8,0,0,0,16,0,72,72,0,1,1,72,72Z"></path>
                  </svg>
                </div>
                <h3 className="text-center text-lg font-bold leading-tight text-white">
                  Cloud Services
                </h3>
              </div>
              <div className="flex transform flex-col items-center gap-4 rounded-xl border border-[#3b4754] bg-[#1b2127] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-lg">
                <div className="rounded-full bg-[#283039] p-3 text-primary">
                  <svg
                    fill="currentColor"
                    height="32px"
                    viewBox="0 0 256 256"
                    width="32px"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M128,24C74.17,24,32,48.6,32,80v96c0,31.4,42.17,56,96,56s96-24.6,96-56V80C224,48.6,181.83,24,128,24Zm80,104c0,9.62-7.88,19.43-21.61,26.92C170.93,163.35,150.19,168,128,168s-42.93-4.65-58.39-13.08C55.88,147.43,48,137.62,48,128V111.36c17.06,15,46.23,24.64,80,24.64s62.94-9.68,80-24.64ZM69.61,53.08C85.07,44.65,105.81,40,128,40s42.93,4.65,58.39,13.08C200.12,60.57,208,70.38,208,80s-7.88,19.43-21.61,26.92C170.93,115.35,150.19,120,128,120s-42.93-4.65-58.39-13.08C55.88,99.43,48,89.62,48,80S55.88,60.57,69.61,53.08ZM186.39,202.92C170.93,211.35,150.19,216,128,216s-42.93-4.65-58.39-13.08C55.88,195.43,48,185.62,48,176V159.36c17.06,15,46.23,24.64,80,24.64s62.94-9.68,80-24.64V176C208,185.62,200.12,195.43,186.39,202.92Z"></path>
                  </svg>
                </div>
                <h3 className="text-center text-lg font-bold leading-tight text-white">
                  Server-Side Rendering
                </h3>
              </div>
            </div>
          </div>
        </section>
        <section
          className="bg-[#161a1e] px-6 py-16 sm:px-10 sm:py-20 lg:px-20 lg:py-24 xl:px-40"
          id="projects"
        >
          <div className="container mx-auto max-w-screen-lg">
            <h2 className="mb-8 text-center text-3xl font-bold leading-tight tracking-tight sm:mb-12 sm:text-4xl">
              Projects
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="group flex flex-col overflow-hidden rounded-xl bg-[#1b2127] shadow-lg transition-shadow duration-300 hover:shadow-xl">
                <div
                  className="relative aspect-video w-full overflow-hidden bg-cover bg-center bg-no-repeat"
                  // style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuDScxP8BqGnCUFziicviWHsL5z23DWYPmnqhA-46AssoIK62EdpwfO5Eu_w_-zOw1TD7UQmANN230WFZHxCjObzdtMxgXq2Fd0pYhqx_ilKVE9RB22dieQsOhDdb-dQJr1OLnQ1egDgGBZqIsU8MolESrNTg74ARgcOBEx_C6P1HLddXu7okpoKs2VIzhDTt4Ibz_zI5pA_mQHDBvLK1QtaXg8Jpyvj-t2e6flHgNfbXVG6WgNzdb8pDsWycSqeL_gh_K2vXYisWZKc");'
                >
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-colors duration-300 group-hover:bg-black/40 group-hover:opacity-100">
                    <a
                      className="rounded-md border border-white px-4 py-2 text-white transition-colors hover:bg-white/10"
                      href="#"
                    >
                      View Details
                    </a>
                  </div>
                </div>
                <div className="flex-grow p-6">
                  <h3 className="mb-2 text-lg font-semibold leading-tight text-white">
                    Mobile App for Fitness Tracking
                  </h3>
                  <p className="text-sm font-normal leading-relaxed text-[#9cabba]">
                    A fitness tracking app with personalized workout plans and progress tracking.
                  </p>
                </div>
              </div>
              <div className="group flex flex-col overflow-hidden rounded-xl bg-[#1b2127] shadow-lg transition-shadow duration-300 hover:shadow-xl">
                <div
                  className="relative aspect-video w-full overflow-hidden bg-cover bg-center bg-no-repeat"
                  // style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuDHdIrOl_EeW5WRKoIUS7p2Pc6ldSUUWI08vzt2LHQdP8FwYXfWNcxN_e4SylGxA2fLi8FqsEAcNa1616B-lUvqMSiz5SXFkISWFbetqi1a3rv5x7d6T6tdOFUFKBpImMqUMgYYh-7_oSjbLWU_xkIKzUiLVs5Pl3ldbZHw8SO87wxRa2YIsHIfxbMgXyCnC1M8cuYXVbg6oJ-Hl5W5VF7s78zsigims_RgcGYiKm91z6tTTL6q-iKGQSdQCQYvcmpro7S9E42esaqv");'
                >
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-colors duration-300 group-hover:bg-black/40 group-hover:opacity-100">
                    <a
                      className="rounded-md border border-white px-4 py-2 text-white transition-colors hover:bg-white/10"
                      href="#"
                    >
                      View Details
                    </a>
                  </div>
                </div>
                <div className="flex-grow p-6">
                  <h3 className="mb-2 text-lg font-semibold leading-tight text-white">
                    Web Dashboard for Data Analytics
                  </h3>
                  <p className="text-sm font-normal leading-relaxed text-[#9cabba]">
                    A web dashboard for visualizing and analyzing large datasets.
                  </p>
                </div>
              </div>
              <div className="group flex flex-col overflow-hidden rounded-xl bg-[#1b2127] shadow-lg transition-shadow duration-300 hover:shadow-xl">
                <div
                  className="relative aspect-video w-full overflow-hidden bg-cover bg-center bg-no-repeat"
                  // style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuBP3ffmjdjNoLJH2dmhkhI4aYxqOmWXv0TkAjXiLw6NoRfjvpc4AFEapxFqcQ6s0Sb0fuA3ucebdyKTH0SKYWHZ5mXFlgZTIDXMpcxZe_eafozb_sirvIo-hoGA-Hua9xrP1CXeX9OmlyJofwbTm95DT-fc5sGnMHj4MhPPv4ygb3lEvAi8gBD2_1kJMqk-tJ_S1grH8MUrFreF2lbVCL7vFNVUJ0KLtzARAfrmDbfHxCD2cdP8QqLoWqGZcKVCdaz0ymQRtGlpiEMO");'
                >
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-colors duration-300 group-hover:bg-black/40 group-hover:opacity-100">
                    <a
                      className="rounded-md border border-white px-4 py-2 text-white transition-colors hover:bg-white/10"
                      href="#"
                    >
                      View Details
                    </a>
                  </div>
                </div>
                <div className="flex-grow p-6">
                  <h3 className="mb-2 text-lg font-semibold leading-tight text-white">
                    E-commerce Platform for Local Artisans
                  </h3>
                  <p className="text-sm font-normal leading-relaxed text-[#9cabba]">
                    An e-commerce platform showcasing and selling products from local artisans.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="px-6 py-16 sm:px-10 sm:py-20 lg:px-20 lg:py-24 xl:px-40" id="blog">
          <div className="container mx-auto max-w-screen-lg">
            <h2 className="mb-8 text-center text-3xl font-bold leading-tight tracking-tight sm:mb-12 sm:text-4xl">
              Blog
            </h2>
            <div className="space-y-10 sm:space-y-12">
              <article className="flex flex-col items-center gap-6 rounded-xl bg-[#1b2127] p-6 shadow-lg transition-shadow duration-300 hover:shadow-xl sm:flex-row sm:gap-8">
                <div
                  className="aspect-video w-full rounded-lg bg-cover bg-center bg-no-repeat sm:w-1/3"
                  // style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuDtJL-CoPdZqiUhhENFRxhzr7WYRIQd0h48C3CLACh3Zb-B322-2Fhg5JN0p5c3XYgK30YyFTvTlNLdUBD3FBYBZdC-DS44NfcPJQCgAq04OqTDOCN6gwva8IGRoCBtn5rkc4G-DV0ybSZ8-PfUuX8vIloHGikC-1VShj3zA1qJd6h7lu7Q3xGCNSIaLS30Y7V2hmzmcRD6xcxXnWGtFF5UdUqJs64aP-0dgp19N5xk13HJnfInERFCAvHfY27zAW4p6cx_uVdR-k0v");'
                ></div>
                <div className="flex-1">
                  <h3 className="mb-2 text-xl font-bold leading-tight text-white">
                    Mastering Responsive Design: A Comprehensive Guide
                  </h3>
                  <p className="mb-3 text-sm font-normal leading-relaxed text-[#9cabba]">
                    Learn the best practices for creating responsive web designs that adapt
                    seamlessly to different screen sizes.
                  </p>
                  <a className="text-sm font-medium text-primary hover:underline" href="#">
                    Read More →
                  </a>
                </div>
              </article>
              <article className="flex flex-col items-center gap-6 rounded-xl bg-[#1b2127] p-6 shadow-lg transition-shadow duration-300 hover:shadow-xl sm:flex-row sm:gap-8">
                <div
                  className="aspect-video w-full rounded-lg bg-cover bg-center bg-no-repeat sm:w-1/3"
                  // style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuCVvAP_sotosht59X8z-2uEpSeSm5a5iH0DamswubozsNRsFm5FeyR0dzKaLIWYmbGSeeiHwfykvhxtWNtrr8ENE-FGeXtHDW_VL7AxA-BdWuzIQBzc0dMD3X1sykaj6hUrNTlbgdLfIoD-HsVNPavz69tmX_S4Xsn8HIz-zYt4E_0YWtTmUtniaPzkZZKVqoyz8QgDKpiwltDL4K5zRoUqeLP2Wvyj6eeYL0bO3_gaNbuHDmXR4rQ-c2_FV4q8LJ0OgDJzDCcOl99R");'
                ></div>
                <div className="flex-1">
                  <h3 className="mb-2 text-xl font-bold leading-tight text-white">
                    Optimizing Mobile App Performance: Tips and Tricks
                  </h3>
                  <p className="mb-3 text-sm font-normal leading-relaxed text-[#9cabba]">
                    Discover effective techniques for optimizing the performance of your mobile
                    applications, ensuring a smooth user experience.
                  </p>
                  <a className="text-sm font-medium text-primary hover:underline" href="#">
                    Read More →
                  </a>
                </div>
              </article>
            </div>
          </div>
        </section>
        <section
          className="bg-[#161a1e] px-6 py-16 sm:px-10 sm:py-20 lg:px-20 lg:py-24 xl:px-40"
          id="contact"
        >
          <div className="container mx-auto max-w-screen-md">
            <h2 className="mb-8 text-center text-3xl font-bold leading-tight tracking-tight sm:mb-12 sm:text-4xl">
              Get In Touch
            </h2>
            <form className="space-y-6">
              <div>
                <label className="sr-only" htmlFor="name">
                  Your Name
                </label>
                <input
                  className="form-input h-12 w-full rounded-lg border-transparent bg-[#283039] px-4 text-base text-white placeholder:text-[#9cabba] focus:border-primary focus:ring-primary sm:h-14"
                  id="name"
                  name="name"
                  placeholder="Your Name"
                  type="text"
                />
              </div>
              <div>
                <label className="sr-only" htmlFor="email">
                  Your Email
                </label>
                <input
                  className="form-input h-12 w-full rounded-lg border-transparent bg-[#283039] px-4 text-base text-white placeholder:text-[#9cabba] focus:border-primary focus:ring-primary sm:h-14"
                  id="email"
                  name="email"
                  placeholder="Your Email"
                  type="email"
                />
              </div>
              <div>
                <label className="sr-only" htmlFor="message">
                  Your Message
                </label>
                <textarea
                  className="form-input w-full rounded-lg border-transparent bg-[#283039] p-4 text-base text-white placeholder:text-[#9cabba] focus:border-primary focus:ring-primary"
                  id="message"
                  name="message"
                  placeholder="Your Message"
                  // rows="5"
                ></textarea>
              </div>
              <div className="text-right">
                <button
                  className="h-10 min-w-[120px] cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-primary px-6 text-sm font-bold leading-normal tracking-[0.015em] text-white transition-colors hover:bg-[#0a6cce] focus:ring-4 focus:ring-primary/50 sm:h-12 sm:px-8 sm:text-base"
                  type="submit"
                >
                  <span className="truncate">Send Message</span>
                </button>
              </div>
            </form>
            <div className="mt-12 flex justify-center gap-6 sm:mt-16 sm:gap-8">
              <a className="text-[#9cabba] transition-colors hover:text-primary" href="#">
                <span className="sr-only">Twitter</span>
                <svg
                  fill="currentColor"
                  height="28px"
                  viewBox="0 0 256 256"
                  width="28px"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M247.39,68.94A8,8,0,0,0,240,64H209.57A48.66,48.66,0,0,0,168.1,40a46.91,46.91,0,0,0-33.75,13.7A47.9,47.9,0,0,0,120,88v6.09C79.74,83.47,46.81,50.72,46.46,50.37a8,8,0,0,0-13.65,4.92c-4.31,47.79,9.57,79.77,22,98.18a110.93,110.93,0,0,0,21.88,24.2c-15.23,17.53-39.21,26.74-39.47,26.84a8,8,0,0,0-3.85,11.93c.75,1.12,3.75,5.05,11.08,8.72C53.51,229.7,65.48,232,80,232c70.67,0,129.72-54.42,135.75-124.44l29.91-29.9A8,8,0,0,0,247.39,68.94Zm-45,29.41a8,8,0,0,0-2.32,5.14C196,166.58,143.28,216,80,216c-10.56,0-18-1.4-23.22-3.08,11.51-6.25,27.56-17,37.88-32.48A8,8,0,0,0,92,169.08c-.47-.27-43.91-26.34-44-96,16,13,45.25,33.17,78.67,38.79A8,8,0,0,0,136,104V88a32,32,0,0,1,9.6-22.92A30.94,30.94,0,0,1,167.9,56c12.66.16,24.49,7.88,29.44,19.21A8,8,0,0,0,204.67,80h16Z"></path>
                </svg>
              </a>
              <a className="text-[#9cabba] transition-colors hover:text-primary" href="#">
                <span className="sr-only">LinkedIn</span>
                <svg
                  fill="currentColor"
                  height="28px"
                  viewBox="0 0 256 256"
                  width="28px"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M216,24H40A16,16,0,0,0,24,40V216a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V40A16,16,0,0,0,216,24Zm0,192H40V40H216V216ZM96,112v64a8,8,0,0,1-16,0V112a8,8,0,0,1,16,0Zm88,28v36a8,8,0,0,1-16,0V140a20,20,0,0,0-40,0v36a8,8,0,0,1-16,0V112a8,8,0,0,1,15.79-1.78A36,36,0,0,1,184,140ZM100,84A12,12,0,1,1,88,72,12,12,0,0,1,100,84Z"></path>
                </svg>
              </a>
              <a className="text-[#9cabba] transition-colors hover:text-primary" href="#">
                <span className="sr-only">GitHub</span>
                <svg
                  fill="currentColor"
                  height="28px"
                  viewBox="0 0 256 256"
                  width="28px"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M208.31,75.68A59.78,59.78,0,0,0,202.93,28,8,8,0,0,0,196,24a59.75,59.75,0,0,0-48,24H124A59.75,59.75,0,0,0,76,24a8,8,0,0,0-6.93,4,59.78,59.78,0,0,0-5.38,47.68A58.14,58.14,0,0,0,56,104v8a56.06,56.06,0,0,0,48.44,55.47A39.8,39.8,0,0,0,96,192v8H72a24,24,0,0,1-24-24A40,40,0,0,0,8,136a8,8,0,0,0,0,16,24,24,0,0,1,24,24,40,40,0,0,0,40,40H96v16a8,8,0,0,0,16,0V192a24,24,0,0,1,48,0v40a8,8,0,0,0,16,0V192a39.8,39.8,0,0,0-8.44-24.53A56.06,56.06,0,0,0,216,112v-8A58.14,58.14,0,0,0,208.31,75.68ZM200,112a40,40,0,0,1-40,40H112a40,40,0,0,1-40-40v-8a41.74,41.74,0,0,1,6.9-22.48A8,8,0,0,0,80,73.83a43.81,43.81,0,0,1,.79-33.58,43.88,43.88,0,0,1,32.32,20.06A8,8,0,0,0,119.82,64h32.35a8,8,0,0,0,6.74-3.69,43.87,43.87,0,0,1,32.32-20.06A43.81,43.81,0,0,1,192,73.83a8.09,8.09,0,0,0,1,7.65A41.72,41.72,0,0,1,200,104Z"></path>
                </svg>
              </a>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t border-[#283039] py-8 text-center sm:py-10">
        <p className="text-sm font-normal leading-normal text-[#9cabba]">
          © 2024 Jeffery Orazulike. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

const links = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#blog', label: 'Blog' },
  { href: '#contact', label: 'Contact' }
];
