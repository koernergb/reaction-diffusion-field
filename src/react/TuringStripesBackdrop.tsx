import { useEffect, useRef } from "react";
import { createTuringStripes, type StripesOptions } from "../index";

export default function TuringStripesBackdrop(props: StripesOptions) {
  const ref = useRef<HTMLCanvasElement>(null);
  const apiRef = useRef<ReturnType<typeof createTuringStripes> | null>(null);

  // Initialize once on mount
  useEffect(() => {
    if (!ref.current) return;

    // Create instance with initial props
    apiRef.current = createTuringStripes(ref.current, props);
    return () => {
      apiRef.current?.cleanup();
      apiRef.current = null;
    };
  }, []); // Only on mount

  // Update all params (including color params) when props change
  useEffect(() => {
    if (apiRef.current) {
      // setParams handles all parameters including color ones
      apiRef.current.setParams(props);
    }
  }, [props]);

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

