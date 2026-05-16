/* ═══════════════════════════════════════════
   main.js — Entry point & animation loop
   ═══════════════════════════════════════════ */

(function () {
  'use strict';

  let rafId;
  let lastTime = 0;

  function init() {
    // Initialize all modules
    ENCULADO.UI.init();
    ENCULADO.Particles.init();
    ENCULADO.Typography.init();
    ENCULADO.Mouse.init();

    // Start RAF loop
    requestAnimationFrame(loop);
  }

  function loop(t) {
    rafId = requestAnimationFrame(loop);

    const delta = t - lastTime;
    lastTime = t;

    // 1. Audio analysis tick
    if (ENCULADO.AudioEngine.isReady()) {
      ENCULADO.AudioEngine.tick();
    }

    // 2. Get audio data
    const audioData = ENCULADO.AudioEngine.isReady()
      ? ENCULADO.AudioEngine.getData()
      : null;

    // 3. Lyrics sync
    if (ENCULADO.UI.hasStarted()) {
      const audio = ENCULADO.UI.getAudio();
      if (audio && !audio.paused) {
        ENCULADO.Typography.sync(audio.currentTime);
      }
    }

    // 4. Audio-reactive typography effects
    if (audioData) {
      ENCULADO.Typography.applyAudioEffects(audioData);
    }

    // 5. Mouse
    ENCULADO.Mouse.update();
    const pos = ENCULADO.Mouse.getPosition();

    // 6. Mouse proximity on typography
    ENCULADO.Typography.applyMouseProximity(pos.x, pos.y);

    // 7. Particles
    ENCULADO.Particles.render(t);
  }

  // Bootstrap on DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
