"use client";

import React, { useEffect, useRef, useState } from "react";
import { useTransform, MotionValue, motion } from "framer-motion";
import { Loader2 } from "lucide-react";

const TOTAL_FRAMES = 203;

// Helper to pad frame numbers, e.g., 1 -> 001
const getFramePath = (index: number) => {
  const paddedIndex = index.toString().padStart(3, "0");
  return `/sequence/ezgif-frame-${paddedIndex}.jpg`;
};

interface CoffeeCanvasProps {
  scrollProgress: MotionValue<number>;
}

export default function CoffeeCanvas({ scrollProgress }: CoffeeCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bgCanvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isReady, setIsReady] = useState(false);

  // Directly transform scrollProgress, removing useSpring which causes double-smoothing lag 
  const frameIndex = useTransform(scrollProgress, [0, 1], [0, TOTAL_FRAMES - 1]);

  // Preload Images
  useEffect(() => {
    let isCancelled = false;
    const imgArray: HTMLImageElement[] = [];

    // Create empty image objects
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      imgArray.push(new Image());
    }

    setImages(imgArray);

    const loadImages = async () => {
      // Await only the very first frame so we have something to show immediately
      await new Promise<void>((resolve) => {
        imgArray[0].onload = () => resolve();
        imgArray[0].onerror = () => resolve();
        imgArray[0].src = getFramePath(1);
      });

      if (isCancelled) return;
      setIsReady(true); // Hide loading screen instantly after 1st frame!

      // Trigger the rest of the images to load in the background
      for (let i = 1; i < TOTAL_FRAMES; i++) {
        if (isCancelled) break;
        // Small delay every 10 frames to prevent freezing the main thread while assigning sources
        if (i % 10 === 0) await new Promise(r => setTimeout(r, 10));
        imgArray[i].src = getFramePath(i + 1);
      }
    };

    loadImages();

    return () => {
      isCancelled = true;
    };
  }, []);

  // Canvas Drawing Logic
  useEffect(() => {
    if (!isReady || images.length === 0) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let currentWidth = 0;
    let currentHeight = 0;
    let dpr = window.devicePixelRatio || 1;

    const updateSize = () => {
      // Measure the container, not the canvas, to prevent infinite resize loops
      const rect = container.getBoundingClientRect();
      const newWidth = rect.width * dpr;
      const newHeight = rect.height * dpr;

      if (canvas.width !== newWidth || canvas.height !== newHeight) {
        canvas.width = newWidth;
        canvas.height = newHeight;
        ctx.scale(dpr, dpr);

        if (bgCanvasRef.current) {
          bgCanvasRef.current.width = newWidth;
          bgCanvasRef.current.height = newHeight;
          const bgCtx = bgCanvasRef.current.getContext("2d");
          if (bgCtx) bgCtx.scale(dpr, dpr);
        }

        currentWidth = rect.width;
        currentHeight = rect.height;
      } else {
        currentWidth = rect.width;
        currentHeight = rect.height;
      }
    };

    // Initial size
    updateSize();

    const drawFrame = (index: number) => {
      let img = images[index];

      // If target frame isn't loaded yet, find the closest previous loaded frame
      if (!img || !img.complete || img.naturalWidth === 0) {
        for (let i = index - 1; i >= 0; i--) {
          if (images[i] && images[i].complete && images[i].naturalWidth > 0) {
            img = images[i];
            break;
          }
        }
      }

      if (!img || !img.complete) return;

      const imgWidth = img.naturalWidth || img.width;
      const imgHeight = img.naturalHeight || img.height;

      if (currentWidth === 0 || currentHeight === 0 || imgWidth === 0 || imgHeight === 0) return;

      const isMobile = currentWidth < 768;
      let coverScale;

      if (isMobile) {
        const widthScale = currentWidth / imgWidth;
        const heightScale = currentHeight / imgHeight;

        // Keep the image mostly in frame horizontally to prevent it from going out of frame,
        // while adding a very slight zoom to reduce empty vertical space.
        coverScale = widthScale * 1.15;
      } else {
        // Always use object-cover logic for desktop to completely fill the screen
        coverScale = Math.max(currentWidth / imgWidth, currentHeight / imgHeight);
      }

      const drawWidth = imgWidth * coverScale;
      const drawHeight = imgHeight * coverScale;

      const offsetX = (currentWidth - drawWidth) / 2;
      const offsetY = (currentHeight - drawHeight) / 2;

      ctx.clearRect(0, 0, currentWidth, currentHeight);
      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);

      // Draw ambient background on mobile to fill the empty space with a beautiful glow
      if (isMobile && bgCanvasRef.current) {
        const bgCtx = bgCanvasRef.current.getContext("2d");
        if (bgCtx) {
          bgCtx.clearRect(0, 0, currentWidth, currentHeight);
          const bgScale = Math.max(currentWidth / imgWidth, currentHeight / imgHeight);
          const bgDrawWidth = imgWidth * bgScale;
          const bgDrawHeight = imgHeight * bgScale;
          const bgOffsetX = (currentWidth - bgDrawWidth) / 2;
          const bgOffsetY = (currentHeight - bgDrawHeight) / 2;
          bgCtx.drawImage(img, bgOffsetX, bgOffsetY, bgDrawWidth, bgDrawHeight);
        }
      }
    };

    // Watch for resizes on the container
    const resizeObserver = new ResizeObserver(() => {
      dpr = window.devicePixelRatio || 1;
      updateSize();
      drawFrame(Math.round(frameIndex.get()));
    });
    resizeObserver.observe(container);

    let lastFrame = -1;

    // Subscribe to frameIndex changes instead of running a continuous requestAnimationFrame loop
    const unsubscribe = frameIndex.on("change", (latest) => {
      const frame = Math.round(latest);
      if (frame !== lastFrame) {
        // Use requestAnimationFrame for the actual drawing to prevent tearing
        requestAnimationFrame(() => drawFrame(frame));
        lastFrame = frame;
      }
    });

    // Initial draw
    drawFrame(Math.round(frameIndex.get()));

    return () => {
      unsubscribe();
      resizeObserver.disconnect();
    };
  }, [isReady, images, frameIndex]);

  // Loading State
  if (!isReady) {
    return (
      <div className="fixed inset-0 bg-[#050505] flex flex-col items-center justify-center text-[#D4A373] z-50">
        <Loader2 className="w-8 h-8 animate-spin mb-4" />
        <p className="font-sans text-sm tracking-widest uppercase">
          Brewing Experience...
        </p>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none">
      <div ref={containerRef} className="sticky top-0 w-full h-screen relative overflow-hidden bg-[#050505] canvas-mask">
        
        {/* Giant scrolling marquee - strictly bound to the top space */}
        <div className="absolute top-0 inset-x-0 h-[25vh] z-0 md:hidden flex items-center overflow-hidden pointer-events-none opacity-[0.15]">
          <motion.div 
            animate={{ x: [0, -2000] }} 
            transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
            className="whitespace-nowrap font-[family-name:var(--font-playfair)] text-[#D4A373] text-[80px] leading-none"
          >
            THE VOID • THE VOID • THE VOID • THE VOID • THE VOID • THE VOID • THE VOID • THE VOID • THE VOID • 
          </motion.div>
        </div>

        {/* Giant scrolling marquee - strictly bound to the bottom space */}
        <div className="absolute bottom-0 inset-x-0 h-[25vh] z-0 md:hidden flex items-center overflow-hidden pointer-events-none opacity-[0.15]">
          <motion.div 
            animate={{ x: [-2000, 0] }} 
            transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
            className="whitespace-nowrap font-[family-name:var(--font-playfair)] text-[#D4A373] text-[80px] leading-none"
          >
            LIQUID OBSIDIAN • LIQUID OBSIDIAN • LIQUID OBSIDIAN • LIQUID OBSIDIAN • LIQUID OBSIDIAN • LIQUID OBSIDIAN • 
          </motion.div>
        </div>

        {/* Ambient glow canvas for mobile - fills the up and down spaces perfectly */}
        <canvas
          ref={bgCanvasRef}
          className="absolute inset-0 w-full h-full z-0 md:hidden blur-[60px] opacity-40 brightness-75 scale-110 object-cover mix-blend-screen"
        />
        
        {/* Main sharp canvas - no mask here so it stays 100% sharp and doesn't become transparent */}
        <canvas
          ref={canvasRef}
          className="relative z-10 w-full h-full"
        />

      </div>
    </div>
  );
}
