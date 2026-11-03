import React, { useState } from 'react';

export const ClubsSection: React.FC = () => {
  const [activeItem, setActiveItem] = useState<string | null>(null);

  const events = [
    {
      id: 'openmrs',
      title: 'OpenMRS Booth – Hacktoberfest',
      details: 'Showcasing open source healthcare software contributions, guiding newcomers through pull requests, and mentoring open source participants during Hacktoberfest.',
      date: 'October',
    },
    {
      id: 'sdc',
      title: 'Student Development Club',
      details: 'Active member organizing technical workshops, peer hackathons, and collaborative programming sessions for student developers.',
      date: 'Ongoing',
    },
    {
      id: 'more',
      title: 'More events...',
      details: 'Participating in university tech symposiums, code sprints, and community build days.',
      date: '2025 – 2026',
    },
  ];

  return (
    <div className="flex items-center space-x-3 sm:space-x-4 font-sans py-1">
      {/* Left: Pixel Art Saturn Planet */}
      <div className="flex-shrink-0 flex items-center justify-center pl-1">
        <img
          src="/assets/window_planet.png"
          alt="Planet"
          className="w-14 h-14 sm:w-16 sm:h-16 object-contain image-rendering-pixelated drop-shadow-[0_2px_4px_rgba(20,40,75,0.15)] animate-float-3"
        />
      </div>

      {/* Right: Star Bullet Points */}
      <div className="flex-1 min-w-0 space-y-1.5">
        {events.map((evt) => (
          <div key={evt.id} className="group">
            <button
              onClick={() => setActiveItem(activeItem === evt.id ? null : evt.id)}
              className="flex items-center space-x-2 text-left w-full hover:text-[#1d5ab0] transition-colors"
            >
              <span className="text-[#3876cd] text-xs">☆</span>
              <span className="text-[#20314a] font-medium text-[11px] sm:text-xs truncate group-hover:underline">
                {evt.title}
              </span>
            </button>

            {/* Expandable details */}
            {activeItem === evt.id && (
              <div className="mt-1 ml-4 p-2 bg-[#edf3ff] rounded border border-[#c5d8f7] text-[10.5px] text-[#334766] animate-in fade-in duration-150">
                <p className="leading-relaxed">{evt.details}</p>
                <span className="inline-block mt-1 text-[9.5px] font-semibold text-[#2563eb]">
                  Timeline: {evt.date}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
