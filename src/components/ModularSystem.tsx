'use client';
import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

// ============================================================
// Integration engine, reference-style: smoked-glass modules and
// a glass data bus, joined by conduits with VISIBLE electricity.
// Sockets on the bus act as powered outlets (data ingestion).
// Monochrome: graphite, smoked glass, white light only.
// ============================================================

// --- Opaque structure ---
const graphiteMaterial = new THREE.MeshStandardMaterial({
  color: '#1f1f1f',
  roughness: 0.4,
  metalness: 0.7,
  envMapIntensity: 0.9,
});

const graphiteDarkMaterial = new THREE.MeshStandardMaterial({
  color: '#161616',
  roughness: 0.5,
  metalness: 0.6,
  envMapIntensity: 0.7,
});

const metalEdgeMaterial = new THREE.MeshStandardMaterial({
  color: '#2e2e2e',
  roughness: 0.22,
  metalness: 0.95,
  envMapIntensity: 1.3,
});

// --- Glass ---
// Module shells: smoked glass with visible internals.
const moduleGlassMaterial = new THREE.MeshPhysicalMaterial({
  color: '#1c1c1c',
  roughness: 0.12,
  metalness: 0.4,
  transparent: true,
  opacity: 0.55,
  depthWrite: false,
  clearcoat: 1,
  clearcoatRoughness: 0.2,
  envMapIntensity: 1.3,
});

// Clear glass: low reflectivity so the electricity inside dominates,
// instead of the casing reading as a solid grey slab.
const spineGlassMaterial = new THREE.MeshPhysicalMaterial({
  color: '#161616',
  roughness: 0.06,
  metalness: 0.05,
  transparent: true,
  opacity: 0.22,
  depthWrite: false,
  clearcoat: 1,
  clearcoatRoughness: 0.15,
  envMapIntensity: 0.5,
  side: THREE.DoubleSide,
});

const conduitGlassMaterial = new THREE.MeshPhysicalMaterial({
  color: '#1d1d1d',
  roughness: 0.1,
  metalness: 0.1,
  transparent: true,
  opacity: 0.22,
  depthWrite: false,
  envMapIntensity: 0.6,
});

const panelGlassMaterial = new THREE.MeshPhysicalMaterial({
  color: '#0c0c0c',
  roughness: 0.1,
  metalness: 0.55,
  transparent: true,
  opacity: 0.85,
  clearcoat: 0.8,
  clearcoatRoughness: 0.3,
  envMapIntensity: 1.1,
});

const frameMaterial = new THREE.MeshStandardMaterial({
  color: '#292929',
  roughness: 0.3,
  metalness: 0.85,
  envMapIntensity: 1.1,
});

// --- Light / electricity ---
const glowMaterial = new THREE.MeshBasicMaterial({ color: '#ffffff' });

// Additive halos fake the bloom around anything bright.
const haloMaterial = new THREE.MeshBasicMaterial({
  color: '#ffffff',
  transparent: true,
  opacity: 0.32,
  depthWrite: false,
  blending: THREE.AdditiveBlending,
});

const haloFaintMaterial = new THREE.MeshBasicMaterial({
  color: '#ffffff',
  transparent: true,
  opacity: 0.13,
  depthWrite: false,
  blending: THREE.AdditiveBlending,
});

// Bright electricity core inside conduits
const conduitCoreMaterial = new THREE.MeshBasicMaterial({
  color: '#ffffff',
  transparent: true,
  opacity: 0.85,
  depthWrite: false,
});

// Bright dotted energy line through the spine
const dashBrightMaterial = new THREE.MeshBasicMaterial({
  color: '#ffffff',
  transparent: true,
  opacity: 0.85,
  depthWrite: false,
});

const dashFaintMaterial = new THREE.MeshBasicMaterial({
  color: '#ffffff',
  transparent: true,
  opacity: 0.35,
  depthWrite: false,
});

const iconMaterial = new THREE.MeshStandardMaterial({
  color: '#c4c4c4',
  emissive: '#ffffff',
  emissiveIntensity: 0.5,
  roughness: 0.4,
  metalness: 0.1,
});

// --- Icons (primitives only) ---

function DocIcon() {
  const widths = [0.34, 0.24, 0.3, 0.19];
  return (
    <group scale={0.85}>
      {widths.map((w, i) => (
        <mesh key={i} position={[(w - 0.34) / 2, 0.11 - i * 0.078, 0]} material={iconMaterial}>
          <boxGeometry args={[w, 0.028, 0.016]} />
        </mesh>
      ))}
    </group>
  );
}

