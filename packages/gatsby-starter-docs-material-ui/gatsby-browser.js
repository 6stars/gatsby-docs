import React from 'react';
import withRoot from './src/withRoot';
import getPageContext from './src/getPageContext';
import initRedux from './src/redux/initRedux';
import light from './src/styles/light';

const sheetsRegistryMap = new Map();

export const wrapRootElement = ({ element, pathname }) => {
  
  let muiPageContext = getPageContext();
  let store = initRedux( { theme: light } );
 
  let WithRoot = withRoot(props => { 
    return props.children;
  });
  
  sheetsRegistryMap.set(pathname, muiPageContext.sheetsRegistry);
  
  return (
    <WithRoot key={Math.random()} muiPageContext={muiPageContext} store={store}>{element}</WithRoot>
  );
};