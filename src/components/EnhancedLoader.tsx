import React from 'react';

export interface LoaderProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: 'primary' | 'secondary' | 'white' | 'gray' | 'blue' | 'green' | 'red';
  type?: 'spinner' | 'dots' | 'pulse' | 'bars';
  className?: string;
}

const EnhancedLoader: React.FC<LoaderProps> = ({
  size = 'md',
  color = 'primary',
  type = 'spinner',
  className = '',
}) => {
  const getSizeClasses = () => {
    switch (size) {
      case 'xs': return 'w-3 h-3';
      case 'sm': return 'w-4 h-4';
      case 'md': return 'w-6 h-6';
      case 'lg': return 'w-8 h-8';
      case 'xl': return 'w-12 h-12';
      default: return 'w-6 h-6';
    }
  };

  const getColorClasses = () => {
    switch (color) {
      case 'primary': return 'text-primary-600 border-primary-600';
      case 'secondary': return 'text-secondary-600 border-secondary-600';
      case 'white': return 'text-white border-white';
      case 'gray': return 'text-gray-600 border-gray-600';
      case 'blue': return 'text-blue-600 border-blue-600';
      case 'green': return 'text-green-600 border-green-600';
      case 'red': return 'text-red-600 border-red-600';
      default: return 'text-primary-600 border-primary-600';
    }
  };

  const sizeClasses = getSizeClasses();
  const colorClasses = getColorClasses();

  const renderSpinner = () => (
    <div
      className={`${sizeClasses} ${colorClasses} border-2 border-t-transparent rounded-full animate-spin ${className}`}
      role="status"
      aria-label="Loading"
    />
  );

  const renderDots = () => (
    <div className={`flex space-x-1 ${className}`} role="status" aria-label="Loading">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={`${sizeClasses} ${colorClasses} rounded-full animate-pulse`}
          style={{
            animationDelay: `${i * 0.3}s`,
            animationDuration: '1.4s',
          }}
        />
      ))}
    </div>
  );

  const renderPulse = () => (
    <div
      className={`${sizeClasses} ${colorClasses} bg-current rounded-full animate-pulse ${className}`}
      role="status"
      aria-label="Loading"
    />
  );

  const renderBars = () => (
    <div className={`flex space-x-1 ${className}`} role="status" aria-label="Loading">
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          className={`w-1 ${colorClasses} bg-current animate-pulse`}
          style={{
            height: size === 'xs' ? '12px' : size === 'sm' ? '16px' : size === 'md' ? '24px' : size === 'lg' ? '32px' : '48px',
            animationDelay: `${i * 0.2}s`,
            animationDuration: '1.2s',
          }}
        />
      ))}
    </div>
  );

  switch (type) {
    case 'dots': return renderDots();
    case 'pulse': return renderPulse();
    case 'bars': return renderBars();
    case 'spinner':
    default: return renderSpinner();
  }
};

// Skeleton component for loading states
export const SkeletonLoader: React.FC<{
  className?: string;
  lines?: number;
  avatar?: boolean;
}> = ({ className = '', lines = 3, avatar = false }) => (
  <div className={`animate-pulse ${className}`}>
    {avatar && (
      <div className="flex items-center space-x-4 mb-4">
        <div className="rounded-full bg-gray-300 h-10 w-10"></div>
        <div className="space-y-2 flex-1">
          <div className="h-4 bg-gray-300 rounded w-1/4"></div>
          <div className="h-3 bg-gray-300 rounded w-1/3"></div>
        </div>
      </div>
    )}
    <div className="space-y-3">
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={`h-4 bg-gray-300 rounded ${
            i === lines - 1 ? 'w-2/3' : 'w-full'
          }`}
        />
      ))}
    </div>
  </div>
);

// Full page loader
export const FullPageLoader: React.FC<{
  message?: string;
}> = ({ message = 'Loading...' }) => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center">
      <EnhancedLoader size="xl" className="mx-auto mb-4" />
      <p className="text-gray-600 text-lg">{message}</p>
    </div>
  </div>
);

export default EnhancedLoader;
