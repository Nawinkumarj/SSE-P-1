import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HomeAbout() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const headingRef = useRef(null);
  const descRef = useRef(null);
  const card1Ref = useRef(null);
  const card2Ref = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.from(titleRef.current, {
        opacity: 0,
        y: -30,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        }
      });

      // Main heading animation
      gsap.from(headingRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        delay: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        }
      });

      // Description animation
      gsap.from(descRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: 0.4,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        }
      });

      // Card animations with stagger
      gsap.from([card1Ref.current, card2Ref.current], {
        opacity: 0,
        y: 60,
        duration: 1,
        stagger: 0.2,
        delay: 0.6,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        }
      });

      // Image animation with scale
      gsap.from(imageRef.current, {
        opacity: 0,
        scale: 0.9,
        duration: 1.2,
        delay: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        }
      });

      // Hover animation for cards
      [card1Ref.current, card2Ref.current].forEach(card => {
        card.addEventListener('mouseenter', () => {
          gsap.to(card, { y: -10, duration: 0.3, ease: 'power2.out' });
        });
        card.addEventListener('mouseleave', () => {
          gsap.to(card, { y: 0, duration: 0.3, ease: 'power2.out' });
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="home-about-us">
      <div className="home-about-us-container">
        <div className="home-about-us-content-wrapper">
          {/* Left Content */}
          <div className="home-about-us-left-content">
            <h1 ref={titleRef} className="home-about-us-title">ABOUT US</h1>
            
            <div className="home-about-us-main-card">
              <h2 ref={headingRef} className="home-about-us-heading">
                What makes us unique is our unwavering commitment to excellence. 
                We're not just a travel agency.
              </h2>
              
              <p ref={descRef} className="home-about-us-description">
                We're trusted storytellers. Discover the reasons why travelers 
                like you choose us for their adventures.
              </p>
              
              <div className="home-about-us-info-cards">
                <div ref={card1Ref} className="home-about-us-info-card">
                  <div className="home-about-us-card-icon">🌍</div>
                  <h3>Tailor-Made Tours</h3>
                  <p>With over 50 years of experience, our team of travel experts has traveled the globe.</p>
                </div>
                
                <div ref={card2Ref} className="home-about-us-info-card">
                  <div className="home-about-us-card-icon">🎯</div>
                  <h3>Safety and Quality</h3>
                  <p>Your well-being is at the heart of everything we do. We prioritize your safety and quality standards.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="home-about-us-right-content">
            <div className="home-about-us-badge">SINCE 1975</div>
            <p className="home-about-us-badge-text">
              Established in Dubai of Establishments, Oman Travel Agency Name 
              has been dedicated to providing exceptional travel experiences...
            </p>
            
            <div ref={imageRef} className="home-about-us-image-container">
              <img src="/sand.png" alt="Vintage VW Van" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
