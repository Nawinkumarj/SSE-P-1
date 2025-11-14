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
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const productSections = [
    {
      id: 1,
      category: "PAVER BLOCK",
      heroImage: "/sand.png",
      sampleImage: "/paver.png",
      products: [
        {
          id: 1,
          image: "/I-Block.jpg",
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
          image: "/FlyashBricks.jpg",
          title: "Fly Ash Bricks ",
          specs: {
            thickness: "80mm",
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
          image: "/m-sand.jpg",
          title: "M-Sand",
          specs: {
            thickness: "6mm, 12mm, 20mm Chips",
          },
        },
        {
          id: 2,
          image: "/p-sand.jpg",
          title: "P-Sand",
          specs: {
            thickness: "100mm",
          },
        },
        {
          id: 3,
          image: "/crusherDust.jpg",
          title: "Crusher Dust (Dust / Chips)",
          specs: {
            thickness: "100mm",
          },
        },
      ],
    },
    {
      id: 4,
      category: "Stones & Drainage",
      heroImage: "/solid-hero.jpg",
      sampleImage: "/solid.png",
      products: [
        {
          id: 1,
          image: "/kerb-stone.jpg",
          title: "Kraib Stone ",
          specs: {
            thickness: "125mm / 100mm",
          },
        },
        {
          id: 2,
          image: "/solid.png",
          title: "Sarucer Drain ",
          specs: {
            thickness: "80mm",
          },
        },
      ],
    },
  ];

  // Filter products based on search and selected category
  const filteredSections = productSections
    .filter((section) =>
      selectedCategoryId ? section.id === selectedCategoryId : true
    )
    .map((section) => ({
      ...section,
      products: section.products.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    }))
    .filter((section) => section.products.length > 0);

  // GSAP Pinning - depends on filteredSections for cleanup and re-init
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      const sections = sectionsRef.current;

      // Kill all existing ScrollTriggers before creating new ones
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

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
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    },
    { scope: containerRef, dependencies: [filteredSections] }
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
      <div
        className="top-bar"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0.5rem 1rem",
          background: "#f5f5f5",
          flexWrap: "wrap",
        }}
      >
        {/* Category List Left */}
        <div
          className="category-list"
          style={{
            display: "flex",
            gap: "1rem",
            overflowX: "auto",
            flexWrap: "wrap",
            flex: "1 1 auto",
            minWidth: "200px",
          }}
        >
          {productSections.map((section) => (
            <button
              key={section.id}
              onClick={() =>
                setSelectedCategoryId(
                  selectedCategoryId === section.id ? null : section.id
                )
              }
              style={{
                padding: "0.5rem 1rem",
                borderRadius: "20px",
                border:
                  selectedCategoryId === section.id
                    ? "2px solid #29ae65"
                    : "1px solid #ccc",
                background:
                  selectedCategoryId === section.id ? "#d4f0dc" : "white",
                cursor: "pointer",
                whiteSpace: "nowrap",
                fontWeight: selectedCategoryId === section.id ? "bold" : "normal",
              }}
            >
              {section.category}
            </button>
          ))}
        </div>

        {/* Search Bar Right */}
        <div className="search-bar" style={{ flex: "0 0 250px", marginTop: "0.5rem" }}>
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: "100%",
              padding: "0.5rem 1rem",
              borderRadius: "20px",
              border: "1px solid #ccc",
              fontSize: "1rem",
            }}
          />
        </div>
      </div>

      <div className="stack-container" key={filteredSections.map((s) => s.id).join("-")}>
        {filteredSections.length === 0 && (
          <p style={{ padding: "2rem", textAlign: "center", color: "#666" }}>No products found.</p>
        )}
        {filteredSections.map((section, sectionIdx) => (
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
                          <p className="thickness">Thickness : {product.specs.thickness}</p>
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
                        <svg width="30" height="30" viewBox="0 0 40 40" fill="none">
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
              <input type="text" placeholder="Your Name" required className="booking-input" />
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
              <button type="submit" className="booking-submit-btn">Submit</button>
            </form>
            <button className="modal-close-btn" onClick={closeForm}>×</button>
          </div>
        </div>
      )}
    </div>
  );
}