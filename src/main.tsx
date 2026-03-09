import { StrictMode } from 'react'
import { ThemeProvider, CssBaseline } from '@mui/material';
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom';
import { cartoonTheme } from './theme/cartoonTheme.ts';

createRoot(document.getElementById('root')!).render(
  <ThemeProvider theme={cartoonTheme}>
    <CssBaseline />
    <StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
    </StrictMode>
  </ThemeProvider>,
)

// import ReactDOM from 'react-dom/client';
// import { ThemeProvider, CssBaseline } from '@mui/material';
// import App from './App';
// import { cartoonTheme } from './theme/cartoonTheme';

// ReactDOM.createRoot(document.getElementById('root')!).render(
//   <ThemeProvider theme={cartoonTheme}>
//     <CssBaseline />
//     <App />
//   </ThemeProvider>
// );