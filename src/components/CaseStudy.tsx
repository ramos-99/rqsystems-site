'use client';
import React, { useEffect, useState, useRef, useCallback } from 'react';

const LOG_LINES = [
  { t: 0,    text: '> inbox.poll()',                                      color: 'text-[#666]' },
  { t: 500,  text: '  ↳ 3 new messages detected',                         color: 'text-blue-400/70' },
  { t: 1000, text: '> parse.bundle(msg_0x4f2a)',                          color: 'text-[#777]' },
  { t: 1400, text: '  ↳ original_message.eml          [OK]',              color: 'text-[#999]' },
  { t: 1800, text: '  ↳ message_body.pdf              [OK]',              color: 'text-[#999]' },
  { t: 2200, text: '  ↳ invoice_Q3_final.pdf          [OK]',              color: 'text-blue-300' },
  { t: 2700, text: '> classify(bundle)  scanning context...',             color: 'text-amber-400/80' },
  { t: 3200, text: '  ↳ match: "Project Alpha"  conf: 0.97',             color: 'text-amber-300' },
  { t: 3700, text: '> route.resolve()',                                   color: 'text-[#777]' },
  { t: 4100, text: '  ↳ /Dropbox/Projects/Alpha/Invoices/',               color: 'text-purple-400' },
  { t: 4600, text: '> dropbox.upload(bundle × 3)',                        color: 'text-[#777]' },
  { t: 5100, text: '  ✓ archived   0.8s   3 files   2.4 MB',             color: 'text-emerald-400' },
  { t: 5800, text: '> inbox.poll()  standing by...',                      color: 'text-[#555]' },
];

function TerminalLog() {
  const [visible, setVisible] = useState(0);
  const [fading, setFading] = useState(false);

  // Reveal lines one at a time at their authored cadence.
  useEffect(() => {
    if (visible >= LOG_LINES.length) {
      const hold = setTimeout(() => setFading(true), 2400);
      return () => clearTimeout(hold);
    }
    const delay = visible === 0 ? 320 : LOG_LINES[visible].t - LOG_LINES[visible - 1].t;
    const t = setTimeout(() => setVisible((v) => v + 1), delay);
    return () => clearTimeout(t);
  }, [visible]);

  // Fade the whole block out smoothly, then restart — no abrupt clear.
  useEffect(() => {
    if (!fading) return;
    const t = setTimeout(() => {
      setVisible(0);
      setFading(false);
    }, 650);
    return () => clearTimeout(t);
  }, [fading]);

  return (
    <div
      className="space-y-[5px] min-h-[240px]"
      style={{ opacity: fading ? 0 : 1, transition: 'opacity 0.6s ease-out' }}
    >
      {LOG_LINES.slice(0, visible).map((line, i) => (
        <div
          key={i}
          className={`font-mono text-[11px] leading-relaxed ${line.color}`}
          style={{ animation: 'logIn 0.28s ease-out both' }}
        >
          {line.text}
        </div>
      ))}
      {visible < LOG_LINES.length && !fading && (
        <span className="inline-block w-[7px] h-[14px] bg-emerald-400/80 animate-pulse align-middle ml-0.5" />
      )}
    </div>
  );
}

