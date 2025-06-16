import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, ExternalLink, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

const Explore = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedType, setSelectedType] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch approved products for explore page
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["/api/products", { status: "approved" }],
    queryFn: () => apiRequest("/api/products?status=approved"),
  });

  // Featured products data - these are highlighted/curated products
  const featuredProducts = [
    {
      id: 1,
      title: "Email Marketing Mastery",
      description: "Complete course on building and monetizing email lists",
      creator: "John Doe",
      creatorId: "john-doe",
      type: "Course",
      tags: ["Email", "Marketing", "Business"],
      featured: true,
      rating: 4.8,
      students: 1247
    },
    {
      id: 2,
      title: "AI Content Generator",
      description: "Tool for generating marketing content with AI",
      creator: "Mike Chen", 
      creatorId: "mike-chen",
      type: "Tool",
      tags: ["AI", "Content", "Automation"],
      featured: true,
      rating: 4.9,
      students: 892
    },
    {
      id: 3,
      title: "Startup Pitch Deck",
      description: "Professional pitch deck template for startups",
      creator: "Emma Thompson",
      creatorId: "emma-thompson", 
      type: "Template",
      tags: ["Startup", "Pitch", "Templates"],
      featured: true,
      rating: 4.7,
      students: 2156
    }
  ];

  const categories = ["All", "AI", "Marketing", "Design", "Business", "Templates", "Automation", "Free", "Notion"];
  const productTypes = ["All", "Course", "Template", "Tool", "Guide"];

  // Filter products based on selected filters and search
  const filteredProducts = products.filter((product: any) => {
    const matchesSearch = !searchQuery || 
      product.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = selectedType === "All" || 
      product.type === selectedType;
    
    const matchesCategory = selectedCategory === "All" ||
      (product.tags && product.tags.includes(selectedCategory));
    
    return matchesSearch && matchesType && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Discover Amazing Creators
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover amazing courses, tools, and templates created by talented creators from around the world.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input 
                placeholder="Search products..." 
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger>
                <SelectValue placeholder="Product Type" />
              </SelectTrigger>
              <SelectContent>
                {productTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => {
                setSelectedCategory("All");
                setSelectedType("All");
                setSearchQuery("");
              }}
            >
              Clear Filters
            </Button>
          </div>
        </div>

        {/* Featured Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Star className="h-6 w-6 text-yellow-500 mr-2" />
            Featured Products
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="hover:shadow-lg transition-shadow border-accent/20">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary">{product.type}</Badge>
                      <Badge variant="outline" className="text-xs">Featured</Badge>
                    </div>
                  </div>
                  <CardTitle className="text-lg">{product.title}</CardTitle>
                  <CardDescription>{product.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <div className="h-6 w-6 rounded-full bg-gray-200" />
                    <Link 
                      to={`/creator/${product.creatorId}`}
                      className="text-sm font-medium text-gray-700 hover:text-accent"
                    >
                      {product.creator}
                    </Link>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {product.tags.map((tag: string) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Button className="w-full">
                    View Product
                    <ExternalLink className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* All Products */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">All Products</h2>
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardHeader>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2 mt-2"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-3 bg-gray-200 rounded w-full"></div>
                    <div className="h-3 bg-gray-200 rounded w-2/3 mt-2"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product: any) => (
                <Card key={product.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <Badge variant="secondary">{product.type}</Badge>
                    </div>
                    <CardTitle className="text-lg">{product.title}</CardTitle>
                    <CardDescription>{product.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <div className="h-6 w-6 rounded-full bg-gray-200" />
                      <Link 
                        to={`/creator/${product.creatorId}`}
                        className="text-sm font-medium text-gray-700 hover:text-accent"
                      >
                        {product.creator}
                      </Link>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {(product.tags || []).map((tag: string) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <Button className="w-full">
                      View Product
                      <ExternalLink className="h-4 w-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-600">Try adjusting your filters or search terms.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Explore;