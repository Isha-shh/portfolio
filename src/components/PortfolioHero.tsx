import React from 'react';

export const PortfolioHero: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center select-none z-10">
      {/* Decorative Sparkle - Top Left */}
      <div className="absolute left-[26%] top-[14%] text-white animate-pulse">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
          <path d="M12 0 L14.5 9.5 L24 12 L14.5 14.5 L12 24 L9.5 14.5 L0 12 L9.5 9.5 Z" />
        </svg>
      </div>

      {/* Decorative Sparkle - Top Right */}
      <div className="absolute left-[70.5%] top-[12.5%] text-white animate-pulse" style={{ animationDelay: '1s' }}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
          <path d="M12 0 L14.5 9.5 L24 12 L14.5 14.5 L12 24 L9.5 14.5 L0 12 L9.5 9.5 Z" />
        </svg>
      </div>

      {/* Retro Pixel Cursor Decor near Center-Right */}
      <div className="absolute left-[68.8%] top-[53.8%] z-20 hidden md:block">
        <svg width="20" height="24" viewBox="0 0 16 20" fill="none">
          <path
            d="M1 1V17L5 13L8 19L11 17.5L8 11.5L13 11.5L1 1Z"
            fill="white"
            stroke="#1b2a47"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Central Title Container */}
      <div className="relative flex flex-col items-center justify-center -translate-y-6 sm:-translate-y-8">
        {/* Elegant White Calligraphic Cursive Flourish Overlay */}
        <div className="absolute -top-16 sm:-top-20 md:-top-24 left-1/2 -translate-x-1/2 w-[125%] max-w-[850px] pointer-events-none z-10">
          <svg
            viewBox="0 0 800 360"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto overflow-visible"
          >
            {/* The Grande Cursive Flourish "P" & Swooping Cosmic Ribbon */}
            <path
              d="M 280 40 
                 C 220 20, 150 45, 120 100 
                 C 90 155, 120 220, 180 230 
                 C 240 240, 310 180, 320 110 
                 C 330 40, 260 15, 200 30 
                 C 140 45, 70 110, 50 180 
                 C 30 250, 80 300, 160 305 
                 C 260 310, 420 270, 560 235 
                 C 680 205, 780 180, 830 150"
              stroke="white"
              strokeWidth="2.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="opacity-95"
            />
            {/* Inner cursive loop crossing over the P */}
            <path
              d="M 170 120 
                 C 210 80, 270 70, 320 100 
                 C 360 125, 360 170, 310 200 
                 C 250 235, 170 210, 140 160"
              stroke="white"
              strokeWidth="2.4"
              strokeLinecap="round"
              className="opacity-90"
            />
            {/* Swooping orbit under the title and 2026 badge */}
            <path
              d="M 120 220 
                 C 200 280, 380 320, 520 295 
                 C 660 270, 770 220, 820 160"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="1 0"
              className="opacity-90"
            />
          </svg>
        </div>

        {/* The Word "Portfolio" */}
        <h1 className="text-white font-extrabold tracking-[-0.04em] text-[72px] sm:text-[105px] md:text-[136px] lg:text-[156px] leading-none select-none drop-shadow-[0_4px_24px_rgba(30,70,150,0.32)] font-['Outfit','Montserrat',sans-serif]">
          Portfolio
        </h1>

        {/* "2026" Translucent Dark Navy Badge */}
        <div className="mt-[-8px] sm:mt-[-14px] md:mt-[-18px] z-20">
          <div className="bg-[#243756]/90 backdrop-blur-sm text-white px-4 sm:px-5 py-1 sm:py-1.5 rounded-lg border border-[#3b547d]/60 shadow-[0_4px_10px_rgba(15,25,45,0.3)]">
            <span className="font-semibold text-xs sm:text-sm md:text-[15px] tracking-wider text-slate-100">
              2026
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
