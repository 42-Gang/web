// vite.config.ts
import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  define: {
    'process.env': {},
  },
  plugins: [react(), tailwindcss()],
  css: {
    postcss: './postcss.config.js',
  },
  assetsInclude: ["**/*.svg"],
  server: {
    port: 5173,
    host: true,
    strictPort: true,
  },
});
