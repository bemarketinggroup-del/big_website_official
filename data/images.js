/**
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  BMG — Gestione centralizzata immagini                           ║
 * ║                                                                  ║
 * ║  COME SOSTITUIRE UN'IMMAGINE:                                    ║
 * ║                                                                  ║
 * ║  Opzione A — File locale                                         ║
 * ║    1. Carica la nuova foto in /assets/images/                    ║
 * ║    2. Sostituisci il percorso nel blocco corrispondente          ║
 * ║    3. Salva — il sito usa la nuova foto                          ║
 * ║                                                                  ║
 * ║  Opzione B — Cloudinary (consigliato per produzione)             ║
 * ║    1. Vai su cloudinary.com → Media Library                      ║
 * ║    2. Carica la foto e copia l'URL con trasformazioni:           ║
 * ║       https://res.cloudinary.com/TUO_CLOUD/image/upload/         ║
 * ║         w_1200,f_webp,q_auto:good/NOME_FILE                      ║
 * ║    3. Sostituisci il valore "src" nello slot corrispondente      ║
 * ║    4. Salva — nessun'altra modifica al codice necessaria         ║
 * ║                                                                  ║
 * ║  CLOUDINARY — trasformazioni utili:                              ║
 * ║    w_400,f_webp,q_auto    →  mobile (400px larghezza)           ║
 * ║    w_800,f_webp,q_auto    →  tablet                             ║
 * ║    w_1200,f_webp,q_auto   →  desktop                            ║
 * ║    w_1920,f_webp,q_auto   →  hero full-width                    ║
 * ║    f_auto,q_auto          →  auto formato e qualità             ║
 * ╚══════════════════════════════════════════════════════════════════╝
 */

