import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { BlogPost, fetchBlogPosts } from '../services/mediumService';
import useAnalytics from '../hooks/useAnalytics';
import BackButton from '../components/BackButton';

const SUBSTACK_PROFILE_URL = 'https://logickoder.substack.com';
const MEDIUM_PROFILE_URL = 'https://medium.com/@logickoder';
const WRITING_DESCRIPTION =
  'Essays and notes by Jeffery Orazulike on mobile engineering, Kotlin Multiplatform, Compose, and what shipping infrastructure actually looks like.';

export default function WritingPage() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { trackPageView, trackBlogPostClick, trackExternalLink } = useAnalytics();

  useEffect(() => {
    trackPageView('Writing');
    void (async () => {
      try {
        setLoading(true);
        const posts = await fetchBlogPosts();
        setBlogPosts(posts);
        setError(null);
      } catch (err) {
        setError('Failed to load posts');
        console.error('Error loading writing posts:', err);
      } finally {
        setLoading(false);
      }
    })();
  }, [trackPageView]);

  const handleBlogPostClick = (post: BlogPost) => {
    trackBlogPostClick(post.title);
    trackExternalLink(`${post.source}_post`, post.href);
  };

  const handleVisitProfile = (source: BlogPost['source']) => {
    const href = source === 'substack' ? SUBSTACK_PROFILE_URL : MEDIUM_PROFILE_URL;
    trackExternalLink(`${source}_profile`, href);
  };

  return (
    <>
      <Helmet>
        <title>Writing · Jeffery Orazulike</title>
        <meta name="description" content={WRITING_DESCRIPTION} />
        <meta property="og:title" content="Writing · Jeffery Orazulike" />
        <meta property="og:description" content={WRITING_DESCRIPTION} />
        <meta name="twitter:title" content="Writing · Jeffery Orazulike" />
        <meta name="twitter:description" content={WRITING_DESCRIPTION} />
        <link rel="canonical" href="https://logickoder.dev/#/writing" />
      </Helmet>

      <div className="bg-chinese-black min-h-screen text-white">
        <header className="border-b border-gray-800 px-6 py-16 sm:px-10 sm:py-20 lg:px-20 lg:py-24 xl:px-40">
          <div className="container mx-auto max-w-screen-md">
            <div className="mb-8">
              <BackButton />
            </div>
            <p className="text-primary font-mono text-xs uppercase tracking-[0.18em] sm:text-sm">
              Essays, notes, longer thinking
            </p>
            <h1 className="mt-4 font-serif text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              Writing
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-gray-300 sm:text-lg sm:leading-loose">
              Cross-posted on Substack and Medium. Pick your reader.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to={SUBSTACK_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleVisitProfile('substack')}
                className="border-primary text-primary hover:bg-primary hover:text-white inline-flex items-center gap-2 rounded-lg border px-4 py-2 font-mono text-xs uppercase tracking-wide transition-colors sm:text-sm"
              >
                Subscribe on Substack
              </Link>
              <Link
                to={MEDIUM_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleVisitProfile('medium')}
                className="hover:border-primary hover:text-primary inline-flex items-center gap-2 rounded-lg border border-gray-700 px-4 py-2 font-mono text-xs uppercase tracking-wide text-gray-300 transition-colors sm:text-sm"
              >
                Follow on Medium
              </Link>
            </div>
          </div>
        </header>

        <section className="px-6 py-16 sm:px-10 sm:py-20 lg:px-20 lg:py-24 xl:px-40">
          <div className="container mx-auto max-w-screen-lg">
            {loading ? (
              <div className="flex justify-center">
                <div className="border-primary h-12 w-12 animate-spin rounded-full border-b-2"></div>
              </div>
            ) : error ? (
              <p className="text-center text-red-400">{error}</p>
            ) : blogPosts.length === 0 ? (
              <p className="text-center text-[#9cabba]">No posts yet. Check back soon.</p>
            ) : (
              <ul className="space-y-10 sm:space-y-12">
                {blogPosts.map((post) => (
                  <li key={post.guid}>
                    <article className="flex flex-col gap-6 rounded-xl bg-[#1b2127] p-6 shadow-lg transition-shadow duration-300 hover:shadow-xl sm:flex-row sm:gap-8">
                      <Link
                        to={post.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => handleBlogPostClick(post)}
                        className="block aspect-video w-full flex-shrink-0 overflow-hidden rounded-lg bg-gray-800 bg-cover bg-center bg-no-repeat sm:w-2/5"
                        style={{
                          backgroundImage: post.thumbnail ? `url(${post.thumbnail})` : undefined
                        }}
                        aria-label={`Read ${post.title}`}
                      />
                      <div className="flex flex-1 flex-col">
                        <p className="text-primary font-mono text-xs uppercase tracking-[0.18em]">
                          {new Date(post.pubDate).toLocaleDateString(undefined, {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                          {' · '}
                          {post.source}
                        </p>
                        <h2 className="mt-3 font-serif text-2xl font-bold leading-tight text-white sm:text-3xl">
                          <Link
                            to={post.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => handleBlogPostClick(post)}
                            className="hover:text-primary transition-colors"
                          >
                            {post.title}
                          </Link>
                        </h2>
                        {post.description ? (
                          <p className="mt-3 text-base leading-relaxed text-gray-400 sm:text-lg">
                            {post.description}
                          </p>
                        ) : null}
                        <div className="mt-auto pt-4">
                          <Link
                            to={post.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => handleBlogPostClick(post)}
                            className="text-primary inline-flex font-mono text-xs uppercase tracking-wide transition-colors hover:underline sm:text-sm"
                          >
                            Read on {post.source} →
                          </Link>
                        </div>
                      </div>
                    </article>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
