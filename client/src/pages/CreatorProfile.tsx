
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useParams } from "wouter";
import { Globe, Mail, Twitter, Linkedin, ExternalLink, Download, CheckCircle2, Star } from "lucide-react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import type { Product, Resource } from "@shared/schema";

const CreatorProfile = () => {
  const { username } = useParams();
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  // Fetch creator data by username
  const { data: creator, isLoading: creatorLoading } = useQuery({
    queryKey: ['/api/creators/username', username],
    queryFn: () => apiRequest(`/api/creators/username/${username}`),
    enabled: !!username,
  });

  // Fetch creator's products
  const { data: products = [], isLoading: productsLoading } = useQuery({
    queryKey: ['/api/products/creator', creator?.id],
    queryFn: () => apiRequest(`/api/products/creator/${creator?.id}`),
    enabled: !!creator?.id,
  });

  // Fetch creator's resources
  const { data: resources = [], isLoading: resourcesLoading } = useQuery({
    queryKey: ['/api/resources/creator', creator?.id],
    queryFn: () => apiRequest(`/api/resources/creator/${creator?.id}`),
    enabled: !!creator?.id,
  });

  // Email subscription mutation
  const subscribeToEmail = useMutation({
    mutationFn: (emailData: { email: string; creatorId: number }) =>
      apiRequest('/api/email-submissions', {
        method: 'POST',
        body: JSON.stringify(emailData),
        headers: { 'Content-Type': 'application/json' },
      }),
    onSuccess: () => {
      toast({
        title: "Subscribed successfully!",
        description: "You'll receive updates when new products are released.",
      });
      setEmail("");
    },
    onError: () => {
      toast({
        title: "Subscription failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && creator) {
      subscribeToEmail.mutate({ email, creatorId: creator.id });
    }
  };

  if (creatorLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      </div>
    );
  }

  if (!creator) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-4xl mx-auto px-6 py-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Creator not found</h1>
          <p className="text-gray-600">The creator you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getSocialLinks = () => {
    if (!creator.socials) return [];
    
    const socials = typeof creator.socials === 'string' 
      ? JSON.parse(creator.socials) 
      : creator.socials;
    
    return [
      { name: 'Website', url: socials.website, icon: Globe },
      { name: 'Twitter', url: socials.twitter, icon: Twitter },
      { name: 'LinkedIn', url: socials.linkedin, icon: Linkedin },
    ].filter(social => social.url);
  };

  const approvedProducts = products.filter((p: Product) => p.status === 'approved');
  const freeResources = resources.filter((r: Resource) => r.visibleTo === 'free' || !r.visibleTo);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Profile Header */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-8">
            <Avatar className="h-20 w-20">
              <AvatarImage src={creator.avatarUrl} alt={creator.name} />
              <AvatarFallback className="text-2xl font-bold bg-blue-100 text-blue-600">
                {getInitials(creator.name)}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{creator.name}</h1>
                {creator.isPremium && (
                  <Badge variant="default" className="bg-yellow-100 text-yellow-800 border-yellow-200">
                    <Star className="h-3 w-3 mr-1" />
                    Premium
                  </Badge>
                )}
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {creator.bio || 'Creator and digital product expert'}
              </p>
              
              <div className="flex items-center space-x-3 mb-4">
                {getSocialLinks().map((social, i) => (
                  <Button key={i} size="sm" variant="outline" asChild>
                    <a href={social.url} target="_blank" rel="noopener noreferrer">
                      <social.icon className="h-4 w-4 mr-2" />
                      {social.name}
                    </a>
                  </Button>
                ))}
              </div>
            </div>
          </div>
          
          {/* Email Newsletter Signup */}
          <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              <h3 className="font-semibold text-gray-900 dark:text-white">Get Free Resources & Updates</h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              Subscribe to get new templates, exclusive content, and early access to products.
            </p>
            <form onSubmit={handleEmailSubmit} className="flex space-x-2">
              <Input 
                type="email"
                placeholder="Enter your email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-white dark:bg-gray-700" 
                required
              />
              <Button 
                type="submit" 
                className="bg-blue-600 hover:bg-blue-700"
                disabled={subscribeToEmail.isPending}
              >
                <Mail className="h-4 w-4 mr-2" />
                {subscribeToEmail.isPending ? 'Subscribing...' : 'Subscribe'}
              </Button>
            </form>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              Trusted by 2,500+ creators. No spam, unsubscribe anytime.
            </p>
          </div>
        </div>

        {/* Digital Products */}
        {approvedProducts.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              Digital Products
              <Badge variant="outline" className="ml-2">
                {approvedProducts.length}
              </Badge>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {approvedProducts.map((product: Product) => (
                <Card key={product.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <Badge variant="secondary" className="mb-2">
                        Product
                      </Badge>
                      <span className="text-lg font-bold text-blue-600">
                        $29
                      </span>
                    </div>
                    <CardTitle className="text-lg">{product.title}</CardTitle>
                    <CardDescription>{product.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full" asChild>
                      <a href={product.link || '#'} target="_blank" rel="noopener noreferrer">
                        View Product
                        <ExternalLink className="h-4 w-4 ml-2" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Free Resources */}
        {freeResources.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <Download className="h-5 w-5" />
              Free Downloads
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {freeResources.map((resource: Resource) => (
                <Card key={resource.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <Badge variant="default" className="bg-green-100 text-green-800 border-green-200 mb-2">
                        Free
                      </Badge>
                      <Download className="h-5 w-5 text-gray-400" />
                    </div>
                    <CardTitle className="text-lg">{resource.title}</CardTitle>
                    <CardDescription>{resource.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full" asChild>
                      <a href={resource.link || '#'} target="_blank" rel="noopener noreferrer">
                        Download
                        <Download className="h-4 w-4 ml-2" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {approvedProducts.length === 0 && freeResources.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Coming Soon
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              {creator.name} is working on some amazing products. Subscribe to get notified when they're ready!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreatorProfile;
