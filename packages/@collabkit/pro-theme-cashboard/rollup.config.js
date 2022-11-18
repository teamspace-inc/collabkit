import dts from 'rollup-plugin-dts';

const config = [
  {
    input: './types/packages/@collabkit/pro-theme-cashboard/src/index.d.ts',
    output: [{ file: 'dist/collabkit-cashboard.d.ts', format: 'es' }],
    plugins: [dts({ respectExternal: true })],
    external: ['react', 'react-dom', '@collabkit/react', /\.css$/],
  },
];

export default config;
