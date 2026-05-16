/* ═══════════════════════════════════════════
   config.js — Global constants & settings
   ═══════════════════════════════════════════ */

window.ENCULADO = window.ENCULADO || {};

ENCULADO.CONFIG = {
  // FFT size for audio analysis (power of 2, higher = more frequency resolution)
  FFT_SIZE: 2048,

  // Smoothing for audio analyser (0–1, higher = smoother)
  AUDIO_SMOOTHING: 0.85,

  // Frequency band ranges (bin indices based on FFT_SIZE=2048 @ 44.1kHz)
  BANDS: {
    bass:  { start: 1,   end: 8   },   // ~20–170 Hz  (sub-bass & bass)
    mid:   { start: 8,   end: 60  },   // ~170–1300 Hz (vocals, chords)
    high:  { start: 60,  end: 200 },   // ~1.3–4.3 kHz (presence, hi-hats)
  },

  // Particle system
  PARTICLES: {
    COUNT: 55,
    BASE_RADIUS: 1.2,
    MAX_SPEED: 0.4,
    MOUSE_RADIUS: 120,
    MOUSE_FORCE: 3.5,
  },

  // Lyric animation pool — one is chosen per line
  ANIMATIONS: ['fade-in', 'blur-reveal', 'scale-in', 'slide-up', 'track-in'],

  // How many ms before a lyric line starts to prepare entrance
  LOOKAHEAD_MS: 200,
};

Object.freeze(ENCULADO.CONFIG);
