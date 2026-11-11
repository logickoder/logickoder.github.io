// Shared helpers for build-time social images (next/og). Fonts are fetched as
// TTF from Google Fonts during the build; Satori can't read woff2.

export const OG_SIZE = { width: 1200, height: 630 };

// Mirrors the site tokens in globals.css (dark default, light for case studies).
export const OG_COLORS = {
  dark: { bg: '#0B0B0B', fg: '#F2F2F2', acc: '#E07A2E' },
  light: { bg: '#F6F4F0', fg: '#141414', acc: '#A8501A' },
  accent: '#D2691E'
};

async function loadFont(family: string, query: string): Promise<ArrayBuffer> {
  const css = await (await fetch(`https://fonts.googleapis.com/css2?family=${family}:${query}`)).text();
  const url = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1];
  if (!url) throw new Error(`No TTF source for ${family}`);
  return (await fetch(url)).arrayBuffer();
}

async function loadFonts() {
  const [anton, inter, interLight, instrument, mono] = await Promise.all([
    loadFont('Anton', 'wght@400'),
    loadFont('Inter', 'wght@400'),
    loadFont('Inter', 'wght@300'),
    loadFont('Instrument+Serif', 'ital@1'),
    loadFont('JetBrains+Mono', 'wght@400')
  ]);
  return [
    { name: 'Anton', data: anton, weight: 400 as const, style: 'normal' as const },
    { name: 'Inter', data: inter, weight: 400 as const, style: 'normal' as const },
    { name: 'Inter', data: interLight, weight: 300 as const, style: 'normal' as const },
    { name: 'Instrument Serif', data: instrument, weight: 400 as const, style: 'italic' as const },
    { name: 'JetBrains Mono', data: mono, weight: 400 as const, style: 'normal' as const }
  ];
}

// One download per build worker, shared by every image route.
let fonts: ReturnType<typeof loadFonts> | undefined;
export const ogFonts = () => (fonts ??= loadFonts());

export function Wordmark({ light }: { light?: boolean }) {
  return (
    <div style={{ display: 'flex', fontFamily: 'Anton', fontSize: 34, letterSpacing: 0.7, color: (light ? OG_COLORS.light : OG_COLORS.dark).fg }}>
      LOGICKODER<span style={{ color: (light ? OG_COLORS.light : OG_COLORS.dark).acc }}>.DEV</span>
    </div>
  );
}
