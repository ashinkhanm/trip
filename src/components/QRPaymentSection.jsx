import React, { useState } from 'react';
import { QrCode, Copy, Check, ExternalLink, ShieldAlert, CheckCircle2, ArrowRight } from 'lucide-react';
import { soundFx } from '../utils/audio';

export default function QRPaymentSection({ config, selectedAmount, onPaymentCompleted }) {
  const [copied, setCopied] = useState(false);

  // Construct UPI deep link for mobile apps
  const upiDeepLink = `upi://pay?pa=${config.upiId}&pn=${encodeURIComponent(config.payeeName)}&am=${selectedAmount}&cu=INR&tn=${encodeURIComponent('Ashin Trip Fund')}`;

  const handleCopyUpi = () => {
    soundFx.playClick();
    navigator.clipboard.writeText(config.upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="qr-payment" className="py-10 px-4">
      <div className="max-w-2xl mx-auto bg-slate-900/90 border-4 border-cyan-400 rounded-3xl p-6 md:p-8 comic-border-ice shadow-[0_0_35px_rgba(56,189,248,0.2)] relative">
        
        {/* Section Header */}
        <div className="text-center mb-6">
          <span className="inline-block px-3 py-1 rounded-full bg-cyan-400 text-slate-950 font-black text-xs uppercase tracking-wider mb-2 shadow">
            STEP 2: SCAN & PAY ❄️
          </span>
          <h2 className="text-2xl md:text-3xl font-black font-malayalam text-white">
            തുക സ്കാൻ ചെയ്ത് അടയ്ക്കാം 📱💸
          </h2>
          <p className="text-sm text-sky-200 font-malayalam mt-1">
            GPay, PhonePe, Paytm അല്ലെങ്കിൽ ഏത് UPI ആപ്പും ഉപയോഗിക്കാം!
          </p>
        </div>

        {/* Selected Amount Banner */}
        <div className="bg-slate-950/80 rounded-2xl p-4 border border-cyan-400/40 mb-6 flex items-center justify-between shadow-inner">
          <div>
            <span className="text-xs text-sky-300/80 block font-malayalam">തിരഞ്ഞെടുത്ത സംഭാവന തുക:</span>
            <span className="text-2xl md:text-3xl font-black text-cyan-300">
              ₹{selectedAmount.toLocaleString('en-IN')}
            </span>
          </div>
          <div className="text-right">
            <span className="text-xs text-green-400 font-bold block">100% നേരിട്ട് എത്തുന്നു</span>
            <span className="text-[11px] text-gray-400 font-malayalam">Payee: {config.payeeName}</span>
          </div>
        </div>

        {/* QR Code Container */}
        <div className="bg-white p-5 rounded-2xl max-w-[280px] mx-auto text-center shadow-2xl mb-6 relative">
          <div className="rounded-xl overflow-hidden border-2 border-gray-200">
            <img 
              src={config.qrImage || "/images/payment-qr.png"} 
              alt="UPI Payment QR Code"
              className="w-full h-auto object-contain mx-auto"
              onError={(e) => {
                // Fallback to placeholder if missing
                e.target.src = "/images/payment-qr.png";
              }}
            />
          </div>
          <p className="text-gray-700 text-xs font-bold mt-2 font-malayalam">
            Scan to pay with any UPI App
          </p>
          <p className="text-gray-500 text-[10px]">
            Google Pay • PhonePe • Paytm • BHIM
          </p>
        </div>

        {/* Mobile Direct Pay Button (Deep Link) */}
        <div className="block sm:hidden mb-5">
          <a
            href={upiDeepLink}
            onClick={() => soundFx.playCoin()}
            className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg active:scale-95 transition"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Open UPI App to Pay ₹{selectedAmount}</span>
          </a>
          <p className="text-[11px] text-center text-gray-400 mt-1">
            (PhonePe, GPay, Paytm നേരിട്ട് തുറക്കാൻ ക്ലിക്ക് ചെയ്യുക)
          </p>
        </div>

        {/* UPI Details Box */}
        <div className="bg-black/60 rounded-2xl p-4 border border-gray-800 space-y-3 mb-6">
          <div className="flex items-center justify-between text-xs md:text-sm">
            <span className="text-gray-400">Payee Name:</span>
            <span className="font-bold text-white font-mono">{config.payeeName}</span>
          </div>

          <div className="flex items-center justify-between text-xs md:text-sm pt-2 border-t border-gray-800">
            <span className="text-gray-400">UPI ID:</span>
            <div className="flex items-center gap-2">
              <span className="font-mono text-yellow-300 font-bold text-xs md:text-sm bg-gray-900 px-2 py-1 rounded">
                {config.upiId}
              </span>
              <button
                onClick={handleCopyUpi}
                className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg bg-yellow-400 text-black font-bold hover:bg-yellow-300 active:scale-95 transition"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-green-900" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Payment Completed Button */}
        <div className="space-y-3">
          <button
            onClick={() => {
              soundFx.playCelebration();
              onPaymentCompleted(selectedAmount);
            }}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-meme-yellow via-yellow-300 to-meme-orange text-black font-black text-base md:text-lg comic-border hover:scale-[1.02] active:scale-95 transition shadow-xl flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-6 h-6 text-black" />
            <span>ഞാൻ പൈസ അയച്ചു! (Payment Completed) 🎉</span>
          </button>

          {/* Verification Disclaimer */}
          <div className="flex items-start gap-2 p-3 rounded-xl bg-yellow-950/40 border border-yellow-500/30 text-yellow-200/90 text-xs font-malayalam">
            <ShieldAlert className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
            <span>
              <strong>ശ്രദ്ധിക്കുക:</strong> പേയ്‌മെന്റ് വെരിഫിക്കേഷൻ പൂർണ്ണമായും ഓട്ടോമാറ്റിക് അല്ല. നിങ്ങൾ പണം അയച്ച ശേഷം കൺഫേം ചെയ്യുമ്പോൾ എനിക്ക് സ്ക്രീൻഷോട്ട് അയച്ചുതന്നാൽ ഞാൻ ലൈവ് പ്രോഗ്രസ്സിൽ തുക ചേർക്കുന്നതാണ്! ❤️
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
