import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer theme-dark">
      <div className="container footer-container">
        <div className="footer-top">
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
            <img src="/src/assets/blualien logo.png" alt="BLUALIEN" style={{ height: '60px'}} />BLUALIEN</Link>
            <p className="footer-tagline heading-sm mt-4">Building what comes next.</p>
          </div>
          <div className="footer-links-grid">
            <div className="footer-col">
              <h4 className="eyebrow">Company</h4>
              <ul>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/people">People</Link></li>
                <li><Link to="/careers">Careers</Link></li>
                <li><Link to="/contact">Contact</Link></li>
              </ul>
            </div>
            
            <div className="footer-col">
              <h4 className="eyebrow">Build</h4>
              <ul>
                <li><Link to="/products">Products</Link></li>
                <li><Link to="/studio">Studio</Link></li>
                <li><Link to="/labs">Labs</Link></li>
                <li><Link to="/work">Work</Link></li>
              </ul>
            </div>
            
            <div className="footer-col">
              <h4 className="eyebrow">Media</h4>
              <ul>
                <li><a href="https://youtube.com/@aliensorbit?si=_ALLe8pmIAtOoS_0" target="_blank" rel="noopener noreferrer">Alien's Orbit</a></li>
                <li><a href="https://www.instagram.com/thegararushil?stkn=MTk5Mjd5ejU0d3N1Mg==" target="_blank" rel="noopener noreferrer">@thegararushil</a></li>
                <li><a href="#" target="_blank" rel="noopener noreferrer">Beyond 100X</a></li>
              </ul>
            </div>
            
            <div className="footer-col">
              <h4 className="eyebrow">Social</h4>
              <ul>
                <li><a href="https://www.instagram.com/the.blualien?stkn=MTdsamQzeWZjMzl0YQ==" target="_blank" rel="noopener noreferrer">Instagram</a></li>
                <li><a href="https://youtube.com/@gararushil?si=dNkcx7sE7JefgDN6" target="_blank" rel="noopener noreferrer">YouTube</a></li>
                <li><a href="#" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
                <li><a href="#" target="_blank" rel="noopener noreferrer">X</a></li>
                <li><a href="#" target="_blank" rel="noopener noreferrer">GitHub</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2026 Blualien</p>
          <p>Made by Blualien</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
