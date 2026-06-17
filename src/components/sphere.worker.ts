/// <reference lib="webworker" />
import * as THREE from 'three'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'

// Imperative port of DisplacementSphere for an OffscreenCanvas running in a
// Web Worker: the whole WebGL render loop lives off the main thread. The
// declarative react-three-fiber version (DisplacementSphere.tsx) is kept as the
// fallback for browsers without OffscreenCanvas.

const RADIUS = 1.45
const PHI = (1 + Math.sqrt(5)) / 2
const GREEN = 0x1d9e75

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
  new THREE.Vector3(...p).normalize().multiplyScalar(RADIUS).add(new THREE.Vector3(...JITTER[i])),
)

const EDGES: [number, number][] = []
for (let i = 0; i < NODES.length; i++) {
  for (let j = i + 1; j < NODES.length; j++) {
    if (NODES[i].distanceTo(NODES[j]) < RADIUS * 1.3) EDGES.push([i, j])
  }
}

const NODE_RADII = [0.1, 0.075, 0.085, 0.07, 0.095, 0.08, 0.07, 0.09, 0.075, 0.085, 0.08, 0.07]

const ADJACENCY: number[][] = NODES.map((_, i) =>
  EDGES.filter(([a, b]) => a === i || b === i).map(([a, b]) => (a === i ? b : a)),
)

const edgeKey = (a: number, b: number) => (a < b ? `${a}-${b}` : `${b}-${a}`)
const EDGE_INDEX = new Map<string, number>(EDGES.map(([a, b], i) => [edgeKey(a, b), i]))

// Soft radial sprite for the additive glow around each pulse.
function createGlowTexture(): THREE.CanvasTexture {
  const S = 128
  const canvas = new OffscreenCanvas(S, S)
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

const TRAIL = 7
const TRAIL_SPACING = 3 // frames between trail samples

type Energy = { nodes: Float32Array; edges: Float32Array }

// A point of light travelling node-to-node: white-hot core, soft additive
// glow, and a fading comet tail tracing where it has just been.
class Pulse {
  group = new THREE.Group()
  private glowMesh: THREE.Mesh
  private trailMeshes: THREE.Mesh[] = []
  private from: number
  private to: number
  private t = Math.random()
  private seed = Math.random() * 100
  private history: THREE.Vector3[]
  private parentQuat = new THREE.Quaternion()

  constructor(
    start: number,
    private speed: number,
    private energy: Energy,
    glow: THREE.Texture,
    private camera: THREE.Camera,
    private parent: THREE.Object3D,
  ) {
    this.from = start
    this.to = ADJACENCY[start][0]
    this.history = Array.from({ length: TRAIL * TRAIL_SPACING + 1 }, () => NODES[start].clone())

    const core = new THREE.Mesh(
      new THREE.SphereGeometry(0.034, 16, 16),
      new THREE.MeshBasicMaterial({ color: GREEN, toneMapped: false }),
    )
    this.glowMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(0.5, 0.5),
      new THREE.MeshBasicMaterial({
        map: glow,
        transparent: true,
        opacity: 0.85,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        toneMapped: false,
      }),
    )
    const light = new THREE.PointLight(GREEN, 1.5, 2.1, 2)
    this.group.add(core, this.glowMesh, light)
    parent.add(this.group)

    for (let i = 0; i < TRAIL; i++) {
      const m = new THREE.Mesh(
        new THREE.SphereGeometry(0.026 * (1 - i / TRAIL) + 0.004, 8, 8),
        new THREE.MeshBasicMaterial({
          color: GREEN,
          transparent: true,
          opacity: 0.55 * (1 - i / TRAIL) ** 1.5,
          depthWrite: false,
          blending: THREE.NormalBlending,
          toneMapped: false,
        }),
      )
      this.trailMeshes.push(m)
      parent.add(m)
    }
  }

  update(delta: number, time: number) {
    const edgeLength = NODES[this.from].distanceTo(NODES[this.to])
    this.t += (delta * this.speed) / Math.max(edgeLength, 0.001)

    while (this.t >= 1) {
      this.t -= 1
      this.energy.nodes[this.to] = 1
      const options = ADJACENCY[this.to].filter((n) => n !== this.from)
      const next = options.length > 0 ? options[Math.floor(Math.random() * options.length)] : this.from
      this.from = this.to
      this.to = next
    }

    const ei = EDGE_INDEX.get(edgeKey(this.from, this.to))
    if (ei !== undefined) this.energy.edges[ei] = 1

    this.group.position.lerpVectors(NODES[this.from], NODES[this.to], this.t)

    // Record the tail: rotate the oldest sample to the front.
    const h = this.history
    const oldest = h.pop()!
    oldest.copy(this.group.position)
    h.unshift(oldest)
    this.trailMeshes.forEach((m, i) => m.position.copy(h[(i + 1) * TRAIL_SPACING]))

    // Calm breathing on the glow — alive, not flickering.
    this.glowMesh.scale.setScalar(1 + 0.12 * Math.sin(time * 4 + this.seed))

    // Billboard the glow toward the camera, accounting for the rotating parent.
    this.parent.getWorldQuaternion(this.parentQuat)
    this.glowMesh.quaternion.copy(this.parentQuat).invert().multiply(this.camera.quaternion)
  }
}

