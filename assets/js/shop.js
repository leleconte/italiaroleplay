(() => {
  const grid = document.querySelector('[data-shop-grid]');
  if (!grid) return;

  const config = window.SITE_CONFIG || {};
  const products = Array.isArray(window.SHOP_PRODUCTS) ? window.SHOP_PRODUCTS : [];

  const createPlaceholder = () => {
    const card = document.createElement('article');
    card.className = 'shop-card shop-placeholder reveal';
    card.innerHTML = `
      <div class="shop-card-media"></div>
      <div class="shop-card-body">
        <div class="placeholder-line short"></div>
        <div class="placeholder-line medium"></div>
        <div class="placeholder-line"></div>
        <div class="shop-card-footer">
          <div class="placeholder-price"></div>
          <div class="placeholder-button"></div>
        </div>
      </div>`;
    return card;
  };

  const renderProduct = (product) => {
    const card = document.createElement('article');
    card.className = 'shop-card reveal';
    const paypalId = `paypal-${String(product.id).replace(/[^a-z0-9_-]/gi, '')}`;
    card.innerHTML = `
      <div class="shop-card-media">
        <img src="${product.image || 'assets/img/italia-rp-logo-web.png'}" alt="${product.name || 'Prodotto Italia RP'}">
      </div>
      <div class="shop-card-body">
        <div class="shop-card-category">${product.category || 'Shop'}</div>
        <h3>${product.name || 'Prodotto'}</h3>
        <p>${product.description || ''}</p>
        <div class="shop-card-footer">
          <div class="shop-price">€${Number(product.price || 0).toFixed(2).replace('.', ',')}</div>
          <div class="paypal-slot" id="${paypalId}"></div>
        </div>
      </div>`;
    card.dataset.paypalId = paypalId;
    card.dataset.productId = product.id;
    return card;
  };

  if (!products.length) {
    for (let i = 0; i < 6; i += 1) grid.appendChild(createPlaceholder());
    requestAnimationFrame(() => document.querySelectorAll('.shop-placeholder').forEach((el) => el.classList.add('visible')));
    return;
  }

  products.forEach((product) => grid.appendChild(renderProduct(product)));

  const paypalProducts = products.filter((product) => product.paypalEnabled !== false);
  if (!paypalProducts.length || !config.paypalClientId) return;

  const script = document.createElement('script');
  script.src = `https://www.paypal.com/sdk/js?client-id=${encodeURIComponent(config.paypalClientId)}&currency=${encodeURIComponent(config.currency || 'EUR')}`;
  script.onload = () => {
    paypalProducts.forEach((product) => {
      const targetId = `paypal-${String(product.id).replace(/[^a-z0-9_-]/gi, '')}`;
      if (!window.paypal || !document.getElementById(targetId)) return;
      window.paypal.Buttons({
        style: { layout: 'horizontal', height: 37, label: 'pay', tagline: false, shape: 'pill' },
        createOrder: (_data, actions) => actions.order.create({
          purchase_units: [{
            description: `${config.brandName || 'Italia RP'} - ${product.name}`,
            amount: { currency_code: config.currency || 'EUR', value: Number(product.price).toFixed(2) }
          }]
        }),
        onApprove: (_data, actions) => actions.order.capture().then(() => {
          window.location.href = `${config.discordUrl || '#'}?payment=completed`;
        }),
        onError: (error) => console.error('PayPal error:', error)
      }).render(`#${targetId}`);
    });
  };
  document.head.appendChild(script);
})();
