import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Layout } from './layouts/desktop/Layout.desktop';
import Router from './routes';
import { SoundProvider } from './contexts';
import { ConfettiProvider } from './contexts/ConfettiContext';
import { ModalProvider } from './contexts/ModalContext';
import { ModalDefinitions } from './components/Modals';
import { AuthProvider } from './contexts/AuthContext';


function App() {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <AuthProvider>
        <SoundProvider>
          <ConfettiProvider>
            <ModalProvider>
              <BrowserRouter>
                <Layout>
                  <Router />
                  <ModalDefinitions />
                </Layout>
              </BrowserRouter>
            </ModalProvider>
          </ConfettiProvider>
        </SoundProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
