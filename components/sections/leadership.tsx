'use client';

import { leadership as volunteerExperiences } from '@/lib/portfolio-data';


import { Heart } from 'lucide-react';

const Leadership = () => {


  return (
    <section id="leadership" className="concept-section concept-community px-6"><div className="studio-container concept-editorial-row">
      <header><p className="studio-eyebrow mb-5">05 / COMMUNITY</p><h2 className="concept-editorial-heading">Leadership &<br /><span className="studio-accent">Volunteering</span></h2><p className="mt-6 text-sm leading-relaxed text-slate-400">Giving back to the community through leadership roles and volunteer work, developing teamwork and organizational skills beyond the classroom.</p><div className="mt-7 flex items-center gap-2 text-sm text-blue-300"><Heart size={17}/>Community Impact</div></header>
      <div><div className="grid gap-5 md:grid-cols-2">{volunteerExperiences.map((exp,index)=><article key={exp.organization} className="concept-panel volunteer-feature overflow-hidden flex flex-col"><div className={`concept-volunteer-art ${index===1?'temple-reference-art':''}`} style={{backgroundImage: `url(/images/${index===0?'library':'temple-reference'}.png)`}} role="img" aria-label={index===0?'Blue books representing library volunteering':'Blue community figures beside a temple illustration'}/><div className="p-6 flex-1"><p className="studio-eyebrow mb-3">{exp.category}</p><h3 className="text-2xl leading-tight text-white mb-3">{exp.organization}</h3><p className="text-blue-300 text-sm mb-4">{exp.title}</p><div className="space-y-2 text-xs text-slate-400"><p>{exp.period} · {exp.duration}</p><p>{exp.location}</p></div><ul className="mt-5 border-t border-white/10 pt-5 space-y-3">{exp.description.map(item=><li key={item} className="flex gap-2 text-sm leading-relaxed text-slate-400"><span className="text-blue-300">▹</span>{item}</li>)}</ul></div></article>)}</div><div className="concept-community-stats">{[{value:'3+',label:'Years Volunteering'},{value:'5+',label:'Events Organized'},{value:'2',label:'Organizations'},{value:'100+',label:'Community Members Helped'}].map(stat=><div key={stat.label}><strong>{stat.value}</strong><span>{stat.label}</span></div>)}</div></div>
    </div></section>
  );
};
export default Leadership;
