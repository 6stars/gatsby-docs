/* eslint-disable no-underscore-dangle */

import { create, SheetsRegistry } from 'jss';
import rtl from 'jss-rtl';
import { createGenerateClassName, jssPreset } from '@material-ui/core/styles';
import light from './styles/light';
import getTheme from './styles/getTheme';

const theme = getTheme(light);

// Configure JSS
const jss = create({
  insertionPoint: 'insertion-point-jss',
  plugins: [...jssPreset().plugins, rtl()],
});

export function createPageContext() {
  //console.log("createPageContext():")
  return {
    jss,
    theme,
    // This is needed in order to deduplicate the injection of CSS in the page.
    sheetsManager: new Map(),
    // This is needed in order to inject the critical CSS.
    sheetsRegistry: new SheetsRegistry(),
    generateClassName: createGenerateClassName({
      productionPrefix: 'j', // Reduce the bandwidth usage.
    }),
  };
}

export function updatePageContext(uiTheme) {
  console.log("UpdatePageContext():")
  
  const pageContext = {
    ...global.__MUI_PAGE_CONTEXT__,
    theme: getTheme(uiTheme),
  };
  global.__MUI_PAGE_CONTEXT__ = pageContext;

  return pageContext;
}

export default function getPageContext() {
  // Make sure to create a new store for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return createPageContext();
  }

  // Reuse context on the client-side
  if (!global.__MUI_PAGE_CONTEXT__) {
    global.__MUI_PAGE_CONTEXT__ = createPageContext();
  }

  return global.__MUI_PAGE_CONTEXT__;
}
