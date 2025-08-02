import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth, UserRole } from '../context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactElement;
  role?: UserRole;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, role }) => {
  const { isAuthenticated, profile, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (role && profile?.role !== role) {
    // Redirect to appropriate dashboard based on user's actual role
    const redirectPath = profile?.role === 'org' ? '/org-panel' : '/dashboard';
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

export default ProtectedRoute;

// Public route that redirects authenticated users
export const PublicRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const { isAuthenticated, profile, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (isAuthenticated) {
    // Redirect to appropriate dashboard based on user role
    const redirectPath = profile?.role === 'org' ? '/org-panel' : '/dashboard';
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};
