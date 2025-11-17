import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Phone, MessageSquare, Calendar, Users, CheckCircle, 
  GraduationCap, Brain, Mic, Volume2, Award,
  Rocket, Users2, School, Bot, BookOpen as BookIcon, Podcast, PenTool,
  FileText, MicVocal, Music, Map, Hand, WifiOff,
  Lightbulb, FlaskConical,
  Star, ChevronRight, ArrowRight, Building2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/layout/Navbar';
import LiveChat from '@/components/chat/LiveChat';
import EarlyAccessModal from '@/components/EarlyAccessModal';

const Index = () => {
  const navigate = useNavigate();
  const [isEarlyAccessOpen, setIsEarlyAccessOpen] = useState(false);

  const features = [
    { icon: MicVocal, name: 'Voice Clone Learning', description: 'Personalized AI voice tutoring' },
    { icon: MessageSquare, name: 'AI Debate Partner', description: 'Practice argumentation skills' },
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
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Professional Hero Section */}
      <section className="relative bg-white pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <Badge className="bg-brand-blue-light text-brand-blue border-0 px-4 py-2" data-testid="badge-offline">
                <WifiOff className="mr-2 h-4 w-4" />
                Works Offline
              </Badge>
              
              <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight">
                Transform English Learning Through{' '}
                <span className="text-brand-blue">AI-Powered Voice Technology</span>
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed">
                Revolutionary language education platform that delivers proven results in schools across Africa through personalized AI tutoring, voice-first learning, and offline capability.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={() => navigate('/demo-scheduling')}
                  size="lg"
                  className="bg-brand-blue hover:bg-brand-blue-hover text-white px-8 py-6 text-lg"
                  data-testid="button-schedule-demo"
                >
                  Schedule a Demo
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  onClick={() => setIsEarlyAccessOpen(true)}
                  size="lg"
                  variant="outline"
                  className="border-2 border-brand-blue text-brand-blue hover:bg-brand-blue-light px-8 py-6 text-lg"
                  data-testid="button-early-access"
                >
                  Get Early Access
                </Button>
              </div>

              <div className="flex items-center gap-8 pt-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-brand-blue">10,000+</div>
                  <div className="text-sm text-muted-foreground">Students Reached</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-brand-blue">50+</div>
                  <div className="text-sm text-muted-foreground">Partner Schools</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-brand-blue">2</div>
                  <div className="text-sm text-muted-foreground">Countries</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square bg-brand-blue-light rounded-2xl flex items-center justify-center">
                <div className="text-center space-y-4 p-12">
                  <Bot className="h-24 w-24 text-brand-blue mx-auto" />
                  <p className="text-lg text-brand-blue font-medium">AI-Powered Learning Platform</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators - Corporate Style */}
      <section className="py-16 bg-[#F7F7F7] border-y border-border">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-center text-muted-foreground mb-8 uppercase tracking-wider text-sm font-medium">
            Trusted by Leading Schools and Institutions
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {trustLogos.map((logo, index) => (
              <div key={index} className="flex items-center justify-center">
                <div className="h-16 px-6 py-4 bg-white rounded-lg border border-border flex items-center justify-center shadow-sm hover:shadow-md transition-shadow">
                  <span className="text-foreground font-medium text-sm text-center">{logo}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Bakame Does - Value Proposition */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              AI-Powered English Learning Platform
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Bakame transforms how students learn English through innovative voice technology, bilingual support, and offline accessibility.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-2 hover:border-brand-blue hover:shadow-lg transition-all">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 h-16 w-16 bg-brand-blue-light rounded-full flex items-center justify-center">
                  <Brain className="h-8 w-8 text-brand-blue" />
                </div>
                <CardTitle className="text-2xl">Learn AI</CardTitle>
                <CardDescription className="text-base">
                  Voice-first learning features
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="mr-3 h-5 w-5 text-brand-blue mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">Personalized AI conversations</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="mr-3 h-5 w-5 text-brand-blue mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">Real-time pronunciation feedback</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="mr-3 h-5 w-5 text-brand-blue mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">Adaptive difficulty levels</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-brand-blue hover:shadow-lg transition-all">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 h-16 w-16 bg-brand-blue-light rounded-full flex items-center justify-center">
                  <Users2 className="h-8 w-8 text-brand-blue" />
                </div>
                <CardTitle className="text-2xl">Teach AI</CardTitle>
                <CardDescription className="text-base">
                  Teacher empowerment tools
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="mr-3 h-5 w-5 text-brand-blue mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">Student progress analytics</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="mr-3 h-5 w-5 text-brand-blue mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">Curriculum alignment tools</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="mr-3 h-5 w-5 text-brand-blue mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">Automated assessment reports</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-brand-blue hover:shadow-lg transition-all">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 h-16 w-16 bg-brand-blue-light rounded-full flex items-center justify-center">
                  <Rocket className="h-8 w-8 text-brand-blue" />
                </div>
                <CardTitle className="text-2xl">Scale AI</CardTitle>
                <CardDescription className="text-base">
                  School-wide deployment
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="mr-3 h-5 w-5 text-brand-blue mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">Offline-first architecture</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="mr-3 h-5 w-5 text-brand-blue mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">Multi-classroom support</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="mr-3 h-5 w-5 text-brand-blue mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">Administrative dashboard</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-[#F7F7F7]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              How Bakame Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A simple, effective approach to language learning that works anywhere, anytime
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl border-2 border-border">
              <div className="mb-6">
                <div className="h-12 w-12 bg-brand-yellow text-white rounded-lg flex items-center justify-center font-bold text-xl mb-4">
                  1
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">Voice-First Learning</h3>
                <p className="text-muted-foreground">
                  Students practice speaking English with AI tutors through natural conversations, receiving instant feedback on pronunciation and fluency.
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl border-2 border-border">
              <div className="mb-6">
                <div className="h-12 w-12 bg-brand-yellow text-white rounded-lg flex items-center justify-center font-bold text-xl mb-4">
                  2
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">Bilingual Support</h3>
                <p className="text-muted-foreground">
                  Seamlessly switch between Kinyarwanda and English. Our AI understands both languages, making learning accessible and culturally relevant.
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl border-2 border-border">
              <div className="mb-6">
                <div className="h-12 w-12 bg-brand-yellow text-white rounded-lg flex items-center justify-center font-bold text-xl mb-4">
                  3
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">Offline Capable</h3>
                <p className="text-muted-foreground">
                  No internet? No problem. Bakame works offline, ensuring continuous learning even in areas with limited connectivity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comprehensive Features Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Comprehensive Feature Set
            </h2>
            <p className="text-xl text-muted-foreground">
              Everything your students need to master English
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card 
                key={index}
                className="border-2 hover:border-brand-blue hover:shadow-lg transition-all"
                data-testid={`card-feature-${index}`}
              >
                <CardContent className="p-6">
                  <div className="mb-4 h-12 w-12 bg-brand-blue-light rounded-lg flex items-center justify-center">
                    <feature.icon className="h-6 w-6 text-brand-blue" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {feature.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions by Role */}
      <section className="py-24 bg-[#F7F7F7]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Tailored Solutions for Every Stakeholder
            </h2>
            <p className="text-xl text-muted-foreground">
              Designed for the entire education ecosystem
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white border-2 hover:border-brand-blue hover:shadow-lg transition-all">
              <CardHeader>
                <div className="mb-4 h-16 w-16 bg-brand-blue-light rounded-full flex items-center justify-center">
                  <GraduationCap className="h-8 w-8 text-brand-blue" />
                </div>
                <CardTitle className="text-2xl">For Students</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <CheckCircle className="mr-3 h-5 w-5 text-brand-blue mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">24/7 AI tutoring support</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="mr-3 h-5 w-5 text-brand-blue mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">Gamified learning experience</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="mr-3 h-5 w-5 text-brand-blue mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">Personalized learning paths</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="mr-3 h-5 w-5 text-brand-blue mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">Safe practice environment</span>
                  </li>
                </ul>
                <Button 
                  onClick={() => navigate('/features')}
                  className="w-full bg-brand-blue hover:bg-brand-blue-hover text-white"
                  data-testid="button-explore-student"
                >
                  Explore Student Features
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white border-2 hover:border-brand-blue hover:shadow-lg transition-all">
              <CardHeader>
                <div className="mb-4 h-16 w-16 bg-brand-blue-light rounded-full flex items-center justify-center">
                  <Users className="h-8 w-8 text-brand-blue" />
                </div>
                <CardTitle className="text-2xl">For Teachers</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <CheckCircle className="mr-3 h-5 w-5 text-brand-blue mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">Real-time progress tracking</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="mr-3 h-5 w-5 text-brand-blue mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">Automated grading system</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="mr-3 h-5 w-5 text-brand-blue mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">Custom lesson creation</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="mr-3 h-5 w-5 text-brand-blue mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">Class performance analytics</span>
                  </li>
                </ul>
                <Button 
                  onClick={() => navigate('/features')}
                  className="w-full bg-brand-blue hover:bg-brand-blue-hover text-white"
                  data-testid="button-view-teacher"
                >
                  View Teacher Tools
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white border-2 hover:border-brand-blue hover:shadow-lg transition-all">
              <CardHeader>
                <div className="mb-4 h-16 w-16 bg-brand-blue-light rounded-full flex items-center justify-center">
                  <School className="h-8 w-8 text-brand-blue" />
                </div>
                <CardTitle className="text-2xl">For Schools</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <CheckCircle className="mr-3 h-5 w-5 text-brand-blue mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">School-wide deployment</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="mr-3 h-5 w-5 text-brand-blue mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">Administrative controls</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="mr-3 h-5 w-5 text-brand-blue mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">ROI & impact metrics</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="mr-3 h-5 w-5 text-brand-blue mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">Training & support included</span>
                  </li>
                </ul>
                <Button 
                  onClick={() => navigate('/education-solution')}
                  className="w-full bg-brand-blue hover:bg-brand-blue-hover text-white"
                  data-testid="button-school-solutions"
                >
                  School Solutions
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Research & Innovation */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Research & <span className="text-brand-blue">Innovation</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Advancing the frontier of AI-powered education
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-2 hover:border-brand-blue hover:shadow-lg transition-all">
              <CardHeader>
                <div className="mb-4 h-12 w-12 bg-brand-blue-light rounded-lg flex items-center justify-center">
                  <FlaskConical className="h-6 w-6 text-brand-blue" />
                </div>
                <CardTitle>AI Research Lab</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Pioneering natural language processing models optimized for African languages and accents.
                </p>
                <Badge className="bg-brand-blue-light text-brand-blue border-0">
                  Active Research
                </Badge>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-brand-blue hover:shadow-lg transition-all">
              <CardHeader>
                <div className="mb-4 h-12 w-12 bg-brand-blue-light rounded-lg flex items-center justify-center">
                  <Lightbulb className="h-6 w-6 text-brand-blue" />
                </div>
                <CardTitle>Educational Innovation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Developing cutting-edge pedagogical methods that combine traditional teaching with AI technology.
                </p>
                <Badge className="bg-brand-blue-light text-brand-blue border-0">
                  In Development
                </Badge>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-brand-blue hover:shadow-lg transition-all">
              <CardHeader>
                <div className="mb-4 h-12 w-12 bg-brand-blue-light rounded-lg flex items-center justify-center">
                  <Award className="h-6 w-6 text-brand-blue" />
                </div>
                <CardTitle>Academic Partnerships</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Collaborating with leading universities to validate our impact and refine our methodology.
                </p>
                <Badge className="bg-brand-blue-light text-brand-blue border-0">
                  Global Network
                </Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Impact Statistics */}
      <section className="py-24 bg-brand-blue text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Proven Impact
            </h2>
            <p className="text-xl opacity-90">
              Real results from real classrooms
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold mb-2 text-brand-yellow">87%</div>
              <p className="text-lg opacity-90">Speaking Confidence Increase</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2 text-brand-yellow">10,000+</div>
              <p className="text-lg opacity-90">Students Impacted</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2 text-brand-yellow">50+</div>
              <p className="text-lg opacity-90">Partner Schools</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2 text-brand-yellow">95%</div>
              <p className="text-lg opacity-90">Teacher Satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Ready to Transform English Learning at Your School?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join leading schools across Africa in revolutionizing language education with Bakame's AI-powered platform.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => navigate('/demo-scheduling')}
              size="lg"
              className="bg-brand-blue hover:bg-brand-blue-hover text-white px-8 py-6 text-lg"
              data-testid="button-schedule-demo-cta"
            >
              <Calendar className="mr-2 h-5 w-5" />
              Schedule a Demo
            </Button>
            <Button 
              onClick={() => navigate('/contact')}
              size="lg"
              variant="outline"
              className="border-2 border-brand-blue text-brand-blue hover:bg-brand-blue-light px-8 py-6 text-lg"
              data-testid="button-contact-sales"
            >
              <Phone className="mr-2 h-5 w-5" />
              Contact Sales
            </Button>
          </div>

          <div className="mt-12 pt-12 border-t border-border">
            <p className="text-muted-foreground mb-4">
              Questions? Our team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-sm text-muted-foreground">
              <a href="mailto:info@bakame.rw" className="flex items-center hover:text-brand-blue transition-colors">
                <MessageSquare className="mr-2 h-4 w-4" />
                info@bakame.rw
              </a>
              <span className="hidden sm:inline">•</span>
              <a href="tel:+250788123456" className="flex items-center hover:text-brand-blue transition-colors">
                <Phone className="mr-2 h-4 w-4" />
                +250 788 123 456
              </a>
            </div>
          </div>
        </div>
      </section>

      <LiveChat />
      <EarlyAccessModal 
        isOpen={isEarlyAccessOpen}
        onClose={() => setIsEarlyAccessOpen(false)}
      />
    </div>
  );
};

export default Index;
