import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import react from '@vitejs/plugin-react-swc';
import { defineConfig, loadEnv } from 'vite';
import { visualizer } from 'rollup-plugin-visualizer'; // 추가

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      react(),
      vanillaExtractPlugin(),
      visualizer({
        filename: './dist/stats.html',
        open: true,           // 빌드 후 자동으로 브라우저에서 stats.html 열기
        template: 'treemap',  // 시각화 방식: 'treemap' 또는 'sunburst'
      }),
    ],
    resolve: {
      alias: [{ find: '@', replacement: '/src' }],
    },
    server: {
      proxy: {
        '/api': {
          target: env.VITE_API_URL,
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
    build: {
      sourcemap: true, // 필수! 시각화를 위해 소스맵 생성
    },
  };
});
