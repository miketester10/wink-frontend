# WiNK Web Application Test - Google Books Search

Ho creato una **Single Page Application (SPA)** in React che permette di cercare libri sfruttando le API pubbliche di **Google Books**.

## Tecnologie utilizzate

Per il progetto ho cercato di rispettare i requisiti e coprire anche alcuni dei “nice-to-have” suggeriti:

- **React 19** con **Vite**: molto più veloce per lo sviluppo locale rispetto a Create React App.
- **TypeScript**: garantisce sicurezza dei tipi e riduce il rischio di bug imprevisti.
- **TailwindCSS**: il file indicava l’uso dell’ultima versione di Bootstrap, ma tra i nice-to-have c’era anche Tailwind o DaisyUI. Ho scelto Tailwind perché permette di creare layout responsivi facilmente e supporta senza complicazioni la **Dark Mode**.
- **TanStack React Query**: per gestire il fetching dei dati, il caching, lo stato di caricamento e gli eventuali errori in modo semplice.
- **Zustand** (invece di Redux Toolkit): il PDF suggeriva Redux, ma per un’app di queste dimensioni Zustand è un’alternativa moderna, leggera e veloce da configurare, mantenendo lo stesso risultato finale.

---

## Funzionalità principali

- **Ricerca live**: i libri appaiono man mano che si digita; ho aggiunto un debounce per evitare troppe chiamate alle API e superare il limite di quota di Google Books.
- **Paginazione dinamica**, calcolata in base al totale degli elementi restituiti (`Math.ceil(totalItems / pageSize)`).
- **Selezione del numero di elementi per pagina**: 5, 10, 15 o 20.
- **Card dei libri**: la descrizione è troncata a due righe tramite la utility CSS `line-clamp-2`, con i puntini di sospensione alla fine.
- **Pagina di dettaglio**: cliccando sulla card si accede alla pagina di dettaglio del libro tramite routing; è presente anche un pulsante per aprirlo esternamente tramite l’`infoLink`.

---

## Avvio del progetto in locale

Per testare l’app sul tuo computer, procedi così:

1. Clona la repository e apri il terminale nella cartella del progetto.
   ```bash
   git clone https://github.com/miketester10/wink-frontend.git
   cd wink-frontend
   ```
2. Installa i pacchetti Node:
   ```bash
   npm install
   ```
3. Crea un file `.env` partendo da `.env.example`:
   ```bash
   cp .env.example .env
   ```
   Apri il nuovo file `.env` che hai appena creato e inserisci la tua API Key di Google Books al posto del valore segnaposto per la variabile `VITE_GOOGLE_BOOKS_API_KEY`.
4. Avvia il server di dev:
   ```bash
   npm run dev
   ```

A questo punto, apri il link mostrato nel terminale (solitamente è `http://localhost:5173/`) per visualizzare l’app nel browser.
