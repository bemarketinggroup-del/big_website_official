# BMG — Mappa dei File

Guida rapida a tutti i file del progetto e la loro funzione.

---

## Pagine principali (`/`)

| File | Funzione |
|---|---|
| `index.html` | Homepage BMG — hero, chi siamo, servizi, portfolio, contatti |
| `beviral.html` | Pagina sub-brand BeViral — hero, servizi, metodo, CTA |

## Case study (`/projects/`)

| File | Cliente |
|---|---|
| `bellevue-syrene.html` | Bellevue Syrene — Hospitality / Luxury |
| `grand-hotel-aminta.html` | Grand Hotel Aminta — Hospitality / Resort |
| `grand-hotel-la-favorita.html` | Grand Hotel La Favorita — Hospitality |
| `vetera-matera.html` | Vetera Matera — Hospitality / Boutique |
| `zest-restaurant.html` | Zest Restaurant — Food |
| `costiera-gin.html` | Costiera Gin — Beverage / Brand |

---

## CSS (`/assets/css/`)

| File | Contenuto |
|---|---|
| `global.css` | `:root` variabili colori/spaziatura, reset box-model, `@keyframes`, `.reveal`, `.mono`, `.serif-i` |
| `home.css` | Stili specifici homepage (vert-slide, acc-head, acc-body, sezione servizi) |
| `responsive.css` | Tutti i breakpoint `@media` della homepage (`max-width: 860px`, `max-width: 480px`) |
| `beviral.css` | Tutto il CSS della pagina BeViral (nav, card, sticker, carosello, metodo) |
| `projects.css` | Stili delle pagine case study (header, gallery, stats, bio) |

---

## JavaScript (`/assets/js/`)

| File | Funzione |
|---|---|
| `image-slot.js` | Web Component `<image-slot>` — drag & drop immagini con persistenza sidecar JSON |

> **Note:** La logica React (componenti, accordion, carosello telefoni, form Calendly, slider clienti) è embedded nell'`<script type="text/babel">` di `index.html` e `beviral.html`. Questa scelta è intenzionale: il sito usa Babel standalone e non ha un sistema di build.

---

## Immagini (`/assets/images/`)

| Cartella | Contenuto |
|---|---|
| `logos/` | `logo-beviral-blue.png`, `logo-beviral-white.png` |
| `homepage/` | `hero-1.png`, `hero-2.png`, `hero-3.png` (slideshow), `hero-mobile.mp4` |
| `beviral/` | `sticker-black/blue/magenta/yellow.png`, `iphone-frame.png` |
| `portfolio/` | Foto clienti WebP ottimizzate: `{nome}-400.webp`, `{nome}-800.webp`, `{nome}-1200.webp` |
| `ui/` | `bmg-logo.png` e icone UI generali |

**Foto portfolio disponibili:**
- `favorita_hotel-{400,800,1200}.webp`
- `vetera_matera-{400,800,1200}.webp`
- `zest_restaurant-{400,800,1200}.webp`
- `costiera_gin-{400,800,1200}.webp`

---

## Dati (`/data/`)

| File | Funzione |
|---|---|
| `images.js` | Mapping centralizzato di tutti gli slot immagine del sito. Caricato prima dello script React. Espone `window.BMG_IMAGES` con percorsi locali e commenti per URL Cloudinary. |

---

## Documentazione (`/docs/`)

| File | Funzione |
|---|---|
| `FILE-MAP.md` | Questo file |
| `UPDATE-GUIDE.md` | Guida per aggiornare il sito dopo un export da Claude Design |

---

## File di configurazione (root)

| File | Funzione |
|---|---|
| `README.md` | Avvio locale, deploy, struttura |
| `.image-slots.state.json` | Stato persistente degli slot immagine drag & drop (auto-generato) |
| `CNAME` | Dominio personalizzato per GitHub Pages (da creare se necessario) |
