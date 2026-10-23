# 03 · Design system: "Editorial Ivory"

Tokens live in `src/index.css` (primitives `--p-*`, then semantic roles). Components read roles only, so the whole site re-tunes from the primitives.

## Palette
| Role | Name | Hex |
|---|---|---|
| Ground | Warm Ivory | `#F7F5F0` |
| Text, closing footer | Midnight Ink | `#17242B` |
| Action, links, emphasised words | Deep Teal | `#176B68` |
| Decoration only | Champagne | `#C5A477` |
| Secondary sections and cards | Soft Stone | `#EBE8E0` (a touch lighter than `#E8E5DE` to keep text contrast) |
| Secondary text | Slate | `#4A595F` |

No section background is black or navy. The only dark surface is the footer (Midnight Ink). Hero, nav, case-study headers, project pages and contact are ivory or stone. Champagne appears as thin rules, the heartbeat line, small diamonds and a portrait ring; it is 2.15:1 on ivory so no text uses it. On the footer it carries accents (6.8:1).

## Contrast (WCAG 2.2 AA)
| Pair | Ratio |
|---|---|
| Ink on ivory / on stone | 14.56 / 12.61 |
| Slate on ivory / on stone | 6.68 / 5.79 |
| Deep Teal on ivory / on stone | 5.77 / 5.00 |
| White on Deep Teal (buttons) | 6.6 |
| Ink on champagne | 6.76 |
Lighthouse colour-contrast audit: 0 failures on the home page and the Oladoc case study, mobile and desktop.

## Typography
Fraunces (display, italic for emphasis), Hanken Grotesk (body, 18-19px at 1.7), IBM Plex Mono (metadata, 13px). Self-hosted.

## Surfaces
Ivory sheets and Soft Stone sheets alternate, each overlapping the last with a rounded top. Product screens sit on a quiet stone stage with light shadows. Project accents (Oladoc orange, Marham teal, Sehat Kahani lime) are used only as small rules and button fills with ink text.

## Components and content
See `docs/09-OLADOC-BENCHMARK.md` for the case-study blocks and `src/data/*` for content. Hero: headline "Complex healthcare products. Clearer human experiences.", CTAs "Explore My Work" (scrolls to work) and "Discuss a Project" (email).
