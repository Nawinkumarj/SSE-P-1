"use client";
import React, { useRef, useState, useLayoutEffect } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FeaturedProduct from "../Components/featured";

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
      heroImage: "/blockbg.webp",
      sampleImage: "/PaverBlock.jpeg",
      sectionId: "paver-block",
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
          image: "/ZigZag.jpg",
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
      heroImage: "/BricksBlocks.jpg",
      sampleImage: "/BricksBlocks.jpg",
      sectionId: "bricks-blocks",
      products: [
        {
          id: 1,
          image: "/FlyashBricks1.jpg",
          title: "Fly Ash Bricks ",
          specs: {
            thickness: "80mm",
          },
        },
        {
          id: 2,
          image: "/solidBlock.jpg",
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
      heroImage: "/sand-aggre.jpg",
      sampleImage: "/sand-aggre.jpg",
      sectionId: "sand-aggregates",
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
      heroImage: "/stone-drain.jpg",
      sampleImage: "/stone-drain.jpg",
      sectionId: "stones-drainage",
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
          image: "/saurcerDrain.jpg",
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

  useLayoutEffect(() => {
    sectionsRef.current.length = filteredSections.length;
  }, [filteredSections]);

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
          width: "90%",
          margin: "20px auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0.5rem 1rem",
          flexWrap: "wrap",
        }}
      >
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
                borderRadius: "10px",
                boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
                border:
                  selectedCategoryId === section.id
                    ? "2px solid var(--primary)"
                    : "1px solid #ccc",
                background:
                  selectedCategoryId === section.id
                    ? "var(--primary)"
                    : "white",
                color: selectedCategoryId === section.id ? "white" : "black",
                cursor: "pointer",
                whiteSpace: "nowrap",
                fontWeight:
                  selectedCategoryId === section.id ? "bold" : "normal",
              }}
            >
              {section.category}
            </button>
          ))}
        </div>
        {/* Search Bar Right */}
        <div
          className="search-bar"
          style={{ flex: "0 0 250px", marginTop: "0.5rem" }}
        >
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
      <div
        className="stack-container"
        key={filteredSections.map((s) => s.id).join("-")}
      >
        {filteredSections.length === 0 && (
          <p style={{ padding: "2rem", textAlign: "center", color: "#666" }}>
            No products found.
          </p>
        )}
        {filteredSections.map((section, sectionIdx) => (
          <section
            key={section.id}
            ref={(el) => (sectionsRef.current[sectionIdx] = el)}
            id={section.sectionId}
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
                  const isFeatured =
                    product.title.trim().toLowerCase() === "fly ash bricks";
                  return (
                    <div
                      key={product.id}
                      className="product-card"
                      style={{ position: "relative" }}
                    >
                      {/* Featured Badge */}
                      {isFeatured && (
                        <span className="featured-badge">Featured</span>
                      )}
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
                          width="25"
                          height="25"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#29ae65"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.78 19.78 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.78 19.78 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13 1.21.3 2.4.54 3.56a2 2 0 0 1-.45 1.95L8.09 10.91a16 16 0 0 0 6 6l1.68-1.68a2 2 0 0 1 1.95-.45c1.16.24 2.35.41 3.56.54A2 2 0 0 1 22 16.92z" />
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
        {/* <FeaturedProduct /> */}
      </div>
      {/* Booking Form Modal */}
      {showBookingForm && (
  <div className="product-modal-overlay" onClick={closeForm}>
    <div className="product-modal new-form" onClick={(e) => e.stopPropagation()}>
      <button className="modal-close-btn" onClick={closeForm}>
        ×
      </button>

      <div className="form-header">
        <h2>
          Take Action Now <br />
          <span className="highlight">Book Your Material!</span>
        </h2>
        <p>Fill out the form below, and we’ll get back to you soon!</p>
      </div>

      <form className="booking-form-grid">
        <div className="form-row">
          <input type="text" placeholder="Full Name" required />
          <input type="email" placeholder="Email" required />
        </div>
        <div className="form-row">
          <input type="tel" placeholder="Phone Number" required />
          <input type="text" placeholder="Pin code (e.g., 689124)" required />
        </div>
        <div className="form-row single">
          <input
            type="text"
            value={bookingMaterial}
            readOnly
            placeholder="Material"
          />
        </div>
        <div className="form-row single">
          <input
            type="text"
            placeholder="Quantity (e.g., 1000 bricks)"
            required
          />
        </div>

        <p className="note">
          <strong>NOTE:</strong> Our team will contact you to confirm your booking
          and provide details shortly.
        </p>

        <button type="submit" className="next-btn">
          Book
        </button>
      </form>
    </div>
  </div>
)}
    </div>
  );
}
