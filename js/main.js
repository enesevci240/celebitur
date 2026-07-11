/**
 * Çelebi Tur — Ana JavaScript
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
      el.setAttribute('rel', 'noopener noreferrer');
    }
  });

  document.querySelectorAll('[data-whatsapp-quote]').forEach(el => {
    el.setAttribute('href', whatsappUrl(SITE.whatsappQuoteMsg));
    el.setAttribute('target', '_blank');
    el.setAttribute('rel', 'noopener noreferrer');
  });

  const contactForm = document.querySelector('[data-formspree]');
  if (contactForm) {
    contactForm.setAttribute('action', SITE.formspree);
    if (SITE.formspree.includes('placeholder')) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
      });
      contactForm.setAttribute('aria-disabled', 'true');
      const submitBtn = contactForm.querySelector('[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.title = 'Form henüz yapılandırılmamış';
      }
    }
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

  const phoneBtn = document.createElement('a');
  phoneBtn.href = `tel:${SITE.phoneTel}`;
  phoneBtn.className = 'btn btn--outline-dark btn--sm';
  phoneBtn.setAttribute('data-phone-tel', '');
  const phoneIcon = document.createElement('i');
  phoneIcon.className = 'fas fa-phone';
  phoneIcon.setAttribute('aria-hidden', 'true');
  const phoneSpan = document.createElement('span');
  phoneSpan.setAttribute('data-phone', '');
  phoneSpan.textContent = SITE.phone;
  phoneBtn.append(phoneIcon, ' ', phoneSpan);

  const waBtn = document.createElement('a');
  waBtn.href = whatsappUrl(SITE.whatsappQuoteMsg);
  waBtn.className = 'btn btn--accent btn--sm';
  waBtn.setAttribute('target', '_blank');
  waBtn.setAttribute('rel', 'noopener noreferrer');
  const waIcon = document.createElement('i');
  waIcon.className = 'fab fa-whatsapp';
  waIcon.setAttribute('aria-hidden', 'true');
  waBtn.append(waIcon, ' Teklif Al');

  cta.append(phoneBtn, waBtn);
  navLinks.appendChild(cta);
}

function normalizePath(pathname) {
  if (!pathname || pathname === '/') return '/';
  let path = pathname.replace(/\/index\.html$/, '').replace(/\.html$/, '');
  if (path.endsWith('/') && path.length > 1) {
    path = path.slice(0, -1);
  }
  return path || '/';
}

function initActiveNav() {
  const current = normalizePath(window.location.pathname);

  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('tel:') || href.startsWith('mailto:')) {
      return;
    }

    let linkPath;
    try {
      linkPath = normalizePath(new URL(href, window.location.origin).pathname);
    } catch {
      return;
    }

    if (current === linkPath) {
      link.classList.add('active');
    }
  });
}
