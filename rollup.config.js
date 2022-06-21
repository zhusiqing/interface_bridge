import { defineConfig } from 'rollup'
import typescript from '@rollup/plugin-typescript'
import dts from 'rollup-plugin-dts'
import nodeResolve from '@rollup/plugin-node-resolve'
import pkg from './package.json'
import { camelCase } from 'lodash';

const name = pkg.name
const input = './src/index.ts'

export default defineConfig([
  {
    input,
    plugins: [
      nodeResolve(),
      typescript()
    ],
    // external: ['lodash-es'],
    output: [
      {
        format: 'umd',
        file: `dist/${name}.js`,
        name: camelCase(pkg.name)
      },
      {
        exports: "named",
        format: 'esm',
        file: `dist/${name}.esm.js`
      }
    ]
  },
  {
    plugins: [dts()],
    input,
    output: {
      file: `dist/${pkg.name}.d.ts`,
      format: 'esm'
    }
  }
])
