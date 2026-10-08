import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    document.body.style.overflow = 'auto';
  }, [location]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    document.body.style.overflow = !mobileMenuOpen ? 'hidden' : 'auto';
  };

  return (
    <>
      <header className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="navbar-container">
          <Link to="/" className="brand-logo">
            <img src="/src/assets/blualien logo.png" alt="BLUALIEN" style={{ height: '60px' }} />
          </Link>

          <nav className="nav-desktop">
            <Link to="/" className="nav-item">Company</Link>
            <Link to="/studio" className="nav-item">Studio</Link>
            <Link to="/orbit" className="nav-item">Orbit</Link>
            <Link to="/labs" className="nav-item">Labs</Link>
            <Link to="/about" className="nav-item">About</Link>
          </nav>

          <div className="nav-actions-desktop">
            <Link to="/contact" className="nav-btn">Work with us</Link>
          </div>

          <button
            className="mobile-toggle"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <div className={`hamburger ${mobileMenuOpen ? 'active' : ''}`}>
              <span></span>
              <span></span>
            </div>
          </button>
        </div>
      </header>

      {/* Fullscreen Mobile Menu */}
      <div className={`mobile-menu-overlay ${mobileMenuOpen ? 'active' : ''}`}>
        <div className="mobile-menu-container">
          <nav className="mobile-nav-links">
            <Link to="/" className="mobile-nav-item">Company</Link>
            <Link to="/studio" className="mobile-nav-item">Studio</Link>
            <Link to="/orbit" className="mobile-nav-item">Orbit</Link>
            <Link to="/labs" className="mobile-nav-item">Labs</Link>
            <Link to="/about" className="mobile-nav-item">About</Link>
          </nav>

          <div className="mobile-nav-footer mt-12">
            <Link to="/contact" className="btn btn-primary w-full">Work with us</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
