# FYND_DESIGN_SYSTEM.md
> Drop this file into any Fynd project repo as `FYND_DESIGN_SYSTEM.md` or `CLAUDE.md`.  
> It instructs AI tools (Claude, Cursor, Copilot) and developers on how to implement the Fynd One Design System correctly.  
> **Last synced:** March 2026 — One Design System (Figma) + devlink/global.css

---

## Quick Setup

### 1 — Fonts

Fynd uses **three font families** with distinct roles:

| Family | Role | Source |
|--------|------|--------|
| **Fynd Sans** | Titles, headings (h1–h2) | Proprietary — self-host only |
| **Inter Display** | Body text, subtext, descriptions | Google Fonts / @fontsource |
| **Inter** | Buttons, UI labels, nav, table headers | Google Fonts / @fontsource |

#### Fynd Sans (proprietary — required for headings)

Fynd Sans is a custom typeface and **cannot be loaded from any public CDN**.  
Obtain the `.woff2` files from the design assets repo or by contacting design@fynd.com.

Place files at:
```
your-project/
└── assets/
    └── fonts/
        ├── FyndSans-Regular.woff2
        ├── FyndSans-Medium.woff2
        ├── FyndSans-SemiBold.woff2
        └── FyndSans-Bold.woff2
```

Then declare via `@font-face` (already included in `fynd-tokens.css`):
```css
@font-face {
  font-family: 'Fynd Sans';
  src: url('/assets/fonts/FyndSans-Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'Fynd Sans';
  src: url('/assets/fonts/FyndSans-Medium.woff2') format('woff2');
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'Fynd Sans';
  src: url('/assets/fonts/FyndSans-SemiBold.woff2') format('woff2');
  font-weight: 600;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'Fynd Sans';
  src: url('/assets/fonts/FyndSans-Bold.woff2') format('woff2');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}
```

> ⚠️ Adjust the `url()` path to match your project's asset serving path (e.g. `/public/fonts/` in Next.js, `/src/assets/fonts/` in Vite).

#### Inter Display + Inter (open source)

```html
<!-- Add to <head> -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter+Display:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
```

Or self-hosted via npm (recommended for production):
```bash
npm install @fontsource/inter-display @fontsource/inter
```
```css
@import '@fontsource/inter-display/400.css';
@import '@fontsource/inter-display/500.css';
@import '@fontsource/inter-display/600.css';
@import '@fontsource/inter-display/700.css';
@import '@fontsource/inter/400.css';
@import '@fontsource/inter/500.css';
@import '@fontsource/inter/600.css';
```

**Loaded weights summary:**
| Family | Weights | Role |
|--------|---------|------|
| Fynd Sans | 400, 500, 600, 700 | Headings — h1, h2, large display text |
| Inter Display | 400, 500, 600, 700 | Body text, subtext, descriptions |
| Inter | 400, 500, 600 | Buttons, nav links, badges, table headers |

---

