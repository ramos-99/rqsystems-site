import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { AdaptiveDpr, Environment } from '@react-three/drei'
import * as THREE from 'three'

function Knot() {
  const meshRef = useRef<THREE.Mesh>(null)
  const time = useRef(0)

  useFrame((_, delta) => {
    if (!meshRef.current) return

    time.current += delta
    meshRef.current.rotation.y += 0.004
    meshRef.current.rotation.x = Math.sin(time.current * 0.3) * 0.25
    meshRef.current.rotation.z = Math.cos(time.current * 0.2) * 0.15
  })

  return (
    <mesh ref={meshRef}>
      <torusKnotGeometry args={[0.85, 0.3, 300, 64, 2, 3]} />
      <meshStandardMaterial
        color="#3a3a3a"
        metalness={1}
        roughness={0.3}
        envMapIntensity={0.9}
      />
    </mesh>
  )
}

export default function ChromeKnot() {
  return (
    <Canvas
      gl={{ alpha: true }}
      camera={{ position: [0, 0, 4], fov: 42 }}
      dpr={[1, 1.5]}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
    >
      <AdaptiveDpr />
      <Environment preset="studio" />
      <ambientLight intensity={0.1} />
      <pointLight position={[4, 4, 4]} intensity={1.2} color="#ffffff" />
      <pointLight position={[-4, -2, 3]} intensity={0.8} color="#0F6E56" />
      <Knot />
    </Canvas>
  )
}
