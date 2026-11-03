import React, { useState } from 'react';
import { X, ZoomIn } from 'lucide-react';

interface DesignItem {
  id: string;
  title: string;
  category: string;
  imageSrc: string;
  description: string;
}

export const DesignsSection: React.FC = () => {
  const [selectedDesign, setSelectedDesign] = useState<DesignItem | null>(null);

  const designs: DesignItem[] = [
    {
      id: 'shirt',
      title: 'Starlight Navy Tee',
      category: 'Merchandise & Apparel',
      imageSrc: '/assets/card_shirt.png',
      description: 'Custom silkscreen tee featuring retro celestial star embroidery & typography.',
    },
    {
      id: 'lonelight',
      title: 'LONELIGHT',
      category: 'Album / Poster Concept',
      imageSrc: '/assets/card_lonelight.png',
      description: 'Y2K inspired cosmic poster design featuring a glowing star compass & typography.',
    },
    {
      id: 'checkered',
      title: 'Checkered Star',
      category: 'Graphic Art & Print',
      imageSrc: '/assets/card_checkered.png',
      description: 'Geometric checkered star pattern with warm vintage halftone print texture.',
    },
  ];

  return (
    <div className="font-sans">
      {/* 3 Preview Thumbnails */}
      <div className="grid grid-cols-3 gap-2 py-0.5">
        {designs.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedDesign(item)}
            className="group relative aspect-square rounded-lg overflow-hidden border border-[#bccde7] bg-[#f0f4fa] hover:border-[#3876cd] cursor-pointer transition-all hover:scale-105 shadow-sm"
          >
            <img
              src={item.imageSrc}
              alt={item.title}
              className="w-full h-full object-cover object-center group-hover:brightness-105 transition-all"
            />
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white">
              <ZoomIn className="w-4 h-4" />
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedDesign && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setSelectedDesign(null)}
        >
          <div
            className="bg-[#faf8f5] border-[2px] border-[#253753] rounded-2xl max-w-sm w-full overflow-hidden shadow-2xl animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-[#ccd8f4] border-b border-[#253753] px-3.5 py-2 flex items-center justify-between">
              <span className="font-bold text-xs text-[#20314a]">
                {selectedDesign.title}
              </span>
              <button
                onClick={() => setSelectedDesign(null)}
                className="w-5 h-5 flex items-center justify-center hover:bg-red-500 hover:text-white rounded text-xs transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-4 space-y-3">
              <div className="w-full aspect-square bg-[#eceff6] rounded-xl overflow-hidden border border-[#cbd8ed] flex items-center justify-center">
                <img
                  src={selectedDesign.imageSrc}
                  alt={selectedDesign.title}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#3b75c8] bg-[#e3ecfb] px-2 py-0.5 rounded-full">
                  {selectedDesign.category}
                </span>
                <p className="text-xs text-[#354862] mt-2 leading-relaxed">
                  {selectedDesign.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
