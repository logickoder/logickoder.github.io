import { ImageResponse } from 'next/og';
import { getCaseStudy, listCaseStudies } from '@/data/case-studies';
import { site } from '@/data/site';
import { OG_COLORS, OG_SIZE, Wordmark, ogFonts } from '@/lib/og';

const { dark, light, accent } = OG_COLORS;

// Social images as real .png files (/og/home.png, /og/<slug>.png) so GitHub Pages
// serves them with an image content type. Rendered once at build.
export const dynamic = 'force-static';
export const dynamicParams = false;

export function generateStaticParams() {
  return [{ image: 'home.png' }, ...listCaseStudies().map((s) => ({ image: `${s.slug}.png` }))];
}

function Home() {
  return (
    <div style={{ ...OG_SIZE, display: 'flex', position: 'relative', background: dark.bg, color: dark.fg, fontFamily: 'Inter' }}>
      <svg width="1200" height="630" viewBox="0 0 1200 630" style={{ position: 'absolute', left: 0, top: 0 }} fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M760 120h180v120M1030 285h40v175H760" stroke="#2A2A2A" strokeWidth="1.6" />
        <rect x="890" y="250" width="130" height="70" rx="6" stroke={accent} strokeWidth="2.4" />
        <path d="M910 250v-10M970 250v-10M990 250v-10M1010 250v-10M910 330v-10M930 330v-10M950 330v-10M970 330v-10M990 330v-10M1010 330v-10M1020 285h10" stroke="#2A2A2A" strokeWidth="1.6" />
        <circle cx="760" cy="120" r="4.5" fill="#2A2A2A" />
        <circle cx="760" cy="460" r="4.5" fill="#2A2A2A" />
        <path d="M760 120h180v120" stroke={accent} strokeWidth="2.4" strokeDasharray="3 14" />
        <path d="M1030 285h40v175H760" stroke={accent} strokeWidth="2.4" strokeDasharray="3 14" />
      </svg>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%', padding: '56px 64px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Wordmark />
          <div style={{ display: 'flex', alignItems: 'center', fontFamily: 'JetBrains Mono', fontSize: 18, color: '#A3A3A3' }}>
            <div style={{ width: 10, height: 10, borderRadius: 5, background: accent, marginRight: 10 }} />
            Open to new projects
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', fontSize: 92, fontWeight: 300, letterSpacing: -3, lineHeight: 1.02, maxWidth: 720 }}>
            Software &amp;&nbsp;<span style={{ fontFamily: 'Instrument Serif', fontStyle: 'italic', color: dark.acc }}>AI</span>&nbsp;Engineer.
          </div>
          <div style={{ display: 'flex', marginTop: 20, fontSize: 34, fontWeight: 300, color: '#C4C4C4' }}>Six years of mobile. Now agents and circuits.</div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'JetBrains Mono', fontSize: 20, color: '#A3A3A3' }}>
          <span>Jeffery Orazulike · Lagos</span>
          <span>bankstract · agent-bridge · Retrostash</span>
        </div>
      </div>
    </div>
  );
}

function Case({ slug }: { slug: string }) {
  const study = getCaseStudy(slug);
  const title = study?.title ?? 'Case study';
  return (
    <div style={{ ...OG_SIZE, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '56px 64px', background: light.bg, color: light.fg, fontFamily: 'Inter' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Wordmark light />
        <div style={{ display: 'flex', fontFamily: 'JetBrains Mono', fontSize: 18, letterSpacing: 1, color: light.acc }}>CASE STUDY</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', fontSize: title.length > 14 ? 104 : 150, fontWeight: 300, letterSpacing: -6, lineHeight: 0.92 }}>{title}</div>
        <div style={{ display: 'flex', marginTop: 18, fontSize: 36, fontWeight: 300, color: '#3A3936', maxWidth: 900, lineHeight: 1.25 }}>{study?.tagline ?? ''}</div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'JetBrains Mono', fontSize: 18, color: '#6B6964' }}>
        <span>{study ? study.tech.slice(0, 2).join(' · ') : ''}</span>
        <span>{site.domain}/projects/{slug}</span>
      </div>
    </div>
  );
}

export async function GET(_req: Request, { params }: { params: Promise<{ image: string }> }) {
  const name = (await params).image.replace(/\.png$/, '');
  return new ImageResponse(name === 'home' ? <Home /> : <Case slug={name} />, { ...OG_SIZE, fonts: await ogFonts() });
}
