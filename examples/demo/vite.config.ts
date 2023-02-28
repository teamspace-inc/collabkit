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
  define: {
    'import.meta.env.VITE_API_HOST': getApiHostLiteral(),
  },
  server: {
    port: 3000,
  },
  envDir: resolve(__dirname, '../../env'),
});

function getApiHostLiteral() {
  if (process.env.VITE_API_HOST) {
    return JSON.stringify(process.env.VITE_API_HOST);
  } else if (process.env.VERCEL_GIT_COMMIT_REF) {
    const branch = process.env.VERCEL_GIT_COMMIT_REF.replace(/[^0-9A-z]/g, '-');
    return JSON.stringify(`https://api-git-${branch}.teamspace.dev`);
  } else {
    return JSON.stringify('http://localhost:3030');
  }
}
