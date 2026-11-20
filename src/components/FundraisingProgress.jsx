import React from 'react';
import { Target, TrendingUp, AlertTriangle, ShieldCheck, HeartHandshake } from 'lucide-react';

export default function FundraisingProgress({ config }) {
  const total = Number(config.totalBudget) || 20000;
  const advance = Number(config.advanceTarget) || 6000;
  const collected = Number(config.currentCollected) || 0;
  const remaining = Math.max(0, total - collected);
  
  // Percentages
  const totalPercent = Math.min(100, Math.round((collected / total) * 100));
  const advancePercent = Math.min(100, Math.round((collected / advance) * 100));
  const remainingAdvance = Math.max(0, advance - collected);

  return (
    <section id="progress" className="py-10 px-4 bg-gradient-to-b from-transparent via-purple-950/20 to-transparent">
      <div className="max-w-4xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-400/40 text-cyan-200 text-xs font-bold uppercase tracking-wider mb-2">
            <Target className="w-3.5 h-3.5 text-cyan-400" />
            <span>❄️ ലൈവ് ഫണ്ട് ട്രാക്കർ (100% സുതാര്യം) ❄️</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black font-malayalam text-white">
            ഫണ്ട് കളക്ഷൻ പുരോഗതി 📊
          </h2>
          <p className="text-sm md:text-base text-sky-200 font-malayalam mt-1">
            "ഒരു കള്ളത്തരവും ഇല്ല... കിട്ടിയത് കിട്ടിയതുപോലെ ഇവിടെ കാണിക്കും!"
          </p>
        </div>

        {/* Main Progress Board */}
        <div className="bg-slate-900/90 border-4 border-cyan-400/50 rounded-3xl p-6 md:p-8 comic-border-ice relative overflow-hidden backdrop-blur-xl shadow-[0_0_35px_rgba(56,189,248,0.18)]">
          
          {/* Status Badge */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-cyan-900/50">
            <div>
              <span className="text-xs text-sky-300/80 font-semibold block">ലക്ഷ്യസ്ഥാനം (Destination):</span>
              <span className="text-base md:text-lg font-black text-cyan-300">{config.tripDestination}</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-orange-950/60 border border-orange-500/40 text-orange-300 text-xs font-bold">
              <AlertTriangle className="w-4 h-4 text-orange-400 animate-bounce" />
              <span>Advance Deadline: നാളെ!</span>
            </div>
          </div>

          {/* Key Numbers Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {/* Total Budget */}
            <div className="bg-black/60 rounded-2xl p-4 border border-gray-800 text-center">
              <span className="text-xs text-gray-400 font-medium block mb-1">ആകെ ബഡ്ജറ്റ്</span>
              <span className="text-xl md:text-2xl font-black text-white">
                ₹{total.toLocaleString('en-IN')}
              </span>
              <span className="text-[10px] text-gray-400 block mt-0.5">Total Goal</span>
            </div>

            {/* Advance Target */}
            <div className="bg-orange-950/40 rounded-2xl p-4 border border-orange-500/30 text-center">
              <span className="text-xs text-orange-300 font-medium block mb-1">അടിയന്തിര Advance</span>
              <span className="text-xl md:text-2xl font-black text-orange-400">
                ₹{advance.toLocaleString('en-IN')}
              </span>
              <span className="text-[10px] text-orange-300/80 block mt-0.5">Urgent Need</span>
            </div>

            {/* Collected */}
            <div className="bg-green-950/40 rounded-2xl p-4 border border-green-500/30 text-center">
              <span className="text-xs text-green-300 font-medium block mb-1">ഇതുവരെ പിരിഞ്ഞത്</span>
              <span className="text-xl md:text-2xl font-black text-green-400">
                ₹{collected.toLocaleString('en-IN')}
              </span>
              <span className="text-[10px] text-green-300/80 block mt-0.5">{totalPercent}% Collected</span>
            </div>

            {/* Remaining */}
            <div className="bg-red-950/40 rounded-2xl p-4 border border-red-500/30 text-center">
              <span className="text-xs text-red-300 font-medium block mb-1">ഇനിയും വേണ്ടത്</span>
              <span className="text-xl md:text-2xl font-black text-red-400">
                ₹{remaining.toLocaleString('en-IN')}
              </span>
              <span className="text-[10px] text-red-300/80 block mt-0.5">Remaining</span>
            </div>
          </div>

          {/* 1. SEPARATE ADVANCE PROGRESS BAR (Urgent Goal ₹6,000) */}
          <div className="mb-6 p-4 rounded-2xl bg-orange-950/20 border-2 border-orange-500/40">
            <div className="flex justify-between items-center text-xs md:text-sm font-bold mb-2">
              <span className="flex items-center gap-1.5 text-orange-300 font-malayalam">
                <AlertTriangle className="w-4 h-4 text-orange-400" />
                ഘട്ടം 1: നാളത്തെ അഡ്വാൻസ് (₹{advance.toLocaleString('en-IN')})
              </span>
              <span className="text-orange-400 font-mono">
                {advancePercent}% (₹{collected} / ₹{advance})
              </span>
            </div>
            
            {/* Progress Track */}
            <div className="w-full bg-gray-900 rounded-full h-4 p-0.5 border border-orange-500/30 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-orange-500 to-yellow-400 h-full rounded-full transition-all duration-1000 ease-out relative"
                style={{ width: `${Math.max(4, advancePercent)}%` }}
              >
                <div className="absolute inset-0 bg-white/20 animate-pulse" />
              </div>
            </div>

            <p className="text-[11px] text-orange-300/80 mt-2 font-malayalam text-right">
              {remainingAdvance > 0 
                ? `⚠️ നാളെ വണ്ടി ഉറപ്പിക്കാൻ ഇനിയും ₹${remainingAdvance.toLocaleString('en-IN')} വേണം!` 
                : '🎉 Advance target reached! നന്ദി പ്രിയപ്പെട്ട കുടുംബക്കാരെ! ❤️'}
            </p>
          </div>

          {/* 2. OVERALL GOAL PROGRESS BAR (Total ₹20,000) */}
          <div className="mb-4">
            <div className="flex justify-between items-center text-xs md:text-sm font-bold mb-2">
              <span className="text-yellow-300 font-malayalam flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-yellow-400" />
                ആകെ ട്രിപ്പ് ഫണ്ട് (Total ₹{total.toLocaleString('en-IN')})
              </span>
              <span className="text-yellow-400 font-mono">{totalPercent}% പൂർത്തിയായി</span>
            </div>

            {/* Overall Progress Track */}
            <div className="w-full bg-gray-950 rounded-full h-6 p-1 border-2 border-meme-yellow/40 overflow-hidden relative">
              <div 
                className="bg-gradient-to-r from-meme-yellow via-meme-orange to-pink-500 h-full rounded-full transition-all duration-1000 ease-out flex items-center justify-end pr-2 text-[10px] font-black text-black"
                style={{ width: `${Math.max(6, totalPercent)}%` }}
              >
                {totalPercent > 10 && `${totalPercent}%`}
              </div>
            </div>
          </div>

          {/* Funny State Feedback Message */}
          <div className="mt-6 p-3 rounded-xl bg-black/60 border border-gray-800 text-center">
            <p className="text-xs md:text-sm font-malayalam text-gray-300">
              {collected === 0 && (
                <span>"നിലവിൽ അക്കൗണ്ടിൽ പൂജ്യം രൂപയാണ്! 😂 ആദ്യത്തെ തുക നൽകി എന്റെ രക്ഷകനാകൂ കുടുംബക്കാരെ!"</span>
              )}
              {collected > 0 && collected < advance && (
                <span>"തുടങ്ങിയിട്ടുണ്ട് പ്രിയപ്പെട്ടവരെ... ആ ₹6,000 ആകാൻ കുടുംബത്തിന്റെ സപ്പോർട്ട് ഇനിയും വേണം! 🚀"</span>
              )}
              {collected >= advance && collected < total && (
                <span>"അഡ്വാൻസ് ആയി! ഇനി ഞാൻ മണാലിയിൽ പോയി അടിച്ചുപൊളിക്കാനുള്ള ബാക്കി തുകയിലേക്ക്! 🏔️❄️✨"</span>
              )}
              {collected >= total && (
                <span>"നന്ദി ദൈവമേ! നന്ദി പ്രിയപ്പെട്ട കുടുംബക്കാരെ! ഞാൻ ട്രിപ്പ് പോവാണേ! 🚌🎉💃"</span>
              )}
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
