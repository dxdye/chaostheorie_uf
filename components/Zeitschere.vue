<template>
  <!-- Schematische Zeitschere: verfügbare Reaktionszeit sinkt, benötigte steigt;
       die drei Perioden der Vorlesungsfolie als Hintergrundbänder.
       Schriftgrößen bewusst als style statt als SVG-Attribut: Slidevs UnoCSS-Attributify
       würde das Attribut sonst als Utility lesen (Wert 12 ergibt 3rem). -->
  <svg viewBox="0 0 600 300" class="w-full" xmlns="http://www.w3.org/2000/svg" style="font-family: sans-serif">
    <rect x="50" y="25" width="200" height="235" style="fill: #16a34a; fill-opacity: 0.08" />
    <rect x="250" y="25" width="170" height="235" style="fill: #f59e0b; fill-opacity: 0.10" />
    <rect x="420" y="25" width="160" height="235" style="fill: #c8102e; fill-opacity: 0.10" />
    <g style="font-size: 12px; fill: currentColor" text-anchor="middle">
      <text x="150" y="18">stabiles Wachstum</text>
      <text x="335" y="18">Wettbewerb</text>
      <text x="500" y="18">Hyperwettbewerb</text>
    </g>
    <line x1="50" y1="260" x2="585" y2="260" style="stroke: currentColor" />
    <line x1="50" y1="260" x2="50" y2="25" style="stroke: currentColor" />
    <polygon points="420,162 580,126 580,210" style="fill: #c8102e; fill-opacity: 0.35" />
    <line x1="50" y1="50" x2="580" y2="210" style="stroke: #2563eb; stroke-width: 3" />
    <line x1="50" y1="245" x2="580" y2="126" style="stroke: #c8102e; stroke-width: 3" />
    <text x="60" y="44" style="font-size: 12px; fill: #2563eb">verfügbare Reaktionszeit</text>
    <text x="120" y="252" style="font-size: 12px; fill: #c8102e">benötigte Reaktionszeit</text>
    <g style="font-size: 11px; fill: currentColor" text-anchor="middle">
      <text x="545" y="172">Lücke</text>
      <text x="50" y="276">1945</text>
      <text x="250" y="276">Mitte 70er</text>
      <text x="420" y="276">Mitte 90er</text>
      <text x="580" y="276">heute</text>
    </g>
    <text x="20" y="145" style="font-size: 12px; fill: currentColor" text-anchor="middle" transform="rotate(-90 20 145)">Zeit</text>
    <text x="585" y="294" text-anchor="end" style="font-size: 10px; fill: currentColor; opacity: 0.6">schematisch</text>
  </svg>
</template>
