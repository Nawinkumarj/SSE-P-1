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
    <div
      ref={bannerRef}
      style={{
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <div
        ref={pinRef}
        style={{
          borderRadius: 28,
          overflow: "hidden",
          boxShadow: "0 8px 40px rgba(0, 0, 0, 0.13)",
          width: "98vw",
          height: "95vh",
          position: "relative",
        }}
      >
        {slides.map((slide, i) => (
          <div
            ref={(el) => (slideRefs.current[i] = el)}
            key={slide.subtitle}
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `url(${slide.bg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              willChange: "transform, opacity",
              display: "block",
            }}
          >
            {/* Overlay */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(0,0,0,0.45)",
                zIndex: 1,
              }}
            />

            {/* Left-aligned large headline */}
            <div
              style={{
                position: "absolute",
                left: "0",
                bottom: "100px",
                // transform: "translateY(50%)",
                width: "53vw",
                paddingLeft: "2vw",
                zIndex: 2,
                color: "#fdf6e3",
                fontFamily: "Montserrat, Arial, sans-serif",
                fontWeight: 900,
                fontSize: "clamp(4.2rem, 3vw, 5rem)",
                lineHeight: 1.13,
                textShadow: "0 8px 50px rgba(0,0,0,0.5)",
              }}
            >
              {slide.subtitle}
            </div>

            {/* Right bottom short description and button */}
            <div
              style={{
                position: "absolute",
                bottom: "8vh",
                right: "4vw",
                width: "35vw",
                minWidth: "320px",
                zIndex: 3,
                textAlign: "right",
                color: "#fff",
                fontFamily: "Arial, sans-serif",
                textShadow: "0 2px 10px rgba(0,0,0,0.8)",
              }}
            >
              <div
                style={{
                  fontSize: "1.25rem",
                  marginBottom: "13px",
                  fontWeight: 400,
                  lineHeight: 1.57,
                  fontStyle: "italic",
                }}
              >
                {slide.description}
              </div>
              <button
                style={{
                  background: "none",
                  color: "white",
                  border: "2px solid var(--primary)",
                  borderRadius: "24px",
                  padding: "8px 28px",
                  fontSize: "1.15rem",
                  fontWeight: 700,
                  cursor: "pointer",
                  transition: "background 0.3s,color 0.3s",
                  position: "relative",
                  marginTop: "6px",
                }}
                onClick={() => window.location.href = '/Products'}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "var(--primary)";
                  e.currentTarget.style.color = "#fff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "none";
                  e.currentTarget.style.color = "#f28705";
                }}
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
