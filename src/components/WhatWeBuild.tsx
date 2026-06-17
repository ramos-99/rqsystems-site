import React from 'react';
import Backdrop from './Backdrop';
import IntegrationDome from './IntegrationDome';

const DISPLAY = { fontFamily: "'Schibsted Grotesk Variable', sans-serif", fontWeight: 600 };

export default function WhatWeBuild() {
  return (
    <section
      id="what-we-build"
      className="border-t border-[#d8d8d8] relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #ececec 0%, #e3e3e3 100%)' }}
    >
      {/* clean dark illumination from the top-left corner */}
      <Backdrop corner="tl" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-16 py-20 md:py-32 grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-24 items-center">

        {/* Left: the message */}
        <div className="max-w-xl">
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-[#0a0a0a] leading-none" style={DISPLAY}>
            What we build
          </h2>

          <div className="mt-8 md:mt-10 space-y-6 text-[#3f3f3f] text-base md:text-[17px] leading-relaxed font-sans">
            <p>
              We integrate directly with the tools your team already uses. The work starts
              with a detailed mapping of your operations, understanding exactly where time is
              lost and why, before a single line of code is written.
            </p>
            <p>
              The output is purpose-built software: automations, pipelines, and integrations
              designed around your specific workflow. Not a generic platform configured for
              you, but code written for your exact problem.
            </p>
            <p>
              We stay involved after delivery, iterating as your needs change.
            </p>
          </div>
        </div>

        {/* Right: the tools they already know, sitting on a connected dome */}
        <IntegrationDome />

      </div>
    </section>
  );
}
