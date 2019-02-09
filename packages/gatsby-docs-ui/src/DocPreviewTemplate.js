import React from 'react'
import PropTypes from 'prop-types'
import { createPageContext } from '@m00n/gatsby-docs-ui'
import { MuiThemeProvider, jssPreset } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import JssProvider from 'react-jss/lib/JssProvider'
import DocPreview from './DocPreview'
import { create } from 'jss'

const DocPreviewWithRoot = ({ entry, muiPageContext, jss }) => {
  const body = entry.getIn(['data', 'body'])
  const rawDate = entry.getIn(['data', 'date'])

  return (
    <JssProvider
      jss={jss}
      registry={muiPageContext.sheetsRegistry}
      generateClassName={muiPageContext.generateClassName}
    >
      <MuiThemeProvider
        theme={muiPageContext.theme}
        sheetsManager={muiPageContext.sheetsManager}
      >
        <CssBaseline />
        {body ? (
          <DocPreview
            content={body}
            tags={entry.getIn(['data', 'tags'])}
            title={entry.getIn(['data', 'title'])}
            slug={entry.getIn(['data', 'slug'])}
            rawDate={rawDate}
            category={entry.getIn(['data', 'category'])}
          />
        ) : (
          <div />
        )}
      </MuiThemeProvider>
    </JssProvider>
  )
}

const DocPreviewTemplate = ({ entry }) => {
  const jssInsertionPoint = 'jss-insertion-point'
  const iframe = document.getElementsByTagName('iframe')[0]
  const iframeHeadElem = iframe.contentDocument.head
  let noscriptElem = document.getElementById('jssInsertionPoint')

  if (!noscriptElem) {
    noscriptElem = document.createElement('noscript')
    noscriptElem.id = jssInsertionPoint
    iframeHeadElem.appendChild(noscriptElem)
  }

  let linkPrismThemeNode
  linkPrismThemeNode = document.createElement('link')
  linkPrismThemeNode.setAttribute('type', 'text/css')
  linkPrismThemeNode.setAttribute('rel', 'stylesheet')
  linkPrismThemeNode.setAttribute(
    'href',
    'https://unpkg.com/prism-themes@1.0.1/themes/prism-vs.css'
  )
  iframeHeadElem.appendChild(linkPrismThemeNode)

  const jss = create({
    ...jssPreset(),
    // We define a custom insertion point that JSS will look for injecting the styles in the DOM.
    insertionPoint: noscriptElem,
  })

  let muiPageContext = createPageContext(jss)

  return DocPreviewWithRoot({ entry, muiPageContext, jss })
}

DocPreviewTemplate.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default DocPreviewTemplate
