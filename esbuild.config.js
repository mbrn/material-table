const { build } = require('esbuild');
const { red, green, yellow, italic, greenBright } = require('chalk');
const rimraf = require('rimraf');
const path = require('path');

const pkg = require('./package.json');

const { log } = console;
const { stdout, stderr, exit } = process;

const peerDeps = Object.keys(pkg.peerDependencies).map((k) => k);

// Options
const BUILD_DIR = 'dist'; // relative to root of project (no trailing slash)
const BUNDLE_FILE_NAME = 'material-table.js'; // bundle file name (no starting slash)
const ENTRY_POINT = 'src/index.js'; // relative to root of project

stdout.write(yellow(`-Cleaning build artifacts from : '${BUILD_DIR}' `));

rimraf(path.resolve(__dirname, BUILD_DIR), (error) => {
  if (error) {
    stderr.write(red(`err cleaning '${BUILD_DIR}' : ${error.stderr}`));
    exit(1);
  }

  log(green.italic('successfully cleaned build artifacts'));

  const options = {
    entryPoints: [ENTRY_POINT],
    minify: true,
    bundle: true,
    format: 'esm',
    outfile: `${BUILD_DIR}/${BUNDLE_FILE_NAME}`,
    loader: {
      '.js': 'jsx'
    },
    // These are third party libraries that we DO NOT want to
    // include in our bundle. It is assumed the consumer will
    // already have these packages. Including them in our bundle
    // only bloats the size for no reason.
    external: [
      ...peerDeps,
      'react-beautiful-dnd',
      /material-ui/,
      'jspdf',
      'jspdf-autotable',
      '@material-ui',
      'react-is',
      'classnames',
      'object-assign',
      'prop-types'
    ]
  };

  log(yellow('-Begin bundling'));
  build(options)
    .then(() => {
      // Only using `.then` for logging purposes
      log(
        greenBright(
          `\nSuccessfully bundled to ${BUILD_DIR}/${BUNDLE_FILE_NAME}`
        ),
        yellow('\n[note]'),
        italic.green(': this path is relative to the root of this project)')
      );
    })
    .catch((error) => {
      stderr.write(red(`\nerror bundling : ${error.stderr}`));
      exit(1);
    })
    .finally(() => {
      exit(0);
    });
});
