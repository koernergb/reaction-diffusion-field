import { jsx as o } from "react/jsx-runtime";
import { useRef as a, useMemo as d, useEffect as u } from "react";
import { createTuringStripes as s } from "../index.js";
function m(e) {
  const n = a(null), r = a(null), t = d(() => typeof window > "u" ? e : window.innerWidth < 640 || /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ? {
    ...e,
    // Four times fewer simulation pixels than the desktop floor, with
    // enough iterations to keep the field moving fluidly on phones.
    gridSize: Math.min(e.gridSize ?? 1024, 256),
    stepsPerFrame: Math.min(3, Math.max(1, Math.floor((e.stepsPerFrame ?? 10) * 0.3)))
  } : e, [e]);
  return u(() => {
    if (n.current)
      return r.current = s(n.current, t), () => {
        var i;
        (i = r.current) == null || i.cleanup(), r.current = null;
      };
  }, []), u(() => {
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
