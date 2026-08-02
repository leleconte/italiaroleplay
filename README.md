# Italia RP — sito ufficiale

Sito statico responsive per un server FiveM Roleplay, con Home, Shop, Regolamento e collegamento Discord.

## Discord

Il link è già configurato in `assets/js/config.js`:

`https://discord.gg/upX4CP996R`

## Attivare PayPal

Apri `assets/js/config.js` e inserisci il Client ID pubblico PayPal:

```js
paypalClientId: "IL_TUO_CLIENT_ID_PUBBLICO"
```

Non inserire mai il Client Secret nel codice del sito.

### Pagamenti singoli

Appartamenti, case, ville, attività e fazioni usano automaticamente i PayPal Smart Buttons non appena viene inserito il Client ID.

### Abbonamenti VIP ogni 30 giorni

Per ogni VIP crea un piano mensile nella dashboard PayPal e inserisci il relativo Plan ID in `assets/js/shop-data.js`:

```js
paypalPlanId: "P-XXXXXXXXXXXX"
```

Finché il Plan ID non viene inserito, la card mostra il pulsante per acquistare o richiedere assistenza tramite Discord.

### Proprietà Custom

La Proprietà Custom parte da 79,99 € e usa il pulsante “Richiedi preventivo”, perché il prezzo finale deve essere concordato con lo staff.

## Modificare il catalogo

Tutti i prodotti, prezzi, descrizioni e vantaggi sono in:

`assets/js/shop-data.js`

## Pubblicazione

Carica l’intera cartella `italia-rp-site` sul tuo hosting oppure su GitHub Pages, Netlify o Cloudflare Pages.
