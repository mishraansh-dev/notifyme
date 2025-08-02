import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { 
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import toast from 'react-hot-toast';

export type UserRole = 'citizen' | 'org';

export interface UserProfile {
  uid: string;
  email: string;
  name: string;
  role: UserRole;
  orgName?: string;
  createdAt?: any;
}

interface AuthState {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  isAuthenticated: boolean;
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string, role: UserRole, orgName?: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    profile: null,
    loading: true,
    isAuthenticated: false,
  });

  // Fetch user profile from Firestore
  const fetchUserProfile = async (uid: string): Promise<UserProfile | null> => {
    try {
      const userDoc = await getDoc(doc(db, 'users', uid));
      if (userDoc.exists()) {
        return userDoc.data() as UserProfile;
      }
      return null;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
  };

  // Login function
  const login = async (email: string, password: string): Promise<void> => {
    try {
      setAuthState(prev => ({ ...prev, loading: true }));
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const profile = await fetchUserProfile(userCredential.user.uid);
      
      if (!profile) {
        throw new Error('User profile not found');
      }

      setAuthState({
        user: userCredential.user,
        profile,
        loading: false,
        isAuthenticated: true,
      });

      toast.success(`Welcome back, ${profile.name}!`);
    } catch (error: any) {
      setAuthState(prev => ({ ...prev, loading: false }));
      throw new Error(error.message || 'Login failed');
    }
  };

  // Register function
  const register = async (
    email: string, 
    password: string, 
    name: string, 
    role: UserRole,
    orgName?: string
  ): Promise<void> => {
    try {
      setAuthState(prev => ({ ...prev, loading: true }));
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;

      // Create user profile in Firestore
      const userProfile: UserProfile = {
        uid,
        email,
        name,
        role,
        ...(orgName && { orgName }),
        createdAt: new Date(),
      };

      await setDoc(doc(db, 'users', uid), userProfile);

      setAuthState({
        user: userCredential.user,
        profile: userProfile,
        loading: false,
        isAuthenticated: true,
      });

      toast.success(`Welcome to NotifyMe, ${name}!`);
    } catch (error: any) {
      setAuthState(prev => ({ ...prev, loading: false }));
      throw new Error(error.message || 'Registration failed');
    }
  };

  // Logout function
  const logout = async (): Promise<void> => {
    try {
      await signOut(auth);
      setAuthState({
        user: null,
        profile: null,
        loading: false,
        isAuthenticated: false,
      });
      toast.success('Logged out successfully');
    } catch (error: any) {
      throw new Error(error.message || 'Logout failed');
    }
  };

  // Listen to authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const profile = await fetchUserProfile(user.uid);
        setAuthState({
          user,
          profile,
          loading: false,
          isAuthenticated: !!profile,
        });
      } else {
        setAuthState({
          user: null,
          profile: null,
          loading: false,
          isAuthenticated: false,
        });
      }
    });

    return () => unsubscribe();
  }, []);

  const value: AuthContextType = {
    ...authState,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
