import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react'; // Add this if you installed `@gsap/react` (recommended)

gsap.registerPlugin(ScrollTrigger);

const LocationSVG = () => (
  <svg height="20" width="20" viewBox="0 0 20 20" fill="#ef5350" style={{ marginRight: 8, verticalAlign: "middle" }}>
    <circle cx="10" cy="10" r="8" fill="#ef5350" />
    <circle cx="10" cy="10" r="3" fill="#fff" />
  </svg>
);

const LOCATIONS = [
  "Kundathur",
  "Porur",
  "Kancheepuram",
  "Mangadu",
  "Poonamallee"
];

export default function Serving() {
  const imgRef = useRef();
  const gridRef = useRef();
  const paraRef = useRef();

  useGSAP(() => {
    // Animate image from left
    gsap.from(imgRef.current, {
      x: -80,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: imgRef.current,
        start: "top 80%",
      }
    });

    // Animate grid items staggered from bottom
    gsap.from(gridRef.current.children, {
      y: 50,
      opacity: 0,
      stagger: 0.15,
      duration: 0.7,
      ease: "power2.out",
      scrollTrigger: {
        trigger: gridRef.current,
        start: "top 85%",
      }
    });

    // Animate paragraph from bottom
    gsap.from(paraRef.current, {
      y: 30,
      opacity: 0,
      duration: 1.1,
      scrollTrigger: {
        trigger: paraRef.current,
        start: "top 95%",
      }
    });
  }, []);

  return (
    <div className="serving-container">
      <h2 className="serving-heading">Serving areas</h2>
      <div className="serving-content">
        <div className="serving-image-card">
          <img
            src="maps.png"
            alt="Serving Map"
            className="serving-image"
            ref={imgRef}
          />
        </div>
        <div className="serving-details">
          <div className="serving-grid" ref={gridRef}>
            {LOCATIONS.map((loc) => (
              <div key={loc} className="serving-grid-item">
                <LocationSVG />
                <span className="location-name">{loc}</span>
              </div>
            ))}
          </div>
          <p className="serving-para" ref={paraRef}>
            Looking for bricks, M-Sand, or Paver Blocks in Kundrathur? We supply high-quality materials with on-time delivery and trusted service since 2009
          </p>
        </div>
      </div>
    </div>
  );
}
