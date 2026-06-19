/* ==========================================================================
   KRIAT SMILES — main.js  (vanilla, no dependencies)
   ========================================================================== */
(function () {
  'use strict';

  /* ---- EDIT ME: clinic contact details -----------------------------------
     WhatsApp number in full international format, digits only (no +, no spaces).
     Nigeria = 234 then the number without the leading 0.
     e.g. 0803 123 4567  ->  2348031234567
  ------------------------------------------------------------------------- */
  var WHATSAPP = '2348000000000';        // TODO: replace with Kriat Smiles WhatsApp line
  var CLINIC_NAME = 'Kriat Smiles';

  function waLink(message) {
    return 'https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(message || ('Hello ' + CLINIC_NAME + ', I would like to book a dental appointment.'));
  }

  /* ---- 1. Wire every WhatsApp button --------------------------------------
     <a data-wa data-wa-msg="...">  -> opens WhatsApp with the message. */
  document.querySelectorAll('[data-wa]').forEach(function (el) {
    el.setAttribute('href', waLink(el.getAttribute('data-wa-msg')));
    el.setAttribute('target', '_blank');
    el.setAttribute('rel', 'noopener');
  });

  /* ---- 2. Mobile menu ----------------------------------------------------- */
  var menu = document.getElementById('mobile-menu');
  var burger = document.getElementById('burger');
  var menuClose = document.getElementById('menu-close');
  function openMenu() { if (menu) { menu.classList.add('mobile-menu--open'); document.body.style.overflow = 'hidden'; } }
  function closeMenu() { if (menu) { menu.classList.remove('mobile-menu--open'); document.body.style.overflow = ''; } }
  if (burger) burger.addEventListener('click', openMenu);
  if (menuClose) menuClose.addEventListener('click', closeMenu);
  document.querySelectorAll('.mobile-menu__link, .mobile-menu__cta a').forEach(function (l) { l.addEventListener('click', closeMenu); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenu(); });

  /* ---- 3. Reveal on scroll ------------------------------------------------ */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('reveal--in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('reveal--in'); });
  }

  /* ---- 4. Smooth anchor scroll (offset for sticky nav) -------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var href = a.getAttribute('href');
      if (!href || href.length < 2) return;
      var target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      var top = target.getBoundingClientRect().top + window.scrollY - 84;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });

  /* ---- 5. FAQ accordion --------------------------------------------------- */
  document.querySelectorAll('.acc__btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.closest('.acc');
      var panel = item.querySelector('.acc__panel');
      var open = item.classList.contains('acc--open');
      document.querySelectorAll('.acc').forEach(function (i) {
        i.classList.remove('acc--open');
        var p = i.querySelector('.acc__panel'); if (p) p.style.maxHeight = '0';
      });
      if (!open) { item.classList.add('acc--open'); if (panel) panel.style.maxHeight = panel.scrollHeight + 'px'; }
    });
  });

  /* ---- 6. Animated counters ---------------------------------------------- */
  function countTo(el, target) {
    var start = null, dur = 1600;
    function step(t) {
      if (!start) start = t;
      var p = Math.min((t - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.floor(target * eased).toLocaleString() + (el.dataset.suffix || '');
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  var nums = document.querySelectorAll('[data-count]');
  if (nums.length && 'IntersectionObserver' in window) {
    var so = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { countTo(e.target, parseInt(e.target.dataset.count, 10)); so.unobserve(e.target); }
      });
    }, { threshold: 0.5 });
    nums.forEach(function (el) { so.observe(el); });
  }

  /* ---- 7. Toast ----------------------------------------------------------- */
  function toast(html) {
    var existing = document.querySelector('.toast'); if (existing) existing.remove();
    var t = document.createElement('div');
    t.className = 'toast'; t.innerHTML = html;
    document.body.appendChild(t);
    requestAnimationFrame(function () { t.classList.add('toast--in'); });
    setTimeout(function () { t.classList.remove('toast--in'); setTimeout(function () { t.remove(); }, 300); }, 4500);
  }

  /* ---- 8. Booking form -> WhatsApp ---------------------------------------- */
  var form = document.getElementById('booking-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var f = form.elements;
      var d = {
        name: (f['name'].value || '').trim(),
        phone: (f['phone'].value || '').trim(),
        service: f['service'].value,
        day: f['day'].value,
        time: f['time'].value,
        notes: (f['notes'].value || '').trim()
      };
      if (!d.name || !d.phone) { toast('Please enter your name and phone number.'); return; }
      var msg =
        'Hello ' + CLINIC_NAME + ' 👋\n\n' +
        'I would like to book a dental appointment.\n\n' +
        '• Name: ' + d.name + '\n' +
        '• Phone: ' + d.phone + '\n' +
        '• Treatment: ' + d.service + '\n' +
        '• Preferred day: ' + (d.day || 'Any') + '\n' +
        '• Preferred time: ' + (d.time || 'Any') + '\n' +
        (d.notes ? ('• Notes: ' + d.notes + '\n') : '') +
        '\nThank you!';
      window.open(waLink(msg), '_blank', 'noopener');
      toast('Opening WhatsApp to confirm your booking… ✓');
    });
  }

  /* ---- 9. Footer year ----------------------------------------------------- */
  var y = document.getElementById('year'); if (y) y.textContent = new Date().getFullYear();
})();
