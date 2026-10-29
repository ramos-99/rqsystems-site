---
version: 1
slug: "src-pages-index-astro"
primary_target: "src/pages/index.astro"
related_targets: ["src/pages/pt/index.astro"]
---

# Landing page (EN at /, PT-PT at /pt/)

Mode: Persuade. Audience: Portuguese SME owners and managers judging credibility in seconds. Action: contact (Contact us / contact@rqsystems.pt), reachable from every cue. Proof: the Outlook-to-Dropbox case study, 3 files per email and 1 click to archive; no other metrics. Copy is fixed in English; the PT-PT version is a faithful translation that the user requested, with a language switch in the nav.

Memorable moment: the page is a lit stage that runs from night to day as you scroll.

## Direction contract

THESIS: Midnight black, electric cobalt and rare acid lime. One real photograph (a processor held in tweezers) carries the hero, and one circuit trace leaves its pins and runs the whole page to the contact pill: automation as one signal from problem to contact. It refuses 3D props, glass, glows, flat colour slabs and dense copy.

OWN-WORLD:
- The field is night #020308 for the hero and How we work, then one electric #1f4bff moment for the proof, then day #f6f7fb for the founders and contact. Colours blend in OKLab across each section hand-off.
- Lime #c4ff1a is used on pills, the lit key phrase of each step, the case figures and the signal (cobalt #2a39c9 in day).
- Familjen Grotesk only. Full pills for actions, 1px hairlines, square circuit pads, no cards, no shadows.

STORY: The visitor reads the offer over the chip and follows the signal down. They learn what RQ does in three steps (map, build, run), each said plainly with its real technical terms. They see the case figures 3 and 1, meet the two founders, and arrive at the pill where the trace terminates.

FIRST VIEWPORT:
- The chip photo fills the right two-thirds, feathered into black on the left and the bottom.
- The headline sits left at up to 7.5rem, with "automated." in lime, then the lead and a lime Contact pill plus a How we work outline pill.
- As you leave the hero, the photo dissolves into a line drawing of itself (chip outline, die, tweezer legs) and the tweezers become the cable, which starts at the tip pinching the chip. It drops into the gap beside the How-we-work steps through an illustrated node (Lucide line icon) at each step, jogs back to the left bus at Featured work (mail node), and bends into the footer, becoming its rule.
- The bar holds the logo, EN/PT and a small lime pill.

FORM: user-pinned (photo-led midnight/cobalt/lime, hero A, the chip), extended by the user's circuit-trace idea.
- Signature interaction: the scroll-drawn trace with its lime signal head; a pad lights at each step and section, and the trace terminates in the contact pill. Step lines light word by word, and the field hands over between sections.
- Motion: CSS scroll-driven animations (written as longhands) plus one rAF path draw. No WebGL, no animation libraries, and all of it is off under reduced motion.
- seed: d8cdd680eaa3ef10 (superseded by user pin)

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
