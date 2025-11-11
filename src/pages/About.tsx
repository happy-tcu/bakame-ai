import { useNavigate } from "react-router-dom";
import { Target, Eye, Heart, Users, Globe, Shield, Zap, MapPin, Clock, Award, TrendingUp, Lightbulb, Rocket } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import AnimatedCounter from "@/components/AnimatedCounter";
import Navbar from "@/components/layout/Navbar";
const About = () => {
  const navigate = useNavigate();
  return <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <div className="container mx-auto px-6 py-20">
        {/* Hero Section */}
        <section className="text-center mb-20">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
            AI That Works
            <span className="text-foreground"> Everywhere</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in" style={{animationDelay: '0.2s'}}>
            <strong>2.9 billion people</strong> lack reliable internet access. 
            We're building AI technology that works without connectivity, 
            making advanced AI accessible to everyone, everywhere.
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
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">The Numbers Tell the Story</h2>
            
            {/* Problem Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="text-center p-6 bg-card/50 border border-border/50 rounded-lg hover:bg-card/70 transition-colors">
                <div className="text-4xl font-bold mb-2 text-foreground">2.9B</div>
                <p className="text-sm text-muted-foreground">People without reliable internet access globally</p>
              </div>
              <div className="text-center p-6 bg-card/50 border border-border/50 rounded-lg hover:bg-card/70 transition-colors">
                <div className="text-4xl font-bold mb-2 text-foreground">244M</div>
                <p className="text-sm text-muted-foreground">Children out of school worldwide</p>
              </div>
              <div className="text-center p-6 bg-card/50 border border-border/50 rounded-lg hover:bg-card/70 transition-colors">
                <div className="text-4xl font-bold mb-2 text-foreground">70%</div>
                <p className="text-sm text-muted-foreground">Of sub-Saharan Africa lacks internet access</p>
              </div>
            </div>
            
            <div className="space-y-8">
              <Card className="bg-card border-border shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <h3 className="font-bold mb-2 text-foreground">The Digital Divide</h3>
                  <p className="text-foreground/90">
                    In rural Africa, <strong className="text-foreground">only 28% have internet access</strong> compared to 80% in urban areas. 
                    This gap prevents billions from accessing AI-powered education, healthcare, and services that could transform their lives.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card border-border shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <h3 className="font-bold mb-2 text-foreground">Education Crisis</h3>
                  <p className="text-foreground/90">
                    <strong className="text-foreground">617 million children</strong> worldwide cannot read or do basic math. 
                    AI tutoring could address this, but current solutions require constant connectivity that doesn't exist in most rural areas.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card border-border shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <h3 className="font-bold mb-2 text-foreground">Market Opportunity</h3>
                  <p className="text-foreground/90">
                    The global AI market is projected to reach <strong className="text-foreground">$1.8 trillion by 2030</strong>. 
                    Yet most of this value is concentrated in connected regions. Offline AI could unlock this potential for the remaining 40% of the world.
                  </p>
                </CardContent>
              </Card>
            </div>
            
            {/* Potential Impact Stats */}
            <div className="mt-12 p-8 bg-card border border-border rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-6 text-center text-foreground">The Potential</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                <div>
                  <strong className="text-foreground">If we could provide offline AI tutoring:</strong>
                  <ul className="mt-2 space-y-1 text-foreground/80">
                    <li>• <span className="font-medium">244M</span> out-of-school children could access personalized education</li>
                    <li>• Rural schools could offer advanced language learning</li>
                    <li>• Emergency services could reach remote communities</li>
                  </ul>
                </div>
                <div>
                  <strong className="text-foreground">Market size in underconnected regions:</strong>
                  <ul className="mt-2 space-y-1 text-foreground/80">
                    <li>• <span className="font-medium">$47B</span> education technology market in developing countries</li>
                    <li>• <span className="font-medium">$12B</span> government digital services market</li>
                    <li>• <span className="font-medium">$8B</span> healthcare AI market in rural areas</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission, Vision, Values */}
        <section className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="bg-card border-border text-center shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-muted/60 border border-border rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-6 h-6 text-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground">Mission</h3>
                <p className="text-foreground/80">
                  Make AI accessible to everyone, regardless of internet connectivity.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border text-center shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-muted/60 border border-border rounded-full flex items-center justify-center mx-auto mb-4">
                  <Eye className="w-6 h-6 text-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground">Vision</h3>
                <p className="text-foreground/80">
                  A world where location doesn't determine access to AI technology.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border text-center shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-muted/60 border border-border rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-6 h-6 text-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground">Values</h3>
                <p className="text-foreground/80">
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
                Actual Demo
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>;
};
export default About;