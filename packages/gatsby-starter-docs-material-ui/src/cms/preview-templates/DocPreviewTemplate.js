import React from 'react';
import {renderToString} from 'react-dom/server'
import PropTypes from 'prop-types';
import createPageContext from '../../getPageContext';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import JssProvider from 'react-jss/lib/JssProvider';
import DocPreview from './DocPreview';
import prism from 'prismjs';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-diff';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-typescript';
import lightTheme from 'prism-themes/themes/prism-vs.css';

let styleNode;

styleNode = document.createElement('style');
styleNode.setAttribute('data-prism', 'true');
styleNode.textContent = lightTheme;

let muiPageContext = createPageContext();

const DocPreviewTemplate = ({ entry }) => {
      renderToString(
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

      const css = `<style>${muiPageContext.sheetsRegistry.toString()}</style>`;

      const iframe = document.getElementsByTagName('iframe')[0]
      const iframeHeadElem = iframe.contentDocument.head;
      iframeHeadElem.innerHTML += css;
      iframeHeadElem.appendChild(styleNode);
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