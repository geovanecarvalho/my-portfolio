import './index.css'; // ou './style.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { HashRouter } from 'react-router-dom';
import "@fontsource-variable/inter/index.css";
import "@fontsource-variable/roboto-flex/index.css";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
        <App/>
    </HashRouter>
  </StrictMode>,
)

// Certifique-se de que o elemento com id 'root' exista no seu HTML
const rootElement = document.getElementById('root');