import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

export default defineConfig({
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
});