export default function CaseStudy() {
  const [uptime, setUptime] = useState(0);
  const [packets, setPackets] = useState(1284);
  const termRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setInterval(() => {
      setUptime((u) => u + 1);
      setPackets((p) => p + Math.floor(Math.random() * 3));
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const fmt = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  };

  // Cursor-following "flashlight": a soft light tracks the pointer over the
  // dark terminal. Updated straight on the DOM node so it stays buttery smooth.
  const onTermMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!window.matchMedia('(hover: hover)').matches) return;
    const el = termRef.current;
    const glow = glowRef.current;
    if (!el || !glow) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    glow.style.background = `radial-gradient(260px circle at ${x}px ${y}px, rgba(29,158,117,0.16), rgba(255,255,255,0.05) 32%, transparent 62%)`;
    glow.style.opacity = '1';
  }, []);

  const onTermLeave = useCallback(() => {
    if (glowRef.current) glowRef.current.style.opacity = '0';
  }, []);

  return (
    <section
      id="case-study"
      className="border-t border-[#d8d8d8] py-16 px-6 md:py-32 md:px-16 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #f4f4f4 0%, #ededed 100%)' }}
    >
      <style>{`@keyframes logIn { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }`}</style>
      <div className="max-w-7xl mx-auto relative z-10">
        <h2
          className="text-4xl md:text-5xl lg:text-6xl text-[#0a0a0a] mb-10 md:mb-16"
          style={{ fontFamily: "'Gloock', serif", fontWeight: 400 }}
        >
          Featured Work
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border border-[#d8d8d8] bg-white/50 backdrop-blur-sm shadow-[0_22px_55px_-30px_rgba(10,10,10,0.20)]">

          {/* Left — copy (light) */}
          <div className="p-6 md:p-14 border-b lg:border-b-0 lg:border-r border-[#cccccc] flex flex-col justify-between space-y-10 md:space-y-12">
            <div className="space-y-6">
              <div className="flex items-center space-x-2 font-mono text-xs text-emerald-700 uppercase tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_6px_rgba(16,185,129,0.7)]" />
                <span>System Operational</span>
              </div>
              <h3
                className="text-3xl md:text-4xl text-[#0a0a0a] leading-tight"
                style={{ fontFamily: "'Gloock', serif", fontWeight: 400 }}
              >
                Outlook to Dropbox<br />Automation
              </h3>
              <p className="text-[#3f3f3f] leading-relaxed font-sans text-base max-w-md">
                Our client was manually organising project emails, invoices, and contracts into complex folder structures.
                We built a custom Outlook add-in that bundles the&nbsp;.eml, a generated PDF, and all attachments, archiving the full set to the correct Dropbox folder in one click, without ever leaving the inbox.
              </p>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-[#cccccc]">
              {[
                { label: 'Files / email', value: '3×', color: 'text-blue-600' },
                { label: 'Click to archive', value: '1', color: 'text-purple-600' },
              ].map((stat, i) => (
                <div key={i} className={`p-5 flex flex-col justify-center ${i < 1 ? 'border-b md:border-b-0 md:border-r border-[#cccccc]' : ''}`}>
                  <div className={`text-2xl font-mono mb-1 ${stat.color}`}>{stat.value}</div>
                  <div className="text-[10px] text-[#555] uppercase tracking-wider font-mono">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — terminal (kept dark) with a cursor-following flashlight */}
          <div
            ref={termRef}
            onMouseMove={onTermMove}
            onMouseLeave={onTermLeave}
            className="bg-[#050505] flex flex-col relative overflow-hidden h-full shadow-[0_16px_40px_-24px_rgba(10,10,10,0.38)]"
          >

            {/* Flashlight glow following the pointer */}
            <div
              ref={glowRef}
              className="absolute inset-0 pointer-events-none z-20 opacity-0"
              style={{ transition: 'opacity 0.35s ease-out' }}
            />

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
                <span className="font-mono text-xs text-[#666] tracking-widest">[ TRIAGE.LOG ]<span className="hidden sm:inline">  v1.2.0</span></span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_rgba(52,211,153,0.9)]" />
                <span className="font-mono text-[10px] text-emerald-400 uppercase tracking-widest">ONLINE</span>
              </div>
            </div>

            {/* Live metrics bar */}
            <div className="relative z-10 grid grid-cols-3 border-b border-white/[0.12]">
              <div className="px-3 md:px-5 py-3 border-r border-white/[0.12]">
                <div className="font-mono text-[9px] md:text-[10px] text-[#777] uppercase tracking-wider md:tracking-widest mb-1">Uptime</div>
                <div className="font-mono text-sm text-amber-400">{fmt(uptime)}</div>
              </div>
              <div className="px-3 md:px-5 py-3 border-r border-white/[0.12]">
                <div className="font-mono text-[9px] md:text-[10px] text-[#777] uppercase tracking-wider md:tracking-widest mb-1">Emails Proc.</div>
                <div className="font-mono text-sm text-blue-400">{packets.toLocaleString()}</div>
              </div>
              <div className="px-3 md:px-5 py-3">
                <div className="font-mono text-[9px] md:text-[10px] text-[#777] uppercase tracking-wider md:tracking-widest mb-1">Errors</div>
                <div className="font-mono text-sm text-emerald-400">0</div>
              </div>
            </div>

            {/* Terminal body */}
            <div className="relative z-10 flex-1 p-4 md:p-8 overflow-hidden">
              <TerminalLog />
            </div>

            {/* Bottom status bar */}
            <div className="relative z-10 border-t border-white/10 px-5 py-2.5 flex items-center justify-between bg-[#0a0a0a]">
              <span className="font-mono text-[10px] text-[#666] tracking-widest">tail -f /triage.log</span>
              <div className="flex items-center space-x-4">
                <span className="font-mono text-[10px] text-purple-400/70">↑ Dropbox API</span>
                <span className="font-mono text-[10px] text-blue-400/70">Outlook Add-in</span>
              </div>
            </div>
          </div>{/* end terminal */}

        </div>
      </div>
    </section>
  );
}
