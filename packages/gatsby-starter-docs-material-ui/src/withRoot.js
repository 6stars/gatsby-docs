import React from 'react';
import PropTypes from 'prop-types';
import AppWrapper from './layout/AppWrapper';
import { Provider } from 'react-redux';

const withRoot = (Component) => {
  class WithRoot extends React.Component {

    componentDidMount() {
      //Remove the server-side injected CSS.
      const jssStyles = document.querySelector('#server-side-jss');
      if (jssStyles && jssStyles.parentNode) {
         jssStyles.parentNode.removeChild(jssStyles);
      }
    }

    render( ) {
      const { store } = this.props;
      // MuiThemeProvider makes the theme available down the React tree thanks to React context.
      console.log("withRoot:");
      console.log(this.props);
      return (
        <Provider store={store}>
          <AppWrapper {...this.props}>
            <Component {...this.props} />
          </AppWrapper>
        </Provider>
      );
    }
  }

  WithRoot.propTypes = {
    muiPageContext: PropTypes.object
  };


  return WithRoot;
}

export default withRoot;