import React from 'react';
import {renderToString} from 'react-dom/server'
import PropTypes from 'prop-types';
import createPageContext from '../../getPageContext';
import initRedux from '../../redux/initRedux';
import light from '../../styles/light';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import JssProvider from 'react-jss/lib/JssProvider';
import DocPreview from './DocPreview';
import CSSInjector from './CssInjector';

let muiPageContext = createPageContext();

const DocPreviewTemplate = ({ entry }) => {
      const body = renderToString(
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
      )

      const css = muiPageContext.sheetsRegistry.toString();
      console.log(css);
      return (

        <CSSInjector css={css}>
          <DocPreview content={entry.getIn(["data", "body"])}
              tags={entry.getIn(['data', 'tags'])}
              title={entry.getIn(['data', 'title'])}
              rawDate={entry.getIn(['data', 'date'])}
              category={entry.getIn(['data', 'category'])}
          />
        </CSSInjector>
        // <JssProvider
        //     jss={muiPageContext.jss}
        //     registry={muiPageContext.sheetsRegistry}
        //     generateClassName={muiPageContext.generateClassName}
        //     >      
        //     <MuiThemeProvider theme={muiPageContext.theme} sheetsManager={muiPageContext.sheetsManager}>
        //     <CssBaseline />          
            
        //     </MuiThemeProvider>
        // </JssProvider>
    );
  }

  DocPreviewTemplate.propTypes = {
    entry: PropTypes.shape({
      getIn: PropTypes.func,
    }),
    widgetFor: PropTypes.func,
  }
   

export default DocPreviewTemplate;