# 05 · Conversion audit: what stood in the way, what was fixed, what is still missing

Audited as a healthcare SaaS founder with a design budget, a design recruiter, and a conversion strategist. Findings are ordered by how much they cost in lost enquiries.

## Second design pass (what changed after review)

| Feedback | Change |
|---|---|
| Palette felt dark navy and ivory only; wanted midnight ink, warm porcelain, deep botanical teal and restrained champagne | New "Porcelain & Ink" tokens with a botanical-teal surface; all text pairs re-measured |
| Looked like stacked sections | Every section is now a rounded "sheet" sliding over the previous one, with an ink / porcelain / ink / porcelain / stone / teal rhythm |
| Projects depended on thumbnails | Top three (Oladoc, Marham, Sehat Kahani) are full story panels: headline, the problem, my role, the key decision, what it delivers, case-study button, film link, large authentic screens, and an accent taken from each project's own palette. The other seven are a compact grid; the five Behance-only pieces are an archive list |
| Hero not balanced, duplicate headline inside the image | The hero image now shows real Oladoc Figma screens (doctor portal, front desk, two phone screens) layered; the three tabs bring each room's screens to the front. Headline, value proposition and a gold CTA all sit above the fold at 1440×900 |
| Value proposition unclear to founders | "I help healthcare and SaaS product teams turn complex workflows into products patients and clinicians trust, from the first research conversation to production UI." |
| Repetitive and long on phones | Expertise cards became a swipe row on phones; featured panels lead with their screens; larger body text (18px) and headings |
| Layout shifted while fonts loaded | Fonts self-hosted and preloaded, metric-matched fallbacks: CLS 0 |

## Obstacles found

| # | Obstacle | Status | What was done |
|---|---|---|---|
| 1 | **Proof a client could disprove.** Six named testimonials from companies that are not in the LinkedIn history, six awards, "120+ projects / 60+ clients / 18 awards" counters, and three invented employers | **Fixed** | Removed from the site. They stay in `content.ts` under `unverified…` exports so nothing is lost. Experience now matches LinkedIn exactly |
| 2 | Case studies were a film and a one-line summary, with no problem, users, research or decisions | **Fixed for 10 projects** | New case-study template with a 60-second summary, reading rail, problem, users, research, annotated decisions, journey, before/after, final design, design system and "what this shows". Sections appear only when authentic material exists |
| 3 | No clear way to start a conversation (the old form sent nothing, the booking card pointed nowhere) | **Fixed** | One primary action everywhere ("Discuss a project") opening an email with three prompts already filled in; floating email button after the hero; mid-page and end-of-page contact bands |
| 4 | Generic headline | **Fixed** | "Healthcare software, designed for the patient, the doctor and the front desk." Specific to the work |
| 5 | Unclear who I help and what I solve | **Fixed** | New Expertise section: who I help, what I solve, how I work, and six capabilities each linked to a project or a LinkedIn role |
| 6 | No visible collaboration model | **Fixed** | "Working together" block (how it starts, how we communicate, what you get) taken from the owner's own FAQ answers; FAQ cut to the six questions that matter before a first call |
| 7 | Colours the owner disliked; hero looked like many healthcare templates | **Fixed** | Ivory & Ink palette, tested for contrast |
| 8 | Weak thumbnails | **Improved** | Silent preview loops of the real films, real Figma exports for Oladoc, device frames |
| 9 | Too much text and a very long page | **Improved** | Compact process and review layouts; page is about 19,500px on a 375px phone, still long |
| 10 | Slow loading | **Improved** | Case-study pages score 91–92 on mobile Lighthouse performance; home page 82 |
| 11 | Direct links to project pages return a 404 status on GitHub Pages | **Not fixed** | Needs a different host or custom domain |
| 12 | Five projects have no case-study content (Coffee, Medical & Clinic, QR Scanner, Stock Trading, Telemedicine) | **Not fixed** | No film or notes exist; they show the Behance case study inside the page |
| 13 | No captions or transcripts for the videos | **Not fixed** | Needs transcripts |
| 14 | No measured results on any case study | **Not fixed** | Needs real analytics (see below) |

## Final audit as the buyer

**Would I trust this designer with a complex product?** Partly yes. The Oladoc case study shows real research (persona, journey map, six pain points each answered on screen), three user types and a design system, which is what complex products need. The rest of the portfolio shows strong visual craft and clear problem framing but no evidence of outcomes.

**Can I understand the value in five seconds?** Yes: the headline, the line under it, three proof figures (taken from LinkedIn) and an obvious email button are all on the first screen at 1440×900.

**Do the case studies demonstrate real problem-solving?** One does (Oladoc). The other nine show a clear problem, a design direction and the screens, but the research behind them is not documented, so a sceptical buyer will treat them as well-designed websites rather than evidence of strategy.

**Is the work visually impressive?** Yes. Real Figma screens in device frames for Oladoc, and polished film stills for the rest.

**Is there convincing evidence of expertise?** Moderate. Experience matches LinkedIn, and there are four Fiverr reviews and six LinkedIn credentials. There are no named client quotes tied to the projects shown.

**Is the website memorable?** Reasonably: the three-portals hero figure and the editorial look are distinctive. The memorable part is the Oladoc figure; the rest follows a clean but familiar structure.

**Can I contact the designer easily?** Yes: the email button is in the nav, hero, after the work, floating on scroll and in the contact section. There is no booking link, which some buyers prefer.

**What would still make me hesitate?**
1. No measured outcomes on any project.
2. Unclear whether each project was commissioned client work or self-initiated, and what the designer's exact role and team were.
3. No client names or quotes attached to projects.
4. Five projects with nothing but a Behance embed.
5. Five of the films are built from a mix of the designer's own screens and stock photography, which is disclosed in captions but weakens "real product" credibility.

## Missing evidence only the owner can supply

Highest value first.

1. **Measured results with a source** for at least two projects: what changed, by how much, over what period and how it was measured. The LinkedIn lines "+65% patient-intake completion (oladoc)" and "−50% first-session drop-off (Appsol360)" are shown on the homepage as quoted from LinkedIn; please confirm which product each belongs to and how it was measured so they can be attached to the right case study.
2. **A client or self-initiated statement and your exact role** for each project (solo or team, who you worked with, how long it took).
3. **Real testimonials** with name, role, company and a link (a LinkedIn recommendation is ideal). The six removed ones need a source before they can return.
4. **Awards:** proof, or confirmation that none should be listed. They were removed.
5. **Research artefacts** for the nine projects other than Oladoc: interview notes, usability findings, survey results, Maze reports.
6. **Before images** (old site screenshots) for Shumaila's, Mint, Goddard, Bond Vet, Victoria Road, Sehat Kahani and Zental, so the before/after slider can be used on more than Marham.
7. **A booking link** (Calendly, Cal.com) if you want one.
8. **Case-study material** for Coffee, Medical & Clinic, QR Scanner, Stock Trading and Telemedicine.
9. **Video transcripts** so captions can be added.
10. **A LinkedIn About section.** It is empty today; adding one would make the site and LinkedIn tell the same story.

## What was tested

See `04-QUALITY-AND-DEPLOY.md` for scores and methods.
