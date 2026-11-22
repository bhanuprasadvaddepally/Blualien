import { Github, Instagram, Linkedin, Twitter, Youtube } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { handleLogoClick } from '../lib/navUtils.js';
import { socialLinks } from '../data/social.js';

const socialIconMap = {
  Twitter,
  Instagram,
  Youtube,
  Linkedin,
  Github,
};

const footerGroups = [
  {
    title: 'Company',
    links: [
      ['About', '/about'],
      ['People', '/people'],
      ['Careers', '/careers'],
      ['Contact', '/contact'],
    ],
  },
  {
    title: 'Build',
    links: [
      ['Products', '/products'],
      ['Studio', '/studio'],
      ['Labs', '/labs'],
      ['Work', '/work'],
    ],
  },
];

const mediaGroup = {
  title: 'Media',
  links: [
    ["Alien's Orbit", 'https://youtube.com/@aliensorbit?si=_ALLe8pmIAtOoS_0'],
    [
      '@thegararushil',
      'https://www.instagram.com/thegararushil?stkn=MTk5Mjd5ejU0d3N1Mg==',
    ],
    ['Beyond 100X', 'https://youtube.com/@gararushil?si=dNkcx7sE7JefgDN6'],
  ],
};

function LinkGroup({ group, external = false }) {
  return (
    <div>
      <h2 className="text-xs font-bold uppercase tracking-[0.14em] text-lime">
        {group.title}
      </h2>
      <ul className="mt-5 space-y-3 text-sm font-medium text-paper">
        {group.links.map(([label, destination]) => {
          const isPlaceholder = destination === '#';
          if (isPlaceholder) {
            return (
              <li key={label}>
                <span className="text-paper/60">{label}</span>
              </li>
            );
          }

          return (
            <li key={label}>
              {external ? (
                <a
                  href={destination}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative inline-block py-0.5 transition-colors duration-150 hover:text-lime focus-visible:outline focus-visible:outline-2 focus-visible:outline-lime after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-lime after:transition-all after:duration-200 hover:after:w-full"
                >
                  {label}
                </a>
              ) : (
                <Link
                  className="relative inline-block py-0.5 transition-colors duration-150 hover:text-lime focus-visible:outline focus-visible:outline-2 focus-visible:outline-lime after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-lime after:transition-all after:duration-200 hover:after:w-full"
                  to={destination}
                >
                  {label}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default function Footer() {
  const location = useLocation();

  return (
    <footer className="border-t border-paper/30 bg-ink px-5 py-16 text-paper sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1.9fr]">
          <div>
            <Link
              className="group inline-flex items-center gap-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-lime"
              to="/"
              onClick={(e) => handleLogoClick(e, location)}
              aria-label="Blualien Home"
            >
              <img
                src="/brand/blualien-logo-light.png"
                alt="Blualien"
                width="34"
                height="40"
                className="h-9 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
                loading="lazy"
              />
              <span className="font-display text-3xl font-semibold tracking-[-0.06em] text-paper">
                BLUALIEN
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-lg font-medium text-lime">
              Building what comes next.
            </p>

            {/* Circular (44px) social icon buttons with 1px border and lime hover */}
            <div
              className="mt-6 flex flex-wrap items-center gap-3"
              aria-label="Social links"
            >
              {socialLinks.map((item) => {
                const IconComponent = socialIconMap[item.icon];
                const isPlaceholder = item.url === '#';

                if (isPlaceholder) {
                  return (
                    <span
                      key={item.name}
                      title={`${item.name} (Coming soon)`}
                      aria-label={`${item.name} (Coming soon)`}
                      className="inline-flex h-11 w-11 cursor-not-allowed items-center justify-center rounded-full border border-paper/30 text-paper/40"
                    >
                      <IconComponent size={18} aria-hidden="true" />
                    </span>
                  );
                }

                return (
                  <a
                    key={item.name}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={item.name}
                    aria-label={item.name}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-paper/30 text-paper transition-all duration-200 hover:-translate-y-0.5 hover:border-lime hover:bg-lime hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-lime"
                  >
                    <IconComponent size={18} aria-hidden="true" />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {footerGroups.map((group) => (
              <LinkGroup group={group} key={group.title} />
            ))}
            <LinkGroup group={mediaGroup} external key={mediaGroup.title} />
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-paper/20 pt-6 text-sm text-paper/75 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Blualien. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span>Made by</span>
            <img
              src="/brand/blualien-logo-light.png"
              alt="Blualien"
              width="16"
              height="19"
              className="inline-block h-4 w-auto"
              loading="lazy"
            />
            <span className="font-semibold text-paper">Blualien</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
