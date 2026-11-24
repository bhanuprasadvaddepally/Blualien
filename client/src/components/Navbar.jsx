import { Menu, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { handleLogoClick } from '../lib/navUtils.js';
import { mainNav } from '../data/nav.js';

export default function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const toggleRef = useRef(null);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!isOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const firstFocusable = menuRef.current?.querySelector('a, button');
    firstFocusable?.focus();

    function trapFocus(event) {
      if (event.key === 'Escape') {
        setIsOpen(false);
        toggleRef.current?.focus();
        return;
      }

      if (event.key !== 'Tab') return;
      const focusable = [
        ...menuRef.current.querySelectorAll('a[href], button:not([disabled])'),
      ];
      const first = focusable[0];
      const last = focusable.at(-1);
      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener('keydown', trapFocus);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', trapFocus);
    };
  }, [isOpen]);

  return (
    <header className="sticky top-0 z-30 border-b border-ink/20 bg-paper">
      <div className="mx-auto flex min-h-20 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12">
        <Link
          className="group flex items-center gap-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
          to="/"
          onClick={(e) => handleLogoClick(e, location)}
          aria-label="Blualien Home"
        >
          <img
            src="/brand/recolored_1a5fff.png"
            alt="Blualien"
            width="32"
            height="38"
            className="h-8 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
            loading="eager"
          />
          <span className="font-display text-2xl font-semibold tracking-[-0.06em] text-ink">
            BLUALIEN
          </span>
        </Link>

        <nav
          className="hidden items-center gap-8 md:flex"
          aria-label="Primary navigation"
        >
          {mainNav.map(({ label, to }) => {
            const isActive = location.pathname === to;
            return (
              <Link
                key={to}
                to={to}
                aria-current={isActive ? 'page' : undefined}
                className={`relative py-1 text-sm font-semibold text-ink transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-lime after:transition-all after:duration-200 ${isActive ? 'after:w-full' : 'after:w-0 hover:after:w-full'
                  }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        <Link
          className="hidden border border-lime bg-lime px-4 py-2 text-sm font-bold text-ink transition-colors duration-150 hover:border-ink hover:bg-ink hover:text-lime focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink md:inline-flex"
          to="/contact"
        >
          Work with us
        </Link>

        <button
          ref={toggleRef}
          className="inline-flex h-11 w-11 items-center justify-center border border-ink text-ink transition-colors duration-150 hover:bg-ink hover:text-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink md:hidden"
          type="button"
          aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-controls="mobile-navigation"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((open) => !open)}
        >
          {isOpen ? (
            <X aria-hidden="true" size={20} />
          ) : (
            <Menu aria-hidden="true" size={20} />
          )}
        </button>
      </div>

      {isOpen ? (
        <div
          className="fixed inset-x-0 bottom-0 top-20 z-20 border-b border-ink bg-paper px-5 py-8 sm:px-8"
          id="mobile-navigation"
          ref={menuRef}
        >
          <nav className="mx-auto flex max-w-7xl flex-col" aria-label="Mobile navigation">
            {mainNav.map(({ label, to }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setIsOpen(false)}
                className="border-b border-ink/20 py-4 text-lg font-semibold text-ink hover:text-ink hover:bg-lime/20"
              >
                {label}
              </Link>
            ))}
            <Link
              className="mt-8 inline-flex w-full justify-center border border-lime bg-lime px-5 py-3 font-bold text-ink transition-colors duration-150 hover:border-ink hover:bg-ink hover:text-lime"
              onClick={() => setIsOpen(false)}
              to="/contact"
            >
              Work with us
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
