import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), vanillaExtractPlugin(), visualizer()],
  resolve: {
    alias: {
      '@collabkit/react': resolve(__dirname, '../../packages/@collabkit/react/src/index.ts'),
      '@collabkit/react-scroll-area': resolve(
        __dirname,
        '../../packages/@collabkit/react-scroll-area/src/index.ts'
      ),
      'rehype-react': resolve(
        __dirname,
        '../../packages/@collabkit/react/src/vendor/rehype-react.bundle.js'
      ),
      'remark-rehype': resolve(
        __dirname,
        '../../packages/@collabkit/react/src/vendor/remark-rehype.bundle.js'
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
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:3030',
      },
    },
  },
  envDir: resolve(__dirname, '../../env'),
});
