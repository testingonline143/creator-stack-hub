import { useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Eye, Edit, TrendingUp, Users, DollarSign, Star, BarChart3, Settings, Crown, ExternalLink } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import AddProductForm from "@/components/AddProductForm";

const Dashboard = () => {
  const [products, setProducts] = useState([
    { id: 1, title: "Email Marketing Mastery", type: "Course", status: "Live", revenue: 2450, sales: 28, rating: 4.8 },
    { id: 2, title: "Landing Page Templates", type: "Template", status: "Pending", revenue: 0, sales: 0, rating: 0 },
    { id: 3, title: "Social Media Toolkit", type: "Tool", status: "Live", revenue: 890, sales: 15, rating: 4.6 }
  ]);
  const [isAddProductSheetOpen, setIsAddProductSheetOpen] = useState(false);

  const handleAddProduct = (newProduct: { title: string, type: string }) => {
    const newId = Math.max(...products.map(p => p.id)) + 1;
    setProducts(prevProducts => [...prevProducts, { 
      id: newId, 
      ...newProduct, 
      status: "Pending", 
      revenue: 0, 
      sales: 0, 
      rating: 0 
    }]);
  };

  const totalRevenue = products.reduce((sum, product) => sum + product.revenue, 0);
  const totalSales = products.reduce((sum, product) => sum + product.sales, 0);
  const liveProducts = products.filter(p => p.status === "Live").length;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Creator Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">Welcome back! Here's your business overview</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" asChild>
              <Link to="/creator/john-doe">
                <Eye className="h-4 w-4 mr-2" />
                View Profile
              </Link>
            </Button>
            <Button asChild className="bg-indigo-600 hover:bg-indigo-700">
              <Link to="/creator/john-doe">
                <ExternalLink className="h-4 w-4 mr-2" />
                Live Site
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Total Revenue</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">${totalRevenue.toLocaleString()}</p>
                  <p className="text-sm text-green-600 dark:text-green-400 mt-1">+12% from last month</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Total Sales</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">{totalSales}</p>
                  <p className="text-sm text-green-600 dark:text-green-400 mt-1">+8% from last month</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-green-100 dark:bg-green-900/50 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Live Products</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">{liveProducts}</p>
                  <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">{products.length - liveProducts} pending</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center">
                  <BarChart3 className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Profile Views</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">2,847</p>
                  <p className="text-sm text-green-600 dark:text-green-400 mt-1">+23% from last month</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-orange-100 dark:bg-orange-900/50 flex items-center justify-center">
                  <Users className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Actions */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl">Quick Actions</CardTitle>
                <CardDescription>Common tasks to grow your creator business</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Sheet open={isAddProductSheetOpen} onOpenChange={setIsAddProductSheetOpen}>
                    <SheetTrigger asChild>
                      <Button variant="outline" className="h-20 flex-col gap-2 hover:bg-indigo-50 dark:hover:bg-indigo-950/20">
                        <Plus className="h-6 w-6 text-indigo-600" />
                        <span>Add New Product</span>
                      </Button>
                    </SheetTrigger>
                    <SheetContent>
                      <SheetHeader>
                        <SheetTitle>Add a new product</SheetTitle>
                        <SheetDescription>
                          Fill in the details below to add a new product. It will be submitted for approval.
                        </SheetDescription>
                      </SheetHeader>
                      <AddProductForm 
                        onAddProduct={handleAddProduct}
                        onDone={() => setIsAddProductSheetOpen(false)}
                      />
                    </SheetContent>
                  </Sheet>

                  <Button variant="outline" className="h-20 flex-col gap-2 hover:bg-green-50 dark:hover:bg-green-950/20">
                    <Edit className="h-6 w-6 text-green-600" />
                    <span>Edit Profile</span>
                  </Button>

                  <Button variant="outline" className="h-20 flex-col gap-2 hover:bg-purple-50 dark:hover:bg-purple-950/20">
                    <BarChart3 className="h-6 w-6 text-purple-600" />
                    <span>View Analytics</span>
                  </Button>

                  <Button variant="outline" className="h-20 flex-col gap-2 hover:bg-orange-50 dark:hover:bg-orange-950/20">
                    <Settings className="h-6 w-6 text-orange-600" />
                    <span>Settings</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Products */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl">Your Products</CardTitle>
                <CardDescription>Manage and track your digital products</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {products.map((product) => (
                    <div key={product.id} className="flex items-center justify-between p-6 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-semibold text-lg text-gray-900 dark:text-white">{product.title}</h4>
                            <div className="flex items-center space-x-3 mt-2">
                              <Badge variant="secondary" className="text-xs">{product.type}</Badge>
                              <Badge 
                                variant={product.status === 'Live' ? 'default' : 'outline'}
                                className={`text-xs ${product.status === 'Live' ? 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400' : ''}`}
                              >
                                {product.status}
                              </Badge>
                              {product.rating > 0 && (
                                <div className="flex items-center space-x-1">
                                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                  <span className="text-sm text-gray-600 dark:text-gray-300">{product.rating}</span>
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-gray-900 dark:text-white">${product.revenue.toLocaleString()}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-300">{product.sales} sales</div>
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="ml-4">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upgrade Card */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-indigo-600 dark:text-indigo-400">
                  <Crown className="h-5 w-5" />
                  <span>Upgrade to Pro</span>
                </CardTitle>
                <CardDescription>
                  Unlock premium features and grow faster
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
                    <span>Unlimited products</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
                    <span>Advanced analytics</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
                    <span>Email capture</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
                    <span>Custom domain</span>
                  </li>
                </ul>
                <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
                  Upgrade Now - $29/mo
                </Button>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">New sale: Email Marketing Mastery</p>
                      <p className="text-xs text-gray-500">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Profile viewed 15 times</p>
                      <p className="text-xs text-gray-500">6 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Product review received</p>
                      <p className="text-xs text-gray-500">1 day ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;