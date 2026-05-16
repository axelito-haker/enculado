/* ═══════════════════════════════════════════
   audioEngine.js — Web Audio API integration
   ═══════════════════════════════════════════ */

ENCULADO.AudioEngine = (function () {
  'use strict';

  const { FFT_SIZE, AUDIO_SMOOTHING, BANDS } = ENCULADO.CONFIG;

  let ctx, analyser, source, gainNode;
  let dataArray;
  let _isMuted = false;
  let _isReady = false;
  let _onReadyCbs = [];

  // Smoothed output values (0–1)
  const out = { bass: 0, mid: 0, high: 0, rms: 0 };

  function _lerp(a, b, t) { return a + (b - a) * t; }

  function _getAverage(data, start, end) {
    let sum = 0;
    const count = end - start;
    for (let i = start; i < end; i++) sum += data[i];
    return sum / count / 255; // normalize 0–1
  }

  function _getRMS(data) {
    let sum = 0;
    for (let i = 0; i < data.length; i++) {
      const v = (data[i] / 255) * 2 - 1;
      sum += v * v;
    }
    return Math.sqrt(sum / data.length);
  }

  // Called every animation frame
  function tick() {
    if (!analyser) return;

    analyser.getByteFrequencyData(dataArray);

    const rawBass = _getAverage(dataArray, BANDS.bass.start, BANDS.bass.end);
    const rawMid  = _getAverage(dataArray, BANDS.mid.start,  BANDS.mid.end);
    const rawHigh = _getAverage(dataArray, BANDS.high.start, BANDS.high.end);

    // Smooth values
    const smooth = 0.15;
    out.bass = _lerp(out.bass, rawBass, smooth);
    out.mid  = _lerp(out.mid,  rawMid,  smooth);
    out.high = _lerp(out.high, rawHigh, smooth);
    out.rms  = _lerp(out.rms,  _getRMS(dataArray), smooth);

    // Push to CSS custom properties on :root
    const root = document.documentElement;
    root.style.setProperty('--audio-bass', out.bass.toFixed(4));
    root.style.setProperty('--audio-mid',  out.mid.toFixed(4));
    root.style.setProperty('--audio-high', out.high.toFixed(4));
    root.style.setProperty('--audio-rms',  out.rms.toFixed(4));
  }

  function init(audioEl) {
    if (_isReady) return;

    ctx       = new (window.AudioContext || window.webkitAudioContext)();
    analyser  = ctx.createAnalyser();
    gainNode  = ctx.createGain();

    analyser.fftSize = FFT_SIZE;
    analyser.smoothingTimeConstant = AUDIO_SMOOTHING;
    dataArray = new Uint8Array(analyser.frequencyBinCount);

    source = ctx.createMediaElementSource(audioEl);
    source.connect(analyser);
    analyser.connect(gainNode);
    gainNode.connect(ctx.destination);

    _isReady = true;
    _onReadyCbs.forEach(fn => fn());
    _onReadyCbs = [];
  }

  function resume() {
    if (ctx && ctx.state === 'suspended') ctx.resume();
  }

  function mute() {
    _isMuted = true;
    if (gainNode) gainNode.gain.setTargetAtTime(0, ctx.currentTime, 0.05);
  }

  function unmute() {
    _isMuted = false;
    if (gainNode) gainNode.gain.setTargetAtTime(1, ctx.currentTime, 0.05);
  }

  function isMuted() { return _isMuted; }

  function isReady() { return _isReady; }

  function onReady(fn) {
    if (_isReady) { fn(); return; }
    _onReadyCbs.push(fn);
  }

  function getData() { return out; }

  // Expose raw frequency data for particles
  function getRawData() { return dataArray; }

  return { init, resume, mute, unmute, isMuted, isReady, onReady, tick, getData, getRawData };
})();
