import { useState, useEffect } from 'react'
import DisplacementSphere from './DisplacementSphere'

export default function DeferredSphere() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 800)
    return () => clearTimeout(t)
  }, [])

  if (!mounted) {
    return <div style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
  }

  return <DisplacementSphere />
}
