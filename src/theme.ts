
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#0B2341', // NFL blue
      contrastText: '#fff',
    },
    secondary: {
      main: '#D50A0A', // NFL red
      contrastText: '#fff',
    },
    background: {
      default: 'linear-gradient(135deg, #e3ecfa 0%, #f5f7fa 100%)',
      paper: '#f3f6fa',
    },
    text: {
      primary: '#1a2233',
      secondary: '#3a4664',
    },
    divider: '#dbe2ef',
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h5: {
      fontFamily: 'Roboto Slab, serif',
      fontWeight: 700,
      fontSize: '2.2rem',
      color: '#0B2341',
    },
    h6: {
      fontFamily: 'Roboto Slab, serif',
      fontWeight: 700,
      fontSize: '1.3rem',
      color: '#0B2341',
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 14,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: '0 2px 8px 0 rgba(11,35,65,0.08)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 14,
          background: 'linear-gradient(135deg, #f3f6fa 0%, #e3ecfa 100%)',
          boxShadow: '0 2px 16px 0 rgba(11,35,65,0.10)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(135deg, #f3f6fa 0%, #e3ecfa 100%)',
          boxShadow: '0 2px 16px 0 rgba(11,35,65,0.10)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(90deg, #0B2341 60%, #D50A0A 100%)',
        },
      },
    },
    MuiPagination: {
      styleOverrides: {
        root: {
          marginTop: 16,
        },
      },
    },
  },
});

export default theme;
