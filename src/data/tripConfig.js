// Trip fundraising configuration for Ashin's personal trip with editable local state support
export const DEFAULT_CONFIG = {
  tripTitle: "OPERATION COLLEGE TRIP 😂💸",
  taglineMl: "സംഭാവനകൾ സ്വീകരിക്കുന്നു 🙏💸",
  subheadlineMl: "ഒരു ചെറിയ സഹായം... എന്റെ ജീവിതത്തിലെ വലിയൊരു ഓർമ്മ!",
  englishCaption: "Your ₹50 can save my trip. Your ₹0 will break my heart! 😭💔",
  heroHeadline: "കോളേജ് ഐവി",
  heroSubheadline: "20,000 രൂപയുടെ സ്വപ്നം. 6,000 രൂപയുടെ അടിയന്തരാവശ്യം. Deadline നാളെ!",
  
  // Financial goals
  totalBudget: 20000,
  advanceTarget: 6000,
  advanceDeadlineHours: 24, // 24 hours from now default or specific date
  currentCollected: 0, // Starts at ₹0, editable via Admin
  
  // Payment credentials
  upiId: "ashinkhanm10@okicici",
  payeeName: "Ashin Khan",
  qrImage: "/images/payment-qr.png",
  tripDestination: "Delhi, Manali (10 Days) 🏔️❄️🚌",
  memeGallery: [],
  memeQuotes: [],

  // Broke dialogs for the "I AM BROKE" button (addressed to family)
  brokeDialogs: [
    "അയ്യോ! നിങ്ങളുടെ കയ്യിലും ഇപ്പോൾ കാശില്ലേ? എങ്കിൽ ഈ ലിങ്ക് നമ്മുടെ ഫാമിലി WhatsApp ഗ്രൂപ്പിലേക്ക് ഒന്ന് അയച്ചു കൊടുക്കണേ! 😭📤",
    "കുടുംബത്തിലെ സുമനസ്സുകൾ വിചാരിച്ചാൽ എന്നെ മണാലിയിൽ എത്തിക്കാം! ഒരു ഷെയറെങ്കിലും ചെയ്യൂ! 😂❤️",
    "നിങ്ങൾക്കും ₹13 ബാലൻസ് ആണോ? സാരമില്ല, എന്റെ പ്രാർത്ഥനയിൽ നിങ്ങളും ഉണ്ടാകും! 🤲",
    "കാശില്ലാത്ത കുടുംബാംഗങ്ങൾക്കും സ്വാഗതം! നിങ്ങളുടെ ഒരു WhatsApp ഷെയർ എനിക്ക് ₹500 ന്റെ വിലയുണ്ട്! 📲✨",
    "അളിയാ/ചേട്ടാ/അമ്മാവാ... നിങ്ങളും എന്റെ അതേ കാറ്റഗറി ആണല്ലേ! വേഗം ആ ഗൾഫിലുള്ള മാമന് അയക്ക് ലിങ്ക്! 🤣"
  ]
};

// Storage helper to allow updating values in localStorage
const STORAGE_KEY = 'college_trip_config_v4';

export function loadConfig() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.tripDestination && parsed.tripDestination.includes('Goa')) {
        parsed.tripDestination = DEFAULT_CONFIG.tripDestination;
      }
      return { ...DEFAULT_CONFIG, ...parsed };
    }
  } catch (e) {
    console.warn("Could not load from localStorage", e);
  }
  return DEFAULT_CONFIG;
}

export function saveConfig(newConfig) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newConfig));
  } catch (e) {
    console.error("Could not save to localStorage", e);
  }
}
