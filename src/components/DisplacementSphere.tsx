import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { AdaptiveDpr, Billboard, Environment } from '@react-three/drei'
import * as THREE from 'three'

// Abstract network on an icosahedral skeleton: 12 vertices, 30 thin edges,
// black-on-black, slow continuous rotation. Light pulses travel node-to-node
// with a comet-like glow and tail, gently lifting whatever they pass.

const RADIUS = 1.45
const PHI = (1 + Math.sqrt(5)) / 2

// Small fixed offsets so the solid reads organic, not CAD-perfect.
const JITTER: [number, number, number][] = [
  [0.06, -0.03, 0.04],
  [-0.05, 0.05, -0.06],
  [0.03, 0.06, 0.05],
  [-0.06, -0.05, 0.02],
  [0.05, 0.02, -0.05],
  [-0.03, -0.06, -0.03],
  [0.06, 0.04, 0.03],
  [-0.04, 0.03, 0.06],
  [0.02, -0.05, -0.06],
  [-0.06, 0.02, 0.04],
  [0.04, 0.06, -0.02],
  [-0.02, -0.04, 0.05],
]

const NODES: THREE.Vector3[] = (
  [
    [-1, PHI, 0],
    [1, PHI, 0],
    [-1, -PHI, 0],
    [1, -PHI, 0],
    [0, -1, PHI],
    [0, 1, PHI],
    [0, -1, -PHI],
    [0, 1, -PHI],
    [PHI, 0, -1],
    [PHI, 0, 1],
    [-PHI, 0, -1],
    [-PHI, 0, 1],
  ] as [number, number, number][]
).map((p, i) =>
  new THREE.Vector3(...p).normalize().multiplyScalar(RADIUS).add(new THREE.Vector3(...JITTER[i]))
)

// Icosahedron edges: every vertex pair at the minimal chord distance.
const EDGES: [number, number][] = []
for (let i = 0; i < NODES.length; i++) {
  for (let j = i + 1; j < NODES.length; j++) {
    if (NODES[i].distanceTo(NODES[j]) < RADIUS * 1.3) EDGES.push([i, j])
  }
}

const NODE_RADII = [0.1, 0.075, 0.085, 0.07, 0.095, 0.08, 0.07, 0.09, 0.075, 0.085, 0.08, 0.07]

const ADJACENCY: number[][] = NODES.map((_, i) =>
  EDGES.filter(([a, b]) => a === i || b === i).map(([a, b]) => (a === i ? b : a))
)

const edgeKey = (a: number, b: number) => (a < b ? `${a}-${b}` : `${b}-${a}`)
const EDGE_INDEX = new Map<string, number>(EDGES.map(([a, b], i) => [edgeKey(a, b), i]))

