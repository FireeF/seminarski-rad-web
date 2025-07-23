import React from 'react';
import { useAppContext } from '../context/AppContext';
import { usePageNavigation } from '../hooks/usePageNavigation';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';

const ProfilePage: React.FC = () => {
  const { state } = useAppContext();
  const { navigate } = usePageNavigation();

  if (!state.user) {
    return (
      <div className="profile-page">
        <div className="container">
          <Card title="Not Logged In">
            <p>Please log in to view your profile.</p>
            <Button onClick={() => navigate('/login')}>Login</Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="container">
        <h1>Your Profile</h1>
        
        <div className="profile-grid">
          <Card title="User Information">
            <p><strong>Username:</strong> {state.user.username}</p>
            <p><strong>Email:</strong> {state.user.email}</p>
            <p><strong>Member since:</strong> {state.user.joinedDate.toLocaleDateString()}</p>
            <p><strong>Current Language:</strong> {state.user.currentLanguage || 'None selected'}</p>
          </Card>

          <Card title="Score & Progress">
            <p><strong>Current Score:</strong> {state.user.currentScore} points</p>
            <p><strong>Total Score:</strong> {state.user.totalScore} points</p>
            <p><strong>Level:</strong> {Math.floor(state.user.totalScore / 1000) + 1}</p>
            <p><strong>Streak:</strong> {state.user.streak} days 🔥</p>
          </Card>

          <Card title="Learning Progress">
            <p><strong>Lessons Completed:</strong> {state.user.completedLessons.length}</p>
            <div style={{ marginTop: '1rem' }}>
              <h4>Completed Lessons:</h4>
              {state.user.completedLessons.length > 0 ? (
                <ul>
                  {state.user.completedLessons.map((lessonId, index) => (
                    <li key={index}>{lessonId}</li>
                  ))}
                </ul>
              ) : (
                <p>No lessons completed yet.</p>
              )}
            </div>
          </Card>
        </div>

        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <Button onClick={() => navigate('/languages')}>
            Continue Learning
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage; 