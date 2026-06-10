import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { AdaptiveDpr, Environment } from '@react-three/drei'
import * as THREE from 'three'

// Abstract network: 8 nodes connected by thin edges, black-on-black,
// slow continuous rotation around the vertical axis.
const NODES: [number, number, number][] = [
  [0.0, 1.15, 0.0],
  [0.95, 0.45, -0.5],
  [-0.9, 0.55, 0.45],
  [0.55, -0.25, 0.85],
  [-0.6, -0.35, -0.8],
  [1.05, -0.85, 0.15],
  [-1.0, -0.95, -0.25],
  [0.05, -1.2, -0.7],
]

const EDGES: [number, number][] = [
  [0, 1],
  [0, 2],
  [1, 3],
  [1, 5],
  [2, 3],
  [2, 4],
  [3, 5],
  [4, 6],
  [4, 7],
  [5, 7],
  [6, 7],
  [2, 6],
]

const NODE_RADII = [0.14, 0.11, 0.12, 0.1, 0.11, 0.13, 0.1, 0.09]

const ADJACENCY: number[][] = NODES.map((_, i) =>
  EDGES.filter(([a, b]) => a === i || b === i).map(([a, b]) => (a === i ? b : a))
)

// A point of light travelling node-to-node along the edges, lighting
// whatever it passes. Constant speed in world units per second.
function Pulse({
  points,
  start,
  speed,
}: {
  points: THREE.Vector3[]
  start: number
  speed: number
}) {
  const ref = useRef<THREE.Group>(null)
  const state = useRef({
    from: start,
    to: ADJACENCY[start][0],
    t: Math.random(),
  })

  useFrame((_, delta) => {
    const s = state.current
    const edgeLength = points[s.from].distanceTo(points[s.to])
    s.t += (delta * speed) / edgeLength

    while (s.t >= 1) {
      s.t -= 1
      const options = ADJACENCY[s.to].filter((n) => n !== s.from)
      const next =
        options.length > 0
          ? options[Math.floor(Math.random() * options.length)]
          : s.from
      s.from = s.to
      s.to = next
    }

    ref.current?.position.lerpVectors(points[s.from], points[s.to], s.t)
  })

  return (
    <group ref={ref}>
      <mesh>
        <sphereGeometry args={[0.032, 16, 16]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      <pointLight intensity={1.1} distance={1.7} decay={2} color="#ffffff" />
    </group>
  )
}

function Edge({
  from,
  to,
  material,
}: {
  from: THREE.Vector3
  to: THREE.Vector3
  material: THREE.Material
}) {
  const { position, quaternion, length } = useMemo(() => {
    const dir = new THREE.Vector3().subVectors(to, from)
    const length = dir.length()
    const position = new THREE.Vector3().addVectors(from, to).multiplyScalar(0.5)
    const quaternion = new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      dir.clone().normalize()
    )
    return { position, quaternion, length }
  }, [from, to])

  return (
    <mesh position={position} quaternion={quaternion} material={material}>
      <cylinderGeometry args={[0.016, 0.016, length, 10]} />
    </mesh>
  )
}

function NodeNetwork() {
  const groupRef = useRef<THREE.Group>(null)

  const nodeMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#161616',
        metalness: 0.2,
        roughness: 0.82,
        envMapIntensity: 0.45,
      }),
    []
  )

  const edgeMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#101010',
        metalness: 0.15,
        roughness: 0.9,
        envMapIntensity: 0.3,
      }),
    []
  )

  const points = useMemo(() => NODES.map((p) => new THREE.Vector3(...p)), [])

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.08
    }
  })

  return (
    <group ref={groupRef} rotation={[0.12, 0, -0.04]}>
      {points.map((p, i) => (
        <mesh key={`n${i}`} position={p} material={nodeMaterial}>
          <sphereGeometry args={[NODE_RADII[i], 40, 40]} />
        </mesh>
      ))}
      {EDGES.map(([a, b], i) => (
        <Edge key={`e${i}`} from={points[a]} to={points[b]} material={edgeMaterial} />
      ))}
      <Pulse points={points} start={0} speed={0.55} />
      <Pulse points={points} start={5} speed={0.4} />
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
      <ambientLight intensity={0.12} />
      <pointLight position={[4, 5, 4]} intensity={1.4} color="#ffffff" />
      <pointLight position={[-4, -2, 3]} intensity={0.35} color="#ffffff" />
      <NodeNetwork />
    </Canvas>
  )
}
