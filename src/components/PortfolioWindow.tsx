import React, { useState, useRef, useEffect } from 'react';
import { Minus, X } from 'lucide-react';

interface PortfolioWindowProps {
  id: string;
  title: string;
  icon?: React.ReactNode;
  iconImage?: string;
  isOpen: boolean;
  onClose: () => void;
  onFocus: () => void;
  zIndex: number;
  initialPosition: { x: number; y: number }; // percentage or pixels
  width?: string;
  height?: string;
  children: React.ReactNode;
}

export const PortfolioWindow: React.FC<PortfolioWindowProps> = ({
  id,
  title,
  icon,
  iconImage,
  isOpen,
  onClose,
  onFocus,
  zIndex,
  initialPosition,
  width = 'w-[280px] sm:w-[320px] md:w-[350px]',
  height = 'auto',
  children,
}) => {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const dragRef = useRef<{ startX: number; startY: number; posX: number; posY: number }>({
    startX: 0,
    startY: 0,
    posX: 0,
    posY: 0,
  });

  const windowRef = useRef<HTMLDivElement>(null);

  // Sync initialPosition if changed
  useEffect(() => {
    setPosition(initialPosition);
  }, [initialPosition.x, initialPosition.y]);

  const handleMouseDown = (e: React.MouseEvent) => {
    onFocus();
    setIsDragging(true);
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      posX: position.x,
      posY: position.y,
    };
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - dragRef.current.startX;
      const dy = e.clientY - dragRef.current.startY;
      setPosition({
        x: dragRef.current.posX + dx,
        y: dragRef.current.posY + dy,
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  if (!isOpen) return null;

  return (
    <div
      ref={windowRef}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        zIndex,
      }}
      onClick={onFocus}
      className={`
        absolute select-none transition-shadow duration-150
        ${width}
        shadow-[0_12px_28px_rgba(20,40,75,0.28)] rounded-xl border-[1.5px] border-[#253753]
        bg-[#fcfbfa] overflow-hidden
        animate-in fade-in zoom-in-95 duration-150
      `}
    >
      {/* Title Bar */}
      <div
        onMouseDown={handleMouseDown}
        className="h-8 bg-[#ccd8f4] border-b-[1.5px] border-[#253753] px-3 flex items-center justify-between cursor-grab active:cursor-grabbing select-none"
      >
        {/* Left: Icon + Title */}
        <div className="flex items-center space-x-2 truncate">
          {iconImage ? (
            <img src={iconImage} alt="" className="w-4 h-4 object-contain inline-block" />
          ) : icon ? (
            <span className="text-[#253753]">{icon}</span>
          ) : null}
          <span className="text-[#253753] font-bold text-xs tracking-tight truncate">
            {title}
          </span>
        </div>

        {/* Right: Window Controls */}
        <div className="flex items-center space-x-2 text-[#253753]">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsMinimized(!isMinimized);
            }}
            title={isMinimized ? "Expand" : "Minimize"}
            className="w-4 h-4 flex items-center justify-center hover:bg-black/10 rounded transition-colors text-sm font-bold"
          >
            <Minus className="w-3.5 h-3.5" strokeWidth={2.5} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            title="Close"
            className="w-4 h-4 flex items-center justify-center hover:bg-red-500 hover:text-white rounded transition-colors text-sm font-bold"
          >
            <X className="w-3.5 h-3.5" strokeWidth={2.5} />
          </button>
        </div>
      </div>

      {/* Window Body */}
      {!isMinimized && (
        <div className={`p-3 bg-[#faf8f5] text-[#253753] max-h-[75vh] overflow-y-auto retro-scrollbar`}>
          {children}
        </div>
      )}
    </div>
  );
};
