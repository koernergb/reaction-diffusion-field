import { useEffect, useRef } from "react";
import { createTuringStripes, type StripesOptions } from "../index";

export default function TuringStripesBackdrop(props: StripesOptions) {
  const ref = useRef<HTMLCanvasElement>(null);
  const apiRef = useRef<ReturnType<typeof createTuringStripes> | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    apiRef.current = createTuringStripes(ref.current, props);
    return () => {
      apiRef.current?.cleanup();
      apiRef.current = null;
    };
  }, []); // Only create once on mount

  // Update params when props change (but don't recreate)
  useEffect(() => {
    if (apiRef.current) {
      apiRef.current.setParams(props);
    }
  }, [props]);

  return (
    <canvas
      ref={ref}
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "auto",
        // Use browser's best quality rendering (avoid pixelated/crisp-edges)
        imageRendering: "auto",
      } as React.CSSProperties}
    />
  );
}

