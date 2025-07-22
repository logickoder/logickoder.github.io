import { MouseEvent, useState } from 'react';
import { navigationLinks } from '../data/navigation';
import { Logo, MenuIcon } from './icons';
import Avatar from './Avatar';
import useAnalytics from '../hooks/useAnalytics';
import useSmoothScroll from '../hooks/useSmoothScroll.ts';
import { Link } from 'react-router-dom';

export default function Header() {
  const { trackEvent } = useAnalytics();
  const { scroll } = useSmoothScroll();

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
      className="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-gray-700/30 bg-gray-900/80 px-6 py-4 backdrop-blur-md transition-all duration-300 sm:px-10"
    >
      <div
        className="group flex cursor-pointer items-center gap-3 text-white sm:gap-4"
        onClick={(e) => handleNavClick('#home', e)}
      >
        <div className="size-5 text-primary-500 transition-colors duration-200 group-hover:text-primary-400 sm:size-6">
          <Logo />
        </div>
        <h2 className="bg-gradient-to-r from-white via-gray-100 to-gray-200 bg-clip-text text-lg font-bold leading-tight tracking-[-0.015em] text-transparent transition-all duration-200 group-hover:from-primary-300 group-hover:to-primary-500 supports-[not_background-clip:text]:text-white sm:text-xl">
          logickoder
        </h2>
      </div>

      {/* Desktop Navigation */}

      <nav className="hidden flex-1 items-center justify-end gap-6 sm:flex lg:gap-8">
        {navigationLinks.map((link) => (
          <Link
            key={link.href}
            className="group relative text-sm font-medium leading-normal text-gray-300 transition-colors duration-200 hover:text-primary-400"
            to={link.href}
            onClick={(e) => handleNavClick(link.href, e)}
          >
            {link.label}
            <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gradient-to-r from-primary-500 to-primary-400 transition-all duration-200 group-hover:w-full"></span>
          </Link>
        ))}
        <Avatar />
      </nav>

      {/* Mobile Menu Button */}
      <button
        className="text-white transition-colors duration-200 hover:text-primary-400 focus:outline-none sm:hidden"
        onClick={toggleMobileMenu}
        aria-label="Toggle mobile menu"
      >
        <MenuIcon />
      </button>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="absolute left-0 right-0 top-full animate-fade-in border-b border-gray-700/30 bg-gray-900/95 backdrop-blur-md sm:hidden">
          <nav className="flex flex-col py-4">
            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                className="px-6 py-3 text-sm font-medium leading-normal text-gray-300 transition-all duration-200 hover:bg-gray-800/50 hover:text-primary-400"
                to={link.href}
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
