// Scroll position becomes the page's light: one fixed colour field blends from
// midnight through cobalt into day as each section takes the screen, and the
// ink flips with it.

const root = document.documentElement
const field = document.querySelector<HTMLElement>('.field')
const bar = document.querySelector<HTMLElement>('.bar')
const sections = [...document.querySelectorAll<HTMLElement>('[data-cue]')]
const reduced = matchMedia('(prefers-reduced-motion: reduce)')

// One colour per section: night for the hero and the work, a single electric
// cobalt moment for the proof, then day for the people and the contact.
const COLOURS = ['2 3 8', '2 3 8', '31 75 255', '246 247 251', '246 247 251']
// Where light and dark ink have equal contrast on the cobalt-to-day blend.
const DAY_FROM = 2.21

let tops: number[] = []
function measure() {
  tops = sections.map((s) => s.offsetTop)
}

// The field hands over from one section's colour to the next across the whole
// time the next section climbs the screen, from the bottom edge to the top.
function cueAt(y: number) {
  const bottom = y + innerHeight
  let j = 0
  while (j < sections.length - 1 && tops[j + 1] < bottom) j++
  if (j === 0) return 0
  const f = Math.min(1, Math.max(0, (bottom - tops[j]) / innerHeight))
  return j - 1 + (reduced.matches ? Math.round(f) : f)
}

const smooth = (t: number) => t * t * (3 - 2 * t)
function colourAt(p: number) {
  const i = Math.min(COLOURS.length - 2, Math.floor(p))
  const t = Math.round(smooth(p - i) * 1000) / 10
  return `color-mix(in oklab, rgb(${COLOURS[i]}), rgb(${COLOURS[i + 1]}) ${t}%)`
}

function update() {
  const p = cueAt(scrollY)
  const c = colourAt(p)
  field?.style.setProperty('background-color', c)
  // Nodes on the cable sit on the field's colour so the cable passes beneath.
  root.style.setProperty('--field', c)
  bar?.style.setProperty('background-color', scrollY > 8 ? c : 'transparent')
  root.classList.toggle('is-day', p >= DAY_FROM)
}

let queued = false
addEventListener(
  'scroll',
  () => {
    if (queued) return
    queued = true
    requestAnimationFrame(() => {
      queued = false
      update()
    })
  },
  { passive: true },
)
new ResizeObserver(() => {
  measure()
  update()
}).observe(document.body)
measure()
update()


// Copy the address for anyone whose mailto link opens nothing.
for (const b of document.querySelectorAll<HTMLButtonElement>('[data-copy]')) {
  const text = b.querySelector('span')!
  const label = text.textContent
  b.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(b.dataset.copy!)
      text.textContent = b.dataset.copied ?? label
      b.classList.add('is-done')
      setTimeout(() => {
        text.textContent = label
        b.classList.remove('is-done')
      }, 1800)
    } catch {
      getSelection()?.selectAllChildren(b.previousElementSibling!)
    }
  })
}
