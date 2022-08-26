import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), visualizer()],

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

  server: {
    port: 3003,
  },
});
