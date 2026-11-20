import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FundraisingProgress from './components/FundraisingProgress';
import DonationSection from './components/DonationSection';
import QRPaymentSection from './components/QRPaymentSection';
import ThankYouSection from './components/ThankYouSection';
import AdminModal from './components/AdminModal';
import BrokeModal from './components/BrokeModal';
import ConfirmationModal from './components/ConfirmationModal';
import Snowfall from './components/Snowfall';
import { loadConfig, saveConfig } from './data/tripConfig';
import { soundFx } from './utils/audio';
import { Heart, Sparkles } from 'lucide-react';

export default function App() {
  const [config, setConfig] = useState(loadConfig);
  const [selectedAmount, setSelectedAmount] = useState(50); // ₹50 default
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isBrokeOpen, setIsBrokeOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [paidAmount, setPaidAmount] = useState(50);
  const [showStickyBar, setShowStickyBar] = useState(false);

  // Monitor scroll for mobile sticky bar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowStickyBar(true);
      } else {
        setShowStickyBar(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSaveConfig = (newConfig) => {
    saveConfig(newConfig);
    setConfig(newConfig);
  };

  const scrollToDonate = () => {
    const el = document.getElementById('donate');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToQR = () => {
    const el = document.getElementById('qr-payment');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePaymentCompleted = (amount) => {
    setPaidAmount(amount);
    setIsConfirmationOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#060e20] via-[#091b38] to-[#040916] text-white relative selection:bg-cyan-400 selection:text-black">
      
      {/* Snowfall Effect */}
      <Snowfall />

      {/* Background Subtle Frost Pattern */}
      <div className="fixed inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:32px_32px] opacity-15 pointer-events-none" />

      {/* Floating Animated Winter Particles */}
      <div className="floating-bg-item left-[8%] [animation-delay:0s]">❄️</div>
      <div className="floating-bg-item left-[22%] [animation-delay:4s]">🏔️</div>
      <div className="floating-bg-item left-[42%] [animation-delay:2s]">🚌</div>
      <div className="floating-bg-item left-[65%] [animation-delay:6s]">⛄</div>
      <div className="floating-bg-item left-[80%] [animation-delay:8s]">🌨️</div>
      <div className="floating-bg-item left-[92%] [animation-delay:11s]">💸</div>

      {/* Navbar */}
      <Navbar 
        onOpenAdmin={() => setIsAdminOpen(true)}
        onDonateClick={scrollToDonate}
      />

      <main className="relative z-10">
        {/* Hero Section */}
        <Hero 
          config={config}
          onDonateClick={scrollToDonate}
          onBrokeClick={() => setIsBrokeOpen(true)}
          onWillDonateClick={scrollToDonate}
        />

        {/* Live Progress Bar Section */}
        <FundraisingProgress config={config} />

        {/* Donation Amount Picker */}
        <DonationSection 
          selectedAmount={selectedAmount}
          setSelectedAmount={setSelectedAmount}
          onAmountPicked={() => scrollToQR()}
        />

        {/* QR Code Payment Section */}
        <QRPaymentSection 
          config={config}
          selectedAmount={selectedAmount}
          onPaymentCompleted={handlePaymentCompleted}
        />

        {/* Thank You Section */}
        <ThankYouSection 
          config={config}
          onDonateClick={scrollToDonate}
        />
      </main>

      {/* Mobile Sticky Quick Donate Bar */}
      {showStickyBar && (
        <div className="fixed bottom-0 left-0 right-0 p-3 bg-black/90 backdrop-blur-lg border-t-2 border-meme-yellow md:hidden z-40 flex items-center justify-between gap-3 animate-bounceSlight">
          <div>
            <span className="text-[10px] text-gray-400 block font-malayalam">Advance നാളെ!</span>
            <span className="text-sm font-black text-yellow-300">₹{selectedAmount} സംഭാവന ചെയ്യാം</span>
          </div>
          <button
            onClick={() => {
              soundFx.playCoin();
              scrollToQR();
            }}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-meme-yellow to-meme-orange text-black font-black text-xs comic-border flex items-center gap-1.5 shadow-lg active:scale-95"
          >
            <Sparkles className="w-4 h-4 text-black" />
            <span>സ്കാൻ ചെയ്ത് നൽകാം 💸</span>
          </button>
        </div>
      )}

      {/* Modals */}
      <AdminModal 
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        config={config}
        onSaveConfig={handleSaveConfig}
      />

      <BrokeModal 
        isOpen={isBrokeOpen}
        onClose={() => setIsBrokeOpen(false)}
        config={config}
        onDonateClick={scrollToDonate}
      />

      <ConfirmationModal 
        isOpen={isConfirmationOpen}
        onClose={() => setIsConfirmationOpen(false)}
        amount={paidAmount}
        config={config}
      />

    </div>
  );
}
