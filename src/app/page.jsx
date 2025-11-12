"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Products from "./Components/Products";
import BannerSection from "./Components/Bannersection";
import FlowingMenu from "./Components/FlowingMenu";
import CTA from "./Components/CTA";
import HomeAbout from "./Components/HomeAbout";
import Testimonials from "./Components/Testimonials";
import Serving from "./Components/Serving";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const demoItems = [
    {
      link: "#",
      text: "Crafted for Lasting Prestige",
      image: "https://picsum.photos/600/400?random=1",
    },
    {
      link: "#",
      text: "The Art of Structural Excellence",
      image: "https://picsum.photos/600/400?random=2",
    },
    {
      link: "#",
      text: "Enduring Strength, Timeless Design",
      image: "https://picsum.photos/600/400?random=3",
    },
    {
      link: "#",
      text: "Where Innovation Meets Integrity",
      image: "https://picsum.photos/600/400?random=4",
    },
  ];
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const bannerRef = useRef(null);
  const progressRef = useRef(null);
  const nextSectionRef = useRef(null);
  const productImageRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;

      const xPos = (clientX / innerWidth - 0.5) * 30;
      const yPos = (clientY / innerHeight - 0.5) * 30;

      if (productImageRef.current) {
        gsap.to(productImageRef.current, {
          x: xPos,
          y: yPos,
          duration: 0.5,
          ease: "power2.out",
        });
      }

      gsap.to(".floating-element-1", {
        x: xPos * 0.5,
        y: yPos * 0.5,
        duration: 0.8,
      });

      gsap.to(".floating-element-2", {
        x: xPos * -0.3,
        y: yPos * -0.3,
        duration: 0.6,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="page-container">
      <BannerSection />
      {/* About */}

      <HomeAbout />

      {/* Our serv */}
      <section ref={nextSectionRef} id="services" className="next-section">
        <div className="next-content">
          <div className="next-hero">
            <h2>Our Core Values</h2>
            <p>
              Comprehensive construction solutions for all your building needs
            </p>
          </div>

          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">🏗️</div>
              <h3>Quality First</h3>
              <p>
                {" "}
                Every product undergoes inspection for consistency, strength,
                and finish before dispatch.
              </p>
            </div>

            <div className="service-card">
              <div className="service-icon">🚚</div>
              <h3>Integrity</h3>
              <p>
                We believe trust is built through transparency — in pricing,
                delivery, and service.
              </p>
            </div>

            <div className="service-card">
              <div className="service-icon">📋</div>
              <h3> Customer Commitment</h3>
              <p>
                On-time delivery, responsive support, and personalized service
                for every order.
              </p>
            </div>

            <div className="service-card">
              <div className="service-icon">🚚</div>
              <h3>Sustainability</h3>
              <p>
                Promoting eco-friendly materials like fly ash bricks and recycled aggregates.
              </p>
            </div>

            <div className="service-card">
              <div className="service-icon">🚚</div>
              <h3>Community
                Focus</h3>
              <p>
                Proudly serving local builders, small contractors, and large developers across
                Chennai & Tamil Nadu.
              </p>
            </div>


          </div>
        </div>
      </section>

      <Products />

      {/* Why choose Section */}
      <div className="why-choose-us">
        <h1 className="heading">Why Choose us</h1>
        <div style={{ height: "600px", position: "relative" }}>
          <FlowingMenu items={demoItems} />
        </div>
      </div>
      {/* CTA Section */}
      <CTA />
      <Testimonials />
      <Serving />
    </div>
  );
}
