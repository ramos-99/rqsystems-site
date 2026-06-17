import React, { useMemo } from 'react';

/* Monochrome brand marks (single-path, filled with currentColor). */
const PATHS: Record<string, string> = {
  excel:
    'M23 1.5q.41 0 .7.3.3.29.3.7v19q0 .41-.3.7-.29.3-.7.3H7q-.41 0-.7-.3-.3-.29-.3-.7V18H1q-.41 0-.7-.3-.3-.29-.3-.7V7q0-.41.3-.7Q.58 6 1 6h5V2.5q0-.41.3-.7.29-.3.7-.3zM6 13.28l1.42 2.66h2.14l-2.38-3.87 2.34-3.8H7.46l-1.3 2.4-.05.08-.04.09-.64-1.28-.66-1.29H2.59l2.27 3.82-2.48 3.85h2.16zM14.25 21v-3H7.5v3zm0-4.5v-3.75H12v3.75zm0-5.25V7.5H12v3.75zm0-5.25V3H7.5v3zm8.25 15v-3h-6.75v3zm0-4.5v-3.75h-6.75v3.75zm0-5.25V7.5h-6.75v3.75zm0-5.25V3h-6.75v3Z',
  outlook:
    'M7.88 12.04q0 .45-.11.87-.1.41-.33.74-.22.33-.58.52-.37.2-.87.2t-.85-.2q-.35-.21-.57-.55-.22-.33-.33-.75-.1-.42-.1-.86t.1-.87q.1-.43.34-.76.22-.34.59-.54.36-.2.87-.2t.86.2q.35.21.57.55.22.34.31.77.1.43.1.88zM24 12v9.38q0 .46-.33.8-.33.32-.8.32H7.13q-.46 0-.8-.33-.32-.33-.32-.8V18H1q-.41 0-.7-.3-.3-.29-.3-.7V7q0-.41.3-.7Q.58 6 1 6h6.5V2.55q0-.44.3-.75.3-.3.75-.3h12.9q.44 0 .75.3.3.3.3.75V10.85l1.24.72h.01q.1.07.18.18.07.12.07.25zm-6-8.25v3h3v-3zm0 4.5v3h3v-3zm0 4.5v1.83l3.05-1.83zm-5.25-9v3h3.75v-3zm0 4.5v3h3.75v-3zm0 4.5v2.03l2.41 1.5 1.34-.8v-2.73zM9 3.75V6h2l.13.01.12.04v-2.3zM5.98 15.98q.9 0 1.6-.3.7-.32 1.19-.86.48-.55.73-1.28.25-.74.25-1.61 0-.83-.25-1.55-.24-.71-.71-1.24t-1.15-.83q-.68-.3-1.55-.3-.92 0-1.64.3-.71.3-1.2.85-.5.54-.75 1.3-.25.74-.25 1.63 0 .85.26 1.56.26.72.74 1.23.48.52 1.17.81.69.3 1.56.3zM7.5 21h12.39L12 16.08V17q0 .41-.3.7-.29.3-.7.3H7.5zm15-.13v-7.24l-5.9 3.54Z',
  dropbox:
    'M6 1.807L0 5.629l6 3.822 6.001-3.822L6 1.807zM18 1.807l-6 3.822 6 3.822 6-3.822-6-3.822zM0 13.274l6 3.822 6.001-3.822L6 9.452l-6 3.822zM18 9.452l-6 3.822 6 3.822 6-3.822-6-3.822zM6 18.371l6.001 3.822 6-3.822-6-3.822L6 18.371z',
  claude:
    'm4.7144 15.9555 4.7174-2.6471.079-.2307-.079-.1275h-.2307l-.7893-.0486-2.6956-.0729-2.3375-.0971-2.2646-.1214-.5707-.1215-.5343-.7042.0546-.3522.4797-.3218.686.0608 1.5179.1032 2.2767.1578 1.6514.0972 2.4468.255h.3886l.0546-.1579-.1336-.0971-.1032-.0972L6.973 9.8356l-2.55-1.6879-1.3356-.9714-.7225-.4918-.3643-.4614-.1578-1.0078.6557-.7225.8803.0607.2246.0607.8925.686 1.9064 1.4754 2.4893 1.8336.3643.3035.1457-.1032.0182-.0728-.164-.2733-1.3539-2.4467-1.445-2.4893-.6435-1.032-.17-.6194c-.0607-.255-.1032-.4674-.1032-.7285L6.287.1335 6.6997 0l.9957.1336.419.3642.6192 1.4147 1.0018 2.2282 1.5543 3.0296.4553.8985.2429.8318.091.255h.1579v-.1457l.1275-1.706.2368-2.0947.2307-2.6957.0789-.7589.3764-.9107.7468-.4918.5828.2793.4797.686-.0668.4433-.2853 1.8517-.5586 2.9021-.3643 1.9429h.2125l.2429-.2429.9835-1.3053 1.6514-2.0643.7286-.8196.85-.9046.5464-.4311h1.0321l.759 1.1293-.34 1.1657-1.0625 1.3478-.8804 1.1414-1.2628 1.7-.7893 1.36.0729.1093.1882-.0183 2.8535-.607 1.5421-.2794 1.8396-.3157.8318.3886.091.3946-.3278.8075-1.967.4857-2.3072.4614-3.4364.8136-.0425.0304.0486.0607 1.5482.1457.6618.0364h1.621l3.0175.2247.7892.522.4736.6376-.079.4857-1.2142.6193-1.6393-.3886-3.825-.9107-1.3113-.3279h-.1822v.1093l1.0929 1.0686 2.0035 1.8092 2.5075 2.3314.1275.5768-.3218.4554-.34-.0486-2.2039-1.6575-.85-.7468-1.9246-1.621h-.1275v.17l.4432.6496 2.3436 3.5214.1214 1.0807-.17.3521-.6071.2125-.6679-.1214-1.3721-1.9246L14.38 17.959l-1.1414-1.9428-.1397.079-.674 7.2552-.3156.3703-.7286.2793-.6071-.4614-.3218-.7468.3218-1.4753.3886-1.9246.3157-1.53.2853-1.9004.17-.6314-.0121-.0425-.1397.0182-1.4328 1.9672-2.1796 2.9446-1.7243 1.8456-.4128.164-.7164-.3704.0667-.6618.4008-.5889 2.386-3.0357 1.4389-1.882.929-1.0868-.0062-.1579h-.0546l-6.3385 4.1164-1.1293.1457-.4857-.4554.0608-.7467.2307-.2429 1.9064-1.3114Z',
  openai:
    'M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z',
};

