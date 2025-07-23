
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Menu, X, Phone, MessageSquare, Calendar, BookOpen, ArrowRight, Play, Users, Shield, Zap, Target, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import TypingAnimation from '@/components/TypingAnimation';
import EarlyAccessModal from '@/components/EarlyAccessModal';
import VideoModal from '@/components/VideoModal';
import FAQ from '@/components/FAQ';

const Index = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEarlyAccessOpen, setIsEarlyAccessOpen] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const openEarlyAccess = () => {
    setIsEarlyAccessOpen(true);
  };

  const openVideo = () => {
    setIsVideoOpen(true);
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Enhanced space-time background */}
      <div className="absolute inset-0 overflow-hidden">
        <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <g transform="translate(0,0)">
            <path d="M0,25 Q25,20 50,25 T100,25" fill="none" stroke="rgba(34,197,94,0.4)" strokeWidth="0.2" filter="url(#glow)"/>
            <path d="M0,50 Q25,45 50,50 T100,50" fill="none" stroke="rgba(59,130,246,0.3)" strokeWidth="0.2"/>
            <path d="M0,75 Q25,70 50,75 T100,75" fill="none" stroke="rgba(34,197,94,0.4)" strokeWidth="0.2" filter="url(#glow)"/>
          </g>
        </svg>
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-green-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/3 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-50 flex items-center justify-between p-6 md:p-8">
        <div className="flex items-center space-x-4">
          <div className="text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
            Bakame AI
          </div>
          <Badge variant="outline" className="border-green-500/30 text-green-400 text-xs">
            Beta
          </Badge>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-white hover:text-green-400 transition-colors">Home</Link>
          <div className="relative group">
            <button className="flex items-center text-white hover:text-green-400 transition-colors">
              Solutions <ChevronDown className="ml-1 h-4 w-4" />
            </button>
            <div className="absolute top-full left-0 mt-2 w-48 bg-gray-900 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border border-white/10">
              <Link to="/government-solution" className="block px-4 py-2 text-white hover:bg-white/10 hover:text-green-400 transition-colors">Government</Link>
              <Link to="/enterprise-solution" className="block px-4 py-2 text-white hover:bg-white/10 hover:text-green-400 transition-colors">Enterprise</Link>
              <Link to="/education-solution" className="block px-4 py-2 text-white hover:bg-white/10 hover:text-green-400 transition-colors">Education</Link>
            </div>
          </div>
          <Link to="/about" className="text-white hover:text-green-400 transition-colors">About</Link>
          <Link to="/team" className="text-white hover:text-green-400 transition-colors">Team</Link>
          <Link to="/contact" className="text-white hover:text-green-400 transition-colors">Contact</Link>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white hover:text-green-400 transition-colors">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <Button 
            onClick={openEarlyAccess}
            className="bg-gradient-to-r from-green-500 to-blue-500 text-white hover:from-green-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105"
          >
            Get Early Access
          </Button>
        </div>
      </nav>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-black bg-opacity-95 backdrop-blur-sm">
          <div className="flex flex-col items-center justify-center h-full space-y-8">
            <Link to="/" onClick={closeMenu} className="text-2xl text-white hover:text-green-400 transition-colors">Home</Link>
            <div className="text-center">
              <div className="text-xl text-white mb-4">Solutions</div>
              <div className="space-y-4">
                <Link to="/government-solution" onClick={closeMenu} className="block text-white hover:text-green-400 transition-colors">Government</Link>
                <Link to="/enterprise-solution" onClick={closeMenu} className="block text-white hover:text-green-400 transition-colors">Enterprise</Link>
                <Link to="/education-solution" onClick={closeMenu} className="block text-white hover:text-green-400 transition-colors">Education</Link>
              </div>
            </div>
            <Link to="/about" onClick={closeMenu} className="text-2xl text-white hover:text-green-400 transition-colors">About</Link>
            <Link to="/team" onClick={closeMenu} className="text-2xl text-white hover:text-green-400 transition-colors">Team</Link>
            <Link to="/contact" onClick={closeMenu} className="text-2xl text-white hover:text-green-400 transition-colors">Contact</Link>
            <Button 
              onClick={() => {
                closeMenu();
                openEarlyAccess();
              }}
              className="bg-gradient-to-r from-green-500 to-blue-500 text-white hover:from-green-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105"
            >
              Get Early Access
            </Button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="container mx-auto px-6 py-20 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent leading-tight">
              Offline AI Voice Solutions for Critical Infrastructure
            </h1>
            
            <div className="text-xl md:text-2xl text-white/80 mb-8 h-16 flex items-center justify-center">
              <TypingAnimation 
                text="Secure, reliable, and always available - even when the internet isn't."
                className="text-white/80"
              />
            </div>
            
            <p className="text-lg text-white/70 mb-12 max-w-2xl mx-auto">
              We're building the next generation of IVR systems that work completely offline, 
              ensuring your critical services stay operational when connectivity fails.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Button 
                onClick={openEarlyAccess}
                className="bg-gradient-to-r from-green-500 to-blue-500 text-white hover:from-green-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 text-lg px-8 py-4"
              >
                Join Beta Program
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              <Button 
                onClick={openVideo}
                variant="outline" 
                className="border-white/30 text-white hover:bg-white/10 hover:border-white/50 transition-all duration-300 text-lg px-8 py-4"
              >
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>

            {/* Secondary CTAs */}
            <div className="flex flex-wrap justify-center gap-4 mb-16">
              <Link to="/government-demo">
                <Button variant="ghost" className="text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300">
                  <Shield className="mr-2 h-4 w-4" />
                  Government Demo
                </Button>
              </Link>
              
              <Link to="/contact">
                <Button variant="ghost" className="text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300">
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule Consultation
                </Button>
              </Link>
              
              <Link to="/about">
                <Button variant="ghost" className="text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Problem Statement */}
        <section className="container mx-auto px-6 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white">
              When Connectivity Fails, Critical Services Must Continue
            </h2>
            <p className="text-lg text-white/70 mb-12 max-w-2xl mx-auto">
              Natural disasters, cyber attacks, and infrastructure failures can disrupt internet connectivity. 
              Our offline AI ensures your voice systems remain operational when your community needs them most.
            </p>
          </div>
        </section>

        {/* Use Cases */}
        <section className="container mx-auto px-6 py-20">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-white">
              Built for Critical Infrastructure
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                <CardHeader>
                  <Shield className="h-8 w-8 text-blue-400 mb-2" />
                  <CardTitle className="text-white">Government Services</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-white/70">
                    Emergency services, citizen support, and public information systems that work even during disasters.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                <CardHeader>
                  <Users className="h-8 w-8 text-green-400 mb-2" />
                  <CardTitle className="text-white">Healthcare</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-white/70">
                    Patient support hotlines and appointment systems that remain accessible during network outages.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                <CardHeader>
                  <Zap className="h-8 w-8 text-yellow-400 mb-2" />
                  <CardTitle className="text-white">Utilities</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-white/70">
                    Power, water, and telecommunications companies maintaining customer service during outages.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="container mx-auto px-6 py-20">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-white">
              Why Choose Offline AI?
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <CheckCircle className="h-6 w-6 text-green-400 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Complete Offline Operation</h3>
                    <p className="text-white/70">No internet required - your system works independently of external connectivity.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <CheckCircle className="h-6 w-6 text-green-400 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Data Security</h3>
                    <p className="text-white/70">All processing happens locally - no data leaves your premises.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <CheckCircle className="h-6 w-6 text-green-400 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Disaster Resilience</h3>
                    <p className="text-white/70">Your systems stay operational during natural disasters and cyber attacks.</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <CheckCircle className="h-6 w-6 text-green-400 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Easy Integration</h3>
                    <p className="text-white/70">Seamlessly integrate with existing phone systems and infrastructure.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <CheckCircle className="h-6 w-6 text-green-400 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">24/7 Availability</h3>
                    <p className="text-white/70">Always-on service that doesn't depend on cloud connectivity.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <CheckCircle className="h-6 w-6 text-green-400 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Cost Effective</h3>
                    <p className="text-white/70">Reduce ongoing cloud and connectivity costs with local processing.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="container mx-auto px-6 py-20">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-white">
              Early Partner Feedback
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardContent className="p-8">
                  <p className="text-white/80 italic mb-4">
                    "The offline capability is exactly what we need for our emergency services. 
                    During the last hurricane, traditional systems failed but this kept working."
                  </p>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">JD</span>
                    </div>
                    <div>
                      <p className="text-white font-semibold">John Doe</p>
                      <p className="text-white/60 text-sm">Emergency Services Director</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardContent className="p-8">
                  <p className="text-white/80 italic mb-4">
                    "Finally, a solution that prioritizes security and reliability. 
                    Our patients can always reach us, even when the internet is down."
                  </p>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">SM</span>
                    </div>
                    <div>
                      <p className="text-white font-semibold">Sarah Miller</p>
                      <p className="text-white/60 text-sm">Healthcare IT Manager</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-6 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Ready to Build Resilient Communications?
            </h2>
            <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto">
              Join our beta program and be among the first to deploy offline AI voice solutions 
              that keep your critical services running when connectivity fails.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                onClick={openEarlyAccess}
                className="bg-gradient-to-r from-green-500 to-blue-500 text-white hover:from-green-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 text-lg px-8 py-4"
              >
                Join Beta Program
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              <Link to="/contact">
                <Button 
                  variant="outline" 
                  className="border-white/30 text-white hover:bg-white/10 hover:border-white/50 transition-all duration-300 text-lg px-8 py-4"
                >
                  <MessageSquare className="mr-2 h-5 w-5" />
                  Contact Sales
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="container mx-auto px-6 py-20">
          <FAQ />
        </section>

        {/* Footer */}
        <footer className="border-t border-white/10 bg-white/5 backdrop-blur-sm">
          <div className="container mx-auto px-6 py-12">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Company</h3>
                <ul className="space-y-2">
                  <li><Link to="/about" className="text-white/70 hover:text-white transition-colors">About</Link></li>
                  <li><Link to="/team" className="text-white/70 hover:text-white transition-colors">Team</Link></li>
                  <li><Link to="/contact" className="text-white/70 hover:text-white transition-colors">Contact</Link></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Solutions</h3>
                <ul className="space-y-2">
                  <li><Link to="/government-solution" className="text-white/70 hover:text-white transition-colors">Government</Link></li>
                  <li><Link to="/enterprise-solution" className="text-white/70 hover:text-white transition-colors">Enterprise</Link></li>
                  <li><Link to="/education-solution" className="text-white/70 hover:text-white transition-colors">Education</Link></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Support</h3>
                <ul className="space-y-2">
                  <li><Link to="/support" className="text-white/70 hover:text-white transition-colors">Help Center</Link></li>
                  <li><Link to="/government-demo" className="text-white/70 hover:text-white transition-colors">Demo</Link></li>
                  <li><Link to="/contact" className="text-white/70 hover:text-white transition-colors">Contact Support</Link></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Legal</h3>
                <ul className="space-y-2">
                  <li><Link to="/privacy" className="text-white/70 hover:text-white transition-colors">Privacy Policy</Link></li>
                  <li><Link to="/terms" className="text-white/70 hover:text-white transition-colors">Terms of Service</Link></li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-white/10 pt-8 mt-8 text-center">
              <p className="text-white/60">
                © 2024 Bakame AI. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>

      {/* Modals */}
      <EarlyAccessModal 
        isOpen={isEarlyAccessOpen} 
        onClose={() => setIsEarlyAccessOpen(false)} 
      />
      
      <VideoModal 
        isOpen={isVideoOpen} 
        onClose={() => setIsVideoOpen(false)} 
      />
    </div>
  );
};

export default Index;
