import dts from 'rollup-plugin-dts';

const config = [
  {
    input: './types/packages/@collabkit/custom-theme-cashboard/src/index.d.ts',
    output: [{ file: 'dist/collabkit-custom-theme-cashboard.d.ts', format: 'es' }],
    plugins: [dts({ respectExternal: true })],
    external: ['react', 'react-dom', 'date-fns', 'date-fns/locale', '@collabkit/react'],
  },
];

export default config;
