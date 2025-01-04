import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter as Router } from 'react-router-dom'
import { DatabaseProvider } from './providers/DatabaseProvider.jsx'
import { AlertProvider } from './providers/AlertProvider.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* Database context for database data */}
    <DatabaseProvider>
      {/* Alert context for user notifications */}
      <AlertProvider>
        <Router>
          <App/>
        </Router>
      </AlertProvider>
    </DatabaseProvider>
  </StrictMode>
)
