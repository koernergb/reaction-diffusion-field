import React, { useEffect, useRef } from "react";

interface CRTProps {
  children: React.ReactNode;
  className?: string;
  enableFlicker?: boolean;
  style?: React.CSSProperties;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export default function CRT({ 
  children, 
  className = "", 
  enableFlicker = true,
  style,
  onMouseEnter,
  onMouseLeave
}: CRTProps) {
  const scanlineRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const curvedGlassRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const debugCRTEffects = () => {
      const scanline = document.querySelector('.scanline-animate');
      const content = document.querySelector('.crt-curved > div:last-child');
      const container = document.querySelector('.crt-curved');
      
      console.log('=== CRT EFFECTS DEBUG ===');
      console.log('1. Container opacity:', window.getComputedStyle(container.parentElement).opacity);
      console.log('2. Scanline opacity:', window.getComputedStyle(scanline).opacity);
      console.log('3. Scanline z-index:', window.getComputedStyle(scanline).zIndex);
      console.log('4. Content z-index:', window.getComputedStyle(content).zIndex);
      console.log('5. Mix-blend modes:', {
        scanline: window.getComputedStyle(scanline).mixBlendMode,
        content: window.getComputedStyle(content).mixBlendMode
      });
      console.log('6. Overflow settings:', {
        container: window.getComputedStyle(container).overflow,
        parent: window.getComputedStyle(container.parentElement).overflow
      });
      console.log('7. Animation status:', window.getComputedStyle(scanline).animation);
      console.log('8. Background image:', window.getComputedStyle(scanline).backgroundImage);
      console.log('9. Element visibility:', {
        scanline: scanline instanceof HTMLElement ? scanline.offsetWidth > 0 && scanline.offsetHeight > 0 : false,
        content: content instanceof HTMLElement ? content.offsetWidth > 0 && content.offsetHeight > 0 : false
      });
      console.log('10. Blend mode support:', CSS.supports('mix-blend-mode', 'screen'));
      
      // THEORY 1: Container opacity
      console.log('=== THEORY 1: CONTAINER OPACITY ===');
      const containerOpacity = parseFloat(window.getComputedStyle(container.parentElement).opacity);
      const scanlineOpacity = parseFloat(window.getComputedStyle(scanline).opacity);
      console.log('CRT Container Opacity:', containerOpacity);
      console.log('Scanline Opacity:', scanlineOpacity);
      console.log('Effective Scanline Opacity:', scanlineOpacity * containerOpacity);
      
      // THEORY 2: Z-index layering
      console.log('=== THEORY 2: Z-INDEX LAYERING ===');
      console.log('Scanline z-index:', window.getComputedStyle(scanline).zIndex);
      console.log('Content z-index:', window.getComputedStyle(content).zIndex);
      console.log('Canvas z-index:', document.querySelector('canvas') ? window.getComputedStyle(document.querySelector('canvas')).zIndex : 'No canvas');
      console.log('Mix-blend-mode conflicts:', document.querySelectorAll('[class*="mix-blend"]').length);
      
      // THEORY 3: Overflow hidden clipping
      console.log('=== THEORY 3: OVERFLOW CLIPPING ===');
      console.log('CRT Container overflow:', window.getComputedStyle(container).overflow);
      console.log('Terminal wrapper overflow:', window.getComputedStyle(container.parentElement).overflow);
      console.log('Scanline position:', window.getComputedStyle(scanline).position);
      console.log('Scanline inset:', window.getComputedStyle(scanline).inset);
      
      // THEORY 4: Backdrop blur interference
      console.log('=== THEORY 4: BACKDROP BLUR ===');
      const terminalContent = document.querySelector('.backdrop-blur-sm');
      if (terminalContent) {
        console.log('Backdrop blur:', window.getComputedStyle(terminalContent).backdropFilter);
      }
      console.log('Mix-blend-screen elements:', document.querySelectorAll('.mix-blend-screen').length);
      
      // THEORY 5: CSS specificity conflicts
      console.log('=== THEORY 5: CSS SPECIFICITY ===');
      console.log('Active .crt-curved transform:', window.getComputedStyle(container).transform);
      console.log('CSS Rule Order: .crt-curved (line 45), ::before (line 76), ::after (line 92), reduced motion (line 104)');
      
      // THEORY 6: Mix-blend-mode cascade
      console.log('=== THEORY 6: MIX-BLEND CASCADE ===');
      console.log('Mix-blend-screen count:', document.querySelectorAll('.mix-blend-screen').length);
      console.log('Mix-blend-overlay count:', document.querySelectorAll('.mix-blend-overlay').length);
      console.log('Scanline blend mode:', window.getComputedStyle(scanline).mixBlendMode);
      const canvas = document.querySelector('canvas');
      if (canvas) {
        console.log('Canvas blend mode:', window.getComputedStyle(canvas).mixBlendMode);
      }
      
      // THEORY 7: Tailwind arbitrary values
      console.log('=== THEORY 7: TAILWIND ARBITRARY VALUES ===');
      const curvedGlass = document.querySelector('.bg-\\[radial-gradient\\(80\\%_60\\%_at_50\\%_50\\%\\,rgba\\(255\\,255\\,255\\,\\.04\\)\\,rgba\\(0\\,0\\,0\\,\\.55\\)\\)\\]');
      if (curvedGlass) {
        console.log('Curved-glass background:', window.getComputedStyle(curvedGlass).background);
        console.log('Tailwind arbitrary value processed:', window.getComputedStyle(curvedGlass).background.includes('radial-gradient'));
      }
      console.log('All arbitrary values:', document.querySelectorAll('[class*="bg-["]').length);
      
      // THEORY 8: Browser rendering issues
      console.log('=== THEORY 8: BROWSER RENDERING ===');
      console.log('Browser supports mix-blend-mode:', CSS.supports('mix-blend-mode', 'screen'));
      console.log('Hardware acceleration:', window.getComputedStyle(document.body).transform !== 'none');
      console.log('CSS animations enabled:', !window.matchMedia('(prefers-reduced-motion: reduce)').matches);
      console.log('Browser:', navigator.userAgent);
      
      // THEORY 4: BACKDROP BLUR DETAILED
      console.log('=== THEORY 4: BACKDROP BLUR DETAILED ===');
      const terminalContentDetailed = document.querySelector('.backdrop-blur-sm');
      if (terminalContentDetailed) {
        console.log('Backdrop blur element found:', terminalContentDetailed);
        console.log('Backdrop blur computed style:', {
          backdropFilter: window.getComputedStyle(terminalContentDetailed).backdropFilter,
          filter: window.getComputedStyle(terminalContentDetailed).filter,
          mixBlendMode: window.getComputedStyle(terminalContentDetailed).mixBlendMode,
          isolation: window.getComputedStyle(terminalContentDetailed).isolation,
          willChange: window.getComputedStyle(terminalContentDetailed).willChange,
          transform: window.getComputedStyle(terminalContentDetailed).transform
        });
        
        // Check if backdrop blur is creating a new stacking context
        console.log('Backdrop blur stacking context:', {
          zIndex: window.getComputedStyle(terminalContentDetailed).zIndex,
          position: window.getComputedStyle(terminalContentDetailed).position,
          opacity: window.getComputedStyle(terminalContentDetailed).opacity
        });
        
        // Test if backdrop blur is interfering with scanlines
        const scanlineDetailed = document.querySelector('.scanline-animate');
        const scanlineRect = scanlineDetailed.getBoundingClientRect();
        const terminalRect = terminalContentDetailed.getBoundingClientRect();
        console.log('Element overlap test:', {
          scanlineRect: scanlineRect,
          terminalRect: terminalRect,
          overlap: !(scanlineRect.right < terminalRect.left || 
                     scanlineRect.left > terminalRect.right || 
                     scanlineRect.bottom < terminalRect.top || 
                     scanlineRect.top > terminalRect.bottom)
        });
      } else {
        console.log('No backdrop blur element found');
      }
      
      // THEORY 6: MIX-BLEND CASCADE DETAILED
      console.log('=== THEORY 6: MIX-BLEND CASCADE DETAILED ===');
      const mixBlendElements = document.querySelectorAll('[class*="mix-blend"]');
      console.log('All mix-blend elements:', mixBlendElements.length);

      mixBlendElements.forEach((el, index) => {
        const computedStyle = window.getComputedStyle(el);
        console.log(`Mix-blend element ${index + 1}:`, {
          tagName: el.tagName,
          className: el.className,
          mixBlendMode: computedStyle.mixBlendMode,
          opacity: computedStyle.opacity,
          zIndex: computedStyle.zIndex,
          position: computedStyle.position,
          backgroundImage: computedStyle.backgroundImage,
          isVisible: el instanceof HTMLElement ? el.offsetWidth > 0 && el.offsetHeight > 0 : false,
          rect: el.getBoundingClientRect()
        });
      });

      // Check stacking order of mix-blend elements
      console.log('Mix-blend stacking order:');
      const mixBlendScreenElements = document.querySelectorAll('.mix-blend-screen');
      mixBlendScreenElements.forEach((el, index) => {
        const rect = el.getBoundingClientRect();
        console.log(`Screen element ${index + 1}:`, {
          zIndex: window.getComputedStyle(el).zIndex,
          position: window.getComputedStyle(el).position,
          top: rect.top,
          left: rect.left,
          className: el.className
        });
      });

      // Test blend mode interaction
      console.log('Blend mode interaction test:');
      const scanlineBlend = document.querySelector('.scanline-animate');
      const contentBlend = document.querySelector('.crt-curved > div:last-child');
      console.log('Scanline vs Content blend modes:', {
        scanline: window.getComputedStyle(scanlineBlend).mixBlendMode,
        content: window.getComputedStyle(contentBlend).mixBlendMode,
        scanlineOpacity: window.getComputedStyle(scanlineBlend).opacity,
        contentOpacity: window.getComputedStyle(contentBlend).opacity
      });
      
      // THEORY 8: HARDWARE ACCELERATION DETAILED
      console.log('=== THEORY 8: HARDWARE ACCELERATION DETAILED ===');

      // Check hardware acceleration status
      console.log('Hardware acceleration details:', {
        hardwareAcceleration: window.getComputedStyle(document.body).transform !== 'none',
        transform3d: window.getComputedStyle(document.body).transform.includes('matrix3d'),
        willChange: window.getComputedStyle(document.body).willChange,
        backfaceVisibility: window.getComputedStyle(document.body).backfaceVisibility
      });

      // Check if elements are on GPU layers
      const scanlineGPU = document.querySelector('.scanline-animate');
      const containerGPU = document.querySelector('.crt-curved');
      console.log('GPU layer status:', {
        scanline: {
          transform: window.getComputedStyle(scanlineGPU).transform,
          willChange: window.getComputedStyle(scanlineGPU).willChange,
          backfaceVisibility: window.getComputedStyle(scanlineGPU).backfaceVisibility,
          isolation: window.getComputedStyle(scanlineGPU).isolation
        },
        container: {
          transform: window.getComputedStyle(containerGPU).transform,
          willChange: window.getComputedStyle(containerGPU).willChange,
          backfaceVisibility: window.getComputedStyle(containerGPU).backfaceVisibility,
          isolation: window.getComputedStyle(containerGPU).isolation
        }
      });

      // Test if blend modes work without hardware acceleration
      console.log('Blend mode compatibility test:', {
        supportsScreen: CSS.supports('mix-blend-mode', 'screen'),
        supportsOverlay: CSS.supports('mix-blend-mode', 'overlay'),
        supportsMultiply: CSS.supports('mix-blend-mode', 'multiply'),
        supportsDifference: CSS.supports('mix-blend-mode', 'difference'),
        supportsExclusion: CSS.supports('mix-blend-mode', 'exclusion')
      });

      // Check browser capabilities
      console.log('Browser capabilities:', {
        userAgent: navigator.userAgent,
        vendor: navigator.vendor,
        platform: navigator.platform,
        hardwareConcurrency: navigator.hardwareConcurrency,
        deviceMemory: 'deviceMemory' in navigator ? (navigator as { deviceMemory?: number }).deviceMemory || 'Not supported' : 'Not supported'
      });

      // Test animation performance
      console.log('Animation performance test:');
      const startTime = performance.now();
      requestAnimationFrame(() => {
        const endTime = performance.now();
        console.log('RAF timing:', endTime - startTime, 'ms');
      });
      
      // CROSS-THEORY ANALYSIS
      console.log('=== CROSS-THEORY ANALYSIS ===');

      // Test if backdrop blur + mix-blend interaction
      const terminalContentCross = document.querySelector('.backdrop-blur-sm');
      const scanlineCross = document.querySelector('.scanline-animate');
      if (terminalContentCross && scanlineCross) {
        console.log('Backdrop + Mix-blend interaction:', {
          terminalBackdrop: window.getComputedStyle(terminalContentCross).backdropFilter,
          terminalMixBlend: window.getComputedStyle(terminalContentCross).mixBlendMode,
          scanlineMixBlend: window.getComputedStyle(scanlineCross).mixBlendMode,
          scanlineOpacity: window.getComputedStyle(scanlineCross).opacity,
          terminalOpacity: window.getComputedStyle(terminalContentCross).opacity
        });
      }

      // Test if hardware acceleration affects blend modes
      console.log('Hardware acceleration + blend mode test:', {
        hardwareAccel: window.getComputedStyle(document.body).transform !== 'none',
        blendModeSupport: CSS.supports('mix-blend-mode', 'screen'),
        animationSupport: CSS.supports('animation', 'scanline-shimmer 2.5s ease-in-out infinite')
      });

      // Test element visibility with different blend modes
      console.log('Element visibility test:', {
        scanlineVisible: scanlineCross instanceof HTMLElement ? scanlineCross.offsetWidth > 0 && scanlineCross.offsetHeight > 0 : false,
        scanlineDisplay: window.getComputedStyle(scanlineCross).display,
        scanlineVisibility: window.getComputedStyle(scanlineCross).visibility,
        scanlineOpacity: window.getComputedStyle(scanlineCross).opacity
      });
      
      // THEORY 9: CSS compilation problems
      console.log('=== THEORY 9: CSS COMPILATION ===');
      console.log('Scanline animation defined:', window.getComputedStyle(scanlineCross).animation);
      console.log('Keyframes loaded:', window.getComputedStyle(scanlineCross).animationName);
      
      // THEORY 10: DOM structure issues
      console.log('=== THEORY 10: DOM STRUCTURE ===');
      console.log('DOM nesting depth:', container.children.length);
      console.log('Perspective context:', window.getComputedStyle(container).transformStyle);
      console.log('Isolation context:', window.getComputedStyle(container).isolation);
      console.log('3D context preserved:', window.getComputedStyle(container).transform.includes('perspective'));
    };

    // Run debug after a short delay to ensure DOM is ready
    setTimeout(debugCRTEffects, 100);
  }, []);
  return (
    <div 
      className={`relative ${className}`}
      style={style}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Perspective container for Trinitron tube curvature */}
      <div className="relative">
        <div ref={containerRef} className="crt-curved">
          {/* Main CRT container with curved glass effect */}
          <div className="relative overflow-hidden rounded-lg bg-[#081018] shadow-[0_0_40px_rgba(0,0,0,0.8),inset_0_0_20px_rgba(0,0,0,0.3)]">
        {/* Curved glass bulge effect - behind content */}
        <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-transparent via-transparent to-black/10 pointer-events-none z-[1]" 
             style={{
               background: "radial-gradient(ellipse 120% 80% at 50% 20%, rgba(255,255,255,0.02), transparent 60%), radial-gradient(ellipse 100% 60% at 50% 80%, rgba(0,0,0,0.1), transparent 70%)",
               zIndex: 1
             }} />
        
        {/* RGB phosphor mask - simulates CRT color separation - behind content */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.15] z-[2]"
             style={{
               backgroundImage: `
                 repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(255,0,0,0.08) 1px, rgba(255,0,0,0.08) 2px),
                 repeating-linear-gradient(120deg, transparent, transparent 1px, rgba(0,255,0,0.08) 1px, rgba(0,255,0,0.08) 2px),
                 repeating-linear-gradient(240deg, transparent, transparent 1px, rgba(0,0,255,0.08) 1px, rgba(0,0,255,0.08) 2px)
               `,
               zIndex: 2
             }} />
        
        {/* Combined scanlines with shimmer animation (subtle) - above content to blend */}
        <div
          ref={scanlineRef}
          className="pointer-events-none absolute inset-0 opacity-[0.18] mix-blend-soft-light scanline-animate z-[15]"
          style={{
            backgroundImage: "repeating-linear-gradient(0deg, rgba(80,255,200,0.4) 0 1px, transparent 1px 3px)",
            transform: "translateZ(0)",
            willChange: "transform, opacity",
            zIndex: 15
          }}
        />

        {/* RGB triad - using multiply to add color without brightening - behind content */}
        <div
          className="pointer-events-none absolute inset-0 opacity-50 mix-blend-multiply z-[3]"
          style={{
            backgroundImage: "repeating-linear-gradient(90deg, rgba(0,255,170,0.3) 0 1px, rgba(0,0,0,0) 1px 2px, rgba(170,120,255,0.3) 2px 3px, rgba(0,0,0,0) 3px 4px)",
            backgroundSize: "4px 100%",
            transform: "translateZ(0)",
            willChange: "transform, opacity",
            zIndex: 3
          }}
        />
        
        {/* Vignette - darker edges using multiply blend - behind content */}
        <div className="absolute inset-0 pointer-events-none rounded-lg mix-blend-multiply z-[3]"
             style={{
               background: "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.4) 80%, rgba(0,0,0,0.8) 100%)",
               transform: "translateZ(0)",
               willChange: "transform, opacity",
               zIndex: 3
             }} />

        {/* Curved-glass vignette - makes lines fade toward edges like real convex screen - behind content */}
        <div 
          ref={curvedGlassRef}
          className="absolute inset-0 pointer-events-none mix-blend-multiply z-[3]"
          style={{
            background: "radial-gradient(80% 60% at 50% 50%, rgba(255,255,255,0.04), rgba(0,0,0,0.55))",
            transform: "translateZ(0)",
            willChange: "transform, opacity",
            zIndex: 3
          }}
        />
        
        {/* Subtle bloom effect on bright areas - behind content */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.3] mix-blend-screen z-[4]"
             style={{
               background: "radial-gradient(ellipse at 30% 30%, rgba(120,255,200,0.2), transparent 50%), radial-gradient(ellipse at 70% 70%, rgba(100,200,255,0.15), transparent 60%)",
               transform: "translateZ(0)",
               willChange: "transform, opacity",
               zIndex: 4
             }} />
        
        {/* Chromatic fringing simulation - behind content */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.1] z-[2]"
             style={{
               background: "linear-gradient(90deg, rgba(255,0,100,0.05) 0%, transparent 2%, transparent 98%, rgba(100,0,255,0.05) 100%)",
               zIndex: 2
             }} />
        
        {/* Film grain texture - behind content */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.15] z-[2]"
             style={{
               backgroundImage: `
                 radial-gradient(circle at 20% 20%, rgba(255,255,255,0.04) 1px, transparent 1px),
                 radial-gradient(circle at 40% 40%, rgba(0,255,100,0.02) 1px, transparent 1px),
                 radial-gradient(circle at 60% 60%, rgba(100,200,255,0.02) 1px, transparent 1px),
                 radial-gradient(circle at 80% 80%, rgba(255,200,100,0.02) 1px, transparent 1px)
               `,
               backgroundSize: "3px 3px, 5px 5px, 7px 7px, 4px 4px",
               zIndex: 2
             }} />
        
        {/* Flicker animation layer (respects prefers-reduced-motion) - behind content */}
        {enableFlicker && (
          <div className="absolute inset-0 pointer-events-none opacity-[0.02] crt-flicker z-[1]"
               style={{
                 background: "linear-gradient(45deg, rgba(255,255,255,0.01), transparent, rgba(0,255,100,0.01))",
                 zIndex: 1
               }} />
        )}
        
        {/* Content container - must be above all overlays */}
        <div 
          ref={contentRef}
          className="relative z-[10] [text-shadow:0_0_2px_rgba(120,255,210,0.6),0_0_6px_rgba(40,200,160,0.25)] text-[#9bf5d7]"
          style={{ position: 'relative', zIndex: 10 }}
        >
          {children}
        </div>
        
        {/* Center glow effect - above content to blend */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.6] mix-blend-screen z-[14]"
             style={{
               background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(120,255,200,0.5), transparent 70%)",
               transform: "translateZ(0)",
               willChange: "transform, opacity",
               zIndex: 14
             }} />
        
        {/* Inner bezel reflection - behind content */}
        <div className="absolute inset-0 pointer-events-none rounded-lg z-[1]"
             style={{
               boxShadow: "inset 0 0 20px rgba(255,255,255,0.02)",
               border: "none",
               outline: "none"
             }} />
          </div>
        </div>
      </div>
    </div>
  );
}
