import { jsx as o } from "react/jsx-runtime";
import { useRef as u, useMemo as d, useEffect as a } from "react";
import { createTuringStripes as s } from "../index.js";
function m(e) {
  const n = u(null), r = u(null), t = d(() => typeof window > "u" ? e : window.innerWidth < 640 || /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ? {
    ...e,
    gridSize: Math.min(e.gridSize ?? 1024, 512),
    // Cap at 512 on mobile
    stepsPerFrame: Math.max(1, Math.floor((e.stepsPerFrame ?? 10) * 0.5))
    // Half steps on mobile
  } : e, [e]);
  return a(() => {
    if (n.current)
      return r.current = s(n.current, t), () => {
        var i;
        (i = r.current) == null || i.cleanup(), r.current = null;
      };
  }, []), a(() => {
    r.current && r.current.setParams(t);
  }, [t]), /* @__PURE__ */ o("div", { style: { position: "fixed", inset: 0, width: "100vw", height: "100vh", backgroundColor: "#0a0a0a", zIndex: 0 }, children: /* @__PURE__ */ o(
    "canvas",
    {
      ref: n,
      style: {
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "auto",
        backgroundColor: "#0a0a0a",
        // Explicit dark grey background
        // Use browser's best quality rendering (avoid pixelated/crisp-edges)
        imageRendering: "auto",
        border: "none",
        outline: "none",
        borderLeft: "none",
        borderRight: "none",
        borderTop: "none",
        borderBottom: "none"
      }
    }
  ) });
}
export {
  m as default
};
