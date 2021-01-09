const { build } = require('esbuild');
const rimraf = require('rimraf');
const path = require('path');

const pkg = require('./package.json');

const externalDependencies = Object.keys(pkg.peerDependencies).map(
  (key) => key
);

rimraf(path.resolve(__dirname, './dist'), (error) => {
  if (error) {
    console.log("error : error removing old build files at './dist' " + error);
    process.exit(1);
  }

  const options = {
    entryPoints: ['src/index.js'],
    minify: true,
    bundle: true,
    format: 'esm',
    outfile: 'dist/material-table.js',
    loader: {
      '.js': 'jsx',
    },
    // These are third party libraries that we DO NOT want to
    // include in our bundle. It is assumed the consumer will
    // already have these packages. Including them in our bundle
    // only bloats the size for no reason.
    external: [
      ...externalDependencies,
      'react-beautiful-dnd',
      /material-ui/,
      'jspdf',
      'jspdf-autotable',
      '@material-ui',
      'react-is',
      'classnames',
      'object-assign',
      'prop-types',
    ],
  };

  build(options).catch((err) => {
    process.stderr.write(err.stderr);
    process.exit(1);
  });
});
