import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App'

import './styles/variables.css'
import './styles/base.css'
import './styles/menubar.css'
import './styles/windows.css'
import './styles/components.css'
import './styles/dock.css'
import './styles/spotlight.css'
import './styles/desktop-icons.css'
import './styles/config.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
