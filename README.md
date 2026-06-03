# BMG — Be Marketing Group · Sito Web

Sito statico HTML/CSS/JS con React (Babel standalone). Nessuna build necessaria.

---

## Avvio locale

```bash
# Opzione A — npx serve (consigliato)
npx serve .
# poi apri http://localhost:3000

# Opzione B — Python
python3 -m http.server 8080
# poi apri http://localhost:8080

# Opzione C — VS Code Live Server
# Click destro su index.html → Open with Live Server
```

> ⚠️ Alcuni browser bloccano `fetch()` su `file://`. Usa sempre un server locale.

---

## Struttura del progetto

```
/
├── index.html              ← Homepage BMG
├── beviral.html            ← Pagina BeViral (sub-brand)
├── projects/               ← Case study clienti
│   ├── bellevue-syrene.html
│   ├── grand-hotel-aminta.html
│   ├── grand-hotel-la-favorita.html
│   ├── vetera-matera.html
│   ├── zest-restaurant.html
│   └── costiera-gin.html
├── assets/
│   ├── css/
│   │   ├── global.css      ← Variabili CSS, reset, keyframes, font
│   │   ├── home.css        ← Stili specifici homepage
│   │   ├── beviral.css     ← Stili pagina BeViral
│   │   ├── projects.css    ← Stili pagine case study
│   │   └── responsive.css  ← Tutti i breakpoint @media
│   ├── js/
│   │   └── image-slot.js   ← Web component drag-and-drop immagini
│   └── images/
│       ├── logos/          ← Logo BeViral blu e bianco
│       ├── homepage/       ← Hero slideshow (PNG + video mobile)
│       ├── beviral/        ← Sticker PNG + frame iPhone
│       ├── portfolio/      ← Foto clienti WebP (400/800/1200w)
│       └── ui/             ← Logo BMG e icone UI
├── data/
│   └── images.js           ← Mapping centralizzato immagini + guida Cloudinary
├── docs/
│   ├── FILE-MAP.md         ← Mappa completa dei file
│   └── UPDATE-GUIDE.md     ← Come aggiornare dopo un export da Claude Design
└── README.md
```

---

## Deploy

### GitHub Pages
1. **Settings → Pages → Source:** branch `main`, cartella `/`
2. Live su: `https://bemarketinggroup-del.github.io/big_website_official/`

### Netlify / Vercel (drag & drop, zero config)
1. Comprimi la cartella in `.zip`
2. Trascina su [netlify.com/drop](https://netlify.com/drop)

### Dominio personalizzato
Crea file `CNAME` nella root:
```
bemarketinggroup.it
```

---

## Tecnologie

| Tecnologia | Versione | Uso |
|---|---|---|
| React + ReactDOM | 18.3.1 | UI components |
| Babel Standalone | 7.29.0 | Compila JSX nel browser |
| CSS Custom Properties | — | Design tokens |
| IntersectionObserver | — | Animazioni scroll |
| Web Components | — | `<image-slot>` drag & drop |

---

## Branch

| Branch | Scopo |
|---|---|
| `main` | Produzione attiva |
| `backup/pre-refactor` | Snapshot prima della riorganizzazione |

**Be Marketing Group** · bemarketinggroup@gmail.com
