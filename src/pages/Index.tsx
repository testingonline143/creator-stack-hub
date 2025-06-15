
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Users, TrendingUp, Star, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="px-6 py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-6xl mx-auto text-center">
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold text-primary mb-6 leading-tight">
              Build Your
              <span className="text-accent"> Creator Brand</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Showcase your digital products, grow your audience, and connect with other creators. 
              Get discovered by thousands of potential customers on CreatorStack.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/dashboard">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-white px-8 py-4 text-lg">
                  Create Your Profile
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/explore">
                <Button size="lg" variant="outline" className="px-8 py-4 text-lg border-2">
                  Explore Creators
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Why Creators Choose CreatorStack
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join thousands of digital creators who are growing their audience and increasing their sales
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="bg-accent/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <TrendingUp className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Increase Visibility</h3>
                <p className="text-gray-600">
                  Get discovered by your ideal customers through our SEO-optimized explore directory
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="bg-accent/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <Star className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Build Trust</h3>
                <p className="text-gray-600">
                  Professional creator pages that showcase your expertise and build credibility
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="bg-accent/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <Users className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Generate Leads</h3>
                <p className="text-gray-600">
                  Capture email addresses and convert visitors into customers with premium features
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20 bg-primary text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Grow Your Creator Business?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join CreatorStack today and start building your professional creator presence
          </p>
          <Link to="/dashboard">
            <Button size="lg" variant="secondary" className="px-8 py-4 text-lg">
              Get Started for Free
              <Zap className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 px-6 py-12">
        <div className="max-w-6xl mx-auto text-center">
          <div className="text-2xl font-bold text-primary mb-4">CreatorStack</div>
          <p className="text-gray-600">Empowering digital creators worldwide</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
