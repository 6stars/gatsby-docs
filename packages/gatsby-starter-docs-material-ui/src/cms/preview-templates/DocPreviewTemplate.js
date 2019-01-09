import React from 'react';
import withRoot from '../../withRoot';
import createPageContext from '../../getPageContext';
import initRedux from '../../redux/initRedux';
import light from '../../styles/light';
import DocPreview from './DocPreview';

// create material Page Context
let muiPageContext = createPageContext();

// initial setup for Redux Store
let store = initRedux( { theme: light } );

// withRoot returns Functional Component that raps children passed as props
let WithRoot = withRoot(props => props.children);

const DocPreviewTemplate = ({ entry, widgetFor }) => {
    return (
        <WithRoot key={Math.random()} muiPageContext={muiPageContext} store={store}>
            <DocPreview
                content={widgetFor('body')}
                tags={entry.getIn(['data', 'tags'])}
                title={entry.getIn(['data', 'title'])}
                date={entry.getIn(['data', 'date'])}
                category={entry.getIn(['data', 'category'])}
            />
        </WithRoot>
    );
  }

  DocPreviewTemplate.propTypes = {
    entry: PropTypes.shape({
      getIn: PropTypes.func,
    }),
    widgetFor: PropTypes.func,
  }
   

export default DocPreviewTemplate;