import { jsx as c } from "react/jsx-runtime";
import { useRef as u, useEffect as i } from "react";
import { createTuringStripes as o } from "../index.js";
function l(e) {
  const t = u(null), r = u(null);
  return i(() => {
    if (t.current)
      return r.current = o(t.current, e), () => {
        var n;
        (n = r.current) == null || n.cleanup(), r.current = null;
      };
  }, []), i(() => {
    r.current && r.current.setParams(e);
  }, [e]), /* @__PURE__ */ c(
    "canvas",
    {
      ref: t,
      style: {
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "auto",
        // Use browser's best quality rendering (avoid pixelated/crisp-edges)
        imageRendering: "auto"
      }
    }
  );
}
export {
  l as default
};
