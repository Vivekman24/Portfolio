'use client';

import { useEffect, useRef, useState } from 'react';
import { Bot, Check, Copy, Loader2, MessageCircle, RotateCcw, Send, Trash2, X } from 'lucide-react';
import { MAX_HISTORY, MAX_MESSAGE_LENGTH, type ChatLink, type ChatTurn } from '@/lib/chat-core';

interface Message { id: string; text: string; sender: 'user' | 'ai'; links?: ChatLink[]; error?: boolean; questionId?: string }
const STORAGE_KEY = 'vivek-portfolio-chat-v2';
const welcome: Message = { id: 'welcome', sender: 'ai', text: 'Hi! I’m Vivek’s portfolio assistant. Ask about his internships, personal projects, skills, education, or volunteering.' };
const suggestions = ['What did Vivek do at Regeneron?', 'What are his personal projects?', 'What are his AI skills?', 'What certifications does he have?'];
const allowedLinks = new Set(['#home','#about','#experience','#projects','#resume','#leadership','#interests','#contact','/Vivek_Sai_Manthri_Resume.pdf','/Context Engineering Certification.pdf','https://github.com/Vivekman24','https://github.com/Vivekman24/OnlineAuction','https://github.com/Vivekman24/CafeBlissApp','https://linkedin.com/in/vivek-sai-manthri','mailto:manthrivivek@gmail.com']);
function safeLinks(value: unknown): ChatLink[] {
  if (!Array.isArray(value)) return [];
  return value.filter((link): link is ChatLink => typeof link?.label === 'string' && link.label.length <= 100 && typeof link.href === 'string' && allowedLinks.has(link.href)).slice(0,6);
}
function ResponseText({ text }: { text: string }) {
  return <div className="chat-answer-text">{text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g).map((part,index) => {
    if (part.startsWith('**') && part.endsWith('**')) return <strong key={index}>{part.slice(2,-2)}</strong>;
    const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (match) return allowedLinks.has(match[2]) ? <a key={index} href={match[2]} target={match[2].startsWith('https:') ? '_blank' : undefined} rel="noopener noreferrer">{match[1]}</a> : <span key={index}>{match[1]}</span>;
    return <span key={index}>{part}</span>;
  })}</div>;
}

