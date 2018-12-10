/* eslint-disable no-underscore-dangle */

import { create, SheetsRegistry } from 'jss';
import rtl from 'jss-rtl';
import { createGenerateClassName, jssPreset } from '@material-ui/core/styles';
import light from './styles/light';
import getTheme from './styles/getTheme';

let defaultTheme = getTheme(light);
// Configure JSS
const jss = create({  
  plugins: [...jssPreset().plugins, rtl()],
});


export function createPageContext() {

  return {
    jss,
    theme: defaultTheme,
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
  //console.log("updatePageContext:");
  //console.log(uiTheme);
  
  const pageContext = {
    ...global.__MUI_PAGE_CONTEXT__,
    theme: getTheme(uiTheme),
  };
  global.__MUI_PAGE_CONTEXT__ = pageContext;
  //console.log(global.__MUI_PAGE_CONTEXT__);
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
  //console.log(global.__MUI_PAGE_CONTEXT__);
  return global.__MUI_PAGE_CONTEXT__;
}
