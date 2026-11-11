import type { Metadata, Viewport } from 'next';
import { Anton, Inter, Instrument_Serif, JetBrains_Mono } from 'next/font/google';
import Analytics from '@/components/site/Analytics';
import Feedback from '@/components/site/Feedback';
import { site } from '@/data/site';
import { OG_SIZE } from '@/lib/og';
import { THEME_KEY } from '@/lib/storage';
import './globals.css';

const inter = Inter({ subsets: ['latin'], weight: ['300', '400', '500', '600'], variable: '--font-inter' });
const anton = Anton({ subsets: ['latin'], weight: '400', variable: '--font-anton' });
const instrument = Instrument_Serif({ subsets: ['latin'], weight: '400', style: ['normal', 'italic'], variable: '--font-instrument' });
const jetbrains = JetBrains_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-jetbrains' });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} · ${site.title}`, template: `%s · ${site.name}` },
  description: site.description,
  authors: [{ name: site.name, url: site.url }],
  icons: { icon: '/icon.svg', apple: '/apple-touch-icon.png' },
  openGraph: {
    type: 'website',
    siteName: site.domain,
    locale: 'en_GB',
    images: [{ url: '/og/home.png', ...OG_SIZE, alt: `${site.name} · ${site.title}` }]
  },
  twitter: { card: 'summary_large_image', creator: site.handle, images: ['/og/home.png'] }
};

// Person schema for search engines (restored from the old index.html, updated to the new positioning).
const personLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: site.name,
  jobTitle: site.title,
  description: site.description,
  url: `${site.url}/`,
  email: `mailto:${site.email}`,
  sameAs: [...site.social.map((s) => s.href), site.medium],
  knowsAbout: ['Android', 'Kotlin', 'Jetpack Compose', 'Kotlin Multiplatform', 'React', 'React Native', 'TypeScript', 'Python', 'AI agents', 'Embedded systems']
};

export const viewport: Viewport = {
  themeColor: [{ color: '#0b0b0b' }]
};

// Runs before first paint: dark by default, light only when the visitor switched to it.
// Also forwards old HashRouter links (/#/projects/x) to the real path.
const prePaint = `(function(){try{var h=location.hash;if(h.indexOf('#/')===0){location.replace(h.slice(1));return}}catch(e){}var s=null;try{s=localStorage.getItem('${THEME_KEY}')}catch(e){}var d=document.documentElement;d.setAttribute('data-theme',s==='light'?'light':'dark');d.setAttribute('data-js','')})()`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${anton.variable} ${instrument.variable} ${jetbrains.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: prePaint }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd).replace(/</g, '\\u003c') }} />
      </head>
      <body>
        {children}
        <Analytics />
        <Feedback />
      </body>
    </html>
  );
}
