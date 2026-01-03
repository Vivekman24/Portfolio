'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Mail, Phone, MapPin, Send, Github, Linkedin } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import TiltCard from '@/components/tilt-card';
import MagneticButton from '@/components/magnetic-button';

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
          to_email: 'manthrivivek@gmail.com',
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
      value: 'manthrivivek@gmail.com',
      href: 'mailto:manthrivivek@gmail.com'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+1 (248) 759-7187',
      href: 'tel:+12487597187'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'South Brunswick, NJ',
      href: '#'
    }
  ];

  const socialLinks = [
    {
      icon: Github,
      label: 'GitHub',
      href: 'https://github.com/Vivekman24',
      color: 'hover:text-gray-400'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      href: 'https://linkedin.com/in/vivek-sai-manthri',
      color: 'hover:text-blue-400'
    }
  ];

  return (
    <section id="contact" className="py-20 px-4 relative bg-slate-900/80 md:bg-transparent">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Get In Touch</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Ready to bring your ideas to life? Let&apos;s discuss your next project or collaboration. 
            I&apos;m always excited to work on innovative solutions!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <TiltCard tiltStrength={5} glareEnable={true}>
            <Card className="glass dark:glass-dark border-white/10 hover:border-cyan-500/30 transition-all duration-300">
              <CardHeader>
                <h3 className="text-2xl font-bold text-white">Send Message</h3>
                <p className="text-gray-400">
                  Fill out the form below and I&apos;ll get back to you as soon as possible.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Input
                        name="name"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-400"
                      />
                    </div>
                    <div>
                      <Input
                        name="email"
                        type="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-400"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Input
                      name="subject"
                      placeholder="Subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-400"
                    />
                  </div>
                  
                  <div>
                    <Textarea
                      name="message"
                      placeholder="Your Message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-400 resize-none"
                    />
                  </div>
                  
                  <MagneticButton strength={0.15} className="w-full">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white py-3"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center space-x-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          <span>Sending...</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <Send size={20} />
                          <span>Send Message</span>
                        </div>
                      )}
                    </Button>
                  </MagneticButton>
                </form>
              </CardContent>
            </Card>
            </TiltCard>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Contact Details */}
            <TiltCard tiltStrength={6} glareEnable={true}>
            <Card className="glass dark:glass-dark border-white/10 hover:border-cyan-500/30 transition-all duration-300">
              <CardHeader>
                <h3 className="text-2xl font-bold text-white">Contact Information</h3>
                <p className="text-gray-400">
                  Prefer direct contact? Here are my details.
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <motion.div
                      key={info.label}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center space-x-4"
                    >
                      <div className="p-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500">
                        <Icon size={20} className="text-white" />
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">{info.label}</p>
                        {info.href === '#' ? (
                          <p className="text-white font-medium">{info.value}</p>
                        ) : (
                          <a
                            href={info.href}
                            className="text-white font-medium hover:text-cyan-400 transition-colors"
                          >
                            {info.value}
                          </a>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </CardContent>
            </Card>
            </TiltCard>

            {/* Social Links */}
            <TiltCard tiltStrength={8} glareEnable={true}>
            <Card className="glass dark:glass-dark border-white/10 hover:border-cyan-500/30 transition-all duration-300">
              <CardHeader>
                <h3 className="text-xl font-bold text-white">Connect With Me</h3>
                <p className="text-gray-400">
                  Follow my work and connect on social platforms.
                </p>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-4">
                  {socialLinks.map((link, index) => {
                    const Icon = link.icon;
                    return (
                      <MagneticButton key={link.label} strength={0.4}>
                        <motion.a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          viewport={{ once: true }}
                          whileHover={{ scale: 1.1 }}
                          className={`p-3 rounded-full bg-white/10 text-gray-300 ${link.color} transition-all duration-300 hover:bg-white/20 hover:shadow-lg`}
                        >
                          <Icon size={24} />
                        </motion.a>
                      </MagneticButton>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
            </TiltCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;