// The copy button beside the address, for people whose mail opens in a
// browser tab rather than an app. It only appears where the clipboard works.
const copyBtn = document.querySelector<HTMLButtonElement>('.mail-copy')
if (copyBtn && navigator.clipboard && isSecureContext) {
  const note = document.querySelector<HTMLElement>('.contact-note')
  copyBtn.hidden = false
  let done = 0
  copyBtn.addEventListener('click', async () => {
    await navigator.clipboard.writeText(copyBtn.dataset.copy!)
    copyBtn.classList.add('is-done')
    if (note) note.textContent = copyBtn.dataset.copied!
    clearTimeout(done)
    done = window.setTimeout(() => copyBtn.classList.remove('is-done'), 1600)
  })
}
