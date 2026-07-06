import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import '@/styles/globals.css'
import '@/lib/i18n'
import { initAnalytics } from '@/lib/analytics'
import App from './App'

initAnalytics({
  gaMeasurementId: import.meta.env.VITE_GA_MEASUREMENT_ID,
  gtmId: import.meta.env.VITE_GTM_ID,
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
        <App />
    </HelmetProvider>
  </StrictMode>,
)
