"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HomeAbout() {
  const sectionRef = useRef(null);
  const leftRef = useRef(null);
  const imageRef = useRef(null);
  const rightRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Left heading animation
      gsap.from(leftRef.current, {
        opacity: 0,
        x: -60,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        },
      });

      // Image animation
      gsap.from(imageRef.current, {
        opacity: 0,
        scale: 0.9,
        duration: 1.2,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      // Right description animation
      gsap.from(rightRef.current, {
        opacity: 0,
        x: 60,
        duration: 1,
        delay: 0.4,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="about-section">
      <div className="about-container">
        {/* LEFT SIDE */}
        <div ref={leftRef} className="about-left">
          <h5 className="about-subtitle">[ ABOUT US ]</h5>
          <h1 className="about-title">
            MINDS <br /> BEHIND THE <br /> SUPPLY
          </h1>
        </div>

        {/* CENTER IMAGE */}
        <div ref={imageRef} className="about-image">
          <img src="/maps.png" alt="Sai Saranya Enterprises" />
        </div>

        {/* RIGHT SIDE CONTENT */}
        <div ref={rightRef} className="about-right">
          <p className="about-text">
            Sai Saranya Enterprises has grown into one of Chennai’s most trusted
            names in construction material supply. From our early days delivering
            bricks and sand locally, we’ve evolved to serve major residential and
            industrial projects across Chennai, Kanchipuram, and surrounding regions.
            <br />
            <br />
            With a focus on quality, transparency, and customer satisfaction, we’ve
            built a reputation for reliability and timely delivery in every order.
          </p>

          <a href="/about" className="about-btn">
            WHO WE ARE <span className="arrow">↗</span>
          </a>

          <div className="about-stats">
            <div className="stat">
              <h2>16+</h2>
              <p>YEARS OF EXPERIENCE</p>
            </div>
            <div className="stat">
              <h2>400+</h2>
              <p>PROJECTS SUPPLIED</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