### 2 — Icons
**Library: [Lucide Icons](https://lucide.dev)** (MIT license)

Chosen for: consistent 1.5px stroke weight, clean geometric style matching Fynd's aesthetic.

```bash
# React / Next.js / Astro
npm install lucide-react

# Vanilla / HTML
<script src="https://unpkg.com/lucide@latest"></script>
```

**Usage:**
```jsx
// React / Astro (with React integration)
import { ShoppingBag, ArrowRight, ChevronDown } from 'lucide-react'

<ShoppingBag size={20} strokeWidth={1.5} />
```

```html
<!-- Vanilla HTML -->
<i data-lucide="shopping-bag"></i>
<script>lucide.createIcons();</script>
```

**Icon sizing conventions:**
| Context | Size | Token |
|---------|------|-------|
| UI / inline | 16px | `--icon-size-ui` |
| Feature / cards | 20px | `--icon-size-feature` |
| Decorative / hero | 24px | `--icon-size-decorative` |

**Always use `strokeWidth={1.5}`** — this is the Fynd icon style.  
**Never fill icons** — Lucide icons are outline only.

---

### 3 — CSS Tokens
Copy `fynd-tokens.css` to your project and import before all other styles:
```css
/* styles/globals.css */
@import './fynd-tokens.css';
```

Or drop into a CDN / shared package and reference via URL.

---

## Typography Rules

### Font Families
```css
font-family: var(--font-family--primary);   /* Fynd Sans    — headings, display titles */
font-family: var(--font-family--secondary); /* Inter Display — body, subtext           */
font-family: var(--font-family--ui);        /* Inter         — buttons, UI labels      */
```

> **Rule:** `--font-family--primary` (Fynd Sans) is for h1, h2, and large marketing/display text only. Body copy, subtext, and descriptions always use `--font-family--secondary` (Inter Display). Interactive elements (buttons, nav, badges) always use `--font-family--ui` (Inter).

### Headings
```css
h1 {
  font-family: var(--font-family--primary);
  font-size: var(--font-size--h1);        /* 72px */
  font-weight: var(--font-weight--regular); /* 400 */
  line-height: var(--line-height--110);
  letter-spacing: var(--letter-spacing--heading-1); /* -0.04em */
}
h2 {
  font-family: var(--font-family--primary);
  font-size: var(--font-size--h2);        /* 56px */
  font-weight: var(--font-weight--regular);
  line-height: var(--line-height--110);
  letter-spacing: var(--letter-spacing--heading-2); /* -0.04em */
}
h3 { font-size: var(--font-size--h5); font-weight: 700; letter-spacing: var(--letter-spacing--heading-3); }
h4 { font-size: var(--font-size--body-l); font-weight: 700; letter-spacing: var(--letter-spacing--heading-4); }
h5 { font-size: var(--font-size--body-s); font-weight: 700; letter-spacing: var(--letter-spacing--heading-5); }
h6 { font-size: var(--font-size--body-xs); font-weight: 700; }
```

### Body Text
```css
/* Default body */
font-family: var(--font-family--secondary);
font-size: var(--font-size--body-m);   /* 16px */
font-weight: var(--font-weight--regular); /* 400 */
line-height: var(--line-height--150);  /* 1.5 */
color: var(--text--title);             /* #0e0e0e */

/* Subtext / captions */
color: var(--text--subtext);           /* #5b5c5d */
font-size: var(--font-size--body-s);   /* 14px */
line-height: var(--line-height--140);
```

### Verified Figma Type Styles
| Style | Size | Weight | Line Height | Family |
|-------|------|--------|-------------|--------|
| Heading / h1 | 72px | 400 | 110% | **Fynd Sans** |
| Heading / h2 | 56px | 400 | 110% | **Fynd Sans** |
| Body XS / Regular | 12px | 400 | 130% | Inter Display |
| Body S / Regular | 14px | 400 | 140% | Inter Display |
| Body M / Regular | 16px | 400 | 150% | Inter Display |
| Body XL / Medium | 20px | 500 | 140% | Inter Display |
| Button / m-prominent | 14px | 500 | 20px | Inter |

---

## Color Rules

### ⚠️ Critical: Two near-blacks
| Use case | Value | Token |
|----------|-------|-------|
| Text, interactive dark fills, buttons | `#0e0e0e` | `--text--title` |
| Dark section backgrounds (CTA, table headers) | `#101319` | `--neutral--neutral-100--devlink` |

**Never swap these.** Text and interactive elements use `#0e0e0e`. Background sections use `#101319`.

### Text Colors
```css
color: var(--text--title);            /* #0e0e0e — headings, body */
color: var(--text--subtext);          /* #5b5c5d — captions, meta */
color: var(--text--title-inverse);    /* #ffffff — text on dark bg */
color: var(--text--subtext-inverse);  /* #a0a1a2 — muted text on dark bg */
```

### Backgrounds
```css
background: var(--background--background-light);    /* white      */
background: var(--background--background-medium);   /* #f8f8f9    */
background: var(--background--background-dark);     /* #5b5c5d    */
background: var(--background--background-darkest);  /* #0e0e0e    */
```

### Brand Color Usage Pattern
Each brand color (`blue`, `peach`, `green`, `gold`, `lavender`, `red`) exposes four aliases:
```css
/* Example — blue */
background: var(--blue--blue-fill);   /* light bg  → blue-10 #f9fbff */
border:     var(--blue--blue-stroke); /* border    → blue-20 #d8e2f5 */
color:      var(--blue--blue-primary); /* accent   → blue-40 #5c98f7 */
color:      var(--blue--blue-text);   /* dark text → blue-90 #07285a */
```

**Rule:** When placing text on a brand-coloured background, always use the `-text` (90-shade) alias. Never use `neutral-100` or `#0e0e0e` on a tinted background.

### Status Colors (feature tables, data)
```css
color: var(--status--yes);     /* #0d7a3a — green, supported     */
color: var(--status--partial); /* #9a6700 — amber, partial       */
color: var(--status--no);      /* #c13515 — red, not supported   */
```

---

## Spacing Rules

Always use tokens, never magic numbers:
```css
gap:     var(--spacing--16);  /* 16px */
padding: var(--spacing--24) var(--spacing--32);
margin:  0 0 var(--spacing--56);
```

> **Figma shorthand:** Components from the Figma file use `var(--16, 16px)` syntax. This resolves via the shorthand aliases defined in `fynd-tokens.css` (e.g. `--16`, `--24`).

---

## Border Radius Rules

```css
border-radius: var(--border-radius--pill);  /* 250px — BUTTONS, chips, fully-rounded elements */
border-radius: var(--border-radius--tag);   /* 2000px — badges, tags (from Figma)             */
border-radius: var(--border-radius--16);    /* 16px  — cards                                  */
border-radius: var(--border-radius--24);    /* 24px  — CTA boxes, large containers            */
border-radius: var(--border-radius--8);     /* 8px   — inputs, small elements                 */
```

> **Rule: All buttons use `--border-radius--pill` (250px).** This is the canonical Fynd button shape — fully rounded, not square-cornered.

---

## Component Patterns

### Button

```css
.btn {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing--8);
  padding: var(--btn--padding-y) var(--btn--padding-x);
  border-radius: var(--btn--border-radius);   /* 250px — pill */
  font-family: var(--btn--font-family);       /* Inter */
  font-size: var(--btn--font-size);           /* 14px  */
  font-weight: var(--btn--font-weight);       /* 500   */
  line-height: var(--btn--line-height);       /* 20px  */
  letter-spacing: var(--btn--letter-spacing); /* 0     */
  transition: var(--btn--transition);
  cursor: pointer;
  border: none;
  white-space: nowrap;
}

/* Variants */
.btn-primary         { background: var(--btn--primary--bg);       color: var(--btn--primary--color); }
.btn-primary:hover   { background: var(--btn--primary--bg-hover); }

.btn-primary-light       { background: var(--btn--primary-light--bg);       color: var(--btn--primary-light--color); }
.btn-primary-light:hover { background: var(--btn--primary-light--bg-hover); }

.btn-secondary       { background: var(--btn--secondary--bg); color: var(--btn--secondary--color); border: 1px solid var(--btn--secondary--border); }
.btn-secondary:hover { background: var(--btn--secondary--bg-hover); border-color: var(--btn--secondary--border-hover); }

.btn-secondary-light       { background: var(--btn--secondary-light--bg); color: var(--btn--secondary-light--color); border: 1px solid var(--btn--secondary-light--border); }
.btn-secondary-light:hover { background: var(--btn--secondary-light--bg-hover); border-color: var(--btn--secondary-light--border-hover); }

/* Size modifier */
.btn-lg { padding: var(--btn--padding-y-lg) var(--btn--padding-x-lg); font-size: var(--font-size--ui-l); }
```

```jsx
// React
<button className="btn btn-primary">Get started</button>
<button className="btn btn-secondary btn-lg">Learn more</button>

// With Lucide icon
import { ArrowRight } from 'lucide-react'
<button className="btn btn-primary">
  Get started <ArrowRight size={16} strokeWidth={1.5} />
</button>
```

### Badge / Tag

```css
.badge {
  display: inline-flex;
  align-items: center;
  padding: var(--badge--padding-y) var(--badge--padding-x);  /* 8px 12px */
  border-radius: var(--badge--border-radius);                /* 2000px   */
  font-family: var(--font-family--secondary);
  font-size: var(--badge--font-size);       /* 12px */
  font-weight: var(--badge--font-weight);   /* 400  */
  line-height: var(--line-height--130);
}

.badge-blue     { background: var(--blue--blue-fill);     color: var(--blue--blue-text);     }
.badge-green    { background: var(--green--green-fill);   color: var(--green--green-text);   }
.badge-gold     { background: var(--gold--gold-fill);     color: var(--gold--gold-text);     }
.badge-lavender { background: var(--lavender--lavender-fill); color: var(--lavender--lavender-text); }
.badge-peach    { background: var(--peach--peach-fill);   color: var(--peach--peach-text);   }
.badge-red      { background: var(--red--red-fill);       color: var(--red--red-text);       }
```

### Card

```css
.card {
  background: var(--background--background-light);
  border: 1px solid var(--neutral--neutral-20);
  border-radius: var(--border-radius--16);
  padding: var(--spacing--32);
}
.card:hover {
  border-color: var(--neutral--neutral-30);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
}

/* Pricing card — recommended variant */
.card-pricing-recommended {
  border: 2px solid var(--neutral--neutral-100);
}
```

### CTA Dark Section
```css
.cta-dark {
  background: #0e0e0e;
  border-radius: var(--border-radius--24);
  padding: var(--spacing--80) var(--spacing--32);
  text-align: center;
}
.cta-dark .cta-inner {
  max-width: var(--layout--cta-content-max); /* 640px */
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing--24);
}
```

### FAQ Accordion
```css
.faq-layout   { display: grid; grid-template-columns: 1fr 1.5fr; gap: 3rem; }
.faq-left     { position: sticky; top: 6rem; height: fit-content; }
.faq-item     { border-bottom: 1px solid var(--neutral--neutral-20); }
.faq-toggle   { transition: transform 0.3s ease; }
.faq-item.open .faq-toggle { transform: rotate(45deg); }
.faq-answer   { max-height: 0; overflow: hidden; transition: max-height 0.3s ease; }
```

---

## Layout

### Container
```css
.container {
  max-width: var(--layout--container-max);     /* 1200px */
  margin: 0 auto;
  padding: 0 var(--layout--container-padding); /* 0 2rem */
}
@media (max-width: 767px) {
  .container { padding: 0 var(--layout--container-padding-mobile); } /* 0 1.25rem */
}
```

### Section Header
```css
.section-header {
  max-width: var(--layout--section-header-max); /* 720px */
  margin: 0 auto var(--spacing--56);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing--16);
}
```

### Responsive Grid Behaviour
| Component | Desktop | Tablet (≤991px) | Mobile (≤767px) |
|-----------|---------|-----------------|-----------------|
| Feature cards | 3 columns | 2 columns | 1 column |
| 50/50 narrative | 2 col, 3rem gap | 2 col, 2rem gap | 1 col, 1.5rem gap |
| Pricing | 2 columns | 2 columns | 1 column |
| FAQ | 2 col grid | 1 column | 1 column |
| Verdict cards | 3 columns | 3 columns | 1 column |
| Button group | horizontal | horizontal | vertical, full-width |
| Stat font size | 3rem | 3rem | 2.25rem |

---

## Dos and Don'ts

| ✅ Do | ❌ Don't |
|-------|---------|
| Use `--border-radius--pill` (250px) for all buttons | Use `8px` or fixed px on buttons |
| Use `Inter` (not Inter Display) for button text | Use Inter Display for button labels |
| Use `#0e0e0e` for text/interactive darks | Mix up `#0e0e0e` and `#101319` |
| Use `--badge--border-radius` (2000px) for tags | Use smaller radius for badge/pill shapes |
| Reference `--text--subtext` for secondary text | Hardcode `#5b5c5d` |
| Use stroke-only Lucide icons at 1.5px | Fill icons or mix icon libraries |
| Apply `-text` (90-shade) for text on tinted bg | Use black on brand-colour fills |
| Import `fynd-tokens.css` before all other styles | Override token values inline |

---

## CSS Variable Quick Reference

### Naming Conventions
| Pattern | Example | Used in |
|---------|---------|---------|
| `--font-family--{role}` | `--font-family--primary` | Typography |
| `--font-size--{scale}` | `--font-size--body-m` | Typography |
| `--neutral--neutral-{n}` | `--neutral--neutral-60` | Raw neutrals |
| `--{color}--{color}-{shade}` | `--blue--blue-40` | Raw brand colors |
| `--{color}--{color}-{alias}` | `--blue--blue-fill` | Semantic shortcuts |
| `--text--{role}` | `--text--subtext` | Semantic text |
| `--background--{role}` | `--background--background-medium` | Semantic bg |
| `--border--{role}` | `--border--border-medium` | Semantic borders |
| `--spacing--{n}` | `--spacing--24` | Spacing scale |
| `--border-radius--{n}` | `--border-radius--pill` | Radius scale |
| `--btn--{variant}--{prop}` | `--btn--primary--bg` | Button tokens |
| `--badge--{prop}` | `--badge--border-radius` | Badge tokens |
| `--card--{type}--{prop}` | `--card--pricing--radius` | Card tokens |

### Figma Slash → CSS Dash Mapping
| Figma variable | CSS token |
|---------------|-----------|
| `--text/title` | `--text--title` |
| `--text/subtext` | `--text--subtext` |
| `--background/background-light` | `--background--background-light` |
| `--typeface/font-family/title` | `--font-family--primary` |
| `--typeface/font-family/body` | `--font-family--secondary` |
| `--font-family/sans` | `--font-family--ui` |
| `--font-size/m` | `--font-size--ui-m` |
| `--line-height/m` | `--line-height--ui-m` |
| `--letter-spacing/baggy` | `--letter-spacing--baggy` |
| `--borderradius/core/full` | `--border-radius--pill` |
| `--16` (Figma shorthand) | `--spacing--16` or `--16` |

---

## Stack-Specific Setup

### Astro
```astro
---
// src/layouts/Layout.astro
---
<html>
  <head>
    <!-- Inter Display + Inter via Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter+Display:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
    <!-- Fynd Sans is declared via @font-face in fynd-tokens.css -->
  </head>
  <body>
    <slot />
  </body>
</html>

<style is:global>
  @import '../styles/fynd-tokens.css'; /* @font-face for Fynd Sans lives here */
</style>
```

### Next.js (App Router)
```tsx
// app/layout.tsx
// Note: Fynd Sans must be loaded via @font-face in globals.css (not next/font — proprietary font)
import { Inter_Display, Inter } from 'next/font/google'
import './globals.css' // contains @import './fynd-tokens.css' with Fynd Sans @font-face

const interDisplay = Inter_Display({
  subsets: ['latin'],
  weight: ['400','500','600','700'],
  variable: '--font-inter-display'
})
const inter = Inter({
  subsets: ['latin'],
  weight: ['400','500','600'],
  variable: '--font-inter'
})

export default function RootLayout({ children }) {
  return (
    <html className={`${interDisplay.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  )
}
```

> Place `FyndSans-*.woff2` files in `public/fonts/` and update the `url()` paths in `fynd-tokens.css` to `/fonts/FyndSans-Regular.woff2` etc.

### React (Vite / CRA)
```tsx
// main.tsx or index.tsx
import './styles/fynd-tokens.css' // Fynd Sans @font-face + all tokens
```
> Place `FyndSans-*.woff2` files in `src/assets/fonts/` and update the `url()` paths accordingly.

### Vanilla HTML
```html
<head>
  <!-- Fynd Sans via fynd-tokens.css @font-face (files must be on your server) -->
  <link rel="stylesheet" href="fynd-tokens.css">
  <!-- Inter Display + Inter -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter+Display:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
  <!-- Lucide icons -->
  <script src="https://unpkg.com/lucide@latest"></script>
</head>
<body>
  <script>lucide.createIcons();</script>
</body>
```

---

## File Structure (when adding to a project)

```
your-project/
├── FYND_DESIGN_SYSTEM.md     ← this file (AI context + dev reference)
├── src/
│   └── styles/
│       ├── fynd-tokens.css   ← import first, before all other styles
│       └── globals.css       ← @import './fynd-tokens.css' at top
```

---

## Source References

| Resource | URL / Location |
|----------|---------------|
| One Design System (Figma) | https://www.figma.com/design/qtxg951KvgNG3jYzQQU2s4/One-Design-system |
| **Fynd Sans** font files | Internal — contact design@fynd.com or pull from design assets repo |
| Inter Display (Google Fonts) | https://fonts.google.com/specimen/Inter+Display |
| Inter (Google Fonts) | https://fonts.google.com/specimen/Inter |
| @fontsource/inter-display | https://fontsource.org/fonts/inter-display |
| Lucide Icons | https://lucide.dev |
| lucide-react (npm) | https://www.npmjs.com/package/lucide-react |
| devlink/global.css | Internal — `devlink/global.css` (~2800 lines) |
| compare.css | Internal — `src/styles/compare.css` (501 lines) |

*Last synced: March 2026*
