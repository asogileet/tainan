/**
 * Procedural Web Audio API soundscape generator for Tainan Drone Light Show
 * Synthesizes atmospheric night breeze, multi-drone motor harmonic hum,
 * temple bells for the Confucian Temple, oceanic waves for Fort Zeelandia,
 * and celebration firework sparkles.
 */

class DroneSoundscape {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = true;
  private masterGain: GainNode | null = null;
  private droneHumGain: GainNode | null = null;
  private droneOscillators: OscillatorNode[] = [];
  private ambientNoiseNode: AudioNode | null = null;

  public init() {
    if (this.ctx) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.4, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      this.setupDroneSwarmHum();
      this.setupNightAtmosphere();
    } catch {
      // AudioContext not allowed before user gesture
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (!this.ctx) {
      this.init();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    if (this.masterGain && this.ctx) {
      const targetGain = muted ? 0.0 : 0.35;
      this.masterGain.gain.cancelScheduledValues(this.ctx.currentTime);
      this.masterGain.gain.linearRampToValueAtTime(targetGain, this.ctx.currentTime + 0.3);
    }
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  private setupDroneSwarmHum() {
    if (!this.ctx || !this.masterGain) return;

    this.droneHumGain = this.ctx.createGain();
    this.droneHumGain.gain.setValueAtTime(0.08, this.ctx.currentTime);

    // Filter to simulate muffled brushless motor sound at 120m altitude
    const bpf = this.ctx.createBiquadFilter();
    bpf.type = 'bandpass';
    bpf.frequency.setValueAtTime(145, this.ctx.currentTime);
    bpf.Q.setValueAtTime(1.8, this.ctx.currentTime);

    // Multi-drone chorus (drone motors produce frequencies around 110Hz to 160Hz with slight detune)
    const baseFreqs = [112, 114.5, 138, 141.2, 168];
    baseFreqs.forEach((freq) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      // Micro LFO for wind drift fluctuation
      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      lfo.frequency.setValueAtTime(0.3 + Math.random() * 0.4, this.ctx.currentTime);
      lfoGain.gain.setValueAtTime(1.5, this.ctx.currentTime);
      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);
      lfo.start();

      osc.connect(bpf);
      osc.start();
      this.droneOscillators.push(osc);
    });

    bpf.connect(this.droneHumGain);
    this.droneHumGain.connect(this.masterGain);
  }

  private setupNightAtmosphere() {
    if (!this.ctx || !this.masterGain) return;

    // Pink/Brown noise filtered for soft coastal night wind
    const bufferSize = this.ctx.sampleRate * 2;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      output[i] = (b0 + b1 + b2) * 0.05;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    const windFilter = this.ctx.createBiquadFilter();
    windFilter.type = 'lowpass';
    windFilter.frequency.setValueAtTime(320, this.ctx.currentTime);

    const windGain = this.ctx.createGain();
    windGain.gain.setValueAtTime(0.06, this.ctx.currentTime);

    whiteNoise.connect(windFilter);
    windFilter.connect(windGain);
    windGain.connect(this.masterGain);
    whiteNoise.start();
    this.ambientNoiseNode = whiteNoise;
  }

  // Play a musical landmark transition chime
  public playLandmarkChime(chapterId: string) {
    if (!this.ctx || this.isMuted || !this.masterGain) return;
    const now = this.ctx.currentTime;

    if (chapterId === 'confucian-temple') {
      // Ancient stone chime (特磬) / temple bell pentatonic chord (宮商角徵羽 - F G A C D)
      const freqs = [349.23, 440.0, 523.25, 698.46]; // F4, A4, C5, F5
      freqs.forEach((freq, idx) => {
        if (!this.ctx || !this.masterGain) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);

        gain.gain.setValueAtTime(0.12 / (idx + 1), now + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.5 + idx * 0.2);

        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start(now + idx * 0.08);
        osc.stop(now + 4.0);
      });
    } else if (chapterId === 'zeelandia') {
      // Maritime brass bell + ocean swell synth
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, now);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.0);
      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(now);
      osc.stop(now + 3.2);
    } else if (chapterId === 'tainan-400') {
      // Grand celebratory chime chord
      const freqs = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      freqs.forEach((freq, idx) => {
        if (!this.ctx || !this.masterGain) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.06);

        gain.gain.setValueAtTime(0.14, now + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.5);

        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start(now + idx * 0.06);
        osc.stop(now + 2.8);
      });
    } else {
      // Gentle soft starlight transition beep
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, now);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);
      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(now);
      osc.stop(now + 1.3);
    }
  }

  // Sparkle / Firework pop
  public playSparkle() {
    if (!this.ctx || this.isMuted || !this.masterGain) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1200 + Math.random() * 800, now);
    osc.frequency.exponentialRampToValueAtTime(400, now + 0.15);

    gain.gain.setValueAtTime(0.05, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.2);

    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(now);
    osc.stop(now + 0.22);
  }
}

export const droneSoundscape = new DroneSoundscape();
