import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react({ jsxRuntime: 'classic' })],

  server: {
    port: 8000,
    proxy: {
      // with options
      '/api': {
        target: 'https://us-central1-collabkit-dev.cloudfunctions.net',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },

  resolve: {
    mainFields: [
      'browser', // used for matrix-js-sdk
      'module',
      'jsnext:main',
      'jsnext',
    ],
  },
});
