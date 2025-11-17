import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowRight, ChevronRight, Sparkles, TrendingUp, Users,
  Mic, BookOpen, MessageSquare, Volume2, BarChart3,
  MicVocal, Music, FileText, Map, Podcast,
  MapPin, MessageCircle, Edit3, Hand, Building,
  DollarSign, CheckCircle, Clock, Calendar, ThumbsUp,
  Star, Award, Zap, Target, Home, Menu, X, Newspaper
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import AnimatedCounter from '@/components/AnimatedCounter';

interface Feature {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  votes: number;
  status: 'live' | 'coming-soon' | 'future';
  quarter?: string;
  progress?: number;
}

const Roadmap = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [votedFeatures, setVotedFeatures] = useState<Set<string>>(new Set());
  const [features, setFeatures] = useState<Feature[]>([
    // Live Now Features
    {
      id: 'voice-journal',
      title: 'Voice Journal',
      description: 'Daily speaking practice with AI feedback',
      icon: Mic,
      votes: 0,
      status: 'live' as const,
      progress: 100
    },
    {
      id: 'smart-flashcards',
      title: 'Smart Flashcards',
      description: 'Adaptive learning system with spaced repetition',
      icon: BookOpen,
      votes: 0,
      status: 'live' as const,
      progress: 100
    },
    {
      id: 'ai-conversation',
      title: 'AI Conversation Partner',
      description: 'Practice real conversations with intelligent AI',
      icon: MessageSquare,
      votes: 0,
      status: 'live' as const,
      progress: 100
    },
    {
      id: 'pronunciation-score',
      title: 'Pronunciation Score',
      description: 'Real-time accent and pronunciation analysis',
      icon: Volume2,
      votes: 0,
      status: 'live' as const,
      progress: 100
    },
    {
      id: 'teacher-dashboard',
      title: 'Teacher Dashboard',
      description: 'Complete classroom management and analytics',
      icon: BarChart3,
      votes: 0,
      status: 'live' as const,
      progress: 100
    },
    // Coming Soon Features (Q1 2025)
    {
      id: 'voice-clone',
      title: 'Voice Clone Learning',
      description: 'Personalized AI tutor with your voice characteristics',
      icon: MicVocal,
      votes: 0,
      status: 'coming-soon' as const,
      quarter: 'Q1 2025',
      progress: 75
    },
    {
      id: 'rap-battles',
      title: 'English Rap Battles',
      description: 'Fun rhythm-based vocabulary and pronunciation games',
      icon: Music,
      votes: 0,
      status: 'coming-soon' as const,
      quarter: 'Q1 2025',
      progress: 60
    },
    {
      id: 'document-intelligence',
      title: 'Document Intelligence',
      description: 'Smart document analysis and summarization',
      icon: FileText,
      votes: 0,
      status: 'coming-soon' as const,
      quarter: 'Q1 2025',
      progress: 80
    },
    {
      id: 'heat-maps',
      title: 'Pronunciation Heat Maps',
      description: 'Visual analytics for pronunciation patterns',
      icon: Map,
      votes: 0,
      status: 'coming-soon' as const,
      quarter: 'Q1 2025',
      progress: 70
    },
    {
      id: 'podcast-generator',
      title: 'Podcast Generator',
      description: 'Create custom learning podcasts for students',
      icon: Podcast,
      votes: 0,
      status: 'coming-soon' as const,
      quarter: 'Q1 2025',
      progress: 55
    },
    // Future Vision Features (Q2-Q3 2025)
    {
      id: 'virtual-trips',
      title: 'Virtual Field Trips',
      description: 'Immersive cultural and language exploration',
      icon: MapPin,
      votes: 0,
      status: 'future' as const,
      quarter: 'Q2 2025',
      progress: 25
    },
    {
      id: 'ai-debate',
      title: 'AI Debate Partner',
      description: 'Practice argumentation and critical thinking',
      icon: MessageCircle,
      votes: 0,
      status: 'future' as const,
      quarter: 'Q2 2025',
      progress: 30
    },
    {
      id: 'story-chain',
      title: 'Story Chain Collaboration',
      description: 'Collaborative storytelling with classmates',
      icon: Edit3,
      votes: 0,
      status: 'future' as const,
      quarter: 'Q2 2025',
      progress: 20
    },
    {
      id: 'sign-language',
      title: 'Sign Language Support',
      description: 'Inclusive communication tools for all learners',
      icon: Hand,
      votes: 0,
      status: 'future' as const,
      quarter: 'Q3 2025',
      progress: 15
    },
    {
      id: 'skill-exchange',
      title: 'Skill Exchange Marketplace',
      description: 'Connect with peers for language exchange',
      icon: Users,
      votes: 0,
      status: 'future' as const,
      quarter: 'Q3 2025',
      progress: 10
    },
    {
      id: 'business-simulator',
      title: 'Business English Simulator',
      description: 'Professional communication scenarios',
      icon: Building,
      votes: 0,
      status: 'future' as const,
      quarter: 'Q3 2025',
      progress: 18
    },
    {
      id: 'news-api',
      title: 'News API',
      description: 'Curated African news articles for reading practice',
      icon: Newspaper,
      votes: 0,
      status: 'future' as const,
      quarter: 'Q3 2025',
      progress: 12
    }
  ]);

  const [totalVotes, setTotalVotes] = useState(0);

  useEffect(() => {
    // Clear localStorage to reset votes
    localStorage.removeItem('bakame-roadmap-votes');
    localStorage.removeItem('bakame-feature-votes');
  }, []);

  useEffect(() => {
    // Calculate total votes
    const total = features.reduce((sum, feature) => sum + feature.votes, 0);
    setTotalVotes(total);
  }, [features]);

  const handleVote = (featureId: string) => {
    if (votedFeatures.has(featureId)) return;

    // Update votes
    setFeatures(prev => {
      const updated = prev.map(feature => 
        feature.id === featureId 
          ? { ...feature, votes: feature.votes + 1 }
          : feature
      );

      // Save to localStorage
      const voteData = updated.reduce((acc, f) => ({
        ...acc,
        [f.id]: f.votes
      }), {});
      localStorage.setItem('bakame-feature-votes', JSON.stringify(voteData));

      return updated;
    });

    // Mark as voted
    const newVoted = new Set(votedFeatures);
    newVoted.add(featureId);
    setVotedFeatures(newVoted);
    localStorage.setItem('bakame-roadmap-votes', JSON.stringify(Array.from(newVoted)));
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  // Sort features by vote count within each category
  const sortedFeatures = (status: 'live' | 'coming-soon' | 'future') => {
    return features
      .filter(f => f.status === status)
      .sort((a, b) => b.votes - a.votes);
  };

  // Find the most requested feature
  const mostRequested = features.reduce((max, feature) => 
    feature.votes > max.votes ? feature : max
  , features[0]);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/" className="text-2xl font-bold gradient-text">
                Bakame AI
              </Link>
              <Badge variant="outline" className="border-gray-500/30 text-gray-400">
                Roadmap
              </Badge>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-300 hover:text-white transition-colors">Home</Link>
              <Link to="/features" className="text-gray-300 hover:text-white transition-colors">Features</Link>
              <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link>
              <Button 
                onClick={() => navigate('/contact')} 
                className="bg-white text-black hover:bg-gray-200"
                data-testid="button-contact-sales"
              >
                Contact Sales
              </Button>
            </div>

            <button onClick={toggleMenu} className="md:hidden text-white">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl md:hidden">
          <div className="flex flex-col items-center justify-center h-full space-y-8">
            <Link to="/" onClick={closeMenu} className="text-2xl text-white hover:text-gray-400 transition-colors">Home</Link>
            <Link to="/features" onClick={closeMenu} className="text-2xl text-white hover:text-gray-400 transition-colors">Features</Link>
            <Link to="/contact" onClick={closeMenu} className="text-2xl text-white hover:text-gray-400 transition-colors">Contact</Link>
            <Button 
              onClick={() => { closeMenu(); navigate('/contact'); }}
              className="gradient-gray-gray text-white"
            >
              Contact Sales
            </Button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* YouTube Video Background */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <iframe
            className="absolute top-1/2 left-1/2 w-[177.77777778vh] h-[56.25vw] min-w-full min-h-full transform -translate-x-1/2 -translate-y-1/2"
            src="https://www.youtube.com/embed/ta8D8UYELfs?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&modestbranding=1&playlist=ta8D8UYELfs&vq=hd2160&playsinline=1"
            title="Background video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/60"></div>
        
        <div className="absolute inset-0 grid-pattern opacity-30"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
            Shape the Future of
            <span className="block">Bakame AI</span>
          </h1>
          
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Vote for features that matter most to you. Your voice guides our development priorities
            and helps us build the perfect AI learning platform for Africa.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <div className="flex items-center gap-2 px-6 py-3 bg-white/5 rounded-lg border border-white/10">
              <Users className="h-5 w-5 text-gray-400" />
              <span className="text-gray-300">Community Votes:</span>
              <span className="text-2xl font-bold text-white">
                <AnimatedCounter end={totalVotes.toString()} />
              </span>
            </div>
            
            <Button 
              onClick={() => navigate('/contact')}
              className="gradient-gray-gray text-white hover:opacity-90"
              data-testid="button-suggest-feature"
            >
              <MessageSquare className="mr-2 h-5 w-5" />
              Suggest a Feature
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...sortedFeatures('coming-soon'), ...sortedFeatures('future')].map((feature) => (
              <Card 
                key={feature.id}
                className="bg-gradient-to-br from-gray-900/20 to-gray-900/10 border-gray-500/20 hover:border-gray-500/40 transition-all hover:scale-105 group"
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="p-3 bg-gray-500/10 rounded-lg group-hover:bg-gray-500/20 transition-colors">
                      <feature.icon className="h-6 w-6 text-gray-400" />
                    </div>
                    {feature.id === mostRequested.id && (
                      <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">
                        <Star className="mr-1 h-3 w-3" />
                        Most Requested
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-xl text-white mt-4">{feature.title}</CardTitle>
                  <CardDescription className="text-gray-400">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <ThumbsUp className="h-4 w-4 text-gray-400" />
                      <span className="text-lg font-semibold text-white">
                        {feature.votes}
                      </span>
                      <span className="text-sm text-gray-400">votes</span>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => handleVote(feature.id)}
                      disabled={votedFeatures.has(feature.id)}
                      className={votedFeatures.has(feature.id) 
                        ? "bg-gray-800 text-gray-400" 
                        : "bg-gray-500/20 hover:bg-gray-500/30 text-gray-300 border border-gray-500/30"}
                      data-testid={`button-vote-${feature.id}`}
                    >
                      {votedFeatures.has(feature.id) ? 'Voted' : 'Vote'}
                    </Button>
                  </div>
                  {feature.progress !== undefined && (
                    <div className="mt-4">
                      <div className="flex justify-between text-xs text-gray-400 mb-1">
                        <span>{feature.status === 'coming-soon' ? 'Development Progress' : 'Planning Progress'}</span>
                        <span>{feature.progress}%</span>
                      </div>
                      <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-gray-400 to-gray-600 transition-all duration-500"
                          style={{ width: `${feature.progress}%` }}
                        />
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="mb-8">
            <p className="text-gray-400 mb-4 max-w-2xl">
              Revolutionizing English education across Africa with AI-powered learning that works everywhere.
            </p>
            <div className="flex">
              <Badge className="bg-gray-500/20 text-gray-300 border-gray-500/30">
                <Award className="mr-1 h-3 w-3" />
                CREATE Award 2025
              </Badge>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-8">
            <p className="text-gray-500">
              © 2025 Bakame AI. All rights reserved. Building the future of education in Africa.
            </p>
          </div>
        </div>
      </footer>

      <style>{`
        .gradient-hero {
          background: linear-gradient(135deg, 
            rgba(139, 92, 246, 0.1) 0%,
            rgba(59, 130, 246, 0.05) 50%,
            rgba(34, 197, 94, 0.03) 100%);
        }
        
        .gradient-text {
          background: #000000;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .grid-pattern {
          background-image: linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
          background-size: 50px 50px;
        }
        
        .gradient-gray-gray {
          background: linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%);
        }
        
        .hover-depth {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .hover-depth:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 40px rgba(139, 92, 246, 0.3);
        }
        
        .animate-scale-up {
          animation: scaleUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        
        @keyframes scaleUp {
          from {
            transform: scale(0.95);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        
        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </div>
  );
};

export default Roadmap;