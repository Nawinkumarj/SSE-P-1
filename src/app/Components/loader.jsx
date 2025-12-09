"use client"
import { useEffect, useState } from 'react';

export default function Loader({ onLoaded }) {
  const [progress, setProgress] = useState(0);
  const [animate, setAnimate] = useState(false);
  const [hide, setHide] = useState(false);

  useEffect(() => {
    // Increment the progress percentage smoothly over 3 seconds
    let counter = 0;
    const interval = setInterval(() => {
      counter += 1;
      setProgress(counter);
      if (counter >= 100) clearInterval(interval);
    }, 30);

    // Start the logo animation after 1.5 seconds
    const timer1 = setTimeout(() => setAnimate(true), 1500);
    // Hide the loader after 3 seconds (when progress reaches 100%)
    const timer2 = setTimeout(() => {
      setHide(true);
      if(onLoaded) onLoaded();  // Notify parent to show main content if needed
    }, 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onLoaded]);

  if (hide) return null;

  return (
    <div className="loader-wrapper">
  <div className={`loader-content ${animate ? 'animate' : ''}`}>
    <img src="/logo.png" alt="Logo" className="loader-logo" />
    <div className="progress">{progress}%</div>
  </div>
</div>

  );
}
