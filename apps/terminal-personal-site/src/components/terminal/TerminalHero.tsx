import React, { useEffect, useRef, useState } from "react";
import { Terminal } from "@xterm/xterm";
import { FitAddon } from "@xterm/addon-fit";
import "@xterm/xterm/css/xterm.css";
import { scrollToSection } from "@/utils/scroll";
import CRT from "@/components/CRT";
import { useUiStore, TuringParams } from "@/lib/uiStore";

const auroraBg =
  "conic-gradient(from_180deg_at_50%_50%,#031d13_0%,#001b2a_25%,#081a12_50%,#001b2a_75%,#031d13_100%)";

export default function TerminalHero() {
  console.log("TerminalHero component rendering");
  const termRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);        // scanlines/vignette
  const phosphorRef = useRef<HTMLCanvasElement | null>(null);      // optional decay glow
  const wrapperRef = useRef<HTMLDivElement | null>(null);          // curved mask + jitter
  const fitAddonRef = useRef<any>(null);
  const termObj = useRef<any>(null);
  const [mounted, setMounted] = useState(false);
  const acceptingRef = useRef(false);         // lock input during boot
  const histRef = useRef<string[]>([]);       // command history
  const histIdxRef = useRef<number>(-1);      // pointer in history
  const [reduceMotion, setReduceMotion] = useState(() =>
    typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
  );
  const [isHovered, setIsHovered] = useState(false);
  const enablePhosphorDecay = true; // toggle this to enable/disable the glow trails
  
  // UI store for backdrop controls
  const {
    showBackdrop,
    setShowBackdrop,
    sonificationEnabled,
    setSonificationEnabled,
    turing,
    setTuringConfig,
  } = useUiStore();
  
  // Store controls in a ref so handleCommand always has latest values
  const controlsRef = useRef<BackdropControls>({
    showBackdrop,
    setShowBackdrop,
    sonificationEnabled,
    setSonificationEnabled,
    turing,
    setTuringConfig,
  });
  
  // Update ref when store values change
  useEffect(() => {
    controlsRef.current = {
      showBackdrop,
      setShowBackdrop,
      sonificationEnabled,
      setSonificationEnabled,
      turing,
      setTuringConfig,
    };
  }, [showBackdrop, setShowBackdrop, sonificationEnabled, setSonificationEnabled, turing, setTuringConfig]);

  useEffect(() => {
    console.log("Setting mounted to true");
    setMounted(true);
    
    // Set reduce motion preference
    if (typeof window === "undefined" || !window.matchMedia) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => setReduceMotion(media.matches);
    updateMotionPreference();
    media.addEventListener("change", updateMotionPreference);
    return () => media.removeEventListener("change", updateMotionPreference);
  }, []);

  useEffect(() => {
    if (!mounted || !termRef.current) return;
    
    const initTerminal = async () => {
      try {
        console.log("Initializing terminal...");
        
        // Dynamically import xterm.js only on client side
        const { Terminal } = await import("@xterm/xterm");
        const { FitAddon } = await import("@xterm/addon-fit");

        const term = new Terminal({
          allowTransparency: true,
          fontFamily:
            "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
          fontSize: 14,
          cursorBlink: true,
          cursorStyle: "bar",
          theme: {
            background: "rgba(8, 16, 24, 0.9)",
            foreground: "#d0ffe0",
            cursor: "#8affc1",
            black: "#000000",
            brightGreen: "#8affc1",
          },
          scrollback: 1000,
        });

        const fit = new FitAddon();
        term.loadAddon(fit);
        term.open(termRef.current);
        fit.fit();

        // Declare input variable early so handler can access it
        let input = "";
        let spaceInputInProgress = false; // Flag to prevent double space insertion

        // Custom key handler for copy/paste support
        term.attachCustomKeyEventHandler((event) => {
          // Handle Cmd+C (copy)
          if (event.metaKey && event.key === 'c') {
            const selection = term.getSelection();
            if (selection) {
              navigator.clipboard.writeText(selection);
            }
            return false; // Prevent default behavior
          }
          
          // Handle Cmd+V (paste)
          if (event.metaKey && event.key === 'v') {
            event.preventDefault();
            navigator.clipboard.readText().then((text) => {
              term.paste(text);
            });
            return false; // Prevent default behavior
          }
          
          // Let space key go through normally - we'll prevent scroll via scroll listener
          return true; // Allow all other keys including space
        });

        termObj.current = term;
        fitAddonRef.current = fit;

        let bootFinished = false;
        const renderReadyState = () => {
          if (bootFinished) return;
          bootFinished = true;
          window.removeEventListener("keydown", handleBootSkip);
          term.write(
            "\r\n\x1b[38;2;128;255;200mKoerner Gray-Buchta\x1b[0m\r\n" +
            "AI research engineer\r\n\r\n" +
            "Type \x1b[92mhelp\x1b[0m or choose: industry · portfolio · research · about · cv\r\n\r\n"
          );
          prompt(term);
          acceptingRef.current = true;
          term.focus();
        };

        const handleBootSkip = (event: KeyboardEvent) => {
          if (bootFinished || event.metaKey || event.ctrlKey || event.altKey) return;
          window.sessionStorage.setItem("terminal-boot-seen", "true");
          renderReadyState();
        };

        const boot = async () => {
          acceptingRef.current = false;
          const hasSeenBoot = window.sessionStorage.getItem("terminal-boot-seen") === "true";

          if (reduceMotion || hasSeenBoot) {
            renderReadyState();
            return;
          }

          term.write("Initializing profile…");
          await wait(350);
          if (bootFinished) return;
          term.write(" \x1b[92m✓\x1b[0m\r\n");
          await wait(150);
          if (bootFinished) return;
          window.sessionStorage.setItem("terminal-boot-seen", "true");
          renderReadyState();
        };

        term.onData((data) => {
          if (!acceptingRef.current) {
            window.sessionStorage.setItem("terminal-boot-seen", "true");
            renderReadyState();
            return;
          }
          const code = data.charCodeAt(0);
          if (code === 13) {
            term.write("\r\n");
            const trimmed = input.trim();
            if (trimmed) {
              histRef.current.push(trimmed);
              histIdxRef.current = histRef.current.length;
            }
            try {
              handleCommand(term, trimmed, controlsRef.current);
            } catch (error) {
              console.error("Error handling command:", error);
              term.writeln(`Error: ${error instanceof Error ? error.message : "Unknown error"}`);
            }
            input = "";
            prompt(term);
            drawPhosphorDot();
          } else if (code === 127) {
            if (input.length > 0) {
              input = input.slice(0, -1);
              term.write("\b \b");
            }
          } else if (data >= " " && data <= "~") {
            // Skip if this is a space that we're manually inputting
            if (data === ' ' && spaceInputInProgress) {
              // Don't skip - let it process normally, the flag prevents double calls
              // The flag will be reset after onData completes
            }
            input += data;
            term.write(`\x1b[92m${data}\x1b[0m`);
            drawPhosphorDot();
          }
        });

        window.addEventListener("keydown", handleBootSkip);
        boot();

        // Arrow history + Tab completion
        term.onKey(({ key, domEvent }) => {
          if (!acceptingRef.current) return;
          const code = domEvent.key;
          if (code === "ArrowUp") {
            if (histRef.current.length) {
              histIdxRef.current = Math.max(0, histIdxRef.current - 1);
              input = replaceLine(term, histRef.current[histIdxRef.current]);
            }
            domEvent.preventDefault();
          } else if (code === "ArrowDown") {
            if (histRef.current.length) {
              histIdxRef.current = Math.min(histRef.current.length, histIdxRef.current + 1);
              const next = histRef.current[histIdxRef.current] ?? "";
              input = replaceLine(term, next);
            }
            domEvent.preventDefault();
          } else if (code === "Tab") {
            domEvent.preventDefault();
            const tokens = input.split(" ");
            const last = tokens[tokens.length - 1] ?? "";
            if (tokens[0] === "open") {
              const opts = ["industry", "portfolio", "research", "about", "cv"];
              const match = opts.find((o) => o.startsWith(last.toLowerCase()));
              if (match) {
                tokens[tokens.length - 1] = match;
                input = replaceLine(term, tokens.join(" "));
              }
            }
          }
        });

        const onResize = () => {
          fit.fit();
          drawOverlay();
        };
        window.addEventListener("resize", onResize);

        // Prevent space key from scrolling the page when terminal is focused
        const handleKeyDown = (e: KeyboardEvent) => {
          if (e.key === ' ' && !e.metaKey && !e.ctrlKey && !e.altKey && acceptingRef.current) {
            const termElement = termRef.current;
            if (termElement && termElement.contains(e.target as Node)) {
              // Prevent scroll
              e.preventDefault();
              e.stopImmediatePropagation();
              // Only send if not already in progress
              if (!spaceInputInProgress) {
                spaceInputInProgress = true;
                // Use term.input() to send space through xterm's pipeline
                term.input(' ');
                // Reset flag after a microtask to allow onData to process
                Promise.resolve().then(() => {
                  spaceInputInProgress = false;
                });
              }
            }
          }
        };
        
        // Use capture phase to catch it before xterm's handler
        window.addEventListener("keydown", handleKeyDown, true);


        let raf = 0;
        let decayRaf = 0;
        let paused = false;
        const drawOverlay = () => {
          if (paused) return;
          const canvas = canvasRef.current;
          const host = termRef.current;
          if (!canvas || !host) return;
          const ctx = canvas.getContext("2d");
          if (!ctx) return;

          const rect = host.getBoundingClientRect();
          canvas.width = rect.width;
          canvas.height = rect.height;

          ctx.clearRect(0, 0, canvas.width, canvas.height);

          // Vignette
          const g = ctx.createRadialGradient(
            canvas.width / 2,
            canvas.height / 2,
            Math.min(canvas.width, canvas.height) * 0.2,
            canvas.width / 2,
            canvas.height / 2,
            Math.max(canvas.width, canvas.height) * 0.75
          );
          g.addColorStop(0, "rgba(0,0,0,0)");
          g.addColorStop(1, "rgba(0,0,0,0.55)");
          ctx.fillStyle = g;
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          // Scanlines (lighter)
          ctx.globalAlpha = 0.06;
          for (let y = 0; y < canvas.height; y += 2) {
            ctx.fillStyle = "#000";
            ctx.fillRect(0, y, canvas.width, 1);
          }
          ctx.globalAlpha = 1;

          // Grain (less dense; reduce further if prefers-reduced-motion)
          const density =
            (canvas.width * canvas.height) / (reduceMotion ? 12000 : 7000);
          ctx.globalAlpha = 0.08;
          for (let i = 0; i < density; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            const s = Math.random() * 1.2 + 0.3;
            ctx.fillStyle = Math.random() > 0.5 ? "#fff" : "#0f0";
            ctx.fillRect(x, y, s, s);
          }
          ctx.globalAlpha = 1;

          raf = requestAnimationFrame(drawOverlay);
        };
        drawOverlay();

        // -------- Phosphor decay (optional) --------
        const startPhosphor = () => {
          const p = phosphorRef.current;
          const host = termRef.current;
          if (!p || !host) return;
          const ctx = p.getContext("2d");
          if (!ctx) return;
          const rect = host.getBoundingClientRect();
          p.width = rect.width;
          p.height = rect.height;
          // fade previous frame slightly to create trails
          const decay = () => {
            if (document.hidden) return (decayRaf = requestAnimationFrame(decay));
            ctx.globalCompositeOperation = "source-over";
            ctx.fillStyle = "rgba(0,0,0,0.08)";  // decay strength
            ctx.fillRect(0, 0, p.width, p.height);
            decayRaf = requestAnimationFrame(decay);
          };
          decay();
        };
        if (enablePhosphorDecay) startPhosphor();

        // When user types, add a brief glow dot at the cursor cell
        const drawPhosphorDot = () => {
          const p = phosphorRef.current;
          const host = termRef.current;
          if (!enablePhosphorDecay || !p || !host || !termObj.current) return;
          const ctx = p.getContext("2d"); if (!ctx) return;
          // Estimate cell size from xterm cols/rows
          const cols = termObj.current.cols || 80;
          const rows = termObj.current.rows || 24;
          const rect = host.getBoundingClientRect();
          const cw = rect.width / cols;
          const ch = rect.height / rows;
          // Cursor position (xterm exposes buffer cursor)
          // Works on recent xterm versions:
          // @ts-ignore
          const buf = termObj.current.buffer?.active || termObj.current.buffer;
          const cx = Math.max(0, Math.min(cols - 1, (buf as any)?.cursorX ?? 0));
          const cy = Math.max(0, Math.min(rows - 1, (buf as any)?.cursorY ?? 0));
          const x = Math.floor(cx * cw);
          const y = Math.floor(cy * ch);
          const r = Math.max(1, Math.min(cw, ch) * 0.7);
          const g = ctx.createRadialGradient(x + cw * 0.5, y + ch * 0.6, 0, x + cw * 0.5, y + ch * 0.6, r);
          g.addColorStop(0.00, "rgba(170,255,210,0.40)");
          g.addColorStop(0.35, "rgba(130,255,190,0.20)");
          g.addColorStop(1.00, "rgba(0,0,0,0)");
          ctx.globalCompositeOperation = "lighter";
          ctx.fillStyle = g;
          ctx.fillRect(x - r, y - r, cw + 2 * r, ch + 2 * r);
          ctx.globalCompositeOperation = "source-over";
        };

        // Pause animation when tab hidden; resume on visible.
        const onVis = () => {
          const hidden = document.hidden;
          paused = hidden;
          if (!hidden) {
            raf = requestAnimationFrame(drawOverlay);
          }
        };
        document.addEventListener("visibilitychange", onVis);

        // -------- Scan jitter (random 1px nudge) --------
        const jitter = () => {
          const el = wrapperRef.current;
          if (!el) return;
          const dir = Math.random() > 0.5 ? 1 : -1;
          el.style.transform = `translateY(${dir}px)`;
          setTimeout(() => { el.style.transform = ""; }, 60);
        };
        // jitter every 6–14s randomly
        const jitterTimer = setInterval(jitter, 6000 + Math.random() * 8000);

        return () => {
          window.removeEventListener("resize", onResize);
          window.removeEventListener("keydown", handleKeyDown, true);
          window.removeEventListener("keydown", handleBootSkip);
          document.removeEventListener("visibilitychange", onVis);
          cancelAnimationFrame(raf);
          cancelAnimationFrame(decayRaf);
          clearInterval(jitterTimer);
          term.dispose();
        };
      } catch (error) {
        console.error("Failed to initialize terminal:", error);
      }
    };

    initTerminal();
  }, [mounted, reduceMotion]);

  // Always render the terminal for now

  // Debug: Check for borders on mount
  useEffect(() => {
    setTimeout(() => {
      const section = document.querySelector('section.relative.min-h-\\[70vh\\]');
      const maxW = document.querySelector('div.max-w-5xl.px-6');
      const allElements = document.querySelectorAll('section, div, main, *');
      
      console.log('=== GREEN LINE DEBUG ===');
      console.log('Section element:', section);
      if (section) {
        const styles = window.getComputedStyle(section);
        console.log('Section computed styles:', {
          borderLeft: styles.borderLeft,
          borderRight: styles.borderRight,
          borderTop: styles.borderTop,
          borderBottom: styles.borderBottom,
          outline: styles.outline,
          boxShadow: styles.boxShadow,
          borderColor: styles.borderColor,
          borderWidth: styles.borderWidth,
        });
      }
      
      console.log('Max-w-5xl element:', maxW);
      if (maxW) {
        const styles = window.getComputedStyle(maxW);
        console.log('Max-w-5xl computed styles:', {
          borderLeft: styles.borderLeft,
          borderRight: styles.borderRight,
          borderTop: styles.borderTop,
          borderBottom: styles.borderBottom,
          outline: styles.outline,
          boxShadow: styles.boxShadow,
          borderColor: styles.borderColor,
          borderWidth: styles.borderWidth,
        });
      }
      
      // Check all elements for ANY borders (not just green)
      const elementsWithBorders: any[] = [];
      allElements.forEach((el, idx) => {
        const styles = window.getComputedStyle(el);
        const hasBorder = (styles.borderLeftWidth !== '0px' && parseFloat(styles.borderLeftWidth) > 0) || 
                         (styles.borderRightWidth !== '0px' && parseFloat(styles.borderRightWidth) > 0) || 
                         (styles.borderTopWidth !== '0px' && parseFloat(styles.borderTopWidth) > 0) || 
                         (styles.borderBottomWidth !== '0px' && parseFloat(styles.borderBottomWidth) > 0);
        const borderColor = styles.borderColor;
        const hasGreen = borderColor.includes('rgb(16, 185, 129)') || 
                        borderColor.includes('rgb(5, 150, 105)') ||
                        borderColor.includes('emerald') ||
                        borderColor.includes('34, 197, 94') ||
                        borderColor.includes('16, 185, 129') ||
                        borderColor.includes('rgb(16, 185, 129)') ||
                        borderColor.includes('rgb(5, 150, 105)');
        
        if (hasBorder) {
          const rect = el.getBoundingClientRect();
          elementsWithBorders.push({
            idx,
            tag: el.tagName,
            classes: el.className,
            id: (el as HTMLElement).id,
            borderLeft: styles.borderLeft,
            borderRight: styles.borderRight,
            borderTop: styles.borderTop,
            borderBottom: styles.borderBottom,
            borderColor: borderColor,
            outline: styles.outline,
            boxShadow: styles.boxShadow,
            position: styles.position,
            top: rect.top,
            left: rect.left,
            width: rect.width,
            height: rect.height,
            element: el,
            isGreen: hasGreen,
          });
          
          // Debug logging only - no visual highlighting
          if (hasBorder && rect.top < 500 && rect.left < 100) {
            console.log(`HIGHLIGHTED ELEMENT at top:${rect.top} left:${rect.left}:`, el);
          }
        }
      });
      
      console.log(`Found ${elementsWithBorders.length} elements with borders:`, elementsWithBorders);
      
      // Log each element with border details
      elementsWithBorders.forEach((el, idx) => {
        console.log(`Border element ${idx}:`, {
          tag: el.tag,
          classes: el.classes,
          id: el.id,
          top: el.top,
          left: el.left,
          borderLeft: el.borderLeft,
          borderRight: el.borderRight,
          borderTop: el.borderTop,
          borderBottom: el.borderBottom,
          borderColor: el.borderColor,
          boxShadow: el.boxShadow,
          outline: el.outline,
        });
      });
      
      // Check for green specifically
      const greenElements = elementsWithBorders.filter(e => e.isGreen);
      console.log(`Found ${greenElements.length} elements with GREEN borders:`, greenElements);
      
      // Check for box-shadows that might look like borders
      const elementsWithBoxShadows: any[] = [];
      allElements.forEach((el) => {
        const styles = window.getComputedStyle(el);
        const boxShadow = styles.boxShadow;
        if (boxShadow && boxShadow !== 'none') {
          const rect = el.getBoundingClientRect();
          if (rect.top < 500 && rect.left < 100) {
            elementsWithBoxShadows.push({
              tag: el.tagName,
              classes: el.className,
              boxShadow: boxShadow,
              top: rect.top,
              left: rect.left,
              element: el,
            });
          }
        }
      });
      console.log(`Found ${elementsWithBoxShadows.length} elements with box-shadows in top-left area:`, elementsWithBoxShadows);
      
      // Check pseudo-elements on actual CRT element
      const crtElement = document.querySelector('.crt-curved');
      if (crtElement) {
        try {
          const beforeStyles = window.getComputedStyle(crtElement, '::before');
          console.log('CRT curved ::before styles:', {
            border: beforeStyles.border,
            borderColor: beforeStyles.borderColor,
            boxShadow: beforeStyles.boxShadow,
            content: beforeStyles.content,
          });
          const afterStyles = window.getComputedStyle(crtElement, '::after');
          console.log('CRT curved ::after styles:', {
            border: afterStyles.border,
            borderColor: afterStyles.borderColor,
            boxShadow: afterStyles.boxShadow,
            content: afterStyles.content,
          });
        } catch (e) {
          console.log('Could not check pseudo-elements:', e);
        }
      }
      
      // Check backdrop canvas
      const backdropCanvas = document.querySelector('canvas[style*="position: fixed"]');
      if (backdropCanvas) {
        const rect = backdropCanvas.getBoundingClientRect();
        const styles = window.getComputedStyle(backdropCanvas);
        console.log('Backdrop canvas found:', {
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height,
          border: styles.border,
          borderLeft: styles.borderLeft,
          borderColor: styles.borderColor,
          outline: styles.outline,
          boxShadow: styles.boxShadow,
          element: backdropCanvas,
        });
      }
      
      // Check spacer div
      const spacer = document.querySelector('div.h-screen.w-full');
      if (spacer) {
        const rect = spacer.getBoundingClientRect();
        const styles = window.getComputedStyle(spacer);
        console.log('Spacer div found:', {
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height,
          border: styles.border,
          borderLeft: styles.borderLeft,
          borderColor: styles.borderColor,
          outline: styles.outline,
          boxShadow: styles.boxShadow,
          background: styles.background,
          backgroundColor: styles.backgroundColor,
          element: spacer,
        });
      }
      
      // Check main element
      const mainEl = document.querySelector('main.min-h-screen');
      if (mainEl) {
        const rect = mainEl.getBoundingClientRect();
        const styles = window.getComputedStyle(mainEl);
        console.log('Main element found:', {
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height,
          border: styles.border,
          borderLeft: styles.borderLeft,
          borderColor: styles.borderColor,
          outline: styles.outline,
          boxShadow: styles.boxShadow,
          background: styles.background,
          backgroundColor: styles.backgroundColor,
          element: mainEl,
        });
      }
      
      console.log('=== END DEBUG ===');
    }, 100);
  }, [mounted]);

  return (
    <section className="relative min-h-[50vh] sm:min-h-[70vh] w-full overflow-hidden border-0" style={{ borderLeft: 'none !important', borderRight: 'none !important', borderTop: 'none !important', borderBottom: 'none !important', outline: 'none !important', boxShadow: 'none' }}>
      {/* Animated aurora + soft glows */}
      <div
        className="pointer-events-none absolute inset-0 opacity-35 animate-spin-slow"
        style={{ background: auroraBg }}
      />
      <div
        className="pointer-events-none absolute -inset-40 blur-3xl"
        style={{
          background:
            "radial-gradient(60% 50% at 20% 10%, transparent, transparent), radial-gradient(40% 60% at 80% 80%, rgba(0,180,255,0.06), transparent)",
          border: "none",
          outline: "none"
        }}
      />

      <div className="relative mx-auto max-w-5xl px-6 py-16 border-0 outline-0" style={{ borderLeft: 'none !important', borderRight: 'none !important', borderTop: 'none !important', borderBottom: 'none !important', outline: 'none !important', boxShadow: 'none' }}>
        <CRT 
          className="transition-opacity duration-300 ease-in-out"
          style={{ opacity: isHovered ? 0.9 : 0.2 }}
          onMouseEnter={() => {
            console.log('CRT Container Opacity on hover:', 0.9);
            setIsHovered(true);
          }}
          onMouseLeave={() => {
            console.log('CRT Container Opacity on leave:', 0.2);
            setIsHovered(false);
          }}
        >
          <div 
            className="rounded-2xl bg-black/10 shadow-[0_0_80px_rgba(0,255,180,0.05)] relative"
            style={{ position: 'relative', zIndex: 10 }}
          >
            {/* Terminal wrapper - contains terminal and overlay canvases */}
            <div ref={wrapperRef} className="relative" style={{ position: 'relative', zIndex: 10 }}>
              {/* Terminal element - must be visible */}
              <div
                ref={termRef}
                onPointerDown={() => {
                  // xterm's cursor is rendered separately from its hidden textarea.
                  // Explicitly restore focus when the prompt/cursor area is clicked.
                  termObj.current?.focus();
                }}
                className="xterm h-[300px] sm:h-[420px] w-full rounded-2xl p-2 sm:p-3 pt-3 sm:pt-4 text-[12px] sm:text-[14px] overflow-hidden bg-black/80"
                style={{ 
                  position: 'relative', 
                  zIndex: 10,
                  backgroundColor: 'rgba(8, 16, 24, 0.9)' // Match terminal theme background
                }}
              />
              {/* Overlay canvas for scanlines/vignette - above terminal */}
              <canvas
                ref={canvasRef}
                className="pointer-events-none absolute inset-0 rounded-2xl mix-blend-overlay"
                style={{ 
                  position: 'absolute',
                  zIndex: 11,
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0
                }}
              />
              {/* Phosphor decay canvas - above overlay canvas */}
              <canvas
                ref={phosphorRef}
                className="pointer-events-none absolute inset-0 rounded-2xl"
                style={{ 
                  mixBlendMode: "screen", 
                  opacity: 0.8,
                  position: 'absolute',
                  zIndex: 12,
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0
                }}
              />
            </div>
          </div>
        </CRT>
        <div className="flex flex-wrap items-center justify-center gap-3 p-4 text-sm text-emerald-200/80 mt-4" style={{ borderTop: 'none', border: 'none', outline: 'none' }}>
          <kbd
            className="rounded bg-emerald-400/10 px-1.5 py-0.5 cursor-pointer"
            onClick={() => {
              const t = termObj.current;
              if (!t) return;
              t.focus();
              t.paste?.("help"); // types 'help' for the user
            }}
          >
            help
          </kbd>
          <span>for commands · or jump to</span>
          {([
            { id: "about", label: "about" },
            { id: "cv", label: "cv" },
            { id: "work", label: "industry" },
            { id: "portfolio", label: "portfolio" },
            { id: "blog", label: "research" },
          ] as const).map(({ id, label }) => (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              className="rounded-full border border-emerald-400/20 bg-emerald-400/5 px-2.5 py-1 text-emerald-200 hover:border-emerald-300/40"
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function wait(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

function prompt(term: any) {
  term.write("\x1b[38;2;138;255;193muser\x1b[0m@\x1b[38;2;138;200;255mhost\x1b[0m:~$ ");
}

function replaceLine(term: any, s: string) {
  term.write("\x1b[2K\r"); // clear line & return carriage
  prompt(term);
  term.write(s);
  return s;
}

function showHelp(term: any) {
  term.writeln("Commands:");
  term.writeln("  industry | portfolio | research | about | cv");
  term.writeln("  open <section>       jump to a section");
  term.writeln("  whoami | get_quote   learn more");
  term.writeln("  theme <dark|dim|mono>");
  term.writeln("  animation <on|off|status>");
  term.writeln("  clear");
}

type BackdropControls = {
  showBackdrop: boolean;
  setShowBackdrop: (value: boolean) => void;
  sonificationEnabled: boolean;
  setSonificationEnabled: (value: boolean) => void;
  turing: TuringParams;
  setTuringConfig: (config: Partial<TuringParams>) => void;
};

function handleCommand(term: any, raw: string, controls: BackdropControls) {
  const [name, arg] = splitOnce(raw);
  const sectionAliases: Record<string, string> = {
    industry: "work",
    work: "work",
    portfolio: "portfolio",
    research: "blog",
    blog: "blog",
    about: "about",
    cv: "cv",
  };

  if (sectionAliases[name]) {
    term.writeln(`opening ${name} …`);
    scrollToSection(sectionAliases[name]);
    return;
  }

  switch (name) {
    case "help":
      showHelp(term);
      break;
    case "clear":
      term.clear();
      break;
    case "whoami":
      term.writeln("Koerner Gray-Buchta · ai research engineer · Ann Arbor");
      break;
    case "open": {
      if (!arg) return term.writeln("usage: open <industry|portfolio|research|about|cv>");
      const target = arg.toLowerCase();
      const sectionId = sectionAliases[target];
      if (!sectionId) return term.writeln(`unknown section: ${arg}`);
      term.writeln(`opening ${target} …`);
      scrollToSection(sectionId);
      break;
    }
    case "theme":
      applyTheme(term, arg);
      break;
    case "animation": {
      const action = arg?.toLowerCase();
      if (action === "on") {
        controls.setShowBackdrop(true);
        term.writeln("animation: on");
      } else if (action === "off") {
        controls.setShowBackdrop(false);
        term.writeln("animation: off");
      } else if (action === "status") {
        const soundStatus = controls.sonificationEnabled ? "on" : "off";
        const colorStatus = (controls.turing?.enableColor ?? false) ? "on" : "off";
        const animStatus = controls.showBackdrop ? "on" : "off";
        term.writeln(`animation: ${animStatus}`);
        term.writeln(`animation_sound: ${soundStatus}`);
        term.writeln(`animation_color: ${colorStatus}`);
      } else {
        term.writeln("Usage: animation on|off|status");
      }
      break;
    }
    case "animation_sound": {
      const action = arg?.toLowerCase();
      if (action === "on") {
        controls.setSonificationEnabled(true);
        term.writeln("animation_sound: on");
      } else if (action === "off") {
        controls.setSonificationEnabled(false);
        term.writeln("animation_sound: off");
      } else {
        term.writeln("Usage: animation_sound on|off");
      }
      break;
    }
    case "animation_color": {
      const action = arg?.toLowerCase();
      if (action === "on") {
        controls.setTuringConfig({ enableColor: true });
        term.writeln("animation_color: on");
      } else if (action === "off") {
        controls.setTuringConfig({ enableColor: false });
        term.writeln("animation_color: off");
      } else {
        term.writeln("Usage: animation_color on|off");
      }
      break;
    }
    case "get_quote": {
      // Initialize with random index on first call, then round-robin
      if (quoteIndex === null) {
        quoteIndex = Math.floor(Math.random() * QUOTES.length);
      }
      const quote = QUOTES[quoteIndex];
      term.writeln(quote);
      // Move to next quote, wrapping around
      quoteIndex = (quoteIndex + 1) % QUOTES.length;
      break;
    }
    case "":
      break;
    default:
      term.writeln(`${name}: command not found (try 'help')`);
  }
}

const QUOTES = [
  'Anton Zeilinger - "The distinction between reality and our knowledge of reality, between reality and information, cannot be made."',
  'Terence McKenna - "The syntactical nature of reality, the real secret of magic, is that the world is made of words."',
  'Ludwig Wittgenstein - "The limits of my language mean the limits of my world."',
  'Philip K. Dick - "The basic tool for the manipulation of reality is the manipulation of words. If you can control the meaning of words, you can control the people who must use them."',
  'Ted Kaczynski - "The system does not exist to satisfy human needs. Instead, human behavior has to be modified to fit the needs of the system."',
  'John Archibald Wheeler - "It from bit symbolizes the idea that every item of the physical world has at bottom — at a very deep bottom — an immaterial source and explanation."',
  'David Bohm - "Thought creates divisions out of itself and then says that they are there naturally."',
  'Joseph Campbell - "The psychotic drowns in the same waters in which the mystic swims with delight."',
  'Heinz von Foerster - "Reality is the construction of observers."',
  'Alan Watts - "You are an aperture through which the universe is looking at and exploring itself."',
  'Ervin Laszlo - "The vacuum is not empty; it is a plenum of information."',
  'The Zohar - "The entire world is sustained by the breath of the letters."',
  'Gershom Scholem - "Language is the hidden foundation of creation."',
  'The Dhammapada - "All that we are is the result of what we have thought."',
  'Shankara - "Brahman alone is real. The world is appearance."',
];

// Track current quote index for round-robin (null = not initialized, will start random)
let quoteIndex: number | null = null;

function splitOnce(s: string): [string, string | undefined] {
  const i = s.indexOf(" ");
  if (i === -1) return [s, undefined];
  return [s.slice(0, i), s.slice(i + 1)];
}

function applyTheme(term: any, name?: string) {
  const t = name?.toLowerCase();
  const themes: Record<string, any> = {
    dark: { background: "#0a0e10", foreground: "#d0ffe0", cursor: "#8affc1" }, // Green terminal (default)
    dim: { background: "#1a1a2e", foreground: "#a8d8ea", cursor: "#0f3460" }, // Blue/cyan theme
    mono: { background: "#1e1e1e", foreground: "#d4d4d4", cursor: "#aeafad" }, // High contrast gray
  };
  term.options.theme = (t && themes[t]) || themes.dark;
}
