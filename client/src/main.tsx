import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

async function startApp() {
  if (import.meta.env.DEV) {
    const { worker } = await import('./mocks/browser');
    await worker.start({
      onUnhandledRequest: 'bypass', // ← ajoute cette ligne
    });
  }

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}

startApp();