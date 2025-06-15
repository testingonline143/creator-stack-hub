
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { Home, Compass, LayoutDashboard } from "lucide-react";

const Navigation = () => {
  const location = useLocation();
  
  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-primary">
          CreatorStack
        </Link>
        
        <div className="hidden md:flex items-center space-x-8">
          <Link 
            to="/" 
            className={`flex items-center space-x-2 text-sm font-medium transition-colors ${
              location.pathname === '/' ? 'text-accent' : 'text-gray-600 hover:text-accent'
            }`}
          >
            <Home className="h-4 w-4" />
            <span>Home</span>
          </Link>
          <Link 
            to="/explore" 
            className={`flex items-center space-x-2 text-sm font-medium transition-colors ${
              location.pathname === '/explore' ? 'text-accent' : 'text-gray-600 hover:text-accent'
            }`}
          >
            <Compass className="h-4 w-4" />
            <span>Explore</span>
          </Link>
          <Link 
            to="/dashboard" 
            className={`flex items-center space-x-2 text-sm font-medium transition-colors ${
              location.pathname === '/dashboard' ? 'text-accent' : 'text-gray-600 hover:text-accent'
            }`}
          >
            <LayoutDashboard className="h-4 w-4" />
            <span>Dashboard</span>
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <Link to="/dashboard">
            <Button variant="outline" size="sm">
              Sign In
            </Button>
          </Link>
          <Link to="/dashboard">
            <Button size="sm" className="bg-accent hover:bg-accent/90">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
