<script setup>
// Bifurkationsdiagramm der logistischen Abbildung x(n+1) = R·x(n)·(1−x(n)),
// live im Browser berechnet. Die drei Bereiche sind wie in der Zeitschere-Grafik eingefärbt.
// Optional: `marker` zeichnet eine senkrechte Linie beim aktuellen R (für die Slider-Simulation).
// `plain` zeichnet nur Punkte und Farbbänder ohne Achsen und Text (Hintergrund der Titelfolie).
import { onMounted, ref, watch } from 'vue'

const props = defineProps({
  marker: { type: Number, default: null },
  plain: { type: Boolean, default: false },
})

const canvas = ref(null)
const RMIN = 2.5
const RMAX = 4.0
const CHAOS = 3.5699

let draw = null // zeichnet Grundbild + Marker neu

onMounted(() => {
  const c = canvas.value
  const plain = props.plain
  const W = plain ? 980 : 900
  const H = plain ? 552 : 480
  const dpr = window.devicePixelRatio || 1
  c.width = W * dpr
  c.height = H * dpr
  const fg = getComputedStyle(c).color

  // Das statische Diagramm wird einmal in einen Offscreen-Canvas gerechnet,
  // der Marker kann danach beliebig oft darüber gezeichnet werden.
  const base = document.createElement('canvas')
  base.width = W * dpr
  base.height = H * dpr
  const ctx = base.getContext('2d')
  ctx.scale(dpr, dpr)

  const m = plain ? { l: 0, r: 0, t: 0, b: 0 } : { l: 48, r: 14, t: 28, b: 38 }
  const pw = W - m.l - m.r
  const ph = H - m.t - m.b
  const X = R => m.l + (R - RMIN) / (RMAX - RMIN) * pw
  const Y = x => m.t + (1 - x) * ph
  const de = v => String(v).replace('.', ',')

  // Perioden als Hintergrundbänder
  const bands = [
    [RMIN, 3, '#16a34a', 'stabiles Wachstum'],
    [3, CHAOS, '#f59e0b', 'Wettbewerb'],
    [CHAOS, RMAX, '#c8102e', 'Hyperwettbewerb'],
  ]
  ctx.font = '13px sans-serif'
  ctx.textAlign = 'center'
  for (const [a, b, col, label] of bands) {
    ctx.globalAlpha = 0.12
    ctx.fillStyle = col
    ctx.fillRect(X(a), m.t, X(b) - X(a), ph)
    ctx.globalAlpha = 1
    ctx.fillStyle = fg
    if (!plain) ctx.fillText(label, (X(a) + X(b)) / 2, m.t - 10)
  }

  // Punkte: je R-Wert Einschwingen, dann die Langzeitwerte zeichnen
  ctx.fillStyle = fg
  ctx.globalAlpha = 0.55
  const steps = Math.floor(pw * 1.5)
  for (let i = 0; i <= steps; i++) {
    const R = RMIN + (RMAX - RMIN) * i / steps
    let x = 0.3
    for (let n = 0; n < 300; n++) x = R * x * (1 - x)
    for (let n = 0; n < 150; n++) {
      x = R * x * (1 - x)
      ctx.fillRect(X(R), Y(x), 1, 1)
    }
  }
  ctx.globalAlpha = 1

  if (plain) {
    // Nur Punkte und Bänder: direkt in den sichtbaren Canvas kopieren, kein Marker
    const out = c.getContext('2d')
    out.scale(dpr, dpr)
    out.drawImage(base, 0, 0, W, H)
    return
  }

  // Bifurkationspunkte
  ctx.strokeStyle = fg
  ctx.lineWidth = 1
  ctx.setLineDash([3, 3])
  ctx.globalAlpha = 0.45
  for (const R of [3, 3.449, 3.544, CHAOS]) {
    ctx.beginPath()
    ctx.moveTo(X(R), m.t)
    ctx.lineTo(X(R), m.t + ph)
    ctx.stroke()
  }
  ctx.setLineDash([])
  ctx.globalAlpha = 1

  // Achsen und Beschriftung
  ctx.beginPath()
  ctx.moveTo(m.l, m.t)
  ctx.lineTo(m.l, m.t + ph)
  ctx.lineTo(m.l + pw, m.t + ph)
  ctx.stroke()
  ctx.font = '12px sans-serif'
  for (const R of [2.5, 3, 3.45, 3.57, 3.83, 4])
    ctx.fillText(de(R), X(R), m.t + ph + 16)
  ctx.fillText('R = 1 + r · h', m.l + pw / 2, H - 4)
  ctx.textAlign = 'right'
  for (const v of [0, 0.5, 1])
    ctx.fillText(de(v), m.l - 6, Y(v) + 4)
  ctx.save()
  ctx.translate(13, m.t + ph / 2)
  ctx.rotate(-Math.PI / 2)
  ctx.textAlign = 'center'
  ctx.fillText('x', 0, 0)
  ctx.restore()

  // Sichtbarer Canvas: Grundbild plus Marker
  const out = c.getContext('2d')
  out.scale(dpr, dpr)
  draw = () => {
    out.clearRect(0, 0, W, H)
    out.drawImage(base, 0, 0, W, H)
    const R = props.marker
    if (R == null) return
    out.fillStyle = '#2563eb'
    out.strokeStyle = '#2563eb'
    out.font = 'bold 14px sans-serif'
    const label = `R = ${de(R.toFixed(2))}`
    if (R < RMIN) {
      // links außerhalb des gezeichneten Bereichs
      out.textAlign = 'left'
      out.fillText(`◀ ${label}`, m.l + 6, m.t + 18)
      return
    }
    out.lineWidth = 2.5
    out.beginPath()
    out.moveTo(X(R), m.t)
    out.lineTo(X(R), m.t + ph)
    out.stroke()
    const left = R < (RMIN + RMAX) / 2
    out.textAlign = left ? 'left' : 'right'
    out.fillText(label, X(R) + (left ? 7 : -7), m.t + 18)
  }
  draw()
})

watch(() => props.marker, () => draw && draw())
</script>

<template>
  <canvas
    ref="canvas"
    class="w-full"
    :style="plain ? 'height: 100%; display: block; object-fit: cover' : 'aspect-ratio: 900 / 480'"
  />
</template>
