import React, { useState } from 'react';
import { X, Share2, Heart } from 'lucide-react';
import { soundFx } from '../utils/audio';

export default function BrokeModal({ isOpen, onClose, config, onDonateClick }) {
  if (!isOpen) return null;

  // Pick a random broke dialog
  const dialogs = (config && config.brokeDialogs && config.brokeDialogs.length > 0) 
    ? config.brokeDialogs 
    : ["കുടുംബത്തിലെ സുമനസ്സുകൾ വിചാരിച്ചാൽ എന്നെ മണാലിയിൽ എത്തിക്കാം! ഒരു ഷെയറെങ്കിലും ചെയ്യൂ! 😂❤️"];
  const randomIndex = Math.floor(Math.random() * dialogs.length);
  const message = dialogs[randomIndex];

  const handleShare = () => {
    soundFx.playClick();
    const siteUrl = window.location.href;
    const msg = `എന്റെ കോളേജ് ട്രിപ്പിനായി (Delhi, Manali - 10 Days) ₹20,000 വേണം. നാളെ ₹6,000 advance കൊടുക്കണം. പ്രിയപ്പെട്ട കുടുംബക്കാരേ, കഴിയുന്ന ചെറിയ തുക പോലും എനിക്ക് വലിയ സഹായമാണ്! 😂❤️\n\nഇവിടെ സഹായിക്കാം: ${siteUrl}`;
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(msg)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-gray-900 border-4 border-yellow-400 rounded-3xl p-6 md:p-8 max-w-md w-full comic-border-lg relative text-center">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Crying Meme / Icon */}
        <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-yellow-500 to-red-500 flex items-center justify-center mx-auto mb-4 text-3xl comic-border animate-wiggle">
          😭
        </div>

        <h3 className="text-2xl font-black font-malayalam text-white mb-2">
          "പാവം! നിന്റെ കയ്യിലും കാശില്ലേ?"
        </h3>

        <div className="bg-black/60 rounded-2xl p-4 border border-gray-800 my-4">
          <p className="text-sm md:text-base font-bold font-malayalam text-yellow-300 leading-relaxed">
            "{message}"
          </p>
        </div>

        <p className="text-xs text-gray-400 font-malayalam mb-6">
          ഒരു രൂപ തന്നില്ലെങ്കിലും കുഴപ്പമില്ല, നമ്മുടെ ഫാമിലി WhatsApp ഗ്രൂപ്പിലേക്ക് ഇതൊന്ന് ഫോർവേഡ് ചെയ്യണേ! ❤️
        </p>

        <div className="space-y-3">
          <button
            onClick={handleShare}
            className="w-full py-3.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-black text-sm comic-border flex items-center justify-center gap-2 shadow-lg"
          >
            <Share2 className="w-5 h-5" />
            <span>WhatsApp-ൽ ഷെയർ ചെയ്യാം</span>
          </button>

          <button
            onClick={() => {
              onClose();
              soundFx.playCoin();
              onDonateClick();
            }}
            className="w-full py-2.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-yellow-400 font-bold text-xs"
          >
            മനസ്സ് മാറി... ഒരു ₹10 തരാം! ❤️
          </button>
        </div>

      </div>
    </div>
  );
}
