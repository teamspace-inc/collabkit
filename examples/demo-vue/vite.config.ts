import { fileURLToPath, URL } from 'node:url';
import { resolve } from 'node:path';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@collabkit/vue': resolve(__dirname, '../../packages/@collabkit/vue/src/index.ts'),
    },
  },
  server: {
    port: 4000,
  },
});
