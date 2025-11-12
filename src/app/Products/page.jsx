"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Page() {
  const containerRef = useRef(null);
  const sectionsRef = useRef([]);
  const [circleActionsIdx, setCircleActionsIdx] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingMaterial, setBookingMaterial] = useState("");
  const isTouchDevice =
    typeof window !== "undefined" &&
    ("ontouchstart" in window || navigator.maxTouchPoints);

  const productSections = [
    {
      id: 1,
      category: "PAVER BLOCK",
      heroImage: "/sand.png",
      sampleImage: "/paver.png",
      products: [
        {
          id: 1,
          image: "/paver.png",
          title: "I-Block",
          specs: {
            thickness: "60mm",
            sizes: ["181×121×65MM", "121×121×65MM", "61×121×65MM"],
          },
        },
        {
          id: 2,
          image: "/paver.png",
          title: "Zigzag Paver Block",
          specs: {
            thickness: "60mm/80mm",
            sizes: ["181×121×65MM", "121×121×65MM", "61×121×65MM"],
          },
        },
        // {
        //   id: 3,
        //   image: "/paver.png",
        //   title: "PAVER BLOCK",
        //   specs: {
        //     thickness: "65mm",
        //     sizes: ["181×121×65MM", "121×121×65MM", "61×121×65MM"],
        //   },
        // },
      ],
    },
    {
      id: 2,
      category: "Bricks & Blocks",
      heroImage: "/chalet-hero.jpg",
      sampleImage: "/chalet.png",
      products: [
        {
          id: 1,
          image: "/chalet.png",
          title: "Fly Ash Bricks ",
          specs: {
            thickness: "80mm",
            // sizes: ["200×150×80MM", "150×150×80MM", "100×150×80MM"],
          },
        },
        {
          id: 2,
          image: "/chalet.png",
          title: "Solid Blocks ",
          specs: {
            thickness: "80mm",
            sizes: ["4”, 6”, 8”"],
          },
        },
        // {
        //   id: 3,
        //   image: "/chalet.png",
        //   title: "CHALET BLOCK",
        //   specs: {
        //     thickness: "80mm",
        //     sizes: ["200×150×80MM", "150×150×80MM", "100×150×80MM"],
        //   },
        // },
      ],
    },
    {
      id: 3,
      category: "SAND & AGGREGATES",
      heroImage: "/compound-hero.jpg",
      sampleImage: "/compound.png",
      products: [
        {
          id: 1,
          image: "/compound.png",
          title: "M-Sand",
          specs: {
            thickness: "6mm, 12mm, 20mm Chips",
            // sizes: ["400×200×100MM", "300×200×100MM", "200×200×100MM"],
          },
        },
        {
          id: 2,
          image: "/compound.png",
          title: "P-Sand",
          specs: {
            thickness: "100mm",
            // sizes: ["400×200×100MM", "300×200×100MM", "200×200×100MM"],
          },
        },
        {
          id: 3,
          image: "/compound.png",
          title: "Crusher Dust (Dust / Chips)",
          specs: {
            thickness: "100mm",
            // sizes: ["400×200×100MM", "300×200×100MM", "200×200×100MM"],
          },
        },
      ],
    },
    {
      id: 4,
      category: " Stones & Drainage",
      heroImage: "/solid-hero.jpg",
      sampleImage: "/solid.png",
      products: [
        {
          id: 1,
          image: "/solid.png",
          title: "Kraib Stone ",
          specs: {
            thickness: "125mm / 100mm",
            // sizes: ["600×200×150MM", "400×200×150MM", "200×200×150MM"],
          },
        },
        {
          id: 2,
          image: "/solid.png",
          title: "Sarucer Drain ",
          specs: {
            thickness: "80mm",
            // sizes: ["600×200×150MM", "400×200×150MM", "200×200×150MM"],
          },
        },
        // {
        //   id: 3,
        //   image: "/solid.png",
        //   title: "SOLID BLOCK",
        //   specs: {
        //     thickness: "150mm",
        //     sizes: ["600×200×150MM", "400×200×150MM", "200×200×150MM"],
        //   },
        // },
      ],
    },
  ];
  // ---- GSAP Pinning ----
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      const sections = sectionsRef.current;
      mm.add("(min-width: 1024px)", () => {
        sections.forEach((section, index) => {
          if (!section) return;
          if (index === sections.length - 1) return;
          ScrollTrigger.create({
            trigger: section,
            start: "top top",
            end: () => `+=${section.offsetHeight}`,
            pin: true,
            pinSpacing: false,
            scrub: true,
          });
          gsap.to(section, {
            scale: 0.9,
            opacity: 1,
            scrollTrigger: {
              trigger: sections[index + 1],
              start: "top bottom",
              end: "top top",
              scrub: true,
            },
          });
        });
      });
      mm.add("(max-width: 1023px)", () => {});
      return () => {
        mm.revert();
      };
    },
    { scope: containerRef, dependencies: [] }
  );

  function handleCircleClick(key, e) {
    e.stopPropagation();
    setCircleActionsIdx(circleActionsIdx === key ? null : key);
  }
  function handleBook(material, e) {
    e.stopPropagation();
    setBookingMaterial(material);
    setShowBookingForm(true);
    setCircleActionsIdx(null);
  }
  function closeForm() {
    setShowBookingForm(false);
    setBookingMaterial("");
  }

  return (
    <div className="products-page" ref={containerRef}>
      <div className="stack-container">
        {productSections.map((section, sectionIdx) => (
          <section
            key={section.id}
            ref={(el) => (sectionsRef.current[sectionIdx] = el)}
            className="stack-section"
          >
            <div className="section-hero">
              <div className="hero-background">
                <Image
                  src={section.heroImage}
                  alt={`${section.category} Background`}
                  fill
                  className="hero-bg-image"
                  priority={sectionIdx === 0}
                />
              </div>
              <div className="product-page-content">
                <div className="hero-flex">
                  <div className="hero-sample-card">
                    <Image
                      src={section.sampleImage}
                      alt={`${section.category} Sample`}
                      width={300}
                      height={200}
                      className="sample-image"
                    />
                  </div>
                  <div className="hero-text">
                    <p className="category-label">{section.category}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="products-section">
              <div className="products-grid">
                {section.products.map((product, idx) => {
                  const cardKey = `${section.id}-${idx}`;
                  return (
                    <div
                      key={product.id}
                      className="product-card"
                      style={{ position: "relative" }}
                    >
                      <div className="product-image-wrapper">
                        <Image
                          src={product.image}
                          alt={product.title}
                          fill
                          className="product-image"
                        />
                      </div>
                      <div className="product-details">
                        <h2 className="product-title">{product.title}</h2>
                        <div className="product-specs">
                          <p className="thickness">
                            Thickness : {product.specs.thickness}
                          </p>
                          {product?.specs?.sizes?.length > 0 && (
                            <div className="sizes">
                              {product.specs.sizes.map((size, i) => (
                                <span key={i} className="size-item">
                                  {size}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                      <div
                        className="product-card-circle-icon"
                        onClick={(e) => handleCircleClick(cardKey, e)}
                      >
                        <svg
                          width="30"
                          height="30"
                          viewBox="0 0 40 40"
                          fill="none"
                        >
                          <circle
                            cx="20"
                            cy="20"
                            r="18"
                            fill="#e4f0e8"
                            stroke="#29ae65"
                            strokeWidth="2"
                          />
                          <path
                            d="M20 12v8m0 8h0"
                            stroke="#29ae65"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                          <circle cx="20" cy="28" r="1.5" fill="#29ae65" />
                        </svg>
                        {circleActionsIdx === cardKey && (
                          <div
                            className="circle-actions-popup"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <button
                              className="circle-popup-btn"
                              onClick={() => window.open("tel:+919999999999")}
                            >
                              Call
                            </button>
                            <button
                              className="circle-popup-btn"
                              onClick={(e) => handleBook(product.title, e)}
                            >
                              Book
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        ))}
      </div>
      {/* Booking Form Modal */}
      {showBookingForm && (
        <div className="product-modal-overlay" onClick={closeForm}>
          <div className="product-modal" onClick={(e) => e.stopPropagation()}>
            <h3 className="modal-title">Book Material</h3>
            <form className="booking-form">
              <input
                type="text"
                placeholder="Your Name"
                required
                className="booking-input"
              />
              <input
                type="text"
                placeholder="Company Name"
                required
                className="booking-input"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                required
                className="booking-input"
              />
              <input
                type="email"
                placeholder="Email Address"
                required
                className="booking-input"
              />
              <input
                type="text"
                value={bookingMaterial}
                readOnly
                className="booking-input"
              />
              <input
                type="text"
                placeholder="Quantity (e.g., 1000 bricks)"
                required
                className="booking-input"
              />
              <button type="submit" className="booking-submit-btn">
                Submit
              </button>
            </form>
            <button className="modal-close-btn" onClick={closeForm}>
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
