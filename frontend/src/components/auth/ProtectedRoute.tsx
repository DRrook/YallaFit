import { ReactNode, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import LoadingScreen from '@/components/ui/loading-screen';

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: string[];
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { isAuthenticated, user, isLoading } = useAuth();
  const location = useLocation();

  console.log('ProtectedRoute - Path:', location.pathname);
  console.log('ProtectedRoute - Auth State:', { isAuthenticated, user, isLoading });

  // If authentication is still loading, show the loading screen
  if (isLoading) {
    return <LoadingScreen />;
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If roles are specified and user doesn't have the required role, redirect to access denied
  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/access-denied" replace />;
  }

  // If authenticated and has the required role (or no role specified), render the children
  return <>{children}</>;
};

export default ProtectedRoute;
