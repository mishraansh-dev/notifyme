import React from 'react';

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'primary' | 'secondary' | 'white' | 'gray';
  className?: string;
  text?: string;
  fullScreen?: boolean;
}

const Loader: React.FC<LoaderProps> = ({
  size = 'md',
  color = 'primary',
  className,
  text,
  fullScreen = false,
}) => {
  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'h-4 w-4';
      case 'md':
        return 'h-8 w-8';
      case 'lg':
        return 'h-12 w-12';
      case 'xl':
        return 'h-16 w-16';
      default:
        return 'h-8 w-8';
    }
  };

  const getColorClasses = () => {
    switch (color) {
      case 'primary':
        return 'text-primary-600';
      case 'secondary':
        return 'text-secondary-600';
      case 'white':
        return 'text-white';
      case 'gray':
        return 'text-gray-600';
      default:
        return 'text-primary-600';
    }
  };

  const getTextSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'text-sm';
      case 'md':
        return 'text-base';
      case 'lg':
        return 'text-lg';
      case 'xl':
        return 'text-xl';
      default:
        return 'text-base';
    }
  };

  const spinnerElement = (
    <div
      className={`inline-block animate-spin rounded-full border-2 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite] ${getSizeClasses()} ${getColorClasses()}`}
      role="status"
      aria-label="Loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );

  const content = (
    <div className={`flex flex-col items-center justify-center space-y-2 ${className || ''}`}>
      {spinnerElement}
      {text && (
        <p className={`font-medium ${getColorClasses()} ${getTextSizeClasses()}`}>
          {text}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-80 backdrop-blur-sm z-50 flex items-center justify-center">
        {content}
      </div>
    );
  }

  return content;
};

// Additional loader variants for specific use cases
export const InlineLoader: React.FC<{
  size?: 'sm' | 'md';
  color?: 'primary' | 'secondary' | 'white' | 'gray';
  className?: string;
}> = ({ size = 'sm', color = 'primary', className }) => (
  <div className={`inline-flex items-center ${className || ''}`}>
    <Loader size={size} color={color} />
  </div>
);

export const ButtonLoader: React.FC<{
  size?: 'sm' | 'md';
  color?: 'white' | 'primary';
  className?: string;
}> = ({ size = 'sm', color = 'white', className }) => (
  <Loader size={size} color={color} className={`mr-2 ${className || ''}`} />
);

export const PageLoader: React.FC<{
  text?: string;
  className?: string;
}> = ({ text = 'Loading...', className }) => (
  <div className={`flex items-center justify-center min-h-[200px] ${className || ''}`}>
    <Loader size="lg" text={text} />
  </div>
);

// Skeleton loader for content placeholders
export const SkeletonLoader: React.FC<{
  lines?: number;
  className?: string;
}> = ({ lines = 3, className }) => (
  <div className={`animate-pulse space-y-3 ${className || ''}`}>
    {Array.from({ length: lines }).map((_, index) => (
      <div key={index} className="space-y-2">
        <div className="h-4 bg-gray-300 rounded w-full"></div>
        {index === lines - 1 && (
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        )}
      </div>
    ))}
  </div>
);

// Card skeleton loader
export const CardSkeletonLoader: React.FC<{
  className?: string;
}> = ({ className }) => (
  <div className={`animate-pulse bg-white rounded-lg shadow-md border border-gray-200 p-4 sm:p-6 ${className || ''}`}>
    <div className="flex justify-between items-start mb-3">
      <div className="h-6 bg-gray-300 rounded w-3/4"></div>
      <div className="h-6 bg-gray-300 rounded w-16"></div>
    </div>
    <div className="space-y-2 mb-4">
      <div className="h-4 bg-gray-300 rounded w-full"></div>
      <div className="h-4 bg-gray-300 rounded w-5/6"></div>
      <div className="h-4 bg-gray-300 rounded w-4/6"></div>
    </div>
    <div className="border-t border-gray-100 pt-3">
      <div className="flex justify-between">
        <div className="h-4 bg-gray-300 rounded w-20"></div>
        <div className="h-4 bg-gray-300 rounded w-24"></div>
      </div>
    </div>
  </div>
);

export default Loader;
