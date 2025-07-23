
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Menu, X, Phone, MessageSquare, Globe, Shield, Zap, Users, ChevronRight, Star, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import EarlyAccessModal from "@/components/EarlyAccessModal";
import AnimatedCounter from "@/components/AnimatedCounter";
import TypingAnimation from "@/components/TypingAnimation";
import FAQ from "@/components/FAQ";

const Index = () => {
  const navigate = useNavigate();
  const [isEarlyAccessOpen, setIsEarlyAccessOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter signup
    console.log("Newsletter signup:", email);
    setEmail("");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    closeMobileMenu();
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="flex justify-between items-center p-6 md:p-8 relative z-50">
        <div className="text-2xl font-bold">Bakame AI</div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8">
          <button onClick={() => navigate('/about')} className="text-white/70 hover:text-white transition-colors">About</button>
          <button onClick={() => navigate('/solutions/education')} className="text-white/70 hover:text-white transition-colors">Solutions</button>
          <button onClick={() => navigate('/ivr')} className="text-white/70 hover:text-white transition-colors">Demo</button>
          <button onClick={() => navigate('/blog')} className="text-white/70 hover:text-white transition-colors">Blog</button>
          <button onClick={() => navigate('/team')} className="text-white/70 hover:text-white transition-colors">Team</button>
          <button onClick={() => navigate('/contact')} className="text-white/70 hover:text-white transition-colors">Contact</button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={toggleMobileMenu}
          className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-black border-t border-white/10 md:hidden">
            <div className="flex flex-col space-y-4 p-6">
              <button onClick={() => handleNavigation('/about')} className="text-white/70 hover:text-white transition-colors text-left">About</button>
              <button onClick={() => handleNavigation('/solutions/education')} className="text-white/70 hover:text-white transition-colors text-left">Solutions</button>
              <button onClick={() => handleNavigation('/ivr')} className="text-white/70 hover:text-white transition-colors text-left">Demo</button>
              <button onClick={() => handleNavigation('/blog')} className="text-white/70 hover:text-white transition-colors text-left">Blog</button>
              <button onClick={() => handleNavigation('/team')} className="text-white/70 hover:text-white transition-colors text-left">Team</button>
              <button onClick={() => handleNavigation('/contact')} className="text-white/70 hover:text-white transition-colors text-left">Contact</button>
              <Button 
                onClick={() => {
                  setIsEarlyAccessOpen(true);
                  closeMobileMenu();
                }} 
                className="bg-blue-600 hover:bg-blue-700 text-white mt-4"
              >
                Get Early Access
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Transform Communication with <span className="text-blue-400">Offline AI</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto">
            <TypingAnimation 
              text="Revolutionize customer service with AI that works without internet. Perfect for rural areas, emergencies, and secure environments."
              speed={50}
              pauseDuration={3000}
            />
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              onClick={() => setIsEarlyAccessOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
            >
              Get Early Access
            </Button>
            <Button 
              onClick={() => navigate('/ivr')}
              variant="outline" 
              className="border-white/20 text-white hover:bg-white/10 px-8 py-3 text-lg"
            >
              Try Live Demo
            </Button>
            <Button 
              onClick={() => navigate('/contact')}
              variant="ghost" 
              className="text-white hover:bg-white/10 px-8 py-3 text-lg"
            >
              Schedule Demo <ChevronRight className="ml-2 w-4 h-4" />
            </Button>
          </div>

          {/* Trust Signals */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-white/60">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              <span>Enterprise Security</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              <span>99.9% Uptime</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              <span>1000+ Organizations</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <Card className="bg-white/5 border-white/10 text-center">
            <CardContent className="p-6">
              <AnimatedCounter end="50K+" className="text-3xl font-bold text-blue-400" />
              <p className="text-white/80 mt-2">Daily Interactions</p>
            </CardContent>
          </Card>
          <Card className="bg-white/5 border-white/10 text-center">
            <CardContent className="p-6">
              <AnimatedCounter end="99.9%" className="text-3xl font-bold text-green-400" />
              <p className="text-white/80 mt-2">Accuracy Rate</p>
            </CardContent>
          </Card>
          <Card className="bg-white/5 border-white/10 text-center">
            <CardContent className="p-6">
              <AnimatedCounter end="24/7" className="text-3xl font-bold text-purple-400" />
              <p className="text-white/80 mt-2">Availability</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Bakame AI?</h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Our offline AI technology ensures your communication never stops, regardless of connectivity
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors">
            <CardContent className="p-6">
              <Globe className="w-12 h-12 text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Works Anywhere</h3>
              <p className="text-white/80">Function perfectly in remote areas, underground locations, or during network outages</p>
            </CardContent>
          </Card>
          <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors">
            <CardContent className="p-6">
              <Shield className="w-12 h-12 text-green-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Ultra Secure</h3>
              <p className="text-white/80">Your data stays on your premises. No cloud dependency means ultimate privacy and security</p>
            </CardContent>
          </Card>
          <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors">
            <CardContent className="p-6">
              <Zap className="w-12 h-12 text-yellow-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
              <p className="text-white/80">Local processing means instant responses without latency or bandwidth limitations</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Use Cases</h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            See how Bakame AI transforms communication across industries
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors cursor-pointer" onClick={() => navigate('/solutions/government')}>
            <CardContent className="p-6">
              <Badge className="mb-4 bg-blue-600">Government</Badge>
              <h3 className="text-xl font-semibold mb-2">Emergency Services</h3>
              <p className="text-white/80">Critical communication during disasters when traditional networks fail</p>
            </CardContent>
          </Card>
          <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors cursor-pointer" onClick={() => navigate('/solutions/education')}>
            <CardContent className="p-6">
              <Badge className="mb-4 bg-green-600">Education</Badge>
              <h3 className="text-xl font-semibold mb-2">Rural Schools</h3>
              <p className="text-white/80">Provide AI-powered education tools in areas with limited internet access</p>
            </CardContent>
          </Card>
          <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors cursor-pointer" onClick={() => navigate('/solutions/enterprise')}>
            <CardContent className="p-6">
              <Badge className="mb-4 bg-purple-600">Enterprise</Badge>
              <h3 className="text-xl font-semibold mb-2">Customer Service</h3>
              <p className="text-white/80">24/7 multilingual support that works even during outages</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-6">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-white/80 mb-4">"Bakame AI saved our emergency response system during the hurricane. When all networks went down, we could still communicate with residents."</p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white font-bold">JD</span>
                </div>
                <div>
                  <p className="font-semibold">John Davis</p>
                  <p className="text-white/60 text-sm">Emergency Coordinator</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-6">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-white/80 mb-4">"Our rural school district finally has access to AI-powered learning tools. The offline capability is a game-changer for our remote students."</p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white font-bold">SM</span>
                </div>
                <div>
                  <p className="font-semibold">Sarah Mitchell</p>
                  <p className="text-white/60 text-sm">School Principal</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-6">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-white/80 mb-4">"The security and reliability of offline AI processing gives us confidence to handle sensitive customer data without compromise."</p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white font-bold">MR</span>
                </div>
                <div>
                  <p className="font-semibold">Michael Rodriguez</p>
                  <p className="text-white/60 text-sm">IT Director</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto px-6 py-20">
        <FAQ />
      </section>

      {/* Dataset Contribution Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Help Us Build Better AI</h2>
          <p className="text-white/80 text-lg mb-8">
            Contribute to our African language dataset and help create more inclusive AI technology. 
            Your participation helps preserve and digitize African languages for future generations.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-6">
                <Phone className="w-12 h-12 text-blue-400 mb-4 mx-auto" />
                <h3 className="text-xl font-semibold mb-2">Voice Contributions</h3>
                <p className="text-white/80">Record speech samples in your native language to improve our voice recognition</p>
              </CardContent>
            </Card>
            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-6">
                <MessageSquare className="w-12 h-12 text-green-400 mb-4 mx-auto" />
                <h3 className="text-xl font-semibold mb-2">Text Contributions</h3>
                <p className="text-white/80">Share written content to help train our language models</p>
              </CardContent>
            </Card>
          </div>

          <Button 
            onClick={() => navigate('/early-access')}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg"
          >
            Join the Dataset Initiative
          </Button>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Stay Updated</h2>
          <p className="text-white/80 text-lg mb-8">
            Get the latest updates on offline AI technology and early access opportunities
          </p>
          
          <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder-white/50"
              required
            />
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
              Subscribe
            </Button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Bakame AI</h3>
              <p className="text-white/80">Revolutionizing communication with offline AI technology</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Solutions</h4>
              <ul className="space-y-2">
                <li><button onClick={() => navigate('/solutions/government')} className="text-white/80 hover:text-white transition-colors">Government</button></li>
                <li><button onClick={() => navigate('/solutions/education')} className="text-white/80 hover:text-white transition-colors">Education</button></li>
                <li><button onClick={() => navigate('/solutions/enterprise')} className="text-white/80 hover:text-white transition-colors">Enterprise</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><button onClick={() => navigate('/about')} className="text-white/80 hover:text-white transition-colors">About</button></li>
                <li><button onClick={() => navigate('/team')} className="text-white/80 hover:text-white transition-colors">Team</button></li>
                <li><button onClick={() => navigate('/blog')} className="text-white/80 hover:text-white transition-colors">Blog</button></li>
                <li><button onClick={() => navigate('/contact')} className="text-white/80 hover:text-white transition-colors">Contact</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><button onClick={() => navigate('/privacy')} className="text-white/80 hover:text-white transition-colors">Privacy Policy</button></li>
                <li><button onClick={() => navigate('/terms')} className="text-white/80 hover:text-white transition-colors">Terms of Service</button></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 mt-8 pt-8 text-center text-white/60">
            <p>&copy; 2024 Bakame AI. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <EarlyAccessModal 
        isOpen={isEarlyAccessOpen} 
        onClose={() => setIsEarlyAccessOpen(false)} 
      />
    </div>
  );
};

export default Index;
