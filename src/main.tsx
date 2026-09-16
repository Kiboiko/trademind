import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { GameProvider } from './context/GameContext';
import { PricingProvider } from './context/PricingContext';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <GameProvider>
        <PricingProvider>
          <App />
        </PricingProvider>
      </GameProvider>
    </BrowserRouter>
  </StrictMode>,
);
