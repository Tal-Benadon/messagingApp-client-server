import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { ModalProvider } from './context/ModalContext.jsx'
import { RefreshProvider } from './context/RefreshContext.jsx'
import { ReadProvider } from './context/ReadContext.jsx'
import { UserProvider } from './context/UserContext.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  <RefreshProvider>
    <UserProvider>
      <BrowserRouter>
        <ReadProvider>
          <ModalProvider>
            <App />
          </ModalProvider>
        </ReadProvider>
      </BrowserRouter>
    </UserProvider>
  </RefreshProvider>

)
