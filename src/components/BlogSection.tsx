import { useEffect, useState } from 'react';
import { BlogPost, fetchMediumPosts } from '../services/mediumService';
import useAnalytics from '../hooks/useAnalytics';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function BlogSection() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { trackBlogPostClick, trackExternalLink } = useAnalytics();

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true);
        const posts = await fetchMediumPosts();
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

  const handleBlogPostClick = (post: BlogPost) => {
    trackBlogPostClick(post.title);
    trackExternalLink('medium_post', post.href);
  };

  const handleViewAllPostsClick = () => {
    trackExternalLink('medium_profile', 'https://medium.com/@logickoder');
  };

  if (loading) {
    return (
      <section className="px-6 py-16 sm:px-10 sm:py-20 lg:px-20 lg:py-24 xl:px-40" id="blog">
        <div className="container mx-auto max-w-screen-lg">
          <h2 className="mb-8 text-center text-3xl font-bold leading-tight tracking-tight sm:mb-12 sm:text-4xl">
            Blog
          </h2>
          <div className="flex justify-center">
            <div className="border-primary h-12 w-12 animate-spin rounded-full border-b-2"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="px-6 py-16 sm:px-10 sm:py-20 lg:px-20 lg:py-24 xl:px-40" id="blog">
      <div className="container mx-auto max-w-screen-lg">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8 text-center text-3xl font-bold leading-tight tracking-tight sm:mb-12 sm:text-4xl"
        >
          Blog
        </motion.h2>
        {error && <div className="mb-8 text-center text-red-400">{error}</div>}
        <div className="space-y-10 sm:space-y-12">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.guid}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
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
                  <Link
                    className="text-primary text-sm font-medium hover:underline"
                    to={post.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleBlogPostClick(post)}
                  >
                    Read More →
                  </Link>
                  <span className="text-xs text-[#9cabba]">
                    {new Date(post.pubDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
        {blogPosts.length === 0 && !loading && !error && (
          <div className="text-center text-[#9cabba]">No blog posts found. Check back later!</div>
        )}
        {blogPosts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 text-center"
          >
            <p className="mb-4 text-gray-400">Want to read more of my articles?</p>
            <Link
              to="https://medium.com/@logickoder"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary hover:bg-primary/80 inline-flex items-center gap-2 rounded-lg px-6 py-3 font-semibold text-white transition-colors"
              onClick={handleViewAllPostsClick}
            >
              Visit My Medium Profile
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
