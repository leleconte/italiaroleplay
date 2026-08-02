# Italia RP — sito completo

Sito statico completo per il server FiveM **Italia RP**.

## Già configurato

- Nome progetto: **Italia RP**
- Discord: `https://discord.gg/upX4CP996R`
- PayPal.Me: `https://paypal.me/italiaroleplay`
- Valuta: EUR
- Shop completo con Pack Case, VIP, attività e fazioni
- Checkout personalizzato PayPal.Me
- Codice richiesta univoco per ogni ordine
- Testo del ticket copiabile
- Pagina regolamento predisposta e lasciata vuota
- Grafica responsive per desktop, tablet e telefono
- Pagina 404

## Come pubblicarlo

Carica **tutti i file e tutte le cartelle** contenuti in questa cartella nella cartella pubblica del tuo hosting, per esempio:

- `public_html`
- `www`
- `htdocs`
- root del progetto su Netlify, GitHub Pages o Cloudflare Pages

La pagina iniziale è `index.html`.

## Pagamenti

I pulsanti generano link come:

`https://paypal.me/italiaroleplay/14.99EUR`

PayPal.Me non comunica automaticamente l'esito al sito. Dopo il pagamento, il cliente deve aprire un ticket Discord e inviare ricevuta e ID transazione. Il checkout prepara automaticamente i dati da copiare.

## Modificare prodotti e prezzi

Apri:

`assets/js/shop-data.js`

## Modificare Discord o PayPal.Me

Apri:

`assets/js/config.js`

Configurazione già presente:

```js
window.SITE_CONFIG = {
  discordUrl: "https://discord.gg/upX4CP996R",
  paypalMeName: "italiaroleplay",
  currency: "EUR",
  brandName: "Italia RP"
};
```

## File principali

- `index.html`: home
- `shop.html`: shop
- `regolamento.html`: regolamento
- `discord.html`: pagina Discord
- `404.html`: errore 404
- `assets/css/style.css`: grafica completa
- `assets/js/main.js`: menu, animazioni e link
- `assets/js/shop.js`: checkout PayPal.Me
- `assets/js/shop-data.js`: catalogo
- `assets/img/`: logo e favicon
