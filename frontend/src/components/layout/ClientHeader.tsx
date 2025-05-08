import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import LoadingScreen from "@/components/ui/loading-screen";
import { Menu, Bell, User, LogOut, LayoutDashboard } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export type UserRole = "coach" | "client" | "admin" | null;

interface ClientHeaderProps {
  isAuthenticated?: boolean;
  userRole?: UserRole;
}

const ClientHeader = ({ isAuthenticated: propIsAuthenticated = false, userRole: propUserRole = null }: ClientHeaderProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { logout, isAuthenticated: contextIsAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  // Use props if provided, otherwise use context values
  const isAuthenticated = propIsAuthenticated !== undefined ? propIsAuthenticated : contextIsAuthenticated;
  const userRole = propUserRole !== undefined ? propUserRole : (user?.role as UserRole || null);

  // Add console logs to debug authentication state
  console.log('ClientHeader - Auth State:', {
    propIsAuthenticated,
    contextIsAuthenticated,
    isAuthenticated,
    user,
    userRole,
    localStorageToken: localStorage.getItem('auth_token'),
    localStorageUser: localStorage.getItem('user')
  });

  const handleLogout = async () => {
    console.log('ClientHeader - handleLogout called');
    setIsLoggingOut(true);

    try {
      await logout();
      console.log('ClientHeader - logout completed, navigating to login page');

      // Force a state update to ensure the UI reflects the logged-out state
      setTimeout(() => {
        console.log('ClientHeader - Checking auth state after logout');
        console.log('LocalStorage after logout:', {
          token: localStorage.getItem('auth_token'),
          user: localStorage.getItem('user')
        });

        navigate('/login');
        setIsLoggingOut(false);
      }, 100);
    } catch (error) {
      console.error('ClientHeader - Error during logout:', error);
      setIsLoggingOut(false);
    }
  };

  return (
    <>
      {isLoggingOut && <LoadingScreen message="Logging out..." />}
      <header className="w-full bg-black border-b border-yalla-dark-gray sticky top-0 z-50">
        <div className="w-full max-w-[1920px] mx-auto flex items-center justify-between h-16 px-6 md:px-10 lg:px-16">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-white">
              Yalla<span className="text-yalla-green">Fit</span>
            </span>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {/* Common links for both authenticated and non-authenticated users */}
            <Link
              to="/store"
              className="text-sm font-medium text-white hover:text-yalla-green transition-colors"
            >
              Store
            </Link>
            <Link
              to="/contact"
              className="text-sm font-medium text-white hover:text-yalla-green transition-colors"
            >
              Contact
            </Link>
            <Link
              to="/about"
              className="text-sm font-medium text-white hover:text-yalla-green transition-colors"
            >
              About
            </Link>

            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                {/* Dashboard link for logged-in users */}
                <Link
                  to="/dashboard"
                  className="text-sm font-medium text-white hover:text-yalla-green transition-colors flex items-center gap-1"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </Link>

                <Button variant="ghost" size="icon" className="text-white">
                  <Bell className="h-5 w-5" />
                </Button>

                <Button variant="ghost" size="icon" className="text-white" onClick={handleLogout}>
                  <LogOut className="h-5 w-5" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Button asChild variant="outline" className="border-yalla-green text-white">
                  <Link to="/login">Log in</Link>
                </Button>
                <Button asChild className="bg-yalla-green text-black hover:bg-yalla-green/90">
                  <Link to="/register">Register</Link>
                </Button>
              </div>
            )}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <Menu className="h-6 w-6 text-white" />
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile menu (simplified) */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/90 flex flex-col p-6 pt-20">
          <div className="flex flex-col gap-4">
            <Link
              to="/store"
              className="text-lg font-medium text-white hover:text-yalla-green transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Store
            </Link>
            <Link
              to="/contact"
              className="text-lg font-medium text-white hover:text-yalla-green transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <Link
              to="/about"
              className="text-lg font-medium text-white hover:text-yalla-green transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>

            {isAuthenticated && (
              <>
                <div className="border-t border-yalla-gray my-2 pt-2"></div>
                <Link
                  to="/dashboard"
                  className="text-lg font-medium text-white hover:text-yalla-green transition-colors flex items-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <LayoutDashboard className="h-4 w-4 mr-2" /> Dashboard
                </Link>
                <button
                  className="text-lg font-medium text-white hover:text-yalla-green transition-colors flex items-center"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleLogout();
                  }}
                >
                  <LogOut className="h-4 w-4 mr-2" /> Log out
                </button>
              </>
            )}
          </div>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute top-4 right-4 text-white"
            onClick={() => setMobileMenuOpen(false)}
          >
            ✕
          </Button>
        </div>
      )}
    </>
  );
};

export default ClientHeader;
