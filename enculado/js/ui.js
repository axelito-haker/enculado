/* ═══════════════════════════════════════════
   ui.js — Loader, controls, progress, drag-drop
   ═══════════════════════════════════════════ */

ENCULADO.UI = (function () {
  'use strict';

  let audio, loaderEl, btnStart, btnToggle, btnVolume;
  let progressBar, progressWrap, timeCurrent, timeTotal, dropHint;
  let _started = false;

  function _formatTime(sec) {
    if (!sec || isNaN(sec)) return '0:00';
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  }

  function _updateProgress() {
    if (!audio || !audio.duration) return;
    const pct = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = pct + '%';
    timeCurrent.textContent = _formatTime(audio.currentTime);
    progressWrap.setAttribute('aria-valuenow', Math.round(pct));
  }

  function _setPlayingState(playing) {
    const pauseIcon = btnToggle.querySelector('.icon-pause');
    const playIcon  = btnToggle.querySelector('.icon-play');
    if (playing) {
      pauseIcon.style.display = '';
      playIcon.style.display  = 'none';
      btnToggle.setAttribute('aria-label', 'Pausar');
    } else {
      pauseIcon.style.display = 'none';
      playIcon.style.display  = '';
      btnToggle.setAttribute('aria-label', 'Reproducir');
    }
  }

  function _loadAudioFile(file) {
    if (!file || !file.type.startsWith('audio/')) return;
    const url = URL.createObjectURL(file);
    audio.src = url;
    audio.load();
    if (_started) {
      audio.play().catch(() => {});
    }
    dropHint.classList.add('hidden');
  }

  function init() {
    audio        = document.getElementById('audio-main');
    loaderEl     = document.getElementById('loader');
    btnStart     = document.getElementById('btn-start');
    btnToggle    = document.getElementById('btn-toggle');
    btnVolume    = document.getElementById('btn-volume');
    progressBar  = document.getElementById('progress-bar');
    progressWrap = document.getElementById('progress-wrap');
    timeCurrent  = document.getElementById('time-current');
    timeTotal    = document.getElementById('time-total');
    dropHint     = document.getElementById('drop-hint');

    // ── Start button ──
    btnStart.addEventListener('click', () => {
      ENCULADO.AudioEngine.init(audio);
      ENCULADO.AudioEngine.resume();

      audio.play().then(() => {
        _started = true;
        loaderEl.classList.add('hidden');
        document.body.classList.add('playing');
        _setPlayingState(true);
      }).catch(() => {
        // No audio file found — still enter experience
        _started = true;
        loaderEl.classList.add('hidden');
        document.body.classList.add('playing');
      });
    });

    // ── Play / Pause ──
    btnToggle.addEventListener('click', () => {
      if (audio.paused) {
        ENCULADO.AudioEngine.resume();
        audio.play();
        _setPlayingState(true);
      } else {
        audio.pause();
        _setPlayingState(false);
      }
    });

    // ── Volume toggle ──
    btnVolume.addEventListener('click', () => {
      if (ENCULADO.AudioEngine.isMuted()) {
        ENCULADO.AudioEngine.unmute();
        document.body.classList.remove('muted');
        btnVolume.setAttribute('aria-label', 'Silenciar');
      } else {
        ENCULADO.AudioEngine.mute();
        document.body.classList.add('muted');
        btnVolume.setAttribute('aria-label', 'Activar sonido');
      }
    });

    // ── Progress seek ──
    progressWrap.addEventListener('click', e => {
      const rect = progressWrap.querySelector('.progress-track').getBoundingClientRect();
      const pct  = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      if (audio.duration) {
        audio.currentTime = pct * audio.duration;
      }
    });

    // Keyboard seek
    progressWrap.addEventListener('keydown', e => {
      const step = 5;
      if (e.key === 'ArrowRight') audio.currentTime = Math.min(audio.duration, audio.currentTime + step);
      if (e.key === 'ArrowLeft')  audio.currentTime = Math.max(0, audio.currentTime - step);
    });

    // ── Audio events ──
    audio.addEventListener('timeupdate', _updateProgress);

    audio.addEventListener('loadedmetadata', () => {
      timeTotal.textContent = _formatTime(audio.duration);
      progressWrap.setAttribute('aria-valuemax', 100);
    });

    audio.addEventListener('ended', () => {
      _setPlayingState(false);
      ENCULADO.Typography.hideAll();
    });

    audio.addEventListener('play',  () => _setPlayingState(true));
    audio.addEventListener('pause', () => _setPlayingState(false));

    // ── Drag & drop audio ──
    document.addEventListener('dragover', e => {
      e.preventDefault();
      document.body.classList.add('drag-over');
    });

    document.addEventListener('dragleave', e => {
      if (!e.relatedTarget) document.body.classList.remove('drag-over');
    });

    document.addEventListener('drop', e => {
      e.preventDefault();
      document.body.classList.remove('drag-over');
      const file = e.dataTransfer.files[0];
      if (file) _loadAudioFile(file);
    });
  }

  function getAudio()    { return audio; }
  function hasStarted()  { return _started; }

  return { init, getAudio, hasStarted };
})();
