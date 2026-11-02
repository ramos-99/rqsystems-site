---
name: RQ Systems
description: A lit stage that holds midnight, flares once into electric cobalt, and ends in day as you scroll, wired top to bottom by one cable that grows out of the hero photo, with acid lime kept rare.
colors:
  night: "#020308"
  electric: "#1f4bff"
  day: "#f6f7fb"
  lime: "#c4ff1a"
  lime-hover: "#d8ff5c"
  ink: "#04060f"
  fg-night: "#f3f5ff"
  fg-2-night: "#dde3ff"
  rule-night: "rgb(243 245 255 / 0.2)"
  fg-2-day: "#39405c"
  rule-day: "rgb(4 6 15 / 0.16)"
  accent-day: "#2a39c9"
typography:
  figure:
    fontFamily: "Familjen Grotesk Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(6rem, 17vw, 15rem)"
    fontWeight: 600
    lineHeight: 0.8
    letterSpacing: "-0.06em"
    fontFeature: "tnum"
  display:
    fontFamily: "Familjen Grotesk Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(3rem, 6.9vw, 7.5rem)"
    fontWeight: 600
    lineHeight: 0.9
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Familjen Grotesk Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 6vw, 5.5rem)"
    fontWeight: 600
    lineHeight: 0.95
    letterSpacing: "-0.04em"
  headline-pinned:
    fontFamily: "Familjen Grotesk Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 3.8vw, 3.75rem)"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-0.04em"
  cta:
    fontFamily: "Familjen Grotesk Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 5.6vw, 5rem)"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-0.04em"
  step-line:
    fontFamily: "Familjen Grotesk Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2rem, 4vw, 3.75rem)"
    fontWeight: 500
    lineHeight: 1.05
    letterSpacing: "-0.035em"
  title:
    fontFamily: "Familjen Grotesk Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.75rem, 3vw, 2.5rem)"
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: "-0.03em"
  body:
    fontFamily: "Familjen Grotesk Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.55
  lead:
    fontFamily: "Familjen Grotesk Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1rem, 1.25vw, 1.125rem)"
    fontWeight: 400
    lineHeight: 1.55
  button:
    fontFamily: "Familjen Grotesk Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 600
  label:
    fontFamily: "Familjen Grotesk Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
rounded:
  pill: "999px"
  portrait: "1.25rem"
  round: "50%"
spacing:
  gutter: "clamp(1.75rem, 4vw, 3.5rem)"
  section-top: "clamp(7rem, 18vh, 11rem)"
  section-bottom: "clamp(5rem, 14vh, 9rem)"
  section-gap: "clamp(3rem, 8vh, 6rem)"
  stack: "2rem"
  group: "1.25rem"
  inline: "0.75rem"
  target: "2.75rem"
  cable-bend: "24px"
  trace-jog: "48px"
components:
  pill-lime:
    backgroundColor: "{colors.lime}"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: "0 1.6rem"
    height: "3rem"
  pill-lime-hover:
    backgroundColor: "{colors.lime-hover}"
    textColor: "{colors.ink}"
  pill-line:
    backgroundColor: "transparent"
    textColor: "{colors.fg-night}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: "0 1.6rem"
    height: "3rem"
  pill-sm:
    rounded: "{rounded.pill}"
    padding: "0 1.15rem"
    height: "2.75rem"
  pill-lg:
    rounded: "{rounded.pill}"
    padding: "0 2rem"
    height: "3.75rem"
  lang-link:
    textColor: "{colors.fg-2-night}"
    typography: "{typography.label}"
    width: "2.75rem"
    height: "2.75rem"
  step:
    textColor: "{colors.fg-night}"
    typography: "{typography.step-line}"
    width: "20ch"
    height: "85svh"
  tag:
    textColor: "{colors.fg-2-night}"
    typography: "{typography.label}"
  node:
    size: "40px"
  node-step:
    size: "52px"
  node-mobile:
    size: "26px"
  portrait:
    rounded: "{rounded.portrait}"
  face:
    rounded: "{rounded.round}"
    size: "3.5rem"
---

