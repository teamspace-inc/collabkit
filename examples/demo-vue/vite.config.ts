import { fileURLToPath, URL } from 'node:url';
import { resolve } from 'node:path';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vanillaExtractPlugin(), visualizer()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@collabkit/vue': resolve(__dirname, '../../packages/@collabkit/vue/src/index.ts'),
      '@collabkit/custom-themes': resolve(
        __dirname,
        '../../packages/@collabkit/custom-themes/src/index.ts'
      ),
    },
  },
  server: {
    port: 4000,
  },
  envDir: resolve(__dirname, '../../env'),
});
