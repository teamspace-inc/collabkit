import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), visualizer()],
  resolve: {
    alias: {
      '@collabkit/react': resolve(__dirname, '../../packages/@collabkit/react/src/index.ts'),
      '@collabkit/custom-themes': resolve(
        __dirname,
        '../../packages/@collabkit/custom-themes/src/index.ts'
      ),
    },
  },
  build: {
    minify: 'terser',
    terserOptions: {
      format: {
        comments: false,
      },
    },
  },
  server: {
    port: 3017,
  },
  envDir: resolve(__dirname, '../../env'),
});
