let defaultPresets

// We release a ES version of Material-UI.
// It's something that matches the latest official supported features of JavaScript.
// Nothing more (stage-1, etc), nothing less (require, etc).
if (process.env.BABEL_ENV === 'es') {
  defaultPresets = []
} else {
  defaultPresets = [
    [
      '@babel/preset-env',
      {
        targets: {
          ie: 11,
          edge: 14,
          firefox: 52,
          chrome: 49,
          safari: 10,
          node: '6.11',
        },
        modules: ['production-umd'].includes(process.env.BABEL_ENV)
          ? false
          : 'commonjs',
      },
    ],
  ]
}

module.exports = {
  presets: defaultPresets.concat(['@babel/preset-react']),
  plugins: [
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    [
      '@babel/plugin-proposal-object-rest-spread',
      {
        // Workaround for https://github.com/babel/babel/issues/8323
        loose: process.env.BABEL_ENV !== 'es',
      },
    ],
    '@babel/plugin-transform-object-assign',
    '@babel/plugin-transform-runtime',
  ],
  env: {
    development: {
      plugins: [
        [
          'babel-plugin-module-resolver',
          {
            alias: {
              '@m00n/gatsby-docs-ui': './packages/gatsby-docs-ui/src',
              '@m00n/gatsby-plugin-nav-tree':
                './packages/gatsby-plugin-nav-tree/src',
            },
          },
        ],
      ],
    },
    es: {
      plugins: [
        'transform-react-constant-elements',
        'transform-dev-warning',
        ['react-remove-properties', { properties: ['data-6star-test'] }],
        [
          'transform-react-remove-prop-types',
          {
            mode: 'wrap',
          },
        ],
      ],
      // It's most likely a babel bug.
      // We are using this ignore option in the CLI command but that has no effect.
      ignore: ['**/*.test.js'],
    },
    production: {
      plugins: [
        'transform-react-constant-elements',
        'transform-dev-warning',
        [
          'babel-plugin-module-resolver',
          {
            alias: {
              '@m00n/gatsby-docs-ui': './packages/gatsby-docs-ui/src',
              '@m00n/gatsby-plugin-nav-tree':
                './packages/gatsby-plugin-nav-tree/src',
            },
          },
        ],
        ['react-remove-properties', { properties: ['data-6star-test'] }],
        [
          'transform-react-remove-prop-types',
          {
            mode: 'wrap',
          },
        ],
      ],
      // It's most likely a babel bug.
      // We are using this ignore option in the CLI command but that has no effect.
      ignore: ['**/*.test.js'],
    },
    'production-umd': {
      plugins: [
        'transform-react-constant-elements',
        'transform-dev-warning',
        ['react-remove-properties', { properties: ['data-6star-test'] }],
        [
          'transform-react-remove-prop-types',
          {
            mode: 'wrap',
          },
        ],
      ],
    },
    test: {
      sourceMaps: 'both',
      plugins: [
        [
          'babel-plugin-module-resolver',
          {
            root: ['./'],
            alias: {
              '@m00n/gatsby-docs-ui': './packages/gatsby-docs-ui/src',
              '@m00n/gatsby-plugin-nav-tree':
                './packages/gatsby-plugin-nav-tree/src',
            },
          },
        ],
      ],
    },
  },
}
