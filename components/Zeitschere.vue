<template>
  <!-- Schematische Zeitschere: verfügbare Reaktionszeit sinkt, benötigte steigt;
       die drei Perioden der Vorlesungsfolie als Hintergrundbänder. -->
  <svg viewBox="0 0 600 300" class="w-full" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif">
    <rect x="50" y="25" width="200" height="235" fill="#16a34a" fill-opacity="0.08" />
    <rect x="250" y="25" width="170" height="235" fill="#f59e0b" fill-opacity="0.10" />
    <rect x="420" y="25" width="160" height="235" fill="#c8102e" fill-opacity="0.10" />
    <text x="150" y="18" text-anchor="middle" font-size="12" fill="currentColor">stabiles Wachstum</text>
    <text x="335" y="18" text-anchor="middle" font-size="12" fill="currentColor">Wettbewerb</text>
    <text x="500" y="18" text-anchor="middle" font-size="12" fill="currentColor">Hyperwettbewerb</text>
    <line x1="50" y1="260" x2="585" y2="260" stroke="currentColor" />
    <line x1="50" y1="260" x2="50" y2="25" stroke="currentColor" />
    <polygon points="420,162 580,126 580,210" fill="#c8102e" fill-opacity="0.35" />
    <line x1="50" y1="50" x2="580" y2="210" stroke="#2563eb" stroke-width="3" />
    <line x1="50" y1="245" x2="580" y2="126" stroke="#c8102e" stroke-width="3" />
    <text x="60" y="44" font-size="12" fill="#2563eb">verfügbare Reaktionszeit</text>
    <text x="120" y="252" font-size="12" fill="#c8102e">benötigte Reaktionszeit</text>
    <text x="545" y="172" text-anchor="middle" font-size="11" fill="currentColor">Lücke</text>
    <text x="50" y="276" text-anchor="middle" font-size="11" fill="currentColor">1945</text>
    <text x="250" y="276" text-anchor="middle" font-size="11" fill="currentColor">Mitte 70er</text>
    <text x="420" y="276" text-anchor="middle" font-size="11" fill="currentColor">Mitte 90er</text>
    <text x="580" y="276" text-anchor="middle" font-size="11" fill="currentColor">heute</text>
    <text x="20" y="145" font-size="12" fill="currentColor" text-anchor="middle" transform="rotate(-90 20 145)">Zeit</text>
    <text x="585" y="294" text-anchor="end" font-size="10" fill="currentColor" opacity="0.6">schematisch</text>
  </svg>
</template>
