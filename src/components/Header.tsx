import { MouseEvent, useState } from 'react';
import { navigationLinks } from '../data/navigation';
import { Avatar } from './Avatar';
import { Logo, MenuIcon } from './icons';
import { useAnalytics } from '../hooks/useAnalytics';

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { trackNavigation, trackEvent } = useAnalytics();

  const handleNavClick = (href: string, e: MouseEvent<HTMLElement>) => {
    e.preventDefault();

    const targetId = href.replace('#', '');

    trackNavigation(targetId);
    setIsMobileMenuOpen(false);

    document.getElementById(targetId)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
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
      className="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#283039] bg-[#111418]/80 px-6 py-4 backdrop-blur-md sm:px-10"
    >
      <div
        className="flex cursor-pointer items-center gap-3 text-white sm:gap-4"
        onClick={(e) => handleNavClick('#home', e)}
      >
        <div className="size-5 text-primary sm:size-6">
          <Logo />
        </div>
        <h2 className="text-lg font-bold leading-tight tracking-[-0.015em] text-white sm:text-xl">
          logickoder
        </h2>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden flex-1 items-center justify-end gap-6 sm:flex lg:gap-8">
        {navigationLinks.map((link) => (
          <a
            key={link.href}
            className="text-sm font-medium leading-normal transition-colors hover:text-primary"
            href={link.href}
            onClick={(e) => handleNavClick(link.href, e)}
          >
            {link.label}
          </a>
        ))}
        <Avatar />
      </nav>

      {/* Mobile Menu Button */}
      <button
        className="text-white focus:outline-none sm:hidden"
        onClick={toggleMobileMenu}
        aria-label="Toggle mobile menu"
      >
        <MenuIcon />
      </button>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="absolute left-0 right-0 top-full border-b border-[#283039] bg-[#111418]/95 backdrop-blur-md sm:hidden">
          <nav className="flex flex-col py-4">
            {navigationLinks.map((link) => (
              <a
                key={link.href}
                className="px-6 py-3 text-sm font-medium leading-normal text-white transition-colors hover:bg-[#283039] hover:text-primary"
                href={link.href}
                onClick={(e) => handleNavClick(link.href, e)}
              >
                {link.label}
              </a>
            ))}
            <div className="flex justify-center px-6 py-3">
              <Avatar size="sm" />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
