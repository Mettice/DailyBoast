import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ComplimentCard } from './components/compliments/ComplimentCard';
import { Categories } from './components/compliments/categories';
import { Header } from './components/Layout/Header';
import { MoodSelector } from './components/MoodSelector';
import { LoadingState } from './components/LoadingState';
import { ErrorState } from './components/ErrorState';
import { useComplimentStore } from './store/useComplimentStore';
import type { ComplimentCategory } from './types/index';

//import { CategoryFilter } from './store/useComplimentStore';
//import { Achievement } from './data/compliments';
import { Toast } from './components/Toast';
import { StreakDisplay } from './components/engagement/StreakDisplay';
import { AchievementsDisplay } from './components/engagement/AchievementDisplay';
import { CollectionsView } from './components/engagement/Collections';
import { AchievementNotification } from './components/engagement/AchievementNotification';
//import { Collections } from './components/collections/Collections';
import { AuthProvider } from './providers/AuthProvider';
import { DailyTip } from './components/tips/DailyTip';
import { AnalyticsProvider } from './components/analytics/AnalyticsProvider';
import { KindeProvider } from "@kinde-oss/kinde-auth-react";
import { CallbackPage } from './pages/CallbackPage';
import './App.css';
import './index.css';
import { Layout } from './components/Layout/Layout';
import { SavedTips } from './components/tips/SavedTips';

const App: React.FC = React.memo(() => {
  console.log('App component rendering');

  const {
    selectedCategory,
    currentCompliment,
    isLoading,
    error,
    toast,
    newAchievement,
    setSelectedCategory,
    handleGetCompliment,
    handleShare,
    handleSave,
    setToast,
    setNewAchievement
  } = useComplimentStore();

  const handleCategorySelect = (category: ComplimentCategory) => {
    console.log('1. Category selected:', category);
    setSelectedCategory(category);
    console.log('2. About to get compliment');
    handleGetCompliment();
    console.log('3. After handleGetCompliment call');
  };

  return (
    <AnalyticsProvider>
      <KindeProvider
        clientId={import.meta.env.VITE_KINDE_CLIENT_ID}
        domain={import.meta.env.VITE_KINDE_DOMAIN}
        redirectUri={import.meta.env.VITE_KINDE_REDIRECT_URI}
        logoutUri={import.meta.env.VITE_KINDE_LOGOUT_URI}
      >
        <AuthProvider>
          <Routes>
            <Route
              path="/"
              element={
                <Layout>
                  <Header />
                  <div className="space-y-8">
                    <Categories 
                      selected={selectedCategory} 
                      onSelect={handleCategorySelect} 
                    />
                    <MoodSelector />
                
                    <div className="mt-8">
                      <AnimatePresence mode="wait">
                        {isLoading ? (
                          <LoadingState />
                        ) : error ? (
                          <ErrorState 
                            message={error} 
                            onRetry={handleGetCompliment} 
                          />
                        ) : currentCompliment ? (
                          <ComplimentCard
                            key={currentCompliment.id}
                            compliment={currentCompliment}
                            onRefresh={handleGetCompliment}
                            onShare={() => handleShare(currentCompliment)}
                            onSave={() => handleSave(currentCompliment)}
                          />
                        ) : null}
                      </AnimatePresence>
                    </div>
                    
                    <DailyTip />
                    <SavedTips />

                    <div className="space-y-6">
                      <StreakDisplay />
                      <AchievementsDisplay />
                      <CollectionsView />
                    </div>
                  </div>

                  <Toast 
                    message={toast?.message || ''} 
                    type={toast?.type || 'success'} 
                    onClose={() => setToast(null)} 
                  />

                  <AnimatePresence>
                    {newAchievement && (
                      <AchievementNotification
                        achievement={{
                          ...newAchievement,
                          progress: newAchievement.progress || 0,
                          target: newAchievement.target || 100,
                          category: newAchievement.category || 'general',
                          unlockedAt: newAchievement.unlockedAt?.toISOString()
                        }}
                        onClose={() => setNewAchievement(null)}
                      />
                    )}
                  </AnimatePresence>
                </Layout>
              }
            />
            <Route path="/callback" element={<CallbackPage />} />
          </Routes>
        </AuthProvider>
      </KindeProvider>
    </AnalyticsProvider>
  );
});

App.displayName = 'App';

export default App;