export default function AIChat() {
  const [isOpen,setIsOpen] = useState(false);
  const [messages,setMessages] = useState<Message[]>([welcome]);
  const [input,setInput] = useState('');
  const [loading,setLoading] = useState(false);
  const [restored,setRestored] = useState(false);
  const [copied,setCopied] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const shouldFollowRef = useRef(true);
  const busyRef = useRef(false);
  const requestRef = useRef<AbortController | null>(null);
  const generationRef = useRef(0);
  const copyTimer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    try {
      const stored: unknown = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || 'null');
      if (Array.isArray(stored)) {
        const valid: Message[] = stored.slice(-60).filter(item => typeof item?.id === 'string' && typeof item.text === 'string' && item.text.length <= 10000 && ['user','ai'].includes(item.sender)).map(item => ({ id:item.id, text:item.text, sender:item.sender, links:safeLinks(item.links), error:item.error===true, questionId:typeof item.questionId==='string'?item.questionId:undefined }));
        if (valid.length) setMessages([welcome,...valid.filter(item=>item.id!=='welcome')]);
      }
    } catch { /* Storage is optional. */ }
    setRestored(true);
    return () => { requestRef.current?.abort(); if(copyTimer.current) clearTimeout(copyTimer.current); };
  },[]);
  useEffect(() => { if(restored) { try { sessionStorage.setItem(STORAGE_KEY,JSON.stringify(messages.slice(-60))); } catch { /* Continue without storage. */ } } },[messages,restored]);
  useEffect(() => { if(isOpen && shouldFollowRef.current && scrollRef.current) scrollRef.current.scrollTop=scrollRef.current.scrollHeight; },[messages,loading,isOpen]);
  useEffect(() => { if(isOpen) inputRef.current?.focus(); },[isOpen]);

  function close() { setIsOpen(false); toggleRef.current?.focus(); }
  function clear() {
    generationRef.current++; requestRef.current?.abort(); busyRef.current=false; setLoading(false); setMessages([welcome]); setInput(''); shouldFollowRef.current=true; inputRef.current?.focus();
  }
  async function send(question: string, retry?: Message) {
    const value=question.trim();
    if(!value || value.length>MAX_MESSAGE_LENGTH || busyRef.current) return;
    busyRef.current=true;
    const generation=++generationRef.current;
    const controller=new AbortController();requestRef.current=controller;
    const questionId=retry?.questionId || crypto.randomUUID();
    const userIndex=retry ? messages.findIndex(message=>message.id===questionId) : -1;
    const preceding=retry && userIndex>=0 ? messages.slice(0,userIndex) : messages;
    const history: ChatTurn[]=preceding.filter(message=>message.id!=='welcome'&&!message.error).slice(-MAX_HISTORY).map(message=>({role:message.sender==='user'?'user':'assistant',content:message.text}));
    // Bound total history as well as its turn count.
    while(history.reduce((sum,turn)=>sum+turn.content.length,0)>22000) history.shift();
    setMessages(previous=>retry ? previous.filter(message=>message.id!==retry.id) : [...previous,{id:questionId,sender:'user',text:value}]);
    setInput('');setLoading(true);shouldFollowRef.current=true;
    const timer=setTimeout(()=>controller.abort(),23000);
    try {
      const response=await fetch('/api/chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({message:value,history}),signal:controller.signal});
      let data: unknown;
      try { data=await response.json(); } catch { throw new Error('The assistant returned an unreadable response. Please retry.'); }
      const payload=data as {response?:unknown;error?:unknown;links?:unknown};
      if(!response.ok) throw new Error(response.status===429?'Please wait a minute before retrying.':typeof payload?.error==='string'?payload.error:'The assistant couldn’t complete that request. Please retry.');
      if(typeof payload?.response!=='string'||!payload.response.trim()||payload.response.length>10000) throw new Error('The assistant returned an empty response. Please retry.');
      if(generation===generationRef.current) setMessages(previous=>[...previous,{id:crypto.randomUUID(),sender:'ai',text:payload.response as string,links:safeLinks(payload.links)}]);
    } catch(error) {
      if(generation!==generationRef.current) return;
      const text=controller.signal.aborted?'That request took too long. Try again, or contact Vivek directly.':error instanceof Error?error.message:'Connection failed. Please retry.';
      setMessages(previous=>[...previous,{id:crypto.randomUUID(),sender:'ai',text,error:true,questionId}]);
    } finally {
      clearTimeout(timer);
      if(generation===generationRef.current){busyRef.current=false;setLoading(false);requestRef.current=null;inputRef.current?.focus();}
    }
  }
  async function copy(message: Message) {
    try { await navigator.clipboard.writeText(message.text);setCopied(message.id);if(copyTimer.current)clearTimeout(copyTimer.current);copyTimer.current=setTimeout(()=>setCopied(null),1800); } catch { setCopied(null); }
  }

  return <>
    <button ref={toggleRef} type="button" className="portfolio-chat-toggle" aria-label={isOpen?'Close portfolio assistant':'Open portfolio assistant'} aria-expanded={isOpen} aria-controls="portfolio-chat" onClick={()=>isOpen?close():setIsOpen(true)}><MessageCircle size={24}/></button>
    {isOpen && <section id="portfolio-chat" role="dialog" aria-modal="false" aria-labelledby="portfolio-chat-title" className="portfolio-chat" onKeyDown={event=>{if(event.key==='Escape'){event.stopPropagation();close();}}}>
      <header className="portfolio-chat-header"><div className="flex items-center gap-3"><span className="portfolio-chat-avatar"><Bot size={21}/></span><div><h2 id="portfolio-chat-title">Ask about Vivek</h2><p>Experience, projects & more</p></div></div><div className="flex items-center gap-1"><button type="button" aria-label="Clear conversation" title="Clear conversation" onClick={clear}><Trash2 size={17}/></button><button type="button" aria-label="Close assistant" onClick={close}><X size={19}/></button></div></header>
      <div ref={scrollRef} className="portfolio-chat-messages custom-scrollbar" role="log" aria-label="Conversation" aria-live="polite" aria-relevant="additions" onScroll={()=>{const node=scrollRef.current;if(node)shouldFollowRef.current=node.scrollHeight-node.scrollTop-node.clientHeight<80;}}>
        {messages.map(message=><div key={message.id} className={`portfolio-chat-message ${message.sender==='user'?'from-user':'from-assistant'} ${message.error?'chat-message-error':''}`}><span className="sr-only">{message.sender==='user'?'You':'Assistant'}: </span><ResponseText text={message.text}/>{message.links?.length ? <div className="chat-answer-links">{message.links.map(link=><a key={link.href} href={link.href} target={link.href.startsWith('https:')||link.href.endsWith('.pdf')?'_blank':undefined} rel="noopener noreferrer">{link.label} ↗</a>)}</div>:null}{message.error?<button className="chat-message-action" type="button" disabled={loading} onClick={()=>{const question=messages.find(item=>item.id===message.questionId);if(question)void send(question.text,message);}}><RotateCcw size={13}/>Retry</button>:message.sender==='ai'&&message.id!=='welcome'?<button type="button" className="chat-message-action" aria-label="Copy answer" onClick={()=>void copy(message)}>{copied===message.id?<Check size={13}/>:<Copy size={13}/>} {copied===message.id?'Copied':'Copy'}</button>:null}</div>)}
        {messages.length===1 && <div className="chat-suggestions">{suggestions.map(question=><button type="button" key={question} disabled={loading} onClick={()=>void send(question)}>{question}</button>)}</div>}
        {loading&&<div className="portfolio-chat-thinking" role="status"><Loader2 size={16} className="animate-spin"/>Thinking…</div>}<div ref={bottomRef}/>
      </div>
      <form className="portfolio-chat-input" onSubmit={event=>{event.preventDefault();void send(input);}}><label htmlFor="portfolio-chat-question" className="sr-only">Ask about Vivek</label><div className="flex items-center gap-2"><input ref={inputRef} id="portfolio-chat-question" value={input} onChange={event=>setInput(event.target.value)} maxLength={MAX_MESSAGE_LENGTH} placeholder="Ask about Vivek…" autoComplete="off" onKeyDown={event=>{if(event.nativeEvent.isComposing&&event.key==='Enter')event.preventDefault();}}/><button type="submit" disabled={loading||!input.trim()} aria-label="Send question"><Send size={18}/></button></div><div className="flex justify-between gap-3 mt-2"><span>Answers from Vivek’s portfolio. Verify important details with him.</span><span>{input.length}/{MAX_MESSAGE_LENGTH}</span></div></form>
    </section>}
  </>;
}
