import React from 'react';
import withRoot from '../../src/withRoot';
import createPageContext from '../../src/getPageContext';
import initRedux from '../../src/redux/initRedux';
import light from '../../src/styles/light';
import DocPreview from './DocPreview';
import CSSInjector from './CSSInjector';

// create material Page Context
let muiPageContext = createPageContext();

// initial setup for Redux Store
let store = initRedux( { theme: light } );

// withRoot returns Functional Component that raps children passed as props
let WithRoot = withRoot(props => props.children);

const css = muiPageContext.sheetsRegistry.toString();

const DocPreviewTemplate = (props) => {
    // return WithRoot component wrapping Root Element with muiPageContext and redux store as props
    return (
        <CSSInjector css={css}>
            <DocPreview {...props} />
        </CSSInjector>
       
    );
}

export default DocPreviewTemplate;
  
