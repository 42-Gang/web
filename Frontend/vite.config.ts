// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig({
	define: {
    'process.env': {}
  },
  plugins: [react(), tailwindcss()],
  css: {
    postcss: './postcss.config.js',
  },
  assetsInclude: ["**/*.svg"],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000", // mock 서버 주소
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
