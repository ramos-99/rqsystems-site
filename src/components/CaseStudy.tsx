import React from 'react';
import { Mail, ArrowRight, CheckCircle2, FileText, FolderSync } from 'lucide-react';

export default function CaseStudy() {
  return (
    <section id="case-study" className="border-t border-[#1a1a1a] py-32 px-8 md:px-16">
      <div className="max-w-7xl mx-auto">
        <h2 
          className="text-4xl md:text-5xl lg:text-6xl text-white mb-16" 
          style={{ fontFamily: "'Gloock', serif", fontWeight: 400 }}
        >
          Featured Work
        </h2>
        
        <div className="p-2 md:p-3 border border-white/10 rounded-3xl bg-white/[0.02] relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          
          <div className="bg-[#050505] rounded-2xl border border-white/5 p-10 md:p-16 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 text-xs font-mono mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>System Operational</span>
              </div>
              <h3 className="text-3xl text-white font-medium tracking-tight">Outlook to Dropbox Automation</h3>
              <p className="text-[#888] leading-relaxed font-sans text-lg">
                Our client was manually organizing project emails, invoices, and contracts into complex folder structures. 
                We built a custom Outlook add-in with a dedicated interface, allowing their team to triage and archive emails directly to the correct Dropbox folders without ever leaving their inbox.
              </p>
            </div>
            
            {/* Outlook Add-in Interface Mockup */}
            <div className="w-full max-w-sm mx-auto bg-[#1c1c1c] border border-white/10 rounded-xl overflow-hidden shadow-2xl relative flex flex-col h-[380px]">
              {/* Add-in Header */}
              <div className="h-12 border-b border-white/10 flex items-center px-4 space-x-3 bg-[#111]">
                <div className="w-6 h-6 rounded bg-blue-600 flex items-center justify-center">
                  <FolderSync className="w-3 h-3 text-white" />
                </div>
                <span className="text-sm font-medium text-white tracking-wide">Triage Assistant</span>
              </div>
              
              {/* Add-in Content */}
              <div className="p-5 flex-1 flex flex-col space-y-6 bg-gradient-to-b from-[#161616] to-[#0a0a0a]">
                
                {/* Detected Context */}
                <div className="space-y-3">
                  <label className="text-xs text-[#666] uppercase tracking-wider font-semibold">Active Email Context</label>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-2">
                        <Mail className="w-4 h-4 text-[#888]" />
                        <span className="text-xs text-[#aaa]">From: billing@acme.com</span>
                      </div>
                      <span className="text-[10px] uppercase font-mono bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded">Bundle</span>
                    </div>
                    <div className="pl-6 border-l border-white/10 space-y-2">
                      <div className="flex items-center space-x-2">
                        <FileText className="w-3 h-3 text-white/50" />
                        <span className="text-xs text-white/80 font-mono">original_message.eml</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <FileText className="w-3 h-3 text-white/50" />
                        <span className="text-xs text-white/80 font-mono">message_body.pdf</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <FileText className="w-3 h-3 text-blue-400/80" />
                        <span className="text-xs text-white/80 font-mono">invoice_Q3_final.pdf</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Routing Suggestions */}
                <div className="space-y-3">
                  <label className="text-xs text-[#666] uppercase tracking-wider font-semibold">Suggested Destination</label>
                  <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-emerald-400 font-mono">Project Alpha</span>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div className="text-xs text-[#aaa] truncate font-mono">
                      /Dropbox/Projects/Alpha/Invoices
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <div className="mt-auto pt-2">
                  <button className="w-full bg-white text-black text-sm font-medium py-3 rounded-lg flex items-center justify-center space-x-2 hover:bg-[#e5e5e5] transition-colors shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                    <FolderSync className="w-4 h-4" />
                    <span>Archive to Dropbox</span>
                  </button>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
