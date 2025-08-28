import { useNavigate } from "react-router-dom";
import { ArrowLeft, Target, Eye, Heart, Users, Globe, Shield, Zap, MapPin, Clock, Award, TrendingUp, Lightbulb, Rocket } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import AnimatedCounter from "@/components/AnimatedCounter";
const About = () => {
  const navigate = useNavigate();
  return <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="flex justify-between items-center p-6 md:p-8 border-b border-border">
        <div className="flex items-center space-x-4">
          <button onClick={() => navigate('/')} className="p-2 hover:bg-muted rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="text-2xl font-bold">Bakame AI</div>
        </div>
        <div className="hidden md:flex space-x-8">
          
          <button onClick={() => navigate('/demo-scheduling')} className="text-muted-foreground hover:text-foreground transition-colors">Demo</button>
          <button onClick={() => navigate('/team')} className="text-muted-foreground hover:text-foreground transition-colors">Team</button>
          <button onClick={() => navigate('/contact')} className="text-muted-foreground hover:text-foreground transition-colors">Contact</button>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-20">
        {/* Hero Section */}
        <section className="text-center mb-20">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
            AI That Works
            <span className="text-foreground"> Everywhere</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in" style={{animationDelay: '0.2s'}}>
            We're building AI technology that works without internet connectivity. 
            Making advanced AI accessible to everyone, everywhere.
          </p>
          <div className="flex items-center justify-center gap-6 mt-8 animate-fade-in" style={{animationDelay: '0.4s'}}>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>Kigali, Rwanda</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>Founded 2025</span>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="mb-20">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Our Story</h2>
            
            <div className="space-y-8">
              <Card className="bg-card border-border">
                <CardContent className="p-6">
                  <h3 className="font-bold mb-2">The Problem</h3>
                  <p>
                    Billions of people lack reliable internet access, yet current AI solutions require constant connectivity. 
                    This creates a digital divide that limits opportunities.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardContent className="p-6">
                  <h3 className="font-bold mb-2">Our Solution</h3>
                  <p>
                    We're developing AI that works completely offline. Full-powered artificial intelligence 
                    that runs locally, making advanced technology accessible regardless of internet connectivity.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardContent className="p-6">
                  <h3 className="font-bold mb-2">The Vision</h3>
                  <p>
                    A world where your location doesn't determine your access to AI technology. 
                    Where a student in rural Rwanda has the same AI capabilities as someone in New York.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Mission, Vision, Values */}
        <section className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="bg-card border-border text-center">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">Mission</h3>
                <p className="text-muted-foreground">
                  Make AI accessible to everyone, regardless of internet connectivity.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border text-center">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Eye className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">Vision</h3>
                <p className="text-muted-foreground">
                  A world where location doesn't determine access to AI technology.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border text-center">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">Values</h3>
                <p className="text-muted-foreground">
                  Humanity first. Technology should serve people, not the other way around.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* What Makes Us Different */}
        <section className="mb-20">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center">What Makes Us Different</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-3">
                <Globe className="w-6 h-6 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold mb-1">Offline-First</h3>
                  <p className="text-muted-foreground text-sm">
                    Works without internet connectivity.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Shield className="w-6 h-6 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold mb-1">Private by Design</h3>
                  <p className="text-muted-foreground text-sm">
                    Your data never leaves your device.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Users className="w-6 h-6 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold mb-1">Culturally Aware</h3>
                  <p className="text-muted-foreground text-sm">
                    Built for African languages and contexts.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Zap className="w-6 h-6 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold mb-1">Fast</h3>
                  <p className="text-muted-foreground text-sm">
                    Instant responses, no network delays.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <div className="max-w-2xl mx-auto bg-card rounded-2xl p-8 border border-border">
            <h2 className="text-2xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            
            <p className="text-muted-foreground mb-6">
              Join us in making AI accessible everywhere.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button onClick={() => navigate('/contact')} className="bg-foreground hover:bg-foreground/90 text-background px-6 py-2">
                Contact Us
              </Button>
              <Button onClick={() => navigate('/demo-scheduling')} variant="outline" className="border-border text-foreground hover:bg-muted px-6 py-2">
                Schedule Demo
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>;
};
export default About;