import React from 'react';
import './i18n';
import { createRoot } from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import store from './store/Store';
import theme from './theme';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';

const root = createRoot(document.getElementById('root'));

root.render(

  <ThemeProvider theme={theme}>
    <Provider store={store}>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      <App />
    </Provider>
  </ThemeProvider>,
);
