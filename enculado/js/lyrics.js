/* ═══════════════════════════════════════════
   lyrics.js — Timestamped lyrics & DOM builder
   ═══════════════════════════════════════════ */

/**
 * LYRIC LINE FORMAT:
 * {
 *   t:       number   — start time in seconds
 *   dur:     number   — approximate display duration in seconds (optional, auto-calc)
 *   words:   Array<{
 *     text:    string
 *     style:   'script' | 'display' | 'serif' | 'collage'
 *     size:    'giant' | 'large' | 'medium' | 'small' | 'tiny'
 *     rot?:    'neg' | 'pos' | 'sm'
 *     glow?:   boolean
 *     float?:  boolean
 *   }>
 *   layout:  'center' | 'asymmetric-left' | 'asymmetric-right' | 'vertical' | 'fullbleed' | 'scattered'
 *   anim:    string   — optional override for entrance animation
 * }
 *
 * NOTE: Timestamps below are PLACEHOLDERS for the song ENCULADO.
 * Replace `t` values with exact seconds from your audio file.
 * You can find them by playing the song and noting when each phrase lands.
 */

ENCULADO.LYRICS = [
  // ── INTRO ──
  {
    t: 0,
    words: [
      { text: 'ENCULADO', style: 'display', size: 'giant', glow: true }
    ],
    layout: 'fullbleed',
    anim: 'blur-reveal'
  },

  // ── VERSO 1 ──
  {
    t: 8.5,
    words: [
      { text: 'yo', style: 'script', size: 'medium' },
      { text: 'no', style: 'collage', size: 'large', rot: 'neg' },
      { text: 'sé', style: 'script', size: 'medium' },
    ],
    layout: 'asymmetric-left',
    anim: 'slide-up'
  },
  {
    t: 11.2,
    words: [
      { text: 'qué', style: 'serif', size: 'large', rot: 'sm' },
      { text: 'me', style: 'script', size: 'small' },
      { text: 'hiciste', style: 'display', size: 'medium' },
    ],
    layout: 'center',
    anim: 'fade-in'
  },
  {
    t: 14.0,
    words: [
      { text: 'pero', style: 'collage', size: 'small', rot: 'neg' },
      { text: 'no', style: 'display', size: 'large' },
      { text: 'me', style: 'script', size: 'tiny' },
      { text: 'puedo', style: 'serif', size: 'medium', rot: 'sm' },
      { text: 'ir', style: 'display', size: 'giant', glow: true },
    ],
    layout: 'asymmetric-right',
    anim: 'blur-reveal'
  },
  {
    t: 17.5,
    words: [
      { text: 'enculado', style: 'script', size: 'large', glow: true },
      { text: 'de', style: 'collage', size: 'tiny', rot: 'pos' },
      { text: 'ti', style: 'display', size: 'giant' },
    ],
    layout: 'fullbleed',
    anim: 'scale-in'
  },

  // ── PRE-CORO ──
  {
    t: 21.0,
    words: [
      { text: 'me', style: 'script', size: 'medium' },
      { text: 'tienes', style: 'serif', size: 'large', rot: 'neg' },
    ],
    layout: 'asymmetric-left',
    anim: 'slide-up'
  },
  {
    t: 23.5,
    words: [
      { text: 'mal', style: 'display', size: 'giant', glow: true },
    ],
    layout: 'fullbleed',
    anim: 'blur-reveal'
  },
  {
    t: 26.0,
    words: [
      { text: 'pensando', style: 'script', size: 'large' },
      { text: 'en', style: 'collage', size: 'small', rot: 'pos' },
      { text: 'tu', style: 'serif', size: 'medium', rot: 'neg' },
      { text: 'boca', style: 'display', size: 'large', glow: true },
    ],
    layout: 'center',
    anim: 'track-in'
  },

  // ── CORO ──
  {
    t: 30.0,
    words: [
      { text: 'cada', style: 'collage', size: 'small', rot: 'neg' },
      { text: 'vez', style: 'serif', size: 'medium' },
      { text: 'que', style: 'script', size: 'small', rot: 'sm' },
      { text: 'llamas', style: 'display', size: 'large', glow: true },
    ],
    layout: 'asymmetric-right',
    anim: 'fade-in'
  },
  {
    t: 33.5,
    words: [
      { text: 'yo', style: 'script', size: 'medium' },
      { text: 'contesto', style: 'display', size: 'large' },
    ],
    layout: 'asymmetric-left',
    anim: 'slide-up'
  },
  {
    t: 36.0,
    words: [
      { text: 'aunque', style: 'collage', size: 'small', rot: 'pos' },
      { text: 'sé', style: 'serif', size: 'medium', rot: 'sm' },
      { text: 'que', style: 'script', size: 'small' },
      { text: 'no', style: 'display', size: 'giant', glow: true },
    ],
    layout: 'fullbleed',
    anim: 'scale-in'
  },
  {
    t: 39.5,
    words: [
      { text: 'debería', style: 'script', size: 'large', rot: 'neg' },
    ],
    layout: 'center',
    anim: 'blur-reveal'
  },

  // ── PUENTE / BREAK ──
  {
    t: 44.0,
    words: [
      { text: 'y', style: 'collage', size: 'tiny', rot: 'neg' },
      { text: 'aún', style: 'serif', size: 'large', rot: 'sm' },
      { text: 'así', style: 'display', size: 'medium' },
      { text: '…', style: 'script', size: 'small', float: true },
    ],
    layout: 'asymmetric-left',
    anim: 'fade-in'
  },
  {
    t: 47.5,
    words: [
      { text: 'ENCULADO', style: 'display', size: 'giant', glow: true },
    ],
    layout: 'fullbleed',
    anim: 'blur-reveal'
  },

  // ── VERSO 2 ──
  {
    t: 53.0,
    words: [
      { text: 'tú', style: 'script', size: 'medium' },
      { text: 'sabes', style: 'serif', size: 'large', rot: 'sm' },
      { text: 'lo', style: 'collage', size: 'small', rot: 'neg' },
      { text: 'que', style: 'script', size: 'tiny' },
      { text: 'pasa', style: 'display', size: 'medium', glow: true },
    ],
    layout: 'asymmetric-right',
    anim: 'track-in'
  },
  {
    t: 57.0,
    words: [
      { text: 'cuando', style: 'collage', size: 'small' },
      { text: 'estás', style: 'serif', size: 'large', rot: 'pos' },
      { text: 'cerca', style: 'display', size: 'large', glow: true },
    ],
    layout: 'center',
    anim: 'scale-in'
  },
  {
    t: 60.5,
    words: [
      { text: 'me', style: 'script', size: 'medium', rot: 'sm' },
      { text: 'paralizo', style: 'display', size: 'large', glow: true },
    ],
    layout: 'fullbleed',
    anim: 'blur-reveal'
  },
  {
    t: 64.0,
    words: [
      { text: 'y', style: 'collage', size: 'tiny', rot: 'pos' },
      { text: 'no', style: 'display', size: 'giant' },
      { text: 'entiendo', style: 'script', size: 'medium', rot: 'neg' },
      { text: 'nada', style: 'serif', size: 'large', rot: 'sm' },
    ],
    layout: 'asymmetric-left',
    anim: 'fade-in'
  },

  // ── CORO FINAL ──
  {
    t: 69.0,
    words: [
      { text: 'cada', style: 'collage', size: 'small', rot: 'neg' },
      { text: 'vez', style: 'serif', size: 'medium' },
      { text: 'que', style: 'script', size: 'small' },
      { text: 'llamas', style: 'display', size: 'large', glow: true },
    ],
    layout: 'asymmetric-right',
    anim: 'fade-in'
  },
  {
    t: 72.5,
    words: [
      { text: 'yo', style: 'script', size: 'medium' },
      { text: 'contesto', style: 'display', size: 'large' },
    ],
    layout: 'asymmetric-left',
    anim: 'slide-up'
  },
  {
    t: 75.0,
    words: [
      { text: 'aunque', style: 'collage', size: 'small', rot: 'pos' },
      { text: 'sé', style: 'serif', size: 'medium', rot: 'sm' },
      { text: 'que', style: 'script', size: 'small' },
      { text: 'no', style: 'display', size: 'giant', glow: true },
    ],
    layout: 'fullbleed',
    anim: 'scale-in'
  },
  {
    t: 78.5,
    words: [
      { text: 'debería', style: 'script', size: 'large', rot: 'neg' },
    ],
    layout: 'center',
    anim: 'blur-reveal'
  },

  // ── OUTRO ──
  {
    t: 83.0,
    words: [
      { text: 'ENCULADO', style: 'display', size: 'giant', glow: true },
      { text: 'de', style: 'collage', size: 'tiny', rot: 'pos' },
      { text: 'ti', style: 'script', size: 'large', float: true },
    ],
    layout: 'fullbleed',
    anim: 'scale-in'
  },
  {
    t: 88.0,
    words: [
      { text: '…', style: 'script', size: 'medium', float: true },
    ],
    layout: 'center',
    anim: 'fade-in'
  }
];

