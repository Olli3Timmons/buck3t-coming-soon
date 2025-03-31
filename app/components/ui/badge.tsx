'use client';

import { motion } from 'framer-motion';

interface BadgeProps {
  text: string;
  className?: string;
}

export function Badge({ text, className = '' }: BadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 ${className}`}
    >
      <motion.div
        className="w-2 h-2 rounded-full bg-emerald-500"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <span className="text-sm font-medium text-gray-200">{text}</span>
    </motion.div>
  );
} 