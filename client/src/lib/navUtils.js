/**
 * Handles clicking the BLUALIEN logo in Navbar and Footer.
 * If already on '/', smooth-scrolls to top (instant if prefers-reduced-motion),
 * removes URL hash, and focuses the hero heading.
 * If on another page, Link navigation executes and ScrollToTop handles instant reset.
 */
export function handleLogoClick(event, location) {
  if (location.pathname === '/') {
    event.preventDefault();
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });

    window.history.replaceState(null, '', '/');

    const heroHeading = document.getElementById('hero-heading');
    if (heroHeading) {
      heroHeading.tabIndex = -1;
      heroHeading.focus({ preventScroll: true });
    }
  }
}
