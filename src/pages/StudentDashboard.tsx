import { useNavigate } from "react-router-dom";
import { 
  Trophy, BookOpen, Target, Rocket, Star, Clock, TrendingUp, Zap, 
  Medal, Calendar, ChevronRight, Play, MessageSquare, Brain, 
  GraduationCap, Award, Flame, Users, Volume2, PenTool, FileText,
  BarChart3, CheckCircle, Activity, Gamepad2, Headphones, Globe,
  ArrowUpRight, ArrowDownRight, Sparkles, Book, Timer, Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState, useEffect, useMemo } from "react";
import Navbar from "@/components/layout/Navbar";
import { useAuth } from "@/components/auth/AuthContext";
import AnimatedCounter from "@/components/AnimatedCounter";
import { useQuery } from "@tanstack/react-query";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  
  // Get user's name from auth context
  const userName = user?.user_metadata?.name || "Student";
  const userInitials = userName.split(' ').map((n: string) => n[0]).join('').toUpperCase();
  
  // Fetch real user progress from the backend
  const { data: progressData, isLoading: progressLoading } = useQuery({
    queryKey: ['/api/progress'],
    enabled: !!user
  });

  const { data: sessionsData, isLoading: sessionsLoading } = useQuery({
    queryKey: ['/api/sessions'],
    enabled: !!user
  });
  
  const { data: flashcardsData } = useQuery({
    queryKey: ['/api/flashcards'],
    enabled: !!user
  });
  
  const isLoading = progressLoading || sessionsLoading;
  
  // Get real data from the backend
  const userProgress = (progressData as any)?.progress || {};
  const sessions = (sessionsData as any)?.sessions || [];
  const flashcards = (flashcardsData as any)?.flashcards || [];
  
  // Calculate real statistics from the backend data
  const stats = useMemo(() => {
    const totalXP = userProgress.total_xp || 0;
    const currentLevel = Math.floor(totalXP / 100) || 1;
    const streakDays = userProgress.streak_days || 0;
    const lessonsCompleted = sessions.length || 0;
    const totalPracticeTime = userProgress.total_practice_time || 0;
    const vocabularyWords = flashcards.length || 0;
    
    // Calculate accuracy from sessions
    let totalAccuracy = 0;
    let accuracyCount = 0;
    sessions.forEach((session: any) => {
      const score = parseFloat(session.score || '0');
      if (score > 0) {
        totalAccuracy += score;
        accuracyCount++;
      }
    });
    const avgAccuracy = accuracyCount > 0 ? Math.round(totalAccuracy / accuracyCount) : 0;
    
    // Calculate weekly progress
    const weeklyGoal = 7; // 7 days of practice
    const weeklyDays = Math.min(streakDays, 7);
    const weeklyGoalProgress = Math.round((weeklyDays / weeklyGoal) * 100);
    
    return {
      lessonsCompleted,
      practiceTime: totalPracticeTime, // in minutes
      currentLevel,
      totalXP,
      weeklyGoalProgress,
      vocabularyWords,
      speakingAccuracy: avgAccuracy,
      listeningScore: avgAccuracy, // Using same as we don't track separately
      streakDays
    };
  }, [userProgress, sessions, flashcards]);

  const quickAccessCards = [
    {
      id: "start-learning",
      title: "Start Learning",
      description: "Continue your English journey",
      icon: Play,
      color: "from-blue-500 to-blue-600",
      link: "/try",
      badge: stats.lessonsCompleted > 0 ? `Lesson ${stats.lessonsCompleted + 1}` : "Start Lesson 1",
      data: "20 min session"
    },
    {
      id: "my-progress",
      title: "My Progress", 
      description: "Track your improvement",
      icon: TrendingUp,
      color: "from-green-500 to-green-600",
      link: "#progress",
      badge: `Level ${stats.currentLevel}`,
      data: `${stats.totalXP} XP earned`
    },
    {
      id: "practice-sessions",
      title: "Practice Sessions",
      description: "Speaking & listening exercises",
      icon: Headphones,
      color: "from-purple-500 to-purple-600",
      link: "/try",
      badge: "Practice now",
      data: "10 min each"
    },
    {
      id: "vocabulary-builder",
      title: "Vocabulary Builder",
      description: "Learn new words daily",
      icon: Book,
      color: "from-blue-500 to-blue-600",
      link: "/try",
      badge: "Review words",
      data: `${stats.vocabularyWords} total words`
    }
  ];

  // Generate activities based on real session data
  const recentActivities = useMemo(() => {
    const activities: any[] = [];
    
    // Add recent sessions as activities
    sessions.slice(0, 3).forEach((session: any) => {
      const sessionDate = new Date(session.created_at);
      const timeAgo = getTimeAgo(sessionDate);
      
      activities.push({
        type: "lesson",
        title: `Completed ${session.session_type || 'Practice'} Session`,
        time: timeAgo,
        icon: CheckCircle,
        color: "text-green-500"
      });
    });
    
    // Add streak achievement if applicable
    if (stats.streakDays >= 7) {
      activities.push({
        type: "streak",
        title: `${stats.streakDays} day learning streak! Keep it up!`,
        time: "Current",
        icon: Flame,
        color: "text-blue-500"
      });
    }
    
    // Add level achievement
    if (stats.currentLevel > 1) {
      activities.push({
        type: "achievement",
        title: `Reached Level ${stats.currentLevel}`,
        time: "Recent",
        icon: Award,
        color: "text-yellow-500"
      });
    }
    
    // Add vocabulary milestone if applicable
    if (stats.vocabularyWords > 0) {
      activities.push({
        type: "vocabulary",
        title: `Learned ${stats.vocabularyWords} vocabulary words`,
        time: "Total",
        icon: BookOpen,
        color: "text-purple-500"
      });
    }
    
    return activities.slice(0, 5); // Return max 5 activities
  }, [sessions, stats]);

  // Real achievements based on actual progress
  const achievements = useMemo(() => [
    { 
      id: 1, 
      name: "First Steps", 
      description: "Complete your first lesson", 
      icon: Target, 
      unlocked: stats.lessonsCompleted >= 1, 
      progress: Math.min(stats.lessonsCompleted * 100, 100) 
    },
    { 
      id: 2, 
      name: "Conversation Pro", 
      description: "Complete 10 sessions", 
      icon: MessageSquare, 
      unlocked: stats.lessonsCompleted >= 10, 
      progress: Math.min((stats.lessonsCompleted / 10) * 100, 100) 
    },
    { 
      id: 3, 
      name: "Vocabulary Builder", 
      description: "Learn 50 words", 
      icon: BookOpen, 
      unlocked: stats.vocabularyWords >= 50, 
      progress: Math.min((stats.vocabularyWords / 50) * 100, 100) 
    },
    { 
      id: 4, 
      name: "Perfect Week", 
      description: "Practice 7 days in a row", 
      icon: Calendar, 
      unlocked: stats.streakDays >= 7, 
      progress: Math.min((stats.streakDays / 7) * 100, 100) 
    },
    { 
      id: 5, 
      name: "Level 10", 
      description: "Reach Level 10", 
      icon: Brain, 
      unlocked: stats.currentLevel >= 10, 
      progress: Math.min((stats.currentLevel / 10) * 100, 100) 
    },
    { 
      id: 6, 
      name: "Expert Learner", 
      description: "Reach Level 20", 
      icon: Star, 
      unlocked: stats.currentLevel >= 20, 
      progress: Math.min((stats.currentLevel / 20) * 100, 100) 
    }
  ], [stats]);

  const upcomingGoals = [
    {
      title: `Complete Lesson ${stats.lessonsCompleted + 1}`,
      dueDate: "Today",
      type: "lesson",
      icon: BookOpen,
      priority: "high"
    },
    {
      title: "Daily Speaking Practice",
      dueDate: "Today",
      type: "practice",
      icon: Volume2,
      priority: "medium"
    },
    {
      title: "Review Vocabulary",
      dueDate: "Tomorrow",
      type: "test",
      icon: PenTool,
      priority: "medium"
    },
    {
      title: `Reach Level ${stats.currentLevel + 1}`,
      dueDate: `${100 - (stats.totalXP % 100)} XP needed`,
      type: "milestone",
      icon: Trophy,
      priority: "low"
    }
  ];

  // Helper function to format time ago
  function getTimeAgo(date: Date): string {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor(diff / (1000 * 60));
    
    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    return 'Just now';
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-sm text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

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
                {stats.lessonsCompleted === 0 
                  ? "Ready to start your learning journey?"
                  : "Ready to continue your learning journey? You're doing great!"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className="flex items-center gap-2">
                <Flame className="h-6 w-6 text-blue-500" />
                <span className="text-2xl font-bold">{stats.streakDays}</span>
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
                {stats.lessonsCompleted > 0 ? "Keep learning!" : "Start your first lesson"}
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
                Total practice
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
                Words learned
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-500/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center justify-between">
                <span>Accuracy</span>
                <Volume2 className="h-5 w-5 text-blue-500" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold" data-testid="text-speaking-accuracy">
                <AnimatedCounter end={`${stats.speakingAccuracy}%`} />
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Average score
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
                  Your learning activities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px] pr-4">
                  <div className="space-y-4">
                    {recentActivities.length === 0 ? (
                      <div className="text-center py-8 text-muted-foreground">
                        <BookOpen className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                        <p>No activities yet. Start your first lesson to see your progress here!</p>
                      </div>
                    ) : (
                      recentActivities.map((activity, index) => (
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
                      ))
                    )}
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
                          <span className="font-medium">{Math.round(achievement.progress)}%</span>
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
                {stats.weeklyGoalProgress}% Complete
              </Badge>
            </CardTitle>
            <CardDescription>
              {stats.weeklyGoalProgress === 100 
                ? "Congratulations! You've met your weekly goal!"
                : "Keep practicing to meet your weekly learning goal!"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Progress value={stats.weeklyGoalProgress} className="h-4 mb-4" />
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">{Math.min(stats.streakDays, 7)} of 7 days completed</span>
              <span className="font-medium text-primary">
                {stats.weeklyGoalProgress === 100 ? "Goal achieved! 🎉" : "Keep going! 🚀"}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="mt-8 text-center">
          <Card className="bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 border-2">
            <CardContent className="pt-6">
              <Sparkles className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-3">
                {stats.lessonsCompleted === 0 
                  ? "Ready to start learning?" 
                  : "Ready to continue learning?"}
              </h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                {stats.lessonsCompleted === 0 
                  ? "Begin your English learning journey today! Start with your first lesson."
                  : `You're making excellent progress! Continue your lesson to maintain your ${stats.streakDays} day streak.`}
              </p>
              <Button 
                onClick={() => navigate('/try')}
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                data-testid="button-continue-learning"
              >
                <Rocket className="mr-2 h-5 w-5" />
                {stats.lessonsCompleted === 0 ? "Start First Lesson" : "Continue Learning"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default StudentDashboard;