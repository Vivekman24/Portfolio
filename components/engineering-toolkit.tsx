'use client';

import { useState } from 'react';
import { Brain, Cloud, Code2, Database, Settings } from 'lucide-react';

type Skills = Record<string, Record<string, string[]>>;

export default function EngineeringToolkit({ skills }: { skills: Skills }) {
  const categories = [
    { id: 'languages', label: 'Languages', description: 'Core building blocks for problem solving.', icon: Settings, groups: skills['Languages'] },
    { id: 'frontend', label: 'Frontend', description: 'Modern and responsive user experiences.', icon: Code2, groups: { Frontend: skills['Frameworks & Libraries']['Frontend'] } },
    { id: 'backend', label: 'Backend', description: 'Robust and scalable server-side systems.', icon: Database, groups: { Backend: skills['Frameworks & Libraries']['Backend'], Testing: skills['Frameworks & Libraries']['Testing'] } },
    { id: 'cloud', label: 'Cloud & DevOps', description: 'Build, deploy, and scale with confidence.', icon: Cloud, groups: { ...skills['DevOps & Tools'], ...skills['Cloud & Databases'] } },
    { id: 'ai', label: 'AI & ML', description: 'From ideas to intelligent systems.', icon: Brain, groups: skills['AI & Machine Learning'] },
  ];
  const [active, setActive] = useState('languages');
  const connections: Record<string, string> = { languages: 'M300 235V45', frontend: 'M300 235L125 155', backend: 'M300 235L475 155', cloud: 'M300 235L190 385', ai: 'M300 235L410 385' };
  const selected = categories.find(category => category.id === active)!;

  return (
    <section className="network-toolkit" aria-labelledby="toolkit-heading">
      <div className="network-toolkit-top">
        <header className="network-toolkit-intro">
          <p className="studio-eyebrow mb-5">ENGINEERING TOOLKIT</p>
          <h3 id="toolkit-heading">A well-rounded<br />toolkit for <span className="studio-accent">what’s next.</span></h3>
          <p className="mt-6 text-sm leading-relaxed text-slate-400">Technologies and tools I use to design, build, and ship scalable, intelligent, and modern software.</p>
          <span className="network-intro-rule" aria-hidden="true" />
          <p className="text-xs text-slate-500">Select a category to explore the full toolkit.</p>
        </header>
        <div className="network-diagram" role="group" aria-label="Skill categories">
          <svg className="network-lines" viewBox="0 0 600 460" aria-hidden="true">
            <circle cx="300" cy="235" r="164" fill="none" stroke="#37638e" strokeWidth=".6" />
            <circle cx="300" cy="235" r="202" fill="none" stroke="#315980" strokeWidth=".6" strokeDasharray="2 5" />
            <path d="M300 235V45 M300 235L125 155 M300 235L475 155 M300 235L190 385 M300 235L410 385" fill="none" stroke="#5c9edc" strokeWidth=".8" />
          <path key={active} className="network-active-path" d={connections[active]} fill="none" stroke="#9ed6ff" strokeWidth="2" pathLength="1" /></svg>
          <div className="network-center" aria-hidden="true"><span>ENGINEERING</span><span className="network-active-label">{selected.label}</span></div>
          {categories.map(category => { const Icon = category.icon; return (
            <button key={category.id} type="button" className={`network-category network-category-${category.id} ${active === category.id ? 'is-selected' : ''}`} aria-pressed={active === category.id} aria-controls="toolkit-detail" onClick={() => setActive(category.id)}>
              <span className="network-category-icon"><Icon size={27} strokeWidth={1.5} /></span>
              <span className="network-category-copy"><strong>{category.label}</strong><span>{category.description}</span></span>
            </button>
          ); })}
        </div>
      </div>
      <div id="toolkit-detail" className="concept-panel network-detail" aria-live="polite">
        <div key={active} className="visual-swap"><header className="flex flex-wrap justify-between items-center gap-3 mb-6"><h4 className="text-xl text-white">{selected.label}</h4><span className="studio-eyebrow">FULL TOOLKIT / {Object.values(selected.groups).flat().length} TECHNOLOGIES</span></header>
        <div className="network-detail-grid">{Object.entries(selected.groups).map(([label,list]) => <div key={label}><p className="text-xs text-blue-300 mb-3">{label}</p><div className="studio-tags">{list.map(skill => <span key={skill}>{skill}</span>)}</div></div>)}</div>
      </div></div>
    </section>
  );
}
