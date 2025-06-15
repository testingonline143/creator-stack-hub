
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Search, 
  ExternalLink, 
  Filter, 
  Star,
  User
} from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";

const Explore = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const tags = ["Course", "Template", "Tool", "Ebook", "Community"];
  const categories = ["Design", "Development", "Marketing", "Business", "Content"];

  const products = [
    {
      id: 1,
      title: "React Masterclass",
      description: "Complete guide to React development with hands-on projects",
      creator: "Alex Creator",
      creatorId: "alex-creator",
      link: "https://example.com/react-course",
      category: "Development",
      tags: ["Course"],
      price: "$99",
      featured: true,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
    },
    {
      id: 2,
      title: "UI Design Templates",
      description: "50+ beautiful Figma templates for modern web applications",
      creator: "Sarah Designer",
      creatorId: "sarah-designer",
      link: "https://example.com/templates",
      category: "Design",
      tags: ["Template"],
      price: "$49",
      featured: false,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b999?w=40&h=40&fit=crop&crop=face"
    },
    {
      id: 3,
      title: "Marketing Automation Guide",
      description: "Step-by-step guide to automate your marketing processes",
      creator: "Mike Marketer",
      creatorId: "mike-marketer",
      link: "https://example.com/marketing",
      category: "Marketing",
      tags: ["Ebook"],
      price: "$29",
      featured: true,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face"
    },
    {
      id: 4,
      title: "Productivity Toolkit",
      description: "Essential tools and workflows to boost your efficiency",
      creator: "Emma Producer",
      creatorId: "emma-producer",
      link: "https://example.com/productivity",
      category: "Business",
      tags: ["Tool"],
      price: "$39",
      featured: false,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face"
    },
    {
      id: 5,
      title: "Content Creator Masterclass",
      description: "Learn how to create engaging content that converts",
      creator: "David Content",
      creatorId: "david-content",
      link: "https://example.com/content",
      category: "Content",
      tags: ["Course"],
      price: "$79",
      featured: false,
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face"
    },
    {
      id: 6,
      title: "Startup Pitch Templates",
      description: "Professional presentation templates for startup pitches",
      creator: "Lisa Startup",
      creatorId: "lisa-startup",
      link: "https://example.com/pitch",
      category: "Business",
      tags: ["Template"],
      price: "$59",
      featured: true,
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop&crop=face"
    }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.creator.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = selectedTag === "" || product.tags.includes(selectedTag);
    const matchesCategory = selectedCategory === "" || product.category === selectedCategory;
    
    return matchesSearch && matchesTag && matchesCategory;
  });

  const featuredProducts = filteredProducts.filter(product => product.featured);
  const regularProducts = filteredProducts.filter(product => !product.featured);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4">Explore Creator Products</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover amazing courses, templates, tools, and resources from top digital creators
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search products, creators, or topics..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="flex gap-2 flex-wrap">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-500">Filter by:</span>
                </div>
                
                <select
                  value={selectedTag}
                  onChange={(e) => setSelectedTag(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md bg-white text-sm"
                >
                  <option value="">All Types</option>
                  {tags.map(tag => (
                    <option key={tag} value={tag}>{tag}</option>
                  ))}
                </select>
                
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md bg-white text-sm"
                >
                  <option value="">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Featured Products */}
        {featuredProducts.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <Star className="h-5 w-5 text-yellow-500" />
              <h2 className="text-2xl font-bold text-primary">Featured Products</h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProducts.map((product) => (
                <Card key={product.id} className="hover:shadow-lg transition-all duration-300 border-2 border-yellow-200">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <Badge className="bg-yellow-100 text-yellow-800">Featured</Badge>
                      <span className="font-semibold text-accent">{product.price}</span>
                    </div>
                    
                    <h3 className="font-semibold text-lg mb-2">{product.title}</h3>
                    <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                      {product.description}
                    </p>
                    
                    <div className="flex items-center gap-2 mb-4">
                      <img
                        src={product.avatar}
                        alt={product.creator}
                        className="w-6 h-6 rounded-full"
                      />
                      <Link
                        to={`/creator/${product.creatorId}`}
                        className="text-sm text-gray-600 hover:text-accent transition-colors"
                      >
                        {product.creator}
                      </Link>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      <Badge variant="outline">{product.category}</Badge>
                      {product.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex gap-2">
                      <a
                        href={product.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1"
                      >
                        <Button className="w-full bg-accent hover:bg-accent/90 flex items-center justify-center gap-2">
                          View Product
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </a>
                      <Link to={`/creator/${product.creatorId}`}>
                        <Button variant="outline" size="icon">
                          <User className="h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* All Products */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-primary">
            All Products ({regularProducts.length})
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularProducts.map((product) => (
              <Card key={product.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <Badge variant="outline">{product.category}</Badge>
                    <span className="font-semibold text-accent">{product.price}</span>
                  </div>
                  
                  <h3 className="font-semibold text-lg mb-2">{product.title}</h3>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                    {product.description}
                  </p>
                  
                  <div className="flex items-center gap-2 mb-4">
                    <img
                      src={product.avatar}
                      alt={product.creator}
                      className="w-6 h-6 rounded-full"
                    />
                    <Link
                      to={`/creator/${product.creatorId}`}
                      className="text-sm text-gray-600 hover:text-accent transition-colors"
                    >
                      {product.creator}
                    </Link>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {product.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex gap-2">
                    <a
                      href={product.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1"
                    >
                      <Button className="w-full bg-accent hover:bg-accent/90 flex items-center justify-center gap-2">
                        View Product
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </a>
                    <Link to={`/creator/${product.creatorId}`}>
                      <Button variant="outline" size="icon">
                        <User className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {filteredProducts.length === 0 && (
          <Card className="mt-8">
            <CardContent className="p-12 text-center">
              <h3 className="text-xl font-semibold mb-4">No products found</h3>
              <p className="text-gray-600">
                Try adjusting your search terms or filters to find what you're looking for.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Explore;
