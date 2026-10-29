---
target: RQ Systems landing page
total_score: 21
max_score: 32
na_heuristics: 7,10
p0_count: 1
p1_count: 2
target_identity: "file:/home/ramos/dev/work/rqsystems-site/src/components/Page.astro"
target_fingerprint: "sha256:7e99f0104205fc0c2c2edc7aa8e9697c2398929635c47e5d7fc8d9419c7529be"
target_path: /home/ramos/dev/work/rqsystems-site/src/components/Page.astro
timestamp: 2026-10-28T21-46-12Z
slug: src-components-page-astro
---
# Critique: RQ Systems landing page (EN / and PT /pt/)
Method: dual-agent (A: design review, B: detector + browser evidence)

## Design health score
| # | Heuristic | Score | Key issue |
|---|---|---|---|
| 1 | Visibility of system status | 3 | The cue readout tracks position but describes the stage, not the content |
| 2 | Match system / real world | 2 | Cue/Deixa theatre jargon; "3x" reads as a multiplier |
| 3 | User control and freedom | 3 | A reload can land on the blank contact screen |
| 4 | Consistency and standards | 2 | Heading casing, the bar seam in cobalt, portraits treated differently |
| 5 | Error prevention | 3 | Email-only contact fails silently |
| 6 | Recognition rather than recall | 3 | No visible cue labels on mobile |
| 7 | Flexibility and efficiency | n/a | One-page marketing site |
| 8 | Aesthetic and minimalist design | 3 | Premium, undercut by collisions and an empty ending |
| 9 | Error recovery | 2 | Text over props is unreadable |
| 10 | Help and documentation | n/a | Marketing page |
| Total | | 21/32 | Acceptable (66%) |

## Design specificity
The stage (envelope, PDF and folder from the real case study, the night-to-day arc) is specific to RQ. The layer on top (centred hero, two-column split, stats panel, email-link footer) is template-generic. The detector is clean: 0 findings with config applied; without config, only the intentional tight-leading on the h1. The overlay ran in a [Human] tab and reported "No anti-patterns found" on EN and PT.

## Priority issues
- [P0] 3D props collide with text in cues 01-03: the hero last line, "Outlook · Dropbox" at about 1.3:1, the case-study last line, the mobile "What we build" and stats rows. Fix: start the camera tilt from cue 01, lower the props in the hero, align the stats panel to the top. (/impeccable layout)
- [P1] Body text on the horizon band fails AA: cobalt 3.3-3.5:1, rose 3.8-3.9:1. Fix in the lighting (bandI/bandW in CUES[1-2]) and darken the day secondary ink. (/impeccable colorize)
- [P1] The ending is empty and fragile: the stage vanishes at Day, email-only action, 9-link footer with a self-referencing Contact. Fix: keep the lit stage at day, small founder portraits beside the CTA, a Copy button beside the email, drop the self link. (/impeccable bolder)
- [P2] Props read as flat cutouts and the stage never tells the case study. Fix: rim light, deeper extrusions, satin sheen; light envelope, then PDF, then folder in sequence in cue 03. (/impeccable overdrive)
- [P2] The cue readout is designer jargon. Fix: show section names, keep the light names as an inner layer. (/impeccable clarify)

## Persona red flags
- Jordan: "Cue 01 · Night" reads as a debug label; "What we build" vs "Featured work" unclear; founders arrive late (4th of 5).
- Riley: a reload lands on the blank contact screen; PT copy pushes the hero into the PDF; mailto has no fallback; resizing makes the overlap unpredictable.
- Casey: text over props in the build and stats rows; tap targets under 44px (footer 30, LinkedIn 26, lang 33, ticks 24); the "Featured work" button wraps alone; 600px of empty space at contact.
- PT SME owner: "Deixa · Noite" is obscure; no reassurance at "Fale connosco"; the Outlook · Dropbox label is hidden.

## Minor observations
- The RQ mark doesn't read at 28px.
- No solid CTA in view after the hero.
- Bar colour seam in the cobalt cue.
- Portraits mismatched (multiply blend).
- Commit Mono used outside cue numerals.
- aria-label "Footer" is English on the PT page.
- "Featured Work" vs "What we build" casing (copy change needs approval).

## Questions to consider
- Why doesn't the stage light envelope, then PDF, then folder?
- Why is daylight the emptiest screen?
- Is the cue readout for the visitor or the designer?
