
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, 
  Package, 
  Crown, 
  ExternalLink, 
  Plus, 
  Edit3, 
  Eye,
  FileText,
  Lock
} from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const { toast } = useToast();
  const [profile, setProfile] = useState({
    name: "Alex Creator",
    bio: "Course creator helping developers build better apps",
    avatar: "",
    niche: "Web Development",
    twitter: "@alexcreator",
    linkedin: "alexcreator",
    website: "alexcreator.com"
  });

  const [products] = useState([
    {
      id: 1,
      title: "React Masterclass",
      description: "Complete guide to React development",
      link: "https://example.com/react-course",
      category: "Course",
      tags: ["React", "JavaScript", "Web Dev"],
      status: "approved"
    },
    {
      id: 2,
      title: "UI Design Templates",
      description: "50+ beautiful Figma templates",
      link: "https://example.com/templates",
      category: "Template",
      tags: ["Design", "Figma", "UI"],
      status: "pending"
    }
  ]);

  const [isPremium] = useState(false);

  const handleSaveProfile = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile has been saved successfully.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-primary mb-2">Creator Dashboard</h1>
            <p className="text-gray-600">Manage your profile and products</p>
          </div>
          <div className="flex gap-3">
            <Link to="/creator/alex-creator">
              <Button variant="outline" className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                View Profile
              </Button>
            </Link>
            {!isPremium && (
              <Button className="bg-accent hover:bg-accent/90 flex items-center gap-2">
                <Crown className="h-4 w-4" />
                Upgrade to Pro
              </Button>
            )}
          </div>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="products" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              Products
            </TabsTrigger>
            <TabsTrigger value="resources" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              {isPremium ? "Resources Hub" : <><Lock className="h-3 w-3" /> Premium</>}
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Profile Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={profile.name}
                      onChange={(e) => setProfile({...profile, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="niche">Niche</Label>
                    <Input
                      id="niche"
                      value={profile.niche}
                      onChange={(e) => setProfile({...profile, niche: e.target.value})}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={profile.bio}
                    onChange={(e) => setProfile({...profile, bio: e.target.value})}
                    rows={3}
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="twitter">Twitter</Label>
                    <Input
                      id="twitter"
                      value={profile.twitter}
                      onChange={(e) => setProfile({...profile, twitter: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="linkedin">LinkedIn</Label>
                    <Input
                      id="linkedin"
                      value={profile.linkedin}
                      onChange={(e) => setProfile({...profile, linkedin: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      value={profile.website}
                      onChange={(e) => setProfile({...profile, website: e.target.value})}
                    />
                  </div>
                </div>

                <Button onClick={handleSaveProfile} className="bg-accent hover:bg-accent/90">
                  Save Profile
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="products">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-semibold">Your Products</h2>
                  <p className="text-gray-600">Manage your courses, templates, and tools</p>
                </div>
                <Button className="bg-accent hover:bg-accent/90 flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Add Product
                </Button>
              </div>

              <div className="grid gap-4">
                {products.map((product) => (
                  <Card key={product.id}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-lg">{product.title}</h3>
                            <Badge 
                              variant={product.status === 'approved' ? 'default' : 'secondary'}
                              className={product.status === 'approved' ? 'bg-green-100 text-green-800' : ''}
                            >
                              {product.status}
                            </Badge>
                          </div>
                          <p className="text-gray-600 mb-3">{product.description}</p>
                          <div className="flex items-center gap-2 mb-3">
                            <Badge variant="outline">{product.category}</Badge>
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
                            className="text-accent hover:underline flex items-center gap-1 text-sm"
                          >
                            View Product <ExternalLink className="h-3 w-3" />
                          </a>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Edit3 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="resources">
            <Card>
              <CardContent className="p-8 text-center">
                {isPremium ? (
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Premium Resources Hub</h3>
                    <p className="text-gray-600">Access exclusive guides, templates, and tools</p>
                  </div>
                ) : (
                  <div>
                    <Lock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-4">Premium Resources Hub</h3>
                    <p className="text-gray-600 mb-6">
                      Unlock exclusive resources, guides, and tools to grow your creator business
                    </p>
                    <Button className="bg-accent hover:bg-accent/90">
                      Upgrade to Premium
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardContent className="p-8 text-center">
                <h3 className="text-xl font-semibold mb-4">Analytics Coming Soon</h3>
                <p className="text-gray-600">Track your profile views, product clicks, and more</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
