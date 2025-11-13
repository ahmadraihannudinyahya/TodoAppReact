import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { AuthProvider } from "react-oidc-context";

const oidcConfig = {
  authority: 'http://localhost:3000/connect', 
  client_id: 'client-app',
  client_secret: 'client-secret',
  scope: "openid profile email offline_access",
  redirect_uri: 'http://localhost:4000/settings',
  extraQueryParams: { resource: "api://default" },
  extraTokenParams: { resource: "api://default" },
};




createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider {...oidcConfig}>
      <App />
    </AuthProvider>
  </StrictMode>,
)
