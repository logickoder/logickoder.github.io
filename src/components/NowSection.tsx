const bullets = [
  'Migrating Medscape legacy WebViews into native Jetpack Compose on MVI',
  'Shipping Knock and Nag — my own KMP / Compose Multiplatform side apps',
  'Open to senior mobile engineering conversations',
  'Rebuilding this site to actually look like me',
  'Back in the gym after a stretch off'
];

export default function NowSection() {
  return (
    <section className="px-6 py-16 sm:px-10 sm:py-20 lg:px-20 lg:py-24 xl:px-40" id="now">
      <div className="container mx-auto max-w-screen-lg">
        <h2 className="mb-3 text-center font-serif text-3xl font-bold leading-tight tracking-tight sm:text-left sm:text-4xl">
          Now — June 2026
        </h2>
        <p className="mb-8 text-center font-mono text-xs uppercase tracking-[0.18em] text-gray-400 sm:mb-12 sm:text-left">
          Current state. Updated monthly.
        </p>
        <ul className="space-y-4">
          {bullets.map((bullet, index) => (
            <li
              key={index}
              className="flex items-start gap-3 text-base font-normal leading-relaxed text-gray-300 sm:text-lg"
            >
              <span className="bg-primary mt-2.5 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
