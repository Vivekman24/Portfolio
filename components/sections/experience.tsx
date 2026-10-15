'use client';

import { experience as experiences } from '@/lib/portfolio-data';


import { MapPin } from 'lucide-react';
import Image from 'next/image';

const Experience = () => {


  const logos = ['regeneron', 'gogentic', 'aroopa', 'msk'];
  const impacts = [
    [['5+ hrs/day', 'Time saved'], ['50%', 'Less report preparation time'], ['75%', 'Faster PQ script generation']],
    [['30%', 'Lower load times'], ['25%', 'Higher query accuracy'], ['40%', 'Faster deployment']],
    [['8K+', 'Monthly users supported'], ['15%', 'Higher engagement'], ['40%', 'Faster data retrieval']],
    [['30%', 'Less manual data creation'], ['25%', 'Greater computational efficiency']],
  ];

  return (
    <section id="experience" className="concept-section concept-career px-6"><div className="studio-container"><header className="text-center mb-10"><p className="studio-eyebrow mb-4">02 / PROFESSIONAL JOURNEY</p><h2 className="studio-heading mb-5">Experience</h2><p className="max-w-2xl mx-auto text-sm leading-relaxed text-slate-400">My professional journey across various companies, showcasing my growth in software development and AI integration.</p></header><div className="concept-career-list">{experiences.map((exp,index)=><article key={exp.company} className="concept-career-stop"><div className="concept-career-date"><span className="concept-career-number">0{index+1}</span><span>{exp.period}</span><i aria-hidden="true"/></div><div className="concept-panel concept-career-content branded-career-card"><div className={`career-brand career-brand-${logos[index]}`}><Image src={`/images/brands/${logos[index]}.png`} alt={`${exp.company} logo`} width={index===0?700:index===3?765:200} height={index===0?500:index===3?401:200}/></div><div className="career-brand-body"><header className="flex flex-col gap-3 md:flex-row md:justify-between md:items-start"><div><h3 className="text-2xl text-white leading-tight">{exp.company}</h3><p className="mt-2 text-sm text-blue-300">{exp.title}</p></div><p className="flex items-center gap-2 text-xs text-slate-400 md:max-w-[210px]"><MapPin size={14} className="shrink-0"/>{exp.location}</p></header><div className="career-impact-row" aria-label="Impact highlights">{impacts[index].map(([value,label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}</div><ul className="mt-5 space-y-3 border-t border-white/10 pt-5">{exp.description.map(item=><li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-slate-400"><span className="text-blue-300">▹</span><span>{item}</span></li>)}</ul></div></div></article>)}</div></div></section>
  );
};
export default Experience;
