# 09 · Oladoc case study: the benchmark

Data: `src/data/oladoc-story.ts`. Components: `src/components/case/` (`Annotated`, `JourneyExplorer`, `DecisionRecords`, `TaskShowcase`, `OutcomesPanel`). Other case studies can adopt any block by adding the same fields to their entry; sections render only when data exists.

## What changed
| Area | Before | Now |
|---|---|---|
| Opening | Title, one line, small facts row, film | Title and one line beside a composition of real screens; six-cell overview (product, core problem, role, scope, users, reported result) readable in about 15 seconds |
| Problem | Four short cards | Four phases (choosing, booking, continuing, running the day), each with the documented pain; the persona scenario as the test every screen had to pass |
| Research | Six cards | Documented vs not documented, kept visibly apart; a journey explorer (feeling curve, what she does and thinks, pain point, design response, the screen); the full map one click away |
| Decisions | Tabbed explorer | Five decision records: problem, evidence, decision, intended benefit, verified outcome, plus a trade-off, beside an annotated screen with numbered callouts |
| Solution | Grid of screens | Tabs by user task: find a doctor, evaluate a provider, book, follow through, run the clinic day |
| Outcomes | "What it delivers" list | Four kinds of evidence kept apart (reported figure, documented findings, intended improvements, not in the project files) and a reflection |
| Navigation | Desktop rail only | Desktop rail plus a compact sticky section bar with progress on phones |
| Type | 14px captions | Body 18-19px, captions and callouts 16-18px |

## Evidence rules applied
- No interviews, usability tests, participant counts or analytics are claimed. They are listed as not documented.
- Every "verified outcome" reads "Not measured". The only figure is +65% patient-intake completion, labelled "self-reported on my LinkedIn", with a note that the method, sample and period are not documented.
- "Intended benefit" is always worded as intended.
- Trade-offs come from the information architecture board (five tabs, guided paths, "Profile and settings: not designed yet") or from what the screen visibly does.
- Doctor names, fees and counts on screen are design content, not live data, and the page says so.

## Needs your review (written by me from the documents, in your voice)
1. The three reflection paragraphs on the page (`outcomes.reflection`).
2. The "Where each skill shows up" cards (`signals`).
3. The trade-off wording on each decision.
4. Whether +65% belongs to Oladoc and how it was measured (your banner and LinkedIn both show it).

## Checks (24 Oct 2026, local production build)
Lighthouse desktop 99 / 100 / 100 / 100, mobile accessibility, best practices and SEO 100, contrast 0 failures, CLS 0. Mobile performance 77-85 across runs (was 93 before this page grew); LCP 4.4 s. Keyboard: arrow keys, Home and End work on the journey stages and the task tabs. No broken images, every image has alt text, no horizontal overflow at 390, 820 or 1440, reduced motion shows all content.
