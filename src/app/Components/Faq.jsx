'use client';
import React, { useState } from 'react';

const faqData = [
  {
    question: "Which is better – Fly Ash Bricks or Red Bricks?",
    answer: "Fly Ash Bricks are stronger, eco-friendly, and absorb less water than traditional red bricks, making them ideal for long-term durability."
  },
  {
    question: "Do you deliver materials outside Kundrathur?",
    answer: "Yes, we deliver across Poonamallee, Porur, Kanchipuram, Mangadu, and nearby Chennai areas with prompt service and on-time delivery."
  },
  {
    question: "What is the size and strength of your Solid Blocks?",
    answer: "We supply 4”, 6”, and 8” solid blocks, each tested for compressive strength suitable for walls, pillars, and foundations."
  },
  {
    question: "Is M-Sand good for concrete and plastering?",
    answer: "Absolutely. M-Sand offers consistent particle size and superior bonding, while P-Sand is perfect for smooth plaster finishes."
  },
  {
    question: "How can I place a bulk order?",
    answer: "Simply fill out the enquiry form or call our team directly — we’ll share an instant quotation with delivery timelines."
  }
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = idx => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id='faq'>
    <div className="faq-container">
      <div className="faq-title">
        <h1>FAQs</h1>
        <p>Answer for your Questions</p>
      </div>
      <div className="faq-list">
        {faqData.slice(0).map((item, idx) => (
          <div className="faq-item" key={idx}>
            <div
              className="faq-list-question"
              onClick={() => handleToggle(idx)}
            >
              {item.question}
              <span className="faq-arrow">
                {openIndex === idx ? '↑' : '↓'}
              </span>
            </div>
            {openIndex === idx && (
              <div className="faq-list-answer">{item.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
    </section>
  );
}
