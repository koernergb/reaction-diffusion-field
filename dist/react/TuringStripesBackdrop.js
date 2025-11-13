import { jsx as c } from "react/jsx-runtime";
import { useRef as u, useEffect as i } from "react";
import { createTuringStripes as f } from "../index.js";
function l(e) {
  const t = u(null), r = u(null);
  return i(() => {
    if (t.current)
      return r.current = f(t.current, e), () => {
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
        pointerEvents: "auto"
      }
    }
  );
}
export {
  l as default
};
