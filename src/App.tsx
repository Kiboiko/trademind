import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { captureGclid } from './lib/tracking';
import AboutPage from './pages/AboutPage';
import GamePage from './pages/GamePage';
import HomePage from './pages/HomePage';
import PartnersPage from './pages/PartnersPage';
import PricingPage from './pages/PricingPage';
import ReviewsPage from './pages/ReviewsPage';

export default function App() {
  useEffect(() => {
    captureGclid();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/pricing" element={<PricingPage />} />
      <Route path="/practice" element={<GamePage />} />
      <Route path="/reviews" element={<ReviewsPage />} />
      <Route path="/partners" element={<PartnersPage />} />
      <Route path="/about" element={<AboutPage />} />
    </Routes>
  );
}
