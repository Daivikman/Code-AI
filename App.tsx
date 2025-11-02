
import React, { useState, useCallback } from 'react';
import { Page } from './types';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import VoiceAssistantPage from './components/VoiceAssistantPage';
import ModelPage from './components/ModelPage';
import SubscriptionPage from './components/SubscriptionPage';
import AboutPage from './components/AboutPage';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.Home);

  const handleNavigate = useCallback((page: Page) => {
    setCurrentPage(page);
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case Page.Home:
        return <LandingPage onNavigate={handleNavigate} />;
      case Page.VoiceAssistant:
        return <VoiceAssistantPage />;
      case Page.Model:
        return <ModelPage />;
      case Page.Subscription:
        return <SubscriptionPage />;
      case Page.About:
        return <AboutPage />;
      default:
        return <LandingPage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 overflow-x-hidden">
      <Header currentPage={currentPage} onNavigate={handleNavigate} />
      <main className="p-4 sm:p-6 md:p-8">
        {renderPage()}
      </main>
    </div>
  );
};

export default App;
