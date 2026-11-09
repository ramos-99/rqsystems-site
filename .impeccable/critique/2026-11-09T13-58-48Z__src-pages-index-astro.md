---
target: final review of the landing page (PT / and EN /en/)
total_score: 24
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 2
target_identity: "file:/home/ramos/dev/work/rqsystems-site/src/pages/index.astro"
target_fingerprint: "sha256:c8d570aa53a0afeca4f41c560c17c13d84a976b68caf8a6f47b018289abc96b9"
target_path: /home/ramos/dev/work/rqsystems-site/src/pages/index.astro
timestamp: 2026-11-09T13-58-48Z
slug: src-pages-index-astro
---
Method: dual-agent (A: design review · B: detector + browser + Lighthouse)

## Design Health Score
| # | Heuristic | Score | Key Issue |
|---|---|---|---|
| 1 | Visibility of System Status | 3 | Copy button gives feedback; language marked |
| 2 | Match System / Real World | 3 | Formal PT-PT; macOS window dots around Outlook; "contact@" on PT site |
| 3 | User Control and Freedom | 3 | mailto only, copy as fallback |
| 4 | Consistency and Standards | 3 | EN page anchors to #servicos |
| 5 | Error Prevention | 3 | Copy button covers no-mail-client case |
| 6 | Recognition Rather Than Recall | 4 | Short, all visible |
| 7 | Flexibility and Efficiency | n/a | One-page pitch |
| 8 | Aesthetic and Minimalist Design | 3 | Hero contact block redundant; services formulaic |
| 9 | Error Recovery | 2 | mailto with no handler fails silently |
| 10 | Help and Documentation | n/a | One-page pitch |
| **Total** | | **24/32** | **Good** |

## Design Specificity
Competent and restrained, but the frame (grey desk, white sheet, cobalt pill, tracked eyebrow, ruled columns, macOS mock chrome) is category-generic. What is specific and persuasive: the two real faces, the named and linked Alphalink, the construction folder names. Detector: 36 advisory design-system findings (font-size 19, color 11, radius 6), mostly the aria-hidden mock chrome in work.css (false positives) plus real token drift in light.css. Overlay: no anti-patterns on / or /en/.

## Priority Issues
- [P1] Mobile ≤360px: in the Outlook mock, .fm-filed overlaps the sender name and the "Guardar na Dropbox" label wraps out of its pill (work.css:38, :56).
- [P1] Founder photos don't match (night-city selfie vs pale studio); they read as two found photos, not one firm.
- [P2] No institutional identity: no legal name, NIF or phone in the footer; formal PT buyers check these.
- [P2] "Only client" reading: still one case and an unbacked "em todas as áreas da empresa". Strongest real fix: an attributed quote from Alphalink.
- [P2] Services: the four areas share one "…, sem X" formula; generic.

## Persona Red Flags
- Owner of a construction SME, 55: reads "Mestrandos" before any proof; looks for NIF/phone, finds none; Alphalink as a sector peer is persuasive but two scrolls down.
- First-timer: no idea what happens after the email.
- Mobile: faces become 52px circles; mock overlap at ≤360px.

## Minor Observations
- EN page uses #servicos anchor.
- Footer email link tap target 20px tall.
- public/founders/*.webp.json (generation metadata) ship publicly.
- _redirects could add /pt/* .
- --dim grey text at 4.66:1, passes AA narrowly.
- ~120px empty space inside the Outlook mock on desktop.
- PRODUCT.md and the surface brief are stale (EN at /, client unnamed, no hours metrics).

Lighthouse: Accessibility 100, Best Practices 100, SEO 92 (only failure is the Astro dev toolbar link, absent in production). Headings, lang, focus, landmarks, contrast all pass. No horizontal overflow 320–1440.

## Questions to Consider
- Should "Mestrandos" be the first fact an owner reads, or come after proof and a NIF?
- If the case is the only evidence, does the four-area section earn its place?