/* ----- Projection: upper hemisphere ("dome"), tilted forward so we read the top. ----- */
const TILT = (68 * Math.PI) / 180;
const cosT = Math.cos(TILT);
const sinT = Math.sin(TILT);
const R = 145;
const CX = 200;
const CY = 150;

function project(lonDeg: number, latDeg: number) {
  const lon = (lonDeg * Math.PI) / 180;
  const lat = (latDeg * Math.PI) / 180;
  const X = Math.cos(lat) * Math.sin(lon);
  const Y = Math.sin(lat);
  const Z = Math.cos(lat) * Math.cos(lon);
  const Yt = Y * cosT - Z * sinT; // tilt around X axis
  const Zt = Y * sinT + Z * cosT; // depth toward viewer
  return { x: CX + R * X, y: CY - R * Yt, depth: Zt, near: Zt >= 0 };
}

function ellipsePath(lat: number) {
  const pts: string[] = [];
  const N = 128;
  for (let i = 0; i <= N; i++) {
    const lon = -180 + (360 * i) / N;
    const p = project(lon, lat);
    pts.push(`${p.x.toFixed(1)},${p.y.toFixed(1)}`);
  }
  return 'M' + pts.join(' L');
}

/* A meridian arc from the pole down to a given latitude (default: the equator). */
function meridianPath(lon: number, latEnd = 0) {
  const pts: string[] = [];
  const N = 44;
  for (let i = 0; i <= N; i++) {
    const lat = 90 - ((90 - latEnd) * i) / N; // start at the pole (top centre)
    const p = project(lon, lat);
    pts.push(`${p.x.toFixed(1)},${p.y.toFixed(1)}`);
  }
  return 'M' + pts.join(' L');
}

/* Horizontal rings give the globe its form (static structure). */
const PARALLELS = [4, 22, 40, 58, 76];

/* Each badge sits on the front of the dome, ON a meridian, so the descending
   pulse runs straight down the line and lands on the logo. Longitudes are
   mirrored about the centre and heights form a symmetric arc (centre highest). */
const BADGES = [
  { key: 'outlook', lon: -60, lat: 16 },
  { key: 'excel', lon: -30, lat: 30 },
  { key: 'dropbox', lon: 0, lat: 42 },
  { key: 'claude', lon: 30, lat: 30 },
  { key: 'openai', lon: 60, lat: 16 },
];

/* Structural meridians: a clean, symmetric 30° grid (badges sit on these). */
const MERIDIANS = [-180, -150, -120, -90, -60, -30, 0, 30, 60, 90, 120, 150];

