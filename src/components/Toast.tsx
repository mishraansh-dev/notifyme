import React, { useEffect } from 'react';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  autoClose?: number;
  show: boolean;
  onClose: () => void;
  className?: string;
}

const Toast: React.FC<ToastProps> = ({ 
  message, 
  type, 
  autoClose = 3000, 
  show, 
  onClose, 
  className 
}) => {
  useEffect(() => {
    if (!show) return;

    const timer = setTimeout(() => {
      onClose();
    }, autoClose);

    return () => clearTimeout(timer);
  }, [show, autoClose, onClose]);

  if (!show) return null;

  const getIcon = () => {
    if (type === 'success') {
      return (
        <svg
          className="w-5 h-5 mr-3 flex-shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      );
    } else {
      return (
        <svg
          className="w-5 h-5 mr-3 flex-shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      );
    }
  };

  const getBackgroundColor = () => {
    return type === 'success' 
      ? 'bg-green-500 border-green-600' 
      : 'bg-red-500 border-red-600';
  };

  return (
    <div
      className={`fixed bottom-4 right-4 z-50 max-w-sm w-full text-white px-4 py-3 rounded-lg shadow-lg border-l-4 transform transition-all duration-300 ease-in-out animate-slide-up ${
        getBackgroundColor()
      } ${className || ''}`}
      role="alert"
    >
      <div className="flex items-start">
        {getIcon()}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium break-words">{message}</p>
        </div>
        <button
          onClick={onClose}
          className="ml-3 flex-shrink-0 text-white hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 rounded-full p-1 transition-colors"
          aria-label="Close notification"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      
      {/* Progress bar */}
      {autoClose > 0 && (
        <div className="mt-2 bg-white bg-opacity-20 rounded-full h-1 overflow-hidden">
          <div 
            className="bg-white h-1 rounded-full animate-progress"
            style={{
              animation: `progress ${autoClose}ms linear forwards`
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Toast;
