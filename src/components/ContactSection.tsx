import { GitHubIcon, LinkedInIcon, TwitterIcon } from './icons';
import { useAnalytics } from '../hooks/useAnalytics';

const socialLinks = [
  {
    icon: TwitterIcon,
    label: 'Twitter',
    href: 'https://x.com/logickoder'
  },
  {
    icon: LinkedInIcon,
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/logickoder/'
  },
  {
    icon: GitHubIcon,
    label: 'GitHub',
    href: 'https://github.com/logickoder'
  }
];

export const ContactSection = () => {
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
        <h2 className="mb-8 text-center text-3xl font-bold leading-tight tracking-tight sm:mb-12 sm:text-4xl">
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
              className="form-input h-12 w-full rounded-lg border-transparent bg-[#283039] px-4 text-base text-white placeholder:text-[#9cabba] focus:border-primary focus:ring-primary sm:h-14"
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
              className="form-input h-12 w-full rounded-lg border-transparent bg-[#283039] px-4 text-base text-white placeholder:text-[#9cabba] focus:border-primary focus:ring-primary sm:h-14"
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
              className="form-input w-full rounded-lg border-transparent bg-[#283039] p-4 text-base text-white placeholder:text-[#9cabba] focus:border-primary focus:ring-primary"
              id="message"
              name="message"
              placeholder="Your Message"
              rows={5}
              required
            />
          </div>
          <div className="text-right">
            <button
              className="h-10 min-w-[120px] cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-primary px-6 text-sm font-bold leading-normal tracking-[0.015em] text-white transition-colors hover:bg-[#0a6cce] focus:ring-4 focus:ring-primary/50 sm:h-12 sm:px-8 sm:text-base"
              type="submit"
            >
              <span className="truncate">Send Message</span>
            </button>
          </div>
        </form>
        <div className="mt-12 flex justify-center gap-6 sm:mt-16 sm:gap-8">
          {socialLinks.map((social) => {
            const IconComponent = social.icon;
            return (
              <a
                key={social.label}
                className="text-[#9cabba] transition-colors hover:text-primary"
                href={social.href}
                onClick={() => handleSocialClick(social.label, social.href)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="sr-only">{social.label}</span>
                <IconComponent />
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};
