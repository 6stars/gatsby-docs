import React from 'react';
import PropTypes from 'prop-types';
import createPageContext from '../../getPageContext';
import initRedux from '../../redux/initRedux';
import light from '../../styles/light';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import JssProvider from 'react-jss/lib/JssProvider';
import DocPreview from './DocPreview';
// create material Page Context
let muiPageContext = createPageContext();

const DocPreviewTemplate = ({ entry }) => {
      return (
        <JssProvider
            jss={muiPageContext.jss}
            registry={muiPageContext.sheetsRegistry}
            generateClassName={muiPageContext.generateClassName}
            >      
            <MuiThemeProvider theme={muiPageContext.theme} sheetsManager={muiPageContext.sheetsManager}>
            <CssBaseline />          
            <DocPreview content={entry.getIn(["data", "body"])}
                tags={entry.getIn(['data', 'tags'])}
                title={entry.getIn(['data', 'title'])}
                rawDate={entry.getIn(['data', 'date'])}
                category={entry.getIn(['data', 'category'])}
            />
            </MuiThemeProvider>
        </JssProvider>
    );
  }

  DocPreviewTemplate.propTypes = {
    entry: PropTypes.shape({
      getIn: PropTypes.func,
    }),
    widgetFor: PropTypes.func,
  }
   

export default DocPreviewTemplate;