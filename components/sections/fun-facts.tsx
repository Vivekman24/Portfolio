'use client';

import { interests as facts } from '@/lib/portfolio-data';



const FunFacts = () => {


  return (
    <section id="interests" className="concept-section concept-interests px-6"><div className="studio-container concept-editorial-row"><header><p className="studio-eyebrow mb-5">06 / INTERESTS</p><h2 className="concept-editorial-heading">Beyond<br /><span className="studio-accent">the Code</span></h2><p className="mt-6 text-sm leading-relaxed text-slate-400">When I&apos;m not coding, here&apos;s what keeps me going!</p><p className="mt-8 text-sm text-blue-300">Work hard, play hard — that&apos;s my motto!</p></header><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{facts.map((fact,index)=><article key={fact.title} className="concept-panel concept-interest-card"><div className={`concept-interest-art concept-interest-art-${index}`} role="img" aria-label={fact.title}/><div className="px-5 pb-6"><h3 className="mb-3 text-lg text-white">{fact.title}</h3><p className="text-sm text-slate-400 leading-relaxed">{fact.description}</p></div></article>)}</div></div></section>
  );
};
export default FunFacts;
