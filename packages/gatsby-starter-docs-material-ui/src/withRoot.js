import React from 'react';
import PropTypes from 'prop-types';
import initRedux from './redux/initRedux';
import AppWrapper from './layout/AppWrapper';
import { Provider } from 'react-redux';
import light from './styles/light';
import { loadCSS } from 'fg-loadcss/src/loadCSS';

if (process.browser) {
  loadCSS(
    'https://fonts.googleapis.com/icon?family=Material+Icons',
    document.querySelector('#insertion-point-jss'),
  );
  loadCSS(
    'https://cdn.jsdelivr.net/docsearch.js/2/docsearch.min.css',
    document.querySelector('#insertion-point-jss'),
  );
}

const withRoot = (Component) => {
  class WithRoot extends React.Component {
    redux = null;

    constructor(props) {
      super();  
      this.redux = initRedux(props.reduxServerState || {});
    }
    

    componentDidMount() {
      //Remove the server-side injected CSS.
      const jssStyles = document.querySelector('#server-side-jss');
      if (jssStyles && jssStyles.parentNode) {
         jssStyles.parentNode.removeChild(jssStyles);
      }
    }

    render( ) {
      // console.log("ROOT:")
      // console.log(this.props)
      const { pageContext, muiPageContext } = this.props;
      // MuiThemeProvider makes the theme available down the React tree thanks to React context.
      return (
        <Provider store={this.redux}>
          <AppWrapper muiPageContext={muiPageContext} pageContext={pageContext}>
            <Component {...this.props} />
          </AppWrapper>
        </Provider>
      );
    }
  }

  WithRoot.propTypes = {
    muiPageContext: PropTypes.object
  };

  WithRoot.getInitialProps = ctx => {
    let initialProps = {};


const redux = initRedux({theme: light});

    if (Component.getInitialProps) {
      const componentInitialProps = Component.getInitialProps({ ...ctx, redux });
      initialProps = {
        ...componentInitialProps,
        ...initialProps,
      };
    }

    if (process.browser) {
      return initialProps;
    }

    return {
      ...initialProps,
      // No need to include other initial Redux state because when it
      // initialises on the client-side it'll create it again anyway
      reduxServerState: redux.getState(),
      // // Styles fragment is rendered after the app and page rendering finish.
      // styles: (
      //   <React.Fragment>
      //     <style
      //       id="server-side-jss"
      //       // eslint-disable-next-line react/no-danger
      //       dangerouslySetInnerHTML={{ __html: this.props.pageContext.sheetsRegistry.toString() }}
      //     />
      //   </React.Fragment>
      // ),
    };
  };


  return WithRoot;
}

export default withRoot;