# Fynd Studio Design System

> **Preset**: `abqL6KX` (Maia style, Stone base, Violet primary, Inter font, Phosphor icons)
> **Architecture**: Modular CSS with token-driven design system
> **Stack**: Vanilla HTML/CSS/JS, Express.js server, shadcn/ui v4 design tokens

---

## 1. File Structure

```
public/css/
  main.css                ← Entry point (imports everything)
  tokens.css              ← Design tokens (ONLY file to edit per preset)
  reset.css               ← Normalize + base styles
  components/
    card.css              ← .dash-card system
    button.css            ← .btn-primary, .btn-outline, .btn-ghost, etc.
    badge.css             ← .dash-badge, .comp-badge, .mt-tag, etc.
    input.css             ← Form inputs, selects, textareas
    progress.css          ← Score bars, spark charts, region bars
    alert.css             ← Alert items, toasts
    modal.css             ← Dialog/modal system
    nav.css               ← Navigation, footer, theme toggle
    tabs.css              ← Tab navigation
    table.css             ← Data tables, comparison tables
  layouts/
    page.css              ← Page system, loading overlay
    section.css           ← Section containers, CTA strips
    grid.css              ← All grid layouts
  pages/
    home.css              ← Home page specific styles
    intel.css             ← Creative Intel page styles
    battle.css            ← Battle Cards page styles
  utilities/
    typography.css        ← Text utilities
    spacing.css           ← Margin/padding helpers
    display.css           ← Flex/grid/bg utilities
    animations.css        ← Keyframes and animation classes
  responsive.css          ← Media query overrides
```

---

## 2. Swapping Presets

To apply a new shadcn preset:

1. Create a temp Next.js project:
   ```bash
   npx create-next-app@latest /tmp/shadcn-temp --ts --tailwind --app
   cd /tmp/shadcn-temp && npx shadcn@latest init --preset <NEW_CODE>
   ```

2. Read the generated `app/globals.css` for oklch values.

3. Convert oklch to hex using the culori npm package:
   ```js
   const {formatHex} = require('culori');
   formatHex({mode:'oklch', l:0.457, c:0.24, h:277.023}); // → #432dd7
   ```

4. Update **only** `public/css/tokens.css` with the new hex values.

5. Done. All components automatically pick up the new tokens.

---

## 3. Token Layers

### Layer 1: Primitive (from preset)
| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `--background` | `#ffffff` | `#0c0a09` | Page background |
| `--foreground` | `#0c0a09` | `#fafaf9` | Body text, headings |
| `--card` | `#ffffff` | `#1c1917` | Card backgrounds |
| `--primary` | `#432dd7` | `#372aac` | CTAs, active states |
| `--primary-foreground` | `#eef2ff` | `#eef2ff` | Text on primary bg |
| `--secondary` | `#f4f4f5` | `#27272a` | Secondary fills |
| `--muted` | `#f5f5f4` | `#292524` | Subtle backgrounds |
| `--muted-foreground` | `#79716b` | `#a6a09b` | Labels, descriptions |
| `--destructive` | `#e7000b` | `#ff6467` | Errors, danger |
| `--border` | `#e7e5e4` | `rgba(255,255,255,0.1)` | All borders |
| `--input` | `#e7e5e4` | `rgba(255,255,255,0.15)` | Input borders |
| `--ring` | `#a6a09b` | `#79716b` | Focus rings |

### Layer 2: Semantic (project-specific)
| Token | Value | Usage |
|-------|-------|-------|
| `--good` | `#16a34a` / `#22c55e` | Positive status |
| `--warn` | `#f59e0b` | Caution status |
| `--hover` | `var(--muted)` | Hover backgrounds |
| `--primary-dim` | `rgba(67,45,215,0.15)` | Tag backgrounds |
| `--glow-purple` | `rgba(67,45,215,0.12)` | Decorative glows |

### Layer 3: Component
| Token | Value | Usage |
|-------|-------|-------|
| `--card-radius` | `var(--radius-lg)` | Card border-radius |
| `--card-shadow` | `0 1px 2px rgba(0,0,0,0.04)` | Card shadow |
| `--btn-radius` | `var(--radius)` | Button border-radius |
| `--badge-radius` | `var(--radius)` | Badge border-radius |
| `--focus-ring` | `0 0 0 2px color-mix(...)` | Focus box-shadow |
| `--transition-fast` | `150ms ease` | Standard transition |

---

## 4. Component Reference

### Buttons
| Class | Style |
|-------|-------|
| `.btn-primary` | Violet bg, white text |
| `.btn-secondary` | Gray bg, dark text |
| `.btn-outline` | White bg, border, hover fills |
| `.btn-ghost` | Transparent bg, border |
| `.btn-destructive` | Red bg, white text |
| `.btn-sm` | Smaller padding (32px height) |

### Cards
| Class | Purpose |
|-------|---------|
| `.dash-card` | Base card container |
| `.dash-card-header` | Card header (column flex) |
| `.dash-card-header.row` | Header with row layout |
| `.dash-card-title` | Card title text |
| `.dash-card-title.tabnum` | Large stat number |
| `.dash-card-desc` | Uppercase label |
| `.dash-card-content` | Card body area |
| `.dash-card-footer` | Card footer with border-top |

### Badges
| Class | Style |
|-------|-------|
| `.dash-badge` | Outline neutral badge |
| `.dash-badge.good` | Green outline |
| `.dash-badge.warn` | Amber outline |
| `.dash-badge.danger` | Red outline |
| `.dash-outline-badge` | Uppercase label badge |

### Status Colors
| Class | Color | When |
|-------|-------|------|
| `.good` | `var(--good)` | Score > 75 |
| `.warn` | `var(--warn)` | Score 50–75 |
| `.danger` | `var(--destructive)` | Score < 50 |

---

## 5. Grid Layouts

| Class | Columns | Gap |
|-------|---------|-----|
| `.dash-scores-grid` | auto-fit, min 200px | 16px |
| `.dash-two-col` | 2 equal | 16px |
| `.dash-three-col` | 3 equal | 16px |
| `.comp-grid` | auto-fit, min 300px | 16px |
| `.micro-trend-grid` | auto-fit, min 280px | 20px |
| `.features-grid` | auto-fit, min 300px | 24px |

---

## 6. Spacing Rules

- Card-to-card: `24px` (margin-bottom on `.dash-card`)
- Section-to-section: `80px 48px` padding
- Card header: `20px 24px`
- Card content: `0 24px 20px`
- Card footer: `16px 24px`
- Page max-width: `1200px`
