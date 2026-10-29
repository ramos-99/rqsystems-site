// The signal: the hero photograph dissolves into a line drawing of itself as
// you leave it, and the tweezers that hold the chip become a cable. The cable
// runs through an illustrated node at every step, jogs back to the page's
// left bus and becomes the footer's rule. Scroll lights it; each node draws
// itself when the signal reaches it.
// Geometry is read from the layout (offsets, not transforms), so animated
// reveals never move the route.

const svg = document.querySelector<SVGSVGElement>('.trace')
const reduced = matchMedia('(prefers-reduced-motion: reduce)')

// The hero photo's own pixels (2000 × 1331), mapped through object-fit: cover
// at 70% 50%: the chip's four corners, and the tweezers, whose tip pinches
// the chip's lower corner and whose legs run down out of frame.
const SRC = { w: 2000, h: 1331, posX: 0.7, posY: 0.5 }
const CHIP = [[1010, 244], [1300, 548], [990, 820], [710, 518]]
const TIP = [995, 822]
const LEGS = [[[962, 822], [940, 1331]], [[1022, 822], [1056, 1331]]]

if (svg) {
  const base = svg.querySelector<SVGPathElement>('.trace-base')!
  const lit = [...svg.querySelectorAll<SVGPathElement>('.trace-glow, .trace-lit')]
  const sketch = [...svg.querySelectorAll<SVGPathElement>('.sketch path')]
  const head = svg.querySelector<SVGCircleElement>('.trace-head')!
  const end = svg.querySelector<SVGCircleElement>('.trace-end')!
  const hero = document.querySelector<HTMLElement>('.hero')
  const art = document.querySelector<HTMLElement>('.art')
  const copy = document.querySelector<HTMLElement>('.hero-copy')
  const heroFoot = document.querySelector<HTMLElement>('.hero-foot')
  const fade = svg.querySelector<SVGLinearGradientElement>('#sketch-fade')
  const nodes = [...document.querySelectorAll<HTMLElement>('[data-node]')]

  type Pt = { x: number; y: number }
  let total = 0
  let samples: { x: number; y: number; k: number; len: number }[] = []
  let marks: { el: HTMLElement; len: number }[] = []
  let shown = 0
  let target = 0

  function offset(el: HTMLElement) {
    let x = 0
    let y = 0
    for (let e: HTMLElement | null = el; e; e = e.offsetParent as HTMLElement | null) {
      x += e.offsetLeft
      y += e.offsetTop
    }
    return { x, y, w: el.offsetWidth, h: el.offsetHeight }
  }

  function photo(): (p: number[]) => Pt {
    if (!art) return () => ({ x: 0, y: 0 })
    const a = offset(art)
    const s = Math.max(a.w / SRC.w, a.h / SRC.h)
    const ox = a.x + (a.w - SRC.w * s) * SRC.posX
    const oy = a.y + (a.h - SRC.h * s) * SRC.posY
    return ([x, y]) => ({ x: ox + x * s, y: oy + y * s })
  }

  const poly = (ps: Pt[]) => `M${ps.map((p) => `${p.x} ${p.y}`).join(' L')} Z`
  const lerp = (a: Pt, b: Pt, t: number) => ({ x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t })

  // The drawing the photo dissolves into: the chip's outline, its die, the
  // pin-1 mark, and the two tweezer legs, which fade out down their length
  // above the hero's foot (or the headline, on a phone), leaving the cable.
  function drawSketch(map: (p: number[]) => Pt) {
    const c = CHIP.map(map)
    const mid = { x: (c[0].x + c[2].x) / 2, y: (c[0].y + c[2].y) / 2 }
    const die = c.map((p) => lerp(mid, p, 0.38))
    const mark = [lerp(c[2], c[1], 0.07), c[2], lerp(c[2], c[3], 0.07)].map((p) => lerp(p, mid, 0.06))
    const tip = map(TIP)
    let floor = art ? offset(art).y + art.offsetHeight : Infinity
    if (heroFoot) floor = Math.min(floor, offset(heroFoot).y - 88)
    if (copy) {
      const o = offset(copy)
      if (o.y > tip.y) floor = Math.min(floor, o.y - 72)
    }
    const legs = LEGS.map(([a, b]) => {
      const p = map(a)
      const q = map(b)
      return [p, q.y > floor ? lerp(p, q, (floor - p.y) / (q.y - p.y)) : q]
    })
    const leg = ([a, b]: Pt[]) => `M${a.x} ${a.y} L${b.x} ${b.y}`
    fade?.setAttribute('y1', `${tip.y}`)
    fade?.setAttribute('y2', `${floor}`)
    const d = [poly(c), poly(die), `M${mark[0].x} ${mark[0].y} L${mark[1].x} ${mark[1].y} L${mark[2].x} ${mark[2].y}`, leg(legs[0]), leg(legs[1])]
    sketch.forEach((p, i) => p.setAttribute('d', d[i]))
    return floor
  }

  function pointOf(el: HTMLElement, map: (p: number[]) => Pt): Pt {
    if (el.dataset.node === 'pin') return map(TIP)
    const o = offset(el)
    if (el.dataset.node === 'end') return { x: NaN, y: o.y }
    return { x: o.x + o.w / 2, y: o.y + o.h / 2 }
  }

  // Cable routing: straight runs joined by round bends. A leg that has to
  // cross sideways does it on one horizontal run, runs[i], set just inside
  // the top of the section it enters, clear of any text.
  const R = 24
  function route(pts: Pt[], runs: number[]) {
    let d = `M${pts[0].x} ${pts[0].y}`
    for (let i = 1; i < pts.length; i++) {
      const a = pts[i - 1]
      const b = pts[i]
      const dx = b.x - a.x
      if (Math.abs(dx) < 1) {
        d += ` V${b.y}`
        continue
      }
      const sx = Math.sign(dx)
      const r = Math.min(R, Math.abs(dx) / 2)
      const y = Math.min(Math.max(runs[i], a.y + r), b.y - r)
      d += ` V${y - r} Q${a.x} ${y} ${a.x + sx * r} ${y} H${b.x - sx * r} Q${b.x} ${y} ${b.x} ${y + r} V${b.y}`
    }
    return d
  }

  function layout() {
    const w = document.documentElement.clientWidth
    const h = document.documentElement.scrollHeight
    svg!.setAttribute('viewBox', `0 0 ${w} ${h}`)
    svg!.style.height = `${h}px`
    const map = photo()
    const legsEnd = drawSketch(map)
    const pts = nodes.map((el) => pointOf(el, map))
    const runs = nodes.map((el) => {
      const section = el.closest('section')
      return section ? section.offsetTop + 48 : 0
    })
    // On a phone the chip sits above the copy, so the first crossing happens
    // straight away, under the tweezers and above the headline.
    if (w < 640) runs[1] = legsEnd + 16
    // The last leg comes down the bus and bends into the footer's rule,
    // which it runs along to the right gutter.
    const foot = pts[pts.length - 1]
    const bus = pts[pts.length - 2].x
    const right = w - bus * 2
    const ruleY = foot.y
    foot.x = bus
    foot.y = ruleY - R
    const d = `${route(pts, runs)} Q${bus} ${ruleY} ${bus + R} ${ruleY} H${right}`
    base.setAttribute('d', d)
    for (const p of lit) p.setAttribute('d', d)
    total = lit[0].getTotalLength()
    for (const p of lit) p.style.strokeDasharray = `${total}`
    end.setAttribute('transform', `translate(${right} ${ruleY})`)

    // Each sample is keyed by the page height the reading line must reach to
    // light it. The footer's rule is level, so it is spread across the last
    // stretch of the page instead, and draws out as you reach the bottom.
    samples = []
    for (let len = 0; len <= total; len += 8) {
      const p = lit[0].getPointAtLength(len)
      const k = p.y >= ruleY - 0.5 && p.x > bus + R ? ruleY + ((p.x - bus - R) / (right - bus - R)) * (h - ruleY) : p.y
      samples.push({ x: p.x, y: p.y, k, len })
    }
    marks = nodes.map((el, i) => {
      if (i === nodes.length - 1) return { el, len: total - 8 }
      const p = pts[i]
      const s = samples.find((q) => Math.abs(q.y - p.y) < 6 && Math.abs(q.x - p.x) < 6) ?? samples[samples.length - 1]
      return { el, len: s.len }
    })
    measure()
    shown = target
    paint()
  }

  // The reading line sits at 62% of the screen and slides to the bottom
  // edge over the last screen of scroll, so the cable finishes at the end.
  function measure() {
    if (reduced.matches) {
      target = total
      return
    }
    const max = document.documentElement.scrollHeight - innerHeight
    const q = Math.min(1, Math.max(0, (scrollY - (max - innerHeight)) / innerHeight))
    const y = scrollY + innerHeight * (0.62 + 0.38 * q)
    let i = 0
    while (i < samples.length - 1 && samples[i + 1].k <= y) i++
    target = samples.length ? samples[i].len : 0
  }

  // Leaving the hero, the photo fades out as its drawing draws in.
  const smooth = (t: number) => t * t * (3 - 2 * t)
  function dissolve() {
    if (!hero || !art) return
    const t = reduced.matches ? 0 : smooth(Math.min(1, Math.max(0, (scrollY - hero.offsetHeight * 0.04) / (hero.offsetHeight * 0.5))))
    art.style.opacity = `${1 - t}`
    for (const p of sketch) p.style.strokeDashoffset = `${1 - t}`
  }

  function paint() {
    if (!samples.length) return
    for (const p of lit) p.style.strokeDashoffset = `${total - shown}`
    const i = Math.min(samples.length - 1, Math.round(shown / 8))
    head.setAttribute('transform', `translate(${samples[i].x} ${samples[i].y})`)
    const done = shown >= total - 8
    head.style.opacity = reduced.matches || done || shown < 1 ? '0' : '1'
    end.classList.toggle('on', done)
    for (const m of marks) m.el.classList.toggle('on', shown >= m.len - 2)
  }

  // The lit length eases towards its target, so jogs and fast scrolls
  // travel instead of jumping.
  let running = false
  function tick() {
    const gap = target - shown
    shown = Math.abs(gap) < 0.5 ? target : shown + gap * 0.16
    paint()
    running = shown !== target
    if (running) requestAnimationFrame(tick)
  }

  addEventListener(
    'scroll',
    () => {
      measure()
      dissolve()
      if (!running) {
        running = true
        requestAnimationFrame(tick)
      }
    },
    { passive: true },
  )
  new ResizeObserver(() => layout()).observe(document.body)
  document.fonts?.ready.then(layout)
  layout()
  dissolve()
}
