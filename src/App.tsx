import React from 'react';
import LanguageProvider from './components/layout/LanguageProvider';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LinksPage from './pages/LinksPage';
import AchievementsPage from './pages/AchievementsPage';
import CertificatesPage from './pages/CertificatesPage';
import ScrollProgress from './components/ui/ScrollProgress';
import { Analytics } from "@vercel/analytics/react"

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <Router>
        <Analytics />
        <ScrollProgress />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/links" element={<LinksPage />} />
          <Route path="/achievements" element={<AchievementsPage />} />
          <Route path="/certificates" element={<CertificatesPage />} />
        </Routes>
      </Router>
    </LanguageProvider>
  );
};

export default App;

