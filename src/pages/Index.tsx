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

      {/* Hero Section with Black Background */}
      <section className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden">
        <div className="absolute inset-0 grid-pattern"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black"></div>
        
        {/* Geometric shapes */}
        <div className="geometric-shape w-96 h-96 rounded-full bg-white/5 blur-3xl top-0 left-0"></div>
        <div className="geometric-shape w-96 h-96 rounded-full bg-gray-500/10 blur-3xl bottom-0 right-0"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20 text-center">
          <div 
            id="hero-content"
            data-animate="true"
            className={`${isVisible['hero-content'] ? 'animate-scale-up' : 'opacity-0'}`}
          >
            <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
              AI-Powered English Learning
              <span className="block text-white font-extrabold">from Voice to Victory</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
              Revolutionary language education that transforms speaking confidence through AI tutoring, 
              proven to deliver breakthrough results in schools across Africa.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Button 
                onClick={() => navigate('/demo-scheduling')}
                className="bg-white text-black text-lg px-8 py-6 hover:bg-gray-200 hover-depth"
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
              <Badge className="bg-white/10 text-white border-white/30 px-4 py-2">
                <Sparkles className="mr-2 h-4 w-4" />
                Proven Confidence Building
              </Badge>
              <Badge className="bg-white/10 text-white border-white/30 px-4 py-2">
                <Users className="mr-2 h-4 w-4" />
                Thousands of Students Served
              </Badge>
              <Badge className="bg-white/10 text-white border-white/30 px-4 py-2">
                <WifiOff className="mr-2 h-4 w-4" />
                Works Offline
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 bg-black border-y border-white/10">
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
            Three Pillars of <span className="text-white font-extrabold">Language Mastery</span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-gradient-to-br from-gray-900/50 to-gray-900/30 border-white/20 hover-depth">
              <CardHeader>
                <Brain className="h-12 w-12 text-white mb-4" />
                <CardTitle className="text-2xl text-white">Learn AI</CardTitle>
                <CardDescription className="text-gray-400">
                  Voice-first learning features
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-300">
                    <CheckCircle className="mr-2 h-4 w-4 text-white" />
                    Personalized AI conversations
                  </li>
                  <li className="flex items-center text-gray-300">
                    <CheckCircle className="mr-2 h-4 w-4 text-white" />
                    Real-time pronunciation feedback
                  </li>
                  <li className="flex items-center text-gray-300">
                    <CheckCircle className="mr-2 h-4 w-4 text-white" />
                    Adaptive difficulty levels
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-gray-900/50 to-gray-900/30 border-white/20 hover-depth">
              <CardHeader>
                <Users2 className="h-12 w-12 text-white mb-4" />
                <CardTitle className="text-2xl text-white">Teach AI</CardTitle>
                <CardDescription className="text-gray-400">
                  Teacher empowerment tools
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-300">
                    <CheckCircle className="mr-2 h-4 w-4 text-white" />
                    Student progress analytics
                  </li>
                  <li className="flex items-center text-gray-300">
                    <CheckCircle className="mr-2 h-4 w-4 text-white" />
                    Curriculum alignment tools
                  </li>
                  <li className="flex items-center text-gray-300">
                    <CheckCircle className="mr-2 h-4 w-4 text-white" />
                    Automated assessment reports
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-gray-900/50 to-gray-900/30 border-white/20 hover-depth">
              <CardHeader>
                <Rocket className="h-12 w-12 text-white mb-4" />
                <CardTitle className="text-2xl text-white">Scale AI</CardTitle>
                <CardDescription className="text-gray-400">
                  School-wide deployment
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-300">
                    <CheckCircle className="mr-2 h-4 w-4 text-white" />
                    Offline-first architecture
                  </li>
                  <li className="flex items-center text-gray-300">
                    <CheckCircle className="mr-2 h-4 w-4 text-white" />
                    Multi-classroom support
                  </li>
                  <li className="flex items-center text-gray-300">
                    <CheckCircle className="mr-2 h-4 w-4 text-white" />
                    Administrative dashboard
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Feature Showcase Grid */}
      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">
              Comprehensive Feature <span className="text-white font-extrabold">Arsenal</span>
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
                  <feature.icon className="h-10 w-10 text-white mb-4" />
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
              Experience Bakame <span className="text-white font-extrabold">in Action</span>
            </h2>
            <p className="text-xl text-gray-400">
              Try our AI-powered features right now
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-gradient-to-br from-gray-900/20 to-transparent border-gray-500/20 hover-depth">
              <CardHeader>
                <Eye className="h-8 w-8 text-gray-400 mb-2" />
                <CardTitle className="text-white">Speaking Confidence Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="h-32 bg-gray-500/10 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-gray-400 mb-2">
                        <AnimatedCounter end="87" />%
                      </div>
                      <p className="text-sm text-gray-400">Confidence Level</p>
                    </div>
                  </div>
                  <Button 
                    onClick={() => navigate('/try')}
                    className="w-full bg-gray-500/20 hover:bg-gray-500/30 border-gray-500/30"
                  >
                    <TestTube className="mr-2 h-4 w-4" />
                    Test Your Speaking
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-gray-900/20 to-transparent border-gray-500/20 hover-depth">
              <CardHeader>
                <Mic className="h-8 w-8 text-gray-400 mb-2" />
                <CardTitle className="text-white">Pronunciation Test</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="h-32 bg-gray-500/10 rounded-lg flex items-center justify-center">
                    <div className="space-y-2">
                      <div className="flex space-x-1">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <div 
                            key={i}
                            className="w-2 h-16 bg-gray-400 rounded animate-pulse"
                            style={{ animationDelay: `${i * 0.1}s`, height: `${Math.random() * 64}px` }}
                          ></div>
                        ))}
                      </div>
                      <p className="text-sm text-gray-400 text-center">Voice Analysis</p>
                    </div>
                  </div>
                  <Button 
                    onClick={() => navigate('/try')}
                    className="w-full bg-gray-500/20 hover:bg-gray-500/30 border-gray-500/30"
                  >
                    <Volume2 className="mr-2 h-4 w-4" />
                    Try Pronunciation
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-gray-900/20 to-transparent border-gray-500/20 hover-depth">
              <CardHeader>
                <Bot className="h-8 w-8 text-gray-400 mb-2" />
                <CardTitle className="text-white">AI Conversation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="h-32 bg-gray-500/10 rounded-lg p-4 space-y-2">
                    <div className="bg-gray-500/20 rounded-lg p-2 text-sm text-gray-300">
                      Hello! Let's practice English together!
                    </div>
                    <div className="bg-gray-800/50 rounded-lg p-2 text-sm text-gray-300 ml-8">
                      Hi! I'd love to practice.
                    </div>
                  </div>
                  <Button 
                    onClick={() => navigate('/try')}
                    className="w-full bg-gray-500/20 hover:bg-gray-500/30 border-gray-500/30"
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
              Tailored Solutions <span className="text-white font-extrabold">for Everyone</span>
            </h2>
            <p className="text-xl text-gray-400">
              Designed for every stakeholder in the education ecosystem
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-gradient-to-br from-gray-900/20 to-transparent border-gray-500/20 hover-depth">
              <CardHeader>
                <GraduationCap className="h-12 w-12 text-gray-400 mb-4" />
                <CardTitle className="text-2xl text-white">For Students</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start text-gray-300">
                    <Star className="mr-2 h-4 w-4 text-gray-400 mt-1" />
                    <span>24/7 AI tutoring support</span>
                  </li>
                  <li className="flex items-start text-gray-300">
                    <Star className="mr-2 h-4 w-4 text-gray-400 mt-1" />
                    <span>Gamified learning experience</span>
                  </li>
                  <li className="flex items-start text-gray-300">
                    <Star className="mr-2 h-4 w-4 text-gray-400 mt-1" />
                    <span>Personalized learning paths</span>
                  </li>
                  <li className="flex items-start text-gray-300">
                    <Star className="mr-2 h-4 w-4 text-gray-400 mt-1" />
                    <span>Safe practice environment</span>
                  </li>
                </ul>
                <Button 
                  onClick={() => navigate('/for-students')}
                  className="w-full bg-gray-500/20 hover:bg-gray-500/30 border-gray-500/30"
                >
                  Explore Student Features
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-gray-900/20 to-transparent border-gray-500/20 hover-depth">
              <CardHeader>
                <Users className="h-12 w-12 text-gray-400 mb-4" />
                <CardTitle className="text-2xl text-white">For Teachers</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start text-gray-300">
                    <Star className="mr-2 h-4 w-4 text-gray-400 mt-1" />
                    <span>Real-time progress tracking</span>
                  </li>
                  <li className="flex items-start text-gray-300">
                    <Star className="mr-2 h-4 w-4 text-gray-400 mt-1" />
                    <span>Automated grading system</span>
                  </li>
                  <li className="flex items-start text-gray-300">
                    <Star className="mr-2 h-4 w-4 text-gray-400 mt-1" />
                    <span>Custom lesson creation</span>
                  </li>
                  <li className="flex items-start text-gray-300">
                    <Star className="mr-2 h-4 w-4 text-gray-400 mt-1" />
                    <span>Class performance analytics</span>
                  </li>
                </ul>
                <Button 
                  onClick={() => navigate('/for-teachers')}
                  className="w-full bg-gray-500/20 hover:bg-gray-500/30 border-gray-500/30"
                >
                  View Teacher Dashboard
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-gray-900/20 to-transparent border-gray-500/20 hover-depth">
              <CardHeader>
                <School className="h-12 w-12 text-gray-400 mb-4" />
                <CardTitle className="text-2xl text-white">For Schools</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start text-gray-300">
                    <Star className="mr-2 h-4 w-4 text-gray-400 mt-1" />
                    <span>School-wide deployment</span>
                  </li>
                  <li className="flex items-start text-gray-300">
                    <Star className="mr-2 h-4 w-4 text-gray-400 mt-1" />
                    <span>Administrative controls</span>
                  </li>
                  <li className="flex items-start text-gray-300">
                    <Star className="mr-2 h-4 w-4 text-gray-400 mt-1" />
                    <span>ROI & impact metrics</span>
                  </li>
                  <li className="flex items-start text-gray-300">
                    <Star className="mr-2 h-4 w-4 text-gray-400 mt-1" />
                    <span>Training & support included</span>
                  </li>
                </ul>
                <Button 
                  onClick={() => navigate('/for-schools')}
                  className="w-full bg-gray-500/20 hover:bg-gray-500/30 border-gray-500/30"
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
              Research & <span className="text-[#ffa366]">Innovation</span>
            </h2>
            <p className="text-xl text-gray-200">
              Advancing the frontier of AI-powered education
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all hover-depth">
              <CardHeader>
                <FlaskConical className="h-10 w-10 text-[#ffa366] mb-2" />
                <CardTitle className="text-white">AI Research Lab</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">
                  Pioneering natural language processing models optimized for African languages and accents.
                </p>
                <Badge className="bg-gray-500/20 text-gray-300 border-gray-500/30">
                  Active Research
                </Badge>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all hover-depth">
              <CardHeader>
                <Lightbulb className="h-10 w-10 text-[#ffa366] mb-2" />
                <CardTitle className="text-white">Learning Breakthroughs</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">
                  Developing adaptive learning algorithms that personalize to each student's unique needs.
                </p>
                <Badge className="bg-gray-500/20 text-gray-300 border-gray-500/30">
                  Patent Pending
                </Badge>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all hover-depth">
              <CardHeader>
                <GradCap className="h-10 w-10 text-[#ffa366] mb-2" />
                <CardTitle className="text-white">Academic Partnerships</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">
                  Collaborating with leading universities to validate and improve our methodologies.
                </p>
                <Badge className="bg-gray-500/20 text-gray-300 border-gray-500/30">
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
              <span className="text-white">Measurable</span> <span className="text-[#ffa366]">Impact</span>
            </h2>
            <p className="text-xl text-gray-200">
              Real results from schools using Bakame AI
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8 mb-16">
            <div className="text-center p-6 rounded-xl bg-gray-900/50 backdrop-blur-sm border border-gray-800/50">
              <div className="text-3xl font-bold text-white mb-2" style={{textShadow: '0 0 30px rgba(255, 163, 102, 0.5)'}}>
                Thousands
              </div>
              <p className="text-gray-200 text-lg">Students Empowered</p>
            </div>
            <div className="text-center p-6 rounded-xl bg-gray-900/50 backdrop-blur-sm border border-gray-800/50">
              <div className="text-3xl font-bold text-white mb-2" style={{textShadow: '0 0 30px rgba(255, 163, 102, 0.5)'}}>
                Significant
              </div>
              <p className="text-gray-200 text-lg">Confidence Improvement</p>
            </div>
            <div className="text-center p-6 rounded-xl bg-gray-900/50 backdrop-blur-sm border border-gray-800/50">
              <div className="text-3xl font-bold text-white mb-2" style={{textShadow: '0 0 30px rgba(255, 163, 102, 0.5)'}}>
                Multiple
              </div>
              <p className="text-gray-200 text-lg">Partner Schools</p>
            </div>
            <div className="text-center p-6 rounded-xl bg-gray-900/50 backdrop-blur-sm border border-gray-800/50">
              <div className="text-3xl font-bold text-white mb-2" style={{textShadow: '0 0 30px rgba(255, 163, 102, 0.5)'}}>
                High
              </div>
              <p className="text-gray-200 text-lg">Teacher Satisfaction</p>
            </div>
          </div>
          
          <Card className="bg-gradient-to-r from-gray-900/20 to-gray-900/20 border-gray-500/20">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Proven ROI for Schools
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-center text-gray-300">
                      <TrendingUp className="mr-3 h-5 w-5 text-gray-400" />
                      Significant reduction in tutoring costs
                    </li>
                    <li className="flex items-center text-gray-300">
                      <TrendingUp className="mr-3 h-5 w-5 text-gray-400" />
                      Accelerated language proficiency gains
                    </li>
                    <li className="flex items-center text-gray-300">
                      <TrendingUp className="mr-3 h-5 w-5 text-gray-400" />
                      Measurable increase in student engagement
                    </li>
                  </ul>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-white mb-2" style={{textShadow: '0 0 30px rgba(255, 163, 102, 0.5)'}}>Strong</div>
                  <p className="text-xl text-gray-200">Return on Investment</p>
                  <p className="text-sm text-gray-300 mt-2">Proven value for schools</p>
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
              onClick={() => navigate('/contact')}
              variant="outline" 
              className="border-white/30 text-white hover:bg-white/10 text-lg px-8 py-6 hover-depth"
              data-testid="button-contact-sales-footer"
            >
              <Phone className="mr-2 h-5 w-5" />
              Contact Sales Team
            </Button>
          </div>
          
          <p className="text-gray-400">
            Or email us at{' '}
            <a href="mailto:happy@bakame.org" className="text-gray-400 hover:text-gray-300">
              happy@bakame.org
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
                <Badge className="bg-gray-500/20 text-gray-300 border-gray-500/30">
                  <Award className="mr-1 h-3 w-3" />
                  CREATE Award 2025
                </Badge>
              </div>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><Link to="/features" className="text-gray-400 hover:text-white transition-colors">Features</Link></li>
                <li><Link to="/pricing" className="text-gray-400 hover:text-white transition-colors">Pricing</Link></li>
                <li><Link to="/try" className="text-gray-400 hover:text-white transition-colors">Try Demo</Link></li>
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