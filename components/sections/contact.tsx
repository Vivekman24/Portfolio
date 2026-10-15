'use client';

import { useState } from 'react';
import { personal } from '@/lib/portfolio-data';
import { Mail, Phone, MapPin, Send, Github, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY || '',
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          from_name: 'Portfolio Contact Form',
          to_email: personal.email,
        }),
      });

      const result = await response.json();

      if (result.success) {
      toast({
        title: "Message Sent!",
        description: "Thank you for reaching out. I'll get back to you soon!",
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error(result.message || 'Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again or email me directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: personal.email,
      href: 'mailto:' + personal.email
    },
    {
      icon: Phone,
      label: 'Phone',
      value: personal.phone,
      href: 'tel:+12487597187'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: personal.location,
      href: '#'
    }
  ];

  const socialLinks = [
    {
      icon: Github,
      label: 'GitHub',
      href: personal.github,
      color: 'hover:text-gray-400'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      href: personal.linkedin,
      color: 'hover:text-blue-400'
    }
  ];

  return (
    <section id="contact" className="concept-section concept-contact px-6"><div className="studio-container grid gap-12 lg:grid-cols-2 items-start">
      <div className="contact-finale"><p className="studio-eyebrow mb-6">07 / CONTACT</p><h2 className="studio-heading">Let’s build<br />something<br /><span className="studio-accent">meaningful.</span></h2><p className="mt-6 max-w-md text-base leading-relaxed text-slate-400">Ready to bring your ideas to life? Let&apos;s discuss your next project or collaboration. I&apos;m always excited to work on innovative solutions!</p><div className="concept-contact-actions"><a href={'mailto:' + personal.email}><Mail size={18}/>Email</a>{socialLinks.map(link=>{const Icon=link.icon;return <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer"><Icon size={18}/>{link.label}</a>;})}</div><div className="concept-contact-details">{contactInfo.map(info=>{const Icon=info.icon;return <div key={info.label}><Icon size={16}/>{info.href==='#'?<span>{info.value}</span>:<a href={info.href}>{info.value}</a>}</div>;})}</div></div>
      <form onSubmit={handleSubmit} className="concept-panel concept-contact-form"><p className="studio-eyebrow mb-4">FROM AN IDEA TO A CONVERSATION</p><h3 className="text-xl text-white mb-2">Send a message</h3><p className="text-sm text-slate-400 mb-7">Fill out the form below and I&apos;ll get back to you as soon as possible.</p><div className="space-y-5">{[{name:'name',label:'Name',placeholder:'Your name',type:'text'},{name:'email',label:'Email',placeholder:'you@example.com',type:'email'},{name:'subject',label:'Subject',placeholder:'How can we connect?',type:'text'}].map(field=><div key={field.name}><label htmlFor={`contact-${field.name}`}>{field.label}</label><Input id={`contact-${field.name}`} name={field.name} type={field.type} placeholder={field.placeholder} value={formData[field.name as keyof typeof formData]} onChange={handleChange} required/></div>)}<div><label htmlFor="contact-message">Message</label><Textarea id="contact-message" name="message" placeholder="Your message…" value={formData.message} onChange={handleChange} required rows={6}/></div><Button type="submit" disabled={isSubmitting} className="concept-send-button w-full">{isSubmitting?'Sending…':'Send message'}<Send size={17} className="ml-2"/></Button></div></form>
    </div></section>
  );
};
export default Contact;
