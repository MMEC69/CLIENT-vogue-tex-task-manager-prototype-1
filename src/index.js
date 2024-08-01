import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { syncFusionRegLicense } from './MetaData/MetaData';
import { registerLicense } from '@syncfusion/ej2-base';

registerLicense(syncFusionRegLicense);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

