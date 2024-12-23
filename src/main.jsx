import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter as Router } from 'react-router-dom'
import { DatabaseProvider } from './providers/DatabaseProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DatabaseProvider>
      <Router>
        <App/>
      </Router>
    </DatabaseProvider>
  </StrictMode>,
)
