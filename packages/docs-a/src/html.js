import React from 'react'
import PropTypes from 'prop-types'

// You can find a benchmark of the available CSS minifiers under
// https://github.com/GoalSmashers/css-minification-benchmark
// We have found that clean-css is faster than cssnano but the output is larger.
// Waiting for https://github.com/cssinjs/jss/issues/279
// 4% slower but 12% smaller output than doing it in a single step.
//
// It's using .browserslistrc
let prefixer
let cleanCSS
if (process.env.NODE_ENV === 'production') {
  const postcss = require('postcss')
  const autoprefixer = require('autoprefixer')
  const CleanCSS = require('clean-css')

  prefixer = postcss([autoprefixer])
  cleanCSS = new CleanCSS()
}

export default class HTML extends React.Component {
  render() {
    return (
      <html {...this.props.htmlAttributes}>
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
          />
          <link rel="apple-ios-appicon" href="/ios/ios-appicon-76-76.png" />
          <link rel="apple-touch-icon" href="/ios/ios-appicon-76-76.png" />
          <link
            rel="apple-ios-appicon"
            sizes="152x152"
            href="/ios/ios-appicon-152-152.png"
          />
          <link
            rel="apple-ios-appicon"
            sizes="180x180"
            href="/ios/ios-appicon-180-180.png"
          />
          <link
            rel="apple-ios-appicon"
            sizes="167x167"
            href="/ios/ios-launchimage-167-167.png"
          />
          <link
            rel="apple-touch-startup-image"
            media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3)"
            href="/ios/ios-launchimage-1242-2208.png"
          />
          <link
            rel="apple-touch-startup-image"
            media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)"
            href="/ios/ios-launchimage-750-1334.png"
          />
          <link
            rel="apple-touch-startup-image"
            media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)"
            href="/ios/ios-launchimage-1242-2208.png"
          />
          <link
            rel="apple-touch-startup-image"
            media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3)"
            href="/ios/ios-launchimage-1242-2208.png"
          />
          <link
            rel="apple-touch-startup-image"
            media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)"
            href="/ios/ios-launchimage-750-1334.png"
          />
          <link
            rel="apple-touch-startup-image"
            media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)"
            href="/ios/ios-launchimage-2048-1536.png"
          />
          <link
            rel="apple-touch-startup-image"
            media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2)"
            href="/ios/ios-launchimage-1536-2048.png"
          />
          {/*
            Preconnect allows the browser to setup early connections before an HTTP request
            is actually sent to the server.
            This includes DNS lookups, TLS negotiations, TCP handshakes.
          */}
          <link
            href="https://fonts.gstatic.com"
            rel="preconnect"
            crossOrigin="anonymous"
          />
          {this.props.headComponents}
        </head>
        <body {...this.props.bodyAttributes}>
          {this.props.preBodyComponents}
          <div
            key={`body`}
            id="___gatsby"
            dangerouslySetInnerHTML={{ __html: this.props.body }}
          />
          {this.props.postBodyComponents}
          <script
            async
            src="https://cdn.jsdelivr.net/docsearch.js/2/docsearch.min.js"
          />
          <script
            type="text/javascript"
            src="https://cdn.jsdelivr.net/algoliasearch/3.10.2/algoliasearch.min.js"
          />
          <noscript>
            <div>
              <p>Please enable javascript to access ****** DOCS</p>
            </div>
          </noscript>
        </body>
      </html>
    )
  }
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
}
