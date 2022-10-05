import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';

export default defineConfig(() => {
  return {
    plugins: [react(), vanillaExtractPlugin()],
    resolve: {
      alias: {
        '@collabkit/react': resolve(__dirname, '../packages/@collabkit/react/src/index.ts'),
      },
    },
    optimizeDeps: {
      include: ['react/jsx-runtime'],
    },

    server: {
      port: 8000,
    },
    envDir: resolve(__dirname, '../env'),
  };
});
