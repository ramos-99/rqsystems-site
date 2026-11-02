// The previous work, shown working. The add-in is pressed; three files
// (the .eml, a PDF of it, the attachment) slide out from behind the email
// and ride one trace, one after another, into the right Dropbox folder,
// whose count ticks up as each lands. Then the next email. It runs only
// while the screen is in view; clicking the button files the current email.

const stage = document.querySelector<HTMLElement>('.flow-stage')

if (stage) {
  const fit = stage.parentElement!
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
  const all = (s: string) => [...stage.querySelectorAll<HTMLElement>(s)]
  const mails = all('.fm')
  const folders = all('.ff')
  const tiles = all('.tile')
  const card = stage.querySelector<HTMLElement>('.fm-card')!
  const addin = stage.querySelector<HTMLElement>('.addin')!
  const wire = stage.querySelector<SVGSVGElement>('.flow-wire')!
  const paths = [...wire.querySelectorAll('path')]
  const start = folders.map((f) => Number(f.dataset.count))
  const counts = [...start]

  const OUT = 'cubic-bezier(0.23, 1, 0.32, 1)'
  const IO = 'cubic-bezier(0.77, 0, 0.175, 1)'
  const wait = (ms: number) => new Promise((r) => setTimeout(r, ms))

  // Scale the stage to its column, and to the screen's height on desktop
  // so the second screen never needs to scroll.
  let W = 0
  let H = 0
  function size() {
    W = stage!.offsetWidth
    H = stage!.offsetHeight
    const room = innerWidth >= 1024 ? (innerHeight - 160) / H : Infinity
    const k = Math.min(1, fit.clientWidth / W, room)
    stage!.style.scale = `${k}`
    stage!.style.left = `${(fit.clientWidth - W * k) / 2}px`
    fit.style.height = `${H * k}px`
    wire.setAttribute('viewBox', `0 0 ${W} ${H}`)
  }
  new ResizeObserver(size).observe(fit)
  size()

  function box(el: HTMLElement) {
    let x = 0
    let y = 0
    for (let e: HTMLElement | null = el; e && e !== stage; e = e.offsetParent as HTMLElement | null) {
      x += e.offsetLeft
      y += e.offsetTop
    }
    return { x, y, w: el.offsetWidth, h: el.offsetHeight }
  }

  async function play(el: Element, frames: Keyframe[], options: KeyframeAnimationOptions) {
    const a = el.animate(frames, { fill: 'forwards', ...options })
    try {
      await a.finished
      a.commitStyles()
      a.cancel()
    } catch {
      // Cancelled; nothing to keep.
    }
  }

  let cur = 0
  function show(i: number) {
    cur = i
    mails.forEach((m, j) => m.classList.toggle('on', j === i))
    folders.forEach((f, j) => f.classList.toggle('target', j === Number(mails[i].dataset.folder)))
  }

  function land(f: number) {
    counts[f]++
    folders[f].querySelector('.ff-n')!.textContent = `${counts[f]}`
    folders[f].classList.add('hot')
    setTimeout(() => folders[f].classList.remove('hot'), 140)
  }

  // From inside the email card (so a file slides out from behind it) to
  // the folder's icon, level at both ends.
  function route(f: HTMLElement) {
    const c = box(card)
    const t = box(f)
    const x1 = t.x + 26
    const y1 = t.y + t.h / 2
    if (W > 600) {
      const x0 = c.x + c.w - 70
      const y0 = c.y + c.h / 2
      const dx = (x1 - x0) * 0.5
      return `M${x0} ${y0} C${x0 + dx} ${y0} ${x1 - dx} ${y1} ${x1} ${y1}`
    }
    // A straight drop into the Dropbox card; the lit folder says where.
    const d = box(stage!.querySelector<HTMLElement>('.db-card')!)
    const x0 = c.x + c.w / 2 - 40
    return `M${x0} ${c.y + c.h - 60} L${x0} ${d.y + 30}`
  }

  let busy = false
  async function file() {
    const m = mails[cur]
    if (busy || m.classList.contains('filed')) return
    busy = true
    const names: string[] = JSON.parse(m.dataset.files!)
    const f = Number(m.dataset.folder)
    addin.classList.add('on')
    addin.animate([{ scale: 1 }, { scale: 0.96 }, { scale: 1 }], { duration: 180, easing: OUT })

    if (reduced) {
      names.forEach(() => land(f))
    } else {
      const d = route(folders[f])
      for (const p of paths) {
        p.setAttribute('d', d)
        p.style.opacity = ''
      }
      // A softer curve than IO, so the three keep their spacing instead of
      // bunching where it slows.
      const ride = { duration: 1150, easing: 'cubic-bezier(0.5, 0, 0.3, 1)' }
      for (const p of paths) play(p, [{ strokeDashoffset: 1 }, { strokeDashoffset: 0 }], { duration: ride.duration, easing: IO })
      await Promise.all(
        names.map(async (name, j) => {
          const t = tiles[j]
          t.querySelector('span')!.textContent = name
          t.style.offsetPath = `path('${d}')`
          await wait(j * 300)
          t.animate(
            [
              { opacity: 0, scale: 0.96 },
              { opacity: 1, scale: 1, offset: 0.2 },
              // It shrinks into the folder's icon before it can cover the
              // folder's name.
              { opacity: 1, scale: 1, offset: 0.68 },
              { opacity: 0, scale: 0.4 },
            ],
            ride,
          )
          await play(t, [{ offsetDistance: '0%' }, { offsetDistance: '100%' }], ride)
          t.style.opacity = '0'
          land(f)
        }),
      )
      for (const p of paths) play(p, [{ opacity: 1 }, { opacity: 0 }], { duration: 600, easing: OUT })
    }
    m.classList.add('filed')
    addin.classList.remove('on')
    busy = false
  }

  function reset() {
    counts.splice(0, counts.length, ...start)
    folders.forEach((x, j) => (x.querySelector('.ff-n')!.textContent = `${start[j]}`))
    for (const m of mails) m.classList.remove('filed')
  }

  // Runs while at least half the screen shows it, and the tab is visible.
  let seen = false
  new IntersectionObserver(([e]) => (seen = e.isIntersecting), { threshold: 0.5 }).observe(fit)
  const ready = () =>
    new Promise<void>((r) => {
      const check = () => (seen && !document.hidden ? r() : setTimeout(check, 200))
      check()
    })

  addin.addEventListener('click', file)

  show(0)
  if (reduced) {
    file()
  } else {
    ;(async () => {
      for (;;) {
        await ready()
        await wait(700)
        await file()
        await wait(1900)
        await ready()
        if (cur === mails.length - 1) reset()
        show((cur + 1) % mails.length)
        await wait(500)
      }
    })()
  }
}
