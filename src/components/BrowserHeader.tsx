import React, { useState } from 'react';
import { Star, ExternalLink, Sparkles, Check } from 'lucide-react';

interface BrowserHeaderProps {
  onResetWindows?: () => void;
  onMinimizeAll?: () => void;
  onMaximizeAll?: () => void;
}

export const BrowserHeader: React.FC<BrowserHeaderProps> = ({
  onResetWindows,
  onMinimizeAll,
  onMaximizeAll,
}) => {
  const [starred, setStarred] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <header className="w-full h-10 bg-[#f2f4f8]/95 backdrop-blur-sm border-b border-[#96a9c9] flex items-center justify-between px-3.5 z-40 select-none shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
      {/* Left: Window Controls + Star + Title */}
      <div className="flex items-center space-x-3">
        {/* macOS Style Window Controls */}
        <div className="flex items-center space-x-1.5">
          <button
            onClick={onResetWindows}
            title="Reset Windows"
            className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e] hover:brightness-90 transition-all flex items-center justify-center group"
          >
            <span className="opacity-0 group-hover:opacity-100 text-[8px] font-bold text-red-950 leading-none">×</span>
          </button>
          <button
            onClick={onMinimizeAll}
            title="Minimize All"
            className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123] hover:brightness-90 transition-all flex items-center justify-center group"
          >
            <span className="opacity-0 group-hover:opacity-100 text-[8px] font-bold text-yellow-950 leading-none">-</span>
          </button>
          <button
            onClick={onMaximizeAll}
            title="Tile / Open All"
            className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29] hover:brightness-90 transition-all flex items-center justify-center group"
          >
            <span className="opacity-0 group-hover:opacity-100 text-[8px] font-bold text-green-950 leading-none">+</span>
          </button>
        </div>

        {/* Small Pixel Star Icon */}
        <div className="text-[#5586d0] flex items-center">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        </div>

        {/* Page Title */}
        <span className="text-[#253655] font-medium text-[13px] tracking-tight">
          Isha Patidar | Portfolio
        </span>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center space-x-3 text-[#4b658d]">
        {/* Star Button */}
        <button
          onClick={() => setStarred(!starred)}
          title={starred ? "Bookmarked!" : "Bookmark Portfolio"}
          className={`p-1 rounded hover:bg-black/5 transition-colors ${starred ? 'text-amber-500 fill-amber-500' : 'hover:text-[#253655]'}`}
        >
          <Star className={`w-4 h-4 ${starred ? 'fill-amber-400 text-amber-500' : ''}`} strokeWidth={1.8} />
        </button>

        {/* Share / Copy Link Button */}
        <button
          onClick={handleShare}
          title={copied ? "Link Copied!" : "Share / Copy URL"}
          className="p-1 rounded hover:bg-black/5 hover:text-[#253655] transition-colors relative"
        >
          {copied ? (
            <Check className="w-4 h-4 text-emerald-600" strokeWidth={2.2} />
          ) : (
            <ExternalLink className="w-4 h-4" strokeWidth={1.8} />
          )}
          {copied && (
            <span className="absolute right-0 top-6 bg-[#253655] text-white text-[10px] py-0.5 px-1.5 rounded shadow-md whitespace-nowrap animate-fade-in">
              Copied!
            </span>
          )}
        </button>
      </div>
    </header>
  );
};
