import React, { useState } from 'react';

export const EducationSection: React.FC = () => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="font-sans">
      <div
        onClick={() => setShowDetails(!showDetails)}
        className="flex items-center divide-x divide-[#c7d5ea] py-1 cursor-pointer group"
      >
        {/* Left: Institution Logo & Name */}
        <div className="flex items-center space-x-2.5 pr-4 flex-1">
          {/* Stylized N Logo */}
          <div className="w-8 h-8 rounded-md bg-[#1f3352] flex items-center justify-center text-white font-extrabold text-lg tracking-tight font-heading shadow-xs group-hover:scale-105 transition-transform">
            N
          </div>
          <div>
            <div className="font-bold text-[#1f3352] text-xs leading-tight">
              Newton School
            </div>
            <div className="text-[10px] text-[#465b7c] font-medium leading-tight">
              of Technology
            </div>
          </div>
        </div>

        {/* Right: Degree & Timeline */}
        <div className="pl-4 flex-1">
          <div className="font-bold text-[#1f3352] text-xs leading-snug">
            B.Tech in Computer Science
          </div>
          <div className="text-[10.5px] text-[#465b7c] font-medium mt-0.5">
            (2026 – 2030)
          </div>
        </div>
      </div>

      {/* Expandable Coursework & Highlights */}
      {showDetails && (
        <div className="mt-2.5 pt-2 border-t border-[#d8e3f4] text-[10.5px] text-[#334766] space-y-1 animate-in fade-in duration-150">
          <p>
            <strong className="text-[#1f3352]">Focus:</strong> Full Stack Development, Data Structures & Algorithms, UI/UX Design Systems.
          </p>
          <p>
            <strong className="text-[#1f3352]">Activities:</strong> Hackathons, Peer Tech Talks, Open Source Collaborations.
          </p>
        </div>
      )}
    </div>
  );
};
