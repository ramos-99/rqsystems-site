// A field of the office's paperwork (emails, invoices, receipts, sheets),
// scattered at angles and drifting. A scan line sweeps through and every
// icon it passes springs into a grid, one column per kind of task. On a
// desktop the pointer combs the mess into order as well. Once everything is
// sorted the work piles up again, and the sweep comes back.

const main = document.querySelector<HTMLElement>('.sorted')

if (main) {
  const canvas = main.querySelector<HTMLCanvasElement>('.mess')!
  const ctx = canvas.getContext('2d')!
  const copy = main.querySelector<HTMLElement>('.copy')!
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches
  const svgs = [...main.querySelector<HTMLTemplateElement>('.kinds')!.content.querySelectorAll('svg')].map((s) => s.outerHTML)

  const ICON = 22
  let dpr = 1
  // Each icon drawn once per colour, then stamped.
  let dim: HTMLImageElement[] = []
  let lit: HTMLImageElement[] = []
  const sprite = (svg: string, colour: string) => {
    const img = new Image()
    const s = svg.replace(/stroke="currentColor"/g, `stroke="${colour}"`).replace(/stroke-width="2"/, 'stroke-width="1.6"').replace(/width="24" height="24"/, `width="${ICON * dpr}" height="${ICON * dpr}"`)
    img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(s)}`
    return img
  }

  type Bit = {
    k: number // kind
    sx: number // slot
    sy: number
    x: number
    y: number
    r: number
    vx: number
    vy: number
    vr: number
    on: boolean // sorted
    flash: number // ms of lime left
    wander: number // its own drift direction
  }
  let bits: Bit[] = []
  let W = 0
  let H = 0
  let keep: DOMRect[] = []

  const rand = (a: number, b: number) => a + Math.random() * (b - a)
  const blocked = (x: number, y: number, pad: number) => y < 84 || y > H - 56 || keep.some((r) => x > r.left - pad && x < r.right + pad && y > r.top - pad && y < r.bottom + pad)

  // The grid avoids the copy and the bar; its cells are dealt out to kinds
  // in column order, so each kind fills its own band of columns.
  function build() {
    dpr = Math.min(2, devicePixelRatio || 1)
    W = main!.clientWidth
    H = main!.clientHeight
    canvas.width = W * dpr
    canvas.height = H * dpr
    const m = main!.getBoundingClientRect()
    const r = copy.getBoundingClientRect()
    keep = [new DOMRect(r.left - m.left, r.top - m.top, r.width, r.height)]
    dim = svgs.map((s) => sprite(s, 'rgba(221,227,255,1)'))
    lit = svgs.map((s) => sprite(s, '#c4ff1a'))
    const cell = W < 640 ? 40 : 50
    const cols = Math.floor((W - 24) / cell)
    const ox = (W - cols * cell) / 2 + cell / 2
    const slots: [number, number][] = []
    for (let c = 0; c < cols; c++)
      for (let y = 84 + cell / 2; y < H - 56; y += cell) {
        const x = ox + c * cell
        if (!blocked(x, y, cell * 0.6)) slots.push([x, y])
      }
    const K = svgs.length
    bits = slots.map(([sx, sy], i) => ({ k: Math.floor((i * K) / slots.length), sx, sy, x: sx, y: sy, r: 0, vx: 0, vy: 0, vr: 0, on: true, flash: 0, wander: rand(0, Math.PI * 2) }))
    if (!reduced) for (const b of bits) scatter(b, true)
  }

  // Loose again: somewhere else, at an angle, with a push.
  function scatter(b: Bit, now = false) {
    b.on = false
    if (now) {
      let x = 0
      let y = 0
      do {
        x = rand(10, W - 10)
        y = rand(90, H - 60)
      } while (blocked(x, y, 18))
      b.x = x
      b.y = y
      b.r = rand(-1, 1)
    } else {
      b.vx = rand(-5, 5)
      b.vy = rand(-5, 5)
      b.vr = rand(-0.08, 0.08)
    }
  }

  function sort(b: Bit) {
    if (b.on) return
    b.on = true
    b.flash = 520
  }

  // The pointer, and the scan line.
  let px = -1e4
  let py = -1e4
  let lastMove = -1e4
  let scan = -1
  if (fine && !reduced)
    main.addEventListener('pointermove', (e) => {
      const m = main!.getBoundingClientRect()
      px = e.clientX - m.left
      py = e.clientY - m.top
      lastMove = performance.now()
    })

  let phase: 'mess' | 'sweep' | 'hold' = 'mess'
  let since = 0

  function step(dt: number, now: number) {
    since += dt
    const f = dt / 16.67
    // The sweep starts on its own unless the pointer is busy combing.
    if (phase === 'mess' && since > 1400 && now - lastMove > 1800) {
      phase = 'sweep'
      scan = 0
      since = 0
    }
    let swept = false
    if (phase === 'sweep') {
      scan += (W + 60) * (dt / 2300)
      if (scan > W + 40) {
        scan = -1
        swept = true
      }
    }
    let loose = 0
    for (const b of bits) {
      if (!b.on) {
        if (scan > 0 && b.x < scan) sort(b)
        else if ((b.x - px) ** 2 + (b.y - py) ** 2 < 110 ** 2) sort(b)
      }
      if (b.on) {
        // A spring to its slot, a little under-damped so it lands.
        b.vx = (b.vx + (b.sx - b.x) * 0.09 * f) * 0.74 ** f
        b.vy = (b.vy + (b.sy - b.y) * 0.09 * f) * 0.74 ** f
        b.vr = (b.vr - b.r * 0.12 * f) * 0.7 ** f
      } else {
        loose++
        b.wander += rand(-0.08, 0.08) * f
        b.vx = (b.vx + Math.cos(b.wander) * 0.03 * f) * 0.97 ** f
        b.vy = (b.vy + Math.sin(b.wander) * 0.03 * f) * 0.97 ** f
        b.vr *= 0.98 ** f
        // Keep clear of the copy and inside the field.
        if (blocked(b.x, b.y, 14)) {
          for (const r of keep) {
            if (b.x > r.left - 14 && b.x < r.right + 14 && b.y > r.top - 14 && b.y < r.bottom + 14) {
              b.vx += (b.x < (r.left + r.right) / 2 ? -0.4 : 0.4) * f
              b.vy += (b.y < (r.top + r.bottom) / 2 ? -0.25 : 0.25) * f
            }
          }
          if (b.y < 84) b.vy += 0.4 * f
          if (b.y > H - 56) b.vy -= 0.4 * f
        }
        if (b.x < 0) b.vx += 0.3 * f
        if (b.x > W) b.vx -= 0.3 * f
      }
      b.x += b.vx * f
      b.y += b.vy * f
      b.r += b.vr * f
      b.flash = Math.max(0, b.flash - dt)
    }
    if (swept) {
      phase = loose ? 'mess' : 'hold'
      since = 0
    }
    // Then the work piles up again, a few at a time.
    if (phase === 'hold' && since > 3600) {
      const n = Math.ceil(bits.length / 40)
      for (let i = 0; i < n; i++) {
        const b = bits[Math.floor(Math.random() * bits.length)]
        if (b.on) scatter(b)
      }
      if (bits.filter((b) => b.on).length < bits.length * 0.06) {
        for (const b of bits) if (b.on) scatter(b)
        phase = 'mess'
        since = 0
      }
    }
    if (phase === 'mess' && loose === 0 && since > 400) {
      phase = 'hold'
      since = 0
    }
  }

  function draw() {
    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    const s = ICON * dpr
    for (const b of bits) {
      const settled = b.on ? Math.max(0, 1 - Math.hypot(b.sx - b.x, b.sy - b.y) / 60) : 0
      ctx.setTransform(dpr, 0, 0, dpr, b.x * dpr, b.y * dpr)
      ctx.rotate(b.r)
      ctx.globalAlpha = 0.26 + 0.26 * settled
      ctx.drawImage(dim[b.k], -s / 2 / dpr, -s / 2 / dpr, ICON, ICON)
      if (b.flash > 0) {
        ctx.globalAlpha = b.flash / 520
        ctx.drawImage(lit[b.k], -s / 2 / dpr, -s / 2 / dpr, ICON, ICON)
      }
    }
    if (scan > 0) {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.globalAlpha = 1
      const g = ctx.createLinearGradient(scan - 90, 0, scan, 0)
      g.addColorStop(0, 'rgba(196,255,26,0)')
      g.addColorStop(1, 'rgba(196,255,26,0.1)')
      ctx.fillStyle = g
      ctx.fillRect(scan - 90, 84, 90, H - 140)
      ctx.fillStyle = '#c4ff1a'
      ctx.fillRect(scan - 0.75, 84, 1.5, H - 140)
    }
    ctx.globalAlpha = 1
  }

  let seen = true
  new IntersectionObserver(([e]) => (seen = e.isIntersecting)).observe(main)
  let last = 0
  function frame(now: number) {
    const dt = Math.min(48, now - (last || now))
    last = now
    if (seen && !document.hidden) {
      step(dt, now)
      draw()
    }
    requestAnimationFrame(frame)
  }

  // Lay out once the copy has its final size (fonts, the rise).
  let timer = 0
  new ResizeObserver(() => {
    clearTimeout(timer)
    timer = window.setTimeout(() => {
      build()
      phase = 'mess'
      since = 0
      if (reduced) Promise.all(dim.map((i) => i.decode())).then(draw)
    }, 120)
  }).observe(main)
  if (!reduced) requestAnimationFrame(frame)
}
