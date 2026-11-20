// Web Audio API Synthesizer for meme sound effects (zero external audio file dependencies)

class SoundFX {
  constructor() {
    this.ctx = null;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Retro Coin Ding (Amount selected)
  playCoin() {
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      const now = this.ctx.currentTime;
      osc.frequency.setValueAtTime(987.77, now); // B5
      osc.frequency.setValueAtTime(1318.51, now + 0.08); // E6

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.35);
    } catch (e) {
      console.log('Audio not allowed yet', e);
    }
  }

  // Sad Wah-Wah (I am broke)
  playSadTrombone() {
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const notes = [261.63, 246.94, 233.08, 207.65]; // C4, B3, Bb3, Ab3
      const duration = 0.22;

      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';

        const startTime = now + (idx * duration);
        osc.frequency.setValueAtTime(freq, startTime);
        
        // Add wobble/vibrato on last note
        if (idx === notes.length - 1) {
          osc.frequency.linearRampToValueAtTime(freq - 15, startTime + 0.6);
        }

        gain.gain.setValueAtTime(0.15, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + (idx === notes.length - 1 ? 0.7 : duration));

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + (idx === notes.length - 1 ? 0.7 : duration));
      });
    } catch (e) {
      console.log('Audio error', e);
    }
  }

  // Victory / Donation Celebration Fanfare
  playCelebration() {
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      // Arpeggio: C4, E4, G4, C5
      const notes = [
        { f: 523.25, t: 0.08 },
        { f: 659.25, t: 0.16 },
        { f: 783.99, t: 0.24 },
        { f: 1046.50, t: 0.45 }
      ];

      notes.forEach((item, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';

        const startTime = now + (idx * 0.1);
        osc.frequency.setValueAtTime(item.f, startTime);

        gain.gain.setValueAtTime(0.25, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + item.t);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + item.t);
      });
    } catch (e) {
      console.log('Audio error', e);
    }
  }

  // Soft Pop Click
  playClick() {
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(400, now);
      osc.frequency.exponentialRampToValueAtTime(120, now + 0.05);

      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.05);
    } catch (e) {
      // Ignored
    }
  }
}

export const soundFx = new SoundFX();
