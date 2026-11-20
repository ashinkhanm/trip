import React, { useState, useEffect } from 'react';
import { AlertCircle, Clock, Heart, Flame, Sparkles, MessageCircleQuestion } from 'lucide-react';
import { soundFx } from '../utils/audio';

export default function Hero({ config, onDonateClick, onBrokeClick, onWillDonateClick }) {
  // Countdown to advance deadline (default 24h / tomorrow)
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59
  });

  useEffect(() => {
    // Target time: calculated from now or configurable deadline
    const deadline = new Date();
    deadline.setHours(deadline.getHours() + 24);

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = deadline.getTime() - now;

      if (difference > 0) {
        const hours = Math.floor((difference / (1000 * 60 * 60)));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ hours, minutes, seconds });
      } else {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [config.advanceDeadlineHours]);

  return (
    <section id="hero" className="relative pt-6 pb-12 px-4 overflow-hidden">
      {/* Background icy glowing orbs */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-80 md:w-[650px] h-80 bg-gradient-to-tr from-cyan-500/20 via-sky-500/20 to-blue-600/15 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Floating Emojis in background */}
      <div className="hidden md:block absolute top-16 left-8 text-4xl animate-bounce-slight opacity-80 select-none pointer-events-none">🏔️</div>
      <div className="hidden md:block absolute top-36 right-10 text-4xl animate-float-slow opacity-80 select-none pointer-events-none">❄️</div>
      <div className="hidden md:block absolute bottom-12 left-16 text-3xl animate-wiggle opacity-80 select-none pointer-events-none">⛄</div>
      <div className="hidden md:block absolute bottom-24 right-20 text-3xl animate-pulse opacity-80 select-none pointer-events-none">🌨️</div>

      <div className="max-w-4xl mx-auto text-center">

        {/* Snow & Emergency Alert Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/80 border-2 border-cyan-400/80 text-cyan-200 text-xs md:text-sm font-bold mb-4 shadow-lg shadow-cyan-900/40">
          <span>❄️</span>
          <span>മണാലിയിലെ തണുപ്പും മഞ്ഞും സ്വപ്നം കണ്ട്... 🥶☃️</span>
          <span className="hidden sm:inline bg-red-600 text-white text-[10px] px-1.5 py-0.5 rounded-full animate-pulse ml-1 font-mono">
            ADVANCE: TOMORROW!
          </span>
        </div>

        {/* Main Malayalam Headline */}
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tight leading-tight mb-3 font-malayalam">
          <span className="block text-white drop-shadow-md">
            {config.heroHeadline}
          </span>
          <span className="bg-gradient-to-r from-meme-yellow via-yellow-200 to-meme-orange bg-clip-text text-transparent">
            {config.taglineMl}
          </span>
        </h1>

        {/* Subhead in Malayalam */}
        <p className="text-base sm:text-xl md:text-2xl text-yellow-300 font-semibold mb-2 font-malayalam">
          {config.heroSubheadline}
        </p>

        {/* Funny English Caption */}
        <p className="text-sm md:text-lg text-gray-300 italic font-medium mb-6">
          "{config.englishCaption}"
        </p>

        {/* Hero Reaction Image Card */}
        <div className="max-w-md mx-auto my-6 bg-slate-900/90 rounded-3xl p-3 border-4 border-cyan-400 comic-border-ice relative transform hover:-rotate-1 transition-transform shadow-[0_0_35px_rgba(56,189,248,0.25)]">
          <div className="relative rounded-2xl overflow-hidden bg-black flex items-center justify-center">
            <img 
              src="/images/jsad.jpg" 
              alt="Trip Reaction" 
              className="w-full h-auto max-h-[420px] object-contain rounded-xl"
            />
          </div>
        </div>

        {/* Countdown Timer to Advance Deadline */}
        <div className="max-w-md mx-auto mb-8 bg-gradient-to-r from-slate-900 via-cyan-950/60 to-slate-900 p-4 rounded-2xl border-2 border-cyan-500/40 shadow-xl">
          <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-wider text-orange-300 font-bold mb-2">
            <Clock className="w-4 h-4 animate-spin-slow" />
            <span>ADVANCE PAYMENT COUNTDOWN (DEADLINE: TOMORROW)</span>
          </div>

          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="bg-gray-900/90 rounded-xl p-2 border border-gray-700">
              <span className="block text-2xl md:text-3xl font-black text-yellow-400 font-mono">
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
              <span className="text-[10px] text-gray-400 uppercase font-semibold">Hours (മണിക്കൂർ)</span>
            </div>
            <div className="bg-gray-900/90 rounded-xl p-2 border border-gray-700">
              <span className="block text-2xl md:text-3xl font-black text-orange-400 font-mono">
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
              <span className="text-[10px] text-gray-400 uppercase font-semibold">Mins (മിനിറ്റ്)</span>
            </div>
            <div className="bg-gray-900/90 rounded-xl p-2 border border-gray-700">
              <span className="block text-2xl md:text-3xl font-black text-red-400 font-mono animate-pulse">
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
              <span className="text-[10px] text-gray-400 uppercase font-semibold">Secs (സെക്കൻഡ്)</span>
            </div>
          </div>
        </div>

        {/* Primary Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
          <button
            onClick={() => {
              soundFx.playCoin();
              onDonateClick();
            }}
            className="flex-1 sm:flex-initial px-6 py-3.5 md:px-8 md:py-4 rounded-2xl bg-gradient-to-r from-meme-yellow via-yellow-300 to-meme-orange text-black font-black text-base md:text-lg comic-border-lg hover:scale-105 active:scale-95 transition-all shadow-xl shadow-yellow-500/25 flex items-center justify-center gap-2 group"
          >
            <Sparkles className="w-5 h-5 text-black animate-spin-slow" />
            <span>DONATE NOW (രക്ഷിക്കൂ!) 💸</span>
          </button>

          <button
            onClick={() => {
              soundFx.playCelebration();
              onWillDonateClick();
            }}
            className="px-5 py-3.5 md:px-6 md:py-4 rounded-2xl bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold text-sm md:text-base comic-border hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <Heart className="w-5 h-5 fill-white text-white animate-pulse" />
            <span>I WILL DONATE ❤️</span>
          </button>

          <button
            onClick={() => {
              soundFx.playSadTrombone();
              onBrokeClick();
            }}
            className="px-5 py-3.5 md:px-6 md:py-4 rounded-2xl bg-gray-800/90 hover:bg-gray-700/90 text-gray-300 font-bold text-sm md:text-base border-2 border-gray-600 comic-border hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <MessageCircleQuestion className="w-5 h-5 text-yellow-400" />
            <span>I AM BROKE 😭</span>
          </button>
        </div>

        {/* Quick Micro-Trust Banner */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-gray-400">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-ping" />
            Direct GPay / PhonePe / Paytm UPI
          </span>
          <span>•</span>
          <span>₹10 ആയാലും എനിക്ക് വലിയ അനുഗ്രഹമാണ്! ❤️</span>
          <span>•</span>
          <span>No middleman / No commission</span>
        </div>

      </div>
    </section>
  );
}
