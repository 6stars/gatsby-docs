const config = require('./data/SiteConfig')
const iconsConfig = require('./static/icons.json')
const urljoin = require('url-join')

const regexExcludeRobots = /^(?!\/(dev-404-page|404|offline-plugin-app-shell-fallback|tags|categories)).*$/

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

const allDocsPageQuery = `{
  allMarkdownRemark(	
    limit: 5000	
    sort: { fields: [fields___date], order: DESC }	
  ) {	
    edges {	
      node {yar
        objectID: id          
        fields {
          route
          slug
          path
          date
        }	
        excerpt
        timeToRead
        frontmatter {	
          title	
          tags
          category
          date	
        }	
      }	
    }	
  }
}`

const queries = [
  {
    query: allDocsPageQuery,
    transformer: ({ data }) =>
      data.allMarkdownRemark.edges.map(({ node }) => node), // optional
    indexName: 'docs-', // overrides main index name, optional
  },
]

module.exports = {
  pathPrefix: config.pathPrefix,
  siteMetadata: {
    siteUrl: urljoin(config.siteUrl, config.pathPrefix),
    title: config.siteTitle,
  },
  plugins: [
    'gatsby-plugin-typescript',
    // {
    //   resolve: 'gatsby-plugin-module-resolver',
    //   options: {
    //     root: './', // <- will be used as a root dir
    //     alias: {
    //       '@m00n/gatsby-docs-ui': '../packages/gatsby-docs-ui/src',
    //       '@m00n/gatsby-plugin-nav-tree':
    //         '../packages/gatsby-plugin-nav-tree/src',
    //     },
    //   },
    // },
    {
      resolve: '@m00n/gatsby-plugin-nav-tree',
      options: {
        ignorePaths: [
          '/categories',
          '/tags',
          '/404',
          '/offline-plugin-app-shell-fallback',
          '/dev-404-page',
        ],
      },
    },
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-lodash',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'docs',
        path: `${__dirname}/content`,
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-sequence`,
            options: {
              theme: 'simple',
            },
          },
          {
            resolve: 'gatsby-remark-embed-youtube',
            options: {
              width: 1000,
              height: 400,
            },
          },
          {
            resolve: 'gatsby-remark-relative-images',
          },
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 672,
            },
          },
          {
            resolve: 'gatsby-remark-responsive-iframe',
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              // Class prefix for <pre> tags containing syntax highlighting;
              // defaults to 'language-' (eg <pre class="language-js">).
              // If your site loads Prism into the browser at runtime,
              // (eg for use with libraries like react-live),
              // you may use this to prevent Prism from re-processing syntax.
              // This is an uncommon use-case though;
              // If you're unsure, it's best to use the default value.
              classPrefix: 'language-',
              // This is used to allow setting a language for inline code
              // (i.e. single backticks) by creating a separator.
              // This separator is a string and will do no white-space
              // stripping.
              // A suggested value for English speakers is the non-ascii
              // character '›'.
              inlineCodeMarker: null,
              // This lets you set up language aliases.  For example,
              // setting this to '{ sh: "bash" }' will let you use
              // the language "sh" which will highlight using the
              // bash highlighter.
              aliases: {},
              // This toggles the display of line numbers globally alongside the code.
              // To use it, add the following line in src/layouts/index.js
              // right after importing the prism color scheme:
              //  `require("prismjs/plugins/line-numbers/prism-line-numbers.css");`
              // Defaults to false.
              // If you wish to only show line numbers on certain code blocks,
              // leave false and use the {numberLines: true} syntax below
              showLineNumbers: false,
              // If setting this to true, the parser won't handle and highlight inline
              // code used in markdown i.e. single backtick code like `this`.
              noInlineHighlight: false,
            },
          },
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-autolink-headers',
        ],
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: config.siteTitle,
        short_name: config.siteTitleShort,
        description: config.siteDescription,
        start_url: config.pathPrefix,
        background_color: '#334058',
        theme_color: '#6ec5ff',
        display: 'standalone',
        icons: iconsConfig.icons,
      },
    },
    'gatsby-plugin-offline',
    {
      resolve: 'gatsby-plugin-netlify-cms',
      options: {
        modulePath: `${__dirname}/src/cms/cms.js`,
      },
    },
    // {
    //   resolve: `gatsby-plugin-netlify`,
    //   options: {
    //     headers: {}, // option to add more headers. `Link` headers are transformed by the below criteria
    //     allPageHeaders: [], // option to add headers for all pages. `Link` headers are transformed by the below criteria
    //     mergeSecurityHeaders: true, // boolean to turn off the default security headers
    //     mergeLinkHeaders: true, // boolean to turn off the default gatsby js headers
    //     mergeCachingHeaders: true, // boolean to turn off the default caching headers
    //     transformHeaders: (headers, path) => headers, // optional transform for manipulating headers under each path (e.g.sorting), etc.
    //     generateMatchPathRewrites: false, // boolean to turn off automatic creation of redirect rules for client only paths
    //   },
    // },
    // make sure to put last in the array
  ],
}