/* ── Build lyric DOM ── */
ENCULADO.buildLyrics = function () {
  const stage = document.getElementById('lyrics-stage');
  if (!stage) return;

  const lines = ENCULADO.LYRICS;

  lines.forEach((line, idx) => {
    // Pre-calculate duration
    const next = lines[idx + 1];
    line.dur = next ? (next.t - line.t) : 6;

    // Line container
    const lineEl = document.createElement('div');
    lineEl.className = 'lyric-line';
    lineEl.dataset.idx = idx;
    lineEl.dataset.t = line.t;

    // Inner layout
    const inner = document.createElement('div');
    inner.className = `lyric-inner lyric-inner--${line.layout || 'center'}`;

    // Words
    const wordEls = document.createDocumentFragment();
    line.words.forEach(w => {
      const span = document.createElement('span');
      let cls = `lyric-word lyric-word--${w.style} lyric-word--${w.size}`;
      if (w.rot)   cls += ` lyric-word--rot-${w.rot}`;
      if (w.glow)  cls += ` lyric-word--glow`;
      if (w.float) cls += ` anim--float`;
      span.className = cls;
      span.textContent = w.text;
      span.setAttribute('aria-hidden', 'false');
      wordEls.appendChild(span);
      wordEls.appendChild(document.createTextNode(' '));
    });

    inner.appendChild(wordEls);
    lineEl.appendChild(inner);
    stage.appendChild(lineEl);
  });
};

// Build immediately on script load
ENCULADO.buildLyrics();
