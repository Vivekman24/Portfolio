'use client';

import { motion } from 'framer-motion';
import { ChevronUp } from 'lucide-react';

const ScrollToTop = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="flex flex-col items-center gap-3"
      >
        <motion.button
          onClick={scrollToTop}
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          whileHover={{ scale: 1.1 }}
          className="text-cyan-400 hover:text-cyan-300 transition-colors duration-300 p-3 rounded-full border border-cyan-500/30 hover:border-cyan-400/50 hover:bg-cyan-500/10"
        >
          <ChevronUp size={24} />
        </motion.button>
        <motion.span
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-xs text-gray-400 uppercase tracking-widest"
        >
          Scroll Up
        </motion.span>
      </motion.div>
    </div>
  );
};

export default ScrollToTop;