function BarChartIcon() {
  const heights = [0.09, 0.18, 0.26, 0.14];
  return (
    <group scale={0.85}>
      {heights.map((h, i) => (
        <mesh key={i} position={[-0.12 + i * 0.08, h / 2 - 0.13, 0]} material={iconMaterial}>
          <boxGeometry args={[0.042, h, 0.016]} />
        </mesh>
      ))}
    </group>
  );
}

function UserIcon() {
  return (
    <group scale={0.85}>
      <mesh position={[-0.1, 0.055, 0]} material={iconMaterial}>
        <sphereGeometry args={[0.042, 20, 20]} />
      </mesh>
      <mesh position={[-0.1, -0.05, 0]} material={iconMaterial}>
        <cylinderGeometry args={[0.065, 0.078, 0.055, 20]} />
      </mesh>
      <mesh position={[0.1, 0.04, 0]} material={iconMaterial}>
        <boxGeometry args={[0.19, 0.024, 0.016]} />
      </mesh>
      <mesh position={[0.075, -0.035, 0]} material={iconMaterial}>
        <boxGeometry args={[0.14, 0.024, 0.016]} />
      </mesh>
    </group>
  );
}

function CloudIcon() {
  return (
    <group scale={[0.85, 0.85, 0.38]}>
      <mesh position={[-0.075, -0.008, 0]} material={iconMaterial}>
        <sphereGeometry args={[0.064, 20, 20]} />
      </mesh>
      <mesh position={[0.016, 0.032, 0]} material={iconMaterial}>
        <sphereGeometry args={[0.08, 20, 20]} />
      </mesh>
      <mesh position={[0.104, -0.008, 0]} material={iconMaterial}>
        <sphereGeometry args={[0.056, 20, 20]} />
      </mesh>
      <mesh position={[0.016, -0.04, 0]} material={iconMaterial}>
        <boxGeometry args={[0.24, 0.056, 0.1]} />
      </mesh>
    </group>
  );
}

// --- Bright node with additive halo (fake bloom) ---
function GlowNode({
  position,
  phase = 0,
  size = 0.04,
  reduced,
}: {
  position: [number, number, number];
  phase?: number;
  size?: number;
  reduced: boolean;
}) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (reduced || !ref.current) return;
    ref.current.scale.setScalar(1 + 0.2 * Math.sin(state.clock.elapsedTime * 2 + phase));
  });
  return (
    <group ref={ref} position={position}>
      <mesh material={glowMaterial}>
        <sphereGeometry args={[size, 16, 16]} />
      </mesh>
      <mesh material={haloMaterial}>
        <sphereGeometry args={[size * 2.2, 16, 16]} />
      </mesh>
      <mesh material={haloFaintMaterial}>
        <sphereGeometry args={[size * 4.2, 16, 16]} />
      </mesh>
    </group>
  );
}

// --- A packet of electricity travelling along a curve ---
function PathPulse({
  curve,
  speed,
  phase,
  size = 0.028,
  withLight = false,
  reverse = false,
  reduced,
}: {
  curve: THREE.Curve<THREE.Vector3>;
  speed: number;
  phase: number;
  size?: number;
  withLight?: boolean;
  reverse?: boolean;
  reduced: boolean;
}) {
  const ref = useRef<THREE.Group>(null);
  const dir = useMemo(() => new THREE.Vector3(), []);
  const quat = useMemo(() => new THREE.Quaternion(), []);
  const Z = useMemo(() => new THREE.Vector3(0, 0, 1), []);
  useFrame((state) => {
    if (!ref.current) return;
    let t = reduced ? 0.5 : (state.clock.elapsedTime * speed + phase) % 1;
    if (reverse) t = 1 - t;
    const p = curve.getPointAt(t);
    ref.current.position.copy(p);
    // orient along direction of travel so the tail trails behind
    const t2 = reverse ? Math.max(t - 0.03, 0) : Math.min(t + 0.03, 1);
    dir.copy(curve.getPointAt(t2)).sub(p);
    if (dir.lengthSq() > 1e-8) {
      quat.setFromUnitVectors(Z, dir.normalize());
      ref.current.quaternion.copy(quat);
    }
    const s = Math.sin(t * Math.PI);
    ref.current.scale.setScalar(0.45 + 0.55 * s);
  });
  return (
    <group ref={ref}>
      <mesh material={glowMaterial}>
        <sphereGeometry args={[size, 12, 12]} />
      </mesh>
      <mesh material={haloMaterial}>
        <sphereGeometry args={[size * 2.4, 12, 12]} />
      </mesh>
      <mesh material={haloFaintMaterial}>
        <sphereGeometry args={[size * 4.5, 12, 12]} />
      </mesh>
      {/* comet tail trailing behind the packet */}
      <mesh position={[0, 0, -size * 3]} scale={[1, 1, 3.5]} material={haloMaterial}>
        <sphereGeometry args={[size * 1.2, 10, 10]} />
      </mesh>
      {withLight && <pointLight intensity={0.8} distance={1.4} decay={2} color="#ffffff" />}
    </group>
  );
}

