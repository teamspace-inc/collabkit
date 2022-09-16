import dts from 'rollup-plugin-dts';

const config = [
  {
    input: './types/packages/@collabkit/react/src/index.d.ts',
    output: [{ file: 'dist/collabkit-react.d.ts', format: 'es' }],
    plugins: [dts({ respectExternal: true })],
    external: ['react', 'react-dom', 'date-fns', 'date-fns/locale'],
  },
];

export default config;
