import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react';
import { useNotifications } from '../store/useNotifications';

interface ToastNotificationProps {
  className?: string;
}

const ToastNotification: React.FC<ToastNotificationProps> = ({ className }) => {
  const { toasts, removeToast } = useNotifications();

  const getToastIcon = (type: 'info' | 'success' | 'warning' | 'error') => {
    const iconProps = { className: "w-5 h-5 flex-shrink-0" };
    
    switch (type) {
      case 'success':
        return <CheckCircle {...iconProps} className={`${iconProps.className} text-green-400`} />;
      case 'error':
        return <AlertCircle {...iconProps} className={`${iconProps.className} text-red-400`} />;
      case 'warning':
        return <AlertTriangle {...iconProps} className={`${iconProps.className} text-yellow-400`} />;
      default:
        return <Info {...iconProps} className={`${iconProps.className} text-blue-400`} />;
    }
  };

  const getToastStyles = (type: 'info' | 'success' | 'warning' | 'error') => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'error':
        return 'bg-red-50 border-red-200 text-red-800';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      default:
        return 'bg-blue-50 border-blue-200 text-blue-800';
    }
  };

  const getProgressBarColor = (type: 'info' | 'success' | 'warning' | 'error') => {
    switch (type) {
      case 'success':
        return 'bg-green-400';
      case 'error':
        return 'bg-red-400';
      case 'warning':
        return 'bg-yellow-400';
      default:
        return 'bg-blue-400';
    }
  };

  return (
    <div className={`fixed bottom-4 right-4 z-50 space-y-2 ${className || ''}`}>
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 300, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 300, scale: 0.8 }}
            transition={{ 
              type: "spring", 
              stiffness: 400, 
              damping: 25,
              duration: 0.3
            }}
            layout
            className={`
              max-w-sm w-full rounded-lg shadow-lg border-l-4 p-4 relative overflow-hidden
              ${getToastStyles(toast.type)}
            `}
            role="alert"
            aria-live="polite"
          >
            <div className="flex items-start space-x-3">
              {/* Icon */}
              <div className="flex-shrink-0 mt-0.5">
                {getToastIcon(toast.type)}
              </div>
              
              {/* Content */}
              <div className="flex-1 min-w-0">
                {toast.title && (
                  <h4 className="text-sm font-semibold mb-1">
                    {toast.title}
                  </h4>
                )}
                <p className="text-sm break-words">
                  {toast.message}
                </p>
              </div>
              
              {/* Close Button */}
              <button
                onClick={() => removeToast(toast.id)}
                className="flex-shrink-0 ml-2 p-1 rounded-full opacity-70 hover:opacity-100 transition-opacity focus:outline-none focus:ring-2 focus:ring-current focus:ring-offset-2"
                aria-label="Close notification"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            {/* Progress Bar */}
            {toast.duration && toast.duration > 0 && (
              <div className="absolute bottom-0 left-0 w-full h-1 bg-black bg-opacity-10">
                <motion.div
                  initial={{ width: "100%" }}
                  animate={{ width: "0%" }}
                  transition={{ 
                    duration: toast.duration / 1000, 
                    ease: "linear" 
                  }}
                  className={`h-full rounded-r-full ${getProgressBarColor(toast.type)}`}
                />
              </div>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ToastNotification;

/*
SAMPLE USAGE:

1. Import the hook:
```typescript
import { useToast } from '../store/useNotifications';
```

2. Use in your component:
```typescript
const { toast } = useToast();

// Success toast
toast.success('Profile updated successfully!', 'Success');

// Error toast
toast.error('Failed to save changes. Please try again.', 'Error');

// Warning toast
toast.warning('This action cannot be undone.', 'Warning');

// Info toast
toast.info('New features are available!', 'Info');

// Custom duration (default is 5000ms)
import { useNotifications } from '../store/useNotifications';
const { addToast } = useNotifications();
addToast({
  message: 'This will disappear in 10 seconds',
  type: 'info',
  duration: 10000
});
```

3. Add ToastNotification to your root component (App.tsx or Layout):
```typescript
import ToastNotification from './components/ToastNotification';

function App() {
  return (
    <div className="App">
      {/* Your app content */}
      <ToastNotification />
    </div>
  );
}
```

4. Real-time feedback examples:

// After submitting a notice
const handleSubmitNotice = async (data) => {
  try {
    await submitNotice(data);
    toast.success('Notice submitted successfully!');
  } catch (error) {
    toast.error('Failed to submit notice. Please try again.');
  }
};

// When a new notification is received
useEffect(() => {
  const unsubscribe = subscribeToNotifications((newNotification) => {
    addNotification(newNotification);
    toast.info(`New ${newNotification.type}: ${newNotification.title}`);
  });
  
  return unsubscribe;
}, []);

// Admin actions
const handleApproveNotice = async (id) => {
  try {
    await approveNotice(id);
    toast.success('Notice approved successfully!');
  } catch (error) {
    toast.error('Failed to approve notice.');
  }
};
*/
