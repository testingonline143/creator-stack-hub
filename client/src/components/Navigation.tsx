
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import { Home, Compass, LayoutDashboard, Sparkles, Menu, X } from "lucide-react";
import { useState } from "react";

const Navigation = () => {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  return (
    <nav className="bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 px-6 py-4 sticky top-0 z-50 backdrop-blur-lg bg-white/95 dark:bg-gray-950/95">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            CreatorStack
          </span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-8">
          <Link 
            to="/" 
            className={`flex items-center space-x-2 text-sm font-medium transition-colors px-3 py-2 rounded-lg ${
              location === '/' 
                ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400' 
                : 'text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 hover:bg-gray-50 dark:hover:bg-gray-800'
            }`}
          >
            <Home className="h-4 w-4" />
            <span>Home</span>
          </Link>
          <Link 
            to="/explore" 
            className={`flex items-center space-x-2 text-sm font-medium transition-colors px-3 py-2 rounded-lg ${
              location === '/explore' 
                ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400' 
                : 'text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 hover:bg-gray-50 dark:hover:bg-gray-800'
            }`}
          >
            <Compass className="h-4 w-4" />
            <span>Explore</span>
          </Link>
          <Link 
            to="/dashboard" 
            className={`flex items-center space-x-2 text-sm font-medium transition-colors px-3 py-2 rounded-lg ${
              location.pathname === '/dashboard' 
                ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400' 
                : 'text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 hover:bg-gray-50 dark:hover:bg-gray-800'
            }`}
          >
            <LayoutDashboard className="h-4 w-4" />
            <span>Dashboard</span>
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-3">
            <Link to="/dashboard">
              <Button variant="ghost" size="sm" className="text-gray-600 dark:text-gray-300">
                Sign In
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">
                Get Started
              </Button>
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
          <div className="px-6 py-4 space-y-4">
            <Link 
              to="/" 
              className={`flex items-center space-x-2 text-sm font-medium transition-colors px-3 py-2 rounded-lg ${
                location.pathname === '/' 
                  ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400' 
                  : 'text-gray-600 dark:text-gray-300'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>
            <Link 
              to="/explore" 
              className={`flex items-center space-x-2 text-sm font-medium transition-colors px-3 py-2 rounded-lg ${
                location.pathname === '/explore' 
                  ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400' 
                  : 'text-gray-600 dark:text-gray-300'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Compass className="h-4 w-4" />
              <span>Explore</span>
            </Link>
            <Link 
              to="/dashboard" 
              className={`flex items-center space-x-2 text-sm font-medium transition-colors px-3 py-2 rounded-lg ${
                location.pathname === '/dashboard' 
                  ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400' 
                  : 'text-gray-600 dark:text-gray-300'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <LayoutDashboard className="h-4 w-4" />
              <span>Dashboard</span>
            </Link>
            <div className="pt-4 space-y-2">
              <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="ghost" size="sm" className="w-full justify-start">
                  Sign In
                </Button>
              </Link>
              <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                <Button size="sm" className="w-full bg-indigo-600 hover:bg-indigo-700">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
