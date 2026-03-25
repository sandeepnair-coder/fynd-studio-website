# Section Layout Patterns — Fynd Studio

Reusable layout patterns for landing page sections. Based on Fynd's design system and the AI Editing page at fynd.com.

---

## Pattern 1: Centered Hero
Full-width, centered text stack with media below.

```
┌─────────────────────────────────────┐
│         [Badge / Label]             │
│                                     │
│       Large Heading (H1)            │
│       centered, 48-56px             │
│                                     │
│     Short subheading (16-18px)      │
│                                     │
│   [Primary CTA]  [Secondary CTA]   │
│                                     │
│  ┌───────────────────────────────┐  │
│  │                               │  │
│  │     Large Image / Video       │  │
│  │     border-radius: 16px       │  │
│  │     full container width      │  │
│  │                               │  │
│  └───────────────────────────────┘  │
└─────────────────────────────────────┘
```

**Usage:** Hero sections, campaign introductions
**Image ratio:** 16:9 or 21:9
**Background:** White or light gradient

---

## Pattern 2: Three-Column Image Cards
Equal cards with large images and minimal text.

```
┌───────────┐  ┌───────────┐  ┌───────────┐
│           │  │           │  │           │
│   Image   │  │   Image   │  │   Image   │
│   70%     │  │   70%     │  │   70%     │
│  height   │  │  height   │  │  height   │
│           │  │           │  │           │
├───────────┤  ├───────────┤  ├───────────┤
│  Title    │  │  Title    │  │  Title    │
│  Subtext  │  │  Subtext  │  │  Subtext  │
└───────────┘  └───────────┘  └───────────┘
```

**Usage:** Brand snapshot, feature highlights, solution cards
**Image ratio:** 4:3 or 1:1
**Card radius:** 16px
**Image takes 70% of card height, text takes 30%**

---

## Pattern 3: Alternating 60/40 Split
Image-dominant rows that alternate left/right.

```
Row 1:
┌──────────────────┬────────────┐
│                  │            │
│     Image        │   Title    │
│     60% width    │   Body     │
│     border-r:16  │   CTA      │
│                  │            │
└──────────────────┴────────────┘

Row 2:
┌────────────┬──────────────────┐
│            │                  │
│   Title    │     Image        │
│   Body     │     60% width    │
│   CTA      │     border-r:16  │
│            │                  │
└────────────┴──────────────────┘
```

**Usage:** Solutions, insights, feature details
**Image ratio:** 16:9 or 3:2
**Text is vertically centered beside image**

---

## Pattern 4: Full-Width Cinematic Banner
Dark background with overlay text.

```
┌─────────────────────────────────────┐
│                                     │
│  ┌───────────────────────────────┐  │
│  │  Background Image (full)      │  │
│  │  + dark gradient overlay      │  │
│  │                               │  │
│  │     Section Label (white)     │  │
│  │     LARGE TITLE (white)       │  │
│  │                               │  │
│  └───────────────────────────────┘  │
│                                     │
│  Text content below                 │
│  on white/light background          │
└─────────────────────────────────────┘
```

**Usage:** Campaign platform, transformation, big moments
**Overlay:** linear-gradient(to top, rgba(0,0,0,0.7), transparent)
**Title:** White, uppercase, large tracking

---

## Pattern 5: Stat/Impact Cards
Numbered metric cards in a row.

```
┌───────────┐  ┌───────────┐  ┌───────────┐
│           │  │           │  │           │
│   01      │  │   02      │  │   03      │
│   Large   │  │   Large   │  │   Large   │
│   Number  │  │   Number  │  │   Number  │
│           │  │           │  │           │
│  Short    │  │  Short    │  │  Short    │
│  metric   │  │  metric   │  │  metric   │
│  desc     │  │  desc     │  │  desc     │
└───────────┘  └───────────┘  └───────────┘
```

**Usage:** Impact section, stats, outcomes
**Number style:** 48-56px, bold, brand color or dark
**Card background:** Light tint or white with border

---

## Pattern 6: Bento Grid
Mixed-size cards for variants/audience segments.

```
┌──────────────────┬───────────┐
│                  │           │
│   Large Card     │  Small 1  │
│   (2 col span)   │           │
│                  ├───────────┤
│                  │  Small 2  │
├───────────┬──────┴───────────┤
│  Small 3  │                  │
│           │   Large Card     │
├───────────┤   (2 col span)   │
│  Small 4  │                  │
└───────────┴──────────────────┘
```

**Usage:** Regional variants, audience segments
**Each card:** Colored background (brand tints), icon + title + short desc
**Card radius:** 16px

---

## Pattern 7: Dark CTA Block
Rounded dark container with centered text.

```
┌─────────────────────────────────────┐
│  ┌───────────────────────────────┐  │
│  │     bg: #0e0e0e              │  │
│  │     border-radius: 24px      │  │
│  │                              │  │
│  │     Heading (white, H2)      │  │
│  │     Short desc (gray)        │  │
│  │                              │  │
│  │  [Primary CTA]  [Secondary]  │  │
│  │                              │  │
│  └───────────────────────────────┘  │
└─────────────────────────────────────┘
```

**Usage:** Final CTA, contact section
**Background:** #0e0e0e (not #101319 — that's for section bgs)
**Button style:** Primary light on dark background

---

## Key Rules
- Images always take MORE space than text (60%+ of any section)
- Never use the same layout pattern for consecutive sections
- Alternate between light and dark/tinted backgrounds
- Every section needs a visual — no text-only sections
- Section labels: small caps, muted color, above the H2
- H2 titles: 36-48px, bold, below the label
- Max content width: 1200px
- Section padding: 80-120px vertical
- Card radius: 16px, CTA radius: 24px, button radius: pill (250px)
