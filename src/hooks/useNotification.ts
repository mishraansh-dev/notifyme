import { useToast, UseToastOptions } from '@chakra-ui/react';
import { useCallback } from 'react';

export interface NotificationOptions {
  title: string;
  description?: string;
  status?: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  isClosable?: boolean;
  position?: 'top' | 'top-left' | 'top-right' | 'bottom' | 'bottom-left' | 'bottom-right';
}

export const useNotification = () => {
  const toast = useToast();

  const showNotification = useCallback((options: NotificationOptions) => {
    const {
      title,
      description,
      status = 'info',
      duration = 5000,
      isClosable = true,
      position = 'top-right',
    } = options;

    toast({
      title,
      description,
      status,
      duration,
      isClosable,
      position,
    });
  }, [toast]);

  const showSuccess = useCallback((title: string, description?: string) => {
    showNotification({
      title,
      description,
      status: 'success',
    });
  }, [showNotification]);

  const showError = useCallback((title: string, description?: string) => {
    showNotification({
      title,
      description,
      status: 'error',
    });
  }, [showNotification]);

  const showWarning = useCallback((title: string, description?: string) => {
    showNotification({
      title,
      description,
      status: 'warning',
    });
  }, [showNotification]);

  const showInfo = useCallback((title: string, description?: string) => {
    showNotification({
      title,
      description,
      status: 'info',
    });
  }, [showNotification]);

  return {
    showNotification,
    showSuccess,
    showError,
    showWarning,
    showInfo,
  };
};

// Predefined notification messages
export const NOTIFICATION_MESSAGES = {
  LOGIN_SUCCESS: {
    title: 'Welcome back!',
    description: 'You have successfully logged in.',
    status: 'success' as const,
  },
  LOGIN_ERROR: {
    title: 'Login failed',
    description: 'Please check your credentials and try again.',
    status: 'error' as const,
  },
  REGISTER_SUCCESS: {
    title: 'Account created!',
    description: 'Welcome to NotifyMe. You can now start using the platform.',
    status: 'success' as const,
  },
  REGISTER_ERROR: {
    title: 'Registration failed',
    description: 'Please check your information and try again.',
    status: 'error' as const,
  },
  LOGOUT_SUCCESS: {
    title: 'Logged out',
    description: 'You have been successfully logged out.',
    status: 'info' as const,
  },
  NOTICE_CREATED: {
    title: 'Notice posted!',
    description: 'Your notice has been successfully posted to the community.',
    status: 'success' as const,
  },
  NOTICE_ERROR: {
    title: 'Failed to post notice',
    description: 'Please try again or contact support.',
    status: 'error' as const,
  },
  REPORT_SUBMITTED: {
    title: 'Report submitted',
    description: 'Your report has been submitted successfully. You will receive updates via email.',
    status: 'success' as const,
  },
  REPORT_ERROR: {
    title: 'Failed to submit report',
    description: 'Please try again or contact support.',
    status: 'error' as const,
  },
  PROFILE_UPDATED: {
    title: 'Profile updated',
    description: 'Your profile information has been saved successfully.',
    status: 'success' as const,
  },
  GENERIC_ERROR: {
    title: 'Something went wrong',
    description: 'Please try again or contact support if the problem persists.',
    status: 'error' as const,
  },
};
