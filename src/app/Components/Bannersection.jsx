"use client";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const slides = [
  {
    subtitle: "Your Reliable Partner for Quality Construction Materials in Chennai",
    description:
      "From P-Sand, M-Sand, Fly Ash Bricks to Paver Blocks, Sai Saranya Enterprises has been strengthening the foundations of homes and commercial projects since 2009. Trusted by builders, loved by homeowners, and recognized for our commitment to quality and on-time delivery.",
    bg: "/sandbg.jpg",
  },
  {
    subtitle: "Powering Chennai’s Progress with Superior Construction Supplies",
    description:
      "From P-Sand, M-Sand, Fly Ash Bricks to Paver Blocks, Sai Saranya Enterprises has been strengthening the foundations of homes and commercial projects since 2009. Trusted by builders, loved by homeowners, and recognized for our commitment to quality and on-time delivery.",
    bg: "/blockbg.webp",
  },
  {
    subtitle: "Building Chennai’s Future with Quality Construction Supplies",
    description:
      "From P-Sand, M-Sand, Fly Ash Bricks to Paver Blocks, Sai Saranya Enterprises has been strengthening the foundations of homes and commercial projects since 2009. Trusted by builders, loved by homeowners, and recognized for our commitment to quality and on-time delivery.",
    bg: "/bg.jpg",
  },
];

export default function HeroBannerCenterFixed() {
  const bannerRef = useRef(null);
  const pinRef = useRef(null);
  const slideRefs = useRef([]);

  useGSAP(() => {
    // Set initial state (no blur for smoothness)
    gsap.set(slideRefs.current, {
      autoAlpha: 0,
      scale: 0.97,
      willChange: "transform, opacity",
    });
    gsap.set(slideRefs.current[0], {
      autoAlpha: 1,
      scale: 1,
    });

    // Timeline for smooth slide switching, no blur
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: bannerRef.current,
        start: "center center",
        end: "+=220%",
        scrub: true,
        pin: pinRef.current,
        pinSpacing: true,
        anticipatePin: 0, // For less "shake"
      },
    });

    slides.forEach((slide, i) => {
      if (i < slides.length - 1) {
        tl.to(
          slideRefs.current[i],
          {
            autoAlpha: 0,
            scale: 0.96,
            duration: 0.45,
            force3D: true,
          },
          i * 0.5
        ).to(
          slideRefs.current[i + 1],
          {
            autoAlpha: 1,
            scale: 1,
            duration: 0.45,
            force3D: true,
          },
          i * 0.5
        );
      }
    });
  }, { scope: bannerRef });

  return (
    <div ref={bannerRef} className="hero-banner">
  <div ref={pinRef} className="pin-container">
    {slides.map((slide, i) => (
      <div
        ref={(el) => (slideRefs.current[i] = el)}
        key={slide.subtitle}
        className="slide"
        style={{ backgroundImage: `url(${slide.bg})` }}
      >
        <div className="overlay" />

        <div className="subtitle">{slide.subtitle}</div>

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
