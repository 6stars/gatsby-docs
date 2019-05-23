import React from 'react'
import { connect } from 'react-redux'
import { object } from 'prop-types'
import Auth from './utils/auth'

const REQUIRE_AUTH = true
const PATH_DASHBOARD = '/home/landing'

export default function(ComposedComponent) {
  class Authentication extends React.Component {
    static contextTypes = {
      router: object,
    }

    async componentWillMount() {
      debugger
      if (REQUIRE_AUTH && process.browser) {
        // Verify all permissions and fields
        console.log('in Require Auth')
        let authorized = Auth.verifyIsDefiUser()
        if (!authorized) {
          window.location.replace(PATH_DASHBOARD)
        }

        const response = await Auth.ping()
        console.log(response)
      }
    }

    async componentWillUpdate(nextProps) {
      if (REQUIRE_AUTH && process.browser) {
        // Verify all permissions and fields
        let authorized = Auth.verifyIsDefiUser()
        if (!authorized) {
          window.location.replace(PATH_DASHBOARD)
        }

        const response = await Auth.ping()
        console.log(response)
      }
    }

    render() {
      console.log(this.props)
      return <ComposedComponent {...this.props} />
    }
  }

  return connect()(Authentication)
}
