// ** MUI Theme Provider
import { ThemeOptions } from '@mui/material'
import { deepmerge } from '@mui/utils'

// ** Type Import
import { Settings } from '@/context/settingsContext'

// ** Theme Override Imports
import palette from './palette'
import spacing from './spacing'
import shadows from './shadows'
import breakpoints from './breakpoints'

const themeOptions = (settings: Settings): ThemeOptions => {
  // ** Vars
  const { mode, themeColor } = settings

  const themeConfig = {
    palette: palette(mode, themeColor),
    typography: {
      fontFamily: [
        'IRANSans',
        'Inter',
        'sans-serif',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"'
      ].join(',')
    },
    shadows: shadows(mode),
    ...spacing,
    breakpoints: breakpoints(),
    shape: {
      borderRadius: 6
    },
    mixins: {
      toolbar: {
        minHeight: 64
      }
    }
  }

  return deepmerge(themeConfig, {
    palette: {
      primary: {
        ...themeConfig.palette[themeColor]
      }
    }
  })
}

export default themeOptions
