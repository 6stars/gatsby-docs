const Location = {
  pathname: () => window.location.pathname,
  reload: () => window.location.reload(),
  redirect: (url) => {
    window.location.replace(url);
  },
  redirectWithReturnUrl: (url) => {
    window.location.replace(url + (window.location.pathname ? `?ReturnUrl=${window.location.pathname}` : ''))
  }
}

export default Location;
