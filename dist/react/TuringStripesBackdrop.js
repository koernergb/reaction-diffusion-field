import { jsx as o } from "react/jsx-runtime";
import { useRef as i, useEffect as u } from "react";
import { createTuringStripes as a } from "../index.js";
function l(r) {
  const n = i(null), e = i(null);
  return u(() => {
    if (n.current)
      return e.current = a(n.current, r), () => {
        var t;
        (t = e.current) == null || t.cleanup(), e.current = null;
      };
  }, []), u(() => {
    e.current && e.current.setParams(r);
  }, [r]), /* @__PURE__ */ o("div", { style: { position: "fixed", inset: 0, width: "100vw", height: "100vh", backgroundColor: "#0a0a0a", zIndex: 0 }, children: /* @__PURE__ */ o(
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
  l as default
};
