import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Header } from './components/common/Header';

// Import stranica
import HomePage from './pages/HomePage';
import LanguagesPage from './pages/LanguagesPage';
import ExercisePage from './pages/ExercisePage';
import ProfilePage from './pages/ProfilePage';
import LeaderboardPage from './pages/LeaderboardPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

import './App.css';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="App">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/languages" element={<LanguagesPage />} />
              <Route path="/languages/:languageId" element={<LanguagesPage />} />
              <Route path="/exercise/:lessonId" element={<ExercisePage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/leaderboard" element={<LeaderboardPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              {/* 404 fallback */}
              <Route path="*" element={<div className="not-found">
                <h2>Page Not Found</h2>
                <p>The page you're looking for doesn't exist.</p>
              </div>} />
            </Routes>
          </main>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
