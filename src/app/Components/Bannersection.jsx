"use client";
import Image from "next/image";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const slides = [
  {
    subtitle: "SAND",
    description: "Fine Grade Construction Sand",
    images: [
      "/sand.png",
      "/sand.png",
      "/sand.png",
    ],
    bg: "linear-gradient(135deg, #F4A460 0%, #DEB887 50%, #D2B48C 100%)",
    cta: "Book Sand"
  },
  {
    subtitle: "BRICKS",
    description: "Premium Red Clay Bricks",
    images: [
      "/bricks1.png",
      "/bricks2.png",
      "/bricks3.png",
      "/bricks4.png"
    ],
    bg: "linear-gradient(135deg, #B22222 0%, #8B0000 50%, #654321 100%)",
    cta: "Book Bricks"
  },
  {
    subtitle: "CEMENT",
    description: "Grade 53 Portland Cement",
    images: [
      "/cement1.png",
      "/cement2.png",
      "/cement3.png"
    ],
    bg: "linear-gradient(135deg, #708090 0%, #2F4F4F 50%, #696969 100%)",
    cta: "Book Cement"
  }
];

function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export default function HeroBannerCenterFixed() {
  const bannerRef = useRef(null);
  const pinRef = useRef(null);
  const slideRefs = useRef([]);

  useGSAP(() => {
    gsap.set(slideRefs.current, { autoAlpha: 0, scale: 0.96 });
    gsap.set(slideRefs.current[0], { autoAlpha: 1, scale: 1 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: bannerRef.current,
        start: "center center",
        end: "+=220%",
        scrub: true,
        pin: pinRef.current,
        pinSpacing: true,
        anticipatePin: 1
      }
    });

    slides.forEach((slide, i) => {
      if (i < slides.length - 1) {
        tl.to(slideRefs.current[i], { autoAlpha: 0, scale: 0.95, duration: 0.33 }, i * 0.5)
          .to(slideRefs.current[i + 1], { autoAlpha: 1, scale: 1, duration: 0.33 }, i * 0.5);
      }
    });
  }, { scope: bannerRef });

  return (
    <>
      <div
        ref={bannerRef}
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <div
          ref={pinRef}
          style={{
            borderRadius: 28,
            overflow: "hidden",
            boxShadow: "0 8px 40px rgba(0, 0, 0, 0.13)",
            width: "98vw",
            height: '95vh',
            background: slides[0].bg,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative"
          }}
        >
          {slides.map((slide, i) => (
            <div
              ref={el => (slideRefs.current[i] = el)}
              key={slide.subtitle}
              style={{
                background: slide.bg,
                position: "absolute",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 1
              }}
            >
              {/* Background Text - Centered behind everything */}
              <h1 style={{
                fontSize: "15vw",
                fontWeight: "900",
                letterSpacing: "1.5vw",
                color: "rgba(255, 255, 255, 0.08)",
                margin: 0,
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: 0,
                userSelect: "none",
                pointerEvents: "none"
              }}>
                {slide.subtitle}
              </h1>
              
              {/* Content Container - Above background text */}
              <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 2,
                position: "relative"
              }}>
                <Image 
                  src={getRandom(slide.images)} 
                  alt={slide.subtitle} 
                  width={300} 
                  height={300}
                  style={{
                    marginBottom: "30px",
                    filter: "drop-shadow(0 8px 16px rgba(0, 0, 0, 0.2))"
                  }}
                />
                
                <p style={{ 
                  color: "#fff", 
                  fontSize: 24, 
                  margin: "0 0 30px 0",
                  textAlign: "center",
                  fontWeight: "500",
                  textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)"
                }}>
                  {slide.description}
                </p>
                
                <button style={{
                  padding: "18px 45px",
                  borderRadius: 30,
                  backgroundColor: "#FFC46B",
                  color: "#222",
                  fontWeight: "700",
                  fontSize: 22,
                  border: "none",
                  cursor: "pointer",
                  boxShadow: "0 6px 20px rgba(255, 196, 107, 0.25)",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease"
                }}>
                  {slide.cta}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
