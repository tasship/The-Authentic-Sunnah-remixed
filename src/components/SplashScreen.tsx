import React, { useEffect, useState } from 'react';

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const fadeTimer = window.setTimeout(() => setFading(true), 1200);
    const doneTimer = window.setTimeout(() => onComplete(), 1650);
    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(doneTimer);
    };
  }, [onComplete]);

  const handleDismiss = () => {
    setFading(true);
    window.setTimeout(onComplete, 250);
  };

  return (
    <div
      onClick={handleDismiss}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') handleDismiss();
      }}
      aria-label="Enter The Authentic Sunnah"
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#021009] px-6 transition-opacity duration-400 cursor-pointer ${
        fading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="relative flex flex-col items-center max-w-xs w-full">
        <div className="relative w-56 sm:w-64 aspect-[9/14] rounded-3xl overflow-hidden border border-[#D4AF37]/40 shadow-[0_0_60px_rgba(212,175,55,0.18)]">
          <img
            src="/assets/aistudio/tas_logo_b0f8b87c.jpeg"
            alt="The Authentic Sunnah Official Emblem"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center"
          />
        </div>
        <p className="mt-6 text-xs tracking-[0.22em] uppercase text-[#D4AF37]/80 font-medium">
          Tap anywhere to enter
        </p>
      </div>
    </div>
  );
};
