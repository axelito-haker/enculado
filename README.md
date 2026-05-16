# ENCULADO — Nsqk & Yachtum
## Experiencia Web Musical Interactiva

---

## Estructura del proyecto

```
enculado/
│
├── index.html              ← Punto de entrada principal (HTML semántico)
│
├── css/
│   ├── reset.css           ← Reset mínimo y opinionado
│   ├── tokens.css          ← Design tokens: colores, tipografía, espaciado, motion
│   ├── layout.css          ← Estructura de página: canvas, loader, controles
│   ├── typography.css      ← Sistema tipográfico + clases de lyric lines
│   ├── animations.css      ← Keyframes + clases de animación reutilizables
│   ├── particles.css       ← Estilos del canvas de partículas + cursor custom
│   └── ui.css              ← Botones, controles de reproducción
│
├── js/
│   ├── config.js           ← Constantes globales (FFT, bandas, partículas…)
│   ├── lyrics.js           ← Datos de lyrics con timestamps + constructor DOM
│   ├── audioEngine.js      ← Web Audio API: análisis de frecuencias → CSS vars
│   ├── particles.js        ← Canvas: sistema de partículas con repulsión de mouse
│   ├── typography.js       ← Sincronización de lyrics + efectos kinéticos por audio
│   ├── mouse.js            ← Cursor custom + tracking de posición
│   ├── ui.js               ← Loader, play/pause, progreso, drag & drop de audio
│   └── main.js             ← Loop RAF: orquesta todos los módulos
│
└── assets/
    └── audio/
        └── enculado.mp3    ← ⚠️ COLOCA AQUÍ TU ARCHIVO DE AUDIO
```

---

## Cómo usar

### 1. Agregar el audio
Coloca el archivo de audio de ENCULADO en:
```
assets/audio/enculado.mp3
```
También acepta `.ogg` como fallback.

**Alternativa:** Si no tienes el archivo en esa ruta, puedes arrastrarlo directamente
a la ventana del navegador una vez que inicia la experiencia.

### 2. Abrir el proyecto
Sirve el proyecto desde un servidor HTTP local (requerido por Web Audio API):

```bash
# Con Python
python3 -m http.server 3000

# Con Node.js (npx)
npx serve .

# Con VS Code: usa la extensión "Live Server"
```

Luego abre `http://localhost:3000` en tu navegador.

### 3. Ajustar los timestamps de lyrics

Abre `js/lyrics.js` y ajusta el valor `t` (en segundos) de cada línea
para sincronizarlas con tu audio. El campo `dur` es opcional (se auto-calcula
como la diferencia hasta la siguiente línea).

```js
{
  t: 8.5,          // ← Segundo en que aparece esta línea
  words: [
    { text: 'yo', style: 'script', size: 'medium' },
    ...
  ],
  layout: 'asymmetric-left',
  anim: 'slide-up'
}
```

---

## Stack tecnológico

| Capa | Tecnología |
|------|-----------|
| Markup | HTML5 semántico |
| Estilos | CSS3 puro (Custom Properties, Grid, Flexbox, Filters, Keyframes) |
| Lógica | JavaScript Vanilla ES6+ (módulos IIFE) |
| Animaciones | CSS `@keyframes` + Web Animations API |
| Audio | Web Audio API (`AudioContext`, `AnalyserNode`, FFT) |
| Gráficos | Canvas 2D API (partículas) |
| Tipografía | Google Fonts (Playwrite England Joined, Bebas Neue, Cormorant Garamond, Space Mono) |

---

## Funcionalidades implementadas

- ✅ **Loader cinematográfico** con animación de entrada
- ✅ **Sistema de partículas** reactivo a mouse y audio
- ✅ **Web Audio API**: análisis de bajos, medios y agudos → CSS vars
- ✅ **Lyrics sincronizadas** por timestamp con el audio
- ✅ **7 variantes de animación de entrada** por línea lírica
- ✅ **5 estilos tipográficos** (script, display, serif, collage, mono)
- ✅ **Efectos kinéticos por audio**: glow, escala en bajos, blur en agudos
- ✅ **Repulsión tipográfica por mouse** (efecto magnético)
- ✅ **Cursor personalizado** con anillo flotante
- ✅ **Drag & drop de archivo de audio** en tiempo real
- ✅ **Controles de reproducción** accesibles (play/pause, seek, mute)
- ✅ **Grain overlay animado** para textura cinematográfica
- ✅ **Capas de glow ambiental** que se activan con la música
- ✅ **prefers-reduced-motion** respetado
- ✅ **Touch targets** ≥ 44px para accesibilidad móvil
