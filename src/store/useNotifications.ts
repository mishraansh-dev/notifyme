import { create } from 'zustand';
import { Notification, ToastNotification } from '../types';

interface NotificationStore {
  // Notifications state
  notifications: Notification[];
  unreadCount: number;
  isDropdownOpen: boolean;
  
  // Toast state
  toasts: ToastNotification[];
  
  // Notification actions
  addNotification: (notification: Omit<Notification, 'id'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  setDropdownOpen: (isOpen: boolean) => void;
  fetchNotifications: () => void;
  
  // Toast actions
  addToast: (toast: Omit<ToastNotification, 'id' | 'isVisible'>) => void;
  removeToast: (id: string) => void;
  clearToasts: () => void;
}

export const useNotifications = create<NotificationStore>((set, get) => ({
  // Initial state
  notifications: [],
  unreadCount: 0,
  isDropdownOpen: false,
  toasts: [],
  
  // Notification actions
  addNotification: (notification) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
    };
    
    set((state) => ({
      notifications: [newNotification, ...state.notifications],
      unreadCount: state.unreadCount + 1,
    }));
  },
  
  markAsRead: (id) => {
    set((state) => {
      const updatedNotifications = state.notifications.map((notification) =>
        notification.id === id 
          ? { ...notification, isRead: true }
          : notification
      );
      
      const unreadCount = updatedNotifications.filter(n => !n.isRead).length;
      
      return {
        notifications: updatedNotifications,
        unreadCount,
      };
    });
  },
  
  markAllAsRead: () => {
    set((state) => ({
      notifications: state.notifications.map((notification) => ({
        ...notification,
        isRead: true,
      })),
      unreadCount: 0,
    }));
  },
  
  setDropdownOpen: (isOpen) => {
    set({ isDropdownOpen: isOpen });
  },
  
  fetchNotifications: async () => {
    try {
      // Simulate API call - replace with actual API
      const mockNotifications: Notification[] = [
        {
          id: '1',
          title: 'Maintenance Notice',
          description: 'Water supply will be interrupted tomorrow from 9 AM to 2 PM',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
          type: 'warning',
          isRead: false,
          actionUrl: '/notices/1',
        },
        {
          id: '2',
          title: 'New Community Event',
          description: 'Annual Sports Day registration is now open!',
          timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
          type: 'info',
          isRead: false,
          actionUrl: '/events/2',
        },
        {
          id: '3',
          title: 'Security Update',
          description: 'New security cameras installed in parking area',
          timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
          type: 'success',
          isRead: true,
        },
      ];
      
      const unreadCount = mockNotifications.filter(n => !n.isRead).length;
      
      set({
        notifications: mockNotifications,
        unreadCount,
      });
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
      // Add error toast
      get().addToast({
        message: 'Failed to load notifications',
        type: 'error',
      });
    }
  },
  
  // Toast actions
  addToast: (toast) => {
    const newToast: ToastNotification = {
      ...toast,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      isVisible: true,
      duration: toast.duration || 5000,
    };
    
    set((state) => ({
      toasts: [...state.toasts, newToast],
    }));
    
    // Auto-remove toast after duration
    if (newToast.duration && newToast.duration > 0) {
      setTimeout(() => {
        get().removeToast(newToast.id);
      }, newToast.duration);
    }
  },
  
  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    }));
  },
  
  clearToasts: () => {
    set({ toasts: [] });
  },
}));

// Helper hook for easy toast creation
export const useToast = () => {
  const addToast = useNotifications((state) => state.addToast);
  
  return {
    toast: {
      success: (message: string, title?: string) => 
        addToast({ message, title, type: 'success' }),
      error: (message: string, title?: string) => 
        addToast({ message, title, type: 'error' }),
      warning: (message: string, title?: string) => 
        addToast({ message, title, type: 'warning' }),
      info: (message: string, title?: string) => 
        addToast({ message, title, type: 'info' }),
    },
  };
};
