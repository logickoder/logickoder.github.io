import { MouseEvent, useState } from 'react';
import { navigationLinks } from '../data/navigation';
import { MenuIcon } from './icons';
import Avatar from './Avatar';
import useAnalytics from '../hooks/useAnalytics';
import useSmoothScroll from '../hooks/useSmoothScroll.ts';
import { Link, useLocation } from 'react-router-dom';

function resolveHref(href: string, onHomePage: boolean): string {
  // HashRouter swallows hash anchors as routes. From a non-home page, a `#`
  // anchor click should route to home; user lands at top and scrolls.
  if (href.startsWith('#') && !onHomePage) {
    return '/';
  }
  return href;
}

export default function Header() {
  const { trackEvent } = useAnalytics();
  const { scroll } = useSmoothScroll();
  const location = useLocation();
  const onHomePage = location.pathname === '/';

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = (href: string, e: MouseEvent<HTMLElement>) => {
    setIsMobileMenuOpen(false);
    scroll(href, e);
  };

  const toggleMobileMenu = () => {
    const newState = !isMobileMenuOpen;
    setIsMobileMenuOpen(newState);

    trackEvent('mobile_menu_toggle', {
      action: newState ? 'open' : 'close'
    });
  };

  return (
    <header
      id="home"
      className="bg-chinese-black/80 sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-gray-800 px-6 py-4 backdrop-blur-md sm:px-10"
    >
      <Link
        to="/"
        className="group inline-flex items-baseline gap-1"
        onClick={(e) => onHomePage && handleNavClick('#home', e)}
      >
        <span className="text-primary font-mono text-base tracking-tight transition-colors group-hover:text-white sm:text-lg">
          logickoder
        </span>
        <span className="text-primary/60 font-mono text-base tracking-tight sm:text-lg" aria-hidden="true">
          .dev
        </span>
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden flex-1 items-center justify-end gap-6 sm:flex lg:gap-8">
        {navigationLinks.map((link) => (
          <Link
            key={link.href}
            className="group hover:text-primary relative font-mono text-xs uppercase tracking-[0.18em] text-gray-300 transition-colors duration-200"
            to={resolveHref(link.href, onHomePage)}
            onClick={(e) => handleNavClick(link.href, e)}
          >
            {link.label}
            <span className="bg-primary absolute -bottom-1 left-0 h-px w-0 transition-all duration-200 group-hover:w-full"></span>
          </Link>
        ))}
        <Avatar />
      </nav>

      {/* Mobile Menu Button */}
      <button
        className="hover:text-primary text-white transition-colors duration-200 focus:outline-none sm:hidden"
        onClick={toggleMobileMenu}
        aria-label="Toggle mobile menu"
      >
        <MenuIcon />
      </button>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="bg-chinese-black/95 absolute left-0 right-0 top-full animate-fade-in border-b border-gray-800 backdrop-blur-md sm:hidden">
          <nav className="flex flex-col py-4">
            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                className="hover:text-primary px-6 py-3 font-mono text-xs uppercase tracking-[0.18em] text-gray-300 transition-colors duration-200 hover:bg-gray-900/50"
                to={resolveHref(link.href, onHomePage)}
                onClick={(e) => handleNavClick(link.href, e)}
              >
                {link.label}
              </Link>
            ))}
            <div className="px-6 py-3">
              <Avatar />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
