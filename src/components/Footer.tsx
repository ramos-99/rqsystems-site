import React from 'react';
import { Mail, ArrowRight, User } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="contact" className="border-t border-[#1a1a1a] pt-32 pb-16 px-8 md:px-16 bg-black relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-tl from-white/[0.03] to-transparent rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
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
              <div className="flex space-x-12 items-end mb-6">
                
                {/* Martim Ramos */}
                <div className="flex flex-col items-center space-y-5">
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border border-white/10 bg-[#050505] flex items-center justify-center relative overflow-hidden group shadow-2xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <User className="w-8 h-8 text-white/10" />
                  </div>
                  <div className="text-2xl md:text-3xl text-[#555] transition-colors hover:text-[#888]" style={{ fontFamily: "'Gloock', serif" }}>
                    Martim <span className="text-white">R</span>amos
                  </div>
                </div>

                {/* Afonso Quintas */}
                <div className="flex flex-col items-center space-y-5">
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border border-white/10 bg-[#050505] flex items-center justify-center relative overflow-hidden group shadow-2xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <User className="w-8 h-8 text-white/10" />
                  </div>
                  <div className="text-2xl md:text-3xl text-[#555] transition-colors hover:text-[#888]" style={{ fontFamily: "'Gloock', serif" }}>
                    Afonso <span className="text-white">Q</span>uintas
                  </div>
                </div>

              </div>
              
              <div className="text-sm md:text-base font-mono tracking-[0.5em] text-[#444] uppercase mt-2">
                Systems
              </div>
            </div>
          </div>

        </div>
        
        <div className="mt-32 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between font-sans">
          <div className="flex items-center space-x-4 mb-6 md:mb-0">
            {/* Aesthetic Tag */}
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full border border-white/5 bg-white/[0.02]">
              <span className="w-2 h-2 rounded-full bg-white/40" />
              <span className="text-xs text-[#888]">Crafted with precision</span>
            </div>
            <span className="text-sm text-[#555]">© {new Date().getFullYear()} RQ Systems</span>
          </div>
          
          <div className="flex space-x-8 text-sm text-[#888]">
            <a href="#" className="hover:text-white transition-colors duration-300">Martim LinkedIn</a>
            <a href="#" className="hover:text-white transition-colors duration-300">Afonso LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
