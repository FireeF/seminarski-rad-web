import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { mockLeaderboard } from '../utils/mockData';

const LeaderboardPage: React.FC = () => {
  const { state } = useAppContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState<string>('all');
  const itemsPerPage = 5;

  const filteredLeaderboard = mockLeaderboard.filter(entry => 
    filter === 'all' || entry.language.toLowerCase() === filter.toLowerCase()
  );

  const totalPages = Math.ceil(filteredLeaderboard.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredLeaderboard.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    setCurrentPage(1); // Reset to first page when filter changes
  }, [filter]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="leaderboard-page">
      <div className="container">
        <h1>🏆 Leaderboard</h1>
        
        <div className="filters" style={{ marginBottom: '2rem', textAlign: 'center' }}>
          <Button 
            variant={filter === 'all' ? 'primary' : 'outline'}
            onClick={() => setFilter('all')}
            style={{ margin: '0 0.25rem' }}
          >
            All Languages
          </Button>
          <Button 
            variant={filter === 'english' ? 'primary' : 'outline'}
            onClick={() => setFilter('english')}
            style={{ margin: '0 0.25rem' }}
          >
            English
          </Button>
          <Button 
            variant={filter === 'german' ? 'primary' : 'outline'}
            onClick={() => setFilter('german')}
            style={{ margin: '0 0.25rem' }}
          >
            German
          </Button>
          <Button 
            variant={filter === 'french' ? 'primary' : 'outline'}
            onClick={() => setFilter('french')}
            style={{ margin: '0 0.25rem' }}
          >
            French
          </Button>
          <Button 
            variant={filter === 'spanish' ? 'primary' : 'outline'}
            onClick={() => setFilter('spanish')}
            style={{ margin: '0 0.25rem' }}
          >
            Spanish
          </Button>
        </div>

        <div className="leaderboard-list">
          {currentItems.map((entry) => (
            <Card 
              key={`${entry.rank}-${entry.username}`}
              className={`leaderboard-entry ${
                state.user?.username === entry.username ? 'current-user' : ''
              }`}
              style={{ marginBottom: '1rem' }}
            >
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center' 
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div className="rank-badge" style={{ 
                    fontSize: '1.5rem', 
                    fontWeight: 'bold',
                    color: entry.rank <= 3 ? '#gold' : '#333'
                  }}>
                    #{entry.rank}
                  </div>
                  <div>
                    <h3 style={{ margin: 0 }}>{entry.username}</h3>
                    <p style={{ margin: 0, color: '#666' }}>{entry.language}</p>
                  </div>
                </div>
                
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#4285f4' }}>
                    {entry.score.toLocaleString()} pts
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#666' }}>
                    🔥 {entry.streak} day streak
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="pagination" style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '0.5rem',
            marginTop: '2rem' 
          }}>
            <Button
              variant="outline"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            
            {Array.from({ length: totalPages }, (_, i) => (
              <Button
                key={i + 1}
                variant={currentPage === i + 1 ? 'primary' : 'outline'}
                onClick={() => handlePageChange(i + 1)}
              >
                {i + 1}
              </Button>
            ))}
            
            <Button
              variant="outline"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        )}

        <div style={{ 
          textAlign: 'center', 
          marginTop: '2rem',
          padding: '1rem',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px'
        }}>
          <p>
            Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredLeaderboard.length)} 
            of {filteredLeaderboard.length} entries
          </p>
          {state.user && (
            <p>
              Your current score: {state.user.totalScore} points
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage; 