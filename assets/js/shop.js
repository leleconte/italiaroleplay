(() => {
  const grid = document.querySelector('[data-shop-grid]');
  if (!grid) return;

  const config = window.SITE_CONFIG || {};
  const products = Array.isArray(window.SHOP_PRODUCTS) ? window.SHOP_PRODUCTS : [];
  const discordUrl = config.discordUrl || '#';
  const currency = String(config.currency || 'EUR').toUpperCase();
  const brandName = config.brandName || 'Italia RP';
  const paypalMeName = String(config.paypalMeName || 'italiaroleplay')
    .trim()
    .replace(/^https?:\/\/(www\.)?paypal\.me\//i, '')
    .replace(/\/$/, '');

  const escapeHtml = (value = '') => String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');

  const slugify = (value = '') => String(value)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

  const formatPrice = (product) => {
    const value = Number(product.price || 0).toFixed(2).replace('.', ',');
    return `${escapeHtml(product.pricePrefix || '')}€${value}${escapeHtml(product.priceSuffix || '')}`;
  };

  const paypalAmount = (product) => Number(product.price || 0).toFixed(2);

  const makePayPalUrl = (product) => {
    const amount = paypalAmount(product);
    return `https://paypal.me/${encodeURIComponent(paypalMeName)}/${amount}${encodeURIComponent(currency)}`;
  };

  const renderFeatures = (features) => {
    if (!Array.isArray(features) || !features.length) return '';
    return `<ul class="shop-features">${features.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>`;
  };

  const renderProduct = (product) => {
    const card = document.createElement('article');
    const categoryClass = `category-${slugify(product.category || 'shop')}`;
    card.className = `shop-card reveal ${categoryClass}${product.featured ? ' is-featured' : ''}`;

    const mediaLabel = escapeHtml(
      product.mediaLabel || String(product.name || 'IRP').slice(0, 6).toUpperCase()
    );
    const isQuote = product.paymentType === 'quote' || product.paypalEnabled === false;

    const action = isQuote
      ? `<a class="shop-action shop-action-ticket" href="${escapeHtml(discordUrl)}" target="_blank" rel="noopener noreferrer">${escapeHtml(product.buttonLabel || 'Apri un ticket')}</a>`
      : `<button class="shop-action shop-action-paypal" type="button" data-buy-product="${escapeHtml(product.id)}">
          <span class="paypal-mark" aria-hidden="true">P</span>
          <span>${product.paymentType === 'subscription' ? 'Attiva per 30 giorni' : 'Acquista ora'}</span>
        </button>`;

    card.innerHTML = `
      ${product.featured ? '<div class="shop-ribbon">Più completo</div>' : ''}
      <div class="shop-card-media" aria-hidden="true">
        <span class="product-mark">${mediaLabel}</span>
        <img src="${escapeHtml(product.image || 'assets/img/italia-rp-logo-web.png')}" alt="" loading="lazy">
      </div>
      <div class="shop-card-body">
        <div class="shop-card-category">${escapeHtml(product.category || 'Shop')}</div>
        <h3>${escapeHtml(product.name || 'Prodotto')}</h3>
        <p>${escapeHtml(product.description || '')}</p>
        ${renderFeatures(product.features)}
        <div class="shop-card-footer">
          <div class="shop-price">${formatPrice(product)}</div>
          ${action}
        </div>
      </div>`;

    return card;
  };

  if (!products.length) return;
  products.forEach((product) => grid.appendChild(renderProduct(product)));

  const dialog = document.createElement('dialog');
  dialog.className = 'checkout-dialog';
  dialog.setAttribute('aria-labelledby', 'checkout-title');
  dialog.innerHTML = `
    <div class="checkout-accent" aria-hidden="true"></div>
    <button class="checkout-close" type="button" data-checkout-close aria-label="Chiudi">×</button>

    <div class="checkout-brand">
      <img src="assets/img/favicon.png" alt="" aria-hidden="true">
      <div>
        <span>CHECKOUT SICURO</span>
        <strong>${escapeHtml(brandName)}</strong>
      </div>
    </div>

    <div class="checkout-product">
      <div>
        <span class="checkout-kicker">Stai acquistando</span>
        <h2 id="checkout-title" data-checkout-name>Prodotto</h2>
        <p data-checkout-description></p>
      </div>
      <div class="checkout-price" data-checkout-price>€0,00</div>
    </div>

    <div class="checkout-reference">
      <span>Codice richiesta</span>
      <div>
        <strong data-checkout-reference>IRP-000000</strong>
        <button type="button" data-copy-reference>Copia</button>
      </div>
    </div>

    <label class="checkout-field">
      <span>Nickname Discord <small>(facoltativo)</small></span>
      <input type="text" maxlength="40" autocomplete="nickname" placeholder="es. lele_01" data-discord-name>
    </label>

    <div class="checkout-steps">
      <div><span>1</span><p>Apri PayPal.Me e completa il pagamento dell’importo già impostato.</p></div>
      <div><span>2</span><p>Conserva la ricevuta e l’ID della transazione PayPal.</p></div>
      <div><span>3</span><p>Apri un ticket Discord e invia i dati della richiesta.</p></div>
    </div>

    <label class="checkout-confirm">
      <input type="checkbox" data-checkout-confirm>
      <span>Ho capito che l’attivazione è manuale e richiede la verifica della ricevuta.</span>
    </label>

    <div class="checkout-actions">
      <a class="checkout-pay is-disabled" href="#" target="_blank" rel="noopener noreferrer" data-paypal-link aria-disabled="true">
        <span class="checkout-pay-icon">P</span>
        <span><small>Paga con</small><strong>PayPal.Me</strong></span>
        <b data-checkout-pay-amount>€0,00</b>
      </a>
      <button class="checkout-ticket" type="button" data-copy-ticket>Copia dati per il ticket</button>
      <a class="checkout-discord" href="${escapeHtml(discordUrl)}" target="_blank" rel="noopener noreferrer">Ho pagato · Apri Discord ↗</a>
    </div>

    <p class="checkout-note">
      Il sito non riceve automaticamente la conferma del pagamento. Lo staff verifica manualmente la ricevuta prima della consegna.
    </p>`;

  document.body.appendChild(dialog);

  const byId = new Map(products.map((product) => [String(product.id), product]));
  const closeButton = dialog.querySelector('[data-checkout-close]');
  const confirmInput = dialog.querySelector('[data-checkout-confirm]');
  const discordNameInput = dialog.querySelector('[data-discord-name]');
  const paypalLink = dialog.querySelector('[data-paypal-link]');
  const copyTicketButton = dialog.querySelector('[data-copy-ticket]');
  const copyReferenceButton = dialog.querySelector('[data-copy-reference]');
  let activeProduct = null;
  let activeReference = '';

  const createReference = (product) => {
    const productCode = slugify(product.id || product.name)
      .replaceAll('-', '')
      .slice(0, 5)
      .toUpperCase() || 'SHOP';
    const timeCode = Date.now().toString(36).slice(-6).toUpperCase();
    return `IRP-${productCode}-${timeCode}`;
  };

  const updatePayState = () => {
    const enabled = Boolean(confirmInput.checked && activeProduct);
    paypalLink.classList.toggle('is-disabled', !enabled);
    paypalLink.setAttribute('aria-disabled', String(!enabled));
    paypalLink.tabIndex = enabled ? 0 : -1;
  };

  const buildTicketText = () => {
    if (!activeProduct) return '';
    const nickname = discordNameInput.value.trim() || '[inserisci nickname]';
    return [
      `${brandName.toUpperCase()} — RICHIESTA ATTIVAZIONE`,
      `Prodotto: ${activeProduct.name}`,
      `Importo: €${paypalAmount(activeProduct).replace('.', ',')} ${currency}`,
      `Codice richiesta: ${activeReference}`,
      `Nickname Discord: ${nickname}`,
      'Nome del pagante PayPal: [inserisci]',
      'ID transazione PayPal: [inserisci]',
      'Ricevuta: [allega screenshot]'
    ].join('\n');
  };

  const copyText = async (text, button, successLabel) => {
    const originalLabel = button.textContent;
    try {
      await navigator.clipboard.writeText(text);
    } catch (_error) {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      textarea.remove();
    }
    button.textContent = successLabel;
    window.setTimeout(() => { button.textContent = originalLabel; }, 1600);
  };

  const openCheckout = (product) => {
    activeProduct = product;
    activeReference = createReference(product);

    dialog.querySelector('[data-checkout-name]').textContent = product.name;
    dialog.querySelector('[data-checkout-description]').textContent = product.paymentType === 'subscription'
      ? 'Accesso valido per 30 giorni. Il rinnovo viene effettuato manualmente con un nuovo pagamento.'
      : (product.description || 'Completa il pagamento e apri un ticket per l’attivazione.');
    dialog.querySelector('[data-checkout-price]').textContent = `€${paypalAmount(product).replace('.', ',')}`;
    dialog.querySelector('[data-checkout-pay-amount]').textContent = `€${paypalAmount(product).replace('.', ',')}`;
    dialog.querySelector('[data-checkout-reference]').textContent = activeReference;

    paypalLink.href = makePayPalUrl(product);
    confirmInput.checked = false;
    discordNameInput.value = '';
    updatePayState();

    try {
      localStorage.setItem('italiaRpPendingPurchase', JSON.stringify({
        productId: product.id,
        productName: product.name,
        amount: paypalAmount(product),
        reference: activeReference,
        createdAt: new Date().toISOString()
      }));
    } catch (_error) {
      // Il checkout continua a funzionare anche se localStorage è disabilitato.
    }

    document.body.classList.add('checkout-open');
    dialog.showModal();
  };

  const closeCheckout = () => {
    if (dialog.open) dialog.close();
    document.body.classList.remove('checkout-open');
  };

  grid.addEventListener('click', (event) => {
    const button = event.target.closest('[data-buy-product]');
    if (!button) return;
    const product = byId.get(button.dataset.buyProduct);
    if (product) openCheckout(product);
  });

  confirmInput.addEventListener('change', updatePayState);

  paypalLink.addEventListener('click', (event) => {
    if (paypalLink.classList.contains('is-disabled')) {
      event.preventDefault();
      confirmInput.focus();
      dialog.classList.remove('checkout-shake');
      void dialog.offsetWidth;
      dialog.classList.add('checkout-shake');
    }
  });

  copyTicketButton.addEventListener('click', () => {
    copyText(buildTicketText(), copyTicketButton, 'Dati copiati ✓');
  });

  copyReferenceButton.addEventListener('click', () => {
    copyText(activeReference, copyReferenceButton, 'Copiato ✓');
  });

  closeButton.addEventListener('click', closeCheckout);
  dialog.addEventListener('cancel', () => document.body.classList.remove('checkout-open'));
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) closeCheckout();
  });
})();
