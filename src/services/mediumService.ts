export interface BlogPost {
  title: string;
  description: string;
  href: string;
  pubDate: string;
  thumbnail?: string;
  guid: string;
  source: 'medium' | 'substack';
}

interface CachedData {
  posts: BlogPost[];
  timestamp: number;
}

const MEDIUM_CACHE_KEY = 'medium_posts_cache';
const SUBSTACK_CACHE_KEY = 'substack_posts_cache';
const MEDIUM_FEED_URL = 'https://medium.com/feed/@logickoder';
const SUBSTACK_FEED_URL = 'https://logickoder.substack.com/feed';
const CACHE_TTL_MS = 24 * 60 * 60 * 1000;

function getCachedPosts(
  cacheKey: string
): { posts: BlogPost[]; isExpired: boolean } | null {
  try {
    const cached = localStorage.getItem(cacheKey);
    if (!cached) return null;

    const { posts, timestamp }: CachedData = JSON.parse(cached);
    const now = Date.now();

    const isExpired = now - timestamp >= CACHE_TTL_MS;

    return { posts, isExpired };
  } catch (error) {
    console.warn(`Error parsing cached posts for ${cacheKey}:`, error);
    return null;
  }
}

function setCachedPosts(cacheKey: string, posts: BlogPost[]): void {
  try {
    const cacheData: CachedData = {
      posts,
      timestamp: Date.now()
    };
    localStorage.setItem(cacheKey, JSON.stringify(cacheData));
  } catch (error) {
    console.warn(`Failed to cache posts for ${cacheKey}:`, error);
  }
}

function extractDescriptionFromContent(contentEncoded: string): string {
  if (!contentEncoded) return '';

  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = contentEncoded;

  const images = tempDiv.querySelectorAll('img, figure, iframe');
  images.forEach((img) => img.remove());

  const paragraphs = tempDiv.querySelectorAll('p');
  const textParagraphs: string[] = [];

  for (let i = 0; i < Math.min(3, paragraphs.length); i++) {
    const pText = paragraphs[i].textContent?.trim();
    if (pText && pText.length > 20) {
      textParagraphs.push(pText);
    }
  }

  let description = textParagraphs.join(' ').substring(0, 250).trim();

  if (!description) {
    description = tempDiv.textContent?.replace(/\s+/g, ' ').substring(0, 250).trim() || '';
  }

  return description;
}

function fallbackDescriptionFromField(rawDescription: string): string {
  return rawDescription
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .substring(0, 200)
    .trim();
}

async function fetchFeedPosts(
  feedUrl: string,
  cacheKey: string,
  source: BlogPost['source']
): Promise<BlogPost[]> {
  const cachedData = getCachedPosts(cacheKey);

  if (cachedData && !cachedData.isExpired) {
    return cachedData.posts;
  }

  try {
    const response = await fetch(
      `https://api.allorigins.win/get?url=${encodeURIComponent(feedUrl)}`
    );
    const data = await response.json();

    if (!data.contents) {
      throw new Error(`No content received from ${source} RSS feed`);
    }

    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(data.contents, 'text/xml');

    const items = xmlDoc.querySelectorAll('item');
    const posts: BlogPost[] = [];

    items.forEach((item) => {
      const title = item.querySelector('title')?.textContent || '';
      const link = item.querySelector('link')?.textContent || '';
      const pubDate = item.querySelector('pubDate')?.textContent || '';
      const guid = item.querySelector('guid')?.textContent || link;

      const contentEncoded =
        item.querySelector('content\\:encoded, encoded')?.textContent || '';

      // Substack RSS exposes thumbnails via <enclosure url="..." />.
      // Medium embeds first <img> inside content:encoded.
      const enclosureUrl = item.querySelector('enclosure')?.getAttribute('url') || '';
      const thumbnailMatch = contentEncoded.match(/<img[^>]+src="([^">]+)"/);
      const thumbnail = enclosureUrl || thumbnailMatch?.[1] || undefined;

      let description = extractDescriptionFromContent(contentEncoded);

      if (!description) {
        const descriptionField = item.querySelector('description')?.textContent || '';
        description = fallbackDescriptionFromField(descriptionField);
      }

      if (title && link) {
        posts.push({
          title,
          description,
          href: link,
          pubDate,
          thumbnail,
          guid,
          source
        });
      }
    });

    const limitedPosts = posts.slice(0, 6);
    setCachedPosts(cacheKey, limitedPosts);

    return limitedPosts;
  } catch (error) {
    console.error(`Error fetching ${source} posts:`, error);

    if (cachedData && cachedData.posts.length > 0) {
      console.warn(`Using expired ${source} cache due to fetch error`);
      return cachedData.posts;
    }

    return [];
  }
}

export async function fetchMediumPosts(): Promise<BlogPost[]> {
  return fetchFeedPosts(MEDIUM_FEED_URL, MEDIUM_CACHE_KEY, 'medium');
}

export async function fetchSubstackPosts(): Promise<BlogPost[]> {
  return fetchFeedPosts(SUBSTACK_FEED_URL, SUBSTACK_CACHE_KEY, 'substack');
}

/**
 * Aggregates posts from both Substack (canonical) and Medium (cross-post).
 * Dedupes by case-insensitive title; Substack wins on collision.
 * Returns up to 6 most recent posts.
 */
export async function fetchBlogPosts(): Promise<BlogPost[]> {
  const [substackResult, mediumResult] = await Promise.allSettled([
    fetchSubstackPosts(),
    fetchMediumPosts()
  ]);

  const substackPosts =
    substackResult.status === 'fulfilled' ? substackResult.value : [];
  const mediumPosts = mediumResult.status === 'fulfilled' ? mediumResult.value : [];

  const seenTitles = new Set(
    substackPosts.map((post) => post.title.trim().toLowerCase())
  );

  const merged = [
    ...substackPosts,
    ...mediumPosts.filter((post) => !seenTitles.has(post.title.trim().toLowerCase()))
  ];

  merged.sort((a, b) => {
    const aTime = new Date(a.pubDate).getTime();
    const bTime = new Date(b.pubDate).getTime();
    return bTime - aTime;
  });

  return merged.slice(0, 6);
}
