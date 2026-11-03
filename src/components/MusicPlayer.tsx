import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIdx, setCurrentTrackIdx] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const timerRef = useRef<number | null>(null);

  const tracks = [
    { title: 'good days ♡', chords: [261.63, 329.63, 392.00, 523.25] }, // C major
    { title: 'stargazing ☆', chords: [220.00, 261.63, 329.63, 440.00] }, // A minor
    { title: 'cloud nine ☁', chords: [349.23, 440.00, 523.25, 659.25] }, // F major
  ];

  // Synthesize a relaxing, dreamy lo-fi ambient chord sequence using Web Audio API
  const playRetroChords = () => {
    try {
      if (!audioCtxRef.current) {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef.current = new AudioContextClass();
      }

      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const track = tracks[currentTrackIdx];
      const now = ctx.currentTime;

      // Soft master gain
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(isMuted ? 0 : 0.08, now);
      masterGain.connect(ctx.destination);

      // Play each note of the relaxing chord
      track.chords.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const noteGain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.15);

        // Envelope: soft attack, gentle decay
        noteGain.gain.setValueAtTime(0, now + i * 0.15);
        noteGain.gain.linearRampToValueAtTime(0.04, now + i * 0.15 + 0.3);
        noteGain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.15 + 2.8);

        osc.connect(noteGain);
        noteGain.connect(masterGain);

        osc.start(now + i * 0.15);
        osc.stop(now + i * 0.15 + 3.0);
      });
    } catch {
      // AudioContext could be blocked by browser policy until user gesture
    }
  };

  useEffect(() => {
    if (isPlaying) {
      playRetroChords();
      const interval = window.setInterval(() => {
        playRetroChords();
      }, 3500);
      timerRef.current = interval;
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, currentTrackIdx, isMuted]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => {
    setCurrentTrackIdx((prev) => (prev + 1) % tracks.length);
  };

  const prevTrack = () => {
    setCurrentTrackIdx((prev) => (prev - 1 + tracks.length) % tracks.length);
  };

  return (
    <div className="absolute left-3 sm:left-4 bottom-3 sm:bottom-4 z-30 select-none">
      <div className="bg-[#eef2fb]/95 backdrop-blur-sm border-[1.5px] border-[#253753] rounded-2xl px-3.5 py-1.5 flex items-center space-x-3.5 shadow-[0_4px_10px_rgba(20,40,75,0.2)] hover:border-[#172740] transition-colors">
        {/* Double Note Icon */}
        <div className="text-[#356bb5] flex items-center">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
          </svg>
        </div>

        {/* Track Title */}
        <span className="text-[#253753] font-semibold text-xs tracking-tight whitespace-nowrap min-w-[70px]">
          {tracks[currentTrackIdx].title}
        </span>

        {/* Media Controls */}
        <div className="flex items-center space-x-2 text-[#253753]">
          {/* Previous Track */}
          <button
            onClick={prevTrack}
            title="Previous Track"
            className="hover:text-[#3876cd] transition-colors p-0.5 active:scale-90"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
            </svg>
          </button>

          {/* Play / Pause Toggle */}
          <button
            onClick={togglePlay}
            title={isPlaying ? "Pause" : "Play Lo-Fi Ambient Beat"}
            className="hover:text-[#3876cd] transition-colors p-0.5 active:scale-90"
          >
            {isPlaying ? (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
            ) : (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>

          {/* Next Track */}
          <button
            onClick={nextTrack}
            title="Next Track"
            className="hover:text-[#3876cd] transition-colors p-0.5 active:scale-90"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
            </svg>
          </button>

          {/* Mute toggle button */}
          <button
            onClick={() => setIsMuted(!isMuted)}
            title={isMuted ? "Unmute" : "Mute"}
            className="hover:text-[#3876cd] transition-colors p-0.5 text-[#546b8c] active:scale-90"
          >
            {isMuted ? (
              <VolumeX className="w-3.5 h-3.5" />
            ) : (
              <Volume2 className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
