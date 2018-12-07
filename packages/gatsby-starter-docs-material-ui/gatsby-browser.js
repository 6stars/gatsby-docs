import React from 'react';
import withRoot from './src/withRoot';
import createPageContext from './src/getPageContext';
import initRedux from './src/redux/initRedux';

const sheetsRegistryMap = new Map();

export const wrapRootElement = ({ element, pathname }) => {
  
  let muiPageContext = createPageContext();
  
  const store = initRedux( { paletteType: 'light' } );
 
  let WithRoot = withRoot(props => { 
    return props.children;
  });
  console.log(pathname);
  sheetsRegistryMap.set(pathname, muiPageContext.sheetsRegistry);
  
  return (
    <WithRoot key={Math.random()} muiPageContext={muiPageContext} store={store}>{element}</WithRoot>
  );
};