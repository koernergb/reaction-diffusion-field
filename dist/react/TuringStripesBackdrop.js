import { jsx as i } from "react/jsx-runtime";
import { useRef as o, useEffect as u } from "react";
import { createTuringStripes as c } from "../index.js";
function d(r) {
  const n = o(null), e = o(null);
  return u(() => {
    if (n.current)
      return e.current = c(n.current, r), () => {
        var t;
        (t = e.current) == null || t.cleanup(), e.current = null;
      };
  }, []), u(() => {
    e.current && e.current.setParams(r);
  }, [r]), /* @__PURE__ */ i(
    "canvas",
    {
      ref: n,
      style: {
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "auto",
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
  );
}
export {
  d as default
};
