import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowRight, Mic, Volume2, BookOpen, Brain, Users, Shield, Zap, 
  Target, CheckCircle, GraduationCap, Languages, Headphones, BarChart3,
  Database, Globe, Building, Calendar, MessageSquare, Sparkles, Award,
  FileText, Map, Lightbulb, School, Home, Phone, Clock, Heart, Activity,
  Layers, Code, Cloud, Lock, Briefcase, UserCheck, TrendingUp, BookMarked,
  Music, Edit3, UsersIcon, Bell, Timer, Trophy, Gamepad2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import EarlyAccessModal from '@/components/EarlyAccessModal';

interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
  isAvailable: boolean;
}

const Features = () => {
  const navigate = useNavigate();
  const [isEarlyAccessOpen, setIsEarlyAccessOpen] = useState(false);

  const studentFeatures: Feature[] = [
    {
      title: "Voice Journal",
      description: "Daily speaking practice",
      icon: <Mic className="h-6 w-6" />,
      isAvailable: true
    },
    {
      title: "Pronunciation Score",
      description: "Real-time feedback",
      icon: <Volume2 className="h-6 w-6" />,
      isAvailable: true
    },
    {
      title: "Flashcard Generator",
      description: "Study materials",
      icon: <BookOpen className="h-6 w-6" />,
      isAvailable: true
    },
    {
      title: "AI Conversation Partner",
      description: "Practice dialogues",
      icon: <MessageSquare className="h-6 w-6" />,
      isAvailable: true
    },
    {
      title: "Vocabulary Builder",
      description: "Word mastery",
      icon: <BookMarked className="h-6 w-6" />,
      isAvailable: true
    },
    {
      title: "English Rap Battles",
      description: "Fun learning",
      icon: <Music className="h-6 w-6" />,
      isAvailable: false
    },
    {
      title: "Story Chain",
      description: "Collaborative writing",
      icon: <Edit3 className="h-6 w-6" />,
      isAvailable: true
    },
    {
      title: "Peer Learning Circles",
      description: "Study groups",
      icon: <UsersIcon className="h-6 w-6" />,
      isAvailable: true
    }
  ];

  const teacherFeatures: Feature[] = [
    {
      title: "Student Dashboard",
      description: "Track progress",
      icon: <BarChart3 className="h-6 w-6" />,
      isAvailable: true
    },
    {
      title: "Lesson Plan Generator",
      description: "AI-powered planning",
      icon: <FileText className="h-6 w-6" />,
      isAvailable: true
    },
    {
      title: "Automated Grading",
      description: "Voice homework checking",
      icon: <CheckCircle className="h-6 w-6" />,
      isAvailable: true
    },
    {
      title: "Pronunciation Heat Maps",
      description: "Visual analytics",
      icon: <Map className="h-6 w-6" />,
      isAvailable: true
    },
    {
      title: "Curriculum Alignment",
      description: "Standards-based",
      icon: <Target className="h-6 w-6" />,
      isAvailable: true
    },
    {
      title: "Class Analytics",
      description: "Performance insights",
      icon: <TrendingUp className="h-6 w-6" />,
      isAvailable: true
    },
    {
      title: "Parent Reports",
      description: "Automated updates",
      icon: <Bell className="h-6 w-6" />,
      isAvailable: true
    },
    {
      title: "Resource Library",
      description: "Teaching materials",
      icon: <Database className="h-6 w-6" />,
      isAvailable: true
    }
  ];

  const schoolFeatures: Feature[] = [
    {
      title: "Multi-classroom Management",
      description: "Centralized control",
      icon: <School className="h-6 w-6" />,
      isAvailable: true
    },
    {
      title: "School-wide Analytics",
      description: "Institution metrics",
      icon: <Activity className="h-6 w-6" />,
      isAvailable: true
    },
    {
      title: "Custom Curriculum Integration",
      description: "Tailored content",
      icon: <Layers className="h-6 w-6" />,
      isAvailable: true
    },
    {
      title: "Bulk User Management",
      description: "Easy administration",
      icon: <UserCheck className="h-6 w-6" />,
      isAvailable: true
    },
    {
      title: "API Access",
      description: "Integration ready",
      icon: <Code className="h-6 w-6" />,
      isAvailable: false
    },
    {
      title: "Offline Deployment Options",
      description: "No internet required",
      icon: <Cloud className="h-6 w-6" />,
      isAvailable: true
    },
    {
      title: "Government Compliance Reports",
      description: "Official documentation",
      icon: <Building className="h-6 w-6" />,
      isAvailable: true
    },
    {
      title: "White Label Options",
      description: "Custom branding",
      icon: <Briefcase className="h-6 w-6" />,
      isAvailable: false
    }
  ];

  const parentFeatures: Feature[] = [
    {
      title: "Progress Tracking",
      description: "Real-time updates",
      icon: <TrendingUp className="h-6 w-6" />,
      isAvailable: true
    },
    {
      title: "Daily SMS Reports",
      description: "Regular notifications",
      icon: <Phone className="h-6 w-6" />,
      isAvailable: true
    },
    {
      title: "Home Practice Guides",
      description: "Support learning at home",
      icon: <Home className="h-6 w-6" />,
      isAvailable: true
    },
    {
      title: "Voice Messages from Teachers",
      description: "Direct communication",
      icon: <Headphones className="h-6 w-6" />,
      isAvailable: true
    },
    {
      title: "Achievement Notifications",
      description: "Celebrate success",
      icon: <Trophy className="h-6 w-6" />,
      isAvailable: true
    },
    {
      title: "Screen Time Controls",
      description: "Manage usage",
      icon: <Timer className="h-6 w-6" />,
      isAvailable: true
    },
    {
      title: "Learning Milestones",
      description: "Track development",
      icon: <Award className="h-6 w-6" />,
      isAvailable: true
    },
    {
      title: "Parent-Child Activities",
      description: "Learn together",
      icon: <Heart className="h-6 w-6" />,
      isAvailable: true
    }
  ];

  const renderFeatureGrid = (features: Feature[]) => (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {features.map((feature, index) => (
        <Card 
          key={index} 
          className="bg-card border-border hover:shadow-lg transition-all duration-300 hover:scale-105 group"
        >
          <CardHeader className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="p-3 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-lg group-hover:from-primary/20 group-hover:to-accent/20 transition-colors">
                {feature.icon}
              </div>
              <Badge 
                variant={feature.isAvailable ? "default" : "secondary"}
                className={feature.isAvailable ? "bg-gray-400/10 text-gray-400 border-gray-400/20" : ""}
              >
                {feature.isAvailable ? "Available Now" : "Coming Soon"}
              </Badge>
            </div>
            <CardTitle className="text-lg">{feature.title}</CardTitle>
            <CardDescription className="text-sm">
              {feature.description}
            </CardDescription>
          </CardHeader>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-6 md:p-8 border-b border-border">
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Bakame AI
          </Link>
          <Badge variant="outline" className="border-gray-300 text-white text-xs">
            Features
          </Badge>
        </div>
        
        <div className="flex items-center space-x-4">
          <Link to="/" className="hidden md:block text-foreground hover:text-white transition-colors">
            Home
          </Link>
          <Link to="/demo-scheduling" className="hidden md:block text-foreground hover:text-white transition-colors">
            Demo
          </Link>
          <Link to="/pricing" className="hidden md:block text-foreground hover:text-white transition-colors">
            Pricing
          </Link>
          <Button 
            onClick={() => setIsEarlyAccessOpen(true)}
            className="bg-white text-black hover:bg-gray-200 transition-all"
          >
            Join Waitlist
          </Button>
        </div>
      </nav>
      
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="h-8 w-8 text-white mr-2 animate-pulse" />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
              All Features
            </h1>
            <Sparkles className="h-8 w-8 text-white ml-2 animate-pulse" />
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover the comprehensive capabilities of Bakame AI, designed to transform 
            English learning for students, empower teachers, streamline school management, 
            and keep parents engaged in their children's educational journey.
          </p>
        </div>
      </section>
      
      {/* Tabbed Features Section */}
      <section className="container mx-auto px-6 py-12">
        <Tabs defaultValue="students" className="w-full">
          <TabsList className="grid w-full md:w-max mx-auto grid-cols-2 md:grid-cols-4 mb-12">
            <TabsTrigger value="students" className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4" />
              For Students
            </TabsTrigger>
            <TabsTrigger value="teachers" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              For Teachers
            </TabsTrigger>
            <TabsTrigger value="schools" className="flex items-center gap-2">
              <School className="h-4 w-4" />
              For Schools
            </TabsTrigger>
            <TabsTrigger value="parents" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              For Parents
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="students" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-bold mb-3">Student Features</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Engage with AI-powered tools designed to make English learning fun, 
                interactive, and effective for every student.
              </p>
            </div>
            {renderFeatureGrid(studentFeatures)}
          </TabsContent>
          
          <TabsContent value="teachers" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-bold mb-3">Teacher Features</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Powerful tools to help teachers manage classrooms, track progress, 
                and deliver personalized learning experiences.
              </p>
            </div>
            {renderFeatureGrid(teacherFeatures)}
          </TabsContent>
          
          <TabsContent value="schools" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-bold mb-3">School Features</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Comprehensive solutions for school administrators to manage, monitor, 
                and optimize English education across the institution.
              </p>
            </div>
            {renderFeatureGrid(schoolFeatures)}
          </TabsContent>
          
          <TabsContent value="parents" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-bold mb-3">Parent Features</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Stay connected with your child's English learning journey and support 
                their progress from home.
              </p>
            </div>
            {renderFeatureGrid(parentFeatures)}
          </TabsContent>
        </Tabs>
      </section>
      
      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20">
        <Card className="bg-gradient-to-br from-primary/10 via-accent/10 to-primary/10 border-primary/20">
          <CardContent className="p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Transform English Learning?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Experience the power of AI-driven education. Try our demo or join the waitlist 
              to be among the first schools to revolutionize English learning.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => navigate('/contact')}
                size="lg"
                className="bg-gradient-to-r from-white to-gray-300 text-white-foreground hover:opacity-90 transition-all transform hover:scale-105"
              >
                <Gamepad2 className="mr-2 h-5 w-5" />
                Contact Sales
              </Button>
              <Button 
                onClick={() => setIsEarlyAccessOpen(true)}
                size="lg"
                variant="outline"
                className="border-gray-300 hover:bg-primary/10 transition-all transform hover:scale-105"
              >
                <Bell className="mr-2 h-5 w-5" />
                Join Waitlist
              </Button>
              <Button 
                onClick={() => navigate('/demo-scheduling')}
                size="lg"
                variant="outline"
                className="border-gray-300 hover:bg-primary/10 transition-all transform hover:scale-105"
              >
                <Calendar className="mr-2 h-5 w-5" />
                Demo
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
      
      {/* Early Access Modal */}
      <EarlyAccessModal 
        isOpen={isEarlyAccessOpen}
        onClose={() => setIsEarlyAccessOpen(false)}
      />
    </div>
  );
};

export default Features;