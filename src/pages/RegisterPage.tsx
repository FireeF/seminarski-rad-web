import React, { useState, useCallback } from 'react';
import { useAppContext } from '../context/AppContext';
import { usePageNavigation } from '../hooks/usePageNavigation';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { User } from '../models/User';

const RegisterPage: React.FC = () => {
  const { setUser } = useAppContext();
  const { navigate } = usePageNavigation();
  
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    // Get existing users from localStorage
    const storedUsersString = localStorage.getItem('users');
    const storedUsers = storedUsersString ? JSON.parse(storedUsersString) : [];

    // Check if username already exists
    const existingUser = storedUsers.find((user: any) => user.username === username);
    if (existingUser) {
      setError('Username already exists');
      return;
    }

    // Create new user
    const newUser = new User(
      Date.now().toString(),
      username,
      email
    );

    const userData = {
      ...newUser.export(),
      password: password // In real app, this would be hashed
    };

    // Save to localStorage
    const updatedUsers = [...storedUsers, userData];
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setUser(newUser.export());
    localStorage.setItem('currentUser', JSON.stringify(newUser.export()));

    navigate('/');
  }, [username, email, password, confirmPassword, setUser, navigate]);

  return (
    <div className="register-page">
      <div className="container">
        <div style={{ maxWidth: '400px', margin: '2rem auto' }}>
          <Card title="Create Account">
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
                <label style={{ display: 'block', marginBottom: '0.5rem' }}>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
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
                  autoComplete="new-password"
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
                <label style={{ display: 'block', marginBottom: '0.5rem' }}>Confirm Password:</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  autoComplete="new-password"
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
                Create Account
              </Button>
            </form>

            <div style={{ textAlign: 'center', marginTop: '1rem' }}>
              <p>Already have an account?</p>
              <Button variant="outline" onClick={() => navigate('/login')}>
                Sign In
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;