import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'react-tooltip/dist/react-tooltip.css'
import './theme/globals.scss';

// eslint-disable-next-line no-undef
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
