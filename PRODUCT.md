# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Owners and managers of Portuguese SMEs. Many aren't technical, and their teams lose hours every week to manual admin like email handling, filing and moving data between tools. They land on the site to judge, quickly, whether RQ Systems is credible enough to contact.

## Product Purpose

RQ Systems is a B2B automation agency. It finds the work that is still manual in an SME's operations and builds tailored software (automations, pipelines, integrations) to replace it. The site is a single-page marketing site with one job: make a strong first impression and get the visitor to make contact (contact@rqsystems.pt). Success means an inbound conversation.

## Positioning

The differentiators below are all true. Each surface leads with whichever one it needs:

- **Discovery-first:** RQ finds what is manual before proposing anything, so the client doesn't need to know what to ask for.
- **Fits existing tools:** no migration. RQ builds into what the client already uses (Outlook, Dropbox and the like).
- **Ongoing partnership:** RQ stays involved after delivery and keeps iterating.
- **Small and direct:** clients talk to the two engineers who build the software. There are no account managers, and it costs less than an agency.

## Operating Context

Visitors are evaluating, not operating anything. They arrive cold or by referral, scan the page and decide whether to get in touch. Contact goes through email and the founders' LinkedIn profiles. The company is based in Lisbon, Portugal.

## Capabilities and Constraints

- The existing codebase sets the stack: Astro, React islands, Tailwind 4 and Three.js (r3f).
- The site is a single landing page with these sections: hero, What we build, Featured work (case study) and a contact/founders footer.
- **The copy stays as written unless the user asks for a change.** Redesigns change the presentation, not the words.
- On 2026-10-29 the user asked for the "What we build" section to be rewritten. It is now "How we automate your operations": three steps (map, build, run), reviewed for SEO and truthfulness, plus new meta descriptions. Later the same day the user asked for no em dashes and no "AI tone" anywhere. Both languages were rewritten in plain, concrete sentences: no triplets, no "No X, no Y" slogans, no "without ever". The hero is now "We automate the manual work." / "Automatizamos o trabalho manual."
- The site ships in English (`/`) and European Portuguese (`/pt/`), with an EN/PT switch. The Portuguese must be natural European Portuguese (pt-PT), never a literal calque of the English: on 2026-10-29 the user rejected "As suas operações, automatizadas" for that reason. The PT hero now reads "Automatizamos o trabalho manual.", and it uses pt-PT forms such as "e-mail".

## Brand Commitments

- Name: RQ Systems. The vector RQ mark is at `public/logo.svg`.
- Founders: Martim Ramos and Afonso Quintas, Computer Science and Engineering students at Instituto Superior Técnico. Their student status is part of the story and should not be hidden.
- The user's binding direction for the site: clean, premium, memorable, with a wow factor, and never cluttered or generic.
- Palette pinned by the user (2026-10-29): midnight black, electric cobalt blue, acid lime. Lime is used sparingly.
- Rejected by the user, do not bring back: procedural 3D props or stages, glass and glow effects ("typical AI look"), flower or other non-tech imagery, square buttons, and dense text. Imagery must be real photography of technology, and the site must stay light and fast with no heavy animation.
- Kept by the user's request: the smooth scroll-driven colour change that ends in whiter colours.
- Approved by the user (2026-10-29): a cable that glows as it lights up with scroll, running through the page and ending in the footer. It grows out of the hero photo: the tweezers holding the chip become the cable as the photo dissolves into a line drawing of itself ("photorealistic to illustration"). Along the page, everything is clean line illustration from downloaded icon sets (Lucide). The user rejected photographed chips and a photographed wire-bundle footer on the line.

## Evidence on Hand

- One case study, the Outlook-to-Dropbox add-in (details from the project README the user shared on 2026-11-02):
  - The user opens an email, clicks the add-in, and picks the project, the document type and the entity. The add-in files the `.eml`, a generated PDF of the email and all attachments into the right Dropbox project folder. Folders are named by date (YYMMDD), marked as sent (ENV) or received (REC), and created when missing.
  - For invoices, an AI model (Claude) reads the attached PDF and extracts the invoice number, total, payment deadline, withholding, reverse charge and a PT/EN work description. The pane returns a reply text ready to copy.
  - For adjudications, it generates the Word letter from the extracted proposal reference, amount and description, converts it to PDF and merges it with the proposal.
  - The user always chooses the document type; the AI only extracts fields and never decides where anything is filed.
  - The real stats are **3 files per email** (for plain filing) and **1 click to archive**.
  - The README names the client; keep it unnamed on the site until the user confirms it can be named.
- Founder portraits: originals in `assets/`, shipped in full colour with the background removed (the user's request, 2026-10-29) in `public/founders/`.
- There are no testimonials, client logos, press coverage, hours-saved figures or ROI figures. **Never invent metrics** or other proof.
- The user has not said whether the case-study client can be named. Keep it unnamed until they confirm.

## Product Principles

1. **The first impression is the pitch.** The opening viewport has to earn trust and make the visitor curious before they read anything.
2. **Speak to the problem, not the technology.** Owners buy back their hours. They aren't buying integrations.
3. **Show real proof.** One true case study beats any number of claims.
4. **Make contact easy.** Contacting RQ should take very little effort from anywhere on the page.
5. **Show the people.** Two named engineers are an asset, not a weakness to hide.
