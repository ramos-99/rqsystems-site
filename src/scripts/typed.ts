// The headline's last words are written by hand: a pen at an uneven pace,
// each word at its own angle, one misspelt word scribbled out and written
// again. Then the software reads it: a scan line runs across, the
// handwriting goes and clean type resolves in its place. The visitor can
// click the line and write a task of their own; Enter reads it and puts it
// in the email's subject. ?hand=pen swaps the marker for a pen.

const slot = document.querySelector<HTMLElement>('.slot')

if (slot) {
  const main = slot.closest<HTMLElement>('.typed')!
  const ink = slot.querySelector<HTMLElement>('.ink')!
  const hand = slot.querySelector<HTMLElement>('.hand')!
  const caret = slot.querySelector<HTMLElement>('.caret')!
  const label = slot.querySelector<HTMLElement>('.read')!
  const input = document.querySelector<HTMLInputElement>('.try')!
  const hint = slot.querySelector<HTMLElement>('.try-hint [data-tap]')!
  const note = document.querySelector<HTMLElement>('.note')!
  // Every contact link on the page carries the task as its subject.
  const links = [...document.querySelectorAll<HTMLAnchorElement>('a[data-mail]')]
  const prefix = document.querySelector<HTMLElement>('[data-subject]')!.dataset.subject
  const subject = (task: string) => {
    for (const a of links) a.href = `${a.href.split('?')[0]}?subject=${encodeURIComponent(`${prefix} ${task}`)}`
  }
  const tasks: string[] = JSON.parse(slot.dataset.tasks!)
  const finale = slot.dataset.finale!
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
  if (!matchMedia('(hover: hover) and (pointer: fine)').matches) hint.textContent = hint.dataset.tap!
  if (new URLSearchParams(location.search).get('hand') === 'pen') main.dataset.hand = 'pen'

  const OUT = 'cubic-bezier(0.23, 1, 0.32, 1)'
  const NS = 'http://www.w3.org/2000/svg'
  const wait = (ms: number) => new Promise((r) => setTimeout(r, ms))
  const rand = (a: number, b: number) => a + Math.random() * (b - a)
  const span = (cls: string, text = '') => {
    const s = document.createElement('span')
    s.className = cls
    s.textContent = text
    return s
  }

  // ── Handwriting ─────────────────────────────────────
  // Each word keeps its own slant, lift and size, so it doesn't wobble as
  // more is written after it.
  const slant: { r: number; y: number; k: number }[] = []
  function word(i: number) {
    const s = (slant[i] ??= { r: rand(-3, 2.5), y: rand(-0.07, 0.07), k: rand(0.92, 1.08) })
    const w = span('hw')
    w.style.rotate = `${s.r}deg`
    w.style.translate = `0 ${s.y}em`
    w.style.fontSize = `${s.k}em`
    hand.insertBefore(w, at())
    return w
  }
  // Writing goes before the caret, wherever it is.
  const at = () => (caret.parentNode === hand ? caret : null)
  const gap = () => hand.insertBefore(document.createTextNode(' '), at())

  // A letter is drawn left to right, the way a pen makes it.
  function letter(w: HTMLElement, c: string, ms: number) {
    const s = span('hc', c)
    w.append(s)
    if (!reduced) s.animate([{ clipPath: 'inset(-50% 100% -50% -30%)' }, { clipPath: 'inset(-50% -30% -50% -30%)' }], { duration: ms, easing: 'linear' })
  }

  let run = 0
  async function pen(w: HTMLElement, text: string, id: number) {
    for (const c of text) {
      if (id !== run) return false
      const ms = rand(55, 120)
      letter(w, c, ms * 1.3)
      await wait(ms)
    }
    return id === run
  }

  // Back and forth over the word, never quite the same twice.
  function scribble(w: HTMLElement) {
    const svg = document.createElementNS(NS, 'svg')
    svg.setAttribute('class', 'scribble')
    svg.setAttribute('viewBox', '0 0 100 100')
    svg.setAttribute('preserveAspectRatio', 'none')
    const p = document.createElementNS(NS, 'path')
    // Tight passes that drift down the word.
    let y = rand(6, 16)
    let d = `M${rand(0, 6)} ${y}`
    for (let i = 1; i <= 11; i++) {
      y = Math.min(96, y + rand(4, 10))
      d += ` L${i % 2 ? 100 - rand(0, 7) : rand(0, 7)} ${y}`
    }
    p.setAttribute('d', d)
    p.setAttribute('pathLength', '1')
    p.style.strokeDasharray = '1'
    svg.append(p)
    w.append(svg)
    return p.animate([{ strokeDashoffset: 1 }, { strokeDashoffset: 0 }], { duration: 520, easing: 'cubic-bezier(0.45, 0, 0.55, 1)', fill: 'both' }).finished
  }

  // A plausible slip: two letters swapped, or one doubled.
  function slip(w: string) {
    const i = 1 + Math.floor(Math.random() * (w.length - 2))
    return Math.random() < 0.6 ? w.slice(0, i) + w[i + 1] + w[i] + w.slice(i + 2) : w.slice(0, i + 1) + w[i] + w.slice(i + 1)
  }

  async function write(task: string, id: number, slips = true) {
    const words = task.split(' ')
    const long = words.map((w, i) => i).filter((i) => words[i].length >= 5 && /^\p{L}+$/u.test(words[i]))
    const wrong = slips ? (long[Math.floor(Math.random() * long.length)] ?? -1) : -1
    // Size the writing for the whole line, slip included, before the pen
    // starts, so it never runs past its two lines.
    const slipped = wrong < 0 ? '' : slip(words[wrong])
    fit(words.flatMap((w, i) => (i === wrong ? [slipped, w] : [w])).join(' '))
    let n = 0
    for (let i = 0; i < words.length; i++) {
      if (i > 0) {
        gap()
        await wait(rand(120, 260))
        if (id !== run) return false
      }
      if (i === wrong) {
        const w = word(n++)
        if (!(await pen(w, slipped, id))) return false
        await wait(rand(260, 380))
        if (id !== run) return false
        await scribble(w)
        await wait(220)
        if (id !== run) return false
        gap()
      }
      if (!(await pen(word(n++), words[i], id))) return false
    }
    return true
  }

  const empty = () => {
    for (const n of [...hand.childNodes]) if (n !== caret) n.remove()
  }
  function clearHand() {
    empty()
    slant.length = 0
  }

  // Smaller handwriting until it fits the slot's two lines.
  function shrink() {
    hand.style.fontSize = ''
    for (let k = 0.94; hand.offsetHeight > slot!.clientHeight * 1.04 && k > 0.55; k -= 0.06) hand.style.fontSize = `calc(var(--hand-size) * ${k})`
  }
  function fit(text: string) {
    drawHand(text, false)
    shrink()
    empty()
  }

  // The visitor's own handwriting, redrawn on every keystroke.
  function drawHand(value: string, grew: boolean) {
    empty()
    value.split(' ').forEach((t, i) => {
      if (i > 0) gap()
      const w = word(i)
      for (const c of t) w.append(span('hc', c))
    })
    wrapLong('.hw')
    const last = hand.querySelectorAll('.hc')
    if (grew && last.length && !reduced) last[last.length - 1].animate([{ clipPath: 'inset(-50% 100% -50% -30%)' }, { clipPath: 'inset(-50% -30% -50% -30%)' }], { duration: 110, easing: 'linear' })
  }

  // ── Clean type ──────────────────────────────────────
  // A single word wider than the line may break inside it, rather than
  // pushing the page sideways.
  function wrapLong(sel: string) {
    const max = slot!.clientWidth
    for (const w of slot!.querySelectorAll<HTMLElement>(sel)) {
      w.style.whiteSpace = ''
      if (w.offsetWidth > max) w.style.whiteSpace = 'normal'
    }
  }

  // Letters as their own spans, grouped by word, so each can decode.
  function letters(el: HTMLElement, text: string) {
    el.textContent = ''
    text.split(' ').forEach((t, i) => {
      if (i > 0) el.append(' ')
      const w = span('word')
      for (const c of t) w.append(span('ch', c))
      el.append(w)
    })
    return [...el.querySelectorAll<HTMLElement>('.ch')]
  }

  function setClean(text: string) {
    const chars = letters(ink, text)
    wrapLong('.word')
    return chars
  }

  // The software reads the line, visibly. First it finds each handwritten
  // word: a recognition bracket snaps on, tagged with what it read (the
  // scribbled one is ignored). Then a scan runs across; behind it the
  // handwriting goes and each clean letter decodes, flickering through a few
  // characters before it locks.
  const GLYPHS = 'abcdefghijklmnopqrstuvwxyz0123456789'
  function decode(c: HTMLElement) {
    const real = c.textContent!
    if (real === '.') return
    c.style.width = `${c.offsetWidth}px`
    let n = 0
    const tick = () => {
      if (++n > 4) {
        c.textContent = real
        c.style.width = ''
        return
      }
      c.textContent = GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
      setTimeout(tick, 38)
    }
    tick()
  }

  async function find(origin: DOMRect) {
    const words = [...hand.querySelectorAll<HTMLElement>('.hw')]
    // Tags hang under the brackets, so only the last line carries them;
    // above it they would cover the next line's writing.
    const last = Math.max(...words.map((w) => w.offsetTop))
    const boxes = words.map((w, i) => {
      const r = w.getBoundingClientRect()
      const ignored = !!w.querySelector('.scribble')
      const b = span(ignored ? 'found ignored' : 'found')
      b.style.left = `${r.left - origin.left - 6}px`
      b.style.top = `${r.top - origin.top - 4}px`
      b.style.width = `${r.width + 12}px`
      b.style.height = `${r.height + 8}px`
      if (w.offsetTop > last - 8) b.append(span('tag', ignored ? slot!.dataset.ignored : w.textContent!))
      slot!.append(b)
      b.animate([{ opacity: 0, transform: 'scale(1.18)' }, { opacity: 1, transform: 'none' }], { duration: 260, delay: i * 70, easing: OUT, fill: 'backwards' })
      return b
    })
    await wait(boxes.length * 70 + 520)
    return boxes
  }

  async function read(text: string) {
    caret.remove()
    slot!.classList.remove('marked')
    if (reduced) {
      setClean(`${text}.`)
      clearHand()
      hand.append(caret)
      slot!.classList.add('marked')
      return
    }
    slot!.classList.add('reading')
    const origin = slot!.getBoundingClientRect()
    const boxes = await find(origin)
    const chars = setClean(`${text}.`)
    for (const c of chars) c.style.opacity = '0'
    const marks = [...hand.querySelectorAll<HTMLElement>('.hc, .scribble'), ...boxes]
    const x = (e: Element) => e.getBoundingClientRect().left - origin.left
    const end = Math.max(...[...chars, ...marks].map((e) => e.getBoundingClientRect().right - origin.left)) + 40
    const dur = Math.min(1000, Math.max(560, end * 0.7))
    const at = (e: Element) => (dur * Math.max(0, x(e))) / end

    const bar = span('sweep')
    slot!.append(bar)
    bar
      .animate(
        [
          { transform: 'translateX(-40px)', opacity: 0 },
          { opacity: 1, offset: 0.06 },
          { opacity: 1, offset: 0.92 },
          { transform: `translateX(${end}px)`, opacity: 0 },
        ],
        { duration: dur, easing: 'cubic-bezier(0.45, 0, 0.55, 1)' },
      )
      .finished.then(() => bar.remove())
    // The invitation comes back once the label has gone.
    label
      .animate(
        [
          { opacity: 0, transform: 'translateY(-4px)' },
          { opacity: 1, transform: 'none', offset: 0.1 },
          { opacity: 1, transform: 'none', offset: 0.82 },
          { opacity: 0, transform: 'none' },
        ],
        { duration: dur + 2000, easing: OUT },
      )
      .finished.then(() => slot!.classList.remove('reading'))
    for (const m of marks) m.animate([{ opacity: 1, filter: 'blur(0)' }, { opacity: 0, filter: 'blur(6px)' }], { duration: 220, delay: at(m), easing: OUT, fill: 'forwards' })
    for (const c of chars) {
      const t = at(c) + 30
      setTimeout(() => {
        c.style.opacity = ''
        c.animate([{ opacity: 0.3, color: 'var(--fg)' }, { opacity: 1 }], { duration: 260, easing: OUT })
        decode(c)
      }, t)
    }
    await wait(dur + 420)
    for (const b of boxes) b.remove()
    // Read: the line is marked (the highlighter, in the light theme).
    slot!.classList.add('marked')
    clearHand()
    hand.append(caret)
  }

  async function fade() {
    slot!.classList.remove('marked')
    await ink.animate([{ opacity: 1, filter: 'blur(0)' }, { opacity: 0, filter: 'blur(6px)' }], { duration: 280, easing: OUT }).finished
    ink.textContent = ''
  }

  // ── Autoplay ────────────────────────────────────────
  let seen = true
  new IntersectionObserver(([e]) => (seen = e.isIntersecting)).observe(slot)
  const ready = () =>
    new Promise<void>((r) => {
      const check = () => (seen && !document.hidden ? r() : setTimeout(check, 250))
      check()
    })

  // Two tasks, then the point: "anything", written cleanly, which it rests on.
  async function auto(id: number, seq = [...tasks.slice(0, 2), finale]) {
    for (const [n, task] of seq.entries()) {
      await ready()
      if (id !== run) return
      if (!(await write(task, id, task !== finale))) return
      await wait(650)
      if (id !== run) return
      await read(task)
      subject(task)
      if (n === seq.length - 1) return
      await wait(2600)
      if (id !== run) return
      await fade()
      await wait(420)
    }
  }

  // ── The visitor's turn ──────────────────────────────
  let resume = 0
  let before = ''
  input.addEventListener('focus', () => {
    run++
    clearTimeout(resume)
    for (const e of slot.querySelectorAll('.found, .sweep')) e.remove()
    slot.classList.remove('reading', 'marked')
    // The caret answers at once; the old line fades out underneath it
    // rather than vanishing in one frame.
    if (ink.textContent) {
      const out = ink.animate(
        reduced ? [{ opacity: 1 }, { opacity: 0 }] : [{ opacity: 1, filter: 'blur(0)' }, { opacity: 0, filter: 'blur(4px)' }],
        { duration: reduced ? 120 : 150, easing: OUT, fill: 'forwards' },
      )
      out.finished
        .then(() => {
          if (slot.classList.contains('typing')) ink.textContent = ''
          out.cancel()
        })
        .catch(() => {})
    }
    clearHand()
    hand.append(caret)
    slot.classList.add('typing')
    send.classList.remove('is-found')
    before = input.value
    drawHand(input.value, false)
  })
  let still = 0
  input.addEventListener('input', () => {
    const v = input.value.replace(/\s+/g, ' ').replace(/^ /, '')
    drawHand(v, v.length > before.length)
    shrink()
    before = v
    slot.classList.add('busy')
    clearTimeout(still)
    still = window.setTimeout(() => slot.classList.remove('busy'), 420)
  })
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      input.blur()
    }
  })
  const send = document.querySelector<HTMLElement>('.band .btn-lime')!

  input.addEventListener('blur', () => {
    slot.classList.remove('typing')
    const task = input.value.trim().replace(/\s+/g, ' ').replace(/\.$/, '')
    if (!task) {
      clearHand()
      resume = window.setTimeout(() => auto(++run, [finale]), 2400)
      return
    }
    // The visitor's task: read, and then the button is found, since it
    // now carries their task as the email's subject.
    subject(task)
    const id = run
    read(task).then(() => {
      if (id !== run) return
      send.classList.add('is-found')
      note.textContent = note.dataset.done!
    })
  })

  if (!reduced) {
    ink.textContent = ''
    // Start once the handwriting face is in, so it never writes in a
    // fallback font.
    const face = getComputedStyle(main).getPropertyValue('--hand').split(',')[0].trim()
    const first = run
    Promise.race([document.fonts.load(`1em ${face}`), wait(2500)]).then(() => setTimeout(() => auto(first), 700))
  }
}