# Design System: RQ Systems

## Overview

**Creative North Star: "Night Into Day"**

The page is a lit stage. One fixed colour field sits behind everything and carries the light: it holds midnight under the hero and How we work, flares once into electric cobalt for the proof in Featured work, and ends in daylight for Founders and Contact. Page surfaces are transparent so the field reads through every section. Nothing sits on a card. Depth comes from the field and from one real photograph, a processor held in tweezers, never from shadows or effects.

One cable wires the page together, and it starts as the photograph. As you leave the hero, the photo of the chip in tweezers dissolves into a line drawing of itself, and the tweezers become a cable. The cable runs through an illustrated node at every step and at Featured work, jogs back to the left bus, and ends as the footer's rule. Scroll lights it, and each node's icon draws itself when the signal reaches it. Automation reads as one signal running from the real thing to the drawing of how it works.

There is one typeface, Familjen Grotesk, set heavy and tight at display sizes and plain at reading sizes. Each section holds a single idea at large scale, with a lot of air around it, so the page reads quickly and never gets dense. Acid lime is the one loud note. It goes on the actions, the signal, and a small number of words and figures, and it stays rare so it keeps its charge.

Motion is slow and tied to scroll: the hero photo settles in once; the hero copy lifts away as you leave while the photo dissolves into its drawing; the cable lights itself; step lines light word by word as you read; blocks ease in as they enter. The colour field and the cable are the signature interactions. Everything else stays still enough that the site feels light and fast.

**Key Characteristics:**
- A single fixed scroll field of three colours (night, electric, day) across five sections is the only background; surfaces are transparent.
- One scroll-lit cable grows out of the hero photo's tweezers, passes an illustrated node at each step and at Featured work, and ends as the footer's rule.
- Ink flips from light to dark at the equal-contrast point of the electric-to-day blend, and the signal flips from lime to cobalt with it.
- Acid lime is reserved for pill fills, the signal, one key word or phrase, and the case figures.
- One face, Familjen Grotesk, at weight 600 with negative tracking for display, and 400 for reading.
- Every action ends in a round node on a short trace. There are no square buttons and no stock pills.
- Imagery is real photography of technology, graded into the palette.
- Hairline rules instead of cards. No shadows, glass, glow, or decorative gradients.

## Colors

Three grounds: midnight, one electric cobalt moment, and daylight, with one acid lime accent that has to earn each appearance.

### Primary
- **Acid Lime** (`lime`): Fill of every primary pill (bar Contact us, hero Contact us, the contact email pill), the one key word of the hero headline ("automated." / "automatizadas."), the one key phrase of each How we work step line, the two case figures, and the signal on night and electric grounds (the lit cable, its head and lit nodes). Hover lifts to **Lime Glare** (`lime-hover`). Text on lime is always **Ink** (17:1).

### Secondary
- **Electric Cobalt** (`electric`): Ground of Featured work only, the single saturated moment of the field. Lime figures sit on it at 5:1.
- **Day Accent** (`accent-day`): On light grounds, the focus ring and the signal colour (lit cable, head, lit nodes, the footer rule). On dark grounds the focus ring uses the primary text colour and the signal is lime.

### Neutral
- **Midnight** (`night`): Ground of the hero and How we work, page background and theme colour. The field starts here.
- **Daylight** (`day`): Ground of Founders and Contact, where the page ends.
- **Ink** (`ink`): Text on light grounds and on lime.
- **Starlight** (`fg-night`) / **Mist** (`fg-2-night`): Primary and secondary text on dark grounds. Mist carries leads, step bodies and tags.
- **Slate** (`fg-2-day`): Secondary text on light grounds.
- **Hairlines** (`rule-night`, `rule-day`): Rules, outline-pill borders, underline colour, the portrait outline, the unlit cable and node rings.

### The scroll field

Five sections share three colours on one fixed full-viewport layer, in section order: night (hero), night (How we work), electric (Featured work), day (Founders), day (Contact). The script measures against the viewport:

