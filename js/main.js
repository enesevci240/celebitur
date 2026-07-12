/**
 * Çelebi Tur — Ana JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  initSiteConfig();
  initHeader();
  initMobileMenu();
  initActiveNav();
  initWhatsAppChooser();
});

function getPhone(key) {
  return SITE.phones && SITE.phones[key] ? SITE.phones[key] : null;
}

function whatsappUrl(message, phoneKey) {
  const entry = getPhone(phoneKey) || getPhone('intercity');
  const number = (entry && entry.whatsapp) || SITE.phones.intercity.whatsapp;
  const text = encodeURIComponent(message || (entry && entry.msg) || SITE.whatsappDefaultMsg);
  return `https://wa.me/${number}?text=${text}`;
}

function initSiteConfig() {
  if (typeof SITE === 'undefined') return;

  /* Geriye dönük: data-phone / data-phone-tel → birincil (şehirlerarası) */
  document.querySelectorAll('[data-phone]:not([data-phone-key])').forEach((el) => {
    el.textContent = SITE.phone;
  });

  document.querySelectorAll('[data-phone-tel]:not([data-phone-key])').forEach((el) => {
    el.setAttribute('href', `tel:${SITE.phoneTel}`);
  });

  /* Anahtarlı numaralar */
  document.querySelectorAll('[data-phone-key]').forEach((el) => {
    const key = el.getAttribute('data-phone-key');
    const entry = getPhone(key);
    if (!entry) return;

    if (el.hasAttribute('data-phone') || el.tagName === 'SPAN') {
      el.textContent = entry.display;
    }

    const link = el.closest('a') || (el.tagName === 'A' ? el : null);
    if (link && (link.hasAttribute('data-phone-tel') || link.hasAttribute('data-phone-key'))) {
      link.setAttribute('href', `tel:${entry.tel}`);
    }
  });

  document.querySelectorAll('a[data-phone-tel][data-phone-key]').forEach((el) => {
    const entry = getPhone(el.getAttribute('data-phone-key'));
    if (entry) el.setAttribute('href', `tel:${entry.tel}`);
  });

  document.querySelectorAll('[data-email]').forEach((el) => {
    el.textContent = SITE.email;
    if (el.tagName === 'A') {
      el.setAttribute('href', `mailto:${SITE.email}`);
    }
  });

  document.querySelectorAll('a[data-email-link]').forEach((el) => {
    el.setAttribute('href', `mailto:${SITE.email}`);
    if (!el.hasAttribute('data-phone') && !el.querySelector('[data-email]')) {
      el.textContent = SITE.email;
    }
  });

  document.querySelectorAll('[data-address]').forEach((el) => {
    el.textContent = SITE.address;
  });

  document.querySelectorAll('[data-maps-embed]').forEach((el) => {
    el.setAttribute('src', SITE.mapsEmbed);
  });

  document.querySelectorAll('[data-maps-link]').forEach((el) => {
    el.setAttribute('href', SITE.mapsLink);
  });

  document.querySelectorAll('[data-hours]').forEach((el) => {
    el.textContent = SITE.hours;
  });

  /* Konuya özel doğrudan WhatsApp (nadir) */
  document.querySelectorAll('[data-whatsapp][data-whatsapp-topic]').forEach((el) => {
    const topic = el.getAttribute('data-whatsapp-topic');
    const entry = getPhone(topic);
    const msg = el.getAttribute('data-whatsapp-msg') || (entry && entry.msg) || SITE.whatsappDefaultMsg;
    if (!entry || !entry.whatsapp) return;
    el.setAttribute('href', whatsappUrl(msg, topic));
    el.setAttribute('target', '_blank');
    el.setAttribute('rel', 'noopener noreferrer');
  });

  /* Tüm genel WA / Teklif butonları → konu seçici */
  document.querySelectorAll('[data-whatsapp]:not([data-whatsapp-topic]), [data-whatsapp-quote]').forEach((el) => {
    el.setAttribute('data-whatsapp-chooser', '');
    if (el.tagName === 'A') {
      el.setAttribute('href', '#');
      el.removeAttribute('target');
      el.removeAttribute('rel');
      el.setAttribute('role', 'button');
    }
  });

  fillContactLists();

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

function fillContactLists() {
  document.querySelectorAll('[data-contact-phones-anchor]').forEach((anchor) => {
    const ul = anchor.parentElement;
    if (!ul) return;

    Object.values(SITE.phones).forEach((entry) => {
      const li = document.createElement('li');
      li.className = 'footer-contact__phone';

      const icon = document.createElement('i');
      icon.className = 'fas fa-phone';
      icon.setAttribute('aria-hidden', 'true');

      const wrap = document.createElement('span');
      wrap.className = 'footer-contact__phone-wrap';

      const label = document.createElement('span');
      label.className = 'footer-contact__phone-label';
      label.textContent = entry.label;

      const link = document.createElement('a');
      link.href = `tel:${entry.tel}`;
      link.textContent = entry.display;

      wrap.append(label, link);
      li.append(icon, wrap);
      ul.insertBefore(li, anchor);
    });

    anchor.remove();
  });
}

