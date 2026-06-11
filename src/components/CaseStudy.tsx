'use client';
import React, { useEffect, useState, useRef, useCallback } from 'react';

const LOG_LINES = [
  { t: 0,    text: '> inbox.poll()',                                      color: 'text-[#555]',     accent: '' },
  { t: 500,  text: '  ↳ 3 new messages detected',                         color: 'text-blue-400/70', accent: '' },
  { t: 1000, text: '> parse.bundle(msg_0x4f2a)',                          color: 'text-[#666]',     accent: '' },
  { t: 1400, text: '  ↳ original_message.eml          [OK]',              color: 'text-[#888]',     accent: '' },
  { t: 1800, text: '  ↳ message_body.pdf              [OK]',              color: 'text-[#888]',     accent: '' },
  { t: 2200, text: '  ↳ invoice_Q3_final.pdf          [OK]',              color: 'text-blue-300',   accent: '' },
  { t: 2700, text: '> classify(bundle)  scanning context...',             color: 'text-amber-400/80', accent: '' },
  { t: 3200, text: '  ↳ match: "Project Alpha"  conf: 0.97',             color: 'text-amber-300',  accent: '' },
  { t: 3700, text: '> route.resolve()',                                   color: 'text-[#666]',     accent: '' },
  { t: 4100, text: '  ↳ /Dropbox/Projects/Alpha/Invoices/',               color: 'text-purple-400', accent: '' },
  { t: 4600, text: '> dropbox.upload(bundle × 3)',                        color: 'text-[#666]',     accent: '' },
  { t: 5100, text: '  ✓ archived   0.8s   3 files   2.4 MB',             color: 'text-emerald-400', accent: '' },
  { t: 5800, text: '> inbox.poll()  standing by...',                      color: 'text-[#444]',     accent: '' },
];

function TerminalLog() {
  const [visible, setVisible] = useState(0);
  const [cycling, setCycling] = useState(false);

  useEffect(() => {
    if (visible >= LOG_LINES.length) {
      const t = setTimeout(() => { setVisible(0); }, 2800);
      return () => clearTimeout(t);
    }
    const delay = visible === 0 ? 300 : LOG_LINES[visible].t - LOG_LINES[visible - 1].t;
    const t = setTimeout(() => setVisible(v => v + 1), delay);
    return () => clearTimeout(t);
  }, [visible]);

  return (
    <div className="space-y-[5px] min-h-[240px]">
      {LOG_LINES.slice(0, visible).map((line, i) => (
        <div
          key={i}
          className={`font-mono text-[11px] leading-relaxed ${line.color}`}
          style={{ animation: 'fadeIn 0.2s ease-out' }}
        >
          {line.text}
        </div>
      ))}
      {visible < LOG_LINES.length && (
        <span className="inline-block w-[7px] h-[14px] bg-white/40 animate-pulse align-middle ml-0.5" />
      )}
    </div>
  );
}

