
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  CheckCircle, 
  XCircle, 
  Star, 
  Users, 
  Package,
  Shield,
  TrendingUp
} from "lucide-react";
import Navigation from "@/components/Navigation";
import { useToast } from "@/hooks/use-toast";

const AdminDashboard = () => {
  const { toast } = useToast();
  
  const [pendingProducts] = useState([
    {
      id: 1,
      title: "Advanced JavaScript Course",
      description: "Deep dive into JavaScript concepts",
      creator: "John Developer",
      category: "Course",
      tags: ["JavaScript", "Programming"],
      status: "pending"
    },
    {
      id: 2,
      title: "Design System Templates",
      description: "Complete design system for web apps",
      creator: "Mary Designer",
      category: "Template",
      tags: ["Design", "UI/UX"],
      status: "pending"
    }
  ]);

  const [creators] = useState([
    {
      id: 1,
      name: "Alex Creator",
      email: "alex@example.com",
      plan: "Premium",
      products: 3,
      status: "active"
    },
    {
      id: 2,
      name: "Sarah Designer",
      email: "sarah@example.com",
      plan: "Free",
      products: 1,
      status: "active"
    }
  ]);

  const handleApproveProduct = (productId: number) => {
    toast({
      title: "Product Approved",
      description: "The product has been approved and is now live in the explore directory.",
    });
  };

  const handleRejectProduct = (productId: number) => {
    toast({
      title: "Product Rejected",
      description: "The product has been rejected and the creator has been notified.",
    });
  };

  const handleToggleFeatured = (productId: number) => {
    toast({
      title: "Featured Status Updated",
      description: "The product's featured status has been updated.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center gap-2 mb-8">
          <Shield className="h-8 w-8 text-accent" />
          <div>
            <h1 className="text-3xl font-bold text-primary">Admin Dashboard</h1>
            <p className="text-gray-600">Manage creators, products, and platform features</p>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 text-accent mx-auto mb-2" />
              <div className="text-2xl font-bold">127</div>
              <div className="text-sm text-gray-600">Total Creators</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Package className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <div className="text-2xl font-bold">342</div>
              <div className="text-sm text-gray-600">Approved Products</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <TrendingUp className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
              <div className="text-2xl font-bold">23</div>
              <div className="text-sm text-gray-600">Pending Review</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Star className="h-8 w-8 text-purple-500 mx-auto mb-2" />
              <div className="text-2xl font-bold">12</div>
              <div className="text-sm text-gray-600">Featured Products</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="products" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="products">Product Review</TabsTrigger>
            <TabsTrigger value="creators">Creators</TabsTrigger>
            <TabsTrigger value="resources">Resources Hub</TabsTrigger>
          </TabsList>

          <TabsContent value="products">
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">Pending Product Approvals</h2>
                <div className="space-y-4">
                  {pendingProducts.map((product) => (
                    <Card key={product.id}>
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg mb-2">{product.title}</h3>
                            <p className="text-gray-600 mb-3">{product.description}</p>
                            <div className="flex items-center gap-2 mb-3">
                              <span className="text-sm text-gray-500">by {product.creator}</span>
                              <Badge variant="outline">{product.category}</Badge>
                              {product.tags.map((tag) => (
                                <Badge key={tag} variant="secondary" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div className="flex gap-2 ml-4">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleToggleFeatured(product.id)}
                              className="flex items-center gap-1"
                            >
                              <Star className="h-4 w-4" />
                              Feature
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleRejectProduct(product.id)}
                              className="text-red-600 hover:text-red-700 flex items-center gap-1"
                            >
                              <XCircle className="h-4 w-4" />
                              Reject
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => handleApproveProduct(product.id)}
                              className="bg-green-600 hover:bg-green-700 flex items-center gap-1"
                            >
                              <CheckCircle className="h-4 w-4" />
                              Approve
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="creators">
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Creator Management</h2>
              <div className="space-y-4">
                {creators.map((creator) => (
                  <Card key={creator.id}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-semibold">{creator.name}</h3>
                          <p className="text-sm text-gray-600">{creator.email}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant={creator.plan === 'Premium' ? 'default' : 'secondary'}>
                              {creator.plan}
                            </Badge>
                            <span className="text-sm text-gray-500">
                              {creator.products} products
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            View Profile
                          </Button>
                          <Button variant="outline" size="sm">
                            Contact
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="resources">
            <Card>
              <CardHeader>
                <CardTitle>Premium Resources Hub</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Manage exclusive content for premium creators
                </p>
                <Button className="bg-accent hover:bg-accent/90">
                  Add New Resource
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
