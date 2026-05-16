/* ═══════════════════════════════════════════
   typography.js — Lyric sync & kinetic type effects
   ═══════════════════════════════════════════ */

ENCULADO.Typography = (function () {
  'use strict';

  const { ANIMATIONS, LOOKAHEAD_MS } = ENCULADO.CONFIG;

  let lineEls = [];
  let currentIdx = -1;
  let prevIdx    = -1;

  // Map animation name → CSS class
  const ANIM_CLASS = {
    'fade-in':     'anim--fade-in',
    'blur-reveal': 'anim--blur-reveal',
    'scale-in':    'anim--scale-in',
    'slide-up':    'anim--slide-up',
    'track-in':    'anim--track-in',
  };

  function init() {
    lineEls = Array.from(document.querySelectorAll('.lyric-line'));
  }

  function _showLine(idx) {
    if (idx === currentIdx) return;
    prevIdx    = currentIdx;
    currentIdx = idx;

    // Hide previous
    if (prevIdx >= 0 && lineEls[prevIdx]) {
      const prev = lineEls[prevIdx];
      _clearAnimClasses(prev);
      prev.classList.add('anim--fade-out');
      prev.classList.remove('active');

      prev.addEventListener('animationend', () => {
        prev.style.opacity = '0';
        _clearAnimClasses(prev);
      }, { once: true });
    }

    // Show current
    if (idx >= 0 && lineEls[idx]) {
      const el = lineEls[idx];
      const lyric = ENCULADO.LYRICS[idx];
      const animName = lyric.anim || ANIMATIONS[idx % ANIMATIONS.length];
      const animClass = ANIM_CLASS[animName] || 'anim--fade-in';

      _clearAnimClasses(el);
      el.style.opacity = '0';
      el.classList.add('active');

      // Stagger word entrance via requestAnimationFrame
      requestAnimationFrame(() => {
        el.classList.add(animClass);
        el.style.opacity = '';
      });
    }
  }

  function _clearAnimClasses(el) {
    Object.values(ANIM_CLASS).forEach(cls => el.classList.remove(cls));
    el.classList.remove('anim--fade-out', 'anim--blur-exit');
  }

  function _hideAll() {
    lineEls.forEach(el => {
      el.classList.remove('active');
      el.style.opacity = '0';
      _clearAnimClasses(el);
    });
    currentIdx = -1;
    prevIdx    = -1;
  }

  // Called every frame with currentTime in seconds
  function sync(currentTime) {
    const t = currentTime;
    const lines = ENCULADO.LYRICS;

    // Find which line should be visible
    let targetIdx = -1;
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const end  = line.t + (line.dur || 5);
      if (t >= line.t && t < end) {
        targetIdx = i;
        break;
      }
    }

    _showLine(targetIdx);
  }

  // Audio-reactive distortion on active words
  function applyAudioEffects(audioData) {
    if (!audioData) return;
    const { bass, mid, high } = audioData;

    if (currentIdx < 0 || !lineEls[currentIdx]) return;
    const activeEl = lineEls[currentIdx];
    const words = activeEl.querySelectorAll('.lyric-word');

    words.forEach((word, i) => {
      const isGlow = word.classList.contains('lyric-word--glow');
      const isDisplay = word.classList.contains('lyric-word--display');
      const isScript  = word.classList.contains('lyric-word--script');

      // Bass: scale pulse on display words
      if (isDisplay) {
        const scale = 1 + bass * 0.08;
        word.style.transform = `scale(${scale.toFixed(4)}) ${_getBaseTransform(word)}`;
      }

      // Mid: glow intensity on glow words
      if (isGlow) {
        const glowIntensity = mid * 0.7;
        word.style.textShadow = `
          0 0 ${(20 + mid * 60).toFixed(0)}px rgba(200,191,255,${glowIntensity.toFixed(3)}),
          0 0 ${(40 + mid * 120).toFixed(0)}px rgba(200,191,255,${(glowIntensity * 0.4).toFixed(3)})
        `;
      }

      // High: blur distortion on collage words
      if (word.classList.contains('lyric-word--collage') && high > 0.4) {
        const blurAmount = ((high - 0.4) * 4).toFixed(2);
        word.style.filter = `blur(${blurAmount}px)`;
      } else {
        word.style.filter = '';
      }
    });
  }

  function _getBaseTransform(word) {
    if (word.classList.contains('lyric-word--rot-neg')) return 'rotate(-8deg)';
    if (word.classList.contains('lyric-word--rot-pos')) return 'rotate(6deg)';
    if (word.classList.contains('lyric-word--rot-sm'))  return 'rotate(-3deg)';
    return '';
  }

  // Mouse proximity distortion
  function applyMouseProximity(mx, my) {
    if (currentIdx < 0 || !lineEls[currentIdx]) return;

    lineEls[currentIdx].querySelectorAll('.lyric-word').forEach(word => {
      const rect = word.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = mx - cx;
      const dy = my - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const threshold = 120;

      if (dist < threshold) {
        const force = (1 - dist / threshold) * 10;
        const nx = -(dx / dist) * force;
        const ny = -(dy / dist) * force;
        word.style.transform = `translate(${nx.toFixed(2)}px, ${ny.toFixed(2)}px)`;
      } else {
        word.style.transform = '';
      }
    });
  }

  return { init, sync, applyAudioEffects, applyMouseProximity, hideAll: _hideAll };
})();
