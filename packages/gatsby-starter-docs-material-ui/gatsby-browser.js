import React from 'react';
import withRoot from './src/withRoot';

// Remove the server-side injected CSS.
export const onInitialClientRender = () => {
  const ssStyles = window.document.getElementById('server-side-jss');
  ssStyles && ssStyles.parentNode.removeChild(ssStyles);
};

const WithRoot = withRoot(props => props.children);

export const wrapRootElement = ({ element }) => {
  return <WithRoot key={Math.random()}>{element}</WithRoot>;
};