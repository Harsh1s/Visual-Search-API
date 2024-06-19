import React from 'react';

import App from './App';
import { createRoot } from 'react-dom/client';
import { createTheme, MantineProvider } from '@mantine/core';

import './index.css';
import '@mantine/core/styles.css';
import '@mantine/dropzone/styles.css';

const root = createRoot(document.getElementById('root'));

const theme = createTheme({});

root.render(
  <React.StrictMode>
    <MantineProvider theme={theme}>
      <App />
    </MantineProvider>
  </React.StrictMode>
);
