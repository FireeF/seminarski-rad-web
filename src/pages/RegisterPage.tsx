import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { usePageNavigation } from '../hooks/usePageNavigation';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { User } from '../models/User';

const RegisterPage: React.FC = () => {
  const { setUser } = useAppContext();
  const { navigate } = usePageNavigation();
  const [storedUsers, setStoredUsers] = useLocalStorage<any[]>('users', []);
  
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    // Check if username already exists
    const existingUser = storedUsers.find(user => user.username === formData.username);
    if (existingUser) {
      setError('Username already exists');
      return;
    }

    // Create new user
    const newUser = new User(
      Date.now().toString(),
      formData.username,
      formData.email
    );

    const userData = {
      ...newUser.export(),
      password: formData.password // In real app, this would be hashed
    };

    // Save to localStorage
    setStoredUsers([...storedUsers, userData]);
    setUser(newUser.export());
    localStorage.setItem('currentUser', JSON.stringify(newUser.export()));

    navigate('/');
  };

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
                  value={formData.username}
                  onChange={handleInputChange}
                  required
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
                  value={formData.email}
                  onChange={handleInputChange}
                  required
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
                  value={formData.password}
                  onChange={handleInputChange}
                  required
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
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
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