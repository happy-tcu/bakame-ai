import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Phone, MessageSquare, Calendar, Play, Users, CheckCircle, 
  GraduationCap, Brain, Mic, Volume2, Building, Award,
  Rocket, Users2, School, Bot, BookOpen as BookIcon, Podcast, PenTool,
  FileText, MicVocal, Music, Map, Hand, WifiOff,
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
    "Neeley's Institute",
    'Dallas Innovates',
    'US Chamber of Commerce',
    'TCU 360',
    'TCU CS Department',
    'Fort Worth Report',
    'Kagarama SS',
    'GS Karembure',
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navbar />

      {/* Hero Section with YouTube Video Background */}
      <section className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden">
        {/* YouTube Video Background */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <iframe
            className="absolute top-1/2 left-1/2 w-[177.77777778vh] h-[56.25vw] min-h-full min-w-full -translate-x-1/2 -translate-y-1/2"
            src="https://www.youtube.com/embed/luiE5rZKhzg?autoplay=1&mute=1&loop=1&playlist=luiE5rZKhzg&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1"
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
            
            <p className="text-xl md:text-2xl text-gray-200 mb-12 max-w-3xl mx-auto drop-shadow-lg">
              Revolutionary language education that transforms speaking confidence through AI tutoring, 
              proven to deliver breakthrough results in schools across Africa.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Button 
                onClick={() => navigate('/demo-scheduling')}
                className="bg-white text-black text-lg px-8 py-6 hover:bg-gray-200 hover-depth shadow-xl"
                data-testid="button-book-demo"
              >
                <Calendar className="mr-2 h-5 w-5" />
                Book a Demo
              </Button>
              <Button 
                onClick={() => navigate('/contact')}
                variant="outline" 
                className="border-white/20 text-white hover:bg-white/10 text-lg px-8 py-6 hover-depth backdrop-blur-sm"
                data-testid="button-contact-sales"
              >
                <Play className="mr-2 h-5 w-5" />
                Contact Sales
              </Button>
            </div>

            <div className="flex justify-center">
              <Badge className="bg-white/10 text-white border-white/30 px-4 py-2 backdrop-blur-sm">
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
            Trusted by Schools and Institutions Across Africa and the US
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
                    onClick={() => navigate('/contact')}
                    className="w-full bg-gray-500/20 hover:bg-gray-500/30 border-gray-500/30"
                  >
                    <TestTube className="mr-2 h-4 w-4" />
                    Contact Sales
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
                    onClick={() => navigate('/demo-scheduling')}
                    className="w-full bg-gray-500/20 hover:bg-gray-500/30 border-gray-500/30"
                  >
                    <Volume2 className="mr-2 h-4 w-4" />
                    Schedule Demo
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
                    onClick={() => navigate('/contact')}
                    className="w-full bg-gray-500/20 hover:bg-gray-500/30 border-gray-500/30"
                  >
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Contact Sales
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
              Research & <span className="text-[#4c9dff]">Innovation</span>
            </h2>
            <p className="text-xl text-gray-200">
              Advancing the frontier of AI-powered education
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all hover-depth">
              <CardHeader>
                <FlaskConical className="h-10 w-10 text-[#4c9dff] mb-2" />
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
                <Lightbulb className="h-10 w-10 text-[#4c9dff] mb-2" />
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
                <GradCap className="h-10 w-10 text-[#4c9dff] mb-2" />
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
              <span className="text-white">Measurable</span> <span className="text-[#4c9dff]">Impact</span>
            </h2>
            <p className="text-xl text-gray-200">
              Real results from schools using Bakame AI
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8 mb-16">
            <div className="text-center p-6 rounded-xl bg-gray-900/50 backdrop-blur-sm border border-gray-800/50">
              <div className="text-3xl font-bold text-white mb-2" style={{textShadow: '0 0 30px rgba(76, 157, 255, 0.5)'}}>
                Thousands
              </div>
              <p className="text-gray-200 text-lg">Students Empowered</p>
            </div>
            <div className="text-center p-6 rounded-xl bg-gray-900/50 backdrop-blur-sm border border-gray-800/50">
              <div className="text-3xl font-bold text-white mb-2" style={{textShadow: '0 0 30px rgba(76, 157, 255, 0.5)'}}>
                Significant
              </div>
              <p className="text-gray-200 text-lg">Confidence Improvement</p>
            </div>
            <div className="text-center p-6 rounded-xl bg-gray-900/50 backdrop-blur-sm border border-gray-800/50">
              <div className="text-3xl font-bold text-white mb-2" style={{textShadow: '0 0 30px rgba(76, 157, 255, 0.5)'}}>
                Multiple
              </div>
              <p className="text-gray-200 text-lg">Partner Schools</p>
            </div>
            <div className="text-center p-6 rounded-xl bg-gray-900/50 backdrop-blur-sm border border-gray-800/50">
              <div className="text-3xl font-bold text-white mb-2" style={{textShadow: '0 0 30px rgba(76, 157, 255, 0.5)'}}>
                High
              </div>
              <p className="text-gray-200 text-lg">Teacher Satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call-to-Action Footer Section */}
      <section className="py-24 gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern"></div>
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Transform Your School's
            <span className="block text-[#4c9dff]">English Program</span>
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join hundreds of schools revolutionizing language education with AI. 
            See the difference in just one semester.
          </p>
          <div className="mb-8">
            <Badge className="bg-blue-600/20 text-blue-300 border-blue-600/30 px-6 py-2 text-sm">
              <Building className="mr-2 h-4 w-4" />
              Custom pricing tailored for NGOs
            </Badge>
          </div>
          
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
            Or contact our NGO sales team at{' '}
            <a href="mailto:sales@bakame.org" className="text-gray-400 hover:text-gray-300">
              sales@bakame.org
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
                <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">NGO Solutions</Link></li>
                <li><Link to="/demo-scheduling" className="text-gray-400 hover:text-white transition-colors">Schedule Demo</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact Us</Link></li>
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