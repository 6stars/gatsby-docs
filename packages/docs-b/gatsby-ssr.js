import React from 'react'
import {
  light,
  withRoot,
  createPageContext,
  initRedux,
} from '@m00n/gatsby-docs-ui'

const sheetsRegistryMap = new Map()

export const wrapRootElement = ({ element, pathname }) => {
  // create material Page Context
  let muiPageContext = createPageContext()

  // initial setup for Redux Store
  let store = initRedux({ theme: light })

  // withRoot returns Functional Component that raps children passed as props
  let WithRoot = withRoot(props => props.children)

  // add pathname, sheetRegistry mapping to sheetsRegistryMap
  sheetsRegistryMap.set(pathname, muiPageContext.sheetsRegistry)

  // return WithRoot component wrapping Root Element with muiPageContext and redux store as props
  return (
    <WithRoot key={Math.random()} muiPageContext={muiPageContext} store={store}>
      {element}
    </WithRoot>
  )
}

export const onRenderBody = ({ setHeadComponents, pathname }) => {
  // get sheetsRegistry value from sheetRegistryMap for key=pathname set in wrapRootElement
  const sheetsRegistry = sheetsRegistryMap.get(pathname)

  if (sheetsRegistry) {
    // set css string with toString() of sheetRegistry for pathname
    const css = sheetsRegistry.toString()

    // call setHeaderComponents() with css String for pathname as the innerHTML
    // also add Material Icons, DocSearch css dependencies
    //
    setHeadComponents([
      <style
        type="text/css"
        id="server-side-jss"
        key="server-side-jss"
        dangerouslySetInnerHTML={{ __html: css }}
      />,
      <link src="https://fonts.googleapis.com/icon?family=Material+Icons" />,
      <link src="https://cdn.jsdelivr.net/docsearch.js/2/docsearch.min.css" />,
    ])

    // delate pathname from sheetRegistryMap, we already processed it be rendered in page for pathname
    sheetsRegistryMap.delete(pathname)
  }
}
