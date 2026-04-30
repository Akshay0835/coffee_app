"use client";
import { Variants } from "framer-motion";
import React from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, ArrowRight } from "lucide-react";

export default function ContactPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <main className="min-h-screen pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto relative overflow-x-clip">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D4A373]/5 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 relative z-10"
      >
        {/* Left Column: Info */}
        <div className="flex flex-col justify-center mt-12 lg:mt-0">
          <motion.div variants={itemVariants} className="mb-4 flex items-center space-x-4">
            <div className="h-px w-12 bg-[#D4A373]" />
            <span className="font-[family-name:var(--font-inter)] text-[#D4A373] text-xs tracking-[0.3em] uppercase">
              Get in Touch
            </span>
          </motion.div>

          <motion.h1 variants={itemVariants} className="font-[family-name:var(--font-playfair)] text-5xl md:text-7xl font-bold mb-8 tracking-wide text-white leading-tight">
            REACH THE <br className="hidden md:block" />
            <span className="italic text-stone-400 font-light">VOID</span>
          </motion.h1>

          <motion.p variants={itemVariants} className="font-[family-name:var(--font-inter)] text-stone-400 text-sm md:text-base leading-relaxed mb-12 max-w-md">
            Whether you seek a private tasting, a wholesale partnership, or simply wish to discuss the nuances of our latest roast, we invite your inquiry.
          </motion.p>

          <div className="space-y-8">
            <motion.div variants={itemVariants} className="flex items-start group">
              <div className="mt-1 mr-6 text-stone-600 group-hover:text-[#D4A373] transition-colors duration-500">
                <MapPin strokeWidth={1.5} size={24} />
              </div>
              <div>
                <h3 className="text-white font-[family-name:var(--font-inter)] text-xs tracking-widest uppercase mb-2">The Roastery</h3>
                <p className="text-stone-400 text-sm font-[family-name:var(--font-inter)] leading-relaxed">
                  124 Obsidian Way<br />
                  Design District, NY 10001<br />
                  By Appointment Only
                </p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex items-start group">
              <div className="mt-1 mr-6 text-stone-600 group-hover:text-[#D4A373] transition-colors duration-500">
                <Mail strokeWidth={1.5} size={24} />
              </div>
              <div>
                <h3 className="text-white font-[family-name:var(--font-inter)] text-xs tracking-widest uppercase mb-2">Electronic</h3>
                <a href="mailto:inquiries@voidcoffee.com" className="text-stone-400 text-sm font-[family-name:var(--font-inter)] hover:text-white transition-colors duration-300">
                  inquiries@voidcoffee.com
                </a>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex items-start group">
              <div className="mt-1 mr-6 text-stone-600 group-hover:text-[#D4A373] transition-colors duration-500">
                <Phone strokeWidth={1.5} size={24} />
              </div>
              <div>
                <h3 className="text-white font-[family-name:var(--font-inter)] text-xs tracking-widest uppercase mb-2">Direct</h3>
                <p className="text-stone-400 text-sm font-[family-name:var(--font-inter)]">
                  +1 (555) 019-8372
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Right Column: Form */}
        <motion.div variants={itemVariants} className="relative mt-8 lg:mt-0">
          {/* Glassmorphism card effect */}
          <div className="absolute inset-0 bg-white/[0.01] border border-white/[0.05] backdrop-blur-3xl -m-6 md:-m-12 p-6 md:p-12 z-0 hidden md:block" />

          <form className="relative z-10 space-y-10" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="relative group">
                <input
                  type="text"
                  id="name"
                  required
                  className="w-full bg-transparent border-b border-stone-800 py-3 text-white focus:outline-none focus:border-[#D4A373] transition-colors peer font-[family-name:var(--font-inter)] text-sm"
                  placeholder=" "
                />
                <label htmlFor="name" className="absolute left-0 top-3 text-stone-500 text-xs uppercase tracking-widest transition-all peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-[#D4A373] peer-valid:-top-4 peer-valid:text-[10px] peer-valid:text-stone-400 cursor-text">
                  Your Name
                </label>
              </div>
              <div className="relative group">
                <input
                  type="email"
                  id="email"
                  required
                  className="w-full bg-transparent border-b border-stone-800 py-3 text-white focus:outline-none focus:border-[#D4A373] transition-colors peer font-[family-name:var(--font-inter)] text-sm"
                  placeholder=" "
                />
                <label htmlFor="email" className="absolute left-0 top-3 text-stone-500 text-xs uppercase tracking-widest transition-all peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-[#D4A373] peer-valid:-top-4 peer-valid:text-[10px] peer-valid:text-stone-400 cursor-text">
                  Your Email
                </label>
              </div>
            </div>

            <div className="relative group">
              <input
                type="text"
                id="subject"
                required
                className="w-full bg-transparent border-b border-stone-800 py-3 text-white focus:outline-none focus:border-[#D4A373] transition-colors peer font-[family-name:var(--font-inter)] text-sm"
                placeholder=" "
              />
              <label htmlFor="subject" className="absolute left-0 top-3 text-stone-500 text-xs uppercase tracking-widest transition-all peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-[#D4A373] peer-valid:-top-4 peer-valid:text-[10px] peer-valid:text-stone-400 cursor-text">
                Subject
              </label>
            </div>

            <div className="relative group">
              <textarea
                id="message"
                required
                rows={4}
                className="w-full bg-transparent border-b border-stone-800 py-3 text-white focus:outline-none focus:border-[#D4A373] transition-colors peer font-[family-name:var(--font-inter)] text-sm resize-none"
                placeholder=" "
              ></textarea>
              <label htmlFor="message" className="absolute left-0 top-3 text-stone-500 text-xs uppercase tracking-widest transition-all peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-[#D4A373] peer-valid:-top-4 peer-valid:text-[10px] peer-valid:text-stone-400 cursor-text">
                Message
              </label>
            </div>

            <div className="pt-6">
              <button type="submit" className="relative overflow-hidden group/btn flex items-center justify-between w-full px-8 py-5 border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-500">
                <span className="font-[family-name:var(--font-inter)] text-white text-xs tracking-[0.2em] uppercase relative z-10 group-hover/btn:text-[#D4A373] transition-colors duration-500">
                  Transmit Request
                </span>
                <span className="relative z-10 text-stone-500 group-hover/btn:text-[#D4A373] transform group-hover/btn:translate-x-2 transition-all duration-500">
                  <ArrowRight strokeWidth={1.5} size={18} />
                </span>
                {/* Subtle highlight line on top */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" />
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </main>
  );
}
