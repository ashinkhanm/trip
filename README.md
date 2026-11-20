# 🚌 Operation College Trip (Delhi - Manali Edition) 🏔️❄️

> **"കോളേജ് ഐവി സംഭാവനകൾ സ്വീകരിക്കുന്നു 🙏💸"**  
> *A funny, interactive, mobile-first fundraising website built with React, Vite, and Tailwind CSS for Ashin's 10-day college trip to Delhi and Manali.*

---

## ❄️ Features

- **🏔️ Manali Winter Snow Theme:** Real-time falling snowfall particles, alpine color gradients, and frosted glass cards (`ice-card`, `comic-border-ice`).
- **📊 Transparent Live Progress Tracker:** 
  - Dual tracker for the urgent ₹6,000 advance payment and the ₹20,000 total trip budget.
  - Automatically calculates remaining balance and completion percentages.
- **📱 Instant Scan & Pay (UPI):** 
  - Integrated QR Code for direct payments to `ashinkhanm10@okicici`.
  - One-click copy UPI ID button.
  - Mobile deep linking (`upi://pay`) for one-tap payments via GPay, PhonePe, and Paytm.
- **☕ Winter-Themed Malayalam Donation Tiers:**
  - ₹10 (ചൂട് ചായ ☕❄️)
  - ₹20 (ചായയും പരിപ്പുവടയും ☕🧆)
  - ₹50 (മണാലി മാഗി 🍜⛷️ - Popular)
  - ₹100 (മഞ്ഞിലെ ഫോട്ടോ 📸❄️)
  - ₹200 (വിന്റർ ജാക്കറ്റ് 🧥🧤)
  - ₹500 (ജീപ്പ് സഫാരി 🚙🏔️)
  - Custom amount input
- **🎉 Interactive Confetti & Audio Effects:** 
  - Built-in Web Audio API synthesizer for retro coin chimes and celebratory fanfare.
  - Full-screen confetti blast when payment is confirmed with direct WhatsApp screenshot sharing.
- **🔒 In-App Admin Panel:**
  - Secure PIN-protected panel (Default PIN: `1234`) to update verified donation amounts, targets, and dates on the fly.

---

## 🛠️ Tech Stack

- **Framework:** React 18
- **Bundler:** Vite 6
- **Styling:** Tailwind CSS 3
- **Icons:** Lucide React
- **Celebration:** Canvas Confetti
- **Audio:** Web Audio API (Zero external audio file dependencies)
- **Fonts:** Manjari, Gayathri, Plus Jakarta Sans

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Visit `http://localhost:3000` in your browser.

### 3. Build for Production
```bash
npm run build
```

---

## ⚙️ Configuration & Customization

All trip parameters (UPI ID, payee name, trip destination, targets, and initial amounts) are organized in:
`src/data/tripConfig.js`

You can also update live verified donations directly on the live website by clicking the **Config** button in the top navigation (PIN: `1234`).
