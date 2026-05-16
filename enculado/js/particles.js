/* ═══════════════════════════════════════════
   particles.js — Canvas particle system
   ═══════════════════════════════════════════ */

ENCULADO.Particles = (function () {
  'use strict';

  const { COUNT, BASE_RADIUS, MAX_SPEED, MOUSE_RADIUS, MOUSE_FORCE } = ENCULADO.CONFIG.PARTICLES;

  let canvas, ctx, W, H;
  let particles = [];
  let mouse = { x: -9999, y: -9999 };
  let dpr = 1;

  class Particle {
    constructor() { this.reset(true); }

    reset(initial = false) {
      this.x  = Math.random() * W;
      this.y  = initial ? Math.random() * H : H + 10;
      this.vx = (Math.random() - 0.5) * MAX_SPEED;
      this.vy = -(Math.random() * MAX_SPEED * 0.5 + 0.1);
      this.r  = Math.random() * BASE_RADIUS + 0.5;
      this.alpha = Math.random() * 0.5 + 0.1;
      this.alphaDir = (Math.random() - 0.5) * 0.003;
      this.baseAlpha = this.alpha;
      this.phase = Math.random() * Math.PI * 2;
    }

    update(t, audioData) {
      // Bass pulse — particles expand and speed up
      const bass = audioData ? audioData.bass : 0;
      const high = audioData ? audioData.high : 0;

      // Float oscillation
      this.vx += Math.sin(t * 0.001 + this.phase) * 0.002;
      this.vy -= 0.0008; // slight upward drift

      // Mouse repulsion
      const dx = this.x - mouse.x;
      const dy = this.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < MOUSE_RADIUS) {
        const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
        this.vx += (dx / dist) * force * MOUSE_FORCE * 0.5;
        this.vy += (dy / dist) * force * MOUSE_FORCE * 0.5;
      }

      // Speed cap
      const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
      if (speed > MAX_SPEED * (1 + bass * 2)) {
        this.vx = (this.vx / speed) * MAX_SPEED * (1 + bass * 2);
        this.vy = (this.vy / speed) * MAX_SPEED * (1 + bass * 2);
      }

      this.x += this.vx;
      this.y += this.vy;

      // Alpha breathe
      this.alpha += this.alphaDir;
      if (this.alpha > this.baseAlpha + 0.2 || this.alpha < 0.05) {
        this.alphaDir *= -1;
      }

      // High frequency sparkle
      const sparkle = high * 0.4;
      const drawAlpha = Math.min(1, this.alpha + sparkle);
      return drawAlpha;
    }

    draw(drawAlpha) {
      const bass = parseFloat(
        document.documentElement.style.getPropertyValue('--audio-bass') || '0'
      );
      const r = this.r * (1 + bass * 1.5);

      ctx.beginPath();
      ctx.arc(this.x * dpr, this.y * dpr, r * dpr, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${drawAlpha.toFixed(3)})`;
      ctx.fill();
    }

    isOffscreen() {
      return this.y < -20 || this.x < -20 || this.x > W + 20;
    }
  }

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width  = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width  = W + 'px';
    canvas.style.height = H + 'px';
  }

  function init() {
    canvas = document.getElementById('canvas-bg');
    if (!canvas) return;
    ctx = canvas.getContext('2d');

    resize();
    window.addEventListener('resize', resize, { passive: true });

    for (let i = 0; i < COUNT; i++) {
      particles.push(new Particle());
    }

    // Mouse tracking
    window.addEventListener('mousemove', e => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    }, { passive: true });

    window.addEventListener('touchmove', e => {
      if (e.touches[0]) {
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
      }
    }, { passive: true });
  }

  function render(t) {
    if (!ctx) return;

    const audioData = ENCULADO.AudioEngine.isReady()
      ? ENCULADO.AudioEngine.getData()
      : null;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Optional: very subtle vignette
    const bass = audioData ? audioData.bass : 0;
    if (bass > 0.3) {
      const grad = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height) / 2
      );
      grad.addColorStop(0, 'rgba(200,191,255,0)');
      grad.addColorStop(1, `rgba(200,191,255,${(bass * 0.03).toFixed(3)})`);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      const alpha = p.update(t, audioData);
      p.draw(alpha);

      if (p.isOffscreen()) {
        particles[i] = new Particle();
      }
    }
  }

  function setMouse(x, y) {
    mouse.x = x;
    mouse.y = y;
  }

  return { init, render, setMouse };
})();
