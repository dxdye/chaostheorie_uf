// Kein `import { defineConfig } from 'vite'`: vite ist nur transitiv über Slidev
// installiert und wäre hier nicht auflösbar. Ein einfaches Objekt reicht.
//
// Hintergrund: UnoCSS 66.10 hängt beim Auflösen der `--uno:`-Direktiven in Slidevs
// eigenem CSS den Ersetzungstext zusätzlich ans Dateiende an. Der Browser ignoriert
// das, der lightningcss-Minifier von Vite 8 bricht jedoch beim Build ab.
// Ohne CSS-Minifizierung läuft der Build durch (esbuild ist in Vite 8 nicht enthalten).
export default {
  build: {
    cssMinify: false,
  },
}