- The field hands over from one section's colour to the next across the **whole time the next section climbs the screen**, from its top touching the bottom edge to its top reaching the top edge.
- The handover is eased with smoothstep (`t * t * (3 - 2t)`) and mixed in **OKLab** with `color-mix(in oklab, ...)`.
- Equal neighbours (night to night, day to day) hold; the only visible handovers are night to electric and electric to day.
- The bar is transparent at the very top. After 8px of scroll it takes the field's current colour, so it never floats over a mismatched band.
- Under reduced motion there is no blend: the field snaps to the nearer stop.

### Named Rules

**The One Field Rule.** The colour field is the only background. Sections, bars and blocks stay transparent. A new section adds a stop to the field. It never gets a painted panel.

**The Ink Flip Rule.** Ink flips from light (`fg-night`) to dark (`ink`) when the field position reaches 2.21, where both inks have equal contrast (about 4.3:1) on the OKLab electric-to-day blend. The flip toggles a day class on the root, which swaps text, secondary text, rules, accent, and signal together, and colour eases over 0.6s. When the field colours change, move the flip to the new contrast crossover.

**The Rare Lime Rule.** Lime is used for pill fills, the signal, the one key word of a headline, the one key phrase of a step line, and the hero numbers of proof, and nowhere else. Use one lime word or phrase per headline or step line at most. Lime text and lime strokes only go on night or electric grounds (5:1 or better). On day grounds lime is a pill fill with ink text only, because lime there measures 1.1:1; the signal turns Day Accent.

## Typography

**Display Font:** Familjen Grotesk Variable (with ui-sans-serif, system-ui, sans-serif)
**Body Font:** Familjen Grotesk Variable
**Label Font:** Familjen Grotesk Variable

**Character:** One grotesk with a slight ink-trap edge. It is compressed and confident at 600 with tight negative tracking at display sizes, and calm and open at reading sizes. The pairing is weight and size, never a second family.

### Hierarchy
- **Figure** (600, clamp 6–15rem, 0.8, -0.06em, tabular numerals): The case proof numbers only, in lime.
- **Display** (600, clamp 3–7.5rem, 0.9, -0.04em): The hero headline, broken into two lines, with the second line in lime.
- **Headline** (600, clamp 2.5–5.5rem, 0.95, -0.04em): Section titles.
- **Headline, pinned** (600, clamp 2.25–3.75rem, 1, -0.04em): The How we work title, which stays pinned beside the steps on desktop and so runs smaller, with a Lead line under it (max 26ch).
- **CTA** (600, clamp 2.25–5rem, 1, -0.04em, max 16ch): The closing invitation in the contact section.
- **Step line** (500, clamp 2–3.75rem, 1.05, -0.035em, max 20ch): The h3 of each How we work step, lit word by word.
- **Title** (600, clamp 1.75–2.5rem, 1.05, -0.03em): The case-study name.
- **Body** (400, 1.0625rem, 1.55): Running copy, in secondary text, with a measure of roughly 30–36rem.
- **Lead** (400, clamp 1–1.125rem, 1.55): The hero lead (max 30rem), the How we work lead, and the one body sentence under each step line (max 46ch).
- **Button** (600, 0.9375rem): Pill labels. The large pill scales to clamp(1.0625rem, 1.8vw, 1.375rem) and the small pill uses 0.875rem.
- **Label** (500, 0.875rem): The EN/PT switch, the hero foot line, step tags and the footer.

### Named Rules

**The One Face Rule.** Familjen Grotesk is the only family. Build hierarchy from size, weight (400/500/600) and tracking. Text is balanced at headline sizes and pretty-wrapped in paragraphs.

**The Tight Display Rule.** Headings and figures at 1.75rem or larger are set at weight 600 with a line height of 1.05 or less and negative tracking that grows with size (-0.03em to -0.06em). The Step line is the one exception at weight 500 (1.05, -0.035em), because it is read as a sentence rather than scanned.

## Layout