export default function IntegrationDome() {
  const parallels = useMemo(() => PARALLELS.map(ellipsePath), []);
  const meridians = useMemo(
    () => MERIDIANS.map((lon) => ({ lon, d: meridianPath(lon), near: project(lon, 40).near })),
    [],
  );
  const badges = useMemo(
    () =>
      BADGES.map((b) => {
        const p = project(b.lon, b.lat);
        const scale = 0.92 + p.depth * 0.22;
        // the pulse runs from the pole down the meridian to just above the badge
        const beam = meridianPath(b.lon, b.lat + 5);
        return { ...b, ...p, scale, beam };
      }).sort((a, b) => a.depth - b.depth),
    [],
  );

  return (
    <div className="relative w-full max-w-[540px] mx-auto select-none" aria-hidden="true">
      {/* corner crosshairs framing the figure */}
      {(['tl', 'tr', 'bl', 'br'] as const).map((c) => (
        <span
          key={c}
          className="absolute w-3 h-3 text-[#0a0a0a]/25"
          style={{
            top: c[0] === 't' ? 0 : 'auto',
            bottom: c[0] === 'b' ? 0 : 'auto',
            left: c[1] === 'l' ? 0 : 'auto',
            right: c[1] === 'r' ? 0 : 'auto',
          }}
        >
          <svg viewBox="0 0 12 12" className="w-full h-full">
            <path d="M6 0V12M0 6H12" stroke="currentColor" strokeWidth="1" />
          </svg>
        </span>
      ))}

      <svg viewBox="0 0 400 320" className="w-full h-auto overflow-visible">
        <defs>
          <radialGradient id="domeGlow" cx="50%" cy="38%" r="55%">
            <stop offset="0%" stopColor="rgba(15,110,86,0.10)" />
            <stop offset="100%" stopColor="rgba(15,110,86,0)" />
          </radialGradient>
          {/* the pulse intensifies as it descends toward the logo */}
          <linearGradient id="beam" x1="0" y1={CY - 100} x2="0" y2={CY + 130} gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0F6E56" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#16a37f" stopOpacity="1" />
          </linearGradient>
          <filter id="lit" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="2.4" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* soft accent halo behind the dome */}
        <ellipse cx={CX} cy={CY + 6} rx={R} ry={R * 0.62} fill="url(#domeGlow)" />

        {/* far-side meridians (faint) */}
        {meridians.map((m, i) =>
          m.near ? null : <path key={`mf${i}`} d={m.d} fill="none" stroke="rgba(10,10,10,0.06)" strokeWidth="1" />,
        )}

        {/* parallels — the horizontal rings */}
        {parallels.map((d, i) => (
          <path key={`p${i}`} d={d} fill="none" stroke="rgba(10,10,10,0.11)" strokeWidth="1" />
        ))}

        {/* near-side meridians */}
        {meridians.map((m, i) =>
          m.near ? <path key={`mn${i}`} d={m.d} fill="none" stroke="rgba(10,10,10,0.13)" strokeWidth="1" /> : null,
        )}

        {/* light pulses born at the pole, flowing down the meridian into each logo */}
        {badges.map((b, i) => (
          <path
            key={`g${b.key}`}
            d={b.beam}
            className="dome-lit"
            fill="none"
            stroke="url(#beam)"
            strokeWidth="2"
            strokeLinecap="round"
            pathLength={100}
            filter="url(#lit)"
            style={{
              strokeDasharray: '40 100',
              animationDuration: '3.4s',
              // radiate from the centre outward
              animationDelay: `${0.18 + Math.abs(b.lon) * 0.006}s`,
            }}
          />
        ))}

        {/* badges, painted back-to-front */}
        {badges.map((b) => {
          const r = 18 * b.scale;
          const s = 21 * b.scale;
          return (
            <g key={b.key}>
              {/* badge disc */}
              <circle
                cx={b.x}
                cy={b.y}
                r={r}
                fill="#fbfbfb"
                stroke="rgba(10,10,10,0.14)"
                strokeWidth="1"
                style={{ filter: 'drop-shadow(0 4px 10px rgba(10,10,10,0.12))' }}
              />
              <circle cx={b.x} cy={b.y} r={r} fill="none" stroke="rgba(15,110,86,0.18)" strokeWidth="1" />
              <g transform={`translate(${b.x - s / 2}, ${b.y - s / 2}) scale(${s / 24})`}>
                <path d={PATHS[b.key]} fill="#0a0a0a" />
              </g>
            </g>
          );
        })}
      </svg>

      {/* status pill, à la Vercel's "deployed" */}
      <div className="absolute left-1/2 -translate-x-1/2 -bottom-2 flex items-center gap-2 rounded-md bg-white/90 backdrop-blur px-3 py-1.5 text-[12px] font-mono text-[#0a0a0a] shadow-[0_4px_14px_rgba(10,10,10,0.10)] ring-1 ring-[#0a0a0a]/10">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full rounded-full bg-[#0F6E56] opacity-60 animate-ping" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#0F6E56]" />
        </span>
        connected
      </div>

      <style>{`
        .dome-lit {
          animation-name: domeDescend;
          animation-timing-function: cubic-bezier(0.33, 0, 0.2, 1);
          animation-iteration-count: infinite;
        }
        @keyframes domeDescend {
          0%   { stroke-dashoffset: 40; opacity: 0; }
          14%  { opacity: 1; }
          85%  { opacity: 1; }
          100% { stroke-dashoffset: -100; opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .dome-lit { animation: none; opacity: 0; }
        }
      `}</style>
    </div>
  );
}
