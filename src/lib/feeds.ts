// Writing feed, resolved at build time. The weekly scheduled deploy (Monday 05:00 UTC) keeps it fresh.
// Substack is canonical; a Medium post with the same title is the cross-post.

export interface Post {
  title: string;
  href: string;
  date: string; // ISO
  sources: ('Substack' | 'Medium')[];
}

const SUBSTACK = 'https://logickoder.substack.com/feed';
const MEDIUM = 'https://medium.com/feed/@logickoder';

// Used when a feed can't be reached at build. Mirrors both feeds on 2026-11-10.
const FALLBACK: Post[] = [
  { title: 'Retrostash, Two Months Later: From Retrofit to Kotlin Multiplatform', href: 'https://logickoder.substack.com', date: '2026-06-07', sources: ['Substack'] },
  { title: 'Stop Using Room to Cache POST Requests: The Missing Layer Between Retrofit and OkHttp', href: 'https://logickoder.substack.com', date: '2026-04-12', sources: ['Substack', 'Medium'] },
  { title: 'Why Your Compose Animations Are Silently Resetting Your State', href: 'https://logickoder.substack.com', date: '2026-01-17', sources: ['Substack', 'Medium'] },
  { title: 'Building a Faster GitHub Action for Firebase App Distribution', href: 'https://logickoder.substack.com', date: '2025-11-16', sources: ['Substack', 'Medium'] },
  { title: 'How I Updated My GitHub Actions to Use OAuth for Google Drive Uploads', href: 'https://medium.com/@logickoder', date: '2025-12-10', sources: ['Medium'] },
  { title: 'Detecting Chrome Custom Tab Closure in Android: A Coroutine-Based Solution', href: 'https://medium.com/@logickoder', date: '2025-06-26', sources: ['Medium'] },
  { title: 'Reuse Your Mobile App Builds: Fast Distribution Without a Rebuild', href: 'https://medium.com/@logickoder', date: '2025-06-18', sources: ['Medium'] },
  { title: 'Building a Unified View Tree Analyser for Android (Views and Compose)', href: 'https://medium.com/@logickoder', date: '2025-05-24', sources: ['Medium'] },
  { title: 'Comparing REST, SOAP, and GraphQL, and understanding their messaging formats', href: 'https://medium.com/@logickoder', date: '2023-08-11', sources: ['Medium'] },
  { title: 'Approaching Software Development through Object-Oriented Design', href: 'https://medium.com/@logickoder', date: '2023-08-11', sources: ['Medium'] },
  { title: 'Understanding Web APIs: An Exploration of Their Purpose and Implementation', href: 'https://medium.com/@logickoder', date: '2023-08-11', sources: ['Medium'] }
];

const entities: Record<string, string> = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'" };

// Text outside CDATA arrives XML-escaped; decode so titles render and dedupe the same either way.
function decode(text: string): string {
  return text.replace(/&(#x[0-9a-f]+|#\d+|\w+);/gi, (whole, code: string) => {
    if (code[0] !== '#') return entities[code] ?? whole;
    return String.fromCodePoint(code[1] === 'x' || code[1] === 'X' ? parseInt(code.slice(2), 16) : Number(code.slice(1)));
  });
}

function pick(item: string, tag: string): string | undefined {
  const m = item.match(new RegExp(`<${tag}>(?:<!\\[CDATA\\[([\\s\\S]*?)\\]\\]>|([\\s\\S]*?))</${tag}>`));
  if (!m) return undefined;
  return (m[1] ?? decode(m[2] ?? '')).trim();
}

async function readFeed(url: string, source: Post['sources'][number]): Promise<Post[]> {
  // A stalled feed must fall through to FALLBACK, not hang the build.
  const res = await fetch(url, { headers: { 'user-agent': 'logickoder.dev build' }, signal: AbortSignal.timeout(10_000) });
  if (!res.ok) throw new Error(`${url} returned ${res.status}`);
  const xml = await res.text();
  return [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].flatMap(([, item]) => {
    const title = pick(item, 'title');
    const link = pick(item, 'link');
    const pub = pick(item, 'pubDate');
    if (!title || !link || !pub) return [];
    return [{ title, href: link.split('?')[0], date: new Date(pub).toISOString().slice(0, 10), sources: [source] }];
  });
}

const norm = (t: string) => t.toLowerCase().replace(/[^a-z0-9]/g, '');

// Home and /writing both call this; one fetch per build worker keeps them in agreement.
let posts: Promise<Post[]> | undefined;
export const getPosts = () => (posts ??= loadPosts());

async function loadPosts(): Promise<Post[]> {
  const [substack, medium] = await Promise.allSettled([readFeed(SUBSTACK, 'Substack'), readFeed(MEDIUM, 'Medium')]);
  if (substack.status === 'rejected' && medium.status === 'rejected') return newestFirst(FALLBACK);

  const byTitle = new Map<string, Post>();
  for (const p of substack.status === 'fulfilled' ? substack.value : []) byTitle.set(norm(p.title), p);
  for (const p of medium.status === 'fulfilled' ? medium.value : []) {
    const existing = byTitle.get(norm(p.title));
    if (existing) existing.sources = ['Substack', 'Medium'];
    else byTitle.set(norm(p.title), p);
  }
  return newestFirst([...byTitle.values()]);
}

const newestFirst = (list: Post[]) => [...list].sort((a, b) => b.date.localeCompare(a.date));

const monthFmt = new Intl.DateTimeFormat('en-GB', { month: 'short', year: 'numeric', timeZone: 'UTC' });
const dayFmt = new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short', timeZone: 'UTC' });
const day = (iso: string) => new Date(iso + 'T00:00:00Z');

export const formatMonth = (iso: string) => monthFmt.format(day(iso));
export const formatDay = (iso: string) => dayFmt.format(day(iso));
