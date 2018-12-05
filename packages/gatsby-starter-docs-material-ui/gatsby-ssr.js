/* eslint-disable react/no-danger */
import React from 'react';
import { Provider } from "react-redux"
import initRedux from './src/redux/initRedux';
import light from './src/styles/light';
import getPageContext from './src/getPageContext';
import { renderToString } from 'react-dom/server';
import JssProvider from 'react-jss/lib/JssProvider';
import AppWrapper from './src/layout/AppWrapper';

// exports.wrapRootElement = ({ element }) => {
//   return <WithRoot>{element}</WithRoot>;
// };

const store = initRedux({theme: light});

const sheetsRegistryMap = new Map();

// export const wrapRootElement = ({ element, pathname }, { theme = {} }) => {

//   const muiPageContext = getPageContext.default ? getPageContext.default() : getPageContext();

//   console.log(1);
//   console.log(theme);
  
//     return (
//       <Provider store={store}>
//         <AppWrapper muiPageContext={muiPageContext}>
//           {element}
//         </AppWrapper>
//       </Provider>
//     );
// }

export const replaceRenderer = ({ bodyComponent, replaceBodyHTMLString, setHeadComponents, ...other }) => {
  // Get the context of the page to collected side effects.
  console.log(2);
  
  const muiPageContext = getPageContext();

  const bodyHTML = renderToString(
    <Provider store={store}>
      <AppWrapper muiPageContext={muiPageContext}>
        {bodyComponent}
      </AppWrapper>
    </Provider>
  );
  sheetsRegistryMap.set(other.pathname, muiPageContext.sheetsRegistry);
  console.log(muiPageContext.sheetsRegistry.toString())
  replaceBodyHTMLString(bodyHTML);
  setHeadComponents([
    <style
      type="text/css"
      id="server-side-jss"
      key="server-side-jss"
      dangerouslySetInnerHTML={{ __html: muiPageContext.sheetsRegistry.toString() }}
    />,
  ]);  
}

// export const onRenderBody = ({ setHeadComponents, pathname }) => {
//     const sheets = sheetsRegistryMap.get(pathname)
//     console.log(3);
//     console.log(pathname);
//     console.log(sheets);
//     if (sheets) {
//     //   setHeadComponents([
//     //     <style
//     //       type="text/css"
//     //       id="server-side-jss"
//     //       key="server-side-jss"
//     //       dangerouslySetInnerHTML={{ __html: sheets.toString() }}
//     //     />,
//     //   ])
//       sheetsRegistryMap.delete(pathname)
//     }
// }