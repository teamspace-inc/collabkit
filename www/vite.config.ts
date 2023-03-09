import { resolve } from 'path';
import react from '@vitejs/plugin-react';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import mdx from '@mdx-js/rollup';
// import { remarkCodeHike } from '@code-hike/mdx';

// import { createRequire } from 'node:module';
// const require = createRequire(import.meta.url);
// const theme = require('shiki/themes/dark-plus.json');
// import { CollabKitMonacoTheme } from './src/docs/CollabKitMonacoTheme';
const remarkPlugins = []; // [remarkCodeHike, { theme, lineNumbers: true, showCopyButton: true }];

export default {
  plugins: [react(), vanillaExtractPlugin(), mdx({ remarkPlugins })],
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
  build: {
    sourcemap: false,
  },
  server: {
    port: 8000,
  },
  envDir: resolve(__dirname, '../env'),
};
