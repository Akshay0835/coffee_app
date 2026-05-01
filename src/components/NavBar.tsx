"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: "Experience", path: "/" },
    { name: "Testimonials", path: "/testimonials" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        className="fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-700 w-[calc(100%-2rem)] md:w-auto"
      >
        <div className="flex items-center justify-between md:justify-start bg-[#111111] backdrop-blur-2xl rounded-full p-2 md:pr-10 border border-white/5 shadow-[0_20px_40px_rgba(0,0,0,0.8)]">

          {/* Logo */}
          <Link href="/" className="group flex items-center gap-3 pl-4 shrink-0" onClick={() => setMobileMenuOpen(false)}>
            <div className="w-1.5 h-1.5 rounded-full bg-[#D4A373] group-hover:scale-150 group-hover:shadow-[0_0_10px_rgba(212,163,115,0.5)] transition-all duration-500" />
            <h1 className="font-[family-name:var(--font-playfair)] text-lg md:text-xl font-bold tracking-[0.3em] text-white transition-colors">
              THE VOID
            </h1>
          </Link>

          {/* Desktop Links */}
          <nav className="hidden md:flex items-center gap-8 ml-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.name}
                  href={link.path}
                  className="group relative font-[family-name:var(--font-inter)] text-sm text-stone-300 hover:text-white transition-colors py-2"
                >
                  <span className="relative z-10">{link.name}</span>
                  {isActive ? (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-[1px] bg-[#D4A373]"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  ) : (
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-[#D4A373]/50 transition-all duration-500 group-hover:w-4" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-stone-400 hover:text-white transition-colors p-2 pr-4"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-40 bg-[#050505]/98 backdrop-blur-3xl md:hidden pt-32 px-8 pb-12 flex flex-col justify-between overflow-hidden"
          >
            {/* Aesthetic Background Typography */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none select-none">
              <span className="font-[family-name:var(--font-playfair)] text-[200px] leading-none whitespace-nowrap rotate-90 text-[#D4A373]">
                THE VOID
              </span>
            </div>

            <nav className="flex flex-col gap-10 relative z-10">
              {navLinks.map((link, i) => {
                const isActive = pathname === link.path;
                return (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1], delay: i * 0.1 }}
                  >
                    <Link
                      href={link.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className="group flex items-center gap-6"
                    >
                      <span className={`font-[family-name:var(--font-inter)] text-[10px] tracking-widest ${isActive ? 'text-[#D4A373]' : 'text-white/20'}`}>0{i + 1}</span>
                      <span className={`block font-[family-name:var(--font-playfair)] text-4xl md:text-5xl tracking-widest transition-colors ${isActive ? "text-[#D4A373]" : "text-stone-300 group-hover:text-white"
                        }`}>
                        {link.name}
                      </span>
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-center pb-8 border-t border-white/5 pt-8 relative z-10"
            >
              <p className="font-[family-name:var(--font-inter)] text-stone-500 text-[10px] uppercase tracking-[0.3em]">
                Liquid Obsidian • Est. 2026
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
