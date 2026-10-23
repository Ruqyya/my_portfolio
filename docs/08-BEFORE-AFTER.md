# 08 · Before and after

| | Live site today (`main`, Teal & Gold) | Branch `signature` |
|---|---|---|
| Palette | Deep teal, gold, mint paper | Midnight Ink, Electric Cyan, Deep Teal, Porcelain, Silver Slate (from the LinkedIn banner) |
| Display type | Cormorant Garamond | Fraunces, with cyan italic emphasis, matching the banner |
| Hero | Headline about patients, doctors and front desk; small stage | Banner statement "Making the complex feel effortless." at up to 8.4vw, heartbeat line, real Oladoc screens overlapping the headline space |
| Featured work | Dark panels on dark | Bright panels, screens on midnight stages, per-project accent rules |
| Case studies | Film plus short summary | Reading rail, research, decision explorer, journey, before/after, design system, and (when data exists) trade-offs, validation, lessons |
| Rhythm | Mostly dark teal | Midnight hero, porcelain work, midnight Experience, porcelain and tint between, midnight Contact |
| Contrast | Not audited | AA measured; Lighthouse contrast audit 0 failures |
| Mobile perf (Lighthouse) | not measured | 83 home, 93 case study |

Screenshots in `docs/screens/`: `sd-*` desktop, `st-*` tablet, `sp-*` phone, `so-*` Oladoc case study.

## Refinement pass (branch `refine`, 24 Oct 2026)

| Area | Change |
|---|---|
| Hero | Left column holds copy, CTAs and the screen tabs; the screens bleed right beside the headline; the banner's heartbeat line now runs the full width and ends in the three proof figures |
| Featured stories | Three distinct layouts: Oladoc (wide stage, four-column story), Marham (real before/after slider beside the story), Sehat Kahani (decision as a pull statement, sticky stage). Oladoc shows the +65%, labelled "Reported on my LinkedIn" |
| Type | Body 19px on desktop, line height 1.7, metadata 13px, small text raised one step across sections |
| Light surfaces | Pale blue replaced by cool-neutral porcelain `#EEF1F5`; no tinted washes |
| More projects | 16:9 cards with no cropping, 2 + 3 + 2 rhythm, larger serif titles, summaries always visible, hover reveals "View case study" |
| Conversion | Expertise gets a "Discuss your product" button; Contact gets a three-step "what happens next" |
| Checks | Lighthouse home 83 / 95, case study 93 / 100, accessibility 100, 0 contrast failures, CLS 0; all 22 project routes load; keyboard focus ring on every control tested |
