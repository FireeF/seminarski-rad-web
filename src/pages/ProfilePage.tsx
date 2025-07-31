import React, { useState, useMemo } from 'react';
import { useAppContext } from '../context/AppContext';
import { usePageNavigation } from '../hooks/usePageNavigation';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';

const ProfilePage: React.FC = () => {
  const { state } = useAppContext();
  const { navigate } = usePageNavigation();
  const [achievementFilter, setAchievementFilter] = useState<'all' | 'unlocked' | 'locked'>('all');
  const [sortAchievements, setSortAchievements] = useState<'name' | 'progress' | 'points'>('progress');

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

          <Card title="Achievements">
            {/* Achievement Filters */}
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <Button 
                  size="small"
                  variant={achievementFilter === 'all' ? 'primary' : 'outline'}
                  onClick={() => setAchievementFilter('all')}
                >
                  All
                </Button>
                <Button 
                  size="small"
                  variant={achievementFilter === 'unlocked' ? 'primary' : 'outline'}
                  onClick={() => setAchievementFilter('unlocked')}
                >
                  🏆 Unlocked
                </Button>
                <Button 
                  size="small"
                  variant={achievementFilter === 'locked' ? 'primary' : 'outline'}
                  onClick={() => setAchievementFilter('locked')}
                >
                  🔒 Locked
                </Button>
              </div>
              
              <select
                value={sortAchievements}
                onChange={(e) => setSortAchievements(e.target.value as any)}
                style={{
                  padding: '0.25rem 0.5rem',
                  borderRadius: '4px',
                  border: '1px solid #e0e0e0',
                  fontSize: '0.875rem'
                }}
              >
                <option value="progress">Sort by Progress</option>
                <option value="name">Sort by Name</option>
                <option value="points">Sort by Points</option>
              </select>
            </div>

            {state.user.achievements && state.user.achievements.length > 0 ? (
              <div>
                {state.user.achievements
                  .filter(achievement => {
                    if (achievementFilter === 'all') return true;
                    if (achievementFilter === 'unlocked') return achievement.unlocked;
                    return !achievement.unlocked;
                  })
                  .sort((a, b) => {
                    switch (sortAchievements) {
                      case 'name':
                        return a.title.localeCompare(b.title);
                      case 'points':
                        return (b.points || 0) - (a.points || 0);
                      case 'progress':
                      default:
                        return (b.progress || 0) - (a.progress || 0);
                    }
                  })
                  .map((achievement, index) => (
                    <div key={index} style={{ 
                      marginBottom: '0.5rem',
                      padding: '0.5rem',
                      backgroundColor: achievement.unlocked ? '#f0f9ff' : '#f8f8f8',
                      borderRadius: '4px',
                      opacity: achievement.unlocked ? 1 : 0.7
                    }}>
                      <strong>
                        {achievement.unlocked ? '🏆' : '🔒'} {achievement.title}
                      </strong>
                      <p style={{ fontSize: '0.875rem', color: '#666' }}>{achievement.description}</p>
                      {achievement.progress !== undefined && (
                        <div style={{ marginTop: '0.25rem' }}>
                          <div style={{
                            width: '100%',
                            height: '4px',
                            backgroundColor: '#e0e0e0',
                            borderRadius: '2px'
                          }}>
                            <div style={{
                              width: `${achievement.progress}%`,
                              height: '100%',
                              backgroundColor: '#58cc02',
                              borderRadius: '2px'
                            }} />
                          </div>
                          <span style={{ fontSize: '0.75rem', color: '#666' }}>
                            {achievement.progress}% complete
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            ) : (
              <p>No achievements yet. Keep learning!</p>
            )}
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