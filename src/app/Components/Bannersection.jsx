"use client";
import { useRef, useEffect } from "react";
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
    subtitle: "Powering Chennai’s Progress with Superior Construction Supplies",
    title: "Buy Solid Blocks and Bricks in Kundrathur",
    description:
      "From P-Sand, M-Sand, Fly Ash Bricks to Paver Blocks, Sai Saranya Enterprises has been strengthening the foundations of homes and commercial projects since 2009. Trusted by builders, loved by homeowners, and recognized for our commitment to quality and on-time delivery.",
    bg: "/blockbg.webp",
  },
  {
    subtitle: "Building Chennai’s Future with Quality Construction Supplies",
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

  useEffect(() => {
    const mm = gsap.matchMedia();

    // Mobile breakpoint
    mm.add("(max-width: 768px)", () => {
      // Disable pinning and timeline, natural scroll on mobile
      ScrollTrigger.create({
        trigger: bannerRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: false,
      });

      // Reset all slides to visible and normal scale
      gsap.set(slideRefs.current, {
        autoAlpha: 1,
        scale: 1,
        clearProps: "all",
      });

      // Cleanup function
      return () => {
        ScrollTrigger.getAll().forEach((st) => st.kill());
      };
    });

    // Desktop breakpoint
    mm.add("(min-width: 769px)", () => {
      // Set initial state: first slide visible, others hidden/scaled down
      gsap.set(slideRefs.current, {
        autoAlpha: 0,
        scale: 0.97,
        willChange: "transform, opacity",
      });
      gsap.set(slideRefs.current[0], {
        autoAlpha: 1,
        scale: 1,
      });

      // Timeline for fade and scale animations while pinning
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: bannerRef.current,
          start: "center center",
          end: "+=220%",
          scrub: true,
          pin: pinRef.current,
          pinSpacing: true,
          anticipatePin: 0,
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

      // Cleanup function
      return () => {
        ScrollTrigger.getAll().forEach((st) => st.kill());
        tl.kill();
      };
    });

    // Cleanup all on unmount
    return () => {
      mm.revert();
    };
  }, []);

  return (
    <div ref={bannerRef} className="hero-banner">
      <div ref={pinRef} className="pin-container">
        {slides.map((slide, i) => (
          <div
            key={slide.subtitle}
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
