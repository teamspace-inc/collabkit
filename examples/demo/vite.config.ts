import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@collabkit/react': resolve(__dirname, '../../packages/@collabkit/react/src/index.ts'),
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
});
