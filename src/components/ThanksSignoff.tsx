import React, { useState } from 'react';

export const ThanksSignoff: React.FC = () => {
  const [showHeartBurst, setShowHeartBurst] = useState(false);

  const handleClick = () => {
    setShowHeartBurst(true);
    setTimeout(() => setShowHeartBurst(false), 2200);
  };

  return (
    <div className="absolute right-4 sm:right-6 bottom-3 sm:bottom-4 z-30 select-none">
      <div
        onClick={handleClick}
        className="cursor-pointer group flex flex-col items-end transition-transform hover:scale-105 active:scale-95"
        title="Click for a sparkle!"
      >
        {/* Handwritten text */}
        <div className="text-white text-base sm:text-lg md:text-xl font-['Caveat',cursive] tracking-wide flex items-center space-x-1.5 drop-shadow-[0_2px_4px_rgba(20,40,75,0.3)]">
          <span>thanks for visiting!</span>
          <span className="text-sm sm:text-base group-hover:scale-125 transition-transform inline-block">♡</span>
        </div>

        {/* Elegant Curved White Underline Swoop */}
        <div className="w-full max-w-[170px] -mt-1 pointer-events-none">
          <svg viewBox="0 0 160 16" fill="none" className="w-full h-auto overflow-visible">
            <path
              d="M 5 12 C 40 4, 110 3, 155 11 C 158 11.5, 159 13, 157 14 C 155 14, 150 12, 140 11.5"
              stroke="white"
              strokeWidth="1.6"
              strokeLinecap="round"
              className="drop-shadow-[0_1px_2px_rgba(20,40,75,0.2)]"
            />
          </svg>
        </div>

        {/* Playful Floating Hearts & Sparkles when clicked */}
        {showHeartBurst && (
          <div className="absolute -top-10 right-4 pointer-events-none flex space-x-2 animate-bounce">
            <span className="text-pink-300 text-lg">✨</span>
            <span className="text-white text-xl">♡</span>
            <span className="text-amber-200 text-lg">⭐</span>
          </div>
        )}
      </div>
    </div>
  );
};
