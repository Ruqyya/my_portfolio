# 13 · Visual pass: less text, more image

Audit of the previous build: the home page was 17,100 px tall with long paragraphs in Expertise, the three stories, About, Experience, Contact and every case-study section. Now 13,800 px.

| Area | Change |
|---|---|
| Hero | Four-line headline, one short line, two CTAs. The real Oladoc screens tilt with the pointer, two chips float (PMDC verified, Total Rs 1,700, both taken from the screens), a cover film strip of the real projects drifts below, a scroll cue invites the next section. Proof is three large numbers. |
| Expertise | Six icon tiles, one line each, instead of six paragraphs and a three-part intro |
| Featured work | Large visuals; text reduced to three short facts (problem, role, key decision) per project |
| More projects | Image, title, industry. Summaries removed |
| Experience | Role, company, dates, type. Bullets removed (they remain on LinkedIn) |
| Reviews, About, Contact | Three short quote cards, credentials as chips, process as chips, a three-step strip instead of three cards |
| Oladoc case study | Decision records cut to problem, decision, intended benefit, a "not measured" tag and one trade-off; problem and outcome lists shortened; research evidence as chips |

Checks: six pages at 390, 820 and 1440 px, no overflow, no broken images. Lighthouse home 79 mobile / 91 desktop, Oladoc 83 / 99, accessibility 100, 0 contrast failures, CLS 0. Home performance dipped a little because the hero now loads the cover strip images.
