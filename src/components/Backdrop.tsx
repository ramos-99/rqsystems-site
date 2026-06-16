import React from 'react';

/**
 * Clean, Resend-style atmosphere for a light-theme section: a soft dark
 * illumination bleeding from one corner, plus a visible-but-soft diagonal light
 * band (a "floor light") with a slightly brighter core line through it.
 * Black-on-white, kept subtle. Each section varies the corner, angle and
 * position of the band so the lighting never repeats.
 */
type Corner = 'tl' | 'tr' | 'bl' | 'br';

const AT: Record<Corner, string> = {
  tl: '0% 0%',
  tr: '100% 0%',
  bl: '0% 100%',
  br: '100% 100%',
};

export default function Backdrop({
  corner = 'tr',
  beam = false,
  angle = -7,
  beamTop = '60%',
  className = '',
}: {
  corner?: Corner;
  beam?: boolean;
  angle?: number;
  beamTop?: string;
  className?: string;
}) {
  const at = AT[corner];
  const rot = `rotate(${angle}deg)`;
  return (
    <div aria-hidden="true" className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      {/* Soft dark illumination from the corner */}
      <div
        className="absolute inset-0"
        style={{ background: `radial-gradient(60% 60% at ${at}, rgba(10,10,10,0.06) 0%, transparent 70%)` }}
      />
      {/* Soft diagonal light band (hero only) */}
      {beam && (
        <>
          <div
            style={{
              position: 'absolute',
              left: '-15%',
              right: '-15%',
              top: beamTop,
              height: '220px',
              transform: rot,
              filter: 'blur(56px)',
              background: 'linear-gradient(to bottom, transparent 0%, rgba(10,10,10,0.07) 50%, transparent 100%)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: '-15%',
              right: '-15%',
              top: `calc(${beamTop} + 96px)`,
              height: '28px',
              transform: rot,
              filter: 'blur(13px)',
              background: 'linear-gradient(to right, transparent 0%, rgba(10,10,10,0.07) 35%, rgba(10,10,10,0.13) 55%, transparent 95%)',
            }}
          />
        </>
      )}
    </div>
  );
}
