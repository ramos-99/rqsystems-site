---
target: /type/ two-screen landing, other elements
total_score: 20
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 3
target_identity: "file:/home/ramos/dev/work/rqsystems-site/src/components/Typed.astro"
target_fingerprint: "sha256:8e247fa69ee146093c1439cd52cef95980eba88b7829cc77c2ec32b4688648f4"
target_path: /home/ramos/dev/work/rqsystems-site/src/components/Typed.astro
timestamp: 2026-10-29T22-30-59Z
slug: src-components-typed-astro
---
Method: dual-agent (A: design review · B: detector and browser evidence). Target: /type/ and /pt/type/ (src/components/Typed.astro and Work.astro).

## Design Health Score: 20/32 (63%, Acceptable). Heuristics 7 and 10 were scored n/a (landing page).
| # | Heuristic | Score | Key issue |
|---|---|---|---|
| 1 | Visibility | 3 | Nothing says what clicking the email button does |
| 2 | Real-world match | 3 | "Read by software" and "Trabalho anterior" read as jargon or a translation |
| 3 | Control | 3 | Mandatory snap fights partial trackpad scrolls |
| 4 | Consistency | 2 | "Previous work" is used twice; its label is hidden on phones; "students" vs "engineers" |
| 5 | Error prevention | 2 | One long word overflows the page on phones |
| 6 | Recognition | 2 | "Click the line", but no line is drawn; the hint is far from the headline |
| 7 | Flexibility | n/a | |
| 8 | Minimalism | 3 | The row under the headline has three equal items; lime is spread over six things on screen 2 |
| 9 | Error recovery | 2 | Email link only, with no copy-address fallback |
| 10 | Help | n/a | |

## Specificity
The headline is owned; the row under it and the screen-2 text block are generic agency patterns. Detector: source files are clean, and the built pages trip 30 rules each, about 20 of which are false positives from the demo app UI and the draft switcher. Real flags: the scan beam's glow and some off-scale text sizes. The overlay flagged only the oversized h1, with an inflated character count. Contrast passes everywhere and there are no console errors.

## Priority issues
- [P1] On phones, a 40-character typed word makes the slot 751px wide and the page scrolls sideways. Fix: overflow-wrap and max-width on the slot, plus shrink-to-fit for the clean type. Command: harden.
- [P1] The founders are 36px faces at the far right, about 1000px from "two students", with mismatched crops, no role line, and stacking at 1280. Fix: put them under the lead at 3–3.5rem, side by side, with an IST line. Command: layout.
- [P1] Screen 2 is a dead end with no CTA. Fix: add the email button (with the typed subject) under the facts. Command: layout.
- [P2] The editable headline can't be discovered: there is no visible line and the hint sits under the button. Fix: an idle baseline, and the hint "Type your own" under the headline. Command: clarify.
- [P2] On screen 2 the proof is the quietest text and lime is overspread; "Previous work" and "Trabalho anterior" are weak, and the PT phrasing is stiff. Fix: large lime numerals, a grey eyebrow, "A real project" / "Um caso real", and "Criámos um suplemento…". Command: typeset.

## Persona red flags
- Jordan: never finds the editable headline; "Read by software" is unexplained; the CTA is a bare email with no verb.
- Riley: the long word overflows; the mailto fails silently; snap fights half-scrolls.
- Casey: empty space above the headline; "Previous work" becomes an unlabelled arrow; screen 2 is 1,106px tall.
- PT SME owner: "o arquivo de e-mails" is ambiguous; "Lido por software" is jargon; the faces are too small; no sector is named.

## Minor observations
Meta description says "engenheiros" but the lead says "estudantes". The beam glow and card shadows brush against the "no glow" rule. The centred "Previous work" sets a stray axis. The reserved second line leaves an empty band under the headline. The title is just "RQ Systems". Footer and label sizes are off the scale. The PT "Filed" badge nearly collides with the subject.

## Questions
Should "Send us this task →" be the primary CTA? Should the faces sit next to the student line, as large as the button? Does screen 2 need its own text block?
