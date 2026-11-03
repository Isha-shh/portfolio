import React, { useState } from 'react';
import { BrowserHeader } from './components/BrowserHeader';
import { PortfolioHero } from './components/PortfolioHero';
import { FloatingIcon } from './components/FloatingIcon';
import { PortfolioWindow } from './components/PortfolioWindow';
import { MusicPlayer } from './components/MusicPlayer';
import { ThanksSignoff } from './components/ThanksSignoff';

// Sections
import { ProjectsSection } from './sections/Projects';
import { ClubsSection } from './sections/Clubs';
import { DesignsSection } from './sections/Designs';
import { EducationSection } from './sections/Education';
import { AboutSection } from './sections/About';

interface WindowState {
  isOpen: boolean;
  zIndex: number;
  position: { x: number; y: number };
}

export const App: React.FC = () => {
  const [topZ, setTopZ] = useState(25);

  // Initial window states matching reference screenshot
  const [windows, setWindows] = useState<Record<string, WindowState>>({
    projects: {
      isOpen: true,
      zIndex: 21,
      position: { x: 22, y: 290 },
    },
    clubs: {
      isOpen: true,
      zIndex: 22,
      position: { x: 306, y: 395 },
    },
    designs: {
      isOpen: true,
      zIndex: 23,
      position: { x: 754, y: 288 },
    },
    education: {
      isOpen: true,
      zIndex: 24,
      position: { x: 632, y: 410 },
    },
    about: {
      isOpen: false,
      zIndex: 20,
      position: { x: 240, y: 130 },
    },
  });

  const bringToFront = (key: string) => {
    setTopZ((prev) => {
      const nextZ = prev + 1;
      setWindows((w) => ({
        ...w,
        [key]: {
          ...w[key],
          isOpen: true,
          zIndex: nextZ,
        },
      }));
      return nextZ;
    });
  };

  const closeWindow = (key: string) => {
    setWindows((w) => ({
      ...w,
      [key]: {
        ...w[key],
        isOpen: false,
      },
    }));
  };

  const toggleWindow = (key: string) => {
    if (windows[key]?.isOpen) {
      bringToFront(key);
    } else {
      bringToFront(key);
    }
  };

  const resetAll = () => {
    setWindows({
      projects: { isOpen: true, zIndex: 21, position: { x: 22, y: 290 } },
      clubs: { isOpen: true, zIndex: 22, position: { x: 306, y: 395 } },
      designs: { isOpen: true, zIndex: 23, position: { x: 754, y: 288 } },
      education: { isOpen: true, zIndex: 24, position: { x: 632, y: 410 } },
      about: { isOpen: false, zIndex: 20, position: { x: 240, y: 130 } },
    });
  };

  const minimizeAll = () => {
    setWindows((prev) => {
      const updated = { ...prev };
      Object.keys(updated).forEach((k) => {
        updated[k] = { ...updated[k], isOpen: false };
      });
      return updated;
    });
  };

  const maximizeAll = () => {
    setWindows((prev) => {
      const updated = { ...prev };
      Object.keys(updated).forEach((k) => {
        updated[k] = { ...updated[k], isOpen: true };
      });
      return updated;
    });
  };

  return (
    <div className="relative w-screen h-screen min-h-[600px] overflow-hidden bg-[#5f9ef6] flex flex-col font-sans select-none">
      {/* 1. Top Browser Header Bar */}
      <BrowserHeader
        onResetWindows={resetAll}
        onMinimizeAll={minimizeAll}
        onMaximizeAll={maximizeAll}
      />

      {/* 2. Main Desktop Stage */}
      <main className="relative flex-1 w-full h-full overflow-hidden">
        {/* Layer A: High-Fidelity Painterly Sky Canvas */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none"
          style={{
            backgroundImage: `url('/assets/sky_canvas.png')`,
          }}
        />

        {/* Layer B: Gentle Retro Scanlines & Halftone Pixel Texture */}
        <div className="absolute inset-0 scanlines pointer-events-none z-5" />
        <div className="absolute inset-0 halftone-grain pointer-events-none opacity-40 z-5" />

        {/* Layer C: Central "Portfolio" Heading & Cursive Flourishes */}
        <PortfolioHero />

        {/* Layer D: The 5 Floating Illustrated Icons with Cream Labels */}
        {/* 1. About Me (Top-Left) */}
        <FloatingIcon
          id="about"
          name="About Me"
          iconSrc="/assets/icon_about.png"
          alt="About Me Icon"
          left="20.5%"
          top="10.5%"
          floatAnimationClass="animate-float-1"
          labelPosition="bottom-right"
          isOpen={windows.about?.isOpen}
          onClick={() => toggleWindow('about')}
        />

        {/* 2. Projects (Left-Center) */}
        <FloatingIcon
          id="projects"
          name="Projects"
          iconSrc="/assets/icon_projects.png"
          alt="Projects Folder Icon"
          left="12.2%"
          top="32.5%"
          floatAnimationClass="animate-float-2"
          labelPosition="bottom"
          isOpen={windows.projects?.isOpen}
          onClick={() => toggleWindow('projects')}
        />

        {/* 3. Designs (Top-Right) */}
        <FloatingIcon
          id="designs"
          name="Designs"
          iconSrc="/assets/icon_designs.png"
          alt="Designs Pencil Holder Icon"
          left="76.2%"
          top="8.5%"
          floatAnimationClass="animate-float-3"
          labelPosition="right"
          isOpen={windows.designs?.isOpen}
          onClick={() => toggleWindow('designs')}
        />

        {/* 4. Education (Mid-Right) */}
        <FloatingIcon
          id="education"
          name="Education"
          iconSrc="/assets/icon_education.png"
          alt="Education Tag Icon"
          left="85.2%"
          top="30.5%"
          floatAnimationClass="animate-float-1"
          labelPosition="bottom-right"
          isOpen={windows.education?.isOpen}
          onClick={() => toggleWindow('education')}
        />

        {/* 5. Clubs & Participation (Lower-Center) */}
        <FloatingIcon
          id="clubs"
          name="Clubs & Participation"
          iconSrc="/assets/icon_clubs.png"
          alt="Clubs Folder Icon"
          left="56.8%"
          top="52.8%"
          floatAnimationClass="animate-float-2"
          labelPosition="bottom"
          isOpen={windows.clubs?.isOpen}
          onClick={() => toggleWindow('clubs')}
        />

        {/* Layer E: Desktop Retro Pop-Up Windows */}
        {/* Projects Window (Bottom Left) */}
        <PortfolioWindow
          id="projects"
          title="Projects"
          iconImage="/assets/icon_projects.png"
          isOpen={windows.projects.isOpen}
          zIndex={windows.projects.zIndex}
          initialPosition={windows.projects.position}
          width="w-[265px] sm:w-[275px]"
          onClose={() => closeWindow('projects')}
          onFocus={() => bringToFront('projects')}
        >
          <ProjectsSection />
        </PortfolioWindow>

        {/* Clubs & Participation Window (Bottom Center-Left) */}
        <PortfolioWindow
          id="clubs"
          title="Clubs & Participation"
          iconImage="/assets/icon_clubs.png"
          isOpen={windows.clubs.isOpen}
          zIndex={windows.clubs.zIndex}
          initialPosition={windows.clubs.position}
          width="w-[275px] sm:w-[285px]"
          onClose={() => closeWindow('clubs')}
          onFocus={() => bringToFront('clubs')}
        >
          <ClubsSection />
        </PortfolioWindow>

        {/* Designs Window (Mid-Right) */}
        <PortfolioWindow
          id="designs"
          title="Designs"
          iconImage="/assets/icon_designs.png"
          isOpen={windows.designs.isOpen}
          zIndex={windows.designs.zIndex}
          initialPosition={windows.designs.position}
          width="w-[255px] sm:w-[265px]"
          onClose={() => closeWindow('designs')}
          onFocus={() => bringToFront('designs')}
        >
          <DesignsSection />
        </PortfolioWindow>

        {/* Education Window (Bottom-Right) */}
        <PortfolioWindow
          id="education"
          title="Education"
          iconImage="/assets/icon_education.png"
          isOpen={windows.education.isOpen}
          zIndex={windows.education.zIndex}
          initialPosition={windows.education.position}
          width="w-[280px] sm:w-[295px]"
          onClose={() => closeWindow('education')}
          onFocus={() => bringToFront('education')}
        >
          <EducationSection />
        </PortfolioWindow>

        {/* About Me Window (Interactive pop-up) */}
        <PortfolioWindow
          id="about"
          title="About Me"
          iconImage="/assets/icon_about.png"
          isOpen={windows.about.isOpen}
          zIndex={windows.about.zIndex}
          initialPosition={windows.about.position}
          width="w-[300px] sm:w-[340px]"
          onClose={() => closeWindow('about')}
          onFocus={() => bringToFront('about')}
        >
          <AboutSection />
        </PortfolioWindow>

        {/* Layer F: Music Player Widget (Bottom-Left) */}
        <MusicPlayer />

        {/* Layer G: "thanks for visiting! ♡" (Bottom-Right) */}
        <ThanksSignoff />
      </main>
    </div>
  );
};

export default App;
