import React from 'react';
import { Mail, ArrowRight, User } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="contact" className="relative overflow-hidden" style={{ background: '#070609' }}>

      {/* Fine cross-hatch texture */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.1 }}>
        <defs>
          <pattern id="ftgrid" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
            <path d="M 32 0 L 0 0 0 32" fill="none" stroke="white" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#ftgrid)" />
      </svg>
      {/* Radial vignette to fade grid at edges */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 85% 70% at 50% 60%, transparent 30%, #070609 80%)' }} />
      {/* Single diagonal light streak — top-left to mid, no color */}
      <div className="absolute pointer-events-none" style={{ left: '-10%', right: '-10%', top: '15%', height: '80px', transform: 'rotate(-5deg)', background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.04) 50%, transparent)', filter: 'blur(20px)' }} />

      {/* ── Main content ── */}
      <div className="border-t border-[#1a1a1a] pt-16 pb-12 px-6 md:pt-32 md:pb-20 md:px-16 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            <div className="space-y-10">
              <h2
                className="text-4xl md:text-5xl lg:text-6xl text-white"
                style={{ fontFamily: "'Gloock', serif", fontWeight: 400 }}
              >
                Founders
              </h2>

              <p className="text-[#888] text-lg leading-relaxed font-sans max-w-lg">
                RQ Systems was founded by Martim Ramos and Afonso Quintas, Computer Science and Engineering students from Instituto Superior Técnico in Lisbon. We specialize in building custom automation infrastructure for businesses with complex operational needs.
              </p>

              <div className="pt-8 border-t border-white/10 space-y-6">
                <p className="text-white text-xl font-medium tracking-tight">
                  If you feel like you waste too much time on processes that should not be manual, contact us.
                </p>
                <a
                  href="mailto:contact@rqsystems.pt"
                  className="group inline-flex items-center space-x-3 text-[#888] hover:text-white transition-colors duration-300"
                >
                  <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center bg-white/5 group-hover:bg-white/10 transition-colors">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span className="text-lg">contact@rqsystems.pt</span>
                  <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                </a>
              </div>
            </div>

            {/* Founders Typography & Avatars */}
            <div className="w-full flex items-center justify-center lg:justify-end py-10">
              <div className="flex flex-col items-center">
                <div className="flex flex-col md:flex-row space-y-12 md:space-y-0 md:space-x-16 items-end mb-8">

                  {/* Martim Ramos */}
                  <div className="flex flex-col items-center space-y-6">
                    <div className="w-32 h-32 md:w-48 md:h-48 rounded-full border border-white/10 bg-[#050505] relative overflow-hidden group shadow-[0_0_40px_rgba(255,255,255,0.03)]">
                      <img
                        src="/ramos-perfil.jpg"
                        alt="Martim Ramos"
                        className="w-full h-full object-cover object-center"
                      />
                      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                    <div className="flex flex-col items-center text-center leading-none" style={{ fontFamily: "'Gloock', serif" }}>
                      <span className="text-2xl text-[#666] mb-2">Martim</span>
                      <span className="text-5xl md:text-6xl text-[#444]"><span className="text-7xl md:text-8xl text-white">R</span>amos</span>
                    </div>
                  </div>

                  {/* Afonso Quintas */}
                  <div className="flex flex-col items-center space-y-6">
                    <div className="w-32 h-32 md:w-48 md:h-48 rounded-full border border-white/10 bg-[#050505] flex items-center justify-center relative overflow-hidden group shadow-[0_0_40px_rgba(255,255,255,0.03)]">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <User className="w-12 h-12 text-white/10" />
                    </div>
                    <div className="flex flex-col items-center text-center leading-none" style={{ fontFamily: "'Gloock', serif" }}>
                      <span className="text-2xl text-[#666] mb-2">Afonso</span>
                      <span className="text-5xl md:text-6xl text-[#444]"><span className="text-7xl md:text-8xl text-white">Q</span>uintas</span>
                    </div>
                  </div>

                </div>

                <div className="text-sm md:text-base font-mono tracking-[1em] text-[#555] uppercase mt-4 text-center ml-4">
                  Systems
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>


      {/* ── Resend-style giant wordmark with floor light ── */}
      <div className="relative w-full select-none overflow-hidden" style={{ height: 'clamp(140px, 22vw, 280px)' }}>

        {/* Floor spotlight */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] pointer-events-none"
          style={{
            height: '180px',
            background: 'radial-gradient(ellipse 70% 100% at 50% 100%, rgba(255,255,255,0.13) 0%, rgba(255,255,255,0.04) 40%, transparent 70%)',
          }}
        />

        {/* Horizon line */}
        <div
          className="absolute left-0 right-0 pointer-events-none"
          style={{
            bottom: '36%',
            height: '1px',
            background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.18) 30%, rgba(255,255,255,0.28) 50%, rgba(255,255,255,0.18) 70%, transparent 100%)',
          }}
        />

        {/* Copyright + links — sitting above the wordmark */}
        <div className="absolute top-0 left-0 right-0 px-6 md:px-16 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0 font-sans z-10">
          <span className="text-sm text-[#555]">© {new Date().getFullYear()} RQ Systems</span>
          <div className="flex space-x-6 md:space-x-8 text-sm text-[#888]">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-300">Martim LinkedIn</a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-300">Afonso LinkedIn</a>
          </div>
        </div>

        {/* Giant wordmark */}
        <div className="absolute inset-0 flex items-end justify-center pb-0 leading-none">
          <span
            className="text-white/[0.07] leading-none whitespace-nowrap"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 'clamp(100px, 18vw, 240px)',
              letterSpacing: '-0.02em',
              WebkitMaskImage: 'linear-gradient(to bottom, black 40%, transparent 75%)',
              maskImage: 'linear-gradient(to bottom, black 40%, transparent 75%)',
            }}
          >
            RQ Systems
          </span>
        </div>

      </div>

    </footer>

  );
}
