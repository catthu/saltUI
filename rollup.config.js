import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import alias from '@rollup/plugin-alias';
import replace from 'rollup-plugin-replace';
import pkg from './package.json';

const packageJson = require("./package.json");

const cjs = {
  exports: 'named',
  format: 'cjs',
};

const esm = {
  format: 'esm',
};

const getCJS = override => ({ ...cjs, ...override });
const getESM = override => ({ ...esm, ...override });

const commonPlugins = [
  resolve(),
  commonjs(),
  typescript({ tsconfig: "./tsconfig.json", sourceMap: false }),
  alias({
    entries: [
      { find: 'react-native', replacement: 'react-native-web' }
    ]
  }),
  replace({
    __VERSION__: JSON.stringify(pkg.version),
  })
];

const configBase = {
  input: './src/index.tsx',

  // \0 is rollup convention for generated in memory modules
  external: id => !id.startsWith('\0') && !id.startsWith('.') && !id.startsWith('/'),
  plugins: commonPlugins,
};

const globals = {
  react: 'React', 'react-native': 'reactNative', 'prop-types': 'PropTypes', 'd3-scale': 'd3Scale', 'd3-array': 'd3Array', lodash: '_',
};

const standaloneBaseConfig = {
  ...configBase,
  input: './src/index.tsx',
  output: {
    file: 'dist/index.tsx',
    format: 'umd',
    globals,
    name: 'baseconfig'
  },
  external: {
    // Use external version of React
    "react": {
        "commonjs": "react",
        "commonjs2": "react",
        "amd": "react",
        "root": "React"
    },
    "react-dom": {
        "commonjs": "react-dom",
        "commonjs2": "react-dom",
        "amd": "react-dom",
        "root": "ReactDOM"
    }
  },
  plugins: configBase.plugins.concat(
    replace({
      __SERVER__: JSON.stringify(false),
    }),
  ),
};

const nativeConfig = {
  ...configBase,
  input: './src/index.tsx',
  output: [
    getCJS({
      file: 'dist/index.cjs.js',
    }),
    getESM({
      file: 'dist/index.esm.js',
    }),
  ],
};

const standaloneConfig = {
  ...standaloneBaseConfig,
  plugins: standaloneBaseConfig.plugins.concat(
    replace({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
  ),
};

const typeScriptConfig = {
  input: "dist/types/index.d.ts",
  output: [{ file: "dist/index.d.ts", format: "esm" }],
  plugins: [dts()],
};

export default [
  standaloneConfig,
  nativeConfig,
  typeScriptConfig
];
