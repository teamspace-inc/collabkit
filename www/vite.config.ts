import { resolve } from 'path';
import react from '@vitejs/plugin-react';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import mdx from '@mdx-js/rollup';

export default {
  plugins: [react(), vanillaExtractPlugin(), mdx()],
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
  build: {
    sourcemap: false,
  },
  server: {
    port: 8000,
  },
  envDir: resolve(__dirname, '../env'),
};
