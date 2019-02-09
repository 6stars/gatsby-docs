import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import replace from 'rollup-plugin-replace'
import nodeGlobals from 'rollup-plugin-node-globals'
import { uglify } from 'rollup-plugin-uglify'
import { sizeSnapshot } from 'rollup-plugin-size-snapshot'

const input = './src/index.js'
const name = 'docs-ui'
const globals = {
  react: 'React',
  'react-dom': 'ReactDOM',
}
const babelOptions = {
  exclude: [
    /..\/..\/node_modules/,
    /node_modules/,
    /..\/..\/node_modules\/gatsby\/cache-dir\/gatsby-browser-entry/,
  ],
  // We are using @babel/plugin-transform-runtime
  runtimeHelpers: true,
  configFile: '../../.babelrc.js',
}
const commonjsOptions = {
  ignoreGlobal: true,
  include: 'node_modules/**', // Default: undefined
  exclude: [
    '../../node_modules/gatsby/cache-dir/gatsby-browser-entry',
    '../../node_modules/prism-themes/*.css',
  ],
}

export default [
  {
    input,
    output: {
      file: `build/umd/${name}.development.js`,
      format: 'umd',
      name,
      globals,
    },
    external: Object.keys(globals),
    plugins: [
      nodeResolve(),
      babel(babelOptions),
      commonjs(commonjsOptions),
      nodeGlobals(),
      replace({ 'process.env.NODE_ENV': JSON.stringify('development') }),
    ],
  },
  {
    input,
    output: {
      file: `build/umd/${name}.production.min.js`,
      format: 'umd',
      name,
      globals,
    },
    external: Object.keys(globals),
    plugins: [
      nodeResolve(),
      babel(babelOptions),
      commonjs(commonjsOptions),
      nodeGlobals(),
      replace({ 'process.env.NODE_ENV': JSON.stringify('production') }),
      sizeSnapshot(),
      uglify(),
    ],
  },
]
