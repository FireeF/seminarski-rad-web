import React from 'react';
import './Card.css';

interface CardProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  image?: string;
  imageAlt?: string;
  onClick?: () => void;
  className?: string;
  variant?: 'default' | 'elevated' | 'outlined' | 'filled';
  size?: 'small' | 'medium' | 'large';
  hoverable?: boolean;
  loading?: boolean;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  style?: React.CSSProperties;
}

export const Card: React.FC<CardProps> = ({
  children,
  title,
  subtitle,
  image,
  imageAlt,
  onClick,
  className = '',
  variant = 'default',
  size = 'medium',
  hoverable = false,
  loading = false,
  header,
  footer,
  style
}) => {
  const cardClasses = [
    'card',
    `card--${variant}`,
    `card--${size}`,
    hoverable || onClick ? 'card--hoverable' : '',
    loading ? 'card--loading' : '',
    className
  ].filter(Boolean).join(' ');

  const handleClick = () => {
    if (onClick && !loading) {
      onClick();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (onClick && (event.key === 'Enter' || event.key === ' ') && !loading) {
      event.preventDefault();
      onClick();
    }
  };

  const CardContent = () => (
    <>
      {loading && (
        <div className="card__loading">
          <div className="card__loading-spinner"></div>
        </div>
      )}

      {image && (
        <div className="card__image-container">
          <img
            src={image}
            alt={imageAlt || title || 'Card image'}
            className="card__image"
            loading="lazy"
          />
        </div>
      )}

      {header && (
        <div className="card__header">
          {header}
        </div>
      )}

      <div className="card__content">
        {(title || subtitle) && (
          <div className="card__title-section">
            {title && <h3 className="card__title">{title}</h3>}
            {subtitle && <p className="card__subtitle">{subtitle}</p>}
          </div>
        )}
        
        <div className="card__body">
          {children}
        </div>
      </div>

      {footer && (
        <div className="card__footer">
          {footer}
        </div>
      )}
    </>
  );

  if (onClick) {
    return (
      <div
        className={cardClasses}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
        aria-disabled={loading}
        style={style}
      >
        <CardContent />
      </div>
    );
  }

  return (
    <div className={cardClasses} style={style}>
      <CardContent />
    </div>
  );
}; 