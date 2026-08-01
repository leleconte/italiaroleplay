# Italia RP — sito statico

Sito responsive multi-pagina per un server FiveM Roleplay.

## Pagine
- `index.html` — Home
- `shop.html` — Shop con card vuote e integrazione PayPal predisposta
- `regolamento.html` — Area regolamento vuota
- `discord.html` — Invito Discord

## Discord
Il link è già configurato in `assets/js/config.js`:

```js
discordUrl: "https://discord.gg/upX4CP996R"
```

## Attivare PayPal
1. Apri `assets/js/config.js`.
2. Inserisci il **Client ID pubblico** PayPal in `paypalClientId`.
3. Non inserire mai il Client Secret nei file del sito.
4. Aggiungi i prodotti nell'array di `assets/js/shop-data.js` seguendo l'esempio commentato.

Per un negozio reale è consigliato creare gli ordini e validare gli importi da un backend, così il prezzo non può essere modificato dal browser.

## Pubblicazione
Puoi caricare direttamente tutti i file su GitHub Pages, Netlify, Vercel o nel tuo hosting web.
