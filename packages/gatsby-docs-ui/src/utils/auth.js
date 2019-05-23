import Api, { ACCOUNT_PING } from './api'
import Logout from './logout'
import Token from './token'
import Location from './location'

const PATH_LOGIN_EXPIRED = ''
const ROUTE_LOGIN_EXPIRED = ''

let Auth = {
  profile(profileCondition = 'PasswordExpired') {
    let token = new Token()
    let currentProfile = token.getProfile()
    return currentProfile[profileCondition]
  },

  ping() {
    return Api.get(API.auth, ACCOUNT_PING)
      .then(function(response) {
        let token = new Token()
        let currentProfile = token.getProfile()
        let pingUsername = response.username.toLowerCase()
        let profileUsername = currentProfile.UserName.toLowerCase()

        if (pingUsername.localeCompare(profileUsername) === 0) {
          return Promise.resolve(response)
        } else {
          return Promise.reject(new Error(response.Message))
        }
      })
      .catch(function(error) {
        if (error && error.response && error.response.status === 401) {
          Logout.logoutDirectlyToNewLogout()
        }
      })
  },

  verifyUsernameHasPrefix(prefix) {
    // Get our data
    let token = new Token()
    let currentExpiration = token.getExpiration()
    let currentProfile = token.getProfile()

    if (currentExpiration === null) {
      Logout.logoutDirectlyToNewLogout()
    }
    // Check expiration
    let expiredDate = currentExpiration
    let currentTime = new Date().getTime()
    let currentTimeStamp = Math.floor(currentTime / 1000)
    if (expiredDate <= currentTimeStamp) {
      Logout.logoutDirectlyToNewLogout()
    }

    // Check ForceLogoff field
    if (!currentProfile || currentProfile.ForceLogoff === true) {
      Logout.logoutForced()
    }

    // Check PasswordExpired field
    if (
      currentProfile.PasswordExpired === true &&
      path !== ROUTE_LOGIN_EXPIRED
    ) {
      // eslint-disable-next-line
      Location.redirect(PATH_LOGIN_EXPIRED)
    }

    return currentProfile.UserName.startsWith(prefix)
  },
}

export default Auth
