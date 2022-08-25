import dts from 'rollup-plugin-dts';

const config = [
  {
    input: './types/vue/src/index.d.ts',
    output: [{ file: 'dist/collabkit-vue.d.ts', format: 'es' }],
    plugins: [dts({ respectExternal: true })],
    external: ['vue'],
  },
];

export default config;
