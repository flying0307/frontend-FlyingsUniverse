import { createTheme } from '@mui/material/styles';
import { blue, grey, red } from '@mui/material/colors';

const theme = createTheme({
  
  typography: {
    fontFamily: 'Ubuntu, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    h1: {
      fontWeight: '700',
      fontSize: '1.875rem',
    },
    subtitle1: {
      fontWeight: '700',
      fontSize: '1.25rem',
    },
  },

  palette: {
    mode: 'dark',
    primary: {
      main: blue[500],
    },
    secondary: {
      main: grey[700],
    },
    error: {
      main: red.A400,
    },
  },
  
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          '&.MuiButton-containedPrimary': {
            backgroundColor: blue[700],
          },
          '&.MuiButton-containedSecondary': {
            backgroundColor: grey[800],
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInput-underline:after': {
            borderBottomColor: blue[500],
          },
          '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
              borderColor: blue[500],
            },
          },
        },
      },
    },
  },
});


export default theme;