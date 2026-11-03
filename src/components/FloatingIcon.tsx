import React from 'react';

interface FloatingIconProps {
  id: string;
  name: string;
  iconSrc: string;
  alt: string;
  left: string;
  top: string;
  floatAnimationClass?: string;
  labelPosition?: 'bottom' | 'bottom-right' | 'right';
  onClick: () => void;
  isOpen?: boolean;
}

export const FloatingIcon: React.FC<FloatingIconProps> = ({
  id,
  name,
  iconSrc,
  alt,
  left,
  top,
  floatAnimationClass = 'animate-float-1',
  labelPosition = 'bottom',
  onClick,
  isOpen = false,
}) => {
  return (
    <div
      style={{ left, top }}
      className={`absolute z-20 ${floatAnimationClass} cursor-pointer group select-none transition-transform duration-200`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      aria-label={`Open ${name}`}
    >
      <div className="relative flex flex-col items-center">
        {/* Main Illustrated Icon */}
        <div className="relative transform transition-all duration-200 group-hover:scale-110 group-active:scale-95 filter drop-shadow-[0_4px_8px_rgba(20,40,75,0.22)]">
          <img
            src={iconSrc}
            alt={alt}
            className="w-14 h-14 sm:w-16 sm:h-16 md:w-[70px] md:h-[70px] object-contain pointer-events-none image-rendering-pixelated"
            draggable={false}
          />
        </div>

        {/* Cream Rounded Pill Label */}
        <div
          className={`
            bg-[#fffdf5] text-[#24354f] border-[1.5px] border-[#24354f] 
            px-3 py-0.5 rounded-full text-[11px] sm:text-xs font-semibold 
            tracking-tight whitespace-nowrap shadow-[0_2px_4px_rgba(20,40,75,0.18)]
            group-hover:bg-[#fff9e6] group-hover:border-[#14233c] 
            transition-all duration-150 transform
            ${isOpen ? 'ring-2 ring-blue-400 ring-offset-1 font-bold' : ''}
            ${labelPosition === 'right' ? 'absolute left-full ml-1.5 top-1/2 -translate-y-1/2' : ''}
            ${labelPosition === 'bottom-right' ? 'absolute left-1/2 top-full -mt-2 ml-1' : ''}
            ${labelPosition === 'bottom' ? 'mt-1' : ''}
          `}
        >
          {name}
        </div>
      </div>
    </div>
  );
};
