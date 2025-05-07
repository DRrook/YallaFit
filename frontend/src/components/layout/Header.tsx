
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import LoadingScreen from "@/components/ui/loading-screen";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, Bell, User, LogOut, LayoutDashboard } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";

export type UserRole = "coach" | "client" | "admin" | null;

interface HeaderProps {
  isAuthenticated?: boolean;
  userRole?: UserRole;
}

const Header = ({ isAuthenticated: propIsAuthenticated = false, userRole: propUserRole = null }: HeaderProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { logout, isAuthenticated: contextIsAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  // Use props if provided, otherwise use context values
  const isAuthenticated = propIsAuthenticated !== undefined ? propIsAuthenticated : contextIsAuthenticated;
  const userRole = propUserRole !== undefined ? propUserRole : (user?.role as UserRole || null);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await logout();
    navigate('/login');
    setIsLoggingOut(false);
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

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-white">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="cursor-pointer w-full">
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard" className="cursor-pointer w-full">
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/settings" className="cursor-pointer w-full">
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
                    <LogOut className="h-4 w-4 mr-2" /> Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
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

        {/* Mobile menu */}
        <div className="md:hidden">
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6 text-white" />
              </Button>
            </SheetTrigger>
            <SheetContent className="bg-yalla-dark-gray text-white">
              <SheetHeader>
                <SheetTitle className="text-white">
                  Yalla<span className="text-yalla-green">Fit</span>
                </SheetTitle>
                <SheetDescription className="text-muted-foreground">
                  Unite, Grow, Strong
                </SheetDescription>
              </SheetHeader>
              <div className="flex flex-col gap-4 mt-6">
                {/* Common links for both authenticated and non-authenticated users */}
                <Link
                  to="/store"
                  className="text-sm font-medium text-white hover:text-yalla-green transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Store
                </Link>
                <Link
                  to="/contact"
                  className="text-sm font-medium text-white hover:text-yalla-green transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact
                </Link>
                <Link
                  to="/about"
                  className="text-sm font-medium text-white hover:text-yalla-green transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About
                </Link>

                {isAuthenticated ? (
                  <>
                    <div className="border-t border-yalla-gray my-2 pt-2"></div>
                    <Link
                      to="/dashboard"
                      className="text-sm font-medium text-white hover:text-yalla-green transition-colors flex items-center"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <LayoutDashboard className="h-4 w-4 mr-2" /> Dashboard
                    </Link>
                    <Link
                      to="/profile"
                      className="text-sm font-medium text-white hover:text-yalla-green transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Profile
                    </Link>
                    <Link
                      to="/settings"
                      className="text-sm font-medium text-white hover:text-yalla-green transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Settings
                    </Link>
                    {/* Consider adding Bell icon functionality here if desired for mobile */}
                    <button
                      className="text-sm font-medium text-white hover:text-yalla-green transition-colors flex items-center"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        handleLogout();
                      }}
                    >
                      <LogOut className="h-4 w-4 mr-2" /> Log out
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col gap-2 mt-4">
                    <Button asChild variant="outline" className="border-yalla-green text-white">
                      <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                        Log in
                      </Link>
                    </Button>
                    <Button asChild className="bg-yalla-green text-black hover:bg-yalla-green/90">
                      <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                        Register
                      </Link>
                    </Button>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
    </>
  );
};

export default Header;
