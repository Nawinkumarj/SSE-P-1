"use client";
import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Products() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  const products = [
    {
      id: 1,
      name: "Fly Ash",
      category: "Sand",
      image: "/flyash.png",
    },
    {
      id: 2,
      name: "THE PAVER TILES",
      category: "Bricks",
      image: "/paver.png",
    },
    {
      id: 3,
      name: "THE ZIG-ZAG TILES",
      category: "Cement",
      image: "/zigzag.png",
    },
    {
      id: 4,
      name: "THE CONCRETE BLOCKS",
      category: "Blocks",
      image: "/concrete.png",
    },
    {
      id: 5,
      name: "THE AAC BLOCKS",
      category: "Blocks",
      image: "/aac.png",
    },
  ];

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Desktop animations - with tilt effect
      mm.add("(min-width: 1024px)", () => {
        // Set initial state for desktop with rotation
        cardsRef.current.forEach((card, index) => {
          if (card) {
            const rotationY =
              index === 0
                ? 40
                : index === 1
                ? 30
                : index === 2
                ? 0
                : index === 3
                ? -30
                : -40;

            gsap.set(card, {
              rotationY: rotationY,
              y: 150,
              opacity: 0,
              scale: 0.8,
              transformOrigin: "center center",
              transformStyle: "preserve-3d",
            });
          }
        });

        // ScrollTrigger animation for desktop
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top 70%",
          end: "bottom 30%",
          onEnter: () => {
            gsap.to(cardsRef.current, {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.8,
              stagger: {
                amount: 1.2,
                from: "start",
                ease: "power2.out",
              },
              ease: "power3.out",
            });
          },
          onLeave: () => {
            gsap.to(cardsRef.current, {
              y: -50,
              opacity: 0.7,
              scale: 0.95,
              duration: 0.5,
              stagger: 0.05,
              ease: "power2.inOut",
            });
          },
          onEnterBack: () => {
            gsap.to(cardsRef.current, {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.6,
              stagger: 0.1,
              ease: "power2.out",
            });
          },
        });

        // Desktop hover effect (optional)
        cardsRef.current.forEach((card) => {
          if (card) {
            card.addEventListener("mouseenter", function () {
              gsap.to(this, {
                y: -20,
                scale: 1.08,
                duration: 0.4,
                ease: "power2.out",
              });
            });

            card.addEventListener("mouseleave", function () {
              gsap.to(this, {
                y: 0,
                scale: 1,
                duration: 0.4,
                ease: "power2.out",
              });
            });
          }
        });
      });

      // Mobile/Tablet animations - straight cards (no rotation)
      mm.add("(max-width: 1023px)", () => {
        // Set initial state for mobile - NO rotation
        cardsRef.current.forEach((card) => {
          if (card) {
            gsap.set(card, {
              rotationY: 0, // Straight cards
              y: 100,
              opacity: 0,
              scale: 0.9,
              transformOrigin: "center center",
            });
          }
        });

        // ScrollTrigger animation for mobile
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top 75%",
          end: "bottom 25%",
          onEnter: () => {
            gsap.to(cardsRef.current, {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.6,
              stagger: {
                amount: 0.8,
                from: "start",
                ease: "power2.out",
              },
              ease: "power2.out",
            });
          },
          onLeave: () => {
            gsap.to(cardsRef.current, {
              y: -30,
              opacity: 0.8,
              duration: 0.4,
              stagger: 0.03,
            });
          },
          onEnterBack: () => {
            gsap.to(cardsRef.current, {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.5,
              stagger: 0.08,
            });
          },
        });
      });

      // Cleanup function
      return () => {
        mm.revert();
      };
    },
    { scope: sectionRef, dependencies: [] }
  );

  return (
    <section ref={sectionRef} className="home-products-section">
      <div className="products-container">
        <div className="products-title">
          <div className="description-text">
            <p>
              Quality materials combination of
              <br />
              durability and reliability helps
              <br />
              create construction that's as
              <br />
              strong as your vision
            </p>
          </div>
          <h1 className="section-title">OUR PRODUCTS</h1>
        </div>

        <div className="cards-layout">
          {products.map((product, index) => (
            <div
              key={product.id}
              ref={(el) => (cardsRef.current[index] = el)}
              className={`home-product-card ${
                index === 2 ? "center-card" : ""
              }`}
            >
              <div className="card-inner">
                <div className="product-image">
                  <img
                    src={product.image}
                    alt={product.name}
                    onError={(e) => {
                      e.target.src = "";
                    }}
                  />
                </div>
                <div className="product-name-overlay">
                  <h3>{product.name}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
