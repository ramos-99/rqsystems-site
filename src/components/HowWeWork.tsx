import React, { useRef, useState, useEffect } from 'react';
import { Search, Cpu, RefreshCw } from 'lucide-react';

const steps = [
  {
    number: '01',
    title: 'Analysis',
    description: 'We evaluate your current operation and identify the exact points where manual processes are creating bottlenecks.',
    icon: Search,
    color: 'rgba(59, 130, 246, 0.15)', // Blue
  },
  {
    number: '02',
    title: 'Engineering',
    description: 'We build a custom solution integrated with your existing tools. No bloated platforms, just the exact features you need.',
    icon: Cpu,
    color: 'rgba(16, 185, 129, 0.15)', // Emerald
  },
  {
    number: '03',
    title: 'Maintenance',
    description: 'Software requires upkeep. We provide ongoing support to ensure the system keeps running smoothly as your operations evolve.',
    icon: RefreshCw,
    color: 'rgba(168, 85, 247, 0.15)', // Purple
  },
];

function SpotlightCard({ step }: { step: typeof steps[0] }) {
  const divRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current || isFocused) return;

    const div = divRef.current;
    const rect = div.getBoundingClientRect();

    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(1);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  const Icon = step.icon;

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative p-10 rounded-2xl overflow-hidden border border-white/5 transition-transform duration-500 hover:-translate-y-1 shadow-xl"
      style={{
        backgroundColor: '#050505',
        backgroundImage: `radial-gradient(120% 120% at 50% -20%, ${step.color.replace('0.15', '0.08')} 0%, transparent 80%)`,
        transformStyle: 'preserve-3d',
      }}
    >
      {/* SVG Noise Texture (Always visible for texture) */}
      <div className="absolute inset-0 z-0 opacity-[0.35] mix-blend-overlay pointer-events-none">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full opacity-80">
          <filter id={`noise-${step.number}`}>
            <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter={`url(#noise-${step.number})`} />
        </svg>
      </div>

      {/* Spotlight Effect (Follows Mouse) */}
      <div
        className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${step.color}, transparent 40%)`,
        }}
      />

      {/* Subtle border highlight that also follows mouse */}
      <div
        className="absolute inset-0 z-10 pointer-events-none rounded-2xl transition-opacity duration-300"
        style={{
          opacity,
          padding: '1px',
          background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.3), transparent 40%)`,
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
      />

      {/* Content */}
      <div className="relative z-20">
        <div className="flex items-center justify-between mb-10">
          <div className="w-12 h-12 rounded-full border border-white/10 bg-[#111] flex items-center justify-center shadow-inner group-hover:bg-[#1a1a1a] transition-colors duration-500">
            <Icon className="w-5 h-5 text-white/70 group-hover:text-white transition-colors duration-500" />
          </div>
          <span 
            className="text-2xl text-white/20 group-hover:text-white/60 transition-colors duration-500"
            style={{ fontFamily: "'Gloock', serif" }}
          >
            {step.number}
          </span>
        </div>
        
        <h3 className="text-xl font-medium text-white mb-4">
          {step.title}
        </h3>
        <p className="text-[#888] leading-relaxed text-sm md:text-base font-sans group-hover:text-[#aaa] transition-colors duration-500">
          {step.description}
        </p>
      </div>
    </div>
  );
}

export default function HowWeWork() {
  return (
    <section id="what-we-do" className="border-t border-[#1a1a1a] py-32 px-8 md:px-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <h2 
          className="text-4xl md:text-5xl lg:text-6xl text-white mb-20" 
          style={{ fontFamily: "'Gloock', serif", fontWeight: 400 }}
        >
          How we work
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <SpotlightCard key={step.number} step={step} />
          ))}
        </div>
      </div>
    </section>
  );
}
