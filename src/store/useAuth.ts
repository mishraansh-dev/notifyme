import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type UserRole = 'user' | 'org' | null;

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
        if (!role) return;
        
        const defaultUser = {
          id: role === 'user' ? 'user-123' : 'org-456',
          name: role === 'user' ? 'John Doe' : 'Community Management',
          email: role === 'user' ? 'john@example.com' : 'admin@community.com',
        };

        set({
          isAuthenticated: true,
          role,
          user: userData || defaultUser,
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
