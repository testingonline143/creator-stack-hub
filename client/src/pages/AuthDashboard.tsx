import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  User, 
  Package, 
  Users, 
  Settings, 
  TrendingUp, 
  Star, 
  PlayCircle, 
  FileText,
  Calendar,
  DollarSign,
  Eye,
  ChevronRight,
  Bell,
  Upload
} from "lucide-react";
import { Link, useLocation } from "wouter";
import Sidebar from "@/components/Sidebar";

interface User {
  id: number;
  email: string;
  username: string;
  name: string;
}

export default function AuthDashboard() {
  const { user, isAuthenticated, logout } = useAuth();
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: "Success",
        description: "Logged out successfully",
      });
      setLocation("/");
    } catch (error) {
      toast({
        title: "Error",
        description: "Logout failed",
        variant: "destructive",
      });
    }
  };

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Authentication Required</h2>
          <p className="text-gray-600 mb-4">Please log in to access the dashboard</p>
          <Link href="/login">
            <Button>Go to Login</Button>
          </Link>
        </div>
      </div>
    );
  }

  const userData = (user as any)?.user || user;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      
      <div className="flex-1">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="px-6 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <Bell className="w-5 h-5 text-yellow-500" />
                <span className="text-sm text-gray-600">Your subscription renews on July 16, 2025.</span>
                <Button variant="outline" size="sm">Go to settings</Button>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <User className="w-5 h-5" />
                  <span className="text-sm font-medium">{userData?.name || "User"}</span>
                </div>
                <Button variant="outline" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6">
          {/* Today's Success Story */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Star className="w-5 h-5 mr-2 text-yellow-500" />
                Today's Creator Success Story
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-gray-500" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-1">Sarah's Journey from Student to 6-Figure Creator</h3>
                  <p className="text-gray-600 mb-3">
                    Sarah started with college vlogs and turned it into a multi-platform creator career — 
                    powered by aesthetics, structure, and smart pivots. This case study breaks down how she...
                  </p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span className="flex items-center">
                      <DollarSign className="w-4 h-4 mr-1 text-green-600" />
                      $120,000 Monthly Revenue
                    </span>
                    <span className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      2.1M Followers
                    </span>
                    <Button variant="outline" size="sm" className="ml-auto">
                      Click to read more
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Today's Content Spotlight */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <TrendingUp className="w-5 h-5 mr-2 text-blue-500" />
                Today's Content Spotlight
              </CardTitle>
              <CardDescription>Fresh insights and trending content ideas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-semibold mb-1">10 Million View Strategy (Tech + Productivity)</h4>
                  <p className="text-sm text-gray-600 mb-2">
                    Weekday by Maria: a TikTok creator, posted a video where she talks about the importance 
                    of eating high-fiber. If you're eating high-protein and it's a masterclass in creating viral...
                  </p>
                  <div className="flex items-center space-x-2 text-xs text-gray-500">
                    <Badge variant="outline">Tech</Badge>
                    <span>Key Moments</span>
                    <Button variant="link" size="sm" className="p-0 h-auto text-xs">
                      Click to view detailed analysis
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Creator Interview Spotlight */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <PlayCircle className="w-5 h-5 mr-2 text-red-500" />
                Creator Interview Spotlight
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-black rounded-lg overflow-hidden">
                <div className="aspect-video flex items-center justify-center">
                  <div className="text-center text-white">
                    <PlayCircle className="w-16 h-16 mx-auto mb-2" />
                    <p className="text-lg font-semibold">"I have A PLAN"</p>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <h4 className="font-semibold mb-1">How He Makes $25k/MONTH on YouTube</h4>
                <p className="text-sm text-gray-600 mb-2">VLOGGER INTERVIEW</p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span className="flex items-center">
                    <Eye className="w-4 h-4 mr-1" />
                    248K views
                  </span>
                  <span>3 weeks ago</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                <Upload className="w-6 h-6 text-orange-600" />
                <CardTitle className="text-lg ml-2">Submit Your Story</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Share your creator journey and inspire others
                </p>
              </CardContent>
            </Card>

            <Link href="/explore">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                  <Users className="w-6 h-6 text-blue-600" />
                  <CardTitle className="text-lg ml-2">Discover Creators</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Explore successful creators and their strategies
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                <FileText className="w-6 h-6 text-green-600" />
                <CardTitle className="text-lg ml-2">Content Ideas</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Get fresh content ideas and trending topics
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Account Management */}
          <Card>
            <CardHeader>
              <CardTitle>Account Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Need to reactivate your account?</p>
              <Button>Manage Account</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}