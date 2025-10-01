import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ChevronDown, Phone, MessageSquare, Calendar, BookOpen, 
  ArrowRight, Play, Users, Shield, Zap, Target, CheckCircle, 
  GraduationCap, Languages, Headphones, Brain, Mic, Database, 
  Globe, BarChart3, Volume2, Newspaper, Building, Award,
  Sparkles, Rocket, TrendingUp, Users2, School, DollarSign,
  Bot, BookOpen as BookIcon, Gamepad2, Podcast, PenTool,
  FileText, MicVocal, Music, Map, Hand, Wifi, WifiOff,
  Lightbulb, FlaskConical, GraduationCap as GradCap,
  Star, ChevronRight, Eye, TestTube, MessageCircle
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

  const features = [
    { icon: MicVocal, name: 'Voice Clone Learning', description: 'Personalized AI voice tutoring' },
    { icon: MessageCircle, name: 'AI Debate Partner', description: 'Practice argumentation skills' },
    { icon: BookIcon, name: 'Smart Flashcards', description: 'Adaptive learning system' },
    { icon: Podcast, name: 'Podcast Generator', description: 'Create custom learning content' },
    { icon: PenTool, name: 'Story Builder', description: 'Interactive narrative creation' },
    { icon: FileText, name: 'Document Intelligence', description: 'Smart content analysis' },
    { icon: Mic, name: 'Voice Journal', description: 'Audio practice diary' },
    { icon: Music, name: 'English Rap Battles', description: 'Fun rhythm-based learning' },
    { icon: Volume2, name: 'Pronunciation Heat Maps', description: 'Visual accent coaching' },
    { icon: Map, name: 'Virtual Field Trips', description: 'Immersive cultural exploration' },
    { icon: Hand, name: 'Sign Language Support', description: 'Inclusive communication tools' },
    { icon: WifiOff, name: 'Offline Learning', description: 'Works without internet' },
  ];

  const trustLogos = [
    'Ministry of Education Rwanda',
    'African Development Bank',
    'UNICEF Education',
    'Gates Foundation',
    'Google for Education',
    'World Bank Education',
    'UNESCO',
    'Save the Children',
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navbar />

      {/* Hero Section with Gradient Background */}
      <section className="relative min-h-screen flex items-center justify-center gradient-hero overflow-hidden">
        <div className="absolute inset-0 grid-pattern"></div>
        <div className="absolute inset-0 gradient-overlay"></div>
        
        {/* Geometric shapes */}
        <div className="geometric-shape w-96 h-96 rounded-full bg-purple-500/10 blur-3xl top-0 left-0"></div>
        <div className="geometric-shape w-96 h-96 rounded-full bg-blue-500/10 blur-3xl bottom-0 right-0"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20 text-center">
          <div 
            id="hero-content"
            data-animate="true"
            className={`${isVisible['hero-content'] ? 'animate-scale-up' : 'opacity-0'}`}
          >
            <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
              AI-Powered English Learning
              <span className="block gradient-text">from Voice to Victory</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
              Revolutionary language education that transforms speaking confidence through AI tutoring, 
              proven to deliver breakthrough results in schools across Africa.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Button 
                onClick={() => navigate('/demo-scheduling')}
                className="gradient-purple-blue text-white text-lg px-8 py-6 hover:opacity-90 hover-depth"
                data-testid="button-book-demo"
              >
                <Calendar className="mr-2 h-5 w-5" />
                Book a Demo
              </Button>
              <Button 
                onClick={() => navigate('/try')}
                variant="outline" 
                className="border-white/20 text-white hover:bg-white/10 text-lg px-8 py-6 hover-depth"
                data-testid="button-try-features"
              >
                <Play className="mr-2 h-5 w-5" />
                Try Features
              </Button>
            </div>

            <div className="flex flex-wrap justify-center gap-6">
              <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30 px-4 py-2">
                <Sparkles className="mr-2 h-4 w-4" />
                85% Speaking Confidence Boost
              </Badge>
              <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 px-4 py-2">
                <Users className="mr-2 h-4 w-4" />
                50,000+ Students
              </Badge>
              <Badge className="bg-green-500/20 text-green-300 border-green-500/30 px-4 py-2">
                <WifiOff className="mr-2 h-4 w-4" />
                Works Offline
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 bg-gradient-to-b from-black to-gray-900 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-center text-gray-400 mb-8 uppercase tracking-wider">
            Trusted by Schools and Governments Across Africa
          </h3>
          <div className="relative overflow-hidden">
            <div className="flex space-x-12 marquee">
              {[...trustLogos, ...trustLogos].map((logo, index) => (
                <div key={index} className="flex-shrink-0">
                  <div className="h-12 px-6 py-2 bg-white/5 rounded-lg border border-white/10 flex items-center justify-center">
                    <span className="text-gray-400 whitespace-nowrap">{logo}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Core Capabilities Grid */}
      <section className="py-24 bg-black relative">
        <div className="absolute inset-0 grid-pattern opacity-50"></div>
        <div className="relative max-w-7xl mx-auto px-6">
          <h2 className="text-5xl font-bold text-center mb-16">
            Three Pillars of <span className="gradient-text">Language Mastery</span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-gradient-to-br from-purple-900/20 to-purple-900/10 border-purple-500/20 hover-depth">
              <CardHeader>
                <Brain className="h-12 w-12 text-purple-400 mb-4" />
                <CardTitle className="text-2xl text-white">Learn AI</CardTitle>
                <CardDescription className="text-gray-400">
                  Voice-first learning features
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-300">
                    <CheckCircle className="mr-2 h-4 w-4 text-purple-400" />
                    Personalized AI conversations
                  </li>
                  <li className="flex items-center text-gray-300">
                    <CheckCircle className="mr-2 h-4 w-4 text-purple-400" />
                    Real-time pronunciation feedback
                  </li>
                  <li className="flex items-center text-gray-300">
                    <CheckCircle className="mr-2 h-4 w-4 text-purple-400" />
                    Adaptive difficulty levels
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-900/20 to-blue-900/10 border-blue-500/20 hover-depth">
              <CardHeader>
                <Users2 className="h-12 w-12 text-blue-400 mb-4" />
                <CardTitle className="text-2xl text-white">Teach AI</CardTitle>
                <CardDescription className="text-gray-400">
                  Teacher empowerment tools
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-300">
                    <CheckCircle className="mr-2 h-4 w-4 text-blue-400" />
                    Student progress analytics
                  </li>
                  <li className="flex items-center text-gray-300">
                    <CheckCircle className="mr-2 h-4 w-4 text-blue-400" />
                    Curriculum alignment tools
                  </li>
                  <li className="flex items-center text-gray-300">
                    <CheckCircle className="mr-2 h-4 w-4 text-blue-400" />
                    Automated assessment reports
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-900/20 to-green-900/10 border-green-500/20 hover-depth">
              <CardHeader>
                <Rocket className="h-12 w-12 text-green-400 mb-4" />
                <CardTitle className="text-2xl text-white">Scale AI</CardTitle>
                <CardDescription className="text-gray-400">
                  School-wide deployment
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-300">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-400" />
                    Offline-first architecture
                  </li>
                  <li className="flex items-center text-gray-300">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-400" />
                    Multi-classroom support
                  </li>
                  <li className="flex items-center text-gray-300">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-400" />
                    Administrative dashboard
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Feature Showcase Grid */}
      <section className="py-24 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">
              Comprehensive Feature <span className="gradient-text">Arsenal</span>
            </h2>
            <p className="text-xl text-gray-400">
              Every tool your students need to master English
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card 
                key={index}
                className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 hover-depth"
              >
                <CardContent className="p-6">
                  <feature.icon className="h-10 w-10 text-purple-400 mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {feature.name}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section className="py-24 bg-black relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern"></div>
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">
              Experience Bakame <span className="gradient-text">in Action</span>
            </h2>
            <p className="text-xl text-gray-400">
              Try our AI-powered features right now
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-gradient-to-br from-purple-900/20 to-transparent border-purple-500/20 hover-depth">
              <CardHeader>
                <Eye className="h-8 w-8 text-purple-400 mb-2" />
                <CardTitle className="text-white">Speaking Confidence Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="h-32 bg-purple-500/10 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-purple-400 mb-2">
                        <AnimatedCounter end="87" />%
                      </div>
                      <p className="text-sm text-gray-400">Confidence Level</p>
                    </div>
                  </div>
                  <Button 
                    onClick={() => navigate('/try')}
                    className="w-full bg-purple-500/20 hover:bg-purple-500/30 border-purple-500/30"
                  >
                    <TestTube className="mr-2 h-4 w-4" />
                    Test Your Speaking
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-900/20 to-transparent border-blue-500/20 hover-depth">
              <CardHeader>
                <Mic className="h-8 w-8 text-blue-400 mb-2" />
                <CardTitle className="text-white">Pronunciation Test</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="h-32 bg-blue-500/10 rounded-lg flex items-center justify-center">
                    <div className="space-y-2">
                      <div className="flex space-x-1">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <div 
                            key={i}
                            className="w-2 h-16 bg-blue-400 rounded animate-pulse"
                            style={{ animationDelay: `${i * 0.1}s`, height: `${Math.random() * 64}px` }}
                          ></div>
                        ))}
                      </div>
                      <p className="text-sm text-gray-400 text-center">Voice Analysis</p>
                    </div>
                  </div>
                  <Button 
                    onClick={() => navigate('/try')}
                    className="w-full bg-blue-500/20 hover:bg-blue-500/30 border-blue-500/30"
                  >
                    <Volume2 className="mr-2 h-4 w-4" />
                    Try Pronunciation
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-900/20 to-transparent border-green-500/20 hover-depth">
              <CardHeader>
                <Bot className="h-8 w-8 text-green-400 mb-2" />
                <CardTitle className="text-white">AI Conversation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="h-32 bg-green-500/10 rounded-lg p-4 space-y-2">
                    <div className="bg-green-500/20 rounded-lg p-2 text-sm text-green-300">
                      Hello! Let's practice English together!
                    </div>
                    <div className="bg-gray-800/50 rounded-lg p-2 text-sm text-gray-300 ml-8">
                      Hi! I'd love to practice.
                    </div>
                  </div>
                  <Button 
                    onClick={() => navigate('/try')}
                    className="w-full bg-green-500/20 hover:bg-green-500/30 border-green-500/30"
                  >
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Start Conversation
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Solutions by Role */}
      <section className="py-24 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">
              Tailored Solutions <span className="gradient-text">for Everyone</span>
            </h2>
            <p className="text-xl text-gray-400">
              Designed for every stakeholder in the education ecosystem
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-gradient-to-br from-purple-900/20 to-transparent border-purple-500/20 hover-depth">
              <CardHeader>
                <GraduationCap className="h-12 w-12 text-purple-400 mb-4" />
                <CardTitle className="text-2xl text-white">For Students</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start text-gray-300">
                    <Star className="mr-2 h-4 w-4 text-purple-400 mt-1" />
                    <span>24/7 AI tutoring support</span>
                  </li>
                  <li className="flex items-start text-gray-300">
                    <Star className="mr-2 h-4 w-4 text-purple-400 mt-1" />
                    <span>Gamified learning experience</span>
                  </li>
                  <li className="flex items-start text-gray-300">
                    <Star className="mr-2 h-4 w-4 text-purple-400 mt-1" />
                    <span>Personalized learning paths</span>
                  </li>
                  <li className="flex items-start text-gray-300">
                    <Star className="mr-2 h-4 w-4 text-purple-400 mt-1" />
                    <span>Safe practice environment</span>
                  </li>
                </ul>
                <Button 
                  onClick={() => navigate('/for-students')}
                  className="w-full bg-purple-500/20 hover:bg-purple-500/30 border-purple-500/30"
                >
                  Explore Student Features
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-900/20 to-transparent border-blue-500/20 hover-depth">
              <CardHeader>
                <Users className="h-12 w-12 text-blue-400 mb-4" />
                <CardTitle className="text-2xl text-white">For Teachers</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start text-gray-300">
                    <Star className="mr-2 h-4 w-4 text-blue-400 mt-1" />
                    <span>Real-time progress tracking</span>
                  </li>
                  <li className="flex items-start text-gray-300">
                    <Star className="mr-2 h-4 w-4 text-blue-400 mt-1" />
                    <span>Automated grading system</span>
                  </li>
                  <li className="flex items-start text-gray-300">
                    <Star className="mr-2 h-4 w-4 text-blue-400 mt-1" />
                    <span>Custom lesson creation</span>
                  </li>
                  <li className="flex items-start text-gray-300">
                    <Star className="mr-2 h-4 w-4 text-blue-400 mt-1" />
                    <span>Class performance analytics</span>
                  </li>
                </ul>
                <Button 
                  onClick={() => navigate('/for-teachers')}
                  className="w-full bg-blue-500/20 hover:bg-blue-500/30 border-blue-500/30"
                >
                  View Teacher Dashboard
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-900/20 to-transparent border-green-500/20 hover-depth">
              <CardHeader>
                <School className="h-12 w-12 text-green-400 mb-4" />
                <CardTitle className="text-2xl text-white">For Schools</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start text-gray-300">
                    <Star className="mr-2 h-4 w-4 text-green-400 mt-1" />
                    <span>School-wide deployment</span>
                  </li>
                  <li className="flex items-start text-gray-300">
                    <Star className="mr-2 h-4 w-4 text-green-400 mt-1" />
                    <span>Administrative controls</span>
                  </li>
                  <li className="flex items-start text-gray-300">
                    <Star className="mr-2 h-4 w-4 text-green-400 mt-1" />
                    <span>ROI & impact metrics</span>
                  </li>
                  <li className="flex items-start text-gray-300">
                    <Star className="mr-2 h-4 w-4 text-green-400 mt-1" />
                    <span>Training & support included</span>
                  </li>
                </ul>
                <Button 
                  onClick={() => navigate('/for-schools')}
                  className="w-full bg-green-500/20 hover:bg-green-500/30 border-green-500/30"
                >
                  See ROI Calculator
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Research & Innovation */}
      <section className="py-24 bg-black relative">
        <div className="absolute inset-0 grid-pattern opacity-30"></div>
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">
              Research & <span className="gradient-text">Innovation</span>
            </h2>
            <p className="text-xl text-gray-400">
              Advancing the frontier of AI-powered education
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all hover-depth">
              <CardHeader>
                <FlaskConical className="h-10 w-10 text-purple-400 mb-2" />
                <CardTitle className="text-white">AI Research Lab</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 mb-4">
                  Pioneering natural language processing models optimized for African languages and accents.
                </p>
                <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                  Active Research
                </Badge>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all hover-depth">
              <CardHeader>
                <Lightbulb className="h-10 w-10 text-yellow-400 mb-2" />
                <CardTitle className="text-white">Learning Breakthroughs</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 mb-4">
                  Developing adaptive learning algorithms that personalize to each student's unique needs.
                </p>
                <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">
                  Patent Pending
                </Badge>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all hover-depth">
              <CardHeader>
                <GradCap className="h-10 w-10 text-blue-400 mb-2" />
                <CardTitle className="text-white">Academic Partnerships</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 mb-4">
                  Collaborating with leading universities to validate and improve our methodologies.
                </p>
                <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                  5+ Universities
                </Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Metrics & Impact */}
      <section className="py-24 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">
              Measurable <span className="gradient-text">Impact</span>
            </h2>
            <p className="text-xl text-gray-400">
              Real results from schools using Bakame AI
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8 mb-16">
            <div className="text-center">
              <div className="text-5xl font-bold gradient-text mb-2">
                <AnimatedCounter end="50000" />+
              </div>
              <p className="text-gray-400">Students Served</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold gradient-text mb-2">
                <AnimatedCounter end="85" />%
              </div>
              <p className="text-gray-400">Confidence Improvement</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold gradient-text mb-2">
                <AnimatedCounter end="200" />+
              </div>
              <p className="text-gray-400">Schools Deployed</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold gradient-text mb-2">
                <AnimatedCounter end="95" />%
              </div>
              <p className="text-gray-400">Teacher Satisfaction</p>
            </div>
          </div>
          
          <Card className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 border-purple-500/20">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Proven ROI for Schools
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-center text-gray-300">
                      <TrendingUp className="mr-3 h-5 w-5 text-green-400" />
                      30% reduction in tutoring costs
                    </li>
                    <li className="flex items-center text-gray-300">
                      <TrendingUp className="mr-3 h-5 w-5 text-green-400" />
                      2x faster language proficiency gains
                    </li>
                    <li className="flex items-center text-gray-300">
                      <TrendingUp className="mr-3 h-5 w-5 text-green-400" />
                      40% increase in student engagement
                    </li>
                  </ul>
                </div>
                <div className="text-center">
                  <div className="text-6xl font-bold gradient-text mb-2">3.2x</div>
                  <p className="text-xl text-gray-400">Return on Investment</p>
                  <p className="text-sm text-gray-500 mt-2">Average across all schools</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Call-to-Action Footer Section */}
      <section className="py-24 gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern"></div>
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Transform Your School's
            <span className="block gradient-text">English Program</span>
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Join hundreds of schools revolutionizing language education with AI. 
            See the difference in just one semester.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button 
              onClick={() => navigate('/demo-scheduling')}
              className="bg-white text-black hover:bg-gray-100 text-lg px-8 py-6 hover-depth"
              data-testid="button-schedule-demo-footer"
            >
              <Calendar className="mr-2 h-5 w-5" />
              Schedule School Demo
            </Button>
            <Button 
              onClick={() => navigate('/pricing')}
              variant="outline" 
              className="border-white/30 text-white hover:bg-white/10 text-lg px-8 py-6 hover-depth"
              data-testid="button-view-pricing-footer"
            >
              <DollarSign className="mr-2 h-5 w-5" />
              View Pricing Plans
            </Button>
          </div>
          
          <p className="text-gray-400">
            Or call us directly at{' '}
            <a href="tel:+250788888888" className="text-purple-400 hover:text-purple-300">
              +250 788 888 888
            </a>
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-5 gap-8">
            <div className="md:col-span-2">
              <div className="text-2xl font-bold gradient-text mb-4">Bakame AI</div>
              <p className="text-gray-400 mb-4">
                Revolutionizing English education across Africa with AI-powered learning that works everywhere.
              </p>
              <div className="flex space-x-4">
                <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                  <Award className="mr-1 h-3 w-3" />
                  EdTech Award 2024
                </Badge>
              </div>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><Link to="/features" className="text-gray-400 hover:text-white transition-colors">Features</Link></li>
                <li><Link to="/pricing" className="text-gray-400 hover:text-white transition-colors">Pricing</Link></li>
                <li><Link to="/try" className="text-gray-400 hover:text-white transition-colors">Try Demo</Link></li>
                <li><Link to="/government-solution" className="text-gray-400 hover:text-white transition-colors">Government</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><Link to="/resources" className="text-gray-400 hover:text-white transition-colors">Learning Hub</Link></li>
                <li><Link to="/blog" className="text-gray-400 hover:text-white transition-colors">Blog</Link></li>
                <li><Link to="/support" className="text-gray-400 hover:text-white transition-colors">Support</Link></li>
                <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
                <li><Link to="/team" className="text-gray-400 hover:text-white transition-colors">Team</Link></li>
                <li><Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy</Link></li>
                <li><Link to="/terms" className="text-gray-400 hover:text-white transition-colors">Terms</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 mt-12 pt-8 text-center">
            <p className="text-gray-500">
              © 2025 Bakame AI. All rights reserved. Building the future of education in Africa.
            </p>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <EarlyAccessModal 
        isOpen={isEarlyAccessOpen} 
        onClose={() => setIsEarlyAccessOpen(false)} 
      />
      
      {/* Live Chat */}
      <LiveChat />
    </div>
  );
};

export default Index;