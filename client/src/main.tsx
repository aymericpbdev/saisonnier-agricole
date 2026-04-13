import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'

async function startApp() {
  // active msw en mode dev
  if (import.meta.env.DEV) {
    const { worker } = await import('./mocks/browser')
    await worker.start()
  }

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}

startApp()