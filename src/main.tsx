import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { GameProvider } from './context/GameContext';
import { PricingProvider } from './context/PricingContext';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <GameProvider>
          <PricingProvider>
            <App />
          </PricingProvider>
        </GameProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