function initWhatsAppChooser() {
  const triggers = document.querySelectorAll('[data-whatsapp-chooser]');
  if (!triggers.length) return;

  let root = document.querySelector('.wa-chooser-root');
  let panel;
  let backdrop;

  if (!root) {
    root = document.createElement('div');
    root.className = 'wa-chooser-root';
    root.hidden = true;

    backdrop = document.createElement('button');
    backdrop.type = 'button';
    backdrop.className = 'wa-chooser-backdrop';
    backdrop.setAttribute('aria-label', 'Kapat');

    panel = document.createElement('div');
    panel.className = 'wa-chooser';
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-modal', 'true');
    panel.setAttribute('aria-label', 'WhatsApp iletişim konusu seçin');

    const title = document.createElement('p');
    title.className = 'wa-chooser__title';
    title.id = 'wa-chooser-title';
    title.textContent = 'Nasıl yardımcı olalım?';
    panel.setAttribute('aria-labelledby', 'wa-chooser-title');

    const list = document.createElement('div');
    list.className = 'wa-chooser__list';

    const topics = [
      {
        key: 'intercity',
        icon: 'fa-bus',
        title: 'Şehirlerarası / Transfer',
        desc: 'Gezi, transfer ve şehirlerarası ulaşım',
      },
      {
        key: 'support',
        icon: 'fa-headset',
        title: 'Sorun / Destek',
        desc: 'Servis sorunu veya acil durum',
      },
    ];

    topics.forEach((topic) => {
      const entry = getPhone(topic.key);
      if (!entry || !entry.whatsapp) return;

      const btn = document.createElement('a');
      btn.className = 'wa-chooser__item';
      btn.href = whatsappUrl(entry.msg, topic.key);
      btn.target = '_blank';
      btn.rel = 'noopener noreferrer';

      const ic = document.createElement('i');
      ic.className = `fas ${topic.icon}`;
      ic.setAttribute('aria-hidden', 'true');

      const textWrap = document.createElement('span');
      const t = document.createElement('strong');
      t.textContent = topic.title;
      const d = document.createElement('small');
      d.textContent = topic.desc;
      textWrap.append(t, d);

      btn.append(ic, textWrap);
      list.appendChild(btn);
    });

    const office = getPhone('office');
    if (office) {
      const call = document.createElement('a');
      call.className = 'wa-chooser__item wa-chooser__item--call';
      call.href = `tel:${office.tel}`;
      const ic = document.createElement('i');
      ic.className = 'fas fa-phone';
      ic.setAttribute('aria-hidden', 'true');
      const textWrap = document.createElement('span');
      const t = document.createElement('strong');
      t.textContent = 'Ofisi Ara';
      const d = document.createElement('small');
      d.textContent = office.display;
      textWrap.append(t, d);
      call.append(ic, textWrap);
      list.appendChild(call);
    }

    const closeBtn = document.createElement('button');
    closeBtn.type = 'button';
    closeBtn.className = 'wa-chooser__close';
    closeBtn.setAttribute('aria-label', 'Kapat');
    closeBtn.textContent = '×';

    panel.append(closeBtn, title, list);
    root.append(backdrop, panel);
    document.body.appendChild(root);

    const close = () => {
      root.hidden = true;
      document.body.classList.remove('wa-chooser-open');
    };

    const open = () => {
      root.hidden = false;
      document.body.classList.add('wa-chooser-open');
    };

    closeBtn.addEventListener('click', close);
    backdrop.addEventListener('click', close);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !root.hidden) close();
    });

    root._close = close;
    root._open = open;
  }

  triggers.forEach((trigger) => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      if (root.hidden) {
        root._open();
      } else {
        root._close();
      }
    });
  });
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

  navLinks.querySelectorAll('.nav-link').forEach((link) => {
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
  const phoneIcon = document.createElement('i');
  phoneIcon.className = 'fas fa-phone';
  phoneIcon.setAttribute('aria-hidden', 'true');
  phoneBtn.append(phoneIcon, ' ', document.createTextNode(SITE.phone));

  const waBtn = document.createElement('button');
  waBtn.type = 'button';
  waBtn.className = 'btn btn--accent btn--sm';
  waBtn.setAttribute('data-whatsapp-chooser', '');
  const waIcon = document.createElement('i');
  waIcon.className = 'fab fa-whatsapp';
  waIcon.setAttribute('aria-hidden', 'true');
  waBtn.append(waIcon, ' WhatsApp');

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

  document.querySelectorAll('.nav-link').forEach((link) => {
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
