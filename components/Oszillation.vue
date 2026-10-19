<script setup>
// Interaktive Simulation der Kapazitätsplanung aus der Tabellenfolie:
//   x(n+1) = x(n) + r·h · x(n) · (1 − x(n)),  Start bei 10 % des Potenzials.
// Der Regler verändert nur die Marktdynamik r·h. Links die Zeitreihe,
// rechts wandert der Marker R = 1 + r·h durch das Bifurkationsdiagramm.
import { computed, onBeforeUnmount, ref } from 'vue'
import Bifurkation from './Bifurkation.vue'

const RH_MIN = 0.5
const RH_MAX = 3
const N = 40          // gezeigte Planungszyklen
const X0 = 0.1        // Start: 10 % des Potenzials
const YMAX = 1.4      // Achse bis 140 %

const rh = ref(0.5)
const R = computed(() => 1 + rh.value)
const de = (v, d = 2) => v.toFixed(d).replace('.', ',')
const step = (x, a) => x + a * x * (1 - x)

// Zeitreihe der ersten N Zyklen
const series = computed(() => {
  const out = [X0]
  let x = X0
  for (let n = 0; n < N; n++) {
    x = step(x, rh.value)
    out.push(x)
  }
  return out
})

// Langzeitverhalten: nach langem Einschwingen die Periode suchen
const verhalten = computed(() => {
  const a = rh.value
  let x = X0
  for (let n = 0; n < 2000; n++) x = step(x, a)
  const orbit = []
  for (let n = 0; n < 128; n++) {
    orbit.push(x)
    x = step(x, a)
  }
  for (let p = 1; p <= 64; p++) {
    let ok = true
    for (let i = 0; i + p < orbit.length; i++) {
      if (Math.abs(orbit[i] - orbit[i + p]) > 1e-4) { ok = false; break }
    }
    if (ok) {
      return p === 1
        ? { text: 'stabiles Gleichgewicht', col: '#16a34a' }
        : { text: `${p}er-Zyklus`, col: '#f59e0b' }
    }
  }
  return { text: 'deterministisches Chaos', col: '#c8102e' }
})

// Automatischer Durchlauf des Reglers
const playing = ref(false)
let timer = null
function stop() {
  if (timer) clearInterval(timer)
  timer = null
  playing.value = false
}
function toggle() {
  if (playing.value) return stop()
  if (rh.value >= RH_MAX) rh.value = RH_MIN
  playing.value = true
  timer = setInterval(() => {
    rh.value = Math.min(RH_MAX, Math.round((rh.value + 0.01) * 100) / 100)
    if (rh.value >= RH_MAX) stop()
  }, 80)
}
onBeforeUnmount(stop)

// Zeitreihen-Grafik (SVG)
const V = { W: 600, H: 300, l: 46, r: 12, t: 14, b: 34 }
const pw = V.W - V.l - V.r
const ph = V.H - V.t - V.b
const px = n => V.l + n / N * pw
const py = x => V.t + (1 - x / YMAX) * ph
const path = computed(() =>
  series.value.map((x, n) => `${px(n).toFixed(1)},${py(x).toFixed(1)}`).join(' '),
)
</script>

<template>
  <div class="flex flex-col gap-2">
    <div class="flex items-center gap-3">
      <button
        class="px-2 py-0.5 border border-current rounded opacity-80 hover:opacity-100"
        :title="playing ? 'Anhalten' : 'Dynamik automatisch steigern'"
        @click="toggle"
      >{{ playing ? '⏸' : '▶' }}</button>
      <span class="whitespace-nowrap">Marktdynamik <i>r·h</i></span>
      <input
        v-model.number="rh"
        type="range"
        :min="RH_MIN"
        :max="RH_MAX"
        step="0.01"
        class="flex-1"
        style="accent-color: #c8102e"
        @keydown.stop
        @input="stop"
      >
      <span class="font-mono tabular-nums whitespace-nowrap" style="min-width: 11.5em">
        r·h = {{ de(rh) }} → R = {{ de(R) }}
      </span>
      <span class="font-bold whitespace-nowrap" style="min-width: 12em" :style="{ color: verhalten.col }">
        {{ verhalten.text }}
      </span>
    </div>

    <div class="grid grid-cols-2 gap-4 items-start">
      <!-- Schriftgrößen als style, nicht als SVG-Attribut: UnoCSS-Attributify würde
           das Attribut sonst als Utility lesen (Wert 11 ergibt 2.75rem). -->
      <svg :viewBox="`0 0 ${V.W} ${V.H}`" class="w-full" style="font-family: sans-serif">
        <!-- Überkapazität -->
        <rect :x="V.l" :y="py(YMAX)" :width="pw" :height="py(1) - py(YMAX)" fill="#c8102e" fill-opacity="0.08" />
        <text :x="V.l + pw - 4" :y="py(YMAX) + 12" text-anchor="end" style="font-size: 11px; fill: #c8102e; opacity: 0.8">Überkapazität</text>
        <!-- 100 % Potenzial -->
        <line :x1="V.l" :y1="py(1)" :x2="V.l + pw" :y2="py(1)" stroke="currentColor" stroke-dasharray="4 4" opacity="0.5" />
        <!-- Achsen -->
        <line :x1="V.l" :y1="V.t" :x2="V.l" :y2="V.t + ph" stroke="currentColor" />
        <line :x1="V.l" :y1="V.t + ph" :x2="V.l + pw" :y2="V.t + ph" stroke="currentColor" />
        <g style="font-size: 11px; fill: currentColor">
          <text v-for="v in [0, 0.5, 1]" :key="v" :x="V.l - 6" :y="py(v) + 4" text-anchor="end">{{ Math.round(v * 100) }} %</text>
          <text v-for="n in [0, 10, 20, 30, 40]" :key="n" :x="px(n)" :y="V.t + ph + 15" text-anchor="middle">{{ n }}</text>
          <text :x="V.l + pw / 2" :y="V.H - 4" text-anchor="middle">Planungszyklus n</text>
          <text :x="12" :y="V.t + ph / 2" text-anchor="middle" :transform="`rotate(-90 12 ${V.t + ph / 2})`">Kapazität</text>
        </g>
        <!-- Zeitreihe -->
        <polyline :points="path" fill="none" :stroke="verhalten.col" stroke-width="2" stroke-linejoin="round" />
        <circle v-for="(x, n) in series" :key="n" :cx="px(n)" :cy="py(x)" r="2.6" :fill="verhalten.col" />
      </svg>

      <Bifurkation :marker="R" />
    </div>
  </div>
</template>
