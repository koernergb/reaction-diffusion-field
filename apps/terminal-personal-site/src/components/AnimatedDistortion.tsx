"use client";
import { useEffect, useRef } from "react";
import { useUiStore } from "@/lib/uiStore";

export function AnimatedDistortion() {
  const animationRef = useRef<number | null>(null);
  const { backdropVariant, showBackdrop } = useUiStore();

  useEffect(() => {
    console.log('[AnimatedDistortion] Component mounted, starting animation');
    
    // Always run animation, regardless of backdrop variant
    let time = 0;
    const startTime = Date.now() / 1000;
    let foundFilter = false;

    const updateDistortion = () => {
      // Find the SVG filter element
      const filter = document.getElementById('sectionDistort');
      if (!filter) {
        if (!foundFilter) {
          console.warn('[AnimatedDistortion] Filter #sectionDistort not found yet, retrying...');
        }
        // Retry if filter not found yet (might be still rendering)
        animationRef.current = requestAnimationFrame(updateDistortion);
        return;
      }
      
      if (!foundFilter) {
        console.log('[AnimatedDistortion] Filter found!', filter);
        foundFilter = true;
      }
      
      const displacementMap = filter.querySelector('#displacementMap') as SVGFilterElement;
      const turbulence = filter.querySelector('#turbulence') as SVGFilterElement;
      
      if (!displacementMap) {
        console.warn('[AnimatedDistortion] feDisplacementMap not found in filter');
        animationRef.current = requestAnimationFrame(updateDistortion);
        return;
      }

      // Calculate time based on animation
      const elapsed = (Date.now() / 1000) - startTime;
      time = elapsed;

      // Create flickering effect - always animate
      // Use multiple sine waves at different frequencies to create complex flickering
      const fastFlicker = Math.sin(time * 4.0) * 0.5 + 0.5; // Fast flicker (4 Hz)
      const slowFlicker = Math.sin(time * 0.8) * 0.5 + 0.5; // Slow flicker (0.8 Hz)
      const mediumFlicker = Math.sin(time * 1.5) * 0.5 + 0.5; // Medium flicker (1.5 Hz)
      
      // If turing animation is active, sync with dt oscillation
      let intensity = (fastFlicker * 0.3 + mediumFlicker * 0.4 + slowFlicker * 0.3);
      if (backdropVariant === "turing" && showBackdrop) {
        const dtPeriod = 5.0;
        const dtOscillation = Math.sin(time * Math.PI / dtPeriod) * 0.5 + 0.5;
        intensity = (fastFlicker * 0.2 + mediumFlicker * 0.3 + slowFlicker * 0.2 + dtOscillation * 0.3);
      }
      
      // Map intensity (0-1) to distortion scale (2-6) - subtle but visible
      const baseScale = 2;
      const maxScale = 6;
      const scale = baseScale + (intensity * (maxScale - baseScale));
      
      // Update the SVG filter's displacement scale
      displacementMap.setAttribute('scale', scale.toString());
      
      // Also animate the turbulence baseFrequency to make the noise pattern move
      if (turbulence) {
        const baseFreq = 0.3 + (intensity * 0.2); // Vary between 0.3 and 0.5
        turbulence.setAttribute('baseFrequency', `${baseFreq} ${baseFreq}`);
      }
      
      // Log every 60 frames (roughly once per second at 60fps)
      if (Math.floor(time * 60) % 60 === 0 && Math.floor(time) !== Math.floor(time - 1/60)) {
        console.log('[AnimatedDistortion] Updating scale:', scale.toFixed(2), 'intensity:', intensity.toFixed(2));
      }

      animationRef.current = requestAnimationFrame(updateDistortion);
    };

    updateDistortion();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [backdropVariant, showBackdrop]);

  return null; // This component doesn't render anything, it just updates the filter
}

