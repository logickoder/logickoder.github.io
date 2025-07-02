export interface BlogPost {
  title: string;
  description: string;
  href: string;
  pubDate: string;
  thumbnail?: string;
  guid: string;
}

interface CachedData {
  posts: BlogPost[];
  timestamp: number;
}

const CACHE_KEY = 'medium_posts_cache';

function getCachedPosts(): { posts: BlogPost[]; isExpired: boolean } | null {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (!cached) return null;

    const { posts, timestamp }: CachedData = JSON.parse(cached);
    const now = Date.now();

    // Check if cache is still valid (less than 24 hours old)
    const isExpired = now - timestamp >= 24 * 60 * 60 * 1000;

    return { posts, isExpired };
  } catch (error) {
    // If there's any error with cache parsing, return null but don't remove
    console.warn('Error parsing cached Medium posts:', error);
    return null;
  }
}

function setCachedPosts(posts: BlogPost[]): void {
  try {
    const cacheData: CachedData = {
      posts,
      timestamp: Date.now()
    };
    localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
  } catch (error) {
    // Silently fail if localStorage is not available or full
    console.warn('Failed to cache Medium posts:', error);
  }
}

export async function fetchMediumPosts(): Promise<BlogPost[]> {
  // Try to get cached posts first
  const cachedData = getCachedPosts();

  // If we have valid (non-expired) cache, return it immediately
  if (cachedData && !cachedData.isExpired) {
    return cachedData.posts;
  }

  // Try to fetch fresh data
  try {
    const response = await fetch(
      `https://api.allorigins.win/get?url=${encodeURIComponent('https://medium.com/feed/@logickoder')}`
    );
    const data = await response.json();

    if (!data.contents) {
      throw new Error('No content received from Medium RSS feed');
    }

    // Parse the RSS XML
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(data.contents, 'text/xml');

    const items = xmlDoc.querySelectorAll('item');
    const posts: BlogPost[] = [];

    items.forEach((item) => {
      const title = item.querySelector('title')?.textContent || '';
      const link = item.querySelector('link')?.textContent || '';
      const pubDate = item.querySelector('pubDate')?.textContent || '';
      const guid = item.querySelector('guid')?.textContent || '';

      // Get content from content:encoded field (this contains the full article content)
      const contentEncoded = item.querySelector('content\\:encoded, encoded')?.textContent || '';

      // Extract thumbnail from content:encoded - look for the first image
      const thumbnailMatch = contentEncoded.match(/<img[^>]+src="([^">]+)"/);
      const thumbnail = thumbnailMatch ? thumbnailMatch[1] : undefined;

      // Extract description from content:encoded by getting the first few paragraphs
      let description = '';
      if (contentEncoded) {
        // Remove figure/img tags and get text from paragraph tags
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = contentEncoded;

        // Remove images, figures, and iframe elements
        const images = tempDiv.querySelectorAll('img, figure, iframe');
        images.forEach((img) => img.remove());

        // Get text from first few paragraphs
        const paragraphs = tempDiv.querySelectorAll('p');
        const textParagraphs: string[] = [];

        for (let i = 0; i < Math.min(3, paragraphs.length); i++) {
          const pText = paragraphs[i].textContent?.trim();
          if (pText && pText.length > 20) {
            // Only include substantial paragraphs
            textParagraphs.push(pText);
          }
        }

        description = textParagraphs.join(' ').substring(0, 250).trim();

        // If no good paragraphs found, fall back to all text content
        if (!description) {
          description = tempDiv.textContent?.replace(/\s+/g, ' ').substring(0, 250).trim() || '';
        }
      }

      // Fallback to description field if content:encoded didn't work
      if (!description) {
        const descriptionField = item.querySelector('description')?.textContent || '';
        description = descriptionField
          .replace(/<[^>]*>/g, '') // Remove HTML tags
          .replace(/&nbsp;/g, ' ') // Replace &nbsp; with space
          .replace(/&amp;/g, '&') // Replace &amp; with &
          .substring(0, 200) // Truncate to 200 characters
          .trim();
      }

      if (title && link) {
        posts.push({
          title,
          description,
          href: link,
          pubDate,
          thumbnail,
          guid
        });
      }
    });

    const limitedPosts = posts.slice(0, 6);

    // Always overwrite cache with fresh data
    setCachedPosts(limitedPosts);

    return limitedPosts;
  } catch (error) {
    console.error('Error fetching Medium posts:', error);

    // If fetch failed but we have expired cache, return the old data
    if (cachedData && cachedData.posts.length > 0) {
      console.warn('Using expired cache due to fetch error');
      return cachedData.posts;
    }

    // If no cache at all, re-throw the error
    throw error;
  }
}
