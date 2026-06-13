import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Initialize i18n (make available globally for manual language switch)
import './i18n/config';
import i18n from './i18n/config';
(window as any).__i18n = i18n;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