// Soft radial sprite for the additive glow around each pulse.
function createGlowTexture(): THREE.CanvasTexture {
  const S = 128
  const canvas = document.createElement('canvas')
  canvas.width = S
  canvas.height = S
  const ctx = canvas.getContext('2d')!
  const g = ctx.createRadialGradient(S / 2, S / 2, 0, S / 2, S / 2, S / 2)
  g.addColorStop(0, 'rgba(29,158,117,1)')
  g.addColorStop(0.25, 'rgba(29,158,117,0.55)')
  g.addColorStop(0.6, 'rgba(29,158,117,0.12)')
  g.addColorStop(1, 'rgba(29,158,117,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, S, S)
  return new THREE.CanvasTexture(canvas)
}

// Per-frame energy written by pulses, read by nodes and edges.
type Energy = { nodes: Float32Array; edges: Float32Array }

const TRAIL = 7
const TRAIL_SPACING = 3 // frames between trail samples

// A point of light travelling node-to-node: white-hot core, soft additive
// glow, and a fading comet tail tracing where it has just been.
function Pulse({
  start,
  speed,
  energy,
  glow,
}: {
  start: number
  speed: number
  energy: Energy
  glow: THREE.Texture
}) {
  const ref = useRef<THREE.Group>(null)
  const glowRef = useRef<THREE.Mesh>(null)
  const trailRefs = useRef<(THREE.Mesh | null)[]>([])
  const state = useRef({
    from: start,
    to: ADJACENCY[start][0],
    t: Math.random(),
    seed: Math.random() * 100,
  })
  const history = useRef<THREE.Vector3[]>(
    Array.from({ length: TRAIL * TRAIL_SPACING + 1 }, () => NODES[start].clone())
  )

  useFrame(({ clock }, delta) => {
    const s = state.current
    const time = clock.elapsedTime
    const edgeLength = NODES[s.from].distanceTo(NODES[s.to])
    s.t += (delta * speed) / Math.max(edgeLength, 0.001)

    while (s.t >= 1) {
      s.t -= 1
      energy.nodes[s.to] = 1
      const options = ADJACENCY[s.to].filter((n) => n !== s.from)
      const next =
        options.length > 0 ? options[Math.floor(Math.random() * options.length)] : s.from
      s.from = s.to
      s.to = next
    }

    const ei = EDGE_INDEX.get(edgeKey(s.from, s.to))
    if (ei !== undefined) energy.edges[ei] = 1

    const g = ref.current
    if (!g) return
    g.position.lerpVectors(NODES[s.from], NODES[s.to], s.t)

    // Record the tail: rotate the oldest sample to the front.
    const h = history.current
    const oldest = h.pop()!
    oldest.copy(g.position)
    h.unshift(oldest)
    trailRefs.current.forEach((m, i) => {
      m?.position.copy(h[(i + 1) * TRAIL_SPACING])
    })

    // Calm breathing on the glow — alive, not flickering.
    if (glowRef.current) {
      glowRef.current.scale.setScalar(1 + 0.12 * Math.sin(time * 4 + s.seed))
    }
  })

  return (
    <>
      <group ref={ref}>
        <mesh>
          <sphereGeometry args={[0.034, 16, 16]} />
          <meshBasicMaterial color="#1D9E75" toneMapped={false} />
        </mesh>
        <Billboard>
          <mesh ref={glowRef}>
            <planeGeometry args={[0.5, 0.5]} />
            <meshBasicMaterial
              map={glow}
              transparent
              opacity={0.85}
              depthWrite={false}
              blending={THREE.AdditiveBlending}
              toneMapped={false}
            />
          </mesh>
        </Billboard>
        <pointLight intensity={1.5} distance={2.1} decay={2} color="#1D9E75" />
      </group>
      {Array.from({ length: TRAIL }, (_, i) => (
        <mesh key={i} ref={(m) => (trailRefs.current[i] = m)}>
          <sphereGeometry args={[0.026 * (1 - i / TRAIL) + 0.004, 8, 8]} />
          <meshBasicMaterial
            color="#1D9E75"
            transparent
            opacity={0.55 * (1 - i / TRAIL) ** 1.5}
            depthWrite={false}
            blending={THREE.NormalBlending}
            toneMapped={false}
          />
        </mesh>
      ))}
    </>
  )
}

function Node({ index, energy }: { index: number; energy: Energy }) {
  const matRef = useRef<THREE.MeshStandardMaterial>(null)

  useFrame(() => {
    if (matRef.current) matRef.current.emissiveIntensity = energy.nodes[index] * 1.6
  })

  return (
    <mesh position={NODES[index]}>
      <sphereGeometry args={[NODE_RADII[index], 40, 40]} />
      <meshStandardMaterial
        ref={matRef}
        color="#1a1a1a"
        emissive="#1D9E75"
        emissiveIntensity={0}
        metalness={0.22}
        roughness={0.62}
        envMapIntensity={0.85}
      />
    </mesh>
  )
}

function Edge({ index, energy }: { index: number; energy: Energy }) {
  const matRef = useRef<THREE.MeshStandardMaterial>(null)
  const [a, b] = EDGES[index]
  const { position, quaternion, length } = useMemo(() => {
    const d = new THREE.Vector3().subVectors(NODES[b], NODES[a])
    const length = d.length()
    const position = new THREE.Vector3().addVectors(NODES[a], NODES[b]).multiplyScalar(0.5)
    const quaternion = new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      d.clone().normalize()
    )
    return { position, quaternion, length }
  }, [a, b])

  useFrame(() => {
    if (matRef.current) matRef.current.emissiveIntensity = energy.edges[index] * 0.9
  })

  return (
    <mesh position={position} quaternion={quaternion}>
      <cylinderGeometry args={[0.012, 0.012, length, 8]} />
      <meshStandardMaterial
        ref={matRef}
        color="#2a2a2a"
        emissive="#1D9E75"
        emissiveIntensity={0}
        metalness={0.18}
        roughness={0.68}
        envMapIntensity={0.65}
        transparent
        opacity={0.5}
      />
    </mesh>
  )
}

function NodeNetwork() {
  const groupRef = useRef<THREE.Group>(null)
  const energy = useMemo<Energy>(
    () => ({
      nodes: new Float32Array(NODES.length),
      edges: new Float32Array(EDGES.length),
    }),
    []
  )
  const glow = useMemo(() => createGlowTexture(), [])

  useFrame(({ clock }, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.08
      groupRef.current.rotation.x = 0.12 + Math.sin(clock.elapsedTime * 0.15) * 0.05
    }
    // Fade the energy left behind by each pulse.
    const nDecay = Math.exp(-delta * 2.6)
    const eDecay = Math.exp(-delta * 3.6)
    for (let i = 0; i < energy.nodes.length; i++) energy.nodes[i] *= nDecay
    for (let i = 0; i < energy.edges.length; i++) energy.edges[i] *= eDecay
  })

  return (
    <group ref={groupRef} rotation={[0.12, 0, -0.04]}>
      {NODES.map((_, i) => (
        <Node key={`n${i}`} index={i} energy={energy} />
      ))}
      {EDGES.map((_, i) => (
        <Edge key={`e${i}`} index={i} energy={energy} />
      ))}
      <Pulse start={0} speed={0.6} energy={energy} glow={glow} />
      <Pulse start={6} speed={0.45} energy={energy} glow={glow} />
    </group>
  )
}

export default function NetworkHero() {
  return (
    <Canvas
      gl={{ alpha: true }}
      camera={{ position: [0, 0, 7], fov: 42 }}
      dpr={[1, 1.5]}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
    >
      <AdaptiveDpr />
      <Environment preset="city" />
      <ambientLight intensity={0.22} />
      {/* Key light: upper-right corner, strong directional source */}
      <directionalLight position={[6, 7, 3]} intensity={3.2} color="#ffffff" />
      {/* Secondary rim from upper-right but behind — catches back edges */}
      <pointLight position={[5, 5, -2]} intensity={1.1} distance={14} decay={2} color="#e8eaf0" />
      {/* Soft fill from lower-left to avoid pure black shadows */}
      <pointLight position={[-4, -2, 4]} intensity={0.45} distance={12} decay={2} color="#ffffff" />
      <NodeNetwork />
    </Canvas>
  )
}
