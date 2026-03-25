# Color Usage Guide — Fynd Studio

Quick reference for applying colors correctly across the project.

---

## Text Colors

| Use | Token | Hex |
|-----|-------|-----|
| Headings, body | `--text--title` | #0e0e0e |
| Captions, meta | `--text--subtext` | #5b5c5d |
| On dark bg | `--text--title-inverse` | #ffffff |
| Muted on dark | `--text--subtext-inverse` | #a0a1a2 |

---

## Backgrounds

| Use | Token | Hex |
|-----|-------|-----|
| Default | `--background--background-light` | white |
| Alternating sections | `--background--background-medium` | #f8f8f9 |
| Dark sections | `--background--background-darkest` | #0e0e0e |
| CTA blocks | #0e0e0e (not #101319) | — |

---

## Brand Tints (for cards, badges, variant chips)

Each color has 4 aliases: `-fill`, `-stroke`, `-primary`, `-text`

| Color | Fill (bg) | Text (on fill) |
|-------|-----------|-----------------|
| Blue | `--blue--blue-fill` | `--blue--blue-text` |
| Green | `--green--green-fill` | `--green--green-text` |
| Gold | `--gold--gold-fill` | `--gold--gold-text` |
| Lavender | `--lavender--lavender-fill` | `--lavender--lavender-text` |
| Peach | `--peach--peach-fill` | `--peach--peach-text` |
| Red | `--red--red-fill` | `--red--red-text` |

**Rule:** Always pair `-fill` background with `-text` color. Never use black text on tinted backgrounds.

---

## Two Near-Blacks (Critical)

| #0e0e0e | Text, buttons, interactive fills, CTA blocks |
| #101319 | Dark section backgrounds (table headers, dark bgs) |

Never swap these.