Single column, full-bleed sections, with one gutter (`gutter`) on both edges for the bar and the content. The left gutter doubles as the cable's bus: nodes and the vertical runs sit at its centre. Every section is at least one viewport tall (100svh), with section padding `section-top` / `section-bottom`, and its content centred vertically. Within a section, blocks are spaced with `section-gap`.

- **How we work:** at 64rem and up the section splits 1fr / 1.6fr with a 3rem column gap, and the title and lead are sticky (7rem from the top) beside the steps. Each step gets its own screen (85svh), centred vertically: step line, one body sentence, then a wrapping row of tags. Below 64rem the head sits above the steps and scrolls normally.
- **Featured work and Founders:** stacked below 64rem. At 64rem and up they split into two columns at 1fr / 1.1fr. The figures are always a 2-up grid, and the two portraits always sit side by side.
- **Hero:** the copy (max 62rem) is on the left. The photo occupies the right two-thirds and is feathered into the field on two edges by two intersected masks: from the left (transparent to black by 42%) and from the bottom (transparent to black by 28%). Below 40rem the photo moves to the top, feathers downward, the copy sits at the bottom, and the actions stack full-width.
- **Cable route:** the cable starts at the tweezer tip that pinches the chip's lower corner, computed from the photo's source pixels through its cover crop, and drops straight down between the drawn legs. On desktop it runs in the step column gap (5rem) through each step's node, then jogs back to the left bus for Featured work and Founders, comes down the bus and bends into the footer's top edge, running as its rule to the right gutter. Every sideways jog happens on one horizontal run `trace-jog` (48px) inside the top of the section it enters, clear of text, with 24px round bends (`cable-bend`); on phones the first jog happens right under the tweezers, above the headline.
- **Breakpoints:** 40rem (mobile) and 64rem (two-column).
- Every interactive target is at least `target` (2.75rem) in both dimensions, including the EN/PT links.

## Elevation & Depth

The system is flat. No element casts a shadow. Depth comes from two sources only: the scroll field's changing light, and the graded photograph with its masked feather. Separation comes from hairline rules (1px, `rule-*`), never from raised surfaces. The trace sits on a layer above the content and never takes pointer events.

**The No-Lift Rule.** Don't use box-shadow, glass, backdrop blur, glow or decorative gradients. The only gradient allowed is a mask that feathers a photograph into the field.

### Imagery grading

All imagery is real photography of technology, or the founders themselves, graded into the palette. Each raster ships with a provenance JSON next to it.

- **Hero grade (cobalt and lime):** map luminance to a midnight-to-cobalt ramp (`#020308`, `#06103a`, `#1534d6`, `#3d6bff`, `#d7e2ff`), and map warm and green pixels to an acid-lime ramp. Serve it as WebP at 1100w and 2000w with `srcset`, preload it, and give it `fetchpriority="high"`.
- **Portraits:** full colour, square 480×480 at a matched head scale, with the background removed where possible (WebP with alpha on the day colour `#f6f7fb`). Lazy-loaded.
- **Motion:** the hero photo settles in once from scale 1.08 with a fade over 2.4s, and then holds still. It does not follow the pointer, breathe or swell; the chip stays put so its drawing lands exactly on it.

## Shapes

The geometry is round against square. Actions end in round nodes. Founder portraits and contact faces are circles with a 1px hairline. Nodes are rings, and the cable turns every corner with a 24px round bend (`cable-bend`). Tag bullets are 5px squares. Everything else is straight: 1px hairline rules above figures and the hero foot; the footer rule is the cable itself.

## Components

### Buttons (wired nodes)
Buttons speak the cable's language instead of being stock pills: the label (600) runs along a short 1.5px trace into a round node holding a Lucide glyph (arrow-right, arrow-down, copy, check).
- **Primary (lime):** the node is filled lime with an ink glyph. Hover goes to lime-hover.
- **Secondary (line):** the node is a hairline ring that lights in the signal colour on hover.
- **Hover:** the signal runs down the trace (a background-position sweep, 0.3s, `ease`), then the node lights after a 0.1s delay and the glyph nudges 2px in its direction. Hover motion is gated to fine pointers.
- **Sizes:** small node 2.75rem with a 0.9rem trace (bar), default 3rem with 1.75rem, large 3.75rem with 2.5rem (contact email). The node sets the hit height.
- **Phone:** the bar button is just its node; its label stays for screen readers.
- **Focus:** a 2px outline in the accent colour, offset 4px.
- **Copy fallback:** a line button beside the email copies the address, swaps its label and its glyph to a check, and lights its node for 1.8s.

