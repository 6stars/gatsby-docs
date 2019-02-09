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

  // initial setup for Redux Store with light theme Color Scheme set as default
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
