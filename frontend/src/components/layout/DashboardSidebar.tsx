import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext"; // To get userRole
import { Home, Users, Bookmark, BarChart3, Settings, UserCircle, Search } from "lucide-react"; // Example icons
import { cn } from "@/lib/utils";

interface NavLinkProps {
  to: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

const NavLink = ({ to, icon, children }: NavLinkProps) => {
  const location = useLocation();
  const isActive = location.pathname === to || location.pathname.startsWith(`${to}/`);

  return (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-300 transition-all",
        isActive
          ? "bg-black/60 text-yalla-green border-l-2 border-yalla-green pl-[10px]"
          : "hover:text-yalla-green hover:bg-black/60"
      )}
    >
      {icon}
      {children}
    </Link>
  );
};

const DashboardSidebar = () => {
  const { user } = useAuth(); // Assuming user object contains role
  const userRole = user?.role;

  console.log('DashboardSidebar - User Role:', userRole);

  // Define navigation items based on role
  const commonLinks = [
    { to: "/dashboard", label: "Dashboard", icon: <Home className="h-4 w-4" /> },
    // Add other common dashboard links if any in the future
  ];

  const roleSpecificLinks = {
    admin: [
      { to: "/admin/users", label: "Manage Users", icon: <Users className="h-4 w-4" /> },
      { to: "/admin/sessions", label: "Manage Sessions", icon: <BarChart3 className="h-4 w-4" /> },
      // Add other admin links
    ],
    coach: [
      { to: "/sessions", label: "My Sessions", icon: <BarChart3 className="h-4 w-4" /> },
      { to: "/bookings", label: "Bookings", icon: <Bookmark className="h-4 w-4" /> },
      // Add other coach links
    ],
    client: [
      { to: "/client/sessions", label: "Find Sessions", icon: <Search className="h-4 w-4" /> },
      { to: "/bookings", label: "My Bookings", icon: <Bookmark className="h-4 w-4" /> },
      // Add other client links
    ],
  };

  const accountLinks = [
    { to: "/profile", label: "Profile", icon: <UserCircle className="h-4 w-4" /> },
    { to: "/settings", label: "Settings", icon: <Settings className="h-4 w-4" /> },
  ];


  const linksToRender = [
    ...commonLinks,
    ...(userRole && roleSpecificLinks[userRole as keyof typeof roleSpecificLinks] ? roleSpecificLinks[userRole as keyof typeof roleSpecificLinks] : []),
    ...accountLinks,
  ];


  return (
    <div className="hidden border-r border-yalla-gray bg-yalla-dark-gray md:block w-64 p-4 fixed top-16 h-[calc(100vh-4rem)] overflow-y-auto">
      <div className="flex flex-col gap-2">
        <div className="flex-1">
          <nav className="grid items-start gap-1 text-sm font-medium">
            {linksToRender.map((link) => (
              <NavLink key={link.to} to={link.to} icon={link.icon}>
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default DashboardSidebar;
