import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { AdaptiveDpr, Environment } from '@react-three/drei'
import * as THREE from 'three'

// Alternating tiles, Resend-style: glossy piano-black and slightly lighter
// matte sections. Pattern and per-tile roughness are done in the shader.
const TILE_PATTERN = /* glsl */ `
  float tile = mod(floor(vKnotUv.x * 24.0) + floor(vKnotUv.y * 4.0), 2.0);
`

function TiledKnot() {
  const meshRef = useRef<THREE.Mesh>(null)
  const time = useRef(0)

  const material = useMemo(() => {
    const m = new THREE.MeshStandardMaterial({
      color: '#ffffff', // real colors are set per-tile in the fragment shader
      metalness: 0.9,
      roughness: 0.5, // placeholder; per-tile roughness set in shader
      envMapIntensity: 1.4,
    })

    m.onBeforeCompile = (shader) => {
      shader.vertexShader = shader.vertexShader
        .replace(
          '#include <common>',
          `#include <common>
           varying vec2 vKnotUv;`
        )
        .replace(
          '#include <uv_vertex>',
          `#include <uv_vertex>
           vKnotUv = uv;`
        )

      shader.fragmentShader = shader.fragmentShader
        .replace(
          '#include <common>',
          `#include <common>
           varying vec2 vKnotUv;`
        )
        .replace(
          '#include <color_fragment>',
          `#include <color_fragment>
           ${TILE_PATTERN}
           diffuseColor.rgb = mix(vec3(0.045), vec3(0.062), tile);`
        )
        .replace(
          '#include <roughnessmap_fragment>',
          `float tileR = mod(floor(vKnotUv.x * 24.0) + floor(vKnotUv.y * 4.0), 2.0);
           float roughnessFactor = mix(0.08, 0.45, tileR);`
        )
    }

    return m
  }, [])

  useFrame((_, delta) => {
    time.current += delta

    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.25
      meshRef.current.rotation.x = Math.sin(time.current * 0.15) * 0.2
      meshRef.current.rotation.z = Math.cos(time.current * 0.1) * 0.1
    }
  })

  return (
    <mesh ref={meshRef} material={material}>
      <torusKnotGeometry args={[0.85, 0.3, 300, 64, 2, 3]} />
    </mesh>
  )
}

export default function TiledResendKnot() {
  return (
    <Canvas
      gl={{ alpha: true }}
      camera={{ position: [0, 0, 4], fov: 42 }}
      dpr={[1, 1.5]}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
    >
      <AdaptiveDpr />
      <Environment preset="city" />
      <ambientLight intensity={0.15} />
      <pointLight position={[4, 5, 4]} intensity={1.8} color="#ffffff" />
      <pointLight position={[-4, -2, 3]} intensity={0.5} color="#0F6E56" />
      <TiledKnot />
    </Canvas>
  )
}
