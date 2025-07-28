
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Menu, X, Phone, MessageSquare, Calendar, BookOpen, ArrowRight, Play, Users, Shield, Zap, Target, CheckCircle, GraduationCap, Languages, Headphones, Brain, Mic, Database, Globe, BarChart3, Volume2, Newspaper } from 'lucide-react';
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
  return <div className="min-h-screen bg-black text-white relative overflow-hidden">
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
          <Link to="/ivr" className="text-white hover:text-green-400 transition-colors">Try English Learning</Link>
          <div className="relative group">
            <button className="flex items-center text-white hover:text-green-400 transition-colors">
              Use Cases <ChevronDown className="ml-1 h-4 w-4" />
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
          <Link to="/ivr">
            <Button className="bg-gradient-to-r from-green-500 to-blue-500 text-white hover:from-green-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105">
              Try English Learning
            </Button>
          </Link>
        </div>
      </nav>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && <div className="md:hidden fixed inset-0 z-40 bg-black bg-opacity-95 backdrop-blur-sm">
          <div className="flex flex-col items-center justify-center h-full space-y-8">
            <Link to="/" onClick={closeMenu} className="text-2xl text-white hover:text-green-400 transition-colors">Home</Link>
            <Link to="/ivr" onClick={closeMenu} className="text-2xl text-white hover:text-green-400 transition-colors">Try English Learning</Link>
            <div className="text-center">
              <div className="text-xl text-white mb-4">Use Cases</div>
              <div className="space-y-4">
                <Link to="/government-solution" onClick={closeMenu} className="block text-white hover:text-green-400 transition-colors">Government</Link>
                <Link to="/enterprise-solution" onClick={closeMenu} className="block text-white hover:text-green-400 transition-colors">Enterprise</Link>
                <Link to="/education-solution" onClick={closeMenu} className="block text-white hover:text-green-400 transition-colors">Education</Link>
              </div>
            </div>
            <Link to="/about" onClick={closeMenu} className="text-2xl text-white hover:text-green-400 transition-colors">About</Link>
            <Link to="/team" onClick={closeMenu} className="text-2xl text-white hover:text-green-400 transition-colors">Team</Link>
            <Link to="/contact" onClick={closeMenu} className="text-2xl text-white hover:text-green-400 transition-colors">Contact</Link>
            <Link to="/ivr" onClick={closeMenu}>
              <Button className="bg-gradient-to-r from-green-500 to-blue-500 text-white hover:from-green-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105">
                Try English Learning
              </Button>
            </Link>
          </div>
        </div>}

      {/* Main Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="container mx-auto px-6 py-20 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent leading-tight">
              Learn English with AI Voice Tutor
            </h1>
            
            <div className="text-xl md:text-2xl text-white/80 mb-8 h-16 flex items-center justify-center">
              <TypingAnimation text="Your personal English tutor powered by AI - practice speaking, learn vocabulary, and improve pronunciation." className="text-white/80" />
            </div>
            
            <p className="text-lg text-white/70 mb-12 max-w-2xl mx-auto">
              Bakame AI is an English learning platform that helps you practice conversation, 
              build vocabulary, and improve pronunciation through real-time voice interaction. 
              Perfect for learners who want to speak English confidently.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Link to="/ivr">
                <Button className="bg-gradient-to-r from-green-500 to-blue-500 text-white hover:from-green-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 text-lg px-8 py-4">
                  <GraduationCap className="mr-2 h-5 w-5" />
                  Start Learning English
                </Button>
              </Link>
              
              <div className="flex items-center gap-2 text-white/70">
                <Phone className="h-4 w-4" />
                <span>Call: 885 471 1896</span>
              </div>
            </div>

            {/* Learning Features */}
            <div className="flex flex-wrap justify-center gap-4 mb-16">
              <div className="px-4 py-2 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-lg border border-white/30 flex items-center gap-2">
                <Languages className="h-4 w-4 text-green-400" />
                <span className="text-white/80">Conversation Practice</span>
              </div>
              
              <div className="px-4 py-2 bg-gradient-to-r from-blue-500/20 to-green-500/20 rounded-lg border border-white/30 flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-blue-400" />
                <span className="text-white/80">Vocabulary Building</span>
              </div>
              
              <div className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg border border-white/30 flex items-center gap-2">
                <Headphones className="h-4 w-4 text-purple-400" />
                <span className="text-white/80">Pronunciation Help</span>
              </div>
            </div>
          </div>
        </section>

        {/* Core Learning Modules */}
        <section className="container mx-auto px-6 py-20">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-white">
              Core Learning Modules
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                <CardHeader>
                  <Languages className="h-8 w-8 text-green-400 mb-2" />
                  <CardTitle className="text-white">English Practice</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-white/70">
                    Grammar correction, pronunciation feedback, and conversation practice to improve your English fluency.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                <CardHeader>
                  <Brain className="h-8 w-8 text-blue-400 mb-2" />
                  <CardTitle className="text-white">Math Module</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-white/70">
                    Mental math problems with adaptive difficulty progression to strengthen your mathematical skills.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                <CardHeader>
                  <BookOpen className="h-8 w-8 text-purple-400 mb-2" />
                  <CardTitle className="text-white">Reading Comprehension</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-white/70">
                    Story-based learning with questions to improve your reading and understanding skills.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                <CardHeader>
                  <MessageSquare className="h-8 w-8 text-orange-400 mb-2" />
                  <CardTitle className="text-white">Debate Practice</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-white/70">
                    Structured debate topics with counter-arguments to enhance your critical thinking and communication.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                <CardHeader>
                  <Target className="h-8 w-8 text-red-400 mb-2" />
                  <CardTitle className="text-white">General Q&A</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-white/70">
                    Multi-topic conversations and help system for general knowledge and assistance.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Technical Infrastructure */}
        <section className="container mx-auto px-6 py-20">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-white">
              Technical Infrastructure
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                <CardHeader>
                  <Phone className="h-8 w-8 text-green-400 mb-2" />
                  <CardTitle className="text-white">Voice & SMS Access</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-white/70">
                    Twilio integration for phone-based learning, accessible from any phone without internet.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                <CardHeader>
                  <Zap className="h-8 w-8 text-blue-400 mb-2" />
                  <CardTitle className="text-white">AI Integration</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-white/70">
                    Llama API with OpenAI fallback for response generation, ensuring reliable AI interactions.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                <CardHeader>
                  <Mic className="h-8 w-8 text-purple-400 mb-2" />
                  <CardTitle className="text-white">Voice Transcription</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-white/70">
                    OpenAI Whisper for accurate speech-to-text processing in multiple languages.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                <CardHeader>
                  <Database className="h-8 w-8 text-orange-400 mb-2" />
                  <CardTitle className="text-white">Memory System</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-white/70">
                    Redis-based conversation history and user context for personalized learning experiences.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Advanced Features */}
        <section className="container mx-auto px-6 py-20">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-white">
              Advanced Features
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                <CardHeader>
                  <Globe className="h-8 w-8 text-green-400 mb-2" />
                  <CardTitle className="text-white">Cultural Integration</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-white/70">
                    Rwanda-specific content with Kinyarwanda phrases for better cultural understanding.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                <CardHeader>
                  <BarChart3 className="h-8 w-8 text-blue-400 mb-2" />
                  <CardTitle className="text-white">Admin Dashboard</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-white/70">
                    User analytics, session tracking, and curriculum alignment for comprehensive insights.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                <CardHeader>
                  <Volume2 className="h-8 w-8 text-purple-400 mb-2" />
                  <CardTitle className="text-white">Deepgram TTS</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-white/70">
                    High-quality voice synthesis for better audio experience and natural conversations.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                <CardHeader>
                  <Newspaper className="h-8 w-8 text-orange-400 mb-2" />
                  <CardTitle className="text-white">Dynamic Content</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-white/70">
                    NewsAPI integration for trending debate topics and current events discussions.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Why Learn English with AI */}
        <section className="container mx-auto px-6 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white">
              Why Learn English with Bakame AI?
            </h2>
            <p className="text-lg text-white/70 mb-12 max-w-2xl mx-auto">
              Traditional language learning can be expensive and time-consuming. 
              Our AI tutor is available 24/7 to help you practice English at your own pace.
            </p>
          </div>
        </section>

        {/* Learning Methods */}
        <section className="container mx-auto px-6 py-20">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-white">
              How You'll Learn English
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                <CardHeader>
                  <Languages className="h-8 w-8 text-green-400 mb-2" />
                  <CardTitle className="text-white">Conversation Practice</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-white/70">
                    Practice real conversations with AI. Discuss topics, ask questions, and get instant feedback on your speaking.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                <CardHeader>
                  <BookOpen className="h-8 w-8 text-blue-400 mb-2" />
                  <CardTitle className="text-white">Vocabulary Building</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-white/70">
                    Learn new words in context with explanations in both English and Kinyarwanda for better understanding.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                <CardHeader>
                  <Headphones className="h-8 w-8 text-purple-400 mb-2" />
                  <CardTitle className="text-white">Pronunciation Help</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-white/70">
                    Get help with difficult sounds, stress patterns, and intonation to speak English more naturally.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Other Use Cases */}
        <section className="container mx-auto px-6 py-20">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-white">
              Our Voice AI Technology Powers More Than Learning
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                <CardHeader>
                  <Shield className="h-8 w-8 text-blue-400 mb-2" />
                  <CardTitle className="text-white">Government Services</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-white/70">
                    Emergency services, citizen support, and public information systems that work even during network outages.
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
                    Patient support hotlines and appointment systems that remain accessible during network issues.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                <CardHeader>
                  <Zap className="h-8 w-8 text-yellow-400 mb-2" />
                  <CardTitle className="text-white">Enterprise</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-white/70">
                    Customer service and internal communication systems that work reliably without internet dependency.
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
              Why Choose Bakame AI for English Learning?
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <CheckCircle className="h-6 w-6 text-green-400 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Available 24/7</h3>
                    <p className="text-white/70">Practice English anytime, anywhere. Your AI tutor never sleeps.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <CheckCircle className="h-6 w-6 text-green-400 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Personalized Learning</h3>
                    <p className="text-white/70">Adapted to your level and learning pace, with support in Kinyarwanda when needed.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <CheckCircle className="h-6 w-6 text-green-400 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Real Voice Interaction</h3>
                    <p className="text-white/70">Practice speaking and listening with natural voice conversations, not just text.</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <CheckCircle className="h-6 w-6 text-green-400 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Instant Feedback</h3>
                    <p className="text-white/70">Get immediate corrections and suggestions to improve your English quickly.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <CheckCircle className="h-6 w-6 text-green-400 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Practical Focus</h3>
                    <p className="text-white/70">Learn English for real-world situations like job interviews, business meetings, and daily conversations.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <CheckCircle className="h-6 w-6 text-green-400 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Culturally Aware</h3>
                    <p className="text-white/70">Designed specifically for Rwandan learners with cultural context and local examples.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* User Testimonials */}
        <section className="container mx-auto px-6 py-20">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-white">
              What Early Users Are Saying
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardContent className="p-8">
                  <p className="text-white/80 italic mb-4">
                    "This AI tutor is patient and helps me practice English conversations. 
                    I'm excited to improve my speaking skills!"
                  </p>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">AM</span>
                    </div>
                    <div>
                      <p className="text-white font-semibold">Alex M.</p>
                      <p className="text-white/60 text-sm">University Student</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardContent className="p-8">
                  <p className="text-white/80 italic mb-4">
                    "Finally, a way to practice English speaking without feeling embarrassed. 
                    The AI understands my accent and helps me improve."
                  </p>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">SM</span>
                    </div>
                    <div>
                      <p className="text-white font-semibold">Sarah M.</p>
                      <p className="text-white/60 text-sm">Business Professional</p>
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
              Ready to Start Learning English?
            </h2>
            <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto">
              Join thousands of learners who are improving their English speaking skills 
              with our AI-powered voice tutor. Start your journey today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/ivr">
                <Button className="bg-gradient-to-r from-green-500 to-blue-500 text-white hover:from-green-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 text-lg px-8 py-4">
                  <GraduationCap className="mr-2 h-5 w-5" />
                  Try English Learning Now
                </Button>
              </Link>
              
              <Link to="/contact">
                <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 hover:border-white/50 transition-all duration-300 text-lg px-8 py-4">
                  <MessageSquare className="mr-2 h-5 w-5" />
                  Contact Us
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
                <h3 className="text-lg font-semibold text-white mb-4">Learning</h3>
                <ul className="space-y-2">
                  <li><Link to="/ivr" className="text-white/70 hover:text-white transition-colors">Try English Learning</Link></li>
                  <li><Link to="/support" className="text-white/70 hover:text-white transition-colors">Help Center</Link></li>
                  <li><Link to="/contact" className="text-white/70 hover:text-white transition-colors">Contact Support</Link></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Use Cases</h3>
                <ul className="space-y-2">
                  <li><Link to="/government-solution" className="text-white/70 hover:text-white transition-colors">Government</Link></li>
                  <li><Link to="/enterprise-solution" className="text-white/70 hover:text-white transition-colors">Enterprise</Link></li>
                  <li><Link to="/education-solution" className="text-white/70 hover:text-white transition-colors">Education</Link></li>
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
      <EarlyAccessModal isOpen={isEarlyAccessOpen} onClose={() => setIsEarlyAccessOpen(false)} />
      
      <VideoModal isOpen={isVideoOpen} onClose={() => setIsVideoOpen(false)} videoId="dQw4w9WgXcQ" />
    </div>;
};
export default Index;
