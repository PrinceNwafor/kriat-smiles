# Meridian Health Clinic — Master Website Template

A responsive, multi-page clinic website template. Pure **HTML + CSS + vanilla JS**
(no build step, no dependencies). Open any `.html` file in a browser and it works.

The flagship feature is a **multi-step online appointment booking flow**
(`book-appointment.html`).

---

## 📁 Structure

```
Clinic Master Template/
├── index.html              Home (booking-led hero, services, doctors, stats, etc.)
├── book-appointment.html   ⭐ Signature 5-step booking widget
├── services.html           Services / departments + "what to expect"
├── doctors.html            Doctor directory (search + specialty filter)
├── about.html              Clinic story, mission/values, leadership, stats
├── patient-resources.html  Insurance, pricing, checklist, FAQ accordion
├── health-tips.html        Blog/articles (search + filter) + newsletter
├── contact.html            Contact form, details, map placeholder
├── css/
│   └── style.css           Full design system (tokens + components)
├── js/
│   └── main.js             Nav, scroll reveal, counters, booking engine, etc.
└── includes/
    ├── nav.html            Reusable top bar + navigation markup
    └── footer.html         Reusable footer markup
```

> The nav/footer are also inlined into each page (so pages work standalone with no
> server). `includes/` holds the canonical copy — if you change navigation, update
> it there and paste into each page, or wire up server-side includes.

---

## 🎨 Rebranding (make it yours)

Everything theme-related lives in **CSS variables** at the top of `css/style.css`
(`:root { ... }`). Change colors/fonts in one place.

| What | Where |
|------|-------|
| Brand colors | `--color-primary`, `--color-accent` and friends in `:root` |
| Fonts | `--font-heading`, `--font-body` (+ the Google Fonts `<link>` in each page `<head>`) |
| Clinic name | Find/replace **`Meridian Health`** and **`Meridian Health Clinic`** |
| Logo mark | The **`✚`** character in `.nav__logo-mark` / `.footer__logo-mark` |
| Phone | Find/replace **`+1 (234) 567-890`** and `tel:+1234567890` |
| Email | Find/replace **`hello@meridianhealth.clinic`** |
| Address | Find/replace **`100 Wellness Boulevard`** |
| Hours | `.footer__hours` and the top utility bar |
| WhatsApp | Replace **`[CLINIC_WHATSAPP]`** in the float button + footer |
| Images | All images use `https://picsum.photos/...` placeholders — swap for real photos in an `images/` folder |

---

## ⭐ The booking flow (`book-appointment.html` + `js/main.js`)

A self-contained 5-step wizard: **Service → Doctor → Date & Time → Your Details → Confirm**,
with a success screen. It includes:

- A progress stepper that fills in as you advance.
- Per-step validation (the "Continue" button stays disabled until the step is valid).
- Date pills generated dynamically (next ~12 open days, Sundays skipped).
- Time slots with some marked unavailable.
- A review summary, then a simulated confirmation.

**It is front-end only.** To go live, send the collected `state` object in `initBooking()`
to your backend / scheduling system (e.g. in the `data-booking-confirm` click handler)
instead of the simulated `setTimeout`.

To edit services, doctors, or time slots, change the markup in `book-appointment.html`
(`.option-tile` and `.time-slot` elements) — no JS changes needed.

---

## 🔌 Connecting forms to a backend

All forms currently **simulate** submission (toast + reset). Search `js/main.js` for
`handleFormSubmit` and the booking confirm handler, and replace the `setTimeout` with a
real `fetch()` POST to your endpoint, email service, or scheduling API.

---

## 📱 Responsive

Breakpoints at 1024px (tablet), 768px (mobile), 480px (small). The nav collapses to a
full-screen overlay menu; the booking stepper condenses; grids stack. Test by resizing
your browser.

---

## ✅ Notes

- No frameworks, no npm — just open the files.
- Replace placeholder copy, images, prices, and the map embed before going live.
- Add real Privacy / Terms / HIPAA pages (footer links currently point to `#`).
