// The signal: one circuit trace leaves the hero chip's lower-left pins, runs
// beside each step's heading, jogs back to the page's left bus, passes a chip
// at every section, and terminates in the contact pill. Scroll draws it; each chip lights when the signal reaches it.
// Geometry is read from the layout (offsets, not transforms), so animated
// reveals never move the route.

const svg = document.querySelector<SVGSVGElement>('.trace')
const reduced = matchMedia('(prefers-reduced-motion: reduce)')

// The pin edge in the hero photo's own pixels (2000 × 1331): the middle of the
// chip's lower-left side. Mapped through object-fit: cover at 70% 50%.
const SRC = { w: 2000, h: 1331, x: 857, y: 667, posX: 0.7, posY: 0.5 }

if (svg) {
  const base = svg.querySelector<SVGPathElement>('.trace-base')!
  const lit = svg.querySelector<SVGPathElement>('.trace-lit')!
  const fibres = [...svg.querySelectorAll<SVGPathElement>('.trace-fibre')]
  const head = svg.querySelector<SVGCircleElement>('.trace-head')!
  const art = document.querySelector<HTMLElement>('.art')
  const nodes = [...document.querySelectorAll<HTMLElement>('[data-node]')]

  let total = 0
  let samples: { y: number; len: number; x: number }[] = []
  let marks: { el: HTMLElement; len: number }[] = []

  function offset(el: HTMLElement) {
    let x = 0
    let y = 0
    for (let e: HTMLElement | null = el; e; e = e.offsetParent as HTMLElement | null) {
      x += e.offsetLeft
      y += e.offsetTop
    }
    return { x, y, w: el.offsetWidth, h: el.offsetHeight }
  }

  function chipPin() {
    if (!art) return { x: 0, y: 0 }
    const a = offset(art)
    const s = Math.max(a.w / SRC.w, a.h / SRC.h)
    return {
      x: a.x + (a.w - SRC.w * s) * SRC.posX + SRC.x * s,
      y: a.y + (a.h - SRC.h * s) * SRC.posY + SRC.y * s,
    }
  }

  function pointOf(el: HTMLElement) {
    if (el.dataset.node === 'pin') return chipPin()
    const o = offset(el)
    if (el.dataset.node === 'end') return { x: o.x, y: o.y + o.h / 2 }
    return { x: o.x + o.w / 2, y: o.y + o.h / 2 }
  }

  // Circuit-board routing: straight runs joined by short 45° corners. A leg
  // that has to cross sideways does it on one horizontal run, runs[i], set
  // just inside the top of the section it enters, clear of any text.
  const R = 16
  function route(pts: { x: number; y: number }[], runs: number[]) {
    let d = `M${pts[0].x} ${pts[0].y}`
    for (let i = 1; i < pts.length; i++) {
      const a = pts[i - 1]
      const b = pts[i]
      const dx = b.x - a.x
      if (Math.abs(dx) < 1) {
        d += ` V${b.y}`
        continue
      }
      if (Math.abs(b.y - a.y) < 1) {
        d += ` H${b.x}`
        continue
      }
      const sx = Math.sign(dx)
      const y = Math.min(Math.max(runs[i], a.y + R), b.y - R)
      d += ` V${y - R} L${a.x + sx * R} ${y} H${b.x - sx * R} L${b.x} ${y + R} V${b.y}`
    }
    return d
  }

  function layout() {
    const w = document.documentElement.clientWidth
    const h = document.documentElement.scrollHeight
    svg!.setAttribute('viewBox', `0 0 ${w} ${h}`)
    svg!.style.height = `${h}px`
    const pts = nodes.map(pointOf)
    const runs = nodes.map((el) => {
      const section = el.closest('section')
      return section ? section.offsetTop + 48 : 0
    })
    // On a phone the chip sits above the copy, so the first crossing happens
    // straight away, above the headline.
    if (w < 640) runs[1] = pts[0].y + 24
    // The last leg runs level into the pill: arrive on its row, then turn.
    const end = pts[pts.length - 1]
    const pre = { x: pts[pts.length - 2].x, y: end.y }
    const d = route([...pts.slice(0, -1), pre, end], [...runs.slice(0, -1), 0, 0])
    for (const p of [base, lit, ...fibres]) p.setAttribute('d', d)
    total = lit.getTotalLength()
    lit.style.strokeDasharray = `${total}`

    samples = []
    for (let len = 0; len <= total; len += 10) {
      const p = lit.getPointAtLength(len)
      samples.push({ x: p.x, y: p.y, len })
    }

    marks = nodes.map((el, i) => {
      const p = pts[i]
      const s = samples.find((q) => Math.abs(q.y - p.y) < 6 && Math.abs(q.x - p.x) < 6) ?? samples[samples.length - 1]
      return { el, len: s.len }
    })
    draw()
  }

  function draw() {
    if (!samples.length) return
    let len = total
    if (!reduced.matches) {
      const y = scrollY + innerHeight * 0.62
      let i = 0
      while (i < samples.length - 1 && samples[i + 1].y <= y) i++
      len = samples[i].len
      head.setAttribute('transform', `translate(${samples[i].x} ${samples[i].y})`)
    }
    head.style.opacity = reduced.matches || len >= total - 1 ? '0' : '1'
    lit.style.strokeDashoffset = `${total - len}`
    for (const m of marks) m.el.classList.toggle('on', len >= m.len - 2)
  }

  let queued = false
  addEventListener(
    'scroll',
    () => {
      if (queued) return
      queued = true
      requestAnimationFrame(() => {
        queued = false
        draw()
      })
    },
    { passive: true },
  )
  new ResizeObserver(() => layout()).observe(document.body)
  document.fonts?.ready.then(layout)
  layout()
}
