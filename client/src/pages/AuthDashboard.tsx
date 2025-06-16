import { useAuth, useLogout } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { User, Package, Users, Settings } from "lucide-react";
import { Link, useLocation } from "wouter";

interface Creator {
  id: number;
  name: string;
  username: string;
  email: string;
  bio?: string;
  isPremium: boolean;
}

interface Product {
  id: number;
  title: string;
  description?: string;
  link: string;
  status: "draft" | "submitted" | "approved" | "rejected";
  creatorId: number;
}

export default function AuthDashboard() {
  const { user } = useAuth();
  const logout = useLogout();
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  const { data: creators = [], isLoading: loadingCreators } = useQuery({
    queryKey: ["/api/creators"],
  });

  const { data: products = [], isLoading: loadingProducts } = useQuery({
    queryKey: ["/api/products"],
  });

  const handleLogout = async () => {
    try {
      await logout.mutateAsync();
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

  if (!user) {
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">CreatorStack Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <User className="w-5 h-5" />
                <span className="text-sm font-medium">{user.user?.name}</span>
              </div>
              <Button variant="outline" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user.user?.name}!
          </h2>
          <p className="text-gray-600">
            Explore digital creators and their products in your personalized dashboard.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Link href="/explore">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                <Users className="w-6 h-6 text-blue-600" />
                <CardTitle className="text-lg ml-2">Explore Creators</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Discover amazing digital creators and their work
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/products">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                <Package className="w-6 h-6 text-green-600" />
                <CardTitle className="text-lg ml-2">Browse Products</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Explore digital products, courses, and tools
                </p>
              </CardContent>
            </Card>
          </Link>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <Settings className="w-6 h-6 text-purple-600" />
              <CardTitle className="text-lg ml-2">Account Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Manage your profile and preferences
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="w-5 h-5 mr-2" />
                Creators ({creators.length})
              </CardTitle>
              <CardDescription>
                Digital creators in the platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loadingCreators ? (
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3"></div>
                </div>
              ) : (
                <div className="space-y-2">
                  {creators.slice(0, 3).map((creator: Creator) => (
                    <div key={creator.id} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{creator.name}</p>
                        <p className="text-sm text-gray-600">@{creator.username}</p>
                      </div>
                      {creator.isPremium && (
                        <Badge variant="secondary">Premium</Badge>
                      )}
                    </div>
                  ))}
                  {creators.length > 3 && (
                    <p className="text-sm text-gray-500">
                      +{creators.length - 3} more creators
                    </p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Package className="w-5 h-5 mr-2" />
                Products ({products.length})
              </CardTitle>
              <CardDescription>
                Available digital products and tools
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loadingProducts ? (
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3"></div>
                </div>
              ) : (
                <div className="space-y-2">
                  {products.slice(0, 3).map((product: Product) => (
                    <div key={product.id} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{product.title}</p>
                        <p className="text-sm text-gray-600">
                          {product.description?.slice(0, 50)}...
                        </p>
                      </div>
                      <Badge 
                        variant={product.status === "approved" ? "default" : "secondary"}
                      >
                        {product.status}
                      </Badge>
                    </div>
                  ))}
                  {products.length > 3 && (
                    <p className="text-sm text-gray-500">
                      +{products.length - 3} more products
                    </p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}