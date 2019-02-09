import { createMuiTheme } from '@material-ui/core/styles'

const getTheme = uiTheme => {
  let themeOptions = {
    typography: {
      useNextVariants: true,
    },
    nprogress: {
      color: uiTheme.paletteType === 'light' ? '#000' : '#fff',
    },
    palette: { ...uiTheme.paletteColors, type: uiTheme.paletteType },
  }

  // set paper color based on paletteType
  themeOptions.palette.background =
    uiTheme.paletteType === 'dark'
      ? {
          paper: '#1c2022',
          default: '#000',
        }
      : {
          paper: themeOptions.palette.main,
          default: '#fff',
        }

  const theme = createMuiTheme(themeOptions)

  // Expose the theme as a global variable so people can play with it.
  if (process.browser && window) {
    window.theme = theme
  }

  return theme
}

export default getTheme
