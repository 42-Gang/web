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
  assetsInclude: ["**/*.svg", "**/*.png", "**/*.jpg", "**/*.jpeg"],
  server: {
    proxy: {
      '/api': {
        target: '*', // 백엔드 서버 주소
        changeOrigin: true,
      },
    },
  },
});