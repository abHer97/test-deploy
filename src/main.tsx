import React from 'react';
import ReactDOM from 'react-dom/client';
/**
 * Para ver los cambios entre el componente original y el mejorado,
 * cambiar el nombre del archivo importado.
 * Archivo original: App.tsx
 * Archivo mejorado: AppImproved.tsx
 */
// import App from './AppImproved.tsx';
import { FilterableTable } from './basics/filterable-table.tsx';
import { PRODUCTS } from './basics/get-data.ts';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <FilterableTable products={PRODUCTS} />
  </React.StrictMode>
);
