/*
  Catalogo Italia RP.

  Pagamenti:
  - "order": pagamento singolo tramite PayPal.Me.
  - "subscription": accesso VIP per 30 giorni con rinnovo manuale tramite PayPal.Me.
  - "quote": richiesta personalizzata gestita tramite Discord.
*/
window.SHOP_PRODUCTS = [
  {
    id: "appartamento",
    category: "Pack Case",
    name: "Appartamento",
    description: "Una soluzione essenziale per iniziare la tua vita su Italia RP con una proprietà personale.",
    price: "14.99",
    paymentType: "order",
    paypalEnabled: true,
    mediaLabel: "APP"
  },
  {
    id: "casa-premium",
    category: "Pack Case",
    name: "Casa Premium",
    description: "Una casa più esclusiva, pensata per chi desidera maggiore prestigio e comfort in città.",
    price: "29.99",
    paymentType: "order",
    paypalEnabled: true,
    mediaLabel: "HOME"
  },
  {
    id: "villa-luxury",
    category: "Pack Case",
    name: "Villa Luxury",
    description: "Una proprietà di lusso per vivere il roleplay con uno stile unico e riconoscibile.",
    price: "49.99",
    paymentType: "order",
    paypalEnabled: true,
    mediaLabel: "VILLA"
  },
  {
    id: "proprieta-custom",
    category: "Pack Case",
    name: "Proprietà Custom",
    description: "Proprietà realizzata o configurata in base alle tue richieste. Il prezzo finale viene concordato con lo staff.",
    price: "79.99",
    pricePrefix: "da ",
    paymentType: "quote",
    paypalEnabled: false,
    buttonLabel: "Richiedi preventivo",
    mediaLabel: "CUSTOM"
  },
  {
    id: "vip-cittadino",
    category: "VIP",
    name: "VIP Cittadino",
    description: "Abbonamento valido per 30 giorni.",
    price: "7.99",
    priceSuffix: " / 30 giorni",
    paymentType: "subscription",
    paypalEnabled: true,
    mediaLabel: "VIP",
    features: [
      "Ruolo VIP su Discord",
      "Priorità nell’assistenza",
      "1 targa personalizzata",
      "20.000 € a settimana",
      "Accredito effettuato manualmente dallo staff"
    ]
  },
  {
    id: "vip-premium",
    category: "VIP",
    name: "VIP Premium",
    description: "Abbonamento premium valido per 30 giorni.",
    price: "14.99",
    priceSuffix: " / 30 giorni",
    paymentType: "subscription",
    paypalEnabled: true,
    featured: true,
    mediaLabel: "VIP+",
    features: [
      "Ruolo VIP Premium su Discord",
      "Priorità assistenza livello 2",
      "2 targhe personalizzate",
      "10% di sconto su qualsiasi acquisto",
      "50.000 € a settimana",
      "Accredito effettuato manualmente dallo staff"
    ]
  },
  {
    id: "attivita-il-pagante",
    category: "Attività e fazioni",
    name: "Il Pagante",
    description: "Acquisto dell’attività Il Pagante. Attivazione e dettagli vengono gestiti dallo staff.",
    price: "30.00",
    paymentType: "order",
    paypalEnabled: true,
    mediaLabel: "IP"
  },
  {
    id: "attivita-roma-romantica",
    category: "Attività e fazioni",
    name: "Roma Romantica",
    description: "Acquisto dell’attività Roma Romantica. Attivazione e dettagli vengono gestiti dallo staff.",
    price: "30.00",
    paymentType: "order",
    paypalEnabled: true,
    mediaLabel: "RR"
  },
  {
    id: "attivita-aci",
    category: "Attività e fazioni",
    name: "ACI",
    description: "Acquisto dell’attività ACI. Attivazione e dettagli vengono gestiti dallo staff.",
    price: "30.00",
    paymentType: "order",
    paypalEnabled: true,
    mediaLabel: "ACI"
  },
  {
    id: "attivita-autoroma",
    category: "Attività e fazioni",
    name: "AutoRoma",
    description: "Acquisto dell’attività AutoRoma. Attivazione e dettagli vengono gestiti dallo staff.",
    price: "30.00",
    paymentType: "order",
    paypalEnabled: true,
    mediaLabel: "AUTO"
  },
  {
    id: "fazione-carabinieri",
    category: "Attività e fazioni",
    name: "Carabinieri",
    description: "Pacchetto dedicato alla fazione Carabinieri. L’assegnazione viene verificata e gestita dallo staff.",
    price: "30.00",
    paymentType: "order",
    paypalEnabled: true,
    mediaLabel: "CC"
  },
  {
    id: "fazione-guardia-di-finanza",
    category: "Attività e fazioni",
    name: "Guardia di Finanza",
    description: "Pacchetto dedicato alla Guardia di Finanza. L’assegnazione viene verificata e gestita dallo staff.",
    price: "30.00",
    paymentType: "order",
    paypalEnabled: true,
    mediaLabel: "GDF"
  },
  {
    id: "fazione-polizia-di-stato",
    category: "Attività e fazioni",
    name: "Polizia di Stato",
    description: "Pacchetto dedicato alla Polizia di Stato. L’assegnazione viene verificata e gestita dallo staff.",
    price: "30.00",
    paymentType: "order",
    paypalEnabled: true,
    mediaLabel: "PS"
  }
];
