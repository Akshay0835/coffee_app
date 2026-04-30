"use client";

import React, { useEffect, useRef, useState } from "react";
import { useTransform, MotionValue } from "framer-motion";
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
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loadedFrames, setLoadedFrames] = useState(0);

  // Directly transform scrollProgress, removing useSpring which causes double-smoothing lag 
  // since Lenis is already providing smooth scrolling.
  const frameIndex = useTransform(scrollProgress, [0, 1], [0, TOTAL_FRAMES - 1]);

  // Preload Images
  useEffect(() => {
    let isCancelled = false;
    const loadedImages: HTMLImageElement[] = [];

    const preloadImages = async () => {
      for (let i = 1; i <= TOTAL_FRAMES; i++) {
        if (isCancelled) return;
        const img = new Image();
        img.src = getFramePath(i);
        await new Promise((resolve) => {
          img.onload = resolve;
          img.onerror = resolve; // Continue even if one fails
        });
        loadedImages.push(img);
        setLoadedFrames(i);
      }
      if (!isCancelled) {
        setImages(loadedImages);
      }
    };

    preloadImages();

    return () => {
      isCancelled = true;
    };
  }, []);

  // Canvas Drawing Logic
  useEffect(() => {
    if (images.length === 0) return;

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
      if (canvas.width !== rect.width * dpr || canvas.height !== rect.height * dpr) {
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.scale(dpr, dpr);
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
      const img = images[index];
      if (!img || !img.complete) return;

      const imgWidth = img.naturalWidth || img.width;
      const imgHeight = img.naturalHeight || img.height;

      if (currentWidth === 0 || currentHeight === 0 || imgWidth === 0 || imgHeight === 0) return;

      // Always use object-cover logic to completely fill the screen without letterboxing
      const coverScale = Math.max(currentWidth / imgWidth, currentHeight / imgHeight);
      const drawWidth = imgWidth * coverScale;
      const drawHeight = imgHeight * coverScale;

      const offsetX = (currentWidth - drawWidth) / 2;
      const offsetY = (currentHeight - drawHeight) / 2;

      ctx.clearRect(0, 0, currentWidth, currentHeight);
      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
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
  }, [images, frameIndex]);

  // Loading State
  if (loadedFrames < TOTAL_FRAMES) {
    const progress = Math.round((loadedFrames / TOTAL_FRAMES) * 100);
    return (
      <div className="fixed inset-0 bg-[#050505] flex flex-col items-center justify-center text-[#D4A373] z-50">
        <Loader2 className="w-8 h-8 animate-spin mb-4" />
        <p className="font-sans text-sm tracking-widest uppercase">
          Brewing Experience... {progress}%
        </p>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none">
      <div ref={containerRef} className="sticky top-0 w-full h-screen">
        <canvas
          ref={canvasRef}
          className="w-full h-full canvas-mask"
        />
      </div>
    </div>
  );
}
