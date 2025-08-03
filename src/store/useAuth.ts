import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type UserRole = 'user' | 'org' | 'warden' | null;

interface AuthState {
  isAuthenticated: boolean;
  role: UserRole;
  user: {
    id: string;
    name: string;
    email: string;
  } | null;
}

interface AuthActions {
  login: (role: UserRole, userData?: { id: string; name: string; email: string }) => void;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  setUser: (user: { id: string; name: string; email: string }) => void;
}

type AuthStore = AuthState & AuthActions;

export const useAuth = create<AuthStore>()(
  persist(
    (set, get) => ({
      // Initial state
      isAuthenticated: false,
      role: null,
      user: null,

      // Login action
      login: (role: UserRole, userData) => {
        if (!role || !userData) return;
        
        set({
          isAuthenticated: true,
          role,
          user: userData,
        });
      },

      // Register action
      register: async (email: string, password: string, name: string) => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Create new user account
        const userData = {
          id: `user-${Date.now()}`,
          name,
          email,
        };
        
        // Log them in as a regular user
        set({
          isAuthenticated: true,
          role: 'user',
          user: userData,
        });
      },

      // Logout action
      logout: () => {
        set({
          isAuthenticated: false,
          role: null,
          user: null,
        });
      },

      // Set user data
      setUser: (user) => {
        set({ user });
      },
    }),
    {
      name: 'notifyme-auth', // Key for localStorage
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        role: state.role,
        user: state.user,
      }),
    }
  )
);

// Helper functions
export const useIsAuthenticated = () => useAuth((state) => state.isAuthenticated);
export const useUserRole = () => useAuth((state) => state.role);
export const useCurrentUser = () => useAuth((state) => state.user);

// Role-based helper functions
export const useIsUser = () => useAuth((state) => state.role === 'user');
export const useIsOrg = () => useAuth((state) => state.role === 'org');

// Protected route helper
export const useCanAccess = (requiredRole?: UserRole) => {
  const { isAuthenticated, role } = useAuth();
  
  if (!isAuthenticated) return false;
  if (!requiredRole) return true;
  
  return role === requiredRole;
};
