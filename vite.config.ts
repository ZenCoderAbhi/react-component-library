import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  // Dev sandbox lives in dev/ — keeps library source clean
  root: "dev",

  plugins: [
    react(),
  ],

  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "my-react-library",
      formats: ["es", "cjs"],
      fileName: (format) => `index.${format === "es" ? "js" : "cjs"}`,
      cssFileName: "style",
    },
    // Anchor dist/ to project root — prevents output going into dev/dist/
    outDir: resolve(__dirname, "dist"),
    // Clean dist/ before every build
    emptyOutDir: true,
    // Emit a single dist/style.css so consumers can import it explicitly
    cssCodeSplit: false,
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
});