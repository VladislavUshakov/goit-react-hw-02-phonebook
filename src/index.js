import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';
import { theme } from './settings/theme';
import { App } from 'components/App';
import { ThemeProvider } from '@emotion/react';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App title="Phonebook" />
    </ThemeProvider>
  </React.StrictMode>
);
