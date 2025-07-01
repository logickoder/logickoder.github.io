import { useEffect, useState } from 'react';
import { BlogPost, fetchMediumPosts } from '../services/mediumService';

export const BlogSection = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true);
        const posts = await fetchMediumPosts();
        console.log('Fetched blog posts:', posts);
        setBlogPosts(posts);
        setError(null);
      } catch (err) {
        setError('Failed to load blog posts');
        console.error('Error loading blog posts:', err);
      } finally {
        setLoading(false);
      }
    };

    void loadPosts();
  }, []);

  if (loading) {
    return (
      <section className="px-6 py-16 sm:px-10 sm:py-20 lg:px-20 lg:py-24 xl:px-40" id="blog">
        <div className="container mx-auto max-w-screen-lg">
          <h2 className="mb-8 text-center text-3xl font-bold leading-tight tracking-tight sm:mb-12 sm:text-4xl">
            Blog
          </h2>
          <div className="flex justify-center">
            <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-primary"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="px-6 py-16 sm:px-10 sm:py-20 lg:px-20 lg:py-24 xl:px-40" id="blog">
      <div className="container mx-auto max-w-screen-lg">
        <h2 className="mb-8 text-center text-3xl font-bold leading-tight tracking-tight sm:mb-12 sm:text-4xl">
          Blog
        </h2>
        {error && <div className="mb-8 text-center text-red-400">{error}</div>}
        <div className="space-y-10 sm:space-y-12">
          {blogPosts.map((post) => (
            <article
              key={post.guid}
              className="flex flex-col items-center gap-6 rounded-xl bg-[#1b2127] p-6 shadow-lg transition-shadow duration-300 hover:shadow-xl sm:flex-row sm:gap-8"
            >
              <div
                className="aspect-video w-full rounded-lg bg-gray-800 bg-cover bg-center bg-no-repeat sm:w-1/3"
                style={{
                  backgroundImage: post.thumbnail ? `url(${post.thumbnail})` : undefined
                }}
              />
              <div className="flex-1">
                <h3 className="mb-2 text-xl font-bold leading-tight text-white">{post.title}</h3>
                <p className="mb-3 text-sm font-normal leading-relaxed text-[#9cabba]">
                  {post.description}
                </p>
                <div className="flex items-center justify-between">
                  <a
                    className="text-sm font-medium text-primary hover:underline"
                    href={post.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Read More →
                  </a>
                  <span className="text-xs text-[#9cabba]">
                    {new Date(post.pubDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
        {blogPosts.length === 0 && !loading && !error && (
          <div className="text-center text-[#9cabba]">No blog posts found. Check back later!</div>
        )}
      </div>
    </section>
  );
};
