import react from '@vitejs/plugin-react-swc';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const API_URL = `${env.VITE_API_URL.replace(/\/$/, '')}/${env.VITE_API_VERSION.replace(/^\//, '')}`;

  return {
    plugins: [
      react({
        plugins: [
          [
            '@swc/plugin-emotion',
            {
              sourceMap: false,
              autoLabel: 'dev-only',
              labelFormat: '[local]',
            },
          ],
        ],
      }),
    ],
    resolve: {
      alias: [{ find: '@', replacement: '/src' }],
    },
    server: {
      proxy: {
        '/api': {
          target: API_URL,
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  };
});
