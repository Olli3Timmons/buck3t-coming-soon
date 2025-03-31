'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { ContainerTextFlip } from './components/ui/container-text-flip';
import { Badge } from './components/ui/badge';
import { supabase } from './lib/supabase';

export default function Home() {
  const [email, setEmail] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    // Set initial window size
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight
    });

    // Handle window resize
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    // Handle mouse move
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // First check if email already exists
      const { data: existingEntry, error: checkError } = await supabase
        .from('waitlist')
        .select('email')
        .eq('email', email)
        .single();

      if (checkError && checkError.code !== 'PGRST116') { // PGRST116 is "no rows returned"
        throw checkError;
      }

      if (existingEntry) {
        setSubmitStatus('error');
        return;
      }

      // Insert new entry
      const { error: insertError } = await supabase
        .from('waitlist')
        .insert([{ email }]);

      if (insertError) {
        console.error('Supabase error:', insertError);
        throw insertError;
      }

      setSubmitStatus('success');
      setEmail('');
    } catch (error: any) {
      console.error('Error submitting email:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main 
      ref={containerRef} 
      className="relative min-h-screen overflow-hidden bg-[#0A0A0A]"
      role="main"
      aria-label="Coming soon page"
    >
      {/* Background effects */}
      <div className="absolute inset-0 bg-[#0A0A0A]">
        {/* Gradient orbs with refined opacity */}
        <motion.div
          className="absolute top-0 left-0 w-[500px] h-[500px] bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-15"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-red-500 rounded-full mix-blend-multiply filter blur-3xl opacity-15"
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
            scale: [1.2, 1, 1.2],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-[500px] h-[500px] bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />

        {/* Refined grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_70%,transparent_100%)]">
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

        {/* Subtle noise texture */}
        <motion.div
          className="absolute inset-0 opacity-[0.02]"
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
          className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-red-500/5"
          animate={{
            backgroundPosition: [
              `${mousePosition.x / windowSize.width * 100}% ${mousePosition.y / windowSize.height * 100}%`,
              `${(mousePosition.x + 100) / windowSize.width * 100}% ${(mousePosition.y + 100) / windowSize.height * 100}%`,
            ],
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>

      {/* Floating particles with optimized count */}
      {[...Array(35)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-orange-500/15 rounded-full"
          initial={{
            x: Math.random() * windowSize.width,
            y: Math.random() * windowSize.height,
            scale: 0,
            opacity: 0,
          }}
          animate={{
            y: [0, -300, 0],
            x: [0, Math.random() * 300 - 150, 0],
            scale: [0, 2, 0],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: Math.random() * 20 + 20,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "linear",
          }}
        >
          <motion.div
            className="absolute inset-0 bg-orange-500/8 rounded-full blur-sm"
            animate={{
              scale: [1, 3, 1],
              opacity: [0.2, 0.4, 0.2],
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
        {/* Logo section */}
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
                "0 0 20px rgba(251,146,60,0.2)",
                "0 0 40px rgba(251,146,60,0.4)",
                "0 0 20px rgba(251,146,60,0.2)",
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
                alt="BUCK3T logo"
                fill
                className="object-contain"
                priority
              />
            </motion.div>
            <motion.div
              className="absolute inset-0 rounded-full border-4 border-orange-400/20"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </motion.div>

        {/* Brand name section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="mb-4"
        >
          <motion.h2
            className="text-4xl md:text-5xl font-black tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-orange-500 to-red-600 relative"
          >
            <motion.span
              className="absolute inset-0 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-orange-500 to-red-600 blur-xl"
              animate={{
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              BUCK3T
            </motion.span>
            BUCK3T
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-3"
          >
            <Badge text="Coming Soon" />
          </motion.div>
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-red-500/5 to-orange-500/10 blur-2xl"
            animate={{
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        {/* Heading section */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-orange-500 to-red-600 relative tracking-tight"
        >
          <motion.span
            className="absolute inset-0 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-orange-500 to-red-600 blur-sm"
            animate={{
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            The Easiest Way to Get Your <ContainerTextFlip words={["Car", "Vehicle", "Ride", "Whip"]} /> Detailed!
          </motion.span>
          The Easiest Way to Get Your <ContainerTextFlip words={["Car", "Vehicle", "Ride", "Whip"]} /> Detailed!
        </motion.h1>
        
        {/* Subheading section */}
        <div className="relative">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-lg sm:text-xl md:text-2xl text-gray-200 mb-12 max-w-2xl font-light leading-relaxed"
          >
            BUCK3T connects you with top-rated detailing services nearby. Fast, easy, and hassle-free! 
          </motion.p>
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-red-500/5 to-orange-500/10 blur-2xl"
            animate={{
              opacity: [0.3, 0.5, 0.3],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute -inset-1 bg-gradient-to-r from-orange-500/5 to-red-500/5 rounded-lg blur-xl"
            animate={{
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />
        </div>

        {/* CTA section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mb-8"
        >
          <p className="text-lg md:text-xl text-gray-300 font-medium">
            Get notified when <span className="text-orange-400 font-bold">BUCK3T</span> launches!
          </p>
        </motion.div>

        {/* Form section */}
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
                  opacity: isFocused ? 0.2 : 0
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
                aria-label="Email address"
                disabled={isSubmitting}
              />
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-500/10 to-red-500/10 opacity-0"
                animate={{
                  opacity: email ? 0.3 : 0
                }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
            <motion.button
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 0 30px rgba(251,146,60,0.4)",
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
              className="px-8 py-4 rounded-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 transition-all duration-300 font-medium text-white shadow-lg hover:shadow-orange-500/25 flex items-center justify-center gap-2 min-w-[140px] relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Submit email"
              disabled={isSubmitting}
            >
              <span className="relative z-10">
                {isSubmitting ? 'Submitting...' : 'Notify Me'}
              </span>
              {!isSubmitting && (
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="relative z-10"
                  aria-hidden="true"
                >
                  →
                </motion.span>
              )}
              <motion.div
                className="absolute inset-0 bg-white/20"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </div>
          {submitStatus === 'success' && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 text-green-400 font-medium"
            >
              You're on the list! We'll hit you up when BUCK3T drops. 🚗✨
            </motion.p>
          )}
          {submitStatus === 'error' && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 text-red-400 font-medium"
            >
              {email && submitStatus === 'error' ? 'You\'re already on the waitlist! We\'ll see you soon. 🚗' : 'Something went wrong. Please try again.'}
            </motion.p>
          )}
        </motion.form>
      </motion.div>
    </main>
  );
}
