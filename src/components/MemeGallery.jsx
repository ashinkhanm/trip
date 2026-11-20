import React, { useState } from 'react';
import { Laugh, Sparkles, MessageSquareQuote, RefreshCw } from 'lucide-react';
import { soundFx } from '../utils/audio';

export default function MemeGallery({ config, onDonateClick }) {
  const [selectedMeme, setSelectedMeme] = useState(null);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  const nextQuote = () => {
    soundFx.playClick();
    setCurrentQuoteIndex((prev) => (prev + 1) % config.memeQuotes.length);
  };

  const currentQuote = config.memeQuotes[currentQuoteIndex];

  return (
    <section id="memes" className="py-12 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-950/80 border border-purple-500/40 text-purple-300 text-xs font-bold uppercase tracking-wider mb-2">
            <Laugh className="w-3.5 h-3.5 text-yellow-400" />
            <span>ഓഫീഷ്യൽ ട്രിപ്പ് മീം ഗാലറി</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-black font-malayalam text-white">
            ട്രോളുകൾ കൊണ്ട് ട്രിപ്പ് പിടിക്കും! 🎭😂
          </h2>
          <p className="text-sm md:text-base text-yellow-300 font-malayalam max-w-xl mx-auto mt-2">
            "കരച്ചിലും ചിരിയും ഒന്നിച്ചുള്ള എന്റെ അവസ്ഥ... കണ്ടെങ്കിലും ഒരു ₹10 തരണേ!"
          </p>
        </div>

        {/* Dynamic Malayalam Meme Quote Card */}
        <div className="max-w-2xl mx-auto mb-10 bg-gradient-to-r from-purple-950/70 via-gray-900 to-black p-5 rounded-3xl border-2 border-purple-500/40 comic-border relative">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-purple-300 font-bold flex items-center gap-1.5">
              <MessageSquareQuote className="w-4 h-4 text-yellow-400" />
              <span>റാൻഡം ട്രിപ്പ് ഡയലോഗ് ജനറേറ്റർ</span>
            </span>
            <button
              onClick={nextQuote}
              className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg bg-purple-900/60 hover:bg-purple-800 text-yellow-300 transition border border-purple-600/40 active:scale-95"
            >
              <RefreshCw className="w-3 h-3" />
              <span>വേറൊരെണ്ണം!</span>
            </button>
          </div>

          <div className="bg-black/60 rounded-2xl p-4 text-center border border-gray-800">
            <p className="text-base sm:text-lg md:text-xl font-bold font-malayalam text-yellow-300 mb-2">
              "{currentQuote.quote}"
            </p>
            <span className="text-xs text-gray-400 font-medium">
              — {currentQuote.character} {currentQuote.emoji}
            </span>
          </div>
        </div>

        {/* Meme Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {config.memeGallery.map((item, idx) => (
            <div
              key={item.id || idx}
              onClick={() => setSelectedMeme(item)}
              className="group cursor-pointer bg-gray-900/90 rounded-3xl border-3 border-gray-800 hover:border-meme-yellow p-4 comic-border transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
            >
              {/* Image Container */}
              <div>
                <div className="relative rounded-2xl overflow-hidden bg-black aspect-video mb-3">
                  <img
                    src={item.image}
                    alt={item.caption}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.target.src = "/images/jayaram.jpg";
                    }}
                  />
                  {/* Badge */}
                  <span className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md text-[10px] font-black uppercase text-yellow-400 border border-yellow-400/40">
                    {item.badge || "Meme"}
                  </span>
                </div>

                {/* Caption */}
                <h3 className="font-black text-sm md:text-base font-malayalam text-white mb-1.5 line-clamp-2 group-hover:text-yellow-400 transition-colors">
                  {item.caption}
                </h3>

                {item.subcaption && (
                  <p className="text-xs text-gray-400 font-malayalam line-clamp-2">
                    {item.subcaption}
                  </p>
                )}
              </div>

              {/* Bottom Quick Trigger */}
              <div className="mt-4 pt-3 border-t border-gray-800/80 flex items-center justify-between text-xs">
                <span className="text-yellow-400/80 font-bold">Zoom മീം 🔍</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    soundFx.playCoin();
                    onDonateClick();
                  }}
                  className="px-2.5 py-1 rounded-lg bg-meme-yellow/20 hover:bg-meme-yellow hover:text-black text-yellow-300 font-bold transition text-[11px]"
                >
                  ഇതിനായി ₹10 തരാം 💸
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for viewing full meme */}
        {selectedMeme && (
          <div
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setSelectedMeme(null)}
          >
            <div
              className="bg-gray-900 border-4 border-meme-yellow rounded-3xl p-4 max-w-lg w-full comic-border-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="rounded-2xl overflow-hidden mb-4 bg-black">
                <img
                  src={selectedMeme.image}
                  alt={selectedMeme.caption}
                  className="w-full max-h-[60vh] object-contain mx-auto"
                />
              </div>

              <h4 className="text-lg md:text-xl font-black font-malayalam text-yellow-300 mb-2 text-center">
                {selectedMeme.caption}
              </h4>
              <p className="text-sm text-gray-300 font-malayalam text-center mb-6">
                {selectedMeme.subcaption}
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    soundFx.playCoin();
                    setSelectedMeme(null);
                    onDonateClick();
                  }}
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-meme-yellow to-meme-orange text-black font-black text-sm comic-border"
                >
                  ഇത് കണ്ടിട്ട് കരച്ചിൽ വന്നു... DONATE NOW 💸
                </button>
                <button
                  onClick={() => setSelectedMeme(null)}
                  className="px-4 py-3 rounded-xl bg-gray-800 text-gray-300 font-bold text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
