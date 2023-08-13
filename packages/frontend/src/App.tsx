import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Layout } from './layouts/desktop/Layout.desktop';
import Router from './routes';
import { SoundProvider } from './contexts';
import { ConfettiProvider } from './contexts/ConfettiContext';

function App() {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <SoundProvider>
        <ConfettiProvider>
          <BrowserRouter>
            <Layout>
              <Router />
            </Layout>
          </BrowserRouter>
        </ConfettiProvider>
      </SoundProvider>
    </QueryClientProvider>
  );
}

export default App;
