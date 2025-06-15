
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  ExternalLink, 
  Mail, 
  Globe, 
  Twitter, 
  Linkedin,
  ArrowLeft
} from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";

const CreatorProfile = () => {
  const creator = {
    name: "Alex Creator",
    bio: "Course creator helping developers build better apps. I've taught over 10,000 students and helped them launch successful careers in tech.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    niche: "Web Development",
    social: {
      twitter: "@alexcreator",
      linkedin: "alexcreator",
      website: "alexcreator.com"
    }
  };

  const products = [
    {
      id: 1,
      title: "React Masterclass",
      description: "Complete guide to React development with hands-on projects",
      link: "https://example.com/react-course",
      category: "Course",
      tags: ["React", "JavaScript", "Web Dev"],
      price: "$99"
    },
    {
      id: 2,
      title: "UI Design Templates",
      description: "50+ beautiful Figma templates for modern web applications",
      link: "https://example.com/templates",
      category: "Template",
      tags: ["Design", "Figma", "UI"],
      price: "$49"
    },
    {
      id: 3,
      title: "Developer Productivity Pack",
      description: "Essential tools and workflows to boost your coding efficiency",
      link: "https://example.com/productivity",
      category: "Tool",
      tags: ["Productivity", "Tools", "Workflow"],
      price: "$29"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-6xl mx-auto px-6 py-8">
        <Link to="/explore" className="flex items-center gap-2 text-accent hover:underline mb-6">
          <ArrowLeft className="h-4 w-4" />
          Back to Explore
        </Link>

        {/* Creator Header */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row gap-6">
              <img
                src={creator.avatar}
                alt={creator.name}
                className="w-24 h-24 rounded-full object-cover mx-auto md:mx-0"
              />
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl font-bold text-primary mb-2">{creator.name}</h1>
                <Badge variant="secondary" className="mb-4">{creator.niche}</Badge>
                <p className="text-gray-600 mb-6 leading-relaxed">{creator.bio}</p>
                
                <div className="flex flex-wrap justify-center md:justify-start gap-3">
                  <a
                    href={`https://twitter.com/${creator.social.twitter.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-accent transition-colors"
                  >
                    <Twitter className="h-4 w-4" />
                    {creator.social.twitter}
                  </a>
                  <a
                    href={`https://linkedin.com/in/${creator.social.linkedin}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-accent transition-colors"
                  >
                    <Linkedin className="h-4 w-4" />
                    LinkedIn
                  </a>
                  <a
                    href={`https://${creator.social.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-accent transition-colors"
                  >
                    <Globe className="h-4 w-4" />
                    {creator.social.website}
                  </a>
                </div>
              </div>
              
              {/* Email Capture */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold mb-3">Stay Updated</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Get notified about new courses and resources
                </p>
                <div className="flex gap-2">
                  <Input placeholder="Enter your email" type="email" />
                  <Button size="sm" className="bg-accent hover:bg-accent/90">
                    <Mail className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Products */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-primary">Products & Resources</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
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
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {product.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <a
                    href={product.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="w-full bg-accent hover:bg-accent/90 flex items-center justify-center gap-2">
                      View Product
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatorProfile;
