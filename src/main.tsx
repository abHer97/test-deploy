import React from 'react';
import ReactDOM from 'react-dom/client';
/**
 * Para ver los cambios entre el componente original y el mejorado,
 * cambiar el nombre del archivo importado.
 * Archivo original: App.tsx
 * Archivo mejorado: AppImproved.tsx
 */
import App from './App.tsx';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
