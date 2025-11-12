import React from 'react';

export default function CTA() {
  const phoneNumber = "+91 98765 43210"; // Replace with your phone number

  const handlePhoneClick = () => {
    window.location.href = `tel:${phoneNumber.replace(/\s/g, '')}`;
  };

  return (
    <div className="cta-container">
      <div className="cta-wrapper">
        {/* Left side - PNG Image */}
        <div className="image-section">
          <div className="image-wrapper">
            <img 
              src="/cta.png"
              alt="" 
              className="cta-image"
            />
          </div>
        </div>

        {/* Right side - Content */}
        <div className="content-section">
          <div className="content-wrapper">
            <h1 className="main-heading">
               Let’s Build Something Strong Together
            </h1>
            <p className="description">
                Whether you’re constructing your dream home or a commercial project, we’re here to deliver top
grade materials on time, every time.
            </p>
            <button className="phone-button" onClick={handlePhoneClick}>
              <span className="button-text">{phoneNumber}</span>
              <div className="button-icon">
                <svg 
                  className="phone-icon" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
