import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronDown, Menu, X, Phone, MessageSquare, Calendar, BookOpen, ArrowRight, Play, Users, Shield, Zap, Target, CheckCircle, GraduationCap, Languages, Headphones, Brain, Mic, Database, Globe, BarChart3, Volume2, Newspaper, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import TypingAnimation from '@/components/TypingAnimation';
import EarlyAccessModal from '@/components/EarlyAccessModal';
import VideoModal from '@/components/VideoModal';
import FAQ from '@/components/FAQ';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import LiveChat from '@/components/chat/LiveChat';
import BakameAnimation from '@/components/BakameAnimation';
const Index = () => {
  const navigate = useNavigate();
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
  return <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* Enhanced space-time background */}
      <div className="absolute inset-0 overflow-hidden">
        <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="1" result="coloredBlur" />
              <feMerge> 
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <g transform="translate(0,0)">
            <path d="M0,25 Q25,20 50,25 T100,25" fill="none" stroke="rgba(34,197,94,0.4)" strokeWidth="0.2" filter="url(#glow)" />
            <path d="M0,50 Q25,45 50,50 T100,50" fill="none" stroke="rgba(59,130,246,0.3)" strokeWidth="0.2" />
            <path d="M0,75 Q25,70 50,75 T100,75" fill="none" stroke="rgba(34,197,94,0.4)" strokeWidth="0.2" filter="url(#glow)" />
          </g>
        </svg>
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-green-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/3 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-50 flex items-center justify-between p-6 md:p-8">
        <div className="flex items-center space-x-4">
          <div className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            Bakame AI
          </div>
          <Badge variant="outline" className="border-primary/30 text-primary text-xs">
            Beta
          </Badge>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-foreground hover:text-primary transition-colors">Home</Link>
          <Link to="/pricing" className="text-foreground hover:text-primary transition-colors">
            Pricing
          </Link>
          <Link to="/demo-scheduling" className="text-foreground hover:text-primary transition-colors">
            Schedule Demo
          </Link>
          <Link to="/about" className="text-foreground hover:text-primary transition-colors">About</Link>
          <Link to="/contact" className="text-foreground hover:text-primary transition-colors">Contact</Link>
          <ThemeToggle />
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-foreground hover:text-primary transition-colors">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          
        </div>
      </nav>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && <div className="md:hidden fixed inset-0 z-40 bg-background/95 backdrop-blur-sm">
          <div className="flex flex-col items-center justify-center h-full space-y-8">
            <Link to="/" onClick={closeMenu} className="text-2xl text-foreground hover:text-primary transition-colors">Home</Link>
            <Link to="/demo-scheduling" onClick={closeMenu} className="text-2xl text-foreground hover:text-primary transition-colors">Schedule Demo</Link>
            <Link to="/pricing" onClick={closeMenu} className="text-2xl text-foreground hover:text-primary transition-colors">Pricing</Link>
            <Link to="/about" onClick={closeMenu} className="text-2xl text-foreground hover:text-primary transition-colors">About</Link>
            <Link to="/contact" onClick={closeMenu} className="text-2xl text-foreground hover:text-primary transition-colors">Contact</Link>
            <div className="pt-4">
              <ThemeToggle />
            </div>
            <Button onClick={() => {
          closeMenu();
          navigate('/demo-scheduling');
        }} className="bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90 transition-all duration-300 transform hover:scale-105">
              Schedule Demo
            </Button>
          </div>
        </div>}

      {/* Main Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="container mx-auto px-6 py-12 text-center">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left side - Content */}
              <div className="space-y-8 text-left lg:text-left">
                <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent leading-tight">
                  AI-Powered English Learning for Schools
                </h1>
                
                <div className="text-lg md:text-xl text-muted-foreground h-12 flex items-center">
                  <TypingAnimation text="Revolutionize English education with offline-first AI tutoring." className="text-muted-foreground" />
                </div>
                
                <p className="text-base md:text-lg text-muted-foreground max-w-xl">
                  Transform English learning with AI-powered tutoring that improves student speaking confidence, 
                  supports teachers with progress tracking, and works reliably in any classroom.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button onClick={() => navigate('/demo-scheduling')} className="bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90 transition-all duration-300 transform hover:scale-105 text-base px-6 py-3">
                    <Calendar className="mr-2 h-4 w-4" />
                    Schedule a Demo
                  </Button>
                  <Button onClick={() => navigate('/pricing')} variant="outline" className="border-border text-foreground hover:bg-muted transition-all duration-300 transform hover:scale-105 text-base px-6 py-3">
                    <ArrowRight className="mr-2 h-4 w-4" />
                    View Pricing
                  </Button>
                </div>
              </div>

              {/* Right side - Animation */}
              <div className="lg:order-2">
                <BakameAnimation 
                  variant="hero"
                  className="animate-fade-in"
                  loop={true}
                />
              </div>
            </div>

            {/* Key Benefits */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 mt-12">
              <div className="px-4 py-2 bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg border border-border flex items-center gap-2">
                <Volume2 className="h-4 w-4 text-foreground" />
                <span className="text-muted-foreground text-sm">Speaking Confidence</span>
              </div>
              
              <div className="px-4 py-2 bg-gradient-to-r from-accent/20 to-primary/20 rounded-lg border border-border flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-foreground" />
                <span className="text-muted-foreground text-sm">Progress Tracking</span>
              </div>
              
              <div className="px-4 py-2 bg-gradient-to-r from-secondary/20 to-accent/20 rounded-lg border border-border flex items-center gap-2">
                <Users className="h-4 w-4 text-foreground" />
                <span className="text-muted-foreground text-sm">Teacher Support</span>
              </div>
            </div>
          </div>
        </section>

        {/* Core Benefits */}
        <section className="container mx-auto px-6 py-20">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-foreground">
              Proven Results for Schools
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="bg-card border-border backdrop-blur-sm hover:bg-card/80 transition-all duration-300">
                <CardHeader>
                  <Volume2 className="h-8 w-8 text-foreground mb-2" />
                  <CardTitle className="text-card-foreground">Speaking Confidence</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground">
                    Students gain confidence through safe, judgment-free conversation practice with AI tutors available 24/7.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="bg-card border-border backdrop-blur-sm hover:bg-card/80 transition-all duration-300">
                <CardHeader>
                  <BarChart3 className="h-8 w-8 text-foreground mb-2" />
                  <CardTitle className="text-card-foreground">Measurable Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground">
                    Track student improvement with detailed analytics on speaking fluency, pronunciation, and vocabulary growth.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="bg-card border-border backdrop-blur-sm hover:bg-card/80 transition-all duration-300">
                <CardHeader>
                  <Users className="h-8 w-8 text-foreground mb-2" />
                  <CardTitle className="text-card-foreground">Teacher Empowerment</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground">
                    Empower teachers with insights and tools to personalize instruction and focus on students who need the most support.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="bg-card border-border backdrop-blur-sm hover:bg-card/80 transition-all duration-300">
                <CardHeader>
                  <Shield className="h-8 w-8 text-foreground mb-2" />
                  <CardTitle className="text-card-foreground">Reliable Technology</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground">
                    Works consistently in any classroom environment, with or without internet connectivity.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Implementation Benefits */}
        <section className="container mx-auto px-6 py-20">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-foreground">
              Easy Implementation, Immediate Impact
            </h2>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Quick Setup</h3>
                    <p className="text-muted-foreground">Get started in your school within 24 hours with minimal IT requirements.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Teacher Training Included</h3>
                    <p className="text-muted-foreground">Comprehensive onboarding ensures teachers feel confident using the platform.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Curriculum Alignment</h3>
                    <p className="text-muted-foreground">Integrates seamlessly with existing English learning objectives and standards.</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <BarChart3 className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Improved Test Scores</h3>
                    <p className="text-muted-foreground">Schools report measurable improvements in English speaking assessments.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Users className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Student Engagement</h3>
                    <p className="text-muted-foreground">Interactive AI conversations increase student participation and enthusiasm.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Shield className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Reliable Performance</h3>
                    <p className="text-muted-foreground">Consistent operation in any environment, ensuring uninterrupted learning.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* School Success Stories */}
        <section className="container mx-auto px-6 py-20">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-foreground">
              Transforming English Education
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="bg-card border-border backdrop-blur-sm text-center p-8">
                <div className="text-4xl font-bold text-primary mb-2">85%</div>
                <div className="text-lg font-semibold text-foreground mb-2">Improved Speaking Confidence</div>
                <p className="text-muted-foreground">Students show measurable improvement in speaking assessments within one semester</p>
              </Card>
              
              <Card className="bg-card border-border backdrop-blur-sm text-center p-8">
                <div className="text-4xl font-bold text-primary mb-2">30%</div>
                <div className="text-lg font-semibold text-foreground mb-2">Increased Participation</div>
                <p className="text-muted-foreground">More students actively participate in English class discussions and activities</p>
              </Card>
              
              <Card className="bg-card border-border backdrop-blur-sm text-center p-8">
                <div className="text-4xl font-bold text-primary mb-2">95%</div>
                <div className="text-lg font-semibold text-foreground mb-2">Teacher Satisfaction</div>
                <p className="text-muted-foreground">Teachers report the platform enhances their ability to support student learning</p>
              </Card>
            </div>
          </div>
        </section>

        {/* School Testimonials */}
        <section className="container mx-auto px-6 py-20">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-foreground">
              What Educators Are Saying
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-card border-border backdrop-blur-sm">
                <CardContent className="p-8">
                  <p className="text-muted-foreground italic mb-4">
                    "The AI tutoring platform has transformed how my students approach English speaking. 
                    They're more confident and engaged than ever before."
                  </p>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-primary-foreground font-bold">MJ</span>
                    </div>
                    <div>
                      <p className="text-foreground font-semibold">Maria Johnson</p>
                      <p className="text-muted-foreground text-sm">English Department Head</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border backdrop-blur-sm">
                <CardContent className="p-8">
                  <p className="text-muted-foreground italic mb-4">
                    "The detailed progress reports help me identify which students need extra support. 
                    It's like having a teaching assistant for every student."
                  </p>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                      <span className="text-secondary-foreground font-bold">DR</span>
                    </div>
                    <div>
                      <p className="text-foreground font-semibold">David Rodriguez</p>
                      <p className="text-muted-foreground text-sm">Middle School Principal</p>
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
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
              Transform English Learning in Your School
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join schools worldwide that are improving student outcomes with AI-powered English tutoring. 
              Schedule your personalized demo today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button onClick={() => navigate('/demo-scheduling')} className="bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90 transition-all duration-300 transform hover:scale-105 text-lg px-8 py-4">
                <Calendar className="mr-2 h-5 w-5" />
                Schedule Demo
              </Button>
              
              <Button onClick={() => navigate('/pricing')} variant="outline" className="border-border text-foreground hover:bg-muted transition-all duration-300 text-lg px-8 py-4">
                <ArrowRight className="mr-2 h-5 w-5" />
                View Pricing
              </Button>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="container mx-auto px-6 py-20">
          <FAQ />
        </section>

        {/* Footer */}
        <footer className="border-t border-border bg-card/50 backdrop-blur-sm">
          <div className="container mx-auto px-6 py-12">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">Company</h3>
                <ul className="space-y-2">
                  <li><Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">About</Link></li>
                  <li><Link to="/team" className="text-muted-foreground hover:text-foreground transition-colors">Team</Link></li>
                  <li><Link to="/blog" className="text-muted-foreground hover:text-foreground transition-colors">Blog</Link></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">For Schools</h3>
                <ul className="space-y-2">
                  <li><Link to="/demo-scheduling" className="text-muted-foreground hover:text-foreground transition-colors">Schedule Demo</Link></li>
                  <li><Link to="/demo-scheduling" className="text-muted-foreground hover:text-foreground transition-colors">Schedule Demo</Link></li>
                  <li><Link to="/pricing" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</Link></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">Support</h3>
                <ul className="space-y-2">
                  <li><Link to="/support" className="text-muted-foreground hover:text-foreground transition-colors">Help Center</Link></li>
                  <li><Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact Support</Link></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">Legal</h3>
                <ul className="space-y-2">
                  <li><Link to="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</Link></li>
                  <li><Link to="/terms" className="text-muted-foreground hover:text-foreground transition-colors">Terms of Service</Link></li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-border pt-8 mt-8 text-center">
              <p className="text-muted-foreground">© 2025 Bakame AI. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>

      {/* Modals */}
      <EarlyAccessModal isOpen={isEarlyAccessOpen} onClose={() => setIsEarlyAccessOpen(false)} />
      
      <VideoModal isOpen={isVideoOpen} onClose={() => setIsVideoOpen(false)} videoId="dQw4w9WgXcQ" />
      
      {/* Live Chat */}
      <LiveChat />
    </div>;
};
export default Index;