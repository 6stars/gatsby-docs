import Location from './location'
const PATH_ACCOUNT_LOGOFF_APP = '/Account/LogoffApp/'
const PATH_ACCOUNT_LOGOFF = '/Account/Logoff/'
const PATH_LOGIN_LOGOUT = '/ui/login/logout/'

let Logout = {
  logout() {
    // include the loanApplicationID param to indicate which that needs to be unlocked before logging them out
    if (Location.pathname().indexOf('logout') > -1)
      Location.redirect(PATH_ACCOUNT_LOGOFF)
    else {
      Location.redirectWithReturnUrl(
        `${PATH_ACCOUNT_LOGOFF}?ReturnUrl=${encodeURI(Location.pathname())}`
      )
    }
  },
  logoutForced() {
    Location.redirect(`${PATH_ACCOUNT_LOGOFF}?forced=true`)
  },
  logoutDirectlyToNewLogout() {
    Location.redirect(PATH_LOGIN_LOGOUT)
  },
}

export default Logout
