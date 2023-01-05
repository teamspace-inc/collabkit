import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import replace from '@rollup/plugin-replace';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const plugins = [react(), vanillaExtractPlugin(), visualizer()];

  if (mode === 'production') {
    plugins.push(
      replace({ 'process.env.NODE_ENV': JSON.stringify('production'), preventAssignment: true })
    );
  }

  return {
    plugins,
    server: {
      port: 3003,
    },
    envDir: resolve(__dirname, '../../../env'),
  };
});
