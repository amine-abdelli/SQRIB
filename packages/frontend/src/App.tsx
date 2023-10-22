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
import { Alert } from './modules/Alert/Alert.component';
import { ResolutionWarning } from './components/ResolutionWarning/ResolutionWarning.component';
import { Toaster } from 'react-hot-toast';
import { ToasterConfigs } from './theme/toast';

function App() {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <Alert />
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={ToasterConfigs}
      />
      <ResolutionWarning />
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
