# 03 · Design system: "Midnight & Cyan"

Taken from the LinkedIn banner (midnight ink, electric cyan, deep teal, serif headline with a cyan italic line, heartbeat line). Tokens live in `src/index.css`; change a value there and the site follows.

## Brand palette

| Role | Name | Hex |
|---|---|---|
| Primary dark | Midnight Ink | `#080D19` |
| Signature accent | Electric Cyan | `#20D6D2` |
| Secondary accent | Deep Teal | `#087F86` |
| Light background | Porcelain | `#F8FAFC` |
| Secondary text | Silver Slate | `#AAB9C9` |
| Primary light text | White | `#FFFFFF` |

## Semantic tokens

| Token | Light (porcelain) | Midnight surface | Use |
|---|---|---|---|
| `paper` | `#F8FAFC` | `#080D19` | Surface |
| `paper-2` | `#EAF2F6` | `#0F1726` | Tinted surface, cards |
| `ink` | `#080D19` | `#FFFFFF` | Primary text |
| `ink-2` | `#4A5B6E` | `#AAB9C9` | Secondary text |
| `line` / `line-strong` | `#D3DEE7` / `#9FB2C3` | `#1F2B3D` / `#4A5B72` | Hairlines / control borders |
| `forest` (action, links) | `#06707A` | `#20D6D2` | Buttons, links, emphasis |
| `forest-hover` | `#055B64` | `#6EE6E3` | Hover |
| `on-forest` | `#FFFFFF` | `#080D19` | Text on buttons |
| `signal` | `#06707A` | `#20D6D2` | Labels, numbers |
| `mark` | `#087F86` | `#20D6D2` | Decorative rules and icons only |
| `focus` | `#06707A` | `#20D6D2` | 2px focus ring |

The deep-teal surface (`.surface-teal`, `#064C52`) is used once, for the mid-page call-out. Per-project accents (Oladoc `#FCA025`, Marham `#3CC2B5`, Sehat Kahani `#B4DC4A`) are used only as rules and button fills with midnight text, never as small text on light.

**Adjustments made to hold AA:** Silver Slate fails on porcelain (1.91), so light grounds use a deepened slate `#4A5B6E` (6.66). Cyan fails as text on porcelain (1.73), so light grounds use `#06707A` (5.57) and keep cyan for midnight surfaces, where it measures 10.73. Brand Deep Teal `#087F86` is 4.57 on porcelain but 4.22 on the tint, so it is kept for fills and marks, not text.

### Measured contrast (WCAG 2.2 AA: 4.5 text, 3 large text and UI)

| Pair | Ratio |
|---|---|
| ink on porcelain | 18.55 |
| deepened slate on porcelain / on tint | 6.66 / 6.15 |
| action teal `#06707A` on porcelain | 5.57 |
| white on brand teal `#087F86` | 4.78 |
| midnight on cyan (button) | 10.73 |
| cyan on midnight | 10.73 |
| Silver Slate on midnight / on midnight-2 | 9.70 / 8.89 |
| white on midnight | 19.41 |

Lighthouse colour-contrast audit: 0 failures on the home page and the Oladoc case study, mobile and desktop.

## Rhythm

Hero midnight → Expertise porcelain → Selected work tinted porcelain with three midnight "stages" for the screens → More projects porcelain with the single teal call-out → Experience midnight (editorial) → Reviews porcelain → Process tint → FAQ porcelain → Contact midnight. No cyan glow, no large gradients, no grain.

## Typography

| Role | Family | Notes |
|---|---|---|
| Display | Fraunces (variable, roman and italic, 400–600) | Self-hosted, preloaded. Italic carries the emphasis: cyan on midnight, deep teal on porcelain |
| Body | Hanken Grotesk (variable) | 18px / 1.65 |
| Metadata | IBM Plex Mono 400 and 500 | Uppercase, 0.08em tracking, 12px |

Hero headline `clamp(3.3rem, 8.4vw, 8.4rem)`. Georgia is the metric-adjusted fallback; layout shift measured 0.

## Signature elements

- **Headline from the banner:** "Making the complex *feel effortless.*"
- **Heartbeat line** (banner motif): draws once under the hero copy.
- **Art-directed hero:** real Oladoc Figma screens overlap the headline's space and bleed to the right. Tabs bring the patient, doctor or front-desk screens forward; auto-rotation pauses on hover and focus and stops with reduced motion.
- **Decision explorer** (case studies): tablist with arrow keys, Home and End; works by touch; shows the real screens for each decision.
- **Before/after slider** (Marham), only where a genuine "before" exists.

## Accessibility rules

Skip link, one `h1`, visible focus ring in the action colour, 44px targets, tablist patterns on the hero and the explorer, labelled scroll regions, alt text on content images, `prefers-reduced-motion` honoured.

## Maintaining content

Case studies: `src/data/case-studies.ts` (every field optional; `tradeoffs`, `validation` and `lessons` render only when filled). Featured projects: `features` in `sections/Work.tsx`. Verified proof: `data/content.ts` and `data/contact.ts`.
