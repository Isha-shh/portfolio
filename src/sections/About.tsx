import React from 'react';

export const AboutSection: React.FC = () => {
  return (
    <div className="font-sans space-y-4 text-[#20314a]">
      {/* Bio Header */}
      <div className="flex items-center space-x-3 pb-3 border-b border-[#e1e9f6]">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#9dd1f8] to-[#60a3f6] p-0.5 border-2 border-[#1f3352] shadow-sm flex items-center justify-center overflow-hidden flex-shrink-0">
          <img
            src="/assets/icon_about.png"
            alt="Isha Patidar"
            className="w-10 h-10 object-contain image-rendering-pixelated"
          />
        </div>
        <div>
          <h3 className="font-extrabold text-sm sm:text-base text-[#1b2b46]">
            Isha Patidar
          </h3>
          <p className="text-[11px] text-[#425778] font-medium">
            Developer, Creative Technologist & Designer
          </p>
        </div>
      </div>

      {/* About Me Details */}
      <div className="space-y-2 text-xs leading-relaxed text-[#334766]">
        <p>
          Hi there! 👋 I am an aspiring software engineer and creative designer who loves building playful, interactive web experiences, retro-inspired digital interfaces, and modern full-stack web applications.
        </p>
        <p>
          Beyond programming and visual design, I am an enthusiastic follower of <strong className="text-[#1b2b46]">Formula 1 🏎️</strong>, curious about aerospace tech, and love exploring creative coding and typography.
        </p>
      </div>

      {/* Current Goals & Focus */}
      <div className="bg-[#edf4ff] p-2.5 rounded-lg border border-[#c3d9fb] text-[11px]">
        <h4 className="font-bold text-[#1f385c] mb-1">
          🎯 Current Learning Goals:
        </h4>
        <ul className="list-disc list-inside space-y-0.5 text-[#354967]">
          <li>Mastering advanced React architecture & WebGL graphics.</li>
          <li>Contributing to high-impact open source repositories.</li>
          <li>Experimenting with retro digital design aesthetics.</li>
        </ul>
      </div>

      {/* Skill Tags */}
      <div>
        <h4 className="font-bold text-[11px] text-[#1f385c] mb-1.5 uppercase tracking-wider">
          🛠️ Tech & Tools:
        </h4>
        <div className="flex flex-wrap gap-1.5 text-[10.5px]">
          {['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Node.js', 'Figma', 'Git', 'Python'].map((s) => (
            <span
              key={s}
              className="bg-[#fffdf5] border border-[#a4badf] text-[#243756] px-2 py-0.5 rounded-full font-medium shadow-2xs"
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
