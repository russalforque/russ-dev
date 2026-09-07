// Web Audio API subtle click synthesizer for tactile UI/UX feedback
class SoundManager {
  private ctx: AudioContext | null = null;
  private enabled: boolean = false;

  constructor() {
    // Check if user previously enabled sound (default false for quiet dignity)
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('rhazel_sound_enabled');
      this.enabled = stored === 'true';
    }
  }

  public isEnabled(): boolean {
    return this.enabled;
  }

  public setEnabled(val: boolean) {
    this.enabled = val;
    if (typeof window !== 'undefined') {
      localStorage.setItem('rhazel_sound_enabled', String(val));
    }
  }

  public toggle(): boolean {
    this.setEnabled(!this.enabled);
    if (this.enabled) {
      this.playTick();
    }
    return this.enabled;
  }

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public playTick(frequency: number = 800) {
    if (!this.enabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(frequency, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(120, this.ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.03, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.04);
    } catch {
      // Graceful fallback if Web Audio is blocked or unsupported
    }
  }

  public playSuccess() {
    if (!this.enabled) return;
    this.playTick(1200);
    setTimeout(() => this.playTick(1600), 50);
  }
}

export const soundManager = new SoundManager();
