import React from 'react';
import withRoot from '../../withRoot';
import getPageContext from '../../getPageContext';
import initRedux from '../../redux/initRedux';
import light from '../../styles/light';

// create material Page Context
let muiPageContext = getPageContext();

  // initial setup for Redux Store with light theme Color Scheme set as default
let store = initRedux( { theme: light } );

// withRoot returns Functional Component that raps children passed as props
let WithRoot = withRoot(props => props.children);
  

const DocPreviewTemplate = ({ entry }) => {
      renderToString(
        <WithRoot key={Math.random()} muiPageContext={muiPageContext} store={store}>
          <DocPreview content={entry.getIn(["data", "body"])}
            tags={entry.getIn(['data', 'tags'])}
            title={entry.getIn(['data', 'title'])}
            rawDate={entry.getIn(['data', 'date'])}
            category={entry.getIn(['data', 'category'])}
          />
        </WithRoot>
        // <JssProvider
        //     jss={muiPageContext.jss}
        //     registry={muiPageContext.sheetsRegistry}
        //     generateClassName={muiPageContext.generateClassName}
        //     >      
        //     <MuiThemeProvider theme={muiPageContext.theme} sheetsManager={muiPageContext.sheetsManager}>
        //     <CssBaseline />          
            
        //     </MuiThemeProvider>
        // </JssProvider>
      )

      const css = `<style>${muiPageContext.sheetsRegistry.toString()}</style>`;

      const iframe = document.getElementsByTagName('iframe')[0]
      const iframeHeadElem = iframe.contentDocument.head;
      //console.log(iframeHeadElem.innerHTML);
      iframeHeadElem.innerHTML += css;
      return (
        <WithRoot key={Math.random()} muiPageContext={muiPageContext} store={store}>
          <DocPreview content={entry.getIn(["data", "body"])}
            tags={entry.getIn(['data', 'tags'])}
            title={entry.getIn(['data', 'title'])}
            rawDate={entry.getIn(['data', 'date'])}
            category={entry.getIn(['data', 'category'])}
          />
        </WithRoot>
        // <JssProvider
        //     jss={muiPageContext.jss}
        //     registry={muiPageContext.sheetsRegistry}
        //     generateClassName={muiPageContext.generateClassName}
        //     >      
        //     <MuiThemeProvider theme={muiPageContext.theme} sheetsManager={muiPageContext.sheetsManager}>
        //     <CssBaseline />          
        //     <DocPreview content={entry.getIn(["data", "body"])}
        //         tags={entry.getIn(['data', 'tags'])}
        //         title={entry.getIn(['data', 'title'])}
        //         rawDate={entry.getIn(['data', 'date'])}
        //         category={entry.getIn(['data', 'category'])}
        //     />
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