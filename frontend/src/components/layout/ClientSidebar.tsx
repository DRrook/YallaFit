import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Home, Bookmark, Search, UserCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const ClientSidebar = () => {
  const { user } = useAuth();
  const location = useLocation();
  
  console.log('ClientSidebar - User:', user);
  console.log('ClientSidebar - Path:', location.pathname);

  // Define navigation items
  const navItems = [
    { to: "/dashboard", label: "Dashboard", icon: <Home className="h-4 w-4" /> },
    { to: "/client/sessions", label: "Find Sessions", icon: <Search className="h-4 w-4" /> },
    { to: "/bookings", label: "My Bookings", icon: <Bookmark className="h-4 w-4" /> },
    { to: "/profile", label: "Profile", icon: <UserCircle className="h-4 w-4" /> },
  ];

  return (
    <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-yalla-dark-gray border-r border-yalla-gray hidden md:block overflow-y-auto">
      <div className="p-6">
        <div className="space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all",
                location.pathname === item.to
                  ? "bg-yalla-green text-black"
                  : "text-white hover:text-yalla-green"
              )}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default ClientSidebar;