// --- Particles drifting inside the glass spine ---
function SpineParticles({ reduced }: { reduced: boolean }) {
  const seeds = useMemo(
    () =>
      Array.from({ length: 16 }, (_, i) => ({
        speed: 0.18 + (i % 5) * 0.06,
        offset: (i / 16) * 4.6,
        fy: 0.6 + (i % 3) * 0.4,
        fz: 0.8 + (i % 4) * 0.3,
        phase: i * 1.7,
      })),
    []
  );
  const refs = useRef<(THREE.Mesh | null)[]>([]);

  useFrame((state) => {
    const t = reduced ? 0 : state.clock.elapsedTime;
    seeds.forEach((s, i) => {
      const m = refs.current[i];
      if (!m) return;
      const x = ((s.offset + t * s.speed) % 4.6) - 2.3;
      m.position.set(
        x,
        Math.sin(t * s.fy + s.phase) * 0.14,
        Math.cos(t * s.fz + s.phase) * 0.14
      );
    });
  });

  return (
    <group>
      {seeds.map((_, i) => (
        <mesh key={i} ref={(el) => (refs.current[i] = el)} material={dashFaintMaterial}>
          <sphereGeometry args={[0.014, 8, 8]} />
        </mesh>
      ))}
    </group>
  );
}

// --- Powered socket / outlet on the bus: where data plugs in ---
function Socket({
  position,
  plateY,
  phase = 0,
  reduced,
}: {
  position: [number, number, number];
  plateY: number;
  phase?: number;
  reduced: boolean;
}) {
  return (
    <group position={position}>
      {/* metallic mount plate on the surface */}
      <RoundedBox args={[0.22, 0.045, 0.22]} radius={0.02} smoothness={3} position={[0, plateY, 0]} material={metalEdgeMaterial} />
      {/* the glowing outlet itself */}
      <RoundedBox args={[0.14, 0.05, 0.14]} radius={0.02} smoothness={3} position={[0, plateY * 0.4, 0]} material={glowMaterial} />
      {/* bloom around the powered interface */}
      <mesh position={[0, plateY * 0.4, 0]} material={haloMaterial}>
        <sphereGeometry args={[0.14, 16, 16]} />
      </mesh>
      <mesh position={[0, plateY * 0.4, 0]} material={haloFaintMaterial}>
        <sphereGeometry args={[0.26, 16, 16]} />
      </mesh>
      {/* collar where the conduit enters */}
      <mesh material={metalEdgeMaterial}>
        <cylinderGeometry args={[0.05, 0.062, 0.1, 16]} />
      </mesh>
      <GlowNode position={[0, 0, 0]} size={0.035} phase={phase} reduced={reduced} />
    </group>
  );
}

// --- A service module: smoked-glass shell over a graphite core ---
function Module({
  position,
  rotation = [0, 0, 0],
  reduced,
  phase = 0,
  children,
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
  reduced: boolean;
  phase?: number;
  children: React.ReactNode;
}) {
  return (
    <group position={position} rotation={rotation}>
      {/* inner graphite machinery, visible through the shell */}
      <RoundedBox args={[0.6, 0.42, 0.26]} radius={0.04} smoothness={4} material={graphiteDarkMaterial} />
      {/* inner detail ribs */}
      {[-0.18, 0, 0.18].map((x, i) => (
        <mesh key={i} position={[x, 0, -0.1]} material={graphiteMaterial}>
          <boxGeometry args={[0.06, 0.46, 0.1]} />
        </mesh>
      ))}
      {/* icon panel floating at the front of the glass */}
      <RoundedBox args={[0.58, 0.4, 0.03]} radius={0.025} smoothness={4} position={[0, 0, 0.19]} material={panelGlassMaterial} />
      <group position={[0, 0, 0.215]}>{children}</group>
      {/* smoked-glass shell */}
      <RoundedBox args={[0.8, 0.6, 0.46]} radius={0.06} smoothness={4} material={moduleGlassMaterial} />
      {/* metallic frame edge */}
      <mesh position={[0, 0.31, 0]} material={metalEdgeMaterial}>
        <boxGeometry args={[0.7, 0.014, 0.34]} />
      </mesh>
      {/* side indicator lights */}
      <GlowNode position={[0.41, 0.12, 0.08]} size={0.014} phase={phase} reduced={reduced} />
      <GlowNode position={[0.41, 0.05, 0.08]} size={0.011} phase={phase + 1.4} reduced={reduced} />
    </group>
  );
}

