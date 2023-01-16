import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import replace from '@rollup/plugin-replace';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import { visualizer } from 'rollup-plugin-visualizer';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const plugins = [react(), vanillaExtractPlugin(), visualizer(), svgr()];

  if (mode === 'production') {
    plugins.push(
      replace({ 'process.env.NODE_ENV': JSON.stringify('production'), preventAssignment: true })
    );
  }

  return {
    plugins,
    build: {
      lib: {
        entry: resolve(__dirname, 'src/index.ts'),
        name: 'CollabKit',
        fileName: 'collabkit-react',
      },
      rollupOptions: {
        external: ['react', 'react-dom'],
        output: {
          // Provide global variables to use in the UMD build
          // for externalized deps
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM',
          },
        },
      },
    },
    resolve: {
      alias: {
        'rehype-react': resolve(__dirname, 'src/vendor/rehype-react.bundle.js'),
        'remark-rehype': resolve(__dirname, 'src/vendor/remark-rehype.bundle.js'),

        // @lexical/code is rather large (because of prismjs), and unused, so we stub it out
        '@lexical/code': resolve(__dirname, 'src/vendor/lexical-markdown.stub.ts'),
      },
    },
    server: {
      port: 3003,
    },
    envDir: resolve(__dirname, '../../../env'),
  };
});
