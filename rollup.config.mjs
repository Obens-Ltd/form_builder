import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
export default {
  input: 'src/index.ts',
  output: {
    file: 'dist/index.ts',
    format: 'cjs',
  },
  plugins: [
    babel({
      presets: ['@babel/preset-env', '@babel/preset-react'],
      exclude: 'node_modules/**',
    }),
    commonjs(),
    resolve(),
    postcss({
      modules: true,
    }),
  ],
};
