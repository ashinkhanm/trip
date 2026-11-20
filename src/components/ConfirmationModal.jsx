import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, MessageCircle, X, HeartHandshake } from 'lucide-react';
import { soundFx } from '../utils/audio';

export default function ConfirmationModal({ isOpen, onClose, amount, config }) {
  useEffect(() => {
    if (isOpen) {
      soundFx.playCelebration();
      // Confetti burst
      try {
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#FFDE00', '#FF5722', '#7928CA', '#00F5D4']
        });
      } catch (e) {
        // ignore
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSendScreenshot = () => {
    soundFx.playClick();
    const msg = `ഹായ് ${config.payeeName}, ഞാൻ നിന്റെ ഡൽഹി-മണാലി ട്രിപ്പ് ഫണ്ടിലേക്ക് ₹${amount} അയച്ചിട്ടുണ്ട്! ഇതാ പേയ്‌മെന്റ് സ്ക്രീൻഷോട്ട്: 📸`;
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(msg)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-gray-900 border-4 border-green-500 rounded-3xl p-6 md:p-8 max-w-md w-full comic-border-lg relative text-center">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Celebration Icon */}
        <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-green-500 to-emerald-400 flex items-center justify-center mx-auto mb-4 text-3xl comic-border">
          🎉
        </div>

        {/* Headline */}
        <h3 className="text-2xl md:text-3xl font-black font-malayalam text-white mb-2">
          നിങ്ങൾ എന്റെ രക്ഷകനാണ്! ❤️😭
        </h3>

        <div className="bg-green-950/40 border border-green-500/40 rounded-2xl p-3 my-4">
          <span className="text-xs text-green-300 font-bold block font-malayalam">നിങ്ങൾ നൽകിയ സ്നേഹ സംഭാവന:</span>
          <span className="text-3xl font-black text-green-400">₹{amount}</span>
        </div>

        {/* Important Instructions regarding verification */}
        <p className="text-sm text-gray-300 font-malayalam leading-relaxed mb-6">
          <strong>ശ്രദ്ധിക്കുക:</strong> പേയ്‌മെന്റ് ബാങ്കിൽ നിന്ന് വെരിഫൈ ചെയ്ത് ലൈവ് പ്രോഗ്രസ് ബാറിൽ തുക ചേർക്കാൻ, ദയവായി ട്രാൻസാക്ഷൻ സ്ക്രീൻഷോട്ട് WhatsApp വഴി എനിക്ക് അയച്ചുതരൂ!
        </p>

        {/* Action Button */}
        <div className="space-y-3">
          <button
            onClick={handleSendScreenshot}
            className="w-full py-3.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-black text-sm md:text-base comic-border flex items-center justify-center gap-2 shadow-lg"
          >
            <MessageCircle className="w-5 h-5 fill-white" />
            <span>WhatsApp-ൽ സ്ക്രീൻഷോട്ട് അയക്കാം 📲</span>
          </button>

          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-gray-800 text-gray-300 font-bold text-xs hover:bg-gray-700"
          >
            Done / പൂർത്തിയായി
          </button>
        </div>

      </div>
    </div>
  );
}
