import './index.css'; // ou './style.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter} from 'react-router-dom'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename="my-portfolio">
        <App/>
    </BrowserRouter>
  </StrictMode>,
)

// Certifique-se de que o elemento com id 'root' exista no seu HTML
const rootElement = document.getElementById('root');