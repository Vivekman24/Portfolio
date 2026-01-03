'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const AIChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I am Vivek's personal AI assistant. I can answer any questions about him including his projects, experience, skills, or anything else you would like to know about him. What would you like to learn about Vivek?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const sendMessage = async (message: string) => {
    if (!message.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: message,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue(''); // Clear input after sending
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();

      if (data.error) {
        // Use fallback response if available
        const fallbackText = data.fallback || 'Sorry, I&apos;m having trouble connecting right now. Please try again later or contact Vivek directly.';
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: data.error.includes('rate limit') || data.error.includes('Failed to get AI response') || data.error.includes('Model not available') ? 
            `${fallbackText}\n\n*Note: Using intelligent fallback response. The conversational AI is temporarily unavailable, but I can still answer your questions about Vivek based on his portfolio data.*` : 
            fallbackText,
          sender: 'ai',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, aiMessage]);
      } else {
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: data.response,
          sender: 'ai',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, aiMessage]);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Sorry, I\'m having trouble connecting right now. Please try again later or contact Vivek directly.',
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(inputValue);
    }
  };

  return (
    <>
      {/* Chat Toggle Button - only show when chat is closed */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            className="fixed bottom-6 right-6 z-50"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Button
              onClick={() => setIsOpen(true)}
              className="w-14 h-14 rounded-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 animate-glow"
            >
              <MessageCircle size={24} />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-6 right-6 z-40 w-96 max-w-[calc(100vw-3rem)]"
            style={{ maxHeight: 'calc(100vh - 100px)' }}
          >
            <Card className="bg-slate-900/95 backdrop-blur-lg border border-cyan-500/30 shadow-2xl flex flex-col overflow-hidden" style={{ maxHeight: 'calc(100vh - 100px)' }}>
              <CardHeader className="pb-3 flex-shrink-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500">
                      <Bot size={20} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">AI Assistant</h3>
                      <p className="text-sm text-gray-400">Ask me about Vivek</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(false)}
                    className="text-gray-400 hover:text-white hover:bg-white/10 rounded-full h-8 w-8 p-0"
                  >
                    <X size={18} />
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent className="p-0 flex-1 overflow-hidden flex flex-col min-h-0">
                {/* Messages */}
                <div ref={messagesContainerRef} className="flex-1 min-h-0 px-4 overflow-y-auto custom-scrollbar">
                  <div className="space-y-4 py-4">
                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[80%] p-3 rounded-lg ${
                            message.sender === 'user'
                              ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white'
                              : 'bg-cyan-500/10 text-cyan-200 border border-cyan-500/20'
                          }`}
                        >
                          <div className="flex items-start space-x-2">
                            {message.sender === 'ai' && (
                              <Bot size={16} className="text-cyan-400 mt-0.5 flex-shrink-0" />
                            )}
                            {message.sender === 'user' && (
                              <User size={16} className="text-white mt-0.5 flex-shrink-0" />
                            )}
                            <p className="text-sm leading-relaxed">{message.text}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                    
                    {isLoading && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex justify-start"
                      >
                        <div className="bg-cyan-500/10 border border-cyan-500/20 p-3 rounded-lg">
                          <div className="flex items-center space-x-2">
                            <Bot size={16} className="text-cyan-400" />
                            <Loader2 size={16} className="text-cyan-400 animate-spin" />
                            <span className="text-sm text-cyan-300">Thinking...</span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>
                
                {/* Input */}
                <div className="p-4 border-t border-white/10 flex-shrink-0">
                  <div className="flex space-x-2">
                    <Input
                      ref={inputRef}
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask about Vivek..."
                      className="bg-cyan-500/5 border-cyan-500/20 text-white placeholder:text-cyan-400 focus:border-cyan-400"
                      disabled={isLoading}
                    />
                    <Button
                      onClick={() => sendMessage(inputValue)}
                      disabled={isLoading || !inputValue.trim()}
                      className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700"
                    >
                      <Send size={16} />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChat;