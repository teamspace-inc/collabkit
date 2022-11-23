import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';

export default defineConfig(() => {
  return {
    plugins: [react(), vanillaExtractPlugin() as any],
    resolve: {
      alias: {
        '@collabkit/react': resolve(__dirname, '../packages/@collabkit/react/src/index.ts'),
        'rehype-react': resolve(
          __dirname,
          '../packages/@collabkit/react/src/vendor/rehype-react.bundle.js'
        ),
        'remark-rehype': resolve(
          __dirname,
          '../packages/@collabkit/react/src/vendor/remark-rehype.bundle.js'
        ),
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
