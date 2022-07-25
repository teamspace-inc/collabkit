import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { remarkCodeHike } from '@code-hike/mdx';
const theme = require('shiki/themes/dracula.json');

// https://vitejs.dev/config/
// mdx configured as per
// https://github.com/brillout/vite-plugin-mdx/issues/44#issuecomment-1106448872
export default defineConfig(async () => {
  const mdx = await import('@mdx-js/rollup');
  return {
    plugins: [react(), mdx.default({ remarkPlugins: [[remarkCodeHike, { theme }]] })],
    resolve: {
      alias: {
        '@collabkit/react': resolve(__dirname, '../../packages/@collabkit/react'),
      },
    },
    optimizeDeps: {
      include: ['react/jsx-runtime'],
    },

    server: {
      port: 8080,
    },
  };
});
