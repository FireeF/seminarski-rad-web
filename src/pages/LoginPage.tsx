import React, { useState, useEffect, useCallback } from 'react';
import { useAppContext } from '../context/AppContext';
import { usePageNavigation } from '../hooks/usePageNavigation';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { User } from '../models/User';

const LoginPage: React.FC = () => {
  const { setUser } = useAppContext();
  const { navigate } = usePageNavigation();
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Get users from localStorage
    const storedUsersString = localStorage.getItem('users');
    const storedUsers = storedUsersString ? JSON.parse(storedUsersString) : [];

    // Simple authentication - check against stored users
    const foundUser = storedUsers.find(
      (user: any) => user.username === username && user.password === password
    );

    if (foundUser) {
      const user = new User(
        foundUser.id,
        foundUser.username,
        foundUser.email,
        foundUser.currentLanguage
      );
      user.currentScore = foundUser.currentScore || 0;
      user.totalScore = foundUser.totalScore || 0;
      user.streak = foundUser.streak || 0;
      user.completedLessons = foundUser.completedLessons || [];
      user.achievements = foundUser.achievements || user.achievements;
      
      setUser(user.export());
      localStorage.setItem('currentUser', JSON.stringify(user.export()));
      navigate('/');
    } else {
      setError('Invalid username or password');
    }
  }, [username, password, setUser, navigate]);

  return (
    <div className="login-page">
      <div className="container">
        <div style={{ maxWidth: '400px', margin: '2rem auto' }}>
          <Card title="Sign In">
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem' }}>Username:</label>
                <input
                  type="text"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  autoComplete="username"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '1rem'
                  }}
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem' }}>Password:</label>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '1rem'
                  }}
                />
              </div>

              {error && (
                <div style={{ 
                  color: '#ea4335', 
                  marginBottom: '1rem',
                  padding: '0.5rem',
                  backgroundColor: '#fce8e6',
                  borderRadius: '4px'
                }}>
                  {error}
                </div>
              )}

              <Button type="submit" fullWidth>
                Sign In
              </Button>
            </form>

            <div style={{ textAlign: 'center', marginTop: '1rem' }}>
              <p>Don't have an account?</p>
              <Button variant="outline" onClick={() => navigate('/register')}>
                Create Account
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;