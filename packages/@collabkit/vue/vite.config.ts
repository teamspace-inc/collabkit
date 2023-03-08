import { resolve } from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import replace from '@rollup/plugin-replace';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const plugins = [vue(), visualizer()];

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
        fileName: 'collabkit-vue',
        formats: ['es'],
      },
      rollupOptions: {
        // make sure to externalize deps that shouldn't be bundled
        // into your library
        external: ['vue'],
      },
    },
    envDir: resolve(__dirname, '../../../env'),
  };
});
