'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

export default function Home() {
  const [email, setEmail] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Email submitted:', email);
    setEmail('');
  };

  return (
    <div ref={containerRef} className="relative min-h-screen overflow-hidden bg-[#0A0A0A]">
      {/* Animated mesh gradient background */}
      <div className="absolute inset-0 bg-[#0A0A0A]">
        {/* Animated gradient orbs */}
        <motion.div
          className="absolute top-0 left-0 w-[500px] h-[500px] bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-red-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-[500px] h-[500px] bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />

        {/* Animated grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_70%,transparent_100%)]">
          <motion.div
            className="absolute inset-0"
            animate={{
              backgroundPosition: [
                "0% 0%",
                "100% 100%",
                "0% 0%"
              ],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>

        {/* Animated noise texture */}
        <motion.div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            backgroundSize: "200px 200px",
          }}
          animate={{
            backgroundPosition: [
              "0% 0%",
              "100% 100%",
              "0% 0%"
            ],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        {/* Interactive gradient overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-red-500/10"
          animate={{
            backgroundPosition: [
              `${mousePosition.x / window.innerWidth * 100}% ${mousePosition.y / window.innerHeight * 100}%`,
              `${(mousePosition.x + 100) / window.innerWidth * 100}% ${(mousePosition.y + 100) / window.innerHeight * 100}%`,
            ],
          }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Enhanced floating particles with trails */}
      {[...Array(40)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-orange-500/20 rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            scale: 0,
            opacity: 0,
          }}
          animate={{
            y: [0, -300, 0],
            x: [0, Math.random() * 300 - 150, 0],
            scale: [0, 2, 0],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: Math.random() * 20 + 20,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "linear",
          }}
        >
          <motion.div
            className="absolute inset-0 bg-orange-500/10 rounded-full blur-sm"
            animate={{
              scale: [1, 3, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      ))}

      {/* Main content */}
      <motion.div
        style={{ y, opacity }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center max-w-5xl mx-auto min-h-screen flex flex-col items-center justify-center p-4"
      >
        {/* Enhanced logo animation */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <motion.div
            className="w-32 h-32 mx-auto bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center relative"
            animate={{
              boxShadow: [
                "0 0 20px rgba(251,146,60,0.3)",
                "0 0 40px rgba(251,146,60,0.5)",
                "0 0 20px rgba(251,146,60,0.3)",
              ],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                y: [0, -5, 0],
              }}
              transition={{ 
                scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                y: { duration: 3, repeat: Infinity, ease: "easeInOut" }
              }}
              className="relative w-16 h-16"
            >
              <Image
                src="/logo.svg"
                alt="Logo"
                fill
                className="object-contain"
                priority
              />
            </motion.div>
            <motion.div
              className="absolute inset-0 rounded-full border-4 border-orange-400/30"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </motion.div>

        {/* Enhanced heading with text animation */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-6xl md:text-8xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-orange-500 to-red-600 relative"
        >
          <motion.span
            className="absolute inset-0 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-orange-500 to-red-600 blur-sm"
            animate={{
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            Something Amazing is Coming Soon
          </motion.span>
          Something Amazing is Coming Soon
        </motion.h1>
        
        {/* Enhanced subheading */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl relative"
        >
          <motion.span
            className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-red-500/10 blur-xl"
            animate={{
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          We're crafting something extraordinary that will revolutionize your experience. Stay tuned for the big reveal!
        </motion.p>

        {/* Enhanced form with more interactive elements */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          onSubmit={handleSubmit}
          className="max-w-md mx-auto w-full"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <motion.div
              className="flex-1 relative"
              whileHover={{ scale: 1.02 }}
              animate={{ scale: isFocused ? 1.02 : 1 }}
            >
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-500 to-red-600 blur-lg opacity-0"
                animate={{
                  opacity: isFocused ? 0.3 : 0
                }}
                transition={{ duration: 0.3 }}
              />
              <motion.input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                type="email"
                placeholder="Enter your email"
                className="w-full px-6 py-4 rounded-full bg-gray-800/50 border-2 border-transparent focus:outline-none focus:border-orange-500 backdrop-blur-sm text-white placeholder-gray-400 transition-all duration-300 shadow-lg hover:shadow-orange-500/10 relative z-10"
                required
              />
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-500/20 to-red-500/20 opacity-0"
                animate={{
                  opacity: email ? 0.5 : 0
                }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
            <motion.button
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 0 30px rgba(251,146,60,0.5)",
                background: "linear-gradient(45deg, #f97316, #ef4444, #f97316)",
                backgroundSize: "200% 200%",
              }}
              animate={{
                backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="px-8 py-4 rounded-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 transition-all duration-300 font-medium text-white shadow-lg hover:shadow-orange-500/25 flex items-center justify-center gap-2 min-w-[140px] relative overflow-hidden group"
            >
              <span className="relative z-10">Notify Me</span>
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="relative z-10"
              >
                →
              </motion.span>
              <motion.div
                className="absolute inset-0 bg-white/20"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </div>
        </motion.form>
      </motion.div>
    </div>
  );
}
