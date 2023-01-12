import dts from 'rollup-plugin-dts';

const config = [
  {
    input: './types/packages/@collabkit/pro-theme-latitude/src/index.d.ts',
    output: [{ file: 'dist/collabkit-latitude.d.ts', format: 'es' }],
    plugins: [dts({ respectExternal: true })],
    external: ['react', 'react-dom', '@collabkit/react', /\.css$/],
  },
];

export default config;
