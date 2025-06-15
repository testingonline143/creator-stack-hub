import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, X, Star, Users, Package, Eye, BookOpen, Pencil, Trash2 } from "lucide-react";

const AdminDashboard = () => {
  const pendingProducts = [
    {
      id: 1,
      title: "Advanced React Patterns",
      creator: "John Smith",
      type: "Course",
      submittedDate: "2024-01-15",
      description: "Deep dive into advanced React patterns and best practices"
    },
    {
      id: 2,
      title: "Marketing Email Templates",
      creator: "Sarah Jones",
      type: "Template",
      submittedDate: "2024-01-14",
      description: "Collection of high-converting email templates"
    }
  ];

  const users = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      plan: "Premium",
      joinDate: "2024-01-10",
      products: 3
    },
    {
      id: 2,
      name: "Sarah Wilson",
      email: "sarah@example.com",
      plan: "Free",
      joinDate: "2024-01-12",
      products: 1
    }
  ];

  const premiumResources = [
    {
      id: 1,
      title: "Exclusive: The Ultimate SEO Playbook",
      type: "PDF",
      addedDate: "2024-01-20",
      description: "A comprehensive guide to dominate search engine rankings."
    },
    {
      id: 2,
      title: "Notion Template: The Perfect Content Calendar",
      type: "Notion",
      addedDate: "2024-01-18",
      description: "Plan and track your content strategy with this powerful template."
    },
    {
      id: 3,
      title: "Video Course: Advanced Email Marketing",
      type: "Video",
      addedDate: "2024-01-15",
      description: "Learn advanced tactics to grow and monetize your email list."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage platform content and users</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,247</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Products</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">89</div>
              <p className="text-xs text-muted-foreground">+5 pending approval</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Premium Users</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">156</div>
              <p className="text-xs text-muted-foreground">12.5% conversion rate</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Page Views</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24,561</div>
              <p className="text-xs text-muted-foreground">+18% from last month</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="pending" className="space-y-6">
          <TabsList>
            <TabsTrigger value="pending">Pending Approvals</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="featured">Featured Content</TabsTrigger>
            <TabsTrigger value="premium-resources">Premium Resources</TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Pending Product Approvals</CardTitle>
                <CardDescription>
                  Review and approve or reject submitted products
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingProducts.map((product) => (
                    <div key={product.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium">{product.title}</h4>
                        <p className="text-sm text-gray-600">{product.description}</p>
                        <div className="flex items-center space-x-4 mt-2">
                          <span className="text-sm text-gray-500">by {product.creator}</span>
                          <Badge variant="secondary">{product.type}</Badge>
                          <span className="text-sm text-gray-500">
                            Submitted {product.submittedDate}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-2" />
                          Preview
                        </Button>
                        <Button size="sm" variant="outline" className="text-green-600 hover:text-green-700">
                          <Check className="h-4 w-4 mr-2" />
                          Approve
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                          <X className="h-4 w-4 mr-2" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>
                  View and manage platform users
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {users.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                          <span className="text-sm font-medium">
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <h4 className="font-medium">{user.name}</h4>
                          <p className="text-sm text-gray-600">{user.email}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge 
                              variant={user.plan === 'Premium' ? 'default' : 'secondary'}
                              className="text-xs"
                            >
                              {user.plan}
                            </Badge>
                            <span className="text-xs text-gray-500">
                              {user.products} products
                            </span>
                            <span className="text-xs text-gray-500">
                              Joined {user.joinDate}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        View Profile
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="featured" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Featured Content Management</CardTitle>
                <CardDescription>
                  Manage featured creators and products
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Star className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Featured content management coming soon</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="premium-resources" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Premium Resources Management</CardTitle>
                  <CardDescription>
                    Add, edit, or remove resources for premium subscribers.
                  </CardDescription>
                </div>
                <Button>
                  <BookOpen className="h-4 w-4 mr-2" />
                  Add New Resource
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {premiumResources.map((resource) => (
                    <div key={resource.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium">{resource.title}</h4>
                        <p className="text-sm text-gray-600">{resource.description}</p>
                        <div className="flex items-center space-x-4 mt-2">
                          <Badge variant="outline">{resource.type}</Badge>
                          <span className="text-sm text-gray-500">
                            Added on {resource.addedDate}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline">
                          <Pencil className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
