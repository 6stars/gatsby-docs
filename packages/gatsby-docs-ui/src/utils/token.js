export default class Token {
  /* Store the session keys */
  setExpiration(sessionData) {
    localStorage.setItem('expiration', JSON.stringify(sessionData))
    return this.getExpiration()
  }

  setCreated(sessionData) {
    localStorage.setItem('created', JSON.stringify(sessionData))
    return this.getCreated()
  }

  setRefresh(sessionData) {
    localStorage.setItem('refresh', JSON.stringify(sessionData))
    return this.getRefresh()
  }

  setProfile(sessionData) {
    localStorage.setItem('profile', JSON.stringify(sessionData))
    return this.getProfile()
  }

  setPermissions(sessionData) {
    localStorage.setItem('permissions', JSON.stringify(sessionData))
    return this.getPermissions()
  }

  setPagePermissions(sessionData) {
    localStorage.setItem('pagePermissions', JSON.stringify(sessionData))
    return this.getPagePermissions()
  }

  setMfaSession(sessionData) {
    localStorage.setItem('mfaSession', JSON.stringify(sessionData))
    return this.getMfaSession()
  }

  /* Retrieve session data via key */
  getExpiration() {
    if (localStorage.getItem('expiration') !== null) {
      return JSON.parse(localStorage.getItem('expiration'))
    } else {
      return null
    }
  }

  getCreated() {
    if (
      localStorage.getItem('created') !== null &&
      localStorage.getItem('created') !== undefined
    ) {
      return JSON.parse(localStorage.getItem('created'))
    } else {
      return null
    }
  }

  getRefresh() {
    if (
      localStorage.getItem('refresh') !== null &&
      localStorage.getItem('refresh') !== undefined
    ) {
      return JSON.parse(localStorage.getItem('refresh'))
    } else {
      return null
    }
  }

  getProfile() {
    if (localStorage.getItem('profile') !== null) {
      return JSON.parse(localStorage.getItem('profile'))
    } else {
      return null
    }
  }

  getPermissions() {
    if (localStorage.getItem('permissions') !== null) {
      return JSON.parse(localStorage.getItem('permissions'))
    } else {
      return null
    }
  }

  getPagePermissions() {
    if (localStorage.getItem('pagePermissions') !== null) {
      return JSON.parse(localStorage.getItem('pagePermissions'))
    } else {
      return null
    }
  }

  getMfaSession() {
    if (localStorage.getItem('mfaSession') !== null) {
      return JSON.parse(localStorage.getItem('mfaSession'))
    } else {
      return null
    }
  }

  /* Delete session data */
  deleteSession() {
    localStorage.removeItem('expiration')
    localStorage.removeItem('created')
    localStorage.removeItem('refresh')
    localStorage.removeItem('profile')
    localStorage.removeItem('permissions')
    localStorage.removeItem('pagePermissions')
  }

  deleteMfaSession() {
    localStorage.removeItem('mfaSession')
  }
}
