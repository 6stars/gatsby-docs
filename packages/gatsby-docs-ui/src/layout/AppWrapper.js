/* eslint-disable no-underscore-dangle */

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { MuiThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import JssProvider from 'react-jss/lib/JssProvider'
import { setPrismTheme } from '../styles/prism'
import { updatePageContext } from '../getPageContext'

function uiThemeSideEffect(uiTheme) {
  setPrismTheme(uiTheme.paletteType)
}

class AppWrapper extends React.Component {
  state = {}

  constructor() {
    super()
  }

  componentDidMount() {
    console.log(this.props.uiTheme)
    uiThemeSideEffect(this.props.uiTheme)
  }

  componentDidUpdate() {
    console.log(this.props.uiTheme)
    uiThemeSideEffect(this.props.uiTheme)
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (typeof prevState.muiPageContext === 'undefined') {
      return {
        prevProps: nextProps,
        muiPageContext: nextProps.muiPageContext,
      }
    }

    const { prevProps } = prevState

    if (nextProps.uiTheme.paletteType !== prevProps.uiTheme.paletteType) {
      return {
        prevProps: nextProps,
        muiPageContext: updatePageContext(nextProps.uiTheme),
      }
    }

    return null
  }

  render() {
    const { children } = this.props
    const { muiPageContext } = this.state

    return (
      <JssProvider
        jss={muiPageContext.jss}
        registry={muiPageContext.sheetsRegistry}
        generateClassName={muiPageContext.generateClassName}
      >
        <MuiThemeProvider
          theme={muiPageContext.theme}
          sheetsManager={muiPageContext.sheetsManager}
        >
          <CssBaseline />
          {children}
        </MuiThemeProvider>
      </JssProvider>
    )
  }
}

AppWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  muiPageContext: PropTypes.object,
  uiTheme: PropTypes.object.isRequired,
}

export default connect(state => ({
  uiTheme: state.theme,
}))(AppWrapper)
