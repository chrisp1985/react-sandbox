import { createTheme } from '@mui/material/styles';

export const cartoonTheme = createTheme({
  palette: {
    primary: {
      main: '#FF7A45'
    },
    secondary: {
      main: '#2f1077'
    },
    background: {
      default: '#120131',
    }
  },

  shape: {
    borderRadius: 16
  },

  typography: {

    h1: { fontWeight: 700, fontFamily: '"Bebas Neue", "Comic Sans MS", sans-serif', },
    h2: { fontWeight: 700, fontFamily: '"Bebas Neue", "Comic Sans MS", sans-serif', },
    h3: { fontWeight: 700, fontFamily: '"Bebas Neue", "Comic Sans MS", sans-serif', },
    h4: { fontWeight: 700, fontFamily: '"Bebas Neue", "Comic Sans MS", sans-serif', },
    button: { textTransform: 'none', fontWeight: 600 }
  },

  components: {

    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          backgroundColor: '#2f1077',
          color: '#fff',
          padding: '10px 20px',
          boxShadow: '4px 4px 0px #000',
          border: '2px solid #000',
          transition: 'all 0.1s ease',

          '&:hover': {
            boxShadow: '2px 2px 0px #000',
            transform: 'translate(2px,2px)'
          }
        }
      }
    },

    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          border: '2px solid black',
          boxShadow: '6px 6px 0px black'
        }
      }
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 20
        }
      }
    }

  }
});
