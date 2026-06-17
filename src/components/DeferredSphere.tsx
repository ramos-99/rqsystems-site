import { lazy, Suspense, useEffect, useRef, useState } from 'react'

// The Three.js scene runs in a Web Worker via OffscreenCanvas so its render
// loop never touches the main thread. Browsers without OffscreenCanvas fall
// back to the on-main-thread react-three-fiber version, lazy-loaded so Three.js
// stays out of the main bundle for everyone else.
const DisplacementSphere = lazy(() => import('./DisplacementSphere'))

function supportsOffscreen() {
  return (
    typeof Worker !== 'undefined' &&
    typeof HTMLCanvasElement !== 'undefined' &&
    'transferControlToOffscreen' in HTMLCanvasElement.prototype
  )
}

export default function DeferredSphere() {
  const [mounted, setMounted] = useState(false)
  const [fallback, setFallback] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 800)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (!mounted || fallback) return
    if (!supportsOffscreen()) {
      setFallback(true)
      return
    }
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    let worker: Worker
    try {
      worker = new Worker(new URL('./sphere.worker.ts', import.meta.url), { type: 'module' })
    } catch {
      setFallback(true)
      return
    }

    const rect = container.getBoundingClientRect()
    const getDpr = () => Math.min(window.devicePixelRatio || 1, 1.5)
    const offscreen = canvas.transferControlToOffscreen()
    worker.postMessage(
      { type: 'init', canvas: offscreen, width: rect.width, height: rect.height, dpr: getDpr() },
      [offscreen],
    )

    const ro = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect
      if (width > 0 && height > 0) {
        worker.postMessage({ type: 'resize', width, height, dpr: getDpr() })
      }
    })
    ro.observe(container)

    return () => {
      ro.disconnect()
      worker.postMessage({ type: 'dispose' })
      worker.terminate()
    }
  }, [mounted, fallback])

  if (!mounted) {
    return <div style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
  }

  if (fallback) {
    return (
      <Suspense fallback={null}>
        <DisplacementSphere />
      </Suspense>
    )
  }

  return (
    <div ref={containerRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
      <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />
    </div>
  )
}
