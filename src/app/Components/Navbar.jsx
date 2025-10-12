"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleScrollClose = () => {
      if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    
    if (isMobileMenuOpen) {
      window.addEventListener("scroll", handleScrollClose);
    }

    return () => {
      window.removeEventListener("scroll", handleScrollClose);
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <div className={`navbar-container ${isScrolled ? "navbar-scrolled" : ""}`}>
        <div className="navbar-section">
          <div className="navbar-logo">
            <Link href="/">
              <img src="/logo.png" alt="Logo" className="logo-img" />
            </Link>
          </div>
          <div className={`navbar-center ${isScrolled ? "navbar-center-hidden" : ""}`}>
            <Link href="/" className="nav-link">Home</Link>
            <Link href="/About" className="nav-link">About</Link>
            <Link href="/Products" className="nav-link">Products</Link>
            <Link href="/Contact" className="nav-link">Contact</Link>
          </div>
          <div className="navbar-right">
            <div className={`enquiry-btn ${isScrolled ? "enquiry-visible" : "enquiry-visible"}`}>
              <Link href="tel:+" className="btn-enquiry">Enquiry</Link>
            </div>
            <div 
              className={`hamburger-menu ${isScrolled ? "hamburger-visible" : "hamburger-hidden"} ${isMobileMenuOpen ? "hamburger-active" : ""}`}
              onClick={toggleMobileMenu}
            >
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
            </div>
          </div>
        </div>
      </div>

      <div className={`mobile-menu ${isMobileMenuOpen ? "mobile-menu-open" : ""}`}>
        <div className="mobile-menu-content">
          <Link href="/" onClick={closeMobileMenu} className="mobile-nav-link">
            Home
          </Link>
          <Link href="/About" onClick={closeMobileMenu} className="mobile-nav-link">
            About
          </Link>
          <Link href="/Products" onClick={closeMobileMenu} className="mobile-nav-link">
            Product
          </Link>
          <Link href="/Contact" onClick={closeMobileMenu} className="mobile-nav-link">
            Contact
          </Link>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="mobile-menu-overlay" onClick={closeMobileMenu} />
      )}
    </>
  );
}
