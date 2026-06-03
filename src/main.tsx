import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App'

import './desktop/styles/variables.css'
import './desktop/styles/base.css'
import './desktop/styles/menubar.css'
import './desktop/styles/windows.css'
import './desktop/styles/components.css'
import './desktop/styles/dock.css'
import './desktop/styles/spotlight.css'
import './desktop/styles/desktop-icons.css'
import './desktop/styles/config.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
