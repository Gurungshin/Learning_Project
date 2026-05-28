(function () {
  /* ── Nav references ── */
  const hamburger  = document.querySelector('.hamburger');
  const overlay    = document.querySelector('.mobile-overlay');
  const drawer     = document.querySelector('.mobile-drawer');
  const backdrop   = overlay ? overlay.querySelector('.backdrop') : null;
  const dCtas      = drawer  ? drawer.querySelector('.drawer-ctas') : null;
  const dAccordions = drawer ? Array.from(drawer.querySelectorAll('.drawer-accordion')) : [];
  let menuOpen = false;

  if (hamburger && overlay && drawer) {
    function openMenu() {
      menuOpen = true;
      document.body.style.overflow = 'hidden';
      hamburger.classList.add('open');
      hamburger.setAttribute('aria-expanded','true');
      hamburger.setAttribute('aria-label','Close menu');
      overlay.classList.add('open');
      drawer.classList.add('open');

      const items = Array.from(drawer.querySelectorAll('.drawer-links > a, .drawer-links > .drawer-accordion'));
      items.forEach((el, i) => {
        el.style.transitionDelay = (120 + i * 60) + 'ms';
        setTimeout(() => el.classList.add('visible'), 10);
      });
      if (dCtas) {
        dCtas.style.transitionDelay = (120 + items.length * 60 + 60) + 'ms';
        setTimeout(() => dCtas.classList.add('visible'), 10);
      }
    }

    function closeMenu() {
      menuOpen = false;
      document.body.style.overflow = '';
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded','false');
      hamburger.setAttribute('aria-label','Open menu');
      overlay.classList.remove('open');
      drawer.classList.remove('open');

      drawer.querySelectorAll('.drawer-links > a, .drawer-links > .drawer-accordion').forEach(el => {
        el.style.transitionDelay = '0ms';
        el.classList.remove('visible');
      });
      dAccordions.forEach(acc => {
        const panel = acc.querySelector('.drawer-accordion-panel');
        if (panel) panel.classList.remove('open');
        const btn = acc.querySelector('.drawer-accordion-btn');
        if (btn) btn.setAttribute('aria-expanded','false');
      });
      if (dCtas) {
        dCtas.style.transitionDelay = '0ms';
        dCtas.classList.remove('visible');
      }
    }

    hamburger.addEventListener('click', () => menuOpen ? closeMenu() : openMenu());
    if (backdrop) backdrop.addEventListener('click', closeMenu);

    drawer.querySelectorAll('.drawer-accordion-panel a').forEach(a => a.addEventListener('click', closeMenu));
    drawer.querySelectorAll('.drawer-links > a').forEach(a => a.addEventListener('click', closeMenu));
  }

  /* ── Reusable Accordion Toggles ── */
  dAccordions.forEach(acc => {
    const btn   = acc.querySelector('.drawer-accordion-btn');
    const panel = acc.querySelector('.drawer-accordion-panel');
    if (!btn || !panel) return;

    if (!panel.querySelector(':scope > div')) {
      const inner = document.createElement('div');
      while (panel.firstChild) inner.appendChild(panel.firstChild);
      panel.appendChild(inner);
    }

    btn.addEventListener('click', () => {
      const isOpen = panel.classList.contains('open');
      dAccordions.forEach(other => {
        const p = other.querySelector('.drawer-accordion-panel');
        const b = other.querySelector('.drawer-accordion-btn');
        if (p) p.classList.remove('open');
        if (b) b.setAttribute('aria-expanded','false');
      });
      if (!isOpen) {
        panel.classList.add('open');
        btn.setAttribute('aria-expanded','true');
      }
    });
  });

  /* ── Scroll-aware nav ── */
  const navElement = document.querySelector('nav');
  if (navElement) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 40) {
        navElement.classList.add('scrolled');
      } else {
        navElement.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  /* ── Dropdown menus (click to open) ── */
  document.querySelectorAll('.has-dropdown > a').forEach(function(link) {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const parent = this.closest('.has-dropdown');
      const isOpen = parent.classList.contains('open');
      document.querySelectorAll('.has-dropdown').forEach(d => d.classList.remove('open'));
      if (!isOpen) parent.classList.add('open');
    });
  });
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.has-dropdown')) {
      document.querySelectorAll('.has-dropdown').forEach(d => d.classList.remove('open'));
    }
  });

  
})();