// --- The full system ---
function Pipeline({ reduced }: { reduced: boolean }) {
  const groupRef = useRef<THREE.Group>(null);

  const connectors = useMemo(() => {
    const defs: [number, number, number][][] = [
      [
        [-1.7, 0.9, -0.15],
        [-1.58, 0.5, 0.0],
        [-1.2, 0.3, 0.0],
      ],
      [
        [1.65, 1.0, -0.45],
        [1.5, 0.55, -0.2],
        [1.25, 0.3, 0.0],
      ],
      [
        [-1.4, -0.9, 0.35],
        [-1.28, -0.55, 0.18],
        [-0.95, -0.3, 0.0],
      ],
      [
        [1.5, -0.9, 0.2],
        [1.38, -0.54, 0.1],
        [1.0, -0.3, 0.0],
      ],
    ];
    return defs.map(
      (pts) => new THREE.CatmullRomCurve3(pts.map((p) => new THREE.Vector3(...p)))
    );
  }, []);

  // Energy lanes through the open glass bus
  const lanes = useMemo(
    () => [
      new THREE.LineCurve3(new THREE.Vector3(-2.4, 0, 0), new THREE.Vector3(2.4, 0, 0)),
      new THREE.LineCurve3(new THREE.Vector3(-2.4, 0.14, 0.08), new THREE.Vector3(2.4, 0.14, 0.08)),
      new THREE.LineCurve3(new THREE.Vector3(-2.4, -0.14, 0.12), new THREE.Vector3(2.4, -0.14, 0.12)),
    ],
    []
  );

  const dashes = useMemo(() => {
    const arr: number[] = [];
    for (let x = -2.3; x <= 2.1; x += 0.15) arr.push(x);
    return arr;
  }, []);

  const ribs = useMemo(() => {
    const arr: number[] = [];
    for (let x = -2.0; x <= 2.0; x += 0.66) arr.push(x);
    return arr;
  }, []);

  const dashFlowRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current || reduced) return;
    const t = state.clock.elapsedTime;
    groupRef.current.position.y = Math.sin(t * 0.35) * 0.06;
    const targetY = -0.52 + Math.sin(t * 0.08) * 0.03 + state.pointer.x * 0.05;
    const targetX = 0.4 + Math.sin(t * 0.12) * 0.015 - state.pointer.y * 0.03;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetY, 0.04);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetX, 0.04);
    if (dashFlowRef.current) dashFlowRef.current.position.x = (t * 0.5) % 0.15;
  });

  return (
    <group ref={groupRef} rotation={[0.4, -0.52, 0.03]} scale={0.92}>
      {/* ============ The glass data bus ============ */}
      {/* floor deck inside the casing */}
      <mesh position={[0, -0.24, 0]} material={graphiteDarkMaterial}>
        <boxGeometry args={[4.9, 0.05, 0.44]} />
      </mesh>
      {/* internal bulkhead frames */}
      {ribs.map((x, i) => (
        <mesh key={i} position={[x, 0, 0]} material={graphiteMaterial}>
          <boxGeometry args={[0.03, 0.48, 0.48]} />
        </mesh>
      ))}
      {/* THE energy line: continuous bright beam + flowing dashes */}
      <mesh rotation={[0, 0, Math.PI / 2]} material={conduitCoreMaterial}>
        <cylinderGeometry args={[0.012, 0.012, 4.7, 10]} />
      </mesh>
      <group ref={dashFlowRef}>
        {dashes.map((x, i) => (
          <mesh key={i} position={[x, 0, 0]} material={dashBrightMaterial}>
            <boxGeometry args={[0.09, 0.032, 0.032]} />
          </mesh>
        ))}
      </group>
      {/* halo sleeve around the energy line */}
      <mesh rotation={[0, 0, Math.PI / 2]} material={haloFaintMaterial}>
        <cylinderGeometry args={[0.09, 0.09, 4.65, 12]} />
      </mesh>
      {/* electricity packets racing on three lanes */}
      {[0, 0.16, 0.33, 0.5, 0.66, 0.83].map((phase, i) => (
        <PathPulse key={`a${i}`} curve={lanes[0]} speed={0.45} phase={phase} size={0.045} reduced={reduced} />
      ))}
      {[0.08, 0.33, 0.58, 0.83].map((phase, i) => (
        <PathPulse key={`b${i}`} curve={lanes[1]} speed={0.3} phase={phase} size={0.03} reduced={reduced} />
      ))}
      {[0, 0.25, 0.5, 0.75].map((phase, i) => (
        <PathPulse key={`c${i}`} curve={lanes[2]} speed={0.6} phase={phase} size={0.035} reduced={reduced} />
      ))}
      <SpineParticles reduced={reduced} />
      {/* the bus is powered: light from within */}
      <pointLight position={[0, 0, 0]} intensity={1.3} distance={2.6} decay={2} color="#ffffff" />
      <pointLight position={[-1.6, 0, 0]} intensity={0.35} distance={1.6} decay={2} color="#ffffff" />
      <pointLight position={[1.6, 0, 0]} intensity={0.35} distance={1.6} decay={2} color="#ffffff" />
      {/* smoked-glass casing */}
      <RoundedBox args={[5.1, 0.66, 0.66]} radius={0.1} smoothness={4} material={spineGlassMaterial} />
      {/* reflective edge rails */}
      {[
        [0.31, 0.31],
        [0.31, -0.31],
        [-0.31, 0.31],
        [-0.31, -0.31],
      ].map(([y, z], i) => (
        <mesh key={i} position={[0, y, z]} material={metalEdgeMaterial}>
          <boxGeometry args={[5.05, 0.016, 0.016]} />
        </mesh>
      ))}
      {/* end caps with a charged core peeking out */}
      {[-2.62, 2.62].map((x, i) => (
        <group key={i} position={[x, 0, 0]}>
          <RoundedBox args={[0.16, 0.72, 0.72]} radius={0.05} smoothness={4} material={graphiteMaterial} />
          <GlowNode position={[i === 0 ? -0.09 : 0.09, 0, 0]} size={0.028} phase={i * 2} reduced={reduced} />
        </group>
      ))}

      {/* ============ Service modules ============ */}
      <Module position={[-1.7, 1.2, -0.15]} rotation={[0.06, 0.18, 0]} reduced={reduced} phase={0.3}>
        <DocIcon />
      </Module>
      <Module position={[1.65, 1.3, -0.45]} rotation={[0.06, -0.15, 0]} reduced={reduced} phase={1.1}>
        <BarChartIcon />
      </Module>
      <Module position={[-1.4, -1.2, 0.35]} rotation={[-0.05, 0.15, 0]} reduced={reduced} phase={2.2}>
        <UserIcon />
      </Module>
      <Module position={[1.5, -1.2, 0.2]} rotation={[-0.05, -0.12, 0]} reduced={reduced} phase={3.0}>
        <CloudIcon />
      </Module>

      {/* ============ Conduits: visible electricity ============ */}
      {connectors.map((curve, i) => {
        const start = curve.getPointAt(0);
        const end = curve.getPointAt(1);
        return (
          <group key={i}>
            {/* bright electricity core */}
            <mesh material={conduitCoreMaterial}>
              <tubeGeometry args={[curve, 40, 0.016, 8, false]} />
            </mesh>
            {/* additive glow sleeve around the core */}
            <mesh material={haloMaterial}>
              <tubeGeometry args={[curve, 40, 0.03, 8, false]} />
            </mesh>
            {/* outer glass sleeve */}
            <mesh material={conduitGlassMaterial}>
              <tubeGeometry args={[curve, 40, 0.042, 10, false]} />
            </mesh>
            {/* powered outlets: module side + bus side */}
            <Socket position={[start.x, start.y, start.z]} phase={i * 1.3} plateY={i < 2 ? 0.05 : -0.05} reduced={reduced} />
            <Socket position={[end.x, end.y, end.z]} phase={i * 1.3 + 0.7} plateY={i < 2 ? -0.05 : 0.05} reduced={reduced} />
            {/* packets: the bus feeds the modules */}
            <PathPulse curve={curve} speed={0.55} phase={i * 0.27} size={0.045} withLight reverse reduced={reduced} />
            <PathPulse curve={curve} speed={0.55} phase={i * 0.27 + 0.5} size={0.032} reverse reduced={reduced} />
          </group>
        );
      })}
    </group>
  );
}

export default function ModularSystem() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return (
    <div className="w-full h-full relative" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 9.5], fov: 36 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true }}
      >
        <Environment preset="city" />

        <ambientLight intensity={0.28} />
        <directionalLight position={[-4, 6, 6]} intensity={1.5} color="#ffffff" />
        <directionalLight position={[6, 2, -5]} intensity={1.3} color="#ffffff" />
        <pointLight position={[0, 0.5, 4]} intensity={0.4} distance={10} color="#ffffff" />

        <Pipeline reduced={reduced} />
      </Canvas>
    </div>
  );
}