function buildScene(renderer: THREE.WebGLRenderer) {
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100)
  camera.position.set(0, 0, 7)

  // Neutral studio reflections (substitute for drei's Environment preset="city").
  const pmrem = new THREE.PMREMGenerator(renderer)
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture

  scene.add(new THREE.AmbientLight(0xffffff, 0.22))
  const key = new THREE.DirectionalLight(0xffffff, 3.2)
  key.position.set(6, 7, 3)
  scene.add(key)
  const rim = new THREE.PointLight(0xe8eaf0, 1.1, 14, 2)
  rim.position.set(5, 5, -2)
  scene.add(rim)
  const fill = new THREE.PointLight(0xffffff, 0.45, 12, 2)
  fill.position.set(-4, -2, 4)
  scene.add(fill)

  const group = new THREE.Group()
  group.rotation.set(0.12, 0, -0.04)
  scene.add(group)

  const energy: Energy = {
    nodes: new Float32Array(NODES.length),
    edges: new Float32Array(EDGES.length),
  }

  // Nodes
  const nodeMats: THREE.MeshStandardMaterial[] = []
  NODES.forEach((pos, i) => {
    const mat = new THREE.MeshStandardMaterial({
      color: 0x1a1a1a,
      emissive: GREEN,
      emissiveIntensity: 0,
      metalness: 0.22,
      roughness: 0.62,
      envMapIntensity: 0.85,
    })
    nodeMats.push(mat)
    const mesh = new THREE.Mesh(new THREE.SphereGeometry(NODE_RADII[i], 40, 40), mat)
    mesh.position.copy(pos)
    group.add(mesh)
  })

  // Edges
  const edgeMats: THREE.MeshStandardMaterial[] = []
  const up = new THREE.Vector3(0, 1, 0)
  EDGES.forEach(([a, b]) => {
    const d = new THREE.Vector3().subVectors(NODES[b], NODES[a])
    const length = d.length()
    const mat = new THREE.MeshStandardMaterial({
      color: 0x2a2a2a,
      emissive: GREEN,
      emissiveIntensity: 0,
      metalness: 0.18,
      roughness: 0.68,
      envMapIntensity: 0.65,
      transparent: true,
      opacity: 0.5,
    })
    edgeMats.push(mat)
    const mesh = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, length, 8), mat)
    mesh.position.addVectors(NODES[a], NODES[b]).multiplyScalar(0.5)
    mesh.quaternion.setFromUnitVectors(up, d.clone().normalize())
    group.add(mesh)
  })

  const glow = createGlowTexture()
  const pulses = [
    new Pulse(0, 0.6, energy, glow, camera, group),
    new Pulse(6, 0.45, energy, glow, camera, group),
  ]

  function update(delta: number, time: number) {
    group.rotation.y += delta * 0.08
    group.rotation.x = 0.12 + Math.sin(time * 0.15) * 0.05

    for (const p of pulses) p.update(delta, time)

    for (let i = 0; i < nodeMats.length; i++) nodeMats[i].emissiveIntensity = energy.nodes[i] * 1.6
    for (let i = 0; i < edgeMats.length; i++) edgeMats[i].emissiveIntensity = energy.edges[i] * 0.9

    // Fade the energy left behind by each pulse.
    const nDecay = Math.exp(-delta * 2.6)
    const eDecay = Math.exp(-delta * 3.6)
    for (let i = 0; i < energy.nodes.length; i++) energy.nodes[i] *= nDecay
    for (let i = 0; i < energy.edges.length; i++) energy.edges[i] *= eDecay
  }

  return { scene, camera, update }
}

let renderer: THREE.WebGLRenderer | null = null
let scene: THREE.Scene
let camera: THREE.PerspectiveCamera
let update: (delta: number, time: number) => void
let running = false
let last = 0
let dpr = 1

// requestAnimationFrame exists in workers that own an OffscreenCanvas in
// modern browsers; fall back to a timer where it doesn't.
const schedule: (cb: (t: number) => void) => void =
  typeof requestAnimationFrame === 'function'
    ? (cb) => requestAnimationFrame(cb)
    : (cb) => setTimeout(() => cb(performance.now()), 1000 / 60)

function loop(now: number) {
  if (!running || !renderer) return
  const delta = last ? Math.min((now - last) / 1000, 0.1) : 0
  last = now
  update(delta, now / 1000)
  renderer.render(scene, camera)
  schedule(loop)
}

self.onmessage = (e: MessageEvent) => {
  const data = e.data
  if (data.type === 'init') {
    const canvas: OffscreenCanvas = data.canvas
    dpr = data.dpr || 1
    renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    })
    renderer.setPixelRatio(dpr)
    renderer.setClearColor(0x000000, 0)
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.setSize(data.width, data.height, false)
    const built = buildScene(renderer)
    scene = built.scene
    camera = built.camera
    update = built.update
    camera.aspect = data.width / data.height
    camera.updateProjectionMatrix()
    running = true
    last = 0
    schedule(loop)
  } else if (data.type === 'resize' && renderer && camera) {
    dpr = data.dpr || dpr
    renderer.setPixelRatio(dpr)
    renderer.setSize(data.width, data.height, false)
    camera.aspect = data.width / Math.max(data.height, 1)
    camera.updateProjectionMatrix()
  } else if (data.type === 'dispose') {
    running = false
    renderer?.dispose()
    renderer = null
  }
}
