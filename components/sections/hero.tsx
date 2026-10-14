'use client';

import { useState } from 'react';
import { ArrowDown, ArrowUpRight, Brain, Code, FileText, Github, Linkedin, Layers } from 'lucide-react';

const stages = [
  { title: 'Software Engineering', detail: 'I enjoy turning complex problems into clear, practical software solutions.', icon: Code },
  { title: 'AI & ML', detail: 'I explore how machine learning and intelligent systems can make everyday tools more useful.', icon: Brain },
  { title: 'Full-Stack Development', detail: 'I like connecting thoughtful interfaces with the systems and data that power them.', icon: Layers },
];

export default function Hero() {
  const [active, setActive] = useState(0);
  return (
    <section id="home" className="studio-hero relative overflow-hidden px-6">
      <div className="studio-container relative pt-16 pb-12 lg:pt-20 lg:pb-14">
        <div className="grid items-center gap-16 lg:grid-cols-[1.15fr_1fr]">
          <div>
            <p className="studio-eyebrow mb-7"><span className="studio-status" /> SOFTWARE ENGINEERING / APPLIED AI</p>
            <h1 className="studio-name">Vivek Sai<br /><span className="studio-accent">Manthri.</span></h1>
            <p className="mt-7 max-w-xl text-2xl leading-snug text-stone-100 md:text-3xl">Software developer. AI enthusiast. Problem solver.</p>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-slate-400">I’m a software developer and AI enthusiast pursuing my M.S. in Computer Science at Rutgers University. I enjoy building full-stack applications, exploring machine learning, and turning complex ideas into practical solutions that create real-world impact.</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href="#projects" className="studio-button">Explore my work <ArrowUpRight size={18} /></a>
              <a href="/Vivek_Sai_Manthri_Resume.pdf" target="_blank" rel="noopener noreferrer" className="studio-button studio-button-secondary">View résumé <FileText size={16} /></a>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-slate-400">
              <a href="https://github.com/Vivekman24" target="_blank" rel="noopener noreferrer" className="studio-social"><Github size={16} /> GitHub</a>
              <a href="https://linkedin.com/in/vivek-sai-manthri" target="_blank" rel="noopener noreferrer" className="studio-social"><Linkedin size={16} /> LinkedIn</a>
              <a href="#contact" className="studio-social">Let’s connect <ArrowUpRight size={16} /></a>
            </div>
          </div>
          <div className="studio-workflow">
            <div className="flex items-center justify-between border-b border-white/10 pb-5">
              <span className="studio-eyebrow">A LITTLE ABOUT ME</span><span className="text-xs text-slate-500">01 — 03</span>
            </div>
            <div className="studio-orbit" aria-hidden="true"><div className="studio-orbit-ring" /><div className="studio-orbit-ring studio-orbit-ring-inner" /><div className="studio-orbit-core"><span className="text-4xl font-medium tracking-tighter">VM</span></div><span className="studio-orbit-label">CURIOUS BY NATURE. DRIVEN TO BUILD.</span></div>
            <div className="grid grid-cols-3 gap-2" aria-label="Explore my interests">
              {stages.map((stage, index) => { const Icon = stage.icon; return <button key={stage.title} type="button" aria-label={stage.title} aria-pressed={active === index} onClick={() => setActive(index)} className={`studio-stage ${active === index ? 'studio-stage-active' : ''}`}><Icon size={20} /><span className="mt-3 text-[10px] leading-relaxed">{stage.title}</span></button>; })}
            </div>
            <div className="min-h-[112px] pt-6" aria-live="polite"><h2 className="text-lg text-stone-100">{stages[active].title}</h2><p className="mt-2 text-sm leading-relaxed text-slate-400">{stages[active].detail}</p></div>
            <p className="border-t border-white/10 pt-4 text-[11px] text-slate-500">Select an interest to get to know me</p>
          </div>
        </div>
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6"><p className="studio-eyebrow">THOUGHTFUL SYSTEMS. PRACTICAL IMPACT.</p><a href="#projects" className="studio-social text-xs text-slate-400">Discover selected work <ArrowDown size={14} /></a></div>
      </div>
    </section>
  );
}
