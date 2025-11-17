import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from 'react-oidc-context';

import { registerSW } from 'virtual:pwa-register'

registerSW({
  onNeedRefresh() {},
  onOfflineReady() {},
})

const oidcConfig = {
  authority: 'https://auth.projectbase.space/connect', 
  client_id: 'client-app',
  client_secret: 'client-secret',
  scope: "openid profile email offline_access",
  redirect_uri: `${window.location.origin}/settings`,
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
