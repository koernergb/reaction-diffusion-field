import { useEffect, useState } from "react";

interface ParallaxConfig {
  maxTranslateX?: number;
  maxTranslateY?: number;
  maxRotateX?: number;
  maxRotateY?: number;
}

export function useMouseParallax(config: ParallaxConfig = {}) {
  const {
    maxTranslateX = 10, // px
    maxTranslateY = 6,  // px
    maxRotateX = 2,     // deg
    maxRotateY = 2,     // deg
  } = config;

  const [style, setStyle] = useState<React.CSSProperties>({});

  useEffect(() => {
    if (typeof window === "undefined") return;

    function handleMove(e: MouseEvent) {
      const w = window.innerWidth || 1;
      const h = window.innerHeight || 1;

      // Disable on small screens (mobile/tablet)
      if (w < 768) {
        setStyle({});
        return;
      }

      // Normalize mouse to [-1, 1]
      const mx = (e.clientX / w) * 2 - 1;
      const my = (e.clientY / h) * 2 - 1;

      const tx = -mx * maxTranslateX;
      const ty = -my * maxTranslateY;
      const rx = my * maxRotateX;
      const ry = -mx * maxRotateY;

      setStyle({
        transform: `
          translate3d(${tx}px, ${ty}px, 0)
          rotateX(${rx}deg)
          rotateY(${ry}deg)
        `,
        transformStyle: "preserve-3d",
        willChange: "transform",
        transition: "transform 180ms cubic-bezier(0.18, 0.89, 0.32, 1.28)",
      });
    }

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [maxTranslateX, maxTranslateY, maxRotateX, maxRotateY]);

  return style;
}

