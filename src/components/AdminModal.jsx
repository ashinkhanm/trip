import React, { useState } from 'react';
import { X, Lock, Check, RefreshCw, AlertCircle, Save } from 'lucide-react';
import { soundFx } from '../utils/audio';

export default function AdminModal({ isOpen, onClose, config, onSaveConfig }) {
  const [pin, setPin] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [formData, setFormData] = useState({ ...config });
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [pinError, setPinError] = useState(false);

  // Default admin PIN for the trip coordinator
  const ADMIN_PIN = '1234';

  if (!isOpen) return null;

  const handleLogin = (e) => {
    e.preventDefault();
    if (pin === ADMIN_PIN) {
      soundFx.playCelebration();
      setIsAuthenticated(true);
      setPinError(false);
      setFormData({ ...config });
    } else {
      soundFx.playSadTrombone();
      setPinError(true);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    soundFx.playCoin();
    onSaveConfig({
      ...formData,
      totalBudget: Number(formData.totalBudget) || 20000,
      advanceTarget: Number(formData.advanceTarget) || 6000,
      currentCollected: Number(formData.currentCollected) || 0
    });
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-gray-900 border-4 border-yellow-400 rounded-3xl p-6 md:p-8 max-w-lg w-full comic-border-lg relative my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="flex items-center gap-2 mb-6">
          <div className="p-2 bg-yellow-400 text-black rounded-xl font-black">
            ⚙️
          </div>
          <div>
            <h3 className="text-xl font-black text-white">Trip Admin Configuration</h3>
            <p className="text-xs text-gray-400">Manage verified donations & details</p>
          </div>
        </div>

        {/* PIN Screen */}
        {!isAuthenticated ? (
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="p-4 bg-black/50 border border-gray-800 rounded-2xl text-center">
              <Lock className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
              <p className="text-xs text-gray-300 font-malayalam mb-3">
                കോളേജ് ട്രിപ്പ് കോർഡിനേറ്റർമാർക്ക് മാത്രമുള്ള അഡ്മിൻ പാനൽ.
              </p>
              <p className="text-[11px] text-gray-500 mb-3">
                Default PIN: <code className="bg-gray-800 text-yellow-300 px-1.5 py-0.5 rounded">1234</code>
              </p>
              <input
                type="password"
                placeholder="Enter 4-digit PIN"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                maxLength={6}
                className="w-full text-center tracking-widest text-xl bg-gray-950 border-2 border-gray-700 focus:border-yellow-400 rounded-xl py-2 px-4 text-white font-mono focus:outline-none"
              />
              {pinError && (
                <p className="text-xs text-red-400 font-bold mt-2">
                  തെറ്റായ PIN! വീണ്ടും ശ്രമിക്കുക.
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-black font-black text-sm comic-border transition"
            >
              Unlock Admin Settings
            </button>
          </form>
        ) : (
          /* Form for Editing Details */
          <form onSubmit={handleSave} className="space-y-4">
            
            {/* Current Collected Amount */}
            <div className="bg-green-950/30 p-3 rounded-xl border border-green-500/30">
              <label className="block text-xs font-bold text-green-300 mb-1">
                ഇതുവരെ ലഭിച്ച തുക (Verified Collected Amount ₹):
              </label>
              <input
                type="number"
                min="0"
                value={formData.currentCollected}
                onChange={(e) => setFormData({ ...formData, currentCollected: e.target.value })}
                className="w-full bg-black border-2 border-green-500/50 rounded-lg p-2 text-white font-mono font-bold"
              />
              <span className="text-[10px] text-gray-400 block mt-1">
                Google Pay-ൽ തുക എത്തുമ്പോൾ ഇവിടെ കൂട്ടി കൊടുക്കുക.
              </span>
            </div>

            {/* Total Budget & Advance */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">
                  Total Budget (₹):
                </label>
                <input
                  type="number"
                  value={formData.totalBudget}
                  onChange={(e) => setFormData({ ...formData, totalBudget: e.target.value })}
                  className="w-full bg-black border border-gray-700 rounded-lg p-2 text-white font-mono font-bold text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-orange-400 mb-1">
                  Urgent Advance (₹):
                </label>
                <input
                  type="number"
                  value={formData.advanceTarget}
                  onChange={(e) => setFormData({ ...formData, advanceTarget: e.target.value })}
                  className="w-full bg-black border border-gray-700 rounded-lg p-2 text-white font-mono font-bold text-sm"
                />
              </div>
            </div>

            {/* UPI ID & Payee Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">
                  UPI ID:
                </label>
                <input
                  type="text"
                  value={formData.upiId}
                  onChange={(e) => setFormData({ ...formData, upiId: e.target.value })}
                  className="w-full bg-black border border-gray-700 rounded-lg p-2 text-white font-mono text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">
                  Payee Name:
                </label>
                <input
                  type="text"
                  value={formData.payeeName}
                  onChange={(e) => setFormData({ ...formData, payeeName: e.target.value })}
                  className="w-full bg-black border border-gray-700 rounded-lg p-2 text-white text-xs"
                />
              </div>
            </div>

            {/* Trip Destination */}
            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1">
                Trip Destination:
              </label>
              <input
                type="text"
                value={formData.tripDestination}
                onChange={(e) => setFormData({ ...formData, tripDestination: e.target.value })}
                className="w-full bg-black border border-gray-700 rounded-lg p-2 text-white text-xs"
              />
            </div>

            {/* Save Buttons */}
            <div className="pt-2 flex items-center gap-3">
              <button
                type="submit"
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-meme-yellow to-meme-orange text-black font-black text-sm comic-border flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition"
              >
                {saveSuccess ? <Check className="w-4 h-4 text-black" /> : <Save className="w-4 h-4" />}
                <span>{saveSuccess ? 'Saved Successfully!' : 'Save Changes'}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  soundFx.playClick();
                  onClose();
                }}
                className="px-4 py-3 rounded-xl bg-gray-800 text-gray-300 text-xs font-bold hover:bg-gray-700"
              >
                Cancel
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
}
