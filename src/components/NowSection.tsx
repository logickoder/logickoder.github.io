// Auto-stamps "Now — Month YYYY" so the cadence label never goes stale.
// Bullet content is the manual edit each month.

const bullets = [
  'Migrating Medscape legacy WebViews into native Jetpack Compose on MVI',
  'Shipping Knock and Nag — my own KMP / Compose Multiplatform side apps',
  'Maintaining open-source TypeScript GitHub Actions and Python data tooling on the side',
  'Open to senior mobile engineering conversations',
  'Back in the gym after a stretch off'
];

function currentMonthYear(): string {
  return new Date().toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric'
  });
}

export default function NowSection() {
  return (
    <section className="px-6 py-16 sm:px-10 sm:py-20 lg:px-20 lg:py-24 xl:px-40" id="now">
      <div className="container mx-auto max-w-5xl">
        <h2 className="mb-3 text-center font-serif text-3xl leading-tight font-bold tracking-tight sm:text-left sm:text-4xl">
          Now — {currentMonthYear()}
        </h2>
        <p className="mb-8 text-center font-mono text-xs tracking-[0.18em] text-gray-400 uppercase sm:mb-12 sm:text-left">
          Current state. Updated monthly.
        </p>
        <ul className="space-y-4">
          {bullets.map((bullet, index) => (
            <li
              key={index}
              className="flex items-start gap-3 text-base leading-relaxed font-normal text-gray-300 sm:text-lg"
            >
              <span className="bg-primary mt-2.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
