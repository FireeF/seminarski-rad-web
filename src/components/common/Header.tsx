import React, { useState } from 'react';
import { usePageNavigation } from '../../hooks/usePageNavigation';
import { useAppContext } from '../../context/AppContext';
import { Button } from './Button';
import './Header.css';

interface HeaderProps {
  title?: string;
  showUser?: boolean;
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({
  title = 'LinguaLearn',
  showUser = true,
  className = ''
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { navigate, isCurrentRoute } = usePageNavigation();
  const { state, resetState } = useAppContext();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    closeMenu();
  };

  const handleLogout = () => {
    resetState();
    localStorage.removeItem('currentUser');
    navigate('/');
    closeMenu();
  };

  const navigationItems = [
    { path: '/', label: 'Home' },
    { path: '/languages', label: 'Languages' },
    { path: '/profile', label: 'Profile' },
    { path: '/leaderboard', label: 'Leaderboard' }
  ];

  const headerClasses = [
    'header',
    className
  ].filter(Boolean).join(' ');

  return (
    <header className={headerClasses}>
      <div className="header__container">
        {/* Logo/Title */}
        <div className="header__brand">
          <button 
            className="header__logo"
            onClick={() => handleNavigation('/')}
            aria-label="Go to home"
          >
            <span className="header__logo-icon">🌍</span>
            <span className="header__logo-text">{title}</span>
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className="header__nav header__nav--desktop">
          <ul className="header__nav-list">
            {navigationItems.map((item) => (
              <li key={item.path} className="header__nav-item">
                <button
                  className={`header__nav-link ${
                    isCurrentRoute(item.path) ? 'header__nav-link--active' : ''
                  }`}
                  onClick={() => handleNavigation(item.path)}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* User Section */}
        {showUser && (
          <div className="header__user">
            {state.user ? (
              <div className="header__user-info">
                <div className="header__user-details">
                  <span className="header__username">{state.user.username}</span>
                  <span className="header__score">
                    {state.user.currentScore} pts
                  </span>
                  {state.user.streak > 0 && (
                    <span className="header__streak">
                      🔥 {state.user.streak}
                    </span>
                  )}
                </div>
                <Button
                  variant="outline"
                  size="small"
                  onClick={handleLogout}
                  className="header__logout-btn"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div className="header__auth-buttons">
                <Button
                  variant="outline"
                  size="small"
                  onClick={() => handleNavigation('/login')}
                >
                  Login
                </Button>
                <Button
                  variant="primary"
                  size="small"
                  onClick={() => handleNavigation('/register')}
                >
                  Sign Up
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Mobile Menu Button */}
        <button
          className="header__menu-toggle"
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <span className="header__menu-icon">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="header__mobile-menu">
          <nav className="header__nav header__nav--mobile">
            <ul className="header__nav-list">
              {navigationItems.map((item) => (
                <li key={item.path} className="header__nav-item">
                  <button
                    className={`header__nav-link ${
                      isCurrentRoute(item.path) ? 'header__nav-link--active' : ''
                    }`}
                    onClick={() => handleNavigation(item.path)}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>

            {state.user && (
              <div className="header__mobile-user">
                <div className="header__user-details">
                  <span className="header__username">{state.user.username}</span>
                  <span className="header__score">
                    Score: {state.user.currentScore}
                  </span>
                </div>
                <Button
                  variant="outline"
                  size="small"
                  onClick={handleLogout}
                  fullWidth
                >
                  Logout
                </Button>
              </div>
            )}
          </nav>
        </div>
      )}

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div 
          className="header__overlay"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}
    </header>
  );
}; 