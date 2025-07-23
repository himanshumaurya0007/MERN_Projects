import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

const helmetContext = {};

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <HelmetProvider context={helmetContext}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </HelmetProvider>
  // </StrictMode>,
)
