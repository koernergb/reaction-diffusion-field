import { defineConfig } from "vite";
import glsl from "vite-plugin-glsl";

export default defineConfig({
  plugins: [glsl()],
  build: {
    outDir: "dist-lib",
    lib: {
      entry: {
        index: "src/index.ts",
        "react/TuringStripesBackdrop": "src/react/TuringStripesBackdrop.tsx",
      },
      formats: ["es"],
      fileName: (_format, entryName) => `${entryName}.js`,
    },
    rollupOptions: {
      external: ["react", "react/jsx-runtime"],
    },
  },
});
