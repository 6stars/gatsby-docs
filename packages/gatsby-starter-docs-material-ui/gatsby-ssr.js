import React from 'react';
import withRoot from './src/withRoot';
import createPageContext from './src/getPageContext';
import initRedux from './src/redux/initRedux';

const sheetsRegistryMap = new Map();

export const wrapRootElement = ({ element, pathname }) => {
  
  let muiPageContext = createPageContext();
  
  let store = initRedux( { paletteType: 'light' } );
 
  let WithRoot = withRoot(props => { 
    return props.children;
  });
  console.log(pathname);
  sheetsRegistryMap.set(pathname, muiPageContext.sheetsRegistry);
  
  return (
    <WithRoot key={Math.random()} muiPageContext={muiPageContext} store={store}>{element}</WithRoot>
  );
};

export const onRenderBody = ({ setHeadComponents, pathname }) => {
  const sheetsRegistry = sheetsRegistryMap.get(pathname);

  if (sheetsRegistry) {
    
    const css = sheetsRegistry.toString();    

    setHeadComponents([
      <style
        type="text/css"
        id="server-side-jss"
        key="server-side-jss"
        dangerouslySetInnerHTML={{ __html: css }}
      />,
      <link src="https://fonts.googleapis.com/icon?family=Material+Icons" />,
      <link src="https://cdn.jsdelivr.net/docsearch.js/2/docsearch.min.css" />
    ]);

    sheetsRegistryMap.delete(pathname);
  }
};