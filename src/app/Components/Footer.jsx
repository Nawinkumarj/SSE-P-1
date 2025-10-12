"use client";

import React from 'react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer-container">
      <div className="footer-content">
        {/* Left side - Geometric Logo */}
        <div className="logo-section">
          <img src="/logo.png" alt="logo" />
          {/* <h2 className="company-name">Sai Saranya Enterprises</h2> */}
        </div>
        {/* Footer Links Sections */}
        <div className="footer-links-container">
          {/* About Us */}
          <div className="footer-column">
            <h3 className="column-title">Quick Links</h3>
            <ul className="footer-links">
              <li><a href="/">Home</a></li>
              <li><a href="/About">About us</a></li>
              <li><a href="/">Products</a></li>
            </ul>
          </div>

          {/* Support */}
          <div className="footer-column">
            <h3 className="column-title">Support</h3>
            <ul className="footer-links">
              <li><a href="/Contact">Contact</a></li>
              <li><a href="#refund">Refund Policy</a></li>
            </ul>
          </div>

          {/* Social */}
          <div className="footer-column">
            <h3 className="column-title">Social</h3>
            <ul className="footer-links">
              <li><a href="#instagram">Instagram</a></li>
              <li><a href="#linkedin">LinkedIn</a></li>
              <li><a href="#youtube">YouTube</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p className="copyright">Designed & Developed by <span className="developer-name">Vcraftyu Company</span>
          <span className="trademark">™</span>
         </p>
          <a href='/Terms' className="terms">Terms of Service</a>
          <button className="back-to-top" onClick={scrollToTop}>
            Back to top
            <svg className="arrow-up" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M18 15l-6-6-6 6"/>
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
}
