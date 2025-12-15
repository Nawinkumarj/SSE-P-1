"use client";
import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const slides = [
  {
    subtitle: "Your Reliable Partner for Quality Construction Materials in Chennai",
    title: "Fly Ash Bricks Supplier in Kundrathur, Chennai",
    description:
      "From P-Sand, M-Sand, Fly Ash Bricks to Paver Blocks, Sai Saranya Enterprises has been strengthening the foundations of homes and commercial projects since 2009. Trusted by builders, loved by homeowners, and recognized for our commitment to quality and on-time delivery.",
    bg: "/sandbg.jpg",
  },
  {
    subtitle: "Powering Chennai's Progress with Superior Construction Supplies",
    title: "Buy Solid Blocks and Bricks in Kundrathur",
    description:
      "From P-Sand, M-Sand, Fly Ash Bricks to Paver Blocks, Sai Saranya Enterprises has been strengthening the foundations of homes and commercial projects since 2009. Trusted by builders, loved by homeowners, and recognized for our commitment to quality and on-time delivery.",
    bg: "/blockbg.webp",
  },
  {
    subtitle: "Building Chennai's Future with Quality Construction Supplies",
    title: "Construction Materials Supplier near Kundrathur Chennai",
    description:
      "From P-Sand, M-Sand, Fly Ash Bricks to Paver Blocks, Sai Saranya Enterprises has been strengthening the foundations of homes and commercial projects since 2009. Trusted by builders, loved by homeowners, and recognized for our commitment to quality and on-time delivery.",
    bg: "/bg.jpg",
  },
];

export default function HeroBannerCenterFixed() {
  const bannerRef = useRef(null);
  const pinRef = useRef(null);
  const slideRefs = useRef([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) {
      // Mobile: Auto-advance carousel every 4 seconds
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 4000);

      return () => clearInterval(interval);
    } else {
      // Desktop: GSAP ScrollTrigger animation
      const ctx = gsap.context(() => {
        // Set initial state
        gsap.set(slideRefs.current, {
          autoAlpha: 0,
          scale: 0.97,
          willChange: "transform, opacity",
        });
        gsap.set(slideRefs.current[0], {
          autoAlpha: 1,
          scale: 1,
        });

        // Timeline for fade and scale animations
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: bannerRef.current,
            start: "center center",
            end: "+=220%",
            scrub: true,
            pin: pinRef.current,
            pinSpacing: true,
            anticipatePin: 1,
          },
        });

        slides.forEach((slide, i) => {
          if (i < slides.length - 1) {
            tl.to(
              slideRefs.current[i],
              { autoAlpha: 0, scale: 0.96, duration: 0.45, force3D: true },
              i * 0.5
            ).to(
              slideRefs.current[i + 1],
              { autoAlpha: 1, scale: 1, duration: 0.45, force3D: true },
              i * 0.5
            );
          }
        });
      }, bannerRef);

      return () => ctx.revert();
    }
  }, [isMobile]);

  // Mobile carousel navigation
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  if (isMobile) {
    return (
      <div className="hero-banner mobile-carousel">
        <div className="pin-container">
          <div
            className="carousel-track"
            style={{
              transform: `translateX(-${currentSlide * 100}%)`,
              transition: "transform 0.5s ease-in-out",
            }}
          >
            {slides.map((slide, i) => (
              <div
                key={i}
                className="slide"
                style={{ backgroundImage: `url(${slide.bg})` }}
              >
                <div className="overlay" />
                <div className="hero-subtitle">{slide.subtitle}</div>
                <h1 className="banner-title">{slide.title}</h1>
                <div className="description-container">
                  <div className="description-text">{slide.description}</div>
                  <button
                    className="explore-button"
                    onClick={() => (window.location.href = "/Products")}
                  >
                    Explore Products
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {/* Carousel Indicators */}
          <div className="carousel-indicators">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`indicator ${currentSlide === index ? "active" : ""}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Desktop view
  return (
    <div ref={bannerRef} className="hero-banner">
      <div ref={pinRef} className="pin-container">
        {slides.map((slide, i) => (
          <div
            key={i}
            ref={(el) => (slideRefs.current[i] = el)}
            className="slide"
            style={{ backgroundImage: `url(${slide.bg})` }}
          >
            <div className="overlay" />
            <div className="hero-subtitle">{slide.subtitle}</div>
            <h1 className="banner-title">{slide.title}</h1>
            <div className="description-container">
              <div className="description-text">{slide.description}</div>
              <button
                className="explore-button"
                onClick={() => (window.location.href = "/Products")}
              >
                Explore Products
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
