import React from 'react';
import { Bus, Settings, Share2, Heart, AlertTriangle } from 'lucide-react';
import { soundFx } from '../utils/audio';

export default function Navbar({ onOpenAdmin, onDonateClick }) {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-[#071329]/85 border-b-2 border-cyan-500/30 px-4 py-3 transition-all shadow-[0_4px_20px_rgba(6,182,212,0.15)]">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        
        {/* Brand / Title */}
        <a href="#hero" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-400 via-sky-300 to-blue-600 flex items-center justify-center text-black font-black text-xl comic-border-ice group-hover:rotate-6 transition-transform shadow-lg">
            🏔️
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-sm md:text-base tracking-wide bg-gradient-to-r from-cyan-300 via-sky-200 to-yellow-300 bg-clip-text text-transparent">
                OPERATION COLLEGE TRIP
              </span>
              <span className="text-[10px] bg-cyan-900/80 border border-cyan-400/50 text-cyan-200 font-bold px-1.5 py-0.5 rounded-full flex items-center gap-1">
                <span>❄️</span>
                <span className="hidden sm:inline">MANALI</span>
              </span>
            </div>
            <p className="text-[10px] md:text-xs text-sky-200/90 font-malayalam">
              രക്ഷിക്കണേ കുടുംബക്കാരെ! 🥶❄️
            </p>
          </div>
        </a>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 md:gap-3">
          <button
            onClick={() => {
              soundFx.playClick();
              onOpenAdmin();
            }}
            title="Admin Settings (Configure amounts & deadline)"
            className="p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-sky-200 hover:text-cyan-300 transition-colors border border-cyan-800/50 text-xs flex items-center gap-1.5"
          >
            <Settings className="w-4 h-4" />
            <span className="hidden sm:inline text-xs font-semibold">Config</span>
          </button>

          <button
            onClick={() => {
              soundFx.playCoin();
              onDonateClick();
            }}
            className="flex items-center gap-1.5 px-3.5 py-1.5 md:px-4 md:py-2 rounded-xl bg-gradient-to-r from-meme-yellow via-yellow-300 to-meme-orange text-black font-black text-xs md:text-sm comic-border hover:scale-105 active:scale-95 transition-all shadow-lg shadow-cyan-500/20"
          >
            <Heart className="w-4 h-4 fill-black text-black animate-bounce" />
            <span>DONATE NOW</span>
          </button>
        </div>
      </div>
    </header>
  );
}
