/**
 * Çelebi Turizm — Ana JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  initSiteConfig();
  initHeader();
  initMobileMenu();
  initActiveNav();
});

function whatsappUrl(message) {
  const text = encodeURIComponent(message || SITE.whatsappDefaultMsg);
  return `https://wa.me/${SITE.whatsapp}?text=${text}`;
}

function initSiteConfig() {
  if (typeof SITE === 'undefined') return;

  document.querySelectorAll('[data-phone]').forEach(el => {
    el.textContent = SITE.phone;
  });

  document.querySelectorAll('[data-phone-tel]').forEach(el => {
    el.setAttribute('href', `tel:${SITE.phoneTel}`);
  });

  document.querySelectorAll('[data-email]').forEach(el => {
    el.textContent = SITE.email;
    if (el.tagName === 'A') {
      el.setAttribute('href', `mailto:${SITE.email}`);
    }
  });

  document.querySelectorAll('a[data-email-link]').forEach(el => {
    el.setAttribute('href', `mailto:${SITE.email}`);
    if (!el.hasAttribute('data-phone')) {
      el.textContent = SITE.email;
    }
  });

  document.querySelectorAll('[data-address]').forEach(el => {
    el.textContent = SITE.address;
  });

  document.querySelectorAll('[data-maps-embed]').forEach(el => {
    el.setAttribute('src', SITE.mapsEmbed);
  });

  document.querySelectorAll('[data-maps-link]').forEach(el => {
    el.setAttribute('href', SITE.mapsLink);
  });

  document.querySelectorAll('[data-hours]').forEach(el => {
    el.textContent = SITE.hours;
  });

  document.querySelectorAll('[data-whatsapp]').forEach(el => {
    const msg = el.getAttribute('data-whatsapp-msg') || SITE.whatsappDefaultMsg;
    el.setAttribute('href', whatsappUrl(msg));
    if (el.tagName === 'A') {
      el.setAttribute('target', '_blank');
      el.setAttribute('rel', 'noopener');
    }
  });

  document.querySelectorAll('[data-whatsapp-quote]').forEach(el => {
    el.setAttribute('href', whatsappUrl(SITE.whatsappQuoteMsg));
    el.setAttribute('target', '_blank');
    el.setAttribute('rel', 'noopener');
  });

  const contactForm = document.querySelector('[data-formspree]');
  if (contactForm) {
    contactForm.setAttribute('action', SITE.formspree);
  }
}

function initHeader() {
  const header = document.querySelector('.header');
  if (!header) return;

  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
  };

  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (!hamburger || !navLinks) return;

  let backdrop = document.querySelector('.nav-backdrop');
  if (!backdrop) {
    backdrop = document.createElement('div');
    backdrop.className = 'nav-backdrop';
    backdrop.setAttribute('aria-hidden', 'true');
    document.body.appendChild(backdrop);
  }

  const closeMenu = () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
    backdrop.classList.remove('open');
    document.body.style.overflow = '';
    hamburger.setAttribute('aria-expanded', 'false');
  };

  const openMenu = () => {
    hamburger.classList.add('open');
    navLinks.classList.add('open');
    backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
    hamburger.setAttribute('aria-expanded', 'true');
  };

  hamburger.addEventListener('click', () => {
    if (navLinks.classList.contains('open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  backdrop.addEventListener('click', closeMenu);

  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 992) closeMenu();
  });

  initMobileNavCta(navLinks);
}

function initMobileNavCta(navLinks) {
  if (navLinks.querySelector('.nav-mobile-cta')) return;

  const cta = document.createElement('div');
  cta.className = 'nav-mobile-cta';
  cta.innerHTML = `
    <a href="tel:${SITE.phoneTel}" class="btn btn--outline-dark btn--sm" data-phone-tel>
      <i class="fas fa-phone" aria-hidden="true"></i> <span data-phone>${SITE.phone}</span>
    </a>
    <a href="${whatsappUrl(SITE.whatsappQuoteMsg)}" class="btn btn--accent btn--sm" target="_blank" rel="noopener">
      <i class="fab fa-whatsapp" aria-hidden="true"></i> Teklif Al
    </a>
  `;
  navLinks.appendChild(cta);
}

function initActiveNav() {
  let currentPage = window.location.pathname.split('/').pop();
  if (!currentPage || !currentPage.includes('.')) {
    currentPage = 'index.html';
  }

  document.querySelectorAll('.nav-link').forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });
}