import React, { useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { usePageNavigation } from '../hooks/usePageNavigation';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { mockLanguages } from '../utils/mockData';
import './HomePage.css';

const HomePage: React.FC = () => {
  const { state, setLanguages } = useAppContext();
  const { navigate } = usePageNavigation();

  useEffect(() => {
    // Load available languages
    setLanguages(mockLanguages);
  }, [setLanguages]);

  const handleGetStarted = () => {
    if (state.user) {
      navigate('/languages');
    } else {
      navigate('/register');
    }
  };

  const handleExploreLanguage = (languageId: string) => {
    navigate(`/languages/${languageId}`);
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero__container">
          <div className="hero__content">
            <h1 className="hero__title">
              Master Languages with 
              <span className="hero__highlight"> LinguaLearn</span>
            </h1>
            <p className="hero__subtitle">
              Learn languages through interactive exercises, track your progress, 
              and compete with learners worldwide. Start your journey today!
            </p>
            
            <div className="hero__stats">
              <div className="stat">
                <span className="stat__number">4</span>
                <span className="stat__label">Languages</span>
              </div>
              <div className="stat">
                <span className="stat__number">100+</span>
                <span className="stat__label">Lessons</span>
              </div>
              <div className="stat">
                <span className="stat__number">500+</span>
                <span className="stat__label">Exercises</span>
              </div>
            </div>

            <div className="hero__actions">
              <Button
                size="large"
                onClick={handleGetStarted}
                className="hero__cta"
              >
                {state.user ? 'Continue Learning' : 'Start Learning'}
              </Button>
              
              {!state.user && (
                <Button
                  variant="outline"
                  size="large"
                  onClick={() => navigate('/login')}
                >
                  Sign In
                </Button>
              )}
            </div>
          </div>

          <div className="hero__illustration">
            <div className="floating-languages">
              <span className="floating-lang floating-lang--1">🇺🇸</span>
              <span className="floating-lang floating-lang--2">🇩🇪</span>
              <span className="floating-lang floating-lang--3">🇫🇷</span>
              <span className="floating-lang floating-lang--4">🇪🇸</span>
            </div>
          </div>
        </div>
      </section>

      {/* User Progress Section (if logged in) */}
      {state.user && (
        <section className="user-progress">
          <div className="container">
            <h2>Your Progress</h2>
            <div className="progress-cards">
              <Card
                title="Current Score"
                className="progress-card"
              >
                <div className="score-display">
                  <span className="score-number">{state.user.currentScore}</span>
                  <span className="score-label">points</span>
                </div>
              </Card>
              
              <Card
                title="Streak"
                className="progress-card"
              >
                <div className="streak-display">
                  <span className="streak-icon">🔥</span>
                  <span className="streak-number">{state.user.streak}</span>
                  <span className="streak-label">days</span>
                </div>
              </Card>
              
              <Card
                title="Lessons Completed"
                className="progress-card"
              >
                <div className="lessons-display">
                  <span className="lessons-number">{state.user.completedLessons.length}</span>
                  <span className="lessons-label">completed</span>
                </div>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* Languages Section */}
      <section className="languages-preview">
        <div className="container">
          <h2>Choose Your Language</h2>
          <p className="section-subtitle">
            Start learning one of our available languages
          </p>
          
          <div className="languages-grid">
            {mockLanguages.map((language) => (
              <Card
                key={language.id}
                title={`${language.flag} ${language.name}`}
                subtitle={`${language.totalLessons} lessons • ${language.difficulty}`}
                onClick={() => handleExploreLanguage(language.id)}
                hoverable
                className="language-card"
              >
                <p>{language.description}</p>
                <div className="language-stats">
                  <span className="difficulty-badge difficulty-badge--{language.difficulty}">
                    {language.difficulty}
                  </span>
                </div>
              </Card>
            ))}
          </div>

          <div className="languages-cta">
            <Button
              variant="outline"
              onClick={() => navigate('/languages')}
            >
              View All Languages
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2>Why Choose LinguaLearn?</h2>
          
          <div className="features-grid">
            <div className="feature">
              <div className="feature__icon">🎯</div>
              <h3>Interactive Exercises</h3>
              <p>Practice with multiple choice, translation, and fill-in-the-blank exercises.</p>
            </div>
            
            <div className="feature">
              <div className="feature__icon">📊</div>
              <h3>Track Progress</h3>
              <p>Monitor your learning journey with detailed statistics and achievements.</p>
            </div>
            
            <div className="feature">
              <div className="feature__icon">🏆</div>
              <h3>Compete & Learn</h3>
              <p>Join the leaderboard and compete with learners from around the world.</p>
            </div>
            
            <div className="feature">
              <div className="feature__icon">📱</div>
              <h3>Mobile Friendly</h3>
              <p>Learn anywhere, anytime with our responsive design that works on all devices.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage; 