export default function CaseStudy() {
  const [uptime, setUptime] = useState(0);
  const [packets, setPackets] = useState(1284);
  const sectionRef = useRef<HTMLElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const t = setInterval(() => {
      setUptime(u => u + 1);
      setPackets(p => p + Math.floor(Math.random() * 3));
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const fmt = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  };

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    // Skip tilt on touch devices — emulated mouse events would jolt the card on tap.
    if (!window.matchMedia('(hover: hover)').matches) return;
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    setTilt({ x: dy * -6, y: dx * 6 });
  }, []);

  const onMouseLeave = useCallback(() => setTilt({ x: 0, y: 0 }), []);

  return (
    <section
      ref={sectionRef}
      id="case-study"
      className="border-t border-[#1e1e1e] py-16 px-6 md:py-32 md:px-16 relative overflow-hidden"
      style={{ background: '#080808' }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {/* Fine dot-grid texture */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.21 }}>
        <defs>
          <pattern id="csdots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="white" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#csdots)" />
      </svg>
      {/* Subtle vignette to fade dots at edges */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, #080808 100%)' }} />

      <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(3px); } to { opacity: 1; transform: translateY(0); } }`}</style>
      <div className="max-w-7xl mx-auto relative z-10">
        <h2
          className="text-4xl md:text-5xl lg:text-6xl text-white mb-10 md:mb-16"
          style={{ fontFamily: "'Gloock', serif", fontWeight: 400 }}
        >
          Featured Work
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border border-white/[0.12]">

          {/* Left — copy */}
          <div className="p-6 md:p-14 border-b lg:border-b-0 lg:border-r border-white/[0.12] flex flex-col justify-between space-y-10 md:space-y-12">
            <div className="space-y-6">
              <div className="flex items-center space-x-2 font-mono text-xs text-emerald-500 uppercase tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
                <span>System Operational</span>
              </div>
              <h3
                className="text-3xl md:text-4xl text-white leading-tight"
                style={{ fontFamily: "'Gloock', serif", fontWeight: 400 }}
              >
                Outlook to Dropbox<br />Automation
              </h3>
              <p className="text-[#777] leading-relaxed font-sans text-base max-w-md">
                Our client was manually organising project emails, invoices, and contracts into complex folder structures.
                We built a custom Outlook add-in that bundles the&nbsp;.eml, a generated PDF, and all attachments, archiving the full set to the correct Dropbox folder in one click, without ever leaving the inbox.
              </p>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-white/[0.12]">
              {[
                { label: 'Files / email', value: '3×', color: 'text-blue-400' },
                { label: 'Click to archive', value: '1', color: 'text-purple-400' },
              ].map((stat, i) => (
                <div key={i} className={`p-5 flex flex-col justify-center ${i < 1 ? 'border-b md:border-b-0 md:border-r border-white/[0.12]' : ''}`}>
                  <div className={`text-2xl font-mono mb-1 ${stat.color}`}>{stat.value}</div>
                  <div className="text-[10px] text-[#555] uppercase tracking-wider font-mono">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — terminal with 3D mouse tilt */}
          <div style={{ perspective: '900px' }}>
          <div
            className="bg-[#050505] flex flex-col relative overflow-hidden h-full"
            style={{
              transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              transition: 'transform 0.15s ease-out',
              willChange: 'transform',
            }}
          >

            {/* Subtle scanline overlay */}
            <div
              className="absolute inset-0 pointer-events-none z-0 opacity-[0.036]"
              style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, white 2px, white 3px)' }}
            />

            {/* Terminal top bar */}
            <div className="relative z-10 flex items-center justify-between px-5 py-3 border-b border-white/[0.12] bg-[#0a0a0a]">
              <div className="flex items-center space-x-4">
                <div className="flex space-x-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400/50" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/50" />
                </div>
                <span className="font-mono text-xs text-[#444] tracking-widest">[ TRIAGE.LOG ]<span className="hidden sm:inline">  v1.2.0</span></span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_rgba(52,211,153,0.9)]" />
                <span className="font-mono text-[10px] text-emerald-400 uppercase tracking-widest">ONLINE</span>
              </div>
            </div>

            {/* Live metrics bar */}
            <div className="relative z-10 grid grid-cols-3 border-b border-white/[0.12]">
              <div className="px-3 md:px-5 py-3 border-r border-white/[0.12]">
                <div className="font-mono text-[9px] md:text-[10px] text-[#555] uppercase tracking-wider md:tracking-widest mb-1">Uptime</div>
                <div className="font-mono text-sm text-amber-400">{fmt(uptime)}</div>
              </div>
              <div className="px-3 md:px-5 py-3 border-r border-white/[0.12]">
                <div className="font-mono text-[9px] md:text-[10px] text-[#555] uppercase tracking-wider md:tracking-widest mb-1">Emails Proc.</div>
                <div className="font-mono text-sm text-blue-400">{packets.toLocaleString()}</div>
              </div>
              <div className="px-3 md:px-5 py-3">
                <div className="font-mono text-[9px] md:text-[10px] text-[#555] uppercase tracking-wider md:tracking-widest mb-1">Errors</div>
                <div className="font-mono text-sm text-emerald-400">0</div>
              </div>
            </div>

            {/* Terminal body */}
            <div className="relative z-10 flex-1 p-4 md:p-8 overflow-hidden">
              <TerminalLog />
            </div>

            {/* Bottom status bar */}
            <div className="relative z-10 border-t border-white/10 px-5 py-2.5 flex items-center justify-between bg-[#0a0a0a]">
              <span className="font-mono text-[10px] text-[#444] tracking-widest">tail -f /triage.log</span>
              <div className="flex items-center space-x-4">
                <span className="font-mono text-[10px] text-purple-400/60">↑ Dropbox API</span>
                <span className="font-mono text-[10px] text-blue-400/60">Outlook Add-in</span>
              </div>
            </div>
          </div>{/* end tilted inner div */}
          </div>{/* end perspective wrapper */}

        </div>
      </div>
    </section>
  );
}
