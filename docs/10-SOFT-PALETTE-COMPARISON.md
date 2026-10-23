# 10 · Soft palette comparison: A (Soft Botanical Teal + Porcelain) vs B (Ocean Blue + Mist)

Both variants are live in the same code. Components read only colour roles; the two palettes are the primitives at the top of `src/index.css`. Variant A is the default. Variant B turns on with `<html data-palette="ocean">`. Screenshots: `docs/screens/soft-A-*` and `soft-B-*`.

## Palettes

| Role | A · Soft Botanical | B · Ocean + Mist |
|---|---|---|
| Porcelain / Mist (ground) | `#F5F8F5` | `#F4F7FA` |
| Tint (alternate sections) | `#E9F1EC` | `#E8EEF4` |
| Stage (behind product screens) | `#DCECE5` Soft Mint | `#DDE8F1` |
| Primary text | `#243C39` Forest Ink | `#1F3347` |
| Secondary text | `#4A625E` | `#4A5F73` |
| Fill, marks, large display type | `#427F78` Sage Teal | `#3F6E96` |
| Small text and links | `#37706A` | `#35607F` |
| Soft accent | `#A8C7BC` Sea Glass | `#A9C2D6` |
| The one dark surface (contact, footer) | `#243C39` | `#1F3347` |

## Measured contrast (WCAG 2.2 AA: 4.5 for text, 3 for large text and UI)

| Pair | A | B |
|---|---|---|
| Primary text on ground | 11.02 | 12.04 |
| Primary text on tint / stage | 10.25 / 9.65 | 11.07 / 10.41 |
| Secondary text on ground / tint / stage | 6.13 / 5.71 / 5.37 | 6.15 / 5.66 / 5.32 |
| Small links on ground / stage | 5.32 / 4.66 | 6.24 / 5.39 |
| White on button fill | 4.63 | 5.41 |
| Large display italic (fill colour) on ground | 4.32 (passes the 3:1 large-text rule) | 5.03 |
| Light text on the dark surface | 7.77 | 8.37 |
| Sea Glass on the dark surface | 6.49 | 7.01 |

The raw Sage Teal `#427F78` is 4.32 on porcelain, so it is used only for fills, marks and large type. Small text and links use the deeper `#37706A` (5.32).

## Comparison

| Criterion | A · Soft Botanical | B · Ocean + Mist |
|---|---|---|
| Readability | Excellent; slightly lower accent contrast, handled with the deeper text tone | Excellent; the strongest numbers |
| Visual comfort | Warmest and calmest; green-grey reads restful next to healthcare imagery | Calm but cooler and closer to a generic SaaS look |
| Distinctiveness | Higher: teal-sage with serif italic is uncommon in healthcare and SaaS portfolios | Lower: blue and white is the sector default |
| Fit with the product screens | Oladoc's indigo and orange sit well on the mint stage | Indigo on pale blue is close in hue, so the screens separate less |
| Continuity with the previous site | Keeps the teal family and the Goddard-cover depth | A clear break from teal |
| Client clarity | Same copy and layout in both | Same |

## Recommendation: A

A is more distinctive, more restful and separates the authentic screens better from their background. B has marginally stronger numbers, but A already passes AA everywhere with the deeper text tone, so the extra contrast does not buy anything the reader can feel. Keep B only if you want the site to look closer to a conventional SaaS brand.

## Other changes in this pass
- Hero headline "Complex healthcare products. Clearer human experiences." with the supporting line "I help healthcare and SaaS teams turn complicated workflows into clear, accessible products, from the first research conversation to production-ready UI." ("intuitive" was dropped as unprovable; "accessible" matches the WCAG-conscious work listed on LinkedIn.)
- CTAs: "Explore My Work" scrolls to the work section; "Discuss a Project" opens an email with three prompts filled in.
- Oladoc headline "Designing a clearer path from finding care to booking it." with "Oladoc Healthcare App UX/UI Case Study" shown above it and kept in the page title for search.
- "Watch the film" removed. The video is a 74-second animated summary (problem, screens, numbers), not a product demonstration, so it is labelled "Animated project summary". Header links now go to different places: "Discuss a similar project" (email) and "Explore the design process" (research section); a "See the final experience" link sits under the video. On the home page cards, "Watch the summary".
- Dark sections reduced to the contact block and footer; nav, hero, Experience and the case-study header are light. Product screens sit on a soft mint stage with light shadows.
