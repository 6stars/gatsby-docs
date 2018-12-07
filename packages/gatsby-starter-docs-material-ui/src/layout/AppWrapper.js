/* eslint-disable no-underscore-dangle */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import JssProvider from 'react-jss/lib/JssProvider';
import { lightTheme, darkTheme, setPrismTheme } from '../styles/prism';


// Inject the insertion-point-jss after docssearch
if (process.browser && !global.__INSERTION_POINT__) {
  global.__INSERTION_POINT__ = true;
  const styleNode = document.createComment('insertion-point-jss');
  const docsearchStylesSheet = document.querySelector('#insertion-point-jss');

  if (document.head && docsearchStylesSheet) {
    document.head.insertBefore(styleNode, docsearchStylesSheet.nextSibling);
  }
}

function uiThemeSideEffect(uiTheme) {
  setPrismTheme(uiTheme.paletteType === 'light' ? lightTheme : darkTheme);  
}

class AppWrapper extends React.Component {
  state = {};

  constructor(props) {
    super();  
  }

  componentDidMount() {
    uiThemeSideEffect(this.props.uiTheme);
  }

  componentDidUpdate() {
    uiThemeSideEffect(this.props.uiTheme);
  }

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   //console.log("nextprops:"); 
  //   // console.log(nextProps);
  //   if (typeof prevState.muiPageContext === 'undefined') {
  //     return {
  //       prevProps: nextProps,
  //       muiPageContext: getPageContext(),
  //     };
  //   }

  //   const { prevProps } = prevState;

  //   if (
  //     nextProps.uiTheme.paletteType !== prevProps.uiTheme.paletteType ||
  //     nextProps.uiTheme.paletteColors !== prevProps.uiTheme.paletteColors ||
  //     nextProps.uiTheme.direction !== prevProps.uiTheme.direction
  //   ) {
  //     return {
  //       prevProps: nextProps,
  //       muiPageContext: updatePageContext(nextProps.uiTheme),
  //     };
  //   }

  //   return null;
  // }

  render() {
    const { children, muiPageContext } = this.props;
    // console.log("APPWRAPPER:")
    // console.log(this.props);
    return (
      <JssProvider
        jss={muiPageContext.jss}
        registry={muiPageContext.sheetsRegistry}
        generateClassName={muiPageContext.generateClassName}
        >      
        <MuiThemeProvider theme={muiPageContext.theme} sheetsManager={muiPageContext.sheetsManager}>
          <CssBaseline />
          {children}
        </MuiThemeProvider>
      </JssProvider>
    );
  }
}

AppWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  muiPageContext: PropTypes.object,
  uiTheme: PropTypes.object.isRequired,
};

export default connect(state => ({
  uiTheme: state.theme,
}))(AppWrapper);
