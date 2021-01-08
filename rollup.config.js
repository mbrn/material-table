import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import strip from '@rollup/plugin-strip'; // Remove debugging code (like console.log(), etc..)
import del from 'rollup-plugin-delete';
import { terser } from 'rollup-plugin-terser';
import path from 'path';
// import external from 'rollup-plugin-peer-deps-external';

import pkg from './package.json';

// Input file aka entry point
const entryPoint = path.resolve(__dirname, './src/index.js');
// The appropriate file suffix + extension will get appended to whatever you put here
const outputFile = 'material-table';
// We place the file above in this folder. No trailing slashes!
const outputFolder = `dist`;
// Where we save output file. Again, the appropriate file suffix + extension will get
// appended to whatever you put here
const finalOutputPath = `${outputFolder}/${outputFile}`;

export default {
  // external(),
  input: entryPoint,
  output: [
    /**
     * Not sure if we even need cjs ?
     */
    // { file: `${finalOutputPath}.cjs.js`, format: 'cjs', inlineDynamicImports: true, exports: 'named' },
    {
      file: `${finalOutputPath}.js`,
      format: 'esm',
      inlineDynamicImports: true,
      exports: 'named',
    },
  ],
  plugins: [
    del({
      targets: [path.resolve(__dirname, `./${outputFolder}`)],
    }),
    resolve({
      jsnext: true,
      main: true,
      browser: true,
    }),
    commonjs({
      include: /node_modules/,
    }),
    terser(),
    strip(),
    babel({
      babelHelpers: 'runtime',
      exclude: [/node_modules/],
      configFile: path.resolve(__dirname, './configs/.babelrc'),
    }),
  ],
  external: [
    ...Object.keys(pkg.peerDependencies),
    'react-is',
    'jspdf',
    /material-ui/,
    'classnames',
  ],
};
