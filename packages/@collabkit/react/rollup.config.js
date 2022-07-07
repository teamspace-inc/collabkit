import path from 'path';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import typescript from '@rollup/plugin-typescript';
import esbuild from 'rollup-plugin-esbuild';
import css from 'rollup-plugin-import-css';

const extensions = ['.js', '.ts', '.tsx'];
const { root } = path.parse(process.cwd());

function external(id) {
  return !id.startsWith('.') && !id.startsWith(root);
}

function getEsbuild(target, env = 'development') {
  return esbuild({
    minify: env === 'production',
    target,
    tsconfig: path.resolve('./tsconfig.json'),
  });
}

function createDeclarationConfig(input, output) {
  return {
    input,
    output: {
      dir: output,
    },
    external,
    plugins: [
      css(),
      typescript({
        declaration: true,
        emitDeclarationOnly: true,
        outDir: output,
      }),
    ],
  };
}

function createESMConfig(input, output) {
  return {
    input,
    output: [
      { file: `${output}.js`, format: 'esm' },
      { file: `${output}.mjs`, format: 'esm' },
    ],
    external,
    plugins: [
      css(),
      resolve({ extensions }),
      replace({
        __DEV__: '(import.meta.env&&import.meta.env.MODE)!=="production"',
        delimiters: ['\\b', '\\b(?!(\\.|/))'],
        preventAssignment: true,
      }),
      getEsbuild('esnext', 'production'),
    ],
  };
}

export default function (_args) {
  return [
    createDeclarationConfig(`src/index.ts`, 'dist'),
    createESMConfig(`src/index.ts`, `dist/esm/index`),
  ];
}
