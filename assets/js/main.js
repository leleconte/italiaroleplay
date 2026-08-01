(() => {
  const config = window.SITE_CONFIG || {};

  document.querySelectorAll('[data-discord-link]').forEach((link) => {
    link.href = config.discordUrl || '#';
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
  });

  const menuButton = document.querySelector('[data-menu-button]');
  const navLinks = document.querySelector('[data-nav-links]');
  if (menuButton && navLinks) {
    menuButton.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', String(open));
    });

    navLinks.addEventListener('click', () => {
      navLinks.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
    });
  }

  const particlesHost = document.querySelector('[data-particles]');
  if (particlesHost) {
    const colors = ['rgba(98,184,74,.9)', 'rgba(228,35,39,.85)', 'rgba(227,164,68,.8)', 'rgba(246,238,223,.55)'];
    for (let i = 0; i < 34; i += 1) {
      const particle = document.createElement('span');
      particle.className = 'particle';
      particle.style.setProperty('--size', `${Math.random() * 4 + 2}px`);
      particle.style.setProperty('--left', `${Math.random() * 100}%`);
      particle.style.setProperty('--duration', `${Math.random() * 15 + 13}s`);
      particle.style.setProperty('--delay', `${Math.random() * -24}s`);
      particle.style.setProperty('--drift', `${Math.random() * 180 - 90}px`);
      particle.style.setProperty('--color', colors[Math.floor(Math.random() * colors.length)]);
      particlesHost.appendChild(particle);
    }
  }

  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.13 });
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('visible'));
  }

  document.querySelectorAll('[data-year]').forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
})();
