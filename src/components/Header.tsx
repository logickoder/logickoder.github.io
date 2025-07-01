import { MouseEvent } from 'react';
import { Logo } from '../assets';
import { navigationLinks } from '../data/navigation';
import { Avatar } from './Avatar';
import { MenuIcon } from './icons';

export const Header = () => {
  const handleNavClick = (href: string, e: MouseEvent<HTMLElement>) => {
    e.preventDefault();

    const targetId = href.replace('#', '');
    const targetElement = document.getElementById(targetId);
    targetElement?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#283039] bg-[#111418]/80 px-6 py-4 backdrop-blur-md sm:px-10">
      <div
        className="flex items-center gap-3 text-white sm:gap-4"
        onClick={(e) => handleNavClick('#hero', e)}
      >
        <div className="size-5 text-primary sm:size-6">
          <Logo />
        </div>
        <h2 className="text-lg font-bold leading-tight tracking-[-0.015em] text-white sm:text-xl">
          logickoder
        </h2>
      </div>
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
      <button className="text-white focus:outline-none sm:hidden">
        <MenuIcon />
      </button>
    </header>
  );
};
