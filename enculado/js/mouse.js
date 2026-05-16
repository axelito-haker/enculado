/* ═══════════════════════════════════════════
   mouse.js — Custom cursor & mouse tracking
   ═══════════════════════════════════════════ */

ENCULADO.Mouse = (function () {
  'use strict';

  let dotEl, ringEl, cursorEl;
  let mx = -9999, my = -9999;
  let ringX = -9999, ringY = -9999;
  let isTouch = false;

  function _lerp(a, b, t) { return a + (b - a) * t; }

  function init() {
    // Detect touch device
    isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    // Build cursor elements
    cursorEl = document.createElement('div');
    cursorEl.className = 'cursor';
    cursorEl.setAttribute('aria-hidden', 'true');

    dotEl = document.createElement('div');
    dotEl.className = 'cursor__dot';

    ringEl = document.createElement('div');
    ringEl.className = 'cursor__ring';

    cursorEl.appendChild(dotEl);
    cursorEl.appendChild(ringEl);
    document.body.appendChild(cursorEl);

    // Track mouse
    window.addEventListener('mousemove', e => {
      mx = e.clientX;
      my = e.clientY;
    }, { passive: true });

    window.addEventListener('mousedown', () => cursorEl.classList.add('cursor--click'));
    window.addEventListener('mouseup',   () => cursorEl.classList.remove('cursor--click'));

    // Hover detection
    document.querySelectorAll('button, a, [role="slider"]').forEach(el => {
      el.addEventListener('mouseenter', () => cursorEl.classList.add('cursor--hover'));
      el.addEventListener('mouseleave', () => cursorEl.classList.remove('cursor--hover'));
    });
  }

  // Called every animation frame
  function update() {
    if (isTouch || !dotEl) return;

    // Dot follows exactly
    dotEl.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;

    // Ring lags slightly
    ringX = _lerp(ringX, mx, 0.12);
    ringY = _lerp(ringY, my, 0.12);
    ringEl.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
  }

  function getPosition() { return { x: mx, y: my }; }

  return { init, update, getPosition };
})();
