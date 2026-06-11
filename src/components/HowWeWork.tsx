'use client';
import React, { useState, useEffect, useRef } from 'react';

const BEBAS = { fontFamily: "'Bebas Neue', sans-serif" };
const GLOOCK = { fontFamily: "'Gloock', serif", fontWeight: 400 };

/* Animated counter on scroll */
function Counter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      obs.disconnect();
      const start = performance.now();
      const tick = (now: number) => {
        const pct = Math.min((now - start) / 1200, 1);
        setVal(Math.round(pct * to));
        if (pct < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [to]);
  return <span ref={ref}>{val}{suffix}</span>;
}

/* Checklist that ticks items one by one */
function Checklist() {
  const items = [
    'Email triage flow',
    'Manual file routing',
    'Duplicate data entry',
    'Status update overhead',
    'Cross-tool copy-paste',
  ];
  const [ticked, setTicked] = useState(0);
  useEffect(() => {
    if (ticked >= items.length) return;
    const t = setTimeout(() => setTicked(v => v + 1), 480);
    return () => clearTimeout(t);
  }, [ticked]);
  useEffect(() => {
    if (ticked < items.length) return;
    const t = setTimeout(() => setTicked(0), 2000);
    return () => clearTimeout(t);
  }, [ticked]);
  return (
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-center space-x-3 font-mono text-xs">
          <span className={`w-4 h-4 border flex items-center justify-center shrink-0 transition-colors duration-300 ${i < ticked ? 'border-white bg-white' : 'border-[#3d3d3d]'}`}>
            {i < ticked && <span className="text-black text-[10px] font-bold">✓</span>}
          </span>
          <span className={`transition-colors duration-300 ${i < ticked ? 'text-white line-through decoration-[#555]' : 'text-[#555]'}`}>
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

/* Mini uptime bar */
function UptimeBar() {
  const weeks = Array.from({ length: 24 }, (_, i) => ({
    up: Math.random() > 0.06,
    pct: 85 + Math.floor(Math.random() * 15),
  }));
  return (
    <div className="space-y-2">
      <div className="flex space-x-1">
        {weeks.map((w, i) => (
          <div
            key={i}
            className={`flex-1 h-6 ${w.up ? 'bg-emerald-400' : 'bg-red-500/60'}`}
            style={{ opacity: 0.3 + (i / weeks.length) * 0.7 }}
            title={`${w.pct}% uptime`}
          />
        ))}
      </div>
      <div className="flex items-center justify-between font-mono text-[10px] text-[#555]">
        <span>24 weeks</span>
        <span className="text-emerald-400">99.4% uptime</span>
      </div>
    </div>
  );
}

/* Mini code block — animated write/erase, fixed-height container */
function CodeBlock() {
  const lines = [
    { c: 'text-purple-400', t: 'integrate(' },
    { c: 'text-blue-300',   t: '  source: "Outlook",' },
    { c: 'text-blue-300',   t: '  target: "Dropbox",' },
    { c: 'text-emerald-400',t: '  transform: bundle,' },
    { c: 'text-white/40',   t: ')  // ✓ deployed' },
  ];
  const [shown, setShown] = useState(0);
  const [erasing, setErasing] = useState(false);

  useEffect(() => {
    if (!erasing) {
      if (shown >= lines.length) {
        const t = setTimeout(() => setErasing(true), 1800);
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => setShown(v => v + 1), 380);
      return () => clearTimeout(t);
    } else {
      if (shown <= 0) {
        const t = setTimeout(() => setErasing(false), 500);
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => setShown(v => v - 1), 200);
      return () => clearTimeout(t);
    }
  }, [shown, erasing]);

  return (
    /* fixed height = 5 lines × ~1.6rem line-height + padding — never shifts */
    <div className="font-mono text-sm leading-relaxed space-y-2" style={{ minHeight: '9rem' }}>
      {lines.slice(0, shown).map((l, i) => (
        <div key={i} className={l.c}>{l.t}</div>
      ))}
      {shown < lines.length && (
        <span className="inline-block w-[7px] h-[14px] bg-white/40 animate-pulse align-middle" />
      )}
    </div>
  );
}

/* ─── STEP CARD ─── */
function Step({
  num, title, desc, color, accent, children,
}: {
  num: string; title: string; desc: string;
  color: string; accent: string; children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col">
      {/* top accent bar */}
      <div className={`h-[3px] w-full ${color} mb-8`} />

      {/* number */}
      <div className="flex items-baseline space-x-4 mb-4">
        <span className="text-[64px] md:text-[80px] leading-none text-white/10 select-none" style={BEBAS}>
          {num}
        </span>
        <div className={`w-2 h-2 rounded-full ${accent} mt-auto mb-3`} />
      </div>

      {/* title */}
      <h3 className="text-4xl sm:text-5xl md:text-6xl text-white mb-4 leading-none uppercase tracking-wide" style={BEBAS}>
        {title}
      </h3>

      <p className="text-[#666] text-sm leading-relaxed font-sans mb-8 max-w-xs">
        {desc}
      </p>

      {/* visual area — fixed min-height so grid never shifts */}
      <div className="p-5 border border-white/[0.12] bg-white/[0.024]" style={{ minHeight: '180px' }}>
        {children}
      </div>
    </div>
  );
}

export default function HowWeWork() {
  return (
    <section id="what-we-do" className="border-t border-[#1e1e1e] py-16 px-6 md:py-32 md:px-16 relative overflow-hidden" style={{ background: '#0a0a0a' }}>
      {/* Radial ambient: soft lift top-right, mimicking hero but from opposite corner */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(75% 60% at 80% 20%, rgba(255,255,255,0.047) 0%, transparent 60%)' }} />
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(50% 40% at 15% 80%, rgba(255,255,255,0.024) 0%, transparent 60%)' }} />
      {/* Diagonal light beam — opposite angle to hero (-7deg vs +6deg) */}
      <div className="absolute pointer-events-none" style={{ left: '-15%', right: '-15%', top: '55%', height: '140px', transform: 'rotate(6deg)', background: 'linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.059) 50%, transparent 100%)', filter: 'blur(28px)' }} />
      <div className="absolute pointer-events-none" style={{ left: '-15%', right: '-15%', top: '68%', height: '60px', transform: 'rotate(6deg)', background: 'linear-gradient(to right, transparent 0%, rgba(255,255,255,0.047) 40%, rgba(255,255,255,0.083) 60%, transparent 100%)', filter: 'blur(12px)' }} />
      <div className="max-w-7xl mx-auto">

        <div className="mb-12 md:mb-20 flex items-end justify-between">
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-white" style={GLOOCK}>
            How we work
          </h2>
          {/* connector line */}
          <div className="hidden md:block flex-1 mx-12 h-px bg-gradient-to-r from-white/[0.24] to-transparent" />
          <span className="hidden md:block font-mono text-xs text-[#444] uppercase tracking-widest whitespace-nowrap">
            3-phase process
          </span>
        </div>

        {/* ─── 3 columns with connectors ─── */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_40px_1fr_40px_1fr] gap-y-16 md:gap-y-0 gap-x-0 items-start">

          <Step
            num="01"
            title="Analysis"
            color="bg-white"
            accent="bg-white"
            desc="We map every manual process in your operation and surface exactly where time is being lost before writing a single line of code."
          >
            <div className="space-y-3">
              <div className="font-mono text-[10px] text-[#555] uppercase tracking-wider sm:tracking-widest mb-3">Bottlenecks found</div>
              <Checklist />
            </div>
          </Step>

          {/* Arrow connector */}
          <div className="hidden md:flex items-start justify-center pt-[120px]">
            <svg width="40" height="20" viewBox="0 0 40 20" fill="none">
              <line x1="0" y1="10" x2="30" y2="10" stroke="#3d3d3d" strokeWidth="1" />
              <polyline points="24,4 32,10 24,16" stroke="#3d3d3d" strokeWidth="1" fill="none" />
            </svg>
          </div>

          <Step
            num="02"
            title="Engineering"
            color="bg-blue-500"
            accent="bg-blue-400"
            desc="We build a tailored solution that plugs into your existing tools. No subscriptions, no platforms, just software that does exactly what you need."
          >
            <div className="space-y-3">
              <div className="font-mono text-[10px] text-[#555] uppercase tracking-widest mb-3">Build output</div>
              <CodeBlock />
              <div className="pt-3 border-t border-white/[0.12] grid grid-cols-2 gap-4 font-mono text-[10px]">
                <div>
                  <div className="text-blue-400 text-lg"><Counter to={100} suffix="%" /></div>
                  <div className="text-[#555] uppercase tracking-wider">Custom</div>
                </div>
                <div>
                  <div className="text-white text-lg"><Counter to={0} /></div>
                  <div className="text-[#555] uppercase tracking-wider">Bloat</div>
                </div>
              </div>
            </div>
          </Step>

          {/* Arrow connector */}
          <div className="hidden md:flex items-start justify-center pt-[120px]">
            <svg width="40" height="20" viewBox="0 0 40 20" fill="none">
              <line x1="0" y1="10" x2="30" y2="10" stroke="#3d3d3d" strokeWidth="1" />
              <polyline points="24,4 32,10 24,16" stroke="#3d3d3d" strokeWidth="1" fill="none" />
            </svg>
          </div>

          <Step
            num="03"
            title="Maintenance"
            color="bg-emerald-500"
            accent="bg-emerald-400"
            desc="Software evolves. We stay on to monitor, iterate, and keep everything running as your operations grow."
          >
            <div className="space-y-4">
              <div className="font-mono text-[10px] text-[#555] uppercase tracking-widest mb-3">System uptime / 6 months</div>
              <UptimeBar />
              <div className="pt-3 border-t border-white/[0.12] grid grid-cols-2 gap-4 font-mono text-[10px]">
                <div>
                  <div className="text-emerald-400 text-lg"><Counter to={99} suffix=".4%" /></div>
                  <div className="text-[#555] uppercase tracking-wider">Uptime</div>
                </div>
                <div>
                  <div className="text-white text-lg"><Counter to={0} /></div>
                  <div className="text-[#555] uppercase tracking-wider">Incidents</div>
                </div>
              </div>
            </div>
          </Step>

        </div>

        {/* ── Skip the process callout ── */}
        <div className="mt-16 md:mt-24">
          <div className="w-full h-px mb-12" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.177) 30%, rgba(255,255,255,0.295) 50%, rgba(255,255,255,0.177) 70%, transparent)' }} />

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="space-y-3">
              <div className="font-mono text-xs text-[#444] uppercase tracking-widest">or</div>
              <p
                className="text-3xl md:text-4xl text-white leading-tight max-w-xl"
                style={{ fontFamily: "'Gloock', serif", fontWeight: 400 }}
              >
                Skip this entire process and just talk to us.
              </p>
              <p className="text-[#666] font-sans text-base leading-relaxed max-w-lg pt-1">
                No framework, no pitch deck. We'll figure out together what actually makes sense for your operation and build exactly that.
              </p>
            </div>

            <div className="shrink-0 w-full sm:w-auto">
              <a
                href="#contact"
                className="group inline-flex w-full sm:w-auto justify-center items-center space-x-3 border border-white/[0.24] px-8 py-4 text-white text-sm font-mono uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300"
              >
                <span>Let's talk</span>
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
