
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useParams } from "react-router-dom";
import { Globe, Mail, Twitter, Linkedin, ExternalLink } from "lucide-react";

const CreatorProfile = () => {
  const { creatorId } = useParams();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-8">
            <div className="h-24 w-24 rounded-full bg-accent/10 flex items-center justify-center">
              <span className="text-2xl font-bold text-accent">JD</span>
            </div>
            
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">John Doe</h1>
              <p className="text-lg text-gray-600 mb-4">
                Digital Marketing Expert & Course Creator
              </p>
              <p className="text-gray-600 mb-6">
                Helping entrepreneurs grow their online presence with proven strategies, 
                actionable insights, and premium digital products. Over 10,000 students taught.
              </p>
              
              <div className="flex items-center space-x-4 mb-6">
                <Button size="sm" variant="outline">
                  <Globe className="h-4 w-4 mr-2" />
                  Website
                </Button>
                <Button size="sm" variant="outline">
                  <Twitter className="h-4 w-4 mr-2" />
                  Twitter
                </Button>
                <Button size="sm" variant="outline">
                  <Linkedin className="h-4 w-4 mr-2" />
                  LinkedIn
                </Button>
              </div>
            </div>
          </div>
          
          {/* Email Capture (Premium Feature) */}
          <div className="mt-8 p-6 bg-gray-50 rounded-lg">
            <h3 className="font-semibold mb-2">Stay Updated</h3>
            <p className="text-sm text-gray-600 mb-4">
              Get notified when I release new products and exclusive content.
            </p>
            <div className="flex space-x-2">
              <Input placeholder="Enter your email" className="flex-1" />
              <Button>
                <Mail className="h-4 w-4 mr-2" />
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Digital Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Email Marketing Mastery",
                description: "Complete course on building and monetizing email lists",
                type: "Course",
                price: "$97",
                link: "https://example.com"
              },
              {
                title: "Landing Page Templates",
                description: "10 high-converting landing page templates",
                type: "Template",
                price: "$29",
                link: "https://example.com"
              },
              {
                title: "Social Media Toolkit",
                description: "Templates and tools for social media management",
                type: "Tool",
                price: "$49",
                link: "https://example.com"
              },
              {
                title: "Content Calendar Template",
                description: "Notion template for content planning",
                type: "Template",
                price: "$19",
                link: "https://example.com"
              },
              {
                title: "Facebook Ads Masterclass",
                description: "Advanced strategies for Facebook advertising",
                type: "Course",
                price: "$149",
                link: "https://example.com"
              },
              {
                title: "Growth Hacking Playbook",
                description: "Proven tactics for rapid business growth",
                type: "Guide",
                price: "$39",
                link: "https://example.com"
              }
            ].map((product, i) => (
              <Card key={i} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <Badge variant="secondary" className="mb-2">
                      {product.type}
                    </Badge>
                    <span className="font-bold text-accent">{product.price}</span>
                  </div>
                  <CardTitle className="text-lg">{product.title}</CardTitle>
                  <CardDescription>{product.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" asChild>
                    <a href={product.link} target="_blank" rel="noopener noreferrer">
                      View Product
                      <ExternalLink className="h-4 w-4 ml-2" />
                    </a>
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

export default CreatorProfile;
