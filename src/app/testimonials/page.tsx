"use client";

import React from "react";
import { motion } from "framer-motion";

const testimonials = [
  {
    id: 1,
    quote: "A transformative cup. The Obsidian Roast redefined my morning ritual. It's not just coffee; it's a sensory awakening.",
    author: "Elena R.",
    title: "Master Sommelier",
    rating: 5,
    span: "md:col-span-2 lg:col-span-2",
  },
  {
    id: 2,
    quote: "The precision in their extraction is unmatched. Absolutely profound.",
    author: "James M.",
    title: "Culinary Director",
    rating: 5,
    span: "md:col-span-1 lg:col-span-1",
  },
  {
    id: 3,
    quote: "Stepping into The Void is an experience in pure sensory elegance. The attention to detail is evident in every single drop.",
    author: "Sophia L.",
    title: "Coffee Enthusiast",
    rating: 5,
    span: "md:col-span-1 lg:col-span-1",
  },
  {
    id: 4,
    quote: "The Midnight Brew carries notes I've never encountered. Masterful. It bridges the gap between science and art.",
    author: "David K.",
    title: "Food Critic",
    rating: 5,
    span: "md:col-span-2 lg:col-span-2",
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut" as const,
    },
  },
};

const Star = () => (
  <svg className="w-4 h-4 text-[#D4A373] inline-block mr-1" fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

export default function TestimonialsPage() {
  return (
    <main className="min-h-screen pt-32 pb-32 px-6 md:px-12 max-w-7xl mx-auto relative overflow-x-clip">
      {/* Background Decor */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#D4A373] rounded-full mix-blend-screen filter blur-[150px] opacity-[0.03] animate-pulse pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-white rounded-full mix-blend-screen filter blur-[120px] opacity-[0.02] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="mb-24 text-center relative z-10"
      >
        <div className="flex justify-center mb-6 space-x-2">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="w-1 h-1 bg-[#D4A373] rounded-full" />
          ))}
        </div>
        <h1 className="font-[family-name:var(--font-playfair)] text-5xl md:text-8xl font-bold mb-6 tracking-wider text-white drop-shadow-2xl">
          ECHOES
        </h1>
        <p className="font-[family-name:var(--font-inter)] text-stone-400 max-w-xl mx-auto tracking-widest uppercase text-xs leading-loose">
          Words from those who have crossed the threshold into the void.
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10"
      >
        {testimonials.map((testimonial) => (
          <motion.div key={testimonial.id} variants={itemVariants} className={`group relative ${testimonial.span}`}>
            <div className="absolute inset-0 bg-gradient-to-br from-[#D4A373]/0 to-[#D4A373]/10 opacity-0 group-hover:opacity-100 transition-all duration-1000 blur-3xl -z-10 rounded-xl" />
            <div className="relative h-full p-10 md:p-14 bg-[#050505]/60 backdrop-blur-md border border-white/5 transition-all duration-700 group-hover:border-[#D4A373]/30 rounded-sm flex flex-col justify-between overflow-hidden">

              {/* Corner Accent */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              <div className="absolute top-8 left-8 text-[#D4A373]/10 font-[family-name:var(--font-playfair)] text-8xl leading-none transition-transform duration-700 group-hover:-translate-y-2 group-hover:text-[#D4A373]/20">
                "
              </div>

              <div className="relative z-10 mb-12 mt-4">
                <div className="flex mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} />
                  ))}
                </div>
                <p className="font-[family-name:var(--font-playfair)] text-2xl md:text-3xl text-stone-200 leading-snug italic font-light drop-shadow-lg group-hover:text-white transition-colors duration-500">
                  {testimonial.quote}
                </p>
              </div>

              <div className="mt-auto border-t border-white/10 pt-8 flex items-center justify-between relative z-10">
                <div>
                  <h3 className="font-[family-name:var(--font-inter)] text-sm tracking-[0.3em] text-white uppercase mb-2 group-hover:text-[#D4A373] transition-colors duration-500">
                    {testimonial.author}
                  </h3>
                  <p className="font-[family-name:var(--font-inter)] text-xs tracking-[0.2em] text-stone-500 uppercase">
                    {testimonial.title}
                  </p>
                </div>
                <div className="w-8 h-[1px] bg-white/20 group-hover:w-16 group-hover:bg-[#D4A373] transition-all duration-700" />
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="mt-32 text-center border-t border-white/5 pt-20 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-16 bg-gradient-to-b from-[#D4A373] to-transparent" />
        <h3 className="font-[family-name:var(--font-playfair)] text-4xl text-white mb-10 tracking-wide">Experience the darkness yourself.</h3>
        <a href="/#experience" className="relative overflow-hidden group inline-block px-12 py-5 border border-[#D4A373]/30 text-[#D4A373] hover:border-[#D4A373] hover:text-[#050505] font-[family-name:var(--font-inter)] text-xs uppercase tracking-[0.2em] transition-all duration-700">
          <span className="relative z-10">Return to the Origin</span>
          <div className="absolute inset-0 bg-[#D4A373] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19_1_0.22_1)] z-0" />
        </a>
      </div>
    </main>
  );
}
