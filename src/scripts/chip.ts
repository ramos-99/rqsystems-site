// The hero photo dissolves into a drawing of its own chip: the outline, the
// die and every pin. Then copper traces leave the chip's edges the way they
// would on a circuit board (straight runs, 45° corners) and route to the
// page: the headline, the lead, the email button, the founders. Each part
// powers on when its trace arrives. Afterwards pulses keep running along
// the traces, and on a desktop the pointer is a lens onto the photo.

const board = document.querySelector<HTMLElement>('.board')

if (board) {
  const art = board.querySelector<HTMLElement>('.art')!
  const img = art.querySelector('img')!
  const svg = board.querySelector<SVGSVGElement>('.traces')!
  const [pins, outline, die] = [...board.querySelectorAll<SVGPathElement>('.drawing path')]
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches
  const NS = 'http://www.w3.org/2000/svg'
  const IO = 'cubic-bezier(0.77, 0, 0.175, 1)'
  const OUT = 'cubic-bezier(0.23, 1, 0.32, 1)'
  const wait = (ms: number) => new Promise((r) => setTimeout(r, ms))

  type Pt = { x: number; y: number }
  const lerp = (a: Pt, b: Pt, t: number) => ({ x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t })

  // The photo's own pixels (2000 × 1331): the chip's corners, top, right,
  // bottom and left, as in scripts/trace.ts.
  const SRC = { w: 2000, h: 1331 }
  const CHIP = [[1010, 244], [1300, 548], [990, 820], [710, 518]]

  // Where a photo pixel lands on the page, through object-fit: cover.
  function photo() {
    const a = art.getBoundingClientRect()
    const m = board!.getBoundingClientRect()
    const [px, py] = getComputedStyle(img).objectPosition.split(' ').map((v) => parseFloat(v) / 100)
    const s = Math.max(a.width / SRC.w, a.height / SRC.h)
    const ox = a.left - m.left + (a.width - SRC.w * s) * px
    const oy = a.top - m.top + (a.height - SRC.h * s) * py
    return ([x, y]: number[]): Pt => ({ x: ox + x * s, y: oy + y * s })
  }

  // A point on the chip's face, u along top→right, v along top→left.
  const face = (c: Pt[], u: number, v: number): Pt => ({
    x: c[0].x * (1 - u) * (1 - v) + c[1].x * u * (1 - v) + c[2].x * u * v + c[3].x * (1 - u) * v,
    y: c[0].y * (1 - u) * (1 - v) + c[1].y * u * (1 - v) + c[2].y * u * v + c[3].y * (1 - u) * v,
  })
  const quad = (ps: Pt[]) => `M${ps.map((p) => `${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' L')} Z`

  function drawChip(c: Pt[]) {
    // Every pin is a zero-length stroke with a round cap: one path, a
    // thousand dots.
    const N = 32
    let d = ''
    for (let i = 0; i < N; i++)
      for (let j = 0; j < N; j++) {
        const u = (i + 0.5) / N
        const v = (j + 0.5) / N
        if (Math.abs(u - 0.5) < 0.19 && Math.abs(v - 0.5) < 0.19) continue
        const p = face(c, u, v)
        d += `M${p.x.toFixed(1)} ${p.y.toFixed(1)}h0`
      }
    pins.setAttribute('d', d)
    outline.setAttribute('d', quad(c))
    let inner = quad([face(c, 0.31, 0.31), face(c, 0.69, 0.31), face(c, 0.69, 0.69), face(c, 0.31, 0.69)])
    for (let i = 0; i < 4; i++)
      for (let j = 0; j < 4; j++) {
        const u = 0.355 + i * 0.085
        const v = 0.355 + j * 0.085
        inner += quad([face(c, u, v), face(c, u + 0.05, v), face(c, u + 0.05, v + 0.05), face(c, u, v + 0.05)])
      }
    die.setAttribute('d', inner)
  }

  // A trace leaves edge e (0 top→right, 1 right→bottom, 2 bottom→left,
  // 3 left→top) at fraction f, steps out at 45°, runs to its channel x, turns
  // to its target's height and runs into it. Corners are cut at 45°.
  type Spec = { e: number; f: number; stub: number; xc?: number; to: Pt; el?: HTMLElement; pad?: boolean }
  const OUTWARD = [[1, -1], [1, 1], [-1, 1], [-1, -1]]
  function route(c: Pt[], s: Spec) {
    const a = lerp(c[s.e], c[(s.e + 1) % 4], s.f)
    const [nx, ny] = OUTWARD[s.e]
    const p1 = { x: a.x + nx * s.stub, y: a.y + ny * s.stub }
    const xc = s.xc ?? p1.x
    const pts = [a, p1, { x: xc, y: p1.y }, { x: xc, y: s.to.y }, s.to].filter(
      (p, i, all) => i === 0 || Math.hypot(p.x - all[i - 1].x, p.y - all[i - 1].y) > 0.5,
    )
    let d = `M${pts[0].x} ${pts[0].y}`
    for (let i = 1; i < pts.length - 1; i++) {
      const [p, q, r] = [pts[i - 1], pts[i], pts[i + 1]]
      const l1 = Math.hypot(q.x - p.x, q.y - p.y)
      const l2 = Math.hypot(r.x - q.x, r.y - q.y)
      const k = Math.min(14, l1 / 2, l2 / 2)
      const b = lerp(q, p, k / l1)
      const n = lerp(q, r, k / l2)
      d += ` L${b.x.toFixed(1)} ${b.y.toFixed(1)} L${n.x.toFixed(1)} ${n.y.toFixed(1)}`
    }
    const z = pts[pts.length - 1]
    return `${d} L${z.x.toFixed(1)} ${z.y.toFixed(1)}`
  }

  const rel = (el: Element) => {
    const r = el.getBoundingClientRect()
    const m = board!.getBoundingClientRect()
    return { x: r.left - m.left, y: r.top - m.top, w: r.width, h: r.height }
  }
  // The end of the headline's last line, for its pad.
  function lineEnd(el: HTMLElement) {
    const range = document.createRange()
    range.selectNodeContents(el)
    const rs = [...range.getClientRects()]
    const r = rs[rs.length - 1]
    const m = board!.getBoundingClientRect()
    return { x: r.right - m.left, y: r.top - m.top + r.height * 0.55 }
  }

  // The right edge of an element's widest line of text.
  function reach(el: HTMLElement) {
    const range = document.createRange()
    range.selectNodeContents(el)
    return Math.max(...[...range.getClientRects()].map((r) => r.right)) - board!.getBoundingClientRect().left
  }

  const h1 = board.querySelector<HTMLElement>('h1')!
  const lead = board.querySelector<HTMLElement>('.lead')!
  const pill = board.querySelector<HTMLElement>('.pill')!
  const node = pill.querySelector<HTMLElement>('.pill-node')!
  const duo = board.querySelector<HTMLElement>('.duo')!

  function specs(c: Pt[]): Spec[] {
    const W = board!.clientWidth
    const H = board!.clientHeight
    const top = Math.min(...c.map((p) => p.y))
    const bottom = Math.max(...c.map((p) => p.y))
    const n = rel(node)
    const plug = { x: n.x + n.w, y: n.y + n.h / 2 }
    const h = lineEnd(h1)
    const l = lineEnd(lead)
    const faces = duo.lastElementChild!.querySelector('a')!
    const fe = rel(faces)
    const tall = W < 768
    if (tall) {
      // The lead runs the copy's full width, so it has no trace of its own
      // and powers on with the headline.
      // The chip is above the copy: traces drop down the right-hand side.
      const x0 = W - 22
      return [
        { e: 1, f: 0.3, stub: 12, xc: x0, to: { x: plug.x + 4, y: plug.y }, el: pill },
        { e: 1, f: 0.55, stub: 12, xc: x0 - 12, to: { x: Math.min(h.x + 22, x0 - 34), y: h.y }, el: h1, pad: true },
        { e: 2, f: 0.3, stub: 18, to: { x: -10, y: bottom + 40 }, xc: -10 },
        { e: 2, f: 0.6, stub: 14, to: { x: -10, y: bottom + 20 }, xc: -10 },
        { e: 3, f: 0.5, stub: 16, to: { x: -10, y: top + 60 }, xc: -10 },
        { e: 0, f: 0.6, stub: 16, to: { x: W + 10, y: top - 10 }, xc: W + 10 },
      ]
    }
    // The copy is to the chip's left: traces nest in a channel between them.
    const x0 = Math.max(reach(h1), reach(lead), reach(duo), reach(pill)) + 48
    return [
      { e: 3, f: 0.45, stub: 16, xc: x0 - 14, to: { x: h.x + 26, y: h.y }, el: h1, pad: true },
      { e: 2, f: 0.92, stub: 14, xc: x0, to: { x: l.x + 22, y: l.y }, el: lead, pad: true },
      { e: 2, f: 0.78, stub: 14, xc: x0 + 14, to: { x: plug.x + 4, y: plug.y }, el: pill },
      { e: 2, f: 0.64, stub: 14, xc: x0 + 28, to: { x: fe.x + fe.w + 22, y: fe.y + fe.h / 2 }, el: duo, pad: true },
      { e: 2, f: 0.46, stub: 16, xc: x0 + 42, to: { x: x0 + 42, y: H + 10 } },
      { e: 2, f: 0.3, stub: 18, xc: x0 + 56, to: { x: x0 + 56, y: H + 10 } },
      { e: 1, f: 0.35, stub: 22, to: { x: 0, y: H + 10 } },
      { e: 1, f: 0.6, stub: 22, to: { x: 0, y: bottom + 120 }, pad: true },
      { e: 1, f: 0.82, stub: 22, to: { x: 0, y: H + 10 } },
      { e: 0, f: 0.4, stub: 18, xc: W + 10, to: { x: W + 10, y: top + 90 } },
      { e: 0, f: 0.7, stub: 18, xc: W + 10, to: { x: W + 10, y: top + 190 } },
    ].map((s) => (s.to.x === 0 ? { ...s, to: { ...s.to, x: NaN } } : s)) as Spec[]
  }

  type Trace = { spec: Spec; cu: SVGPathElement; run: SVGPathElement[]; pad?: SVGCircleElement; len: number }
  let traces: Trace[] = []
  const el = <K extends keyof SVGElementTagNameMap>(tag: K, cls: string) => {
    const e = document.createElementNS(NS, tag)
    e.setAttribute('class', cls)
    return e
  }

  // Lay out the drawing and the traces for the current size.
  function layout(drawn: boolean) {
    const map = photo()
    const c = CHIP.map(map)
    drawChip(c)
    svg.textContent = ''
    traces = specs(c).map((s) => {
      // A drop (x unset) falls straight down from its stub.
      if (Number.isNaN(s.to.x)) {
        const a = lerp(c[s.e], c[(s.e + 1) % 4], s.f)
        const x = a.x + OUTWARD[s.e][0] * s.stub
        s = { ...s, to: { x, y: s.to.y }, xc: x }
      }
      const d = route(c, s)
      const cu = el('path', 'cu')
      cu.setAttribute('d', d)
      cu.setAttribute('pathLength', '1')
      if (drawn) cu.style.strokeDashoffset = '0'
      const run = ['glow', 'run'].map((k) => {
        const p = el('path', k)
        p.setAttribute('d', d)
        p.setAttribute('pathLength', '1')
        return p
      })
      svg.append(cu, ...run)
      let pad: SVGCircleElement | undefined
      if (s.pad) {
        pad = el('circle', s.el ? 'pad live' : 'pad')
        pad.setAttribute('cx', `${s.to.x}`)
        pad.setAttribute('cy', `${s.to.y}`)
        pad.setAttribute('r', '4')
        if (drawn) pad.classList.add('on')
        svg.append(pad)
      }
      return { spec: s, cu, run, pad, len: cu.getTotalLength() }
    })
  }

  // A pulse of current: a short lit dash that runs the trace's length.
  function pulse(t: Trace, duration: number, easing = 'cubic-bezier(0.45, 0, 0.55, 1)') {
    const frames = [
      { strokeDashoffset: 0.07, opacity: 1 },
      { strokeDashoffset: -1, opacity: 1 },
    ]
    const [glow, run] = t.run
    glow.animate(frames.map((f) => ({ ...f, opacity: 0.16 })), { duration, easing })
    return run.animate(frames, { duration, easing }).finished
  }

  function power(t: Trace) {
    t.pad?.classList.add('on')
    const e = t.spec.el
    if (!e) return
    e.classList.add('on')
    if (e === h1) lead.classList.add('on')
    if (e === pill && !traces.some((x) => x.spec.el === duo)) duo.classList.add('on')
    if (e === pill) node.animate([{ scale: 1 }, { scale: 1.12 }, { scale: 1 }], { duration: 320, easing: OUT })
  }

  async function boot() {
    board!.classList.add('boot')
    layout(false)
    await wait(1300)
    art.classList.add('wipe')
    await wait(500)
    for (const p of [outline, die]) p.animate([{ strokeDashoffset: 1 }, { strokeDashoffset: 0 }], { duration: 1400, easing: IO, fill: 'forwards' })
    await wait(900)
    art.classList.add('gone')
    // Traces run out of the chip, longest last, each with current at its tip.
    await Promise.all(
      traces.map(async (t, i) => {
        const duration = 700 + Math.min(900, t.len * 1.1)
        await wait(i * 70)
        t.cu.animate([{ strokeDashoffset: 1 }, { strokeDashoffset: 0 }], { duration, easing: IO, fill: 'forwards' })
        t.run[1].animate(
          [
            { strokeDashoffset: 1.07, opacity: 1 },
            { strokeDashoffset: 0.07, opacity: 1 },
            { strokeDashoffset: 0.07, opacity: 0 },
          ],
          { duration: duration + 200, easing: IO },
        )
        await wait(duration)
        power(t)
      }),
    )
    art.classList.remove('wipe')
    art.classList.add('lens')
    for (const t of traces) t.cu.style.strokeDashoffset = '0'
    built = true
    idle()
  }

  // Afterwards, a pulse every so often, more often toward the button.
  let seen = true
  new IntersectionObserver(([e]) => (seen = e.isIntersecting)).observe(board)
  async function idle() {
    for (;;) {
      await wait(900 + Math.random() * 1100)
      if (!seen || document.hidden) continue
      const live = traces.filter((t) => t.spec.el)
      const pool = Math.random() < 0.55 ? live : traces
      const t = pool[Math.floor(Math.random() * pool.length)]
      pulse(t, 900 + t.len * 1.4).then(() => {
        if (t.spec.el === pill) node.animate([{ scale: 1 }, { scale: 1.08 }, { scale: 1 }], { duration: 260, easing: OUT })
      })
    }
  }
  pill.addEventListener('pointerenter', () => {
    const t = traces.find((x) => x.spec.el === pill)
    if (t && art.classList.contains('lens')) pulse(t, 520, OUT)
  })

  // The lens: a circle of photograph that follows the pointer over the art.
  if (fine && !reduced) {
    board.addEventListener('pointermove', (e) => {
      if (!art.classList.contains('lens')) return
      const a = art.getBoundingClientRect()
      const x = e.clientX - a.left
      const y = e.clientY - a.top
      art.style.setProperty('--x', `${x}px`)
      art.style.setProperty('--y', `${y}px`)
      art.classList.toggle('near', x > 0 && y > 0 && x < a.width && y < a.height)
    })
    board.addEventListener('pointerleave', () => art.classList.remove('near'))
  }

  let built = false
  new ResizeObserver(() => {
    if (built) layout(true)
  }).observe(board)

  if (reduced) {
    layout(true)
    pill.classList.add('on')
    built = true
  } else {
    if (img.complete) boot()
    else img.addEventListener('load', boot, { once: true })
  }
}
