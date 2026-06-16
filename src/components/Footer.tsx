import React from 'react';
import { Mail, ArrowRight, User, MapPin } from 'lucide-react';
import Backdrop from './Backdrop';

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer id="contact" className="relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #e8e8e8 0%, #dedede 100%)' }}>

      {/* clean dark illumination from the bottom-left corner */}
      <Backdrop corner="bl" />

      {/* ── Main content ── */}
      <div className="border-t border-[#cfcfcf] pt-16 pb-12 px-6 md:pt-32 md:pb-20 md:px-16 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            <div className="space-y-10">
              <h2
                className="text-3xl md:text-4xl text-[#0a0a0a]"
                style={{ fontFamily: "'Schibsted Grotesk Variable', sans-serif", fontWeight: 600 }}
              >
                Founders
              </h2>

              <p className="text-[#3f3f3f] text-lg leading-relaxed font-sans max-w-lg">
                Martim Ramos and Afonso Quintas — Computer Science and Engineering students from Instituto Superior Técnico, Lisbon. We build software that replaces the manual work costing your team hours every week.
              </p>

              <div className="pt-8 border-t border-[#c7c7c7] space-y-6">
                <p className="text-[#0a0a0a] text-xl font-medium tracking-tight">
                  If your team is spending hours on work that software could handle, let's talk.
                </p>
                <a
                  href="mailto:contact@rqsystems.pt"
                  className="group inline-flex items-center space-x-3 text-[#3f3f3f] hover:text-[#0a0a0a] transition-colors duration-300"
                >
                  <div className="w-10 h-10 rounded-full border border-[#c7c7c7] flex items-center justify-center bg-white group-hover:bg-[#ececec] transition-colors">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span className="text-lg">contact@rqsystems.pt</span>
                  <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                </a>
                <div className="flex flex-wrap gap-4">
                  <a
                    href="https://www.linkedin.com/in/martim-c-ramos/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center space-x-3 text-[#3f3f3f] hover:text-[#0a0a0a] transition-colors duration-300"
                  >
                    <div className="w-10 h-10 rounded-full border border-[#c7c7c7] flex items-center justify-center bg-white group-hover:bg-[#ececec] transition-colors">
                      <LinkedinIcon className="w-4 h-4" />
                    </div>
                    <span className="text-lg">Martim Ramos</span>
                    <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/afonsoquintas/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center space-x-3 text-[#3f3f3f] hover:text-[#0a0a0a] transition-colors duration-300"
                  >
                    <div className="w-10 h-10 rounded-full border border-[#c7c7c7] flex items-center justify-center bg-white group-hover:bg-[#ececec] transition-colors">
                      <LinkedinIcon className="w-4 h-4" />
                    </div>
                    <span className="text-lg">Afonso Quintas</span>
                    <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </a>
                </div>
              </div>
            </div>

            {/* Founders Typography & Avatars */}
            <div className="w-full flex items-center justify-center lg:justify-end py-10">
              <div className="flex flex-col items-center">
                <div className="flex flex-col md:flex-row space-y-12 md:space-y-0 md:space-x-16 items-center md:items-end mb-8">

                  {/* Martim Ramos */}
                  <div className="flex flex-col items-center space-y-6">
                    <div className="w-32 h-32 md:w-48 md:h-48 rounded-full border border-[#c7c7c7] bg-white relative overflow-hidden group shadow-[0_0_40px_rgba(10,10,10,0.06)]">
                      <img
                        src="/ramos-perfil.jpg"
                        alt="Martim Ramos"
                        className="w-full h-full object-cover object-center"
                      />
                      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                    <div className="flex flex-col items-center text-center leading-none" style={{ fontFamily: "'Schibsted Grotesk Variable', sans-serif" }}>
                      <span className="text-2xl text-[#5a5a5a] mb-2">Martim</span>
                      <span className="text-5xl md:text-6xl text-[#8f8f8f]"><span className="text-7xl md:text-8xl text-[#0a0a0a]">R</span>amos</span>
                    </div>
                  </div>

                  {/* Afonso Quintas */}
                  <div className="flex flex-col items-center space-y-6">
                    <div className="w-32 h-32 md:w-48 md:h-48 rounded-full border border-[#c7c7c7] bg-white relative overflow-hidden group shadow-[0_0_40px_rgba(10,10,10,0.06)]">
                      <img
                        src="/quintas-perfil.png"
                        alt="Afonso Quintas"
                        className="w-full h-full object-cover object-center"
                      />
                      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                    <div className="flex flex-col items-center text-center leading-none" style={{ fontFamily: "'Schibsted Grotesk Variable', sans-serif" }}>
                      <span className="text-2xl text-[#5a5a5a] mb-2">Afonso</span>
                      <span className="text-5xl md:text-6xl text-[#8f8f8f]"><span className="text-7xl md:text-8xl text-[#0a0a0a]">Q</span>uintas</span>
                    </div>
                  </div>

                </div>

                <div className="text-sm md:text-base font-mono tracking-[1em] text-[#6a6a6a] uppercase mt-4 text-center ml-4">
                  Systems
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>


      {/* ── Horizon + floor light + info bar ── */}
      <div className="relative w-full select-none overflow-hidden" style={{ minHeight: 'clamp(180px, 22vw, 260px)' }}>

        {/* Horizon line — sits right at the top, immediately after founders */}
        <div
          className="absolute top-0 left-0 right-0 pointer-events-none"
          style={{
            height: '1px',
            background: 'linear-gradient(90deg, transparent 0%, rgba(10,10,10,0.16) 25%, rgba(10,10,10,0.28) 50%, rgba(10,10,10,0.16) 75%, transparent 100%)',
          }}
        />


        {/* Info bar: location · nav · LinkedIn */}
        <div className="relative z-10 px-6 md:px-16 pt-8 pb-10 md:pb-0 flex flex-col md:flex-row items-start md:items-center justify-between gap-7 md:gap-6">

          {/* Center: navigation — first on mobile */}
          <div className="flex flex-wrap gap-x-6 md:gap-x-8 gap-y-2 order-first md:order-2">
            {[
              { label: 'What we build', href: '#what-we-build' },
              { label: 'Featured work', href: '#case-study' },
              { label: 'Contact', href: '#contact' },
            ].map(({ label, href }) => (
              <a key={href} href={href} className="text-sm text-[#3f3f3f] hover:text-[#0a0a0a] transition-colors duration-200 font-sans py-1.5 -my-1.5">
                {label}
              </a>
            ))}
          </div>

          {/* Left: location + copyright + mail — second on mobile */}
          <div className="space-y-1.5 order-2 md:order-1">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3 h-3 text-[#4a4a4a]" />
              <span className="font-mono text-[10px] text-[#4a4a4a] uppercase tracking-widest">Lisbon, Portugal</span>
            </div>
            <span className="text-sm text-[#6a6a6a] block">© {new Date().getFullYear()} RQ Systems</span>
            <a href="mailto:contact@rqsystems.pt" className="inline-flex items-center gap-1.5 text-sm text-[#3f3f3f] hover:text-[#0a0a0a] transition-colors duration-200 font-sans py-1 -my-1">
              <Mail className="w-3.5 h-3.5" />
              contact@rqsystems.pt
            </a>
          </div>

          {/* Right: LinkedIn — last on mobile */}
          <div className="flex gap-6 md:gap-5 order-3">
            <a href="https://www.linkedin.com/in/martim-c-ramos/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-[#3f3f3f] hover:text-[#0a0a0a] transition-colors duration-300 font-sans group py-1.5 -my-1.5">
              <LinkedinIcon className="w-3.5 h-3.5 shrink-0" />
              Martim
            </a>
            <a href="https://www.linkedin.com/in/afonsoquintas/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-[#3f3f3f] hover:text-[#0a0a0a] transition-colors duration-300 font-sans group py-1.5 -my-1.5">
              <LinkedinIcon className="w-3.5 h-3.5 shrink-0" />
              Afonso
            </a>
          </div>

        </div>

      </div>

    </footer>

  );
}
