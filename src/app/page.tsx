"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import CoffeeCanvas from "@/components/CoffeeCanvas";

const products = [
  {
    id: 1,
    name: "OBSIDIAN ROAST",
    origin: "Colombia, Huila",
    notes: "Dark Chocolate, Molasses, Black Cherry",
    price: "$28",
    image: "/products/black_bag.png",
  },
  {
    id: 2,
    name: "THE MIDNIGHT BREW",
    origin: "Ethiopia, Yirgacheffe",
    notes: "Jasmine, Blueberry, Earl Grey",
    price: "$34",
    image: "/products/white_bag.png",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.3, delayChildren: 0.2 },
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

export default function Home() {
  const experienceRef = useRef<HTMLElement>(null);
  const { scrollYProgress: experienceScrollY } = useScroll({
    target: experienceRef,
    offset: ["start start", "end end"]
  });

  // Opacity transforms for each beat
  const beatAOpacity = useTransform(experienceScrollY, [0, 0.05, 0.15, 0.20], [0, 1, 1, 0]);
  const beatBOpacity = useTransform(experienceScrollY, [0.25, 0.30, 0.45, 0.55], [0, 1, 1, 0]);
  const beatCOpacity = useTransform(experienceScrollY, [0.60, 0.65, 0.80, 0.85], [0, 1, 1, 0]);
  const beatDOpacity = useTransform(experienceScrollY, [0.90, 0.95, 1, 1], [0, 1, 1, 1]);

  // Story scroll
  const storyContainerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: storyScrollY } = useScroll({
    target: storyContainerRef,
    offset: ["start end", "end start"]
  });

  const storyY1 = useTransform(storyScrollY, [0, 1], [100, -100]);
  const storyY2 = useTransform(storyScrollY, [0, 1], [-100, 100]);

  return (
    <main className="w-full bg-[#050505] overflow-x-clip">
      {/* 1. EXPERIENCE SECTION */}
      <section ref={experienceRef} id="experience" className="relative w-full h-[400vh] bg-transparent">
        {/* Background Canvas */}
        <div className="absolute inset-0 z-0">
          <CoffeeCanvas scrollProgress={experienceScrollY} />
        </div>

        {/* Foreground Scrollytelling Beats */}
        <div className="sticky top-0 w-full h-screen z-10 flex flex-col items-center justify-center pointer-events-none">

          {/* BEAT A: The Origin */}
          <motion.div
            style={{ opacity: beatAOpacity }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center p-6"
          >
            <h2 className="font-[family-name:var(--font-playfair)] text-5xl md:text-7xl font-bold text-white mb-4 tracking-wide mix-blend-difference">
              THE ROAST.
            </h2>
            <p className="font-[family-name:var(--font-inter)] text-sm md:text-base text-stone-400 max-w-md tracking-widest uppercase">
              Precision-fired at 200°C to unlock the soul of the bean.
            </p>
          </motion.div>

          {/* BEAT B: The Extraction */}
          <motion.div
            style={{ opacity: beatBOpacity }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center p-6"
          >
            <h2 className="font-[family-name:var(--font-playfair)] text-5xl md:text-7xl font-bold text-white mb-4 tracking-wide mix-blend-difference">
              THE BLOOM.
            </h2>
            <p className="font-[family-name:var(--font-inter)] text-sm md:text-base text-stone-400 max-w-md tracking-widest uppercase">
              Carbon dioxide escapes. The ritual begins.
            </p>
          </motion.div>

          {/* BEAT C: The Texture */}
          <motion.div
            style={{ opacity: beatCOpacity }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center p-6"
          >
            <h2 className="font-[family-name:var(--font-playfair)] text-5xl md:text-7xl font-bold text-white mb-4 tracking-wide mix-blend-difference">
              VELVET CREMA.
            </h2>
            <p className="font-[family-name:var(--font-inter)] text-sm md:text-base text-[#D4A373] max-w-md tracking-widest uppercase">
              A golden, pressurized emulsion of oils and essence.
            </p>
          </motion.div>

          {/* BEAT D: The Moment */}
          <motion.div
            style={{ opacity: beatDOpacity }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-gradient-to-t from-[#050505] to-transparent via-[#050505]/80"
          >
            <div className="mt-auto mb-32 flex flex-col items-center">
              <h2 className="font-[family-name:var(--font-playfair)] text-6xl md:text-8xl font-bold text-white mb-6 tracking-wide drop-shadow-2xl">
                SIP THE DARKNESS.
              </h2>
              <a href="#story" className="relative overflow-hidden group pointer-events-auto px-10 py-5 bg-white/5 border border-white/20 text-white font-[family-name:var(--font-inter)] tracking-[0.2em] text-sm uppercase transition-all duration-700 backdrop-blur-md">
                <span className="relative z-10 group-hover:text-[#050505] transition-colors duration-500">Discover Our Story</span>
                <div className="absolute inset-0 bg-[#D4A373] scale-y-0 origin-bottom group-hover:scale-y-100 transition-transform duration-500 ease-[cubic-bezier(0.19_1_0.22_1)] z-0" />
              </a>
            </div>
          </motion.div>

        </div>
      </section>

      {/* 2. STORY SECTION */}
      <section id="story" className="relative z-20 w-full min-h-screen py-32 px-6 md:px-12 bg-[#050505]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="font-[family-name:var(--font-playfair)] text-5xl md:text-8xl font-bold mb-12 tracking-wide text-center">
              OUR STORY
            </h1>

            <div ref={storyContainerRef} className="grid grid-cols-1 md:grid-cols-2 gap-16 mt-24 items-center">
              <motion.div style={{ y: storyY1 }}>
                <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-bold tracking-[0.1em] text-[#D4A373] mb-6">
                  THE SOURCE
                </h2>
                <p className="font-[family-name:var(--font-inter)] text-stone-300 leading-relaxed text-sm mb-6">
                  We travel to the highest altitudes, seeking micro-lots that ordinary roasters ignore. The Void isn’t just a brand; it’s an obsession with the purest expression of terroir.
                </p>
                <p className="font-[family-name:var(--font-inter)] text-stone-300 leading-relaxed text-sm">
                  Our partner farms in Colombia and Ethiopia cultivate rare varietals under the canopy of ancient forests, hand-picking only the ripest cherries.
                </p>
              </motion.div>

              <motion.div style={{ y: storyY2 }} className="relative aspect-square border border-white/5 p-4 rounded-sm overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] to-[#111] z-0 transition-transform duration-1000 group-hover:scale-105" />
                <div className="relative z-10 w-full h-full flex items-center justify-center border border-white/5 bg-[#050505]/40 backdrop-blur-md">
                  <span className="font-[family-name:var(--font-playfair)] text-stone-500 text-6xl opacity-40 italic tracking-wider">Est. 2026</span>
                </div>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mt-32 items-center">
              <div className="order-2 md:order-1 relative aspect-[4/3] border border-[#D4A373]/20 p-4">
                <div className="absolute inset-0 bg-[#050505] z-0" />
                <div className="relative z-10 w-full h-full flex items-center justify-center bg-white/5 backdrop-blur-sm">
                  <span className="font-[family-name:var(--font-inter)] text-[#D4A373] tracking-[0.4em] uppercase text-xs">200°C Precision</span>
                </div>
              </div>

              <div className="order-1 md:order-2">
                <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-bold tracking-[0.1em] text-white mb-6">
                  THE RITUAL
                </h2>
                <p className="font-[family-name:var(--font-inter)] text-stone-300 leading-relaxed text-sm mb-6">
                  Roasting is an act of controlled destruction. We push our beans to the very edge of the void, caramelizing sugars and unleashing volatile aromatics without ever crossing into bitterness.
                </p>
                <p className="font-[family-name:var(--font-inter)] text-stone-300 leading-relaxed text-sm">
                  The result is a cup of profound depth. A velvet crema that coats the palate. A moment of absolute silence in a noisy world.
                </p>
              </div>
            </div>

            <div className="mt-40 text-center border-t border-white/5 pt-20 relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-16 bg-gradient-to-b from-[#D4A373] to-transparent" />
              <h3 className="font-[family-name:var(--font-playfair)] text-5xl md:text-6xl text-white mb-10 tracking-wide">Ready to step into the dark?</h3>
              <a href="#shop" className="relative overflow-hidden group inline-block px-12 py-5 border border-[#D4A373]/30 text-[#D4A373] hover:border-[#D4A373] hover:text-[#050505] font-[family-name:var(--font-inter)] text-xs uppercase tracking-[0.2em] transition-all duration-700">
                <span className="relative z-10">Explore the Collection</span>
                <div className="absolute inset-0 bg-[#D4A373] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19_1_0.22_1)] z-0" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. SHOP SECTION */}
      <section id="shop" className="relative z-20 w-full min-h-screen py-32 px-6 md:px-12 bg-[#050505]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-20 text-center"
          >
            <h1 className="font-[family-name:var(--font-playfair)] text-5xl md:text-7xl font-bold mb-6 tracking-wide">
              THE COLLECTION
            </h1>
            <p className="font-[family-name:var(--font-inter)] text-stone-400 max-w-lg mx-auto tracking-widest uppercase text-sm">
              Precision-roasted small batches. Sourced from the world's most exclusive micro-lots.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 relative z-10"
          >
            {products.map((product) => (
              <motion.div key={product.id} variants={itemVariants} className="group cursor-pointer relative">
                <div className="absolute inset-0 bg-gradient-to-b from-[#D4A373]/0 to-[#D4A373]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-3xl -z-10" />
                <div className="relative aspect-[4/5] mb-8 bg-gradient-to-b from-[#0a0a0a] to-[#050505] border border-white/5 overflow-hidden transition-all duration-700 group-hover:border-[#D4A373]/30 rounded-sm shadow-2xl shadow-black/50">
                  {/* Subtle hover glow */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#D4A373]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0" />

                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover scale-95 group-hover:scale-105 transition-transform duration-[1.5s] ease-[cubic-bezier(0.19_1_0.22_1)] z-10 drop-shadow-2xl"
                    priority
                  />
                </div>

                <div className="flex flex-col items-center text-center">
                  <h2 className="font-[family-name:var(--font-playfair)] text-2xl md:text-3xl font-bold tracking-[0.2em] mb-3 text-white group-hover:text-[#D4A373] transition-colors duration-500">
                    {product.name}
                  </h2>
                  <div className="font-[family-name:var(--font-inter)] text-xs text-stone-500 uppercase tracking-widest space-y-2 mb-8">
                    <p><span className="text-stone-700 mr-2">—</span>{product.origin}<span className="text-stone-700 ml-2">—</span></p>
                    <p className="text-[#D4A373]/70">{product.notes}</p>
                  </div>
                  <button className="relative overflow-hidden group/btn px-10 py-4 border border-white/10 bg-white/5 backdrop-blur-md text-white font-[family-name:var(--font-inter)] text-xs uppercase tracking-[0.2em] transition-all duration-500 w-full md:w-auto">
                    <span className="relative z-10 group-hover/btn:text-[#050505] transition-colors duration-500">Add to Cart — {product.price}</span>
                    <div className="absolute inset-0 bg-[#D4A373] scale-x-0 origin-left group-hover/btn:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.19_1_0.22_1)] z-0" />
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Contact CTA */}
          <div className="mt-40 text-center border-t border-white/5 pt-20 relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-16 bg-gradient-to-b from-[#D4A373] to-transparent" />
            <h3 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl text-white mb-10 tracking-wide">Seeking a private reserve?</h3>
            <a href="/contact" className="relative overflow-hidden group inline-block px-12 py-5 border border-[#D4A373]/30 text-[#D4A373] hover:border-[#D4A373] hover:text-[#050505] font-[family-name:var(--font-inter)] text-xs uppercase tracking-[0.2em] transition-all duration-700">
              <span className="relative z-10">Contact the Roastery</span>
              <div className="absolute inset-0 bg-[#D4A373] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19_1_0.22_1)] z-0" />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