### Navigation
- **Bar:** fixed at the top, holding the logo mark plus "Systems" at 600 on the left, and the EN/PT links and a small lime pill on the right. The logo is inverted on dark grounds. Language links are Mist at rest and turn to the primary text colour on hover or when current.
- **Footer:** label-size links in secondary text. Above 64rem it sits under a hairline as two columns.

### The cable (signature)
One SVG layer the height of the page, hidden from assistive technology.
- **Sketch:** the line drawing the hero photo dissolves into. The chip's outline, its die (0.38 of the chip, about its centre), a pin-1 mark at the lower corner, and the two tweezer legs, all mapped from the photo's source pixels through its cover crop. Strokes are 1.25px in the primary text colour at 0.7; the legs fade to nothing down their length and stop 88px above the hero foot (72px above the headline on phones).
- **Dissolve:** over the first half of the hero's height, the photo's opacity falls from 1 to 0 while the sketch draws in by dash offset, on a smoothstep curve.
- **Strokes:** an unlit base in hairline colour (1.5px); the lit stroke in the signal colour (2px) with a soft glow (7px at 0.22) under it, revealed by dash offset. Caps and joins are round.
- **Head:** a 12px radial pulse (near-white core, signal colour, fading out) rides the end of the lit stroke. It hides once the cable is lit to the end, and a 3.5px terminal dot appears at the right end of the footer rule.
- **Drawing:** the reading line sits at 62% of the screen and slides to the bottom edge over the last screen of scroll. The lit length eases towards it (16% of the gap per frame), so jogs and fast scrolls travel instead of jumping. The footer rule is level, so it draws out across the last stretch of the page. Geometry is read from layout offsets, not transforms; it re-routes on resize and once fonts load.
- **Signal colour:** lime on dark grounds, Day Accent on light, easing over 0.6s with the ink flip.
- **Reduced motion:** the photo stays and the sketch is not drawn; the cable is lit in full, the head is hidden, and every node is lit.

### Nodes
A ringed terminal on the cable holding a Lucide line icon (ISC licence, vendored in `src/icons/`): mouse-pointer-click, cpu and wrench for the three steps, mail for Featured work. 52px with a 26px icon in the desktop step gap; 40px with a 20px icon on the left bus; 26px with a 14px icon under 40rem. The body takes the field's current colour so the cable passes beneath, with a 1.5px inset hairline ring. The icon sits dim (primary text at 0.3). When the signal reaches it, the ring takes the signal colour and a signal-coloured copy of the icon draws itself over 0.9s (`ease`).

### Steps (How we work)
Three steps, one per 85svh screen. Each step line is an h3 split into word spans that light from opacity 0.16 to 1 as they move up the screen (CSS `view()` timeline, range entry 100% to cover 50%). The phrase marked `[[...]]` in the copy is lit in lime. The word spans are hidden from assistive technology; a visually hidden plain-text copy of the line carries the meaning. Under it sit one body sentence in Lead size and a tags list of the real technical terms, in Label size, each led by a 5px square bullet. Without scroll-timeline support or under reduced motion every word is simply fully lit.

### Founder portraits
Kept from the pre-revamp site at the user's request. Two circular colour portraits (clamp 8rem to 12rem, 7.5rem on a phone) on the day colour with a 1px hairline, side by side. Under each, the first name sits small in `fg-2` and the surname sits large, with its initial in full `fg` at 1.35× and the rest at 55%. The initials spell R and Q, and "Systems" follows in spaced capitals (0.875rem, 1em tracking), so the pair reads as the mark. The surname is the LinkedIn link and goes to full `fg` on hover. The same photos appear again as 3.5rem circles in the contact section.

