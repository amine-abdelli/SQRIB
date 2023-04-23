import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { Layout } from './layouts/desktop/Layout.desktop';
import Router from './routes';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Router />
      </Layout>
    </BrowserRouter>
  );
}

export default App;
