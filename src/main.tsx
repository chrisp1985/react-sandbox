import { StrictMode } from 'react'
import { ThemeProvider, CssBaseline } from '@mui/material';
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './app/App.tsx'
import { BrowserRouter } from 'react-router-dom';
import { cartoonTheme } from './theme/cartoonTheme.ts';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <ThemeProvider theme={cartoonTheme}>
    <CssBaseline />
    <StrictMode>
        <BrowserRouter>
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
        </BrowserRouter>
    </StrictMode>
  </ThemeProvider>,
)