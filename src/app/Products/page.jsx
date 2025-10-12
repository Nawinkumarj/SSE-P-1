"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Page() {
  const containerRef = useRef(null);
  const sectionsRef = useRef([]);

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
          title: "PAVER BLOCK",
          specs: {
            thickness: "65mm",
            sizes: ["181×121×65MM", "121×121×65MM", "61×121×65MM"],
          },
        },
        {
          id: 2,
          image: "/paver.png",
          title: "PAVER BLOCK",
          specs: {
            thickness: "65mm",
            sizes: ["181×121×65MM", "121×121×65MM", "61×121×65MM"],
          },
        },
        {
          id: 3,
          image: "/paver.png",
          title: "PAVER BLOCK",
          specs: {
            thickness: "65mm",
            sizes: ["181×121×65MM", "121×121×65MM", "61×121×65MM"],
          },
        },
      ],
    },
    {
      id: 2,
      category: "CHALET",
      heroImage: "/chalet-hero.jpg",
      sampleImage: "/chalet.png",
      products: [
        {
          id: 1,
          image: "/chalet.png",
          title: "CHALET BLOCK",
          specs: {
            thickness: "80mm",
            sizes: ["200×150×80MM", "150×150×80MM", "100×150×80MM"],
          },
        },
        {
          id: 2,
          image: "/chalet.png",
          title: "CHALET BLOCK",
          specs: {
            thickness: "80mm",
            sizes: ["200×150×80MM", "150×150×80MM", "100×150×80MM"],
          },
        },
        {
          id: 3,
          image: "/chalet.png",
          title: "CHALET BLOCK",
          specs: {
            thickness: "80mm",
            sizes: ["200×150×80MM", "150×150×80MM", "100×150×80MM"],
          },
        },
      ],
    },
    {
      id: 3,
      category: "COMPOUND WALL",
      heroImage: "/compound-hero.jpg",
      sampleImage: "/compound.png",
      products: [
        {
          id: 1,
          image: "/compound.png",
          title: "COMPOUND WALL BLOCK",
          specs: {
            thickness: "100mm",
            sizes: ["400×200×100MM", "300×200×100MM", "200×200×100MM"],
          },
        },
        {
          id: 2,
          image: "/compound.png",
          title: "COMPOUND WALL BLOCK",
          specs: {
            thickness: "100mm",
            sizes: ["400×200×100MM", "300×200×100MM", "200×200×100MM"],
          },
        },
        {
          id: 3,
          image: "/compound.png",
          title: "COMPOUND WALL BLOCK",
          specs: {
            thickness: "100mm",
            sizes: ["400×200×100MM", "300×200×100MM", "200×200×100MM"],
          },
        },
      ],
    },
    {
      id: 4,
      category: "SOLID BLOCK",
      heroImage: "/solid-hero.jpg",
      sampleImage: "/solid.png",
      products: [
        {
          id: 1,
          image: "/solid.png",
          title: "SOLID BLOCK",
          specs: {
            thickness: "150mm",
            sizes: ["600×200×150MM", "400×200×150MM", "200×200×150MM"],
          },
        },
        {
          id: 2,
          image: "/solid.png",
          title: "SOLID BLOCK",
          specs: {
            thickness: "150mm",
            sizes: ["600×200×150MM", "400×200×150MM", "200×200×150MM"],
          },
        },
        {
          id: 3,
          image: "/solid.png",
          title: "SOLID BLOCK",
          specs: {
            thickness: "150mm",
            sizes: ["600×200×150MM", "400×200×150MM", "200×200×150MM"],
          },
        },
      ],
    },
  ];

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      const sections = sectionsRef.current;

      // Only apply GSAP animations on desktop (min-width: 1024px)
      mm.add("(min-width: 1024px)", () => {
        sections.forEach((section, index) => {
          if (!section) return;

          // Skip the last section - it doesn't need pinning
          if (index === sections.length - 1) return;

          ScrollTrigger.create({
            trigger: section,
            start: "top top",
            end: () => `+=${section.offsetHeight}`,
            pin: true,
            pinSpacing: false,
            scrub: true,
            // markers: true, // Uncomment for debugging
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

      // Mobile and tablet - no GSAP animations, just normal scroll
      mm.add("(max-width: 1023px)", () => {
        // No animations - sections scroll normally
        // GSAP will automatically clean up desktop animations when this matches
      });

      return () => {
        mm.revert();
      };
    },
    { scope: containerRef, dependencies: [] }
  );

  return (
    <div className="products-page" ref={containerRef}>
      <div className="stack-container">
        {productSections.map((section, index) => (
          <section
            key={section.id}
            ref={(el) => (sectionsRef.current[index] = el)}
            className="stack-section"
          >
            {/* Hero Banner */}
            <div className="section-hero">
              <div className="hero-background">
                <Image
                  src={section.heroImage}
                  alt={`${section.category} Background`}
                  fill
                  className="hero-bg-image"
                  priority={index === 0}
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

            {/* Product Grid */}
            <div className="products-section">
              <div className="products-grid">
                {section.products.map((product) => (
                  <div key={product.id} className="product-card">
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

                        <div className="sizes">
                          {product.specs.sizes.map((size, idx) => (
                            <span key={idx} className="size-item">
                              {size}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
