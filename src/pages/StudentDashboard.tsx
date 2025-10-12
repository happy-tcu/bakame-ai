import { useNavigate } from "react-router-dom";
import { 
  Trophy, BookOpen, Target, Rocket, Star, Clock, TrendingUp, Zap, 
  Medal, Calendar, ChevronRight, Play, MessageSquare, Brain, 
  GraduationCap, Award, Flame, Users, Volume2, PenTool, FileText,
  BarChart3, CheckCircle, Activity, Gamepad2, Headphones, Globe,
  ArrowUpRight, ArrowDownRight, Sparkles, Book, Timer
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import { useAuth } from "@/components/auth/AuthContext";
import AnimatedCounter from "@/components/AnimatedCounter";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [currentStreak, setCurrentStreak] = useState(0);
  const [weeklyProgress, setWeeklyProgress] = useState(0);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  
  // Get user's name from auth context
  const userName = user?.user_metadata?.name || "Student";
  const userInitials = userName.split(' ').map((n: string) => n[0]).join('').toUpperCase();
  
  // Animated progress values
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentStreak(7);
      setWeeklyProgress(75);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Sample data for various sections
  const stats = {
    lessonsCompleted: 42,
    practiceTime: 1250, // in minutes
    currentLevel: 8,
    totalXP: 3200,
    weeklyGoalProgress: 75,
    vocabularyWords: 324,
    speakingAccuracy: 82,
    listeningScore: 88
  };

  const quickAccessCards = [
    {
      id: "start-learning",
      title: "Start Learning",
      description: "Continue your English journey",
      icon: Play,
      color: "from-blue-500 to-blue-600",
      link: "/try",
      badge: "Continue Lesson 5",
      data: "20 min session"
    },
    {
      id: "my-progress",
      title: "My Progress",
      description: "Track your improvement",
      icon: TrendingUp,
      color: "from-green-500 to-green-600",
      link: "#progress",
      badge: "Weekly Report",
      data: "+15% this week"
    },
    {
      id: "practice-sessions",
      title: "Practice Sessions",
      description: "Speaking & listening exercises",
      icon: Headphones,
      color: "from-purple-500 to-purple-600",
      link: "/try",
      badge: "3 new exercises",
      data: "10 min each"
    },
    {
      id: "vocabulary-builder",
      title: "Vocabulary Builder",
      description: "Learn new words daily",
      icon: Book,
      color: "from-blue-500 to-blue-600",
      link: "/try",
      badge: "15 words today",
      data: "324 total words"
    }
  ];

  const recentActivities = [
    {
      type: "lesson",
      title: "Completed Lesson: Present Perfect Tense",
      time: "2 hours ago",
      icon: CheckCircle,
      color: "text-green-500"
    },
    {
      type: "achievement",
      title: "Earned Badge: Conversation Starter",
      time: "5 hours ago",
      icon: Award,
      color: "text-yellow-500"
    },
    {
      type: "practice",
      title: "Speaking Practice: 92% accuracy",
      time: "1 day ago",
      icon: Volume2,
      color: "text-blue-500"
    },
    {
      type: "vocabulary",
      title: "Learned 12 new vocabulary words",
      time: "1 day ago",
      icon: BookOpen,
      color: "text-purple-500"
    },
    {
      type: "streak",
      title: "7 day learning streak! Keep it up!",
      time: "2 days ago",
      icon: Flame,
      color: "text-blue-500"
    }
  ];

  const achievements = [
    { id: 1, name: "First Steps", description: "Complete your first lesson", icon: Target, unlocked: true, progress: 100 },
    { id: 2, name: "Conversation Pro", description: "Complete 10 speaking sessions", icon: MessageSquare, unlocked: true, progress: 100 },
    { id: 3, name: "Vocabulary Master", description: "Learn 500 words", icon: BookOpen, unlocked: false, progress: 65 },
    { id: 4, name: "Perfect Week", description: "Practice 7 days in a row", icon: Calendar, unlocked: true, progress: 100 },
    { id: 5, name: "Grammar Guru", description: "Master all grammar topics", icon: Brain, unlocked: false, progress: 45 },
    { id: 6, name: "Native Speaker", description: "Reach 95% speaking accuracy", icon: Star, unlocked: false, progress: 86 }
  ];

  const upcomingGoals = [
    {
      title: "Complete Chapter 5: Future Tenses",
      dueDate: "Tomorrow",
      type: "lesson",
      icon: BookOpen,
      priority: "high"
    },
    {
      title: "Weekly Speaking Challenge",
      dueDate: "In 2 days",
      type: "practice",
      icon: Volume2,
      priority: "medium"
    },
    {
      title: "Vocabulary Quiz: Business English",
      dueDate: "Friday",
      type: "test",
      icon: PenTool,
      priority: "high"
    },
    {
      title: "Group Discussion: Technology",
      dueDate: "Next Monday",
      type: "group",
      icon: Users,
      priority: "low"
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      {/* Welcome Section */}
      <section className="container mx-auto px-6 pt-24 pb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div className="flex items-center gap-4 mb-4 md:mb-0">
            <Avatar className="h-16 w-16">
              <AvatarImage src={user?.user_metadata?.avatar_url} />
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white text-xl">
                {userInitials}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-1">
                Welcome back, {userName}! 
                <span className="ml-2">👋</span>
              </h1>
              <p className="text-muted-foreground">
                Ready to continue your learning journey? You're doing great!
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className="flex items-center gap-2">
                <Flame className="h-6 w-6 text-blue-500" />
                <span className="text-2xl font-bold">{currentStreak}</span>
              </div>
              <p className="text-sm text-muted-foreground">Day Streak</p>
            </div>
            <div className="text-center">
              <div className="flex items-center gap-2">
                <Star className="h-6 w-6 text-yellow-500" />
                <span className="text-2xl font-bold">Level {stats.currentLevel}</span>
              </div>
              <p className="text-sm text-muted-foreground">{stats.totalXP} XP</p>
            </div>
          </div>
        </div>

        {/* Learning Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-500/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center justify-between">
                <span>Lessons Completed</span>
                <GraduationCap className="h-5 w-5 text-blue-500" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold" data-testid="text-lessons-completed">
                <AnimatedCounter end={stats.lessonsCompleted.toString()} />
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                <span className="text-green-500">+3</span> this week
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500/10 to-green-600/10 border-green-500/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center justify-between">
                <span>Practice Time</span>
                <Timer className="h-5 w-5 text-green-500" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold" data-testid="text-practice-time">
                <AnimatedCounter end={`${Math.floor(stats.practiceTime / 60)}h`} />
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                <span className="text-green-500">+2.5h</span> this week
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border-purple-500/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center justify-between">
                <span>Vocabulary</span>
                <Book className="h-5 w-5 text-purple-500" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold" data-testid="text-vocabulary-words">
                <AnimatedCounter end={stats.vocabularyWords.toString()} />
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                <span className="text-green-500">+24</span> new words
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-500/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center justify-between">
                <span>Speaking Score</span>
                <Volume2 className="h-5 w-5 text-blue-500" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold" data-testid="text-speaking-accuracy">
                <AnimatedCounter end={`${stats.speakingAccuracy}%`} />
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                <span className="text-green-500">+5%</span> improvement
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Access Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {quickAccessCards.map((card) => (
            <Card 
              key={card.id}
              className="cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl border-2"
              onMouseEnter={() => setHoveredCard(card.id)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => navigate(card.link)}
              data-testid={`card-${card.id}`}
            >
              <CardHeader>
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${card.color} flex items-center justify-center mb-3`}>
                  <card.icon className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-lg">{card.title}</CardTitle>
                <CardDescription>{card.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Badge className="mb-2" variant="secondary">
                  {card.badge}
                </Badge>
                <p className="text-sm text-muted-foreground">{card.data}</p>
                {hoveredCard === card.id && (
                  <div className="flex items-center gap-2 mt-3 text-primary">
                    <span className="text-sm font-medium">Open</span>
                    <ChevronRight className="h-4 w-4" />
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Area with Tabs */}
        <Tabs defaultValue="activity" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="activity">Recent Activity</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="goals">Upcoming Goals</TabsTrigger>
          </TabsList>

          {/* Recent Activity Tab */}
          <TabsContent value="activity">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Recent Activity Timeline
                </CardTitle>
                <CardDescription>
                  Your learning activities from the past week
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px] pr-4">
                  <div className="space-y-4">
                    {recentActivities.map((activity, index) => (
                      <div 
                        key={index}
                        className="flex items-start gap-4 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                        data-testid={`activity-${activity.type}-${index}`}
                      >
                        <div className={`mt-1 ${activity.color}`}>
                          <activity.icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{activity.title}</p>
                          <p className="text-sm text-muted-foreground">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5" />
                  Achievement Badges
                </CardTitle>
                <CardDescription>
                  Track your progress and unlock new achievements
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {achievements.map((achievement) => (
                    <div
                      key={achievement.id}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        achievement.unlocked 
                          ? "bg-gradient-to-br from-yellow-500/10 to-yellow-600/10 border-yellow-500/30" 
                          : "bg-muted/50 border-border"
                      }`}
                      data-testid={`achievement-${achievement.id}`}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          achievement.unlocked 
                            ? "bg-gradient-to-br from-yellow-500 to-yellow-600" 
                            : "bg-muted"
                        }`}>
                          <achievement.icon className={`h-5 w-5 ${
                            achievement.unlocked ? "text-white" : "text-muted-foreground"
                          }`} />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold">{achievement.name}</h4>
                          {achievement.unlocked && (
                            <Badge className="bg-yellow-500/20 text-yellow-600 border-yellow-500/30">
                              Unlocked!
                            </Badge>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        {achievement.description}
                      </p>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span className="font-medium">{achievement.progress}%</span>
                        </div>
                        <Progress value={achievement.progress} className="h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Upcoming Goals Tab */}
          <TabsContent value="goals">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Upcoming Lessons & Goals
                </CardTitle>
                <CardDescription>
                  Stay on track with your learning objectives
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingGoals.map((goal, index) => (
                    <div 
                      key={index}
                      className="flex items-center gap-4 p-4 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer"
                      onClick={() => navigate('/try')}
                      data-testid={`goal-${goal.type}-${index}`}
                    >
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        goal.priority === 'high' 
                          ? 'bg-red-500/10' 
                          : goal.priority === 'medium' 
                          ? 'bg-yellow-500/10' 
                          : 'bg-green-500/10'
                      }`}>
                        <goal.icon className={`h-5 w-5 ${
                          goal.priority === 'high' 
                            ? 'text-red-500' 
                            : goal.priority === 'medium' 
                            ? 'text-yellow-500' 
                            : 'text-green-500'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{goal.title}</h4>
                        <p className="text-sm text-muted-foreground">{goal.dueDate}</p>
                      </div>
                      <Badge variant={goal.priority === 'high' ? 'destructive' : goal.priority === 'medium' ? 'secondary' : 'default'}>
                        {goal.priority}
                      </Badge>
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Weekly Progress Card */}
        <Card className="mt-8 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Weekly Goal Progress
              </span>
              <Badge className="bg-primary/20 text-primary">
                {weeklyProgress}% Complete
              </Badge>
            </CardTitle>
            <CardDescription>
              You're on track to meet your weekly learning goal!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Progress value={weeklyProgress} className="h-4 mb-4" />
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">5 of 7 days completed</span>
              <span className="font-medium text-primary">Keep going! 🚀</span>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="mt-8 text-center">
          <Card className="bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 border-2">
            <CardContent className="pt-6">
              <Sparkles className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-3">Ready to continue learning?</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                You're making excellent progress! Continue your lesson to maintain your streak and unlock new achievements.
              </p>
              <Button 
                onClick={() => navigate('/try')}
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                data-testid="button-continue-learning"
              >
                <Rocket className="mr-2 h-5 w-5" />
                Continue Learning
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default StudentDashboard;