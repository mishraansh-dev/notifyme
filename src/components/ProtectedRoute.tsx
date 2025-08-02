import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth, UserRole } from '../store/useAuth';
import Loader from './Loader';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: UserRole;
  redirectTo?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRole,
  redirectTo = '/login',
}) => {
  const { isAuthenticated, role } = useAuth();
  const location = useLocation();

  // Show loading while checking authentication state
  if (isAuthenticated === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader size="lg" text="Loading..." />
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // Check role-based access
  if (requiredRole && role !== requiredRole) {
    // Redirect to appropriate dashboard based on current role
    const defaultRedirect = role === 'user' ? '/dashboard' : role === 'org' ? '/dashboard' : '/';
    return <Navigate to={defaultRedirect} replace />;
  }

  return <>{children}</>;
};

// Specialized protected route components
export const UserOnlyRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ProtectedRoute requiredRole="user">{children}</ProtectedRoute>
);

export const OrgOnlyRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ProtectedRoute requiredRole="org">{children}</ProtectedRoute>
);

// Public route that redirects authenticated users
export const PublicRoute: React.FC<{
  children: React.ReactNode;
  redirectAuthenticated?: string;
}> = ({ children, redirectAuthenticated = '/dashboard' }) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to={redirectAuthenticated} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