### Case figures
A hairline, then the lime number at Figure size, then the label in secondary text below it. Figures are always shown in pairs and only with real numbers.

### Motion and reduced motion

- **Easing:** one curve for everything, `cubic-bezier(0.16, 1, 0.3, 1)`.
- **Load:** hero text rises 18px over 1.2s, staggered by 0.12s; the photo settles from scale 1.08 over 2.4s.
- **Reveal:** blocks rise 28px with a fade, driven by CSS scroll-driven animation (`view()` timeline, entry 0–70%).
- **Hero exit:** a named view timeline (`--hero`) on the hero lifts the copy and the foot 6vh and fades them (exit 35–95%). The photo stays.
- **Word light:** each step-line word goes from opacity 0.16 to 1 over entry 100% to cover 50%.
- **Cable:** the hero photo dissolves into its sketch over the first half of the hero; the cable is lit by scroll and eased per frame; node icons draw over 0.9s.
- **Field:** the colour updates on scroll, throttled by requestAnimationFrame. Ink and signal colour ease over 0.6s.
- All scroll-driven CSS animation runs only inside `@supports (animation-timeline: view())` and `prefers-reduced-motion: no-preference`. Otherwise everything is simply visible.
- **Reduced motion:** smooth scrolling is off, there is no reveal, hero exit or word light, the photo has no settle, text does not rise, the photo does not dissolve, the cable is lit in full, and the field snaps between stops instead of blending.

**The Longhand Rule.** Write every scroll-driven animation as longhands (`animation-name`, `animation-timing-function`, `animation-fill-mode`, `animation-timeline`, `animation-range`), never the `animation` shorthand. The CSS minifier otherwise folds `animation-timeline` into the shorthand, which browsers reject, and the animation silently does nothing.

**The Split Transform Rule.** One element, one owner per transform channel. The scroll lift writes the individual `translate` property on the hero copy wrapper, the load rise writes `transform` on its children, and the settle owns the inner photo's `transform`, so no animation overwrites another. A new animation on an element that already moves takes a channel nobody else writes.
- No WebGL, no animation library, and no CSS framework: a minimal reset lives in the global stylesheet.

## Do's and Don'ts

### Do:
- **Do** put every background change on the single scroll field, as a new stop in section order.
- **Do** flip the ink at the contrast crossover of the blend (currently position 2.21).
- **Do** wire every action to a node: a lime node for the primary, a hairline ring for the secondary.
- **Do** limit lime to pill fills, the signal, one key headline word or step phrase, and proof figures. Use lime text and strokes only on night or electric grounds.
- **Do** set display type in Familjen Grotesk 600 with tight negative tracking, and give each section one idea at large scale.
- **Do** use real photography of technology, graded with the cobalt and lime ramps, and show people in full colour, cut out from their backgrounds.
- **Do** route a new section onto the cable through a node (a Lucide line icon) or a waypoint on the left bus, and jog sideways only inside the top of the section entered.
- **Do** keep every target at least 2.75rem, and turn off all decorative motion under reduced motion.
- **Do** write scroll-driven animations as longhands, and give each transform channel one owner.

### Don't:
- **Don't** bring back procedural 3D props or stages (rejected by the user).
- **Don't** put photographed objects on the cable. The user rejected photo chips and a photo footer (2026-10-29); along the page everything is line illustration, and the only photograph is the hero, which dissolves into its own drawing.
- **Don't** use glass, glow or blur effects, the "typical AI look" (rejected by the user).
- **Don't** use flower or other non-tech imagery (rejected by the user).
- **Don't** use square or square-cornered buttons (rejected by the user).
- **Don't** set dense text. One idea per screen (rejected by the user).
- **Don't** add heavy animation, WebGL, or an animation library. The site stays light and fast (user requirement).
- **Don't** paint section backgrounds, cards or shadows. Surfaces stay transparent over the field; the nodes are the only filled shapes, and they belong to the cable.
- **Don't** add a second typeface or set lime text on day grounds.
- **Don't** invent figures. A lime number has to be a real one.
