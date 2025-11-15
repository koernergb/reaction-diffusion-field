import { useEffect, useRef, useMemo } from "react";
import { createTuringStripes, type StripesOptions } from "../index";

export default function TuringStripesBackdrop(props: StripesOptions) {
  const ref = useRef<HTMLCanvasElement>(null);
  const apiRef = useRef<ReturnType<typeof createTuringStripes> | null>(null);

  // Detect mobile and reduce performance settings
  const mobileOptimizedProps = useMemo(() => {
    if (typeof window === "undefined") return props;
    
    const isMobile = window.innerWidth < 640 || /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    if (isMobile) {
      return {
        ...props,
        gridSize: Math.min(props.gridSize ?? 1024, 512), // Cap at 512 on mobile
        stepsPerFrame: Math.max(1, Math.floor((props.stepsPerFrame ?? 10) * 0.5)), // Half steps on mobile
      };
    }
    
    return props;
  }, [props]);

  // Initialize once on mount
  useEffect(() => {
    if (!ref.current) return;

    // Create instance with mobile-optimized props
    apiRef.current = createTuringStripes(ref.current, mobileOptimizedProps);
    return () => {
      apiRef.current?.cleanup();
      apiRef.current = null;
    };
  }, []); // Only on mount

  // Update all params (including color params) when props change
  useEffect(() => {
    if (apiRef.current) {
      // setParams handles all parameters including color ones
      apiRef.current.setParams(mobileOptimizedProps);
    }
  }, [mobileOptimizedProps]);

  return (
    <div style={{ position: "fixed", inset: 0, width: "100vw", height: "100vh", backgroundColor: "#0a0a0a", zIndex: 0 }}>
      <canvas
        ref={ref}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
          pointerEvents: "auto",
          backgroundColor: "#0a0a0a", // Explicit dark grey background
          // Use browser's best quality rendering (avoid pixelated/crisp-edges)
          imageRendering: "auto",
          border: "none",
          outline: "none",
          borderLeft: "none",
          borderRight: "none",
          borderTop: "none",
          borderBottom: "none",
        } as React.CSSProperties}
      />
    </div>
  );
}

