/* eslint-disable no-underscore-dangle */

import { create, SheetsRegistry } from 'jss';
import rtl from 'jss-rtl';
import { createMuiTheme, createGenerateClassName, jssPreset } from '@material-ui/core/styles';
import light from './styles/light';

function getTheme(uiTheme) {
  
  let themeOptions = {
    typography: {
      useNextVariants: true,
    },
    direction: uiTheme.direction,
    nprogress: {
      color: uiTheme.paletteType === 'light' ? '#000' : '#fff',
    },
    palette: { ...uiTheme.paletteColors, type: uiTheme.paletteType },
  }
  
  // set paper color based on paletteType
  themeOptions.palette.background = uiTheme.paletteType === 'dark' ? {
    paper: "#1c2022",
    default: "#000"
  } :  {
    paper: themeOptions.palette.main,
    default: "#fff"
  };

  const theme = createMuiTheme(themeOptions);

  // Expose the theme as a global variable so people can play with it.
  if (process.browser && window) {
    window.theme = theme;
  }

  return theme;
}

const theme = getTheme(light);

// Configure JSS
const jss = create({
  insertionPoint: 'insertion-point-jss',
  plugins: [...jssPreset().plugins, rtl()],
});

function createPageContext() {
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
  // console.log("UpdatePageContext():")
  console.log(uiTheme)
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
