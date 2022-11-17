import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import replace from '@rollup/plugin-replace';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const plugins = [react(), vanillaExtractPlugin()];

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
        name: 'CollabKitCashboardTheme',
        fileName: 'collabkit-custom-theme-cashboard',
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
        '@collabkit/react': resolve(__dirname, '../react/src/index.ts'),
      },
    },

    server: {
      port: 3003,
    },
    envDir: resolve(__dirname, '../../../env'),
  };
});
