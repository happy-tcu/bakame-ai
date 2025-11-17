import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Phone, MessageSquare, Calendar, Play, Users, CheckCircle, 
  GraduationCap, Brain, Mic, Volume2, Building, Award,
  Rocket, Users2, School, Bot, BookOpen as BookIcon, Podcast, PenTool,
  FileText, MicVocal, Music, Map, Hand, WifiOff,
  Lightbulb, FlaskConical, GraduationCap as GradCap,
  Star, ChevronRight, Eye, TestTube, MessageCircle, TrendingUp, Target
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/layout/Navbar';
import LiveChat from '@/components/chat/LiveChat';
import EarlyAccessModal from '@/components/EarlyAccessModal';
import AnimatedCounter from '@/components/AnimatedCounter';

const Index = () => {
  const navigate = useNavigate();
  const [isEarlyAccessOpen, setIsEarlyAccessOpen] = useState(false);
  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible((prev) => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting,
          }));
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navbar />

      {/* Hero Section with YouTube Video Background */}
      <section className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden">
        {/* YouTube Video Background */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <iframe
            className="absolute top-1/2 left-1/2 w-[177.77777778vh] h-[56.25vw] min-h-full min-w-full -translate-x-1/2 -translate-y-1/2"
            src="https://www.youtube.com/embed/pB3otRKMFAc?autoplay=1&mute=1&loop=1&playlist=pB3otRKMFAc&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&vq=hd2160&disablekb=1&fs=0&iv_load_policy=3"
            title="Background video"
            allow="autoplay; encrypted-media"
            style={{ pointerEvents: 'none' }}
          />
        </div>
        
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/80"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20 text-center">
          <div 
            id="hero-content"
            data-animate="true"
            className={`${isVisible['hero-content'] ? 'animate-scale-up' : 'opacity-0'}`}
          >
            <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight drop-shadow-2xl">
              <span className="block text-white font-extrabold">Voice and Victory</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto drop-shadow-lg">
              Revolutionary language education that transforms speaking confidence through AI tutoring, 
              proven to deliver breakthrough results in schools across Africa.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <Badge className="bg-white/10 text-white border-white/30 px-4 py-2 backdrop-blur-sm">
                <WifiOff className="mr-2 h-4 w-4" />
                Works Offline
              </Badge>
              <Badge className="bg-white/10 text-white border-white/30 px-4 py-2 backdrop-blur-sm">
                Kigali, Rwanda
              </Badge>
              <Badge className="bg-white/10 text-white border-white/30 px-4 py-2 backdrop-blur-sm">
                Seed Fundraising
              </Badge>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                onClick={() => navigate('/demo-scheduling')}
                size="lg"
                className="bg-white text-black hover:bg-gray-200 px-8 py-6 text-lg"
                data-testid="button-hero-demo"
              >
                <Play className="mr-2 h-5 w-5" />
                Book a Demo
              </Button>
              <Button 
                onClick={() => navigate('/about')}
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 px-8 py-6 text-lg backdrop-blur-sm"
                data-testid="button-hero-about"
              >
                Learn More
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Real Traction Metrics */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Real Traction, <span className="text-white font-extrabold">Real Impact</span>
            </h2>
            <p className="text-xl text-gray-400">
              Serving thousands of students across Rwanda with measurable results
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-8 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors" data-testid="metric-students">
              <div className="text-5xl font-bold mb-2 text-white">15K</div>
              <p className="text-gray-400">Students Reached</p>
            </div>
            <div className="text-center p-8 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors" data-testid="metric-schools">
              <div className="text-5xl font-bold mb-2 text-white">10</div>
              <p className="text-gray-400">Schools Deployed</p>
            </div>
            <div className="text-center p-8 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors" data-testid="metric-revenue">
              <div className="text-5xl font-bold mb-2 text-white">$30K</div>
              <p className="text-gray-400">Contracts Invoiced</p>
            </div>
            <div className="text-center p-8 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors" data-testid="metric-funding">
              <div className="text-5xl font-bold mb-2 text-white">$20K</div>
              <p className="text-gray-400">Pre-Seed Raised</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              How Bakame <span className="text-white font-extrabold">Works</span>
            </h2>
            <p className="text-xl text-gray-400">
              AI-powered education delivered through any phone — no internet required
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all" data-testid="card-step-1">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-white">1</span>
                </div>
                <Phone className="h-10 w-10 text-white mb-4" />
                <CardTitle className="text-white">Call In</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">
                  Students dial a local number from any basic phone — even without internet
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all" data-testid="card-step-2">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-white">2</span>
                </div>
                <Bot className="h-10 w-10 text-white mb-4" />
                <CardTitle className="text-white">AI Responds</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">
                  Real-time AI conversation powered by Whisper, GPT-4, and text-to-speech
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all" data-testid="card-step-3">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-white">3</span>
                </div>
                <Brain className="h-10 w-10 text-white mb-4" />
                <CardTitle className="text-white">Learn & Practice</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">
                  Personalized lessons adapt to each student's level and progress in real-time
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all" data-testid="card-step-4">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-white">4</span>
                </div>
                <TrendingUp className="h-10 w-10 text-white mb-4" />
                <CardTitle className="text-white">Track Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">
                  Teachers monitor student performance through comprehensive analytics dashboards
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Core Capabilities */}
      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Built for <span className="text-white font-extrabold">Everyone</span>
            </h2>
            <p className="text-xl text-gray-400">
              Comprehensive tools for students, teachers, and schools
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-gradient-to-br from-white/10 to-white/5 border-white/20 hover:border-white/30 transition-all" data-testid="card-students">
              <CardHeader>
                <GraduationCap className="h-12 w-12 text-white mb-4" />
                <CardTitle className="text-2xl text-white">For Students</CardTitle>
                <CardDescription className="text-gray-400">
                  AI-powered learning companion
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-300">
                    <CheckCircle className="mr-2 h-4 w-4 text-white flex-shrink-0" />
                    24/7 voice-based tutoring
                  </li>
                  <li className="flex items-center text-gray-300">
                    <CheckCircle className="mr-2 h-4 w-4 text-white flex-shrink-0" />
                    Personalized learning paths
                  </li>
                  <li className="flex items-center text-gray-300">
                    <CheckCircle className="mr-2 h-4 w-4 text-white flex-shrink-0" />
                    Real-time pronunciation feedback
                  </li>
                  <li className="flex items-center text-gray-300">
                    <CheckCircle className="mr-2 h-4 w-4 text-white flex-shrink-0" />
                    Works completely offline
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-white/10 to-white/5 border-white/20 hover:border-white/30 transition-all" data-testid="card-teachers">
              <CardHeader>
                <Users className="h-12 w-12 text-white mb-4" />
                <CardTitle className="text-2xl text-white">For Teachers</CardTitle>
                <CardDescription className="text-gray-400">
                  Data-driven insights dashboard
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-300">
                    <CheckCircle className="mr-2 h-4 w-4 text-white flex-shrink-0" />
                    Real-time student progress tracking
                  </li>
                  <li className="flex items-center text-gray-300">
                    <CheckCircle className="mr-2 h-4 w-4 text-white flex-shrink-0" />
                    Automated performance reports
                  </li>
                  <li className="flex items-center text-gray-300">
                    <CheckCircle className="mr-2 h-4 w-4 text-white flex-shrink-0" />
                    Class-wide analytics
                  </li>
                  <li className="flex items-center text-gray-300">
                    <CheckCircle className="mr-2 h-4 w-4 text-white flex-shrink-0" />
                    Curriculum alignment tools
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-white/10 to-white/5 border-white/20 hover:border-white/30 transition-all" data-testid="card-schools">
              <CardHeader>
                <Building className="h-12 w-12 text-white mb-4" />
                <CardTitle className="text-2xl text-white">For Schools</CardTitle>
                <CardDescription className="text-gray-400">
                  School-wide deployment platform
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-300">
                    <CheckCircle className="mr-2 h-4 w-4 text-white flex-shrink-0" />
                    Multi-classroom support
                  </li>
                  <li className="flex items-center text-gray-300">
                    <CheckCircle className="mr-2 h-4 w-4 text-white flex-shrink-0" />
                    Administrative controls
                  </li>
                  <li className="flex items-center text-gray-300">
                    <CheckCircle className="mr-2 h-4 w-4 text-white flex-shrink-0" />
                    ROI & impact metrics
                  </li>
                  <li className="flex items-center text-gray-300">
                    <CheckCircle className="mr-2 h-4 w-4 text-white flex-shrink-0" />
                    Training & support included
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform <span className="text-white font-extrabold">Your School?</span>
          </h2>
          <p className="text-xl text-gray-400 mb-12">
            Join 10 schools and 15,000 students already using Bakame AI to revolutionize language learning
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              onClick={() => navigate('/demo-scheduling')}
              size="lg"
              className="bg-white text-black hover:bg-gray-200 px-8 py-6 text-lg"
              data-testid="button-cta-demo"
            >
              <Calendar className="mr-2 h-5 w-5" />
              Schedule a Demo
            </Button>
            <Button 
              onClick={() => navigate('/contact')}
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 px-8 py-6 text-lg"
              data-testid="button-cta-contact"
            >
              <MessageSquare className="mr-2 h-5 w-5" />
              Contact Sales
            </Button>
          </div>
        </div>
      </section>

      <LiveChat />
      <EarlyAccessModal isOpen={isEarlyAccessOpen} onClose={() => setIsEarlyAccessOpen(false)} />
    </div>
  );
};

export default Index;
