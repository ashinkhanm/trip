import React, { useState } from 'react';
import { Share2, Copy, Check, MessageCircle, Heart, Laugh } from 'lucide-react';
import { soundFx } from '../utils/audio';

export default function InteractiveFeatures({ config, onDonateClick, onBrokeClick }) {
  const [copiedLink, setCopiedLink] = useState(false);

  // WhatsApp share handler
  const handleWhatsAppShare = () => {
    soundFx.playClick();
    const siteUrl = window.location.href;
    const msg = `എന്റെ കോളേജ് ട്രിപ്പിനായി (Delhi, Manali - 10 Days) ₹20,000 വേണം. നാളെ ₹6,000 advance കൊടുക്കണം. പ്രിയപ്പെട്ട കുടുംബക്കാരേ, കഴിയുന്ന ചെറിയ തുക പോലും എനിക്ക് വലിയ സഹായമാണ്! 😂❤️\n\nഇവിടെ സഹായിക്കാം: ${siteUrl}`;
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(msg)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleCopyLink = () => {
    soundFx.playClick();
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <section className="py-12 px-4 bg-gradient-to-b from-transparent via-gray-900/40 to-transparent">
      <div className="max-w-4xl mx-auto">
        
        {/* Share & Support Card */}
        <div className="bg-gradient-to-r from-gray-900 via-purple-950/40 to-gray-900 rounded-3xl p-6 md:p-8 border-3 border-gray-700 comic-border-lg text-center">
          
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-green-500 to-emerald-400 flex items-center justify-center mx-auto mb-4 text-2xl comic-border">
            💬
          </div>

          <h2 className="text-2xl md:text-3xl font-black font-malayalam text-white mb-2">
            പൈസ തരാൻ പറ്റിയില്ലെങ്കിലും ഫാമിലി ഗ്രൂപ്പിൽ ഒന്ന് ഷെയർ ചെയ്യണേ! 😭
          </h2>
          
          <p className="text-sm md:text-base text-gray-300 font-malayalam max-w-lg mx-auto mb-6">
            നമ്മുടെ കുടുംബ ഗ്രൂപ്പിലോ ബന്ധുക്കളുടെ ഇടയിലോ ഒന്ന് ഷെയർ ചെയ്താൽ, ഏതേലും ഒരു സുമനസ്സ് എന്നെ സഹായിക്കും!
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 mb-6">
            {/* WhatsApp Share */}
            <button
              onClick={handleWhatsAppShare}
              className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-[#25D366] hover:bg-[#20ba59] text-white font-black text-sm md:text-base comic-border hover:scale-105 active:scale-95 transition shadow-lg shadow-green-600/30"
            >
              <MessageCircle className="w-5 h-5 fill-white" />
              <span>WhatsApp-ൽ ഷെയർ ചെയ്യാം</span>
            </button>

            {/* Copy Link */}
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-gray-800 hover:bg-gray-700 text-yellow-300 font-bold text-sm md:text-base border border-gray-600 comic-border active:scale-95 transition"
            >
              {copiedLink ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
              <span>{copiedLink ? 'ലിങ്ക് കോപ്പിയായി! 📋' : 'Copy Website Link'}</span>
            </button>
          </div>

          {/* Quick interactive buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-4 border-t border-gray-800">
            <button
              onClick={() => {
                soundFx.playSadTrombone();
                onBrokeClick();
              }}
              className="px-4 py-2 rounded-xl bg-red-950/60 hover:bg-red-900/60 text-red-300 border border-red-500/30 text-xs font-bold transition flex items-center gap-1.5"
            >
              <span>I AM BROKE 😭</span>
            </button>
            <button
              onClick={() => {
                soundFx.playCoin();
                onDonateClick();
              }}
              className="px-4 py-2 rounded-xl bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-300 border border-yellow-500/40 text-xs font-bold transition flex items-center gap-1.5"
            >
              <Heart className="w-3.5 h-3.5 fill-yellow-400" />
              <span>I WILL DONATE ❤️</span>
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
