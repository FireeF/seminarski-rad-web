import React, { useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { usePageNavigation } from '../hooks/usePageNavigation';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { mockLanguages } from '../utils/mockData';
import { QuoteService, Quote } from '../services/quoteService';
import './HomePage.css';

const HomePage: React.FC = () => {
  const { state, setLanguages } = useAppContext();
  const { navigate } = usePageNavigation();
  const [dailyQuote, setDailyQuote] = useState<Quote | null>(null);
  const [loadingQuote, setLoadingQuote] = useState(true);

  useEffect(() => {
    // Load available languages
    setLanguages(mockLanguages);
  }, [setLanguages]);

  useEffect(() => {
    // Load motivational quote
    const loadQuote = async () => {
      setLoadingQuote(true);
      const quote = await QuoteService.getRandomQuote('education');
      setDailyQuote(quote);
      setLoadingQuote(false);
    };
    loadQuote();
  }, []);

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

            {/* Daily Quote Section */}
            {dailyQuote && (
              <div className="daily-quote" style={{
                margin: '2rem 0',
                padding: '1.5rem',
                backgroundColor: '#f8f9fa',
                borderRadius: '12px',
                borderLeft: '4px solid #58cc02'
              }}>
                <p style={{ 
                  fontStyle: 'italic', 
                  fontSize: '1.1rem',
                  marginBottom: '0.5rem',
                  color: '#333'
                }}>
                  "{dailyQuote.content}"
                </p>
                <p style={{ 
                  textAlign: 'right', 
                  color: '#666',
                  fontSize: '0.9rem'
                }}>
                  — {dailyQuote.author}
                </p>
              </div>
            )}
            {loadingQuote && (
              <div style={{
                margin: '2rem 0',
                padding: '1.5rem',
                backgroundColor: '#f8f9fa',
                borderRadius: '12px',
                textAlign: 'center'
              }}>
                Loading daily inspiration...
              </div>
            )}
            
            <div className="hero__stats">
              <div className="stat">
                <span className="stat__number">27+</span>
                <span className="stat__label">Languages</span>
              </div>
              <div className="stat">
                <span className="stat__number">200+</span>
                <span className="stat__label">Lessons</span>
              </div>
              <div className="stat">
                <span className="stat__number">1000+</span>
                <span className="stat__label">Exercises</span>
              </div>
            </div>

            <div className="hero__actions">
              <Button
                size="large"
                onClick={handleGetStarted}
                className="hero__cta"
                style={{
                  background: 'linear-gradient(135deg, #58cc02, #87e300)',
                  color: 'white',
                  border: 'none',
                  padding: '1rem 2rem',
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  borderRadius: '25px'
                }}
              >
                {state.user ? '🚀 Continue Learning' : '🎯 Start Learning Now'}
              </Button>
              
              <Button
                variant="outline"
                size="large"
                onClick={() => navigate('/languages')}
                style={{
                  color: '#58cc02',
                  borderColor: '#58cc02',
                  borderWidth: '2px',
                  fontWeight: 'bold',
                  borderRadius: '25px'
                }}
              >
                📚 Browse Languages
              </Button>
              
              {!state.user && (
                <Button
                  variant="outline"
                  size="large"
                  onClick={() => navigate('/login')}
                  style={{
                    color: '#666',
                    borderColor: '#666',
                    borderRadius: '25px'
                  }}
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
              <span className="floating-lang floating-lang--5">🇯🇵</span>
              <span className="floating-lang floating-lang--6">🇨🇳</span>
              <span className="floating-lang floating-lang--7">🇰🇷</span>
              <span className="floating-lang floating-lang--8">🇮🇹</span>
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
          <h2>🌍 Popular Languages to Learn</h2>
          <p className="section-subtitle">
            Choose from our most popular language courses and start your journey today
          </p>
          
          <div className="languages-grid">
            {mockLanguages.slice(0, 8).map((language) => (
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
                  <span className={`difficulty-badge difficulty-badge--${language.difficulty}`}>
                    {language.difficulty}
                  </span>
                </div>
              </Card>
            ))}
          </div>

          <div className="languages-cta">
            <Button
              size="large"
              onClick={() => navigate('/languages')}
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                padding: '1rem 2rem',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                border: 'none',
                marginTop: '2rem',
                borderRadius: '25px'
              }}
            >
              🚀 Explore All 27+ Languages
            </Button>
            <p style={{ 
              marginTop: '1rem', 
              color: '#666', 
              fontSize: '0.9rem' 
            }}>
              European • Asian • African • and more!
            </p>
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