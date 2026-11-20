import React from 'react';
import { Heart, Sparkles, Bus } from 'lucide-react';
import { soundFx } from '../utils/audio';

export default function ThankYouSection({ config, onDonateClick }) {
  return (
    <section className="py-16 px-4 bg-gradient-to-t from-[#040916] via-slate-900/60 to-transparent">
      <div className="max-w-4xl mx-auto text-center">
        
        {/* Mountain & Heart Icon / Badge */}
        <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-cyan-400 via-sky-300 to-blue-600 flex items-center justify-center mx-auto mb-6 text-3xl comic-border-ice rotate-3 animate-pulse shadow-[0_0_25px_rgba(56,189,248,0.3)]">
          🏔️
        </div>

        {/* Headline */}
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-black font-malayalam text-cyan-300 mb-4 leading-snug">
          "ഒന്നിച്ച് കൈകോർക്കാം" 🤝❄️
        </h2>

        {/* Caption */}
        <p className="text-base sm:text-lg md:text-xl text-sky-200 font-malayalam max-w-xl mx-auto mb-8">
          "ഈ ചെറിയ സഹായം എന്റെ കോളേജ് ജീവിതത്തിലെ വലിയൊരു ഓർമ്മയാകട്ടെ."
        </p>

        {/* Final Meme Card */}
        <div className="max-w-md mx-auto mb-8 bg-slate-950/90 p-3 rounded-3xl border-3 border-cyan-800/40 comic-border-ice">
          <div className="rounded-2xl overflow-hidden bg-black aspect-video relative">
            <img 
              src="/images/ml.jpg" 
              alt="Lalettan Emotional Meme" 
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = "/images/jsad.jpg";
              }}
            />
          </div>
        </div>

        {/* Final Donate Call */}
        <button
          onClick={() => {
            soundFx.playCoin();
            onDonateClick();
          }}
          className="px-8 py-4 rounded-2xl bg-gradient-to-r from-meme-yellow via-yellow-300 to-meme-orange text-black font-black text-lg md:text-xl comic-border-lg hover:scale-105 active:scale-95 transition shadow-2xl flex items-center justify-center gap-2 mx-auto"
        >
          <Bus className="w-6 h-6 text-black" />
          <span>എന്റെ ട്രിപ്പ് രക്ഷിക്കാൻ സഹായിക്കൂ 💸</span>
        </button>

        {/* College footer info */}
        <div className="mt-12 pt-6 border-t border-gray-800 text-xs text-gray-500 font-malayalam">
          <p>© 2026 Operation College Trip (Ashin's Manali Fund) • Made with ❤️ & Family Love</p>
          <p className="mt-1">UPI: {config.upiId} ({config.payeeName})</p>
        </div>

      </div>
    </section>
  );
}
