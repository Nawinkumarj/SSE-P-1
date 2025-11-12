'use client';
import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';

const testimonials = [
  {
    rating: 5,
    text: "I’ve been purchasing materials from Sai Saranya Enterprises for over 5 years. Their M-sand quality and delivery timing are unmatched",
    name: "Ramesh K",
    role: "Civil Contractor, Kundrathur"
  },
  {
    rating: 5,
    text: "The paver blocks we got were perfect — no cracks, exact measurements, and smooth installation",
    name: "S. Meenakshi",
    role: "Homeowner – Kanchipuram"
  },
  {
    rating: 5,
    text: "Reliable, affordable, and professional. Highly recommend Sai Saranya Enterprises for any construction needs.",
    name: "Kumar B",
    role: "Builder – Chennai"
  },
  {
    rating: 4,
    text: "Reliable service and good quality materials. Have been purchasing bricks and M-sand regularly — never disappointed",
    name: "Ramesh Kutty",
    role: "Contractor, Kundrathur"
  },
  {
    rating: 5,
    text: "Quality tiles at affordable cost. Best service, value for money. Highly recommended for all construction materials",
    name: "Jothikumar",
    role: "Builder – Chennai"
  },
  {
    rating: 4,
    text: "Good quality and professional approach. Sai Saranya Enterprises always delivers on time.",
    name: "Ramachandran",
    role: "Contractor – Chennai"
  },
  {
    rating: 5,
    text: "Excellent quality! The materials are strong and consistent. Great experience overall.",
    name: "Praveen R",
    role: "Engineer, Pallikaranai"
  },
  {
    rating: 5,
    text: "Excellent service and quick delivery. We got M-sand and paver blocks for our project — very satisfied!",
    name: "Radhika",
    role: "Architect – Chennai"
  },
  {
    rating: 5,
    text: "Best price, best quality! Sai Saranya Enterprises is our go-to supplier for Fly Ash Bricks and Paver Blocks.",
    name: "Surya",
    role: "Contractor – Chennai"
  },
  {
    rating: 5,
    text: "Helpful staff and prompt response. Appreciate their professionalism.",
    name: "Pandian",
    role: "Builder – Chennai"
  }
];

function Avatar({ img, name }) {
  const firstLetter = name ? name.trim()[0].toUpperCase() : '?';
  return (
    <span className="testimonial-avatar-fallback">
      {firstLetter}
    </span>
  );
}

function StarRating({ count }) {
  return (
    <span>
      {Array.from({ length: count }, (_, i) => (
        <span key={i} style={{ color: '#b0be7c', fontSize: '1.15rem', marginRight: '2px' }}>★</span>
      ))}
      {Array.from({ length: 5 - count }, (_, i) => (
        <span key={i+count} style={{ color: '#e0e0e0', fontSize: '1.15rem', marginRight: '2px' }}>★</span>
      ))}
    </span>
  );
}

export default function Testimonials() {
  const [startIndex, setStartIndex] = useState(0);
  const [visibleSliderCount, setVisibleSliderCount] = useState(() =>
    typeof window !== 'undefined' && window.innerWidth < 700 ? 1 : 3
  );
  const cardsRef = useRef(null);

  useEffect(() => {
    function handleResize() {
      setVisibleSliderCount(window.innerWidth < 700 ? 1 : 3);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxSliderIndex = testimonials.length - visibleSliderCount;
  const showTestimonials = testimonials.slice(startIndex, startIndex + visibleSliderCount);

  // GSAP animation: fade and slide in
  useEffect(() => {
    if (cardsRef.current) {
      gsap.fromTo(
        cardsRef.current.children,
        { opacity: 0, y: 45 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.14,
          ease: "power2.out"
        }
      );
    }
  }, [startIndex, visibleSliderCount]); // animate on slider change

  const handlePrev = () => setStartIndex(Math.max(0, startIndex - visibleSliderCount));
  const handleNext = () => setStartIndex(Math.min(maxSliderIndex, startIndex + visibleSliderCount));

  return (
    <section id='Testimonials'>
    <div className="testimonial-section">
      <div className="testimonial-header">
        <div>
          <span className="testimonial-title-sub">Testimonials</span>
          <span className="testimonial-title-main">Reviews That Speak Volumes</span>
        </div>
        <div className="testimonial-header-desc">
          Hear how our solutions have impacted customers, contractors, and builders across Chennai.
        </div>
      </div>
      <div className="testimonial-carousel" ref={cardsRef}>
        {showTestimonials.map((t, idx) => (
          <div className="testimonial-card" key={t.name + idx}>
            <StarRating count={t.rating} />
            <div className="testimonial-text">{`"${t.text}"`}</div>
            <div className="testimonial-user">
              <Avatar name={t.name} />
              <div>
                <span className="testimonial-user-name">{t.name}</span>
                <span className="testimonial-user-role">{t.role}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="testimonial-nav">
        <button className="testimonial-nav-btn" onClick={handlePrev} disabled={startIndex === 0}>◀</button>
        <button className="testimonial-nav-btn" onClick={handleNext} disabled={startIndex >= maxSliderIndex}>▶</button>
      </div>
    </div>
    </section>
  );
}
