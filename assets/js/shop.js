(() => {
  const grid = document.querySelector('[data-shop-grid]');
  if (!grid) return;

  const config = window.SITE_CONFIG || {};
  const products = Array.isArray(window.SHOP_PRODUCTS) ? window.SHOP_PRODUCTS : [];
  const discordUrl = config.discordUrl || '#';

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

  const renderFeatures = (features) => {
    if (!Array.isArray(features) || !features.length) return '';
    return `<ul class="shop-features">${features.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>`;
  };

  const fallbackButton = (product, label) => {
    const href = discordUrl;
    return `<a class="shop-action" href="${escapeHtml(href)}" target="_blank" rel="noopener noreferrer">${escapeHtml(label)}</a>`;
  };

  const renderProduct = (product) => {
    const card = document.createElement('article');
    const categoryClass = `category-${slugify(product.category || 'shop')}`;
    card.className = `shop-card reveal ${categoryClass}${product.featured ? ' is-featured' : ''}`;

    const cleanId = String(product.id || crypto.randomUUID()).replace(/[^a-z0-9_-]/gi, '');
    const paypalId = `paypal-${cleanId}`;
    const mediaLabel = escapeHtml(product.mediaLabel || String(product.name || 'IRP').slice(0, 6).toUpperCase());
    const paymentType = product.paymentType || 'order';

    let paymentSlot = '';
    if (paymentType === 'quote' || product.paypalEnabled === false) {
      paymentSlot = fallbackButton(product, product.buttonLabel || 'Apri un ticket');
    } else {
      paymentSlot = `<div class="paypal-slot" id="${paypalId}">${fallbackButton(product, 'Acquista su Discord')}</div>`;
    }

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
          ${paymentSlot}
        </div>
      </div>`;

    card.dataset.paypalId = paypalId;
    card.dataset.productId = product.id || '';
    card.dataset.paymentType = paymentType;
    return card;
  };

  if (!products.length) return;
  products.forEach((product) => grid.appendChild(renderProduct(product)));

  const oneTimeProducts = products.filter((product) =>
    product.paypalEnabled !== false &&
    (product.paymentType || 'order') === 'order' &&
    Number(product.price) > 0
  );

  const subscriptionProducts = products.filter((product) =>
    product.paypalEnabled !== false &&
    product.paymentType === 'subscription' &&
    product.paypalPlanId
  );

  const replaceSlot = (targetId) => {
    const slot = document.getElementById(targetId);
    if (slot) slot.innerHTML = '';
    return slot;
  };

  const loadPayPalSdk = ({ namespace, subscription = false }) => new Promise((resolve, reject) => {
    if (!config.paypalClientId) {
      resolve(null);
      return;
    }

    const script = document.createElement('script');
    const params = new URLSearchParams({
      'client-id': config.paypalClientId,
      currency: config.currency || 'EUR',
      components: 'buttons'
    });

    if (subscription) {
      params.set('vault', 'true');
      params.set('intent', 'subscription');
    } else {
      params.set('intent', 'capture');
    }

    script.src = `https://www.paypal.com/sdk/js?${params.toString()}`;
    script.dataset.namespace = namespace;
    script.onload = () => resolve(window[namespace]);
    script.onerror = reject;
    document.head.appendChild(script);
  });

  if (oneTimeProducts.length && config.paypalClientId) {
    loadPayPalSdk({ namespace: 'paypalOrders' })
      .then((paypal) => {
        if (!paypal) return;
        oneTimeProducts.forEach((product) => {
          const targetId = `paypal-${String(product.id).replace(/[^a-z0-9_-]/gi, '')}`;
          if (!replaceSlot(targetId)) return;

          paypal.Buttons({
            style: { layout: 'horizontal', height: 37, label: 'pay', tagline: false, shape: 'pill' },
            createOrder: (_data, actions) => actions.order.create({
              purchase_units: [{
                description: `${config.brandName || 'Italia RP'} - ${product.name}`,
                custom_id: product.id,
                amount: {
                  currency_code: config.currency || 'EUR',
                  value: Number(product.price).toFixed(2)
                }
              }]
            }),
            onApprove: (_data, actions) => actions.order.capture().then(() => {
              window.location.href = discordUrl;
            }),
            onError: (error) => {
              console.error('PayPal order error:', error);
              const slot = document.getElementById(targetId);
              if (slot) slot.innerHTML = fallbackButton(product, 'Apri un ticket');
            }
          }).render(`#${targetId}`);
        });
      })
      .catch((error) => console.error('Impossibile caricare PayPal:', error));
  }

  if (subscriptionProducts.length && config.paypalClientId) {
    loadPayPalSdk({ namespace: 'paypalSubscriptions', subscription: true })
      .then((paypal) => {
        if (!paypal) return;
        subscriptionProducts.forEach((product) => {
          const targetId = `paypal-${String(product.id).replace(/[^a-z0-9_-]/gi, '')}`;
          if (!replaceSlot(targetId)) return;

          paypal.Buttons({
            style: { layout: 'horizontal', height: 37, label: 'subscribe', tagline: false, shape: 'pill' },
            createSubscription: (_data, actions) => actions.subscription.create({
              plan_id: product.paypalPlanId
            }),
            onApprove: () => {
              window.location.href = discordUrl;
            },
            onError: (error) => {
              console.error('PayPal subscription error:', error);
              const slot = document.getElementById(targetId);
              if (slot) slot.innerHTML = fallbackButton(product, 'Apri un ticket');
            }
          }).render(`#${targetId}`);
        });
      })
      .catch((error) => console.error('Impossibile caricare gli abbonamenti PayPal:', error));
  }
})();
