# Chaostheorie in der Unternehmensführung

Vortragsfolien für das Modul Unternehmensführung (Master Systems Engineering, SE38). Die Präsentation ist mit [Slidev](https://sli.dev) gebaut und wird automatisch als Website veröffentlicht:

**https://dxdye.github.io/unternehmensfuehrung_SE38/**

## Worum es geht

Die Vorlesung beschreibt drei Perioden der Unternehmensführung: stabiles Wachstum, Wettbewerb, Hyperwettbewerb. Der Vortrag zeigt, dass sich diese drei Perioden mit einer einzigen Gleichung beschreiben lassen, der logistischen Abbildung

```
x(n+1) = R · x(n) · (1 − x(n))      mit   R = 1 + r · h
```

Dabei ist `r` die Dynamik des Marktes und `h` der Planungs- bzw. Reaktionstakt des Unternehmens. Das Produkt `r · h` ist das Verhältnis von benötigter zu verfügbarer Reaktionszeit, also die **Zeitschere** als Zahl. Steigt es über 2 (`R > 3`), entstehen Dauerzyklen, ab etwa 2,57 (`R > 3,57`) deterministisches Chaos. Die Kernaussage: Das Chaos steckt nicht im Markt, sondern in der getakteten Steuerung.

## Aufbau der Präsentation

| Kapitel | Inhalt |
|---|---|
| 0 | Titel mit dem Bifurkationsdiagramm als Hintergrund (Cliffhanger), Ausgangspunkt, Agenda |
| 1 | Die Zeitschere: verfügbare vs. benötigte Reaktionszeit, Anatomie der benötigten Reaktionszeit |
| 2 | Chaostheorie: deterministisch ≠ vorhersagbar, Rückkopplungen und Verzögerungen |
| 3 | Die logistische Gleichung: Herleitung von `R = 1 + r·h`, Tabelle mit steigender Dynamik, drei Bereiche, Bifurkationsdiagramm, **Live-Simulation mit Regler**, Schmetterlingseffekt, Hutchinson-Totzeit, Frühwarnsignale |
| 4 | Synchronisation: gekoppelte logistische Gleichungen, Kuramoto-Schwelle |
| 5 | Fallbeispiel Halbleiterkrise 2020–2023 |
| 6 | Vier Hebel gegen die Zeitschere, warum die Wirtschaft trotzdem funktioniert, Grenzen, Fazit, Literatur |

Insgesamt 36 Folien, ausgelegt auf etwa 35 bis 45 Minuten Vortrag plus Diskussion.

## Interaktive Komponenten

Alle Grafiken werden live im Browser gerechnet, es gibt keine eingebetteten Bilder.

| Komponente | Datei | Zweck |
|---|---|---|
| `<Zeitschere />` | `components/Zeitschere.vue` | Schematische SVG-Grafik der Zeitschere mit den drei Perioden als Farbbänder |
| `<Bifurkation />` | `components/Bifurkation.vue` | Bifurkationsdiagramm der logistischen Abbildung auf Canvas. Props: `marker` (zeichnet eine Linie bei R), `plain` (nur Punkte und Bänder, für den Titelhintergrund) |
| `<Oszillation />` | `components/Oszillation.vue` | Regler für `r·h` mit Zeitreihe der Kapazitätsplanung links und Bifurkationsdiagramm mit Marker rechts. Erkennt das Langzeitverhalten (Gleichgewicht, n-er-Zyklus, Chaos) durch Simulation |

Die Farben sind durchgängig: grün = stabiles Wachstum, gelb = Wettbewerb, rot = Hyperwettbewerb.

## Lokal starten

Voraussetzungen: Node 22 oder neuer, pnpm 11 (wird bei Bedarf automatisch geladen).

```bash
pnpm install
pnpm dev          # Entwicklungsserver, öffnet den Browser
pnpm build        # statische Website nach dist/
pnpm export       # PDF-Export (braucht playwright-chromium, siehe Slidev-Doku)
```

Nützliche Adressen im Dev-Modus:

- `http://localhost:3030/` Folien
- `http://localhost:3030/presenter/` Presenter-Ansicht mit Sprechernotizen und Zeit
- `http://localhost:3030/overview/` Übersicht aller Folien

## Leitfaden für den Vortrag

**Vorbereitung**

- Presenter-Modus auf dem eigenen Bildschirm öffnen, die Folienansicht auf dem Beamer. Alle Sprechernotizen stehen in `slides.md` in den `<!-- -->`-Blöcken unter der jeweiligen Folie.
- Browser auf Vollbild, Zoom 100 %. Die Folien sind auf 16:9 ausgelegt.
- Die Live-Simulation einmal vorab durchspielen, damit der Regler im Vortrag sitzt.

**Dramaturgie**

1. **Titelfolie als Cliffhanger.** Das Muster im Hintergrund nicht erklären. Ein Satz genügt: „Dieses Bild ist Ihre Jahresplanung. In 30 Minuten können Sie es lesen.“
2. **Kapitel 1 und 2 zügig.** Die Zeitschere und die Begriffe Rückkopplung und Verzögerung sind Vorbereitung, die Pointe kommt in Kapitel 3.
3. **Herleitung von `R = 1 + r·h`** ist der Dreh- und Angelpunkt. Hier Zeit nehmen. Die Folie „Wo steckt die Reaktionszeit?“ erklärt, warum die stetige Gleichung immer stabil ist und erst der Takt `h` Zyklen und Chaos erzeugt.
4. **Bifurkationsdiagramm** ist die Auflösung des Cliffhangers: „Das ist das Bild vom Anfang.“
5. **Live-Simulation.** Regler langsam von links nach rechts ziehen oder ▶ für den automatischen Durchlauf. Stationen, an denen man kurz anhalten sollte:
   - `r·h` bis 1: glatte S-Kurve, das Lebenszyklusmodell
   - `r·h` ≈ 1,8: erstes Überschießen, noch stabil
   - `r·h` = 2 (`R` = 3): erste Bifurkation, Dauerzyklus, der Schweinezyklus
   - `r·h` ≈ 2,57: Chaos
   - `r·h` ≈ 2,83: Ordnungsfenster mit 3er-Zyklus mitten im Chaos
   Der Regler reagiert auf Maus und Pfeiltasten. Pfeiltasten im Regler blättern nicht weiter.
6. **Fallbeispiel** übersetzt alles in Zahlen aus der Praxis: Medianbestand unter fünf Tage gegen Lieferzeiten von 26 Wochen.
7. **Kapitel 6** beantwortet die beiden Fragen, die das Publikum jetzt hat: Was tun? Und warum bricht nicht alles zusammen?
8. **Fazit** endet mit dem May-Zitat, danach die Diskussionsfrage: „Wo steht euer Unternehmen im Bifurkationsdiagramm?“

**Zahlen und Quellen**

- Alle Tabellenwerte, die mit `*` markiert sind, stammen aus eigener Simulation (Python). Die Formel und der Startwert stehen auf der jeweiligen Folie, die Werte lassen sich mit wenigen Zeilen Code nachrechnen.
- Alle Belege in Kapitel 6 sind mit vollständigen Fundstellen im Literaturverzeichnis aufgeführt. Ein Prüfprotokoll mit Volltexten liegt lokal unter `quellen/` und ist bewusst nicht im Repository, weil es urheberrechtlich geschützte Kopien enthält.
- Die Zuordnung der drei Perioden zu den Bereichen der Gleichung ist eine Analogie, kein empirischer Beweis. Das sagt die Folie „Grenzen“ ausdrücklich, und das sollte man bei Nachfragen auch so sagen.

**Mögliche Rückfragen und wo die Antwort steht**

| Frage | Folie bzw. Notiz |
|---|---|
| Woher kommt `R = 1 + r·h`? | „Wo steckt die Reaktionszeit?“, Herleitung in der Sprechernotiz |
| Warum Werte über 100 %? | Tabelle „Gleiche Organisation, steigende Dynamik“: Kapazitätsform, Überkapazität |
| Ist das Chaos in Wirtschaftsdaten nachweisbar? | „Grenzen“, Brock & Sayers 1988 |
| Was ist der Schweinezyklus? | Hanau 1928, Ezekiel 1938; nicht die Tiere schwingen, sondern die Entscheidungen |
| Warum funktioniert die Wirtschaft trotzdem? | eigene Folie in Kapitel 6 |

## Veröffentlichung

Jeder Push auf `main` baut die Folien über GitHub Actions (`.github/workflows/deploy.yml`) und veröffentlicht sie auf GitHub Pages. Einmalig muss in den Repository-Einstellungen unter *Settings → Pages → Build and deployment* die Quelle auf **GitHub Actions** gestellt werden. Der Workflow lässt sich auch manuell über *Actions → Run workflow* starten.

## Technische Hinweise

- Slidev 53 mit dem Default-Theme, UnoCSS, KaTeX für Formeln, Mermaid für das Rückkopplungsdiagramm.
- `vite.config.ts` schaltet die CSS-Minifizierung im Build ab. Grund ist ein Fehler in UnoCSS 66.10, der beim Auflösen der `--uno:`-Direktiven in Slidevs eigenem CSS ungültigen Code ans Dateiende hängt. Der Browser ignoriert das, der lightningcss-Minifier von Vite 8 bricht ab. Mit einer neueren UnoCSS-Version kann die Datei vermutlich entfallen.
- In SVG-Komponenten werden Schriftgrößen und Farben als `style` gesetzt, nicht als Attribut. Slidevs UnoCSS-Attributify würde `font-size="12"` sonst als Utility-Klasse lesen und daraus `3rem` machen.
- `slides.md` enthält den gesamten Inhalt. Neue Folien werden mit `---` getrennt, Sprechernotizen stehen als HTML-Kommentar am Ende der Folie.
