import useAnalytics from '../hooks/useAnalytics';
import socialLinks from '../data/socialLinks.ts';
import { Link } from 'react-router-dom';

export default function ContactSection() {
  const { trackFormSubmission, trackExternalLink } = useAnalytics();

  const handleFormSubmit = () => {
    trackFormSubmission('contact_form');
  };

  const handleSocialClick = (platform: string, href: string) => {
    trackExternalLink(`social_${platform.toLowerCase()}`, href);
  };

  return (
    <section
      className="bg-[#161a1e] px-6 py-16 sm:px-10 sm:py-20 lg:px-20 lg:py-24 xl:px-40"
      id="contact"
    >
      <div className="container mx-auto max-w-screen-md">
        <h2 className="mb-8 text-center font-serif text-3xl font-bold leading-tight tracking-tight sm:mb-12 sm:text-4xl">
          Get In Touch
        </h2>
        <form
          className="space-y-6"
          action="https://formspree.io/f/xdobdybl"
          method="POST"
          onSubmit={handleFormSubmit}
        >
          <div>
            <label className="sr-only" htmlFor="name">
              Your Name
            </label>
            <input
              className="form-input focus:border-primary focus:ring-primary h-12 w-full rounded-lg border-transparent bg-[#283039] px-4 text-base text-white placeholder:text-[#9cabba] sm:h-14"
              id="name"
              name="name"
              placeholder="Your Name"
              type="text"
              required
            />
          </div>
          <div>
            <label className="sr-only" htmlFor="email">
              Your Email
            </label>
            <input
              className="form-input focus:border-primary focus:ring-primary h-12 w-full rounded-lg border-transparent bg-[#283039] px-4 text-base text-white placeholder:text-[#9cabba] sm:h-14"
              id="email"
              name="email"
              placeholder="Your Email"
              type="email"
              required
            />
          </div>
          <div>
            <label className="sr-only" htmlFor="message">
              Your Message
            </label>
            <textarea
              className="form-input focus:border-primary focus:ring-primary w-full rounded-lg border-transparent bg-[#283039] p-4 text-base text-white placeholder:text-[#9cabba]"
              id="message"
              name="message"
              placeholder="Your Message"
              rows={5}
              required
            />
          </div>
          <div className="text-right">
            <button
              className="bg-primary focus:ring-primary/50 hover:bg-primary-600 h-10 min-w-[120px] cursor-pointer items-center justify-center overflow-hidden rounded-lg px-6 text-sm font-bold leading-normal tracking-[0.015em] text-white transition-colors focus:ring-4 sm:h-12 sm:px-8 sm:text-base"
              type="submit"
            >
              <span className="truncate">Send Message</span>
            </button>
          </div>
        </form>
        <div className="mt-12 flex flex-col items-center gap-4 text-center sm:mt-16">
          <p className="text-lg text-gray-300">Or reach out directly:</p>
          <div className="flex flex-col gap-2 sm:flex-row sm:gap-8">
            <a href="mailto:jeffery@logickoder.dev" className="text-primary hover:underline">
              jeffery@logickoder.dev
            </a>
          </div>
        </div>
        <div className="mt-8 flex justify-center gap-6 sm:gap-8">
          {socialLinks.map((social) => {
            const IconComponent = social.icon;
            return (
              <Link
                key={social.label}
                className="hover:text-primary text-[#9cabba] transition-colors"
                to={social.href}
                onClick={() => handleSocialClick(social.label, social.href)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="sr-only">{social.label}</span>
                <IconComponent />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
