# Kriat Smiles — Dental Clinic, Ibadan (Preview Demo)

A fast, mobile-first **one-page demo website** for **Kriat Smiles** (@kriatsmiles), a dental
clinic in Ibadan. Built with pure **HTML + CSS + vanilla JS** — no build step, no dependencies.

The goal: let patients see treatments, prices, location and FAQs, and **book a dental
appointment on WhatsApp** without asking basic questions in DM.

> **Slug:** the site is designed to live at **`/kriat-smiles`** (GitHub Pages serves it at
> `https://<username>.github.io/kriat-smiles/`).

---

## ▶️ Run it locally

It's static — any of these work. From this folder:

```bash
# Option A — Python (already installed)
python -m http.server 5173
# then open http://localhost:5173/

# Option B — Node
npx serve .
# Option C — just double-click index.html
```

> Some browsers block autoplaying video / WhatsApp pop-ups when opening the file directly
> (`file://`). Using a local server (Option A/B) gives the true experience.

## 🏗️ Build

There is **no build step** — what you see is what ships. "Building" = copying these files
to any static host. To make a production zip:

```bash
# everything except the raw source folders is the deployable site
# (index.html, css/, js/, assets/)
```

---

## ✏️ What to edit before going live

| What | Where |
|------|-------|
| **WhatsApp number** | `js/main.js` → `var WHATSAPP = '2348000000000'` (intl format, digits only) |
| **Phone number** | `index.html` → find/replace `+2348000000000` |
| **Prices** | `index.html` → each `.svc__price` block (all marked *(placeholder)*) + the FAQ |
| **Address** | `index.html` → find/replace `123 Ring Road` |
| **Map** | `index.html` → the `<iframe>` in the Location section (paste your Google Maps embed) |
| **HMO list** | `index.html` → the HMO FAQ answer |
| **Doctor names / reviews** | `index.html` → Testimonials section |
| **Instagram** | already set to `instagram.com/kriatsmiles` |
| **Opening hours** | top bar, booking aside, location section + footer |

## 🖼️ Replace the placeholder logo, photos & videos

All media lives in **`assets/`**:

```
assets/
├── logo/kriat-smiles-logo.jpg   ← the brand logo (header, footer, favicon)
├── img/                          ← photos used in hero, gallery, posters
│   ├── protect-smile.jpg  checkup.jpg  scaling-polishing.jpg
│   ├── healthy-teeth.jpg  healthy-gums.jpg  healthy-smile.jpg  team.jpg
└── video/                        ← short clips (hero + learn videos)
    ├── welcome.mp4  braces.mp4  root-canal.mp4  brushing-tips.mp4
```

To swap an image/video, **keep the same filename** and drop in your new file — no code
changes needed. (Or change the `src=""` paths in `index.html`.)

- **Logo:** replace `assets/logo/kriat-smiles-logo.jpg`. The logo shows on a black chip so the
  white/green logo stays sharp and **highly visible** on every background.
- **Brand colours** are derived from the logo (neon lime-green + black) and live as CSS
  variables at the top of `css/style.css` (`--lime`, `--ink`, …) — change them in one place.

---

## 📱 Notes

- **Mobile-first** and fully responsive; no horizontal scroll/"empty space" when swiping.
- **SEO-aware:** title & meta target *"Dental clinic in Ibadan"*, plus `Dentist` schema.org
  structured data and Open Graph tags.
- The booking form and every WhatsApp button open WhatsApp with a **pre-filled,
  service-specific message** — ready to send.
- This is a **preview demo**: copy, prices, photos and contact details are placeholders the
  clinic can review, own and customise.
