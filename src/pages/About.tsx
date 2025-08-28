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
        <section className="text-center mb-32">
          <h1 className="text-5xl md:text-7xl font-light mb-8">
            AI That Works Everywhere
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            <strong>2.9 billion people</strong> lack reliable internet access. 
            We're building AI that works completely offline.
          </p>
        </section>

        {/* Problem & Solution */}
        <section className="mb-32">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16 text-center">
              <div>
                <div className="text-4xl font-light mb-2">2.9B</div>
                <p className="text-sm text-muted-foreground">Without internet</p>
              </div>
              <div>
                <div className="text-4xl font-light mb-2">244M</div>
                <p className="text-sm text-muted-foreground">Children out of school</p>
              </div>
              <div>
                <div className="text-4xl font-light mb-2">$1.8T</div>
                <p className="text-sm text-muted-foreground">AI market by 2030</p>
              </div>
            </div>
            
            <div className="space-y-16 max-w-2xl mx-auto">
              <div>
                <h2 className="text-2xl font-light mb-4">The Problem</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Current AI solutions require constant connectivity. In rural Africa, only 28% have internet access. 
                  This prevents billions from accessing AI-powered education and services.
                </p>
              </div>
              
              <div>
                <h2 className="text-2xl font-light mb-4">Our Solution</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Full-powered AI that runs locally. No internet required. 
                  Same capabilities as cloud-based AI, accessible everywhere.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="mb-32">
          <div className="max-w-2xl mx-auto">
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-foreground/10 flex items-center justify-center mt-1">
                  <div className="w-2 h-2 rounded-full bg-foreground"></div>
                </div>
                <div>
                  <h3 className="font-medium mb-1">Offline-First</h3>
                  <p className="text-sm text-muted-foreground">Works without internet connectivity</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-foreground/10 flex items-center justify-center mt-1">
                  <div className="w-2 h-2 rounded-full bg-foreground"></div>
                </div>
                <div>
                  <h3 className="font-medium mb-1">Private by Design</h3>
                  <p className="text-sm text-muted-foreground">Your data never leaves your device</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-foreground/10 flex items-center justify-center mt-1">
                  <div className="w-2 h-2 rounded-full bg-foreground"></div>
                </div>
                <div>
                  <h3 className="font-medium mb-1">Culturally Aware</h3>
                  <p className="text-sm text-muted-foreground">Built for African languages and contexts</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <div className="max-w-xl mx-auto">
            <h2 className="text-3xl font-light mb-6">
              Ready to Get Started?
            </h2>
            
            <p className="text-muted-foreground mb-8">
              Join us in making AI accessible everywhere.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button onClick={() => navigate('/contact')} className="bg-foreground hover:bg-foreground/90 text-background">
                Contact Us
              </Button>
              <Button onClick={() => navigate('/demo-scheduling')} variant="outline">
                Schedule Demo
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>;
};
export default About;