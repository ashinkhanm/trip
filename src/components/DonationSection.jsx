import React from 'react';
import { Coffee, Pizza, Utensils, Award, Bus, Crown, Edit3 } from 'lucide-react';
import { soundFx } from '../utils/audio';

const PRESET_AMOUNTS = [
  {
    amount: 10,
    label: "ചൂട് ചായ ☕❄️",
    funnyDesc: "മണാലിയിലെ തണുപ്പത്ത് ഒരു സിപ്പ് ചായയുടെ അനുഗ്രഹം!",
    popular: false
  },
  {
    amount: 20,
    label: "ചായയും പരിപ്പുവടയും ☕🧆",
    funnyDesc: "ഡൽഹിയിലെ പ്രഭാതം... കുടുംബത്തിന്റെ വലിയ സ്നേഹം!",
    popular: false
  },
  {
    amount: 50,
    label: "മണാലി മാഗി 🍜⛷️",
    funnyDesc: "Your ₹50 can save my trip! മഞ്ഞിലെ ജീവൻരക്ഷാ മാഗി!",
    popular: true
  },
  {
    amount: 100,
    label: "മഞ്ഞിലെ ഫോട്ടോ 📸❄️",
    funnyDesc: "നിങ്ങളുടെ ₹100 = മണാലി മഞ്ഞിൽ എന്റെ അടിപൊളി ഫോട്ടോ!",
    popular: false
  },
  {
    amount: 200,
    label: "വിന്റർ ജാക്കറ്റ് 🧥🧤",
    funnyDesc: "തണുപ്പത്ത് വിറയ്ക്കാതെ നടക്കാൻ കട്ട സപ്പോർട്ട്!",
    popular: false
  },
  {
    amount: 500,
    label: "ജീപ്പ് സഫാരി 🚙🏔️",
    funnyDesc: "മണാലിയിലെ VIP സ്പോൺസർ... നിങ്ങൾ എന്റെ രക്ഷകൻ!",
    popular: false
  }
];

export default function DonationSection({ selectedAmount, setSelectedAmount, onAmountPicked }) {
  const [isCustom, setIsCustom] = React.useState(false);
  const [customVal, setCustomVal] = React.useState('');

  const handleSelect = (amt) => {
    soundFx.playCoin();
    setIsCustom(false);
    setSelectedAmount(amt);
    if (onAmountPicked) onAmountPicked(amt);
  };

  const handleCustomChange = (e) => {
    const val = e.target.value.replace(/[^0-9]/g, '');
    setCustomVal(val);
    const num = parseInt(val, 10);
    if (!isNaN(num) && num > 0) {
      setSelectedAmount(num);
      if (onAmountPicked) onAmountPicked(num);
    }
  };

  return (
    <section id="donate" className="py-12 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Section Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-400/50 text-cyan-200 text-xs font-bold uppercase tracking-wider mb-2">
            <span>❄️ തുക തിരഞ്ഞെടുക്കൂ (Select Amount) ❄️</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black font-malayalam text-white mb-2">
            ഒരു ചൂട് ചായയുടെ കാശ് തന്നാലും വലിയ സഹായമാണ്! ☕❄️
          </h2>
          <p className="text-sm md:text-base text-sky-200 font-malayalam">
            താഴെയുള്ള ഏതെങ്കിലും തുക തിരഞ്ഞെടുക്കുക. QR കോഡ് ഓട്ടോമാറ്റിക്കായി അപ്ഡേറ്റ് ആകും!
          </p>
        </div>

        {/* Preset Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4 mb-6">
          {PRESET_AMOUNTS.map((item) => {
            const isSelected = !isCustom && selectedAmount === item.amount;
            return (
              <button
                key={item.amount}
                onClick={() => handleSelect(item.amount)}
                className={`relative p-4 rounded-2xl text-left transition-all duration-200 comic-border-ice ${
                  isSelected
                    ? 'bg-gradient-to-br from-cyan-400 via-sky-300 to-blue-500 text-black font-bold scale-[1.03] border-4 border-slate-950 ring-4 ring-cyan-400/50 shadow-[0_0_30px_rgba(56,189,248,0.4)]'
                    : 'bg-slate-900/80 text-white hover:bg-slate-800/90 border-2 border-cyan-800/40 hover:border-cyan-400 shadow-md'
                }`}
              >
                {item.popular && (
                  <span className="absolute -top-3 right-3 bg-gradient-to-r from-red-600 to-orange-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase shadow">
                    🔥 POPULAR
                  </span>
                )}

                <div className="flex items-baseline justify-between mb-1">
                  <span className={`text-2xl sm:text-3xl font-black ${isSelected ? 'text-black' : 'text-cyan-300'}`}>
                    ₹{item.amount}
                  </span>
                </div>

                <div className={`text-xs md:text-sm font-black font-malayalam mb-1 ${isSelected ? 'text-black' : 'text-gray-100'}`}>
                  {item.label}
                </div>

                <div className={`text-[11px] leading-tight font-malayalam ${isSelected ? 'text-black/90' : 'text-sky-200/70'}`}>
                  {item.funnyDesc}
                </div>
              </button>
            );
          })}
        </div>

        {/* Custom Amount Button / Box */}
        <div className="bg-gray-900/80 p-4 rounded-2xl border-2 border-gray-700 comic-border max-w-md mx-auto">
          <div className="flex items-center gap-3">
            <div className="text-yellow-400 font-bold text-sm font-malayalam">
              മറ്റേതെങ്കിലും തുക (Custom Amount):
            </div>
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold">
                ₹
              </span>
              <input
                type="number"
                min="1"
                placeholder="eg. 250"
                value={isCustom ? customVal : (selectedAmount && !PRESET_AMOUNTS.some(p => p.amount === selectedAmount) ? selectedAmount : '')}
                onChange={(e) => {
                  setIsCustom(true);
                  handleCustomChange(e);
                }}
                onFocus={() => {
                  setIsCustom(true);
                }}
                className="w-full bg-black border-2 border-gray-600 focus:border-meme-yellow rounded-xl py-2 pl-7 pr-3 text-white font-black text-lg focus:outline-none"
              />
            </div>
          </div>
          <p className="text-[11px] text-gray-400 font-malayalam text-center mt-2">
            ₹10 പോലും എനിക്ക് വലിയ കാര്യമാണ്! നിങ്ങളുടെ സൗകര്യം പോലെ നൽകാം! 🙏
          </p>
        </div>

      </div>
    </section>
  );
}
