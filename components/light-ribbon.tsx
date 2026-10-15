'use client';

import { useRef, type PointerEvent } from 'react';

export default function LightRibbon({ variant = 0 }: { variant?: number }) {
  const surface = useRef<HTMLDivElement>(null);
  function move(event: PointerEvent<HTMLDivElement>) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    surface.current?.style.setProperty('--ribbon-x', `${((event.clientX - bounds.left) / bounds.width - .5) * 18}px`);
    surface.current?.style.setProperty('--ribbon-y', `${((event.clientY - bounds.top) / bounds.height - .5) * 14}px`);
  }
  return <div ref={surface} className={`signature-ribbon ribbon-mode-${variant}`} onPointerMove={move} onPointerLeave={() => {
    surface.current?.style.setProperty('--ribbon-x', '0px');
    surface.current?.style.setProperty('--ribbon-y', '0px');
  }} aria-hidden="true">
    <svg viewBox="0 0 640 320" preserveAspectRatio="xMidYMid slice">
      <defs><linearGradient id={`ribbon-gradient-${variant}`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#164da0"/><stop offset=".5" stopColor="#82c8ff"/><stop offset="1" stopColor="#286fe0"/></linearGradient></defs>
      {Array.from({length: 12}, (_, index) => <path key={index} d={`M-80 ${210 + index * 5} C140 ${-80 + index * 12}, 270 ${390 - index * 9}, 720 ${40 + index * 9}`} fill="none" stroke={`url(#ribbon-gradient-${variant})`} strokeWidth={index % 3 === 0 ? 2 : .8} opacity={.25 + index * .045}/>) }
      {[2,6,10].map(index => <path key={`light-${index}`} className="ribbon-light-trace" d={`M-80 ${210 + index * 5} C140 ${-80 + index * 12}, 270 ${390 - index * 9}, 720 ${40 + index * 9}`} fill="none" stroke="#c6e9ff" strokeWidth="2" opacity=".7" style={{animationDelay:`-${index}s`}} />)}
    </svg>
    <span className="ribbon-wordmark">VSM<span>SOFTWARE / INTELLIGENCE / DESIGN</span></span>
  </div>;
}
