import React from 'react';
import { ExternalLink } from 'lucide-react';

interface Project {
  title: string;
  description: string;
  tech: string[];
  iconType: 'terminal' | 'globe';
  githubUrl: string;
  demoUrl: string;
}

export const ProjectsSection: React.FC = () => {
  const projects: Project[] = [
    {
      title: 'Project One',
      description: 'A cool project I built with React.',
      tech: ['React', 'TypeScript', 'Tailwind'],
      iconType: 'terminal',
      githubUrl: 'https://github.com/ishapatidar/project-one',
      demoUrl: 'https://project-one.demo.app',
    },
    {
      title: 'Project Two',
      description: 'A web app for something cool.',
      tech: ['Next.js', 'Node.js', 'PostgreSQL'],
      iconType: 'globe',
      githubUrl: 'https://github.com/ishapatidar/project-two',
      demoUrl: 'https://project-two.demo.app',
    },
    {
      title: 'Portfolio Retro OS',
      description: 'Personal early-2000s desktop portfolio with interactive widgets.',
      tech: ['React', 'Vite', 'Web Audio'],
      iconType: 'terminal',
      githubUrl: 'https://github.com/ishapatidar/portfolio',
      demoUrl: 'https://ishapatidar.dev',
    },
  ];

  return (
    <div className="space-y-3 font-sans">
      {projects.map((proj, idx) => (
        <div
          key={idx}
          className="flex items-start space-x-3 p-2 rounded-lg hover:bg-black/[0.03] transition-colors border-b border-[#e5ebf5] last:border-b-0 pb-3"
        >
          {/* Project Icon */}
          <div className="flex-shrink-0 mt-0.5">
            {proj.iconType === 'terminal' ? (
              <div className="w-10 h-10 rounded-lg bg-[#2c3748] flex items-center justify-center text-emerald-400 font-mono font-bold text-xs shadow-inner">
                &gt;_
              </div>
            ) : (
              <div className="w-10 h-10 rounded-full bg-[#e8f1ff] border border-[#a8c6f7] flex items-center justify-center text-[#356bb5]">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              </div>
            )}
          </div>

          {/* Project Details */}
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-[#1f304d] text-xs sm:text-[13px] leading-snug">
              {proj.title}
            </h3>
            <p className="text-[11px] text-[#4b5d78] mt-0.5 line-clamp-2 leading-relaxed">
              {proj.description}
            </p>

            {/* Links */}
            <div className="flex items-center space-x-3 mt-1.5 text-[11px] font-semibold text-[#2b68c2]">
              <a
                href={proj.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="hover:underline flex items-center space-x-0.5 group"
                onClick={(e) => e.stopPropagation()}
              >
                <span>GitHub</span>
                <span className="text-[10px] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">↗</span>
              </a>
              <span className="text-[#a4b8d7]">•</span>
              <a
                href={proj.demoUrl}
                target="_blank"
                rel="noreferrer"
                className="hover:underline flex items-center space-x-0.5 group"
                onClick={(e) => e.stopPropagation()}
              >
                <span>Live Demo</span>
                <span className="text-[10px] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">↗</span>
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
