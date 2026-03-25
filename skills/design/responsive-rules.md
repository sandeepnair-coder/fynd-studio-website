# Responsive Design Rules — Fynd Studio

Breakpoints and layout adaptation rules for all pages.

---

## Breakpoints

| Name | Range | Columns |
|------|-------|---------|
| Desktop | > 991px | Full layout |
| Tablet | 768–991px | Adapted |
| Mobile | < 768px | Stacked |

---

## Grid Behavior

| Pattern | Desktop | Tablet | Mobile |
|---------|---------|--------|--------|
| 3-col cards | 3 columns | 2 columns | 1 column |
| 60/40 split | Side by side | Side by side (50/50) | Stacked (image on top) |
| Bento grid | Mixed sizes | 2 columns equal | 1 column |
| Stat cards | 3 columns | 3 columns | 1 column |
| Button group | Horizontal | Horizontal | Vertical, full-width |
| Hero image | Full width | Full width | Full width, shorter |

---

## Typography Scaling

| Element | Desktop | Tablet | Mobile |
|---------|---------|--------|--------|
| H1 | 56-72px | 40-48px | 32-36px |
| H2 | 36-48px | 28-36px | 24-28px |
| Body | 16px | 16px | 15px |
| Section label | 12px | 12px | 11px |
| Stat numbers | 48px | 40px | 32px |

---

## Spacing Scaling

| Element | Desktop | Tablet | Mobile |
|---------|---------|--------|--------|
| Section padding (vertical) | 80-120px | 60-80px | 40-60px |
| Container side padding | 2rem | 1.5rem | 1.25rem |
| Card gap | 24-32px | 16-24px | 16px |
| Card internal padding | 32px | 24px | 20px |

---

## Image Behavior

- Hero images: maintain aspect ratio, full container width
- Card images: maintain aspect ratio, fill card width
- Split images: on mobile, image goes ABOVE text (not below)
- Cinematic banners: reduce height on mobile (min-height: 240px)
- All images: max border-radius 16px

---

## Navigation

- Desktop: horizontal nav links + CTA button
- Mobile (< 768px): hamburger menu, slide-in drawer
- Logo always visible top-left
- Nav background: transparent → solid on scroll

---

## Common Pitfalls to Avoid

1. Text overflowing containers on mobile
2. Images not scaling (use max-width: 100%)
3. Buttons too small to tap (min 44px touch target)
4. Horizontal scroll from fixed-width elements
5. Font sizes too large on mobile causing single-word lines
6. Cards not stacking properly (use flex-wrap or grid auto-fit)
