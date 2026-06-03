# Guida all'aggiornamento — Export da Claude Design

Questa guida spiega come aggiornare il sito dopo aver esportato una nuova versione da Claude Design, senza perdere le modifiche già fatte.

---

## Flusso consigliato

```
Claude Design (esporta) → Identifica cosa è cambiato → Aggiorna solo i file giusti → Push su GitHub
```

---

## 1. Prima di modificare: crea un branch di backup

```bash
git checkout main
git pull origin main
git checkout -b backup/$(date +%Y-%m-%d)
git push origin backup/$(date +%Y-%m-%d)
git checkout main
```

---

## 2. Cosa sostituire dopo ogni export

### Export completo di `index.html`

Il file esportato da Claude Design contiene tutto inline (CSS + JS + HTML). Dopo l'export:

1. **Non sovrascrivere direttamente** — il file riorganizzato ha percorsi diversi
2. Copia i blocchi `<script type="text/babel">` aggiornati nel file esistente
3. Se ci sono nuovi `<style>`, aggiungi le regole ai file CSS in `/assets/css/`
4. Verifica che i link alle pagine progetto usino `projects/` e non `progetto-`

### Export di una pagina progetto

1. Copia il file esportato in `/projects/` con nome kebab-case
2. Aggiorna i percorsi:
   - `<style>` → `<link rel="stylesheet" href="../assets/css/projects.css">`
   - `src="assets/` → `src="../assets/`
   - `src="image-slot.js"` → `src="../assets/js/image-slot.js"`
   - `href="index.html"` → `href="../index.html"`

### Nuove immagini

1. Ottimizza le immagini in WebP a 400/800/1200px con ImageMagick:
   ```bash
   for w in 400 800 1200; do
     convert nome_foto.jpg -resize "${w}x>" -quality 82 "assets/images/portfolio/nome_foto-${w}.webp"
   done
   ```
2. Aggiorna i riferimenti in `data/images.js`

---

## 3. Aggiornare le immagini via Cloudinary

Apri `/data/images.js` e per ogni slot che vuoi aggiornare:

```js
// Prima (locale):
src: "assets/images/portfolio/favorita_hotel-1200.webp"

// Dopo (Cloudinary):
src: "https://res.cloudinary.com/TUO_CLOUD/image/upload/w_1200,f_webp,q_auto/favorita_hotel"
```

Il cambio è immediato — nessun'altra modifica al codice necessaria.

---

## 4. Aggiungere un nuovo case study

1. Crea `/projects/nome-cliente.html` (copia da un progetto esistente)
2. Aggiorna testi, immagini e stats
3. Aggiungi il cliente all'array `PROJECT_LIST` in `index.html`
4. Aggiungi le immagini in `assets/images/portfolio/`
5. Aggiorna `data/images.js` con i nuovi slot
6. Aggiungi la voce a `docs/FILE-MAP.md`

---

## 5. Procedura di rollback con Git

### Rollback all'ultimo commit funzionante

```bash
# Vedi la storia dei commit
git log --oneline -10

# Torna a un commit specifico (es. abc1234)
git revert abc1234
# oppure, se vuoi azzerare tutto:
git reset --hard abc1234
git push --force origin main
```

### Ripristino da branch di backup

```bash
# Lista tutti i branch di backup
git branch -r | grep backup/

# Ripristina da un backup specifico
git checkout main
git reset --hard origin/backup/pre-refactor
git push --force origin main
```

### Ripristino di un singolo file

```bash
# Ripristina solo index.html all'ultimo commit
git checkout HEAD -- index.html
```

---

## 6. Checklist pre-deploy

- [ ] Le pagine si aprono senza errori nella console del browser
- [ ] Le immagini si caricano (nessun 404 nella Network tab)
- [ ] Il form Calendly si apre correttamente
- [ ] Lo slider clienti scorre senza interruzioni
- [ ] L'accordion portfolio si apre su hover (desktop) e tap (mobile)
- [ ] La pagina BeViral carica logo e sticker
- [ ] Il carosello telefoni BeViral funziona su mobile

---

## 7. Deploy rapido

```bash
git add .
git commit -m "Update: descrizione della modifica"
git push origin main
# GitHub Pages aggiorna automaticamente in ~1 minuto
```
