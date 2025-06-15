
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, ExternalLink, Star, Filter, SlidersHorizontal, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const Explore = () => {
  const products = [
    {
      id: 1,
      title: "Email Marketing Mastery",
      description: "Complete course on building and monetizing email lists",
      creator: "John Doe",
      creatorId: "john-doe",
      type: "Course",
      category: "Marketing",
      tags: ["Email", "Marketing", "Business"],
      price: "$97",
      featured: true
    },
    {
      id: 2,
      title: "UI/UX Design System",
      description: "Professional design system for modern web apps",
      creator: "Sarah Wilson",
      creatorId: "sarah-wilson",
      type: "Template",
      category: "Design",
      tags: ["Design", "UI/UX", "Templates"],
      price: "$79",
      featured: false
    },
    {
      id: 3,
      title: "AI Content Generator",
      description: "Tool for generating marketing content with AI",
      creator: "Mike Chen",
      creatorId: "mike-chen",
      type: "Tool",
      category: "Technology",
      tags: ["AI", "Content", "Automation"],
      price: "$129",
      featured: true
    },
    {
      id: 4,
      title: "Notion Business Templates",
      description: "Complete business management templates for Notion",
      creator: "Lisa Rodriguez",
      creatorId: "lisa-rodriguez",
      type: "Template",
      category: "Productivity",
      tags: ["Notion", "Business", "Templates"],
      price: "$39",
      featured: false
    },
    {
      id: 5,
      title: "Social Media Course",
      description: "Master social media marketing across all platforms",
      creator: "David Kim",
      creatorId: "david-kim",
      type: "Course",
      category: "Marketing",
      tags: ["Social Media", "Marketing", "Strategy"],
      price: "$89",
      featured: false
    },
    {
      id: 6,
      title: "Startup Pitch Deck",
      description: "Professional pitch deck template for startups",
      creator: "Emma Thompson",
      creatorId: "emma-thompson",
      type: "Template",
      category: "Business",
      tags: ["Startup", "Pitch", "Templates"],
      price: "$49",
      featured: true
    }
  ];

  const categories = ["All", "Marketing", "Design", "Technology", "Productivity", "Business"];
  const productTypes = ["All", "Course", "Template", "Tool", "Guide"];

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
              <Input placeholder="Search products..." className="pl-10" />
            </div>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category.toLowerCase()}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Product Type" />
              </SelectTrigger>
              <SelectContent>
                {productTypes.map((type) => (
                  <SelectItem key={type} value={type.toLowerCase()}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" className="w-full">
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
            {products.filter(product => product.featured).map((product) => (
              <Card key={product.id} className="hover:shadow-lg transition-shadow border-accent/20">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary">{product.type}</Badge>
                      <Badge variant="outline" className="text-xs">Featured</Badge>
                    </div>
                    <span className="font-bold text-accent">{product.price}</span>
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
                    {product.tags.map((tag) => (
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Card key={product.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <Badge variant="secondary">{product.type}</Badge>
                    <span className="font-bold text-accent">{product.price}</span>
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
                    {product.tags.map((tag) => (
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
      </div>
    </div>
  );
};

export default Explore;