const BMG_IMAGES = {

  // ── HOMEPAGE — Hero slideshow (3 immagini in rotazione) ────────────
  hero: [
    {
      id: "homepageHero1",
      label: "Hero slide 1 — Vetera Matera",
      src:     "assets/images/portfolio/vetera_matera-1200.webp",
      fallback:"assets/images/portfolio/vetera_matera-1200.jpg",
      srcset:  "assets/images/portfolio/vetera_matera-400.webp 400w, assets/images/vetera_matera-800.webp 800w, assets/images/vetera_matera-1200.webp 1200w",
      // Cloudinary (sostituire con URL reale dopo upload):
      // src: "https://res.cloudinary.com/YOUR_CLOUD/image/upload/w_1200,f_webp,q_auto/vetera_matera"
    },
    {
      id: "homepageHero2",
      label: "Hero slide 2 — Favorita Hotel",
      src:     "assets/images/portfolio/favorita_hotel-1200.webp",
      fallback:"assets/images/portfolio/favorita_hotel-1200.jpg",
      srcset:  "assets/images/portfolio/favorita_hotel-400.webp 400w, assets/images/favorita_hotel-800.webp 800w, assets/images/favorita_hotel-1200.webp 1200w",
    },
    {
      id: "homepageHero3",
      label: "Hero slide 3 — Costiera Gin",
      src:     "assets/images/portfolio/costiera_gin-1200.webp",
      fallback:"assets/images/portfolio/costiera_gin-1200.jpg",
      srcset:  "assets/images/portfolio/costiera_gin-400.webp 400w, assets/images/costiera_gin-800.webp 800w, assets/images/costiera_gin-1200.webp 1200w",
    },
  ],

  // ── CHI SIAMO — Verticali editoriali ───────────────────────────────
  verticals: {
    verticalHotel: {
      id: "verticalHotel",
      label: "Verticale Hospitality — Grand Hotel La Favorita",
      src:     "assets/images/portfolio/favorita_hotel-800.webp",
      fallback:"assets/images/portfolio/favorita_hotel-800.jpg",
    },
    verticalBrand: {
      id: "verticalBrand",
      label: "Verticale Brand / Retail — Vetera Matera",
      src:     "assets/images/portfolio/vetera_matera-800.webp",
      fallback:"assets/images/portfolio/vetera_matera-800.jpg",
    },
    verticalFood: {
      id: "verticalFood",
      label: "Verticale Food & Beverage — Zest Restaurant",
      src:     "assets/images/portfolio/zest_restaurant-800.webp",
      fallback:"assets/images/portfolio/zest_restaurant-800.jpg",
    },
    verticalPersonal: {
      id: "verticalPersonal",
      label: "Verticale Personal Brand — Costiera Gin",
      src:     "assets/images/portfolio/costiera_gin-800.webp",
      fallback:"assets/images/portfolio/costiera_gin-800.jpg",
    },
  },

  // ── PORTFOLIO — Sfondi accordion (aperto su hover) ─────────────────
  accordion: {
    clientBellevueSyrene: {
      id: "clientBellevueSyrene",
      label: "Accordion — Bellevue Syrene (provvisoria)",
      src: "assets/images/portfolio/vetera_matera-800.webp",
    },
    clientGrandHotelAminta: {
      id: "clientGrandHotelAminta",
      label: "Accordion — Grand Hotel Aminta (provvisoria)",
      src: "assets/images/portfolio/favorita_hotel-800.webp",
    },
    clientGrandHotelLaFavorita: {
      id: "clientGrandHotelLaFavorita",
      label: "Accordion — Grand Hotel La Favorita",
      src: "assets/images/portfolio/favorita_hotel-800.webp",
    },
    clientStudioVallone: {
      id: "clientStudioVallone",
      label: "Accordion — Studio Vallone (provvisoria)",
      src: "assets/images/portfolio/vetera_matera-800.webp",
    },
    clientMarettimaBeachClub: {
      id: "clientMarettimaBeachClub",
      label: "Accordion — Marettima Beach Club (provvisoria)",
      src: "assets/images/portfolio/costiera_gin-800.webp",
    },
    clientVeteraMatera: {
      id: "clientVeteraMatera",
      label: "Accordion — Vetera Matera",
      src: "assets/images/portfolio/vetera_matera-800.webp",
    },
    clientZestRestaurant: {
      id: "clientZestRestaurant",
      label: "Accordion — Zest Restaurant",
      src: "assets/images/portfolio/zest_restaurant-800.webp",
    },
    clientCostieraGin: {
      id: "clientCostieraGin",
      label: "Accordion — Costiera Gin",
      src: "assets/images/portfolio/costiera_gin-800.webp",
    },
  },

  // ── PAGINE PROGETTO — Gallery (slot g1–g5 per ogni progetto) ───────
  projectGalleries: {
    "bellevue-syrene": [
      "assets/images/portfolio/vetera_matera-1200.webp",
      "assets/images/portfolio/favorita_hotel-1200.webp",
      "assets/images/portfolio/vetera_matera-800.webp",
      "assets/images/portfolio/favorita_hotel-800.webp",
      "assets/images/portfolio/vetera_matera-1200.webp",
    ],
    "grand-hotel-aminta": [
      "assets/images/portfolio/favorita_hotel-1200.webp",
      "assets/images/portfolio/vetera_matera-1200.webp",
      "assets/images/portfolio/favorita_hotel-800.webp",
      "assets/images/portfolio/vetera_matera-800.webp",
      "assets/images/portfolio/favorita_hotel-1200.webp",
    ],
    "grand-hotel-la-favorita": [
      "assets/images/portfolio/favorita_hotel-1200.webp",
      "assets/images/portfolio/favorita_hotel-800.webp",
      "assets/images/portfolio/favorita_hotel-1200.webp",
      "assets/images/portfolio/vetera_matera-800.webp",
      "assets/images/portfolio/favorita_hotel-1200.webp",
    ],
    "vetera-matera": [
      "assets/images/portfolio/vetera_matera-1200.webp",
      "assets/images/portfolio/vetera_matera-800.webp",
      "assets/images/portfolio/vetera_matera-1200.webp",
      "assets/images/portfolio/favorita_hotel-800.webp",
      "assets/images/portfolio/vetera_matera-1200.webp",
    ],
    "zest-restaurant": [
      "assets/images/portfolio/zest_restaurant-1200.webp",
      "assets/images/portfolio/zest_restaurant-800.webp",
      "assets/images/portfolio/zest_restaurant-1200.webp",
      "assets/images/portfolio/costiera_gin-800.webp",
      "assets/images/portfolio/zest_restaurant-1200.webp",
    ],
    "costiera-gin": [
      "assets/images/portfolio/costiera_gin-1200.webp",
      "assets/images/portfolio/costiera_gin-800.webp",
      "assets/images/portfolio/costiera_gin-1200.webp",
      "assets/images/portfolio/zest_restaurant-800.webp",
      "assets/images/portfolio/costiera_gin-1200.webp",
    ],
  },

};

// Rende disponibile globalmente per React e HTML puri
if (typeof window !== "undefined") window.BMG_IMAGES = BMG_IMAGES;
if (typeof module !== "undefined") module.exports = BMG_IMAGES;
