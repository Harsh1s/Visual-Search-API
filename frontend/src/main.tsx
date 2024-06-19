import React from 'react';

import App from './App';
import { createRoot } from 'react-dom/client';
import { Notifications } from '@mantine/notifications';
import { createTheme, MantineProvider } from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Amplify } from 'aws-amplify';

// @ts-expect-error - Ignore the type errors for JS file
import Config from './config';

import './index.css';
import '@mantine/core/styles.css';
import '@mantine/dropzone/styles.css';
import '@mantine/notifications/styles.css';

const root = createRoot(document.getElementById('root')!);

const theme = createTheme({});
const queryClient = new QueryClient();

Amplify.configure({
  API: {
    REST: {
      ImageSearch: {
        endpoint: Config.apiEndpoint
      }
    }
  }
});

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme}>
        <Notifications />
        <App />
      </MantineProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
