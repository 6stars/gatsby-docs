import React from "react"
import PropTypes from "prop-types"

// You can find a benchmark of the available CSS minifiers under
// https://github.com/GoalSmashers/css-minification-benchmark
// We have found that clean-css is faster than cssnano but the output is larger.
// Waiting for https://github.com/cssinjs/jss/issues/279
// 4% slower but 12% smaller output than doing it in a single step.
//
// It's using .browserslistrc
let prefixer;
let cleanCSS;
if (process.env.NODE_ENV === 'production') {
  const postcss = require('postcss');
  const autoprefixer = require('autoprefixer');
  const CleanCSS = require('clean-css');

  prefixer = postcss([autoprefixer]);
  cleanCSS = new CleanCSS();
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
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
          />
          <link rel="apple-ios-appicon" href="ios-appicon-iphone.png"></link>
          <link rel="apple-ios-appicon" sizes="152x152" href="ios/ios-appicon-ipad.png">
          <link rel="apple-ios-appicon" sizes="180x180" href="ios/ios-appicon-iphone-retina.png">
          <link rel="apple-ios-appicon" sizes="167x167" href="ios/ios-appicon-ipad-retina.png">
          <!-- iPhone Xs Max (1242px x 2688px) --> 
          <link rel="apple-touch-startup-image" media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3)" href="ios/ios-launchimage-1242x2688.png">
          <!-- iPhone Xr (828px x 1792px) --> 
          <link rel="apple-touch-startup-image" media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)" href="ios/ios-launchimage-828x1792.png">
          <!-- iPhone X, Xs (1125px x 2436px) --> 
          <link rel="apple-touch-startup-image" media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)" href="ios/ios-launchimage-1125x2436.png">
          <!-- iPhone 8 Plus, 7 Plus, 6s Plus, 6 Plus (1242px x 2208px) --> 
          <link rel="apple-touch-startup-image" media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3)" href="ios/ios-launchimage-1242x2208.png">
          <!-- iPhone 8, 7, 6s, 6 (750px x 1334px) --> 
          <link rel="apple-touch-startup-image" media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)" href="ios/ios-launchimage-750x1334.png">
          <!-- iPad Pro 12.9" (2048px x 2732px) --> 
          <link rel="apple-touch-startup-image" media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)" href="ios/ios-launchimage-2048x2732.png">
          <!-- iPad Pro 11” (1668px x 2388px) --> 
          <link rel="apple-touch-startup-image" media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2)" href="ios/ios-launchimage-1668x2388.png">
          <!-- iPad Pro 10.5" (1668px x 2224px) --> 
          <link rel="apple-touch-startup-image" media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2)" href="ios/ios-launchimage-1668x2224.png">
          <!-- iPad Mini, Air (1536px x 2048px) --> 
          <link rel="apple-touch-startup-image" media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2)" href="ios/ios-launchimage-1536x2048.png">       
          {/*
            Preconnect allows the browser to setup early connections before an HTTP request
            is actually sent to the server.
            This includes DNS lookups, TLS negotiations, TCP handshakes.
          */}
          <link href="https://fonts.gstatic.com" rel="preconnect" crossOrigin="anonymous" />          
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
          <script async src="https://cdn.jsdelivr.net/docsearch.js/2/docsearch.min.js" />
          <script type="text/javascript" src="https://cdn.jsdelivr.net/algoliasearch/3.10.2/algoliasearch.min.js"></script> 
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
