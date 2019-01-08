import React from 'react';
import withRoot from '../../src/withRoot';
import createPageContext from '../../src/getPageContext';
import initRedux from '../../src/redux/initRedux';
import light from '../../src/styles/light';
import DocPreview from './DocPreview';

// create material Page Context
let muiPageContext = createPageContext();

// initial setup for Redux Store
let store = initRedux( { theme: light } );

// withRoot returns Functional Component that raps children passed as props
let WithRoot = withRoot(props => props.children);

const DocPreviewTemplate = () => {
    // return WithRoot component wrapping Root Element with muiPageContext and redux store as props
    return (
        <WithRoot key={Math.random()} muiPageContext={muiPageContext} store={store}>{DocPreview}</WithRoot>
    );
}

export default DocPreviewTemplate;
  
