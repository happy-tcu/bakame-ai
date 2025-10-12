import { useNavigate } from "react-router-dom";
import { TrendingUp, Medal, Play, Check, GraduationCap, Mic, Flame, Zap, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import ProgressDashboard from "@/components/progress/ProgressDashboard";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/components/auth/AuthContext";
import { Loader2 } from "lucide-react";
import { 
  FlowingHexagons, 
  RipplingCircles, 
  AscendingTriangles, 
  Starburst, 
  DynamicWave,
  PlayfulPolygons,
  ConnectingOrbs,
  BuildingBlocks,
  AchievementPattern,
  SoundWaves,
  FlowingLine,
  RadialBurst,
  NodeNetwork
} from "../components/patterns/AbstractPatterns";
import "../styles/patterns.css";
import "../styles/no-animations.css";

const ForStudents = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeFeature, setActiveFeature] = useState(0);
  
  // Fetch real user progress from the backend
  const { data: progressData, isLoading } = useQuery({
    queryKey: ['/api/progress'],
    enabled: !!user
  });

  const { data: sessionsData } = useQuery({
    queryKey: ['/api/sessions'],
    enabled: !!user
  });

  // Calculate real statistics from the backend data
  const userProgress = (progressData as any)?.progress || {};
  const sessions = (sessionsData as any)?.sessions || [];
  
  // Calculate current level based on XP (100 XP per level)
  const totalXP = userProgress.total_xp || 0;
  const currentLevel = Math.floor(totalXP / 100) || 1;
  const xpForNextLevel = ((currentLevel + 1) * 100);
  const currentLevelProgress = ((totalXP % 100) / 100) * 100;
  
  // Calculate streak days
  const streakDays = userProgress.streak_days || 0;
  
  // Total lessons completed (count of sessions)
  const lessonsCompleted = sessions.length || 0;
  
  // Determine CEFR level based on XP
  const getCEFRLevel = (xp: number) => {
    if (xp < 500) return "Beginner • A1 Level";
    if (xp < 1000) return "Elementary • A2 Level";
    if (xp < 2000) return "Intermediate • B1 Level";
    if (xp < 3500) return "Upper Intermediate • B2 Level";
    if (xp < 5000) return "Advanced • C1 Level";
    return "Mastery • C2 Level";
  };
  
  // Define achievements based on real progress
  const achievements = [
    { unlocked: lessonsCompleted >= 1, name: "First Steps", seed: 0 },
    { unlocked: lessonsCompleted >= 10, name: "Word Master", seed: 1 },
    { unlocked: streakDays >= 7, name: "Week Warrior", seed: 2 },
    { unlocked: currentLevel >= 10, name: "Grammar Guru", seed: 3 },
    { unlocked: currentLevel >= 20, name: "Native Speaker", seed: 4 },
    { unlocked: currentLevel >= 30, name: "English Champion", seed: 5 }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Show loading state while fetching data
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-sm text-muted-foreground">Loading your progress...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Fun animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/5 rounded-full animate-pulse" />
        <div className="absolute top-40 right-20 w-32 h-32 bg-gray-500/10 rounded-full animate-pulse delay-300" />
        <div className="absolute bottom-20 left-1/3 w-24 h-24 bg-white/10 rounded-full animate-pulse delay-500" />
        <div className="absolute bottom-40 right-1/3 w-28 h-28 bg-gray-500/10 rounded-full animate-pulse delay-700" />
      </div>

      <Navbar />

      {/* Hero Section */}
      <section className="relative z-10 container mx-auto px-6 pt-32 pb-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
            Learn English the Fun Way with AI
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Master English through interactive lessons, AI-powered conversations, and personalized feedback. Build real communication skills while enjoying every step of your learning journey!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={() => navigate("/try")}
              className="bg-white text-black hover:bg-gray-200 text-lg px-8 py-4 transform hover:scale-105 transition-all"
            >
              Start Learning Now
            </Button>
            <Button
              variant="outline"
              className="text-lg px-8 py-4 border-gray-500/50 hover:bg-gray-500/10"
            >
              View Progress Tracking
            </Button>
          </div>
        </div>
      </section>

      {/* Learning Progress Preview */}
      <section className="relative z-10 container mx-auto px-6 py-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          Track Your English Mastery
        </h2>
        
        {/* Progress & Level Section */}
        <div className="max-w-4xl mx-auto mb-12">
          <Card className="bg-gradient-to-br from-gray-500/10 to-gray-500/10 border-gray-500/30">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl">Your Progress</CardTitle>
                  <CardDescription>{getCEFRLevel(totalXP)}</CardDescription>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-gray-500">{lessonsCompleted}</div>
                  <div className="text-sm text-muted-foreground">Lessons Completed</div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Next Level Progress</span>
                    <span className="text-gray-500 font-medium">{Math.round(currentLevelProgress)}%</span>
                  </div>
                  <Progress value={currentLevelProgress} className="h-3 bg-gray-200 dark:bg-gray-900">
                    <div className="h-full bg-gradient-to-r from-gray-500 to-gray-500 rounded-full transition-all duration-1000" />
                  </Progress>
                </div>
                
                {/* Achievements */}
                <div>
                  <p className="text-sm font-medium mb-3">Recent Achievements</p>
                  <div className="flex flex-wrap gap-3">
                    {achievements.map((achievement, index) => (
                      <div
                        key={index}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${
                          achievement.unlocked
                            ? "bg-gradient-to-r from-gray-500/20 to-gray-500/20 border-gray-500/30"
                            : "bg-muted/50 border-border opacity-50"
                        }`}
                      >
                        <span className="text-sm font-medium">{achievement.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Core Learning Features */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            {
              Pattern: PlayfulPolygons,
              title: "Interactive Lessons",
              description: "Engaging exercises for vocabulary, grammar, and pronunciation",
              features: ["Adaptive Learning", "Instant Feedback", "Personalized Path"]
            },
            {
              Pattern: ConnectingOrbs,
              title: "Speaking Practice",
              description: "Build confidence through real conversations with AI and peers",
              features: ["Live Conversations", "Pronunciation Analysis", "Cultural Context"]
            },
            {
              Pattern: BuildingBlocks,
              title: "Learning Milestones",
              description: "Track your progress toward fluency with clear goals",
              features: ["CEFR Levels", "Skill Assessments", "Official Certificates"]
            }
          ].map((feature, index) => (
            <Card
              key={index}
              className={`border-2 hover:scale-105 transition-all duration-300 cursor-pointer ${
                activeFeature === index ? "border-gray-500" : "border-border"
              }`}
              onClick={() => setActiveFeature(index)}
            >
              <CardHeader>
                <div className="no-animations mb-3 [&_svg]:fill-white [&_svg_*]:fill-white [&_svg_*]:stroke-white [&_svg]:opacity-100 [&_svg_*]:opacity-100">
                  <feature.Pattern size={60} />
                </div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">{feature.description}</CardDescription>
                <div className="space-y-2">
                  {feature.features.map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                      <span className="text-sm text-white">{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Progress Dashboard Section */}
      <section className="relative z-10 container mx-auto px-6 py-16">
        <ProgressDashboard 
          streakDays={streakDays}
          totalXP={totalXP}
          currentLevel={currentLevel}
          lessonsCompleted={lessonsCompleted}
          lastPracticeDate={userProgress.last_practice_date}
          sessions={sessions}
        />
      </section>

      {/* Learning Tools Preview */}
      <section className="relative z-10 container mx-auto px-6 py-16 bg-muted/30">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          Essential Learning Tools
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {[
            {
              Icon: Mic,
              title: "Speaking Practice",
              description: "Record yourself and receive AI-powered pronunciation feedback"
            },
            {
              Icon: Flame,
              title: "Daily Practice",
              description: "Build consistency with daily learning goals and reminders"
            },
            {
              Icon: Zap,
              title: "Smart Review",
              description: "Accelerate retention with spaced repetition algorithms"
            },
            {
              Icon: Users,
              title: "Study Groups",
              description: "Learn together with classmates and global learners"
            }
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-card rounded-xl p-6 border border-border hover:border-gray-500/50 transition-all duration-300 hover:scale-105 cursor-pointer"
            >
              <div className="mb-4">
                <feature.Icon className="w-12 h-12 text-white" />
              </div>
              <h3 className="font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 container mx-auto px-6 py-20">
        <div className="bg-gradient-to-r from-gray-500/20 via-gray-500/20 to-accent/20 rounded-3xl p-12 text-center border-2 border-gray-500/30 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-500/5 to-gray-500/5 animate-pulse" />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
              Ready to Master English?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join millions of students achieving fluency through personalized lessons, AI conversations, and proven learning methods that make progress enjoyable!
            </p>
            <div className="flex justify-center">
              <Button
                onClick={() => navigate("/try")}
                className="bg-gradient-to-r from-gray-500 to-gray-500 text-white hover:opacity-90 text-lg px-8 py-4 transform hover:scale-105 transition-all flex items-center"
              >
                <DynamicWave size={20} className="mr-2" />
                Start Learning Free
              </Button>
            </div>
            <p className="mt-6 text-sm text-muted-foreground flex items-center justify-center gap-4">
              <span className="flex items-center gap-1">Free to start</span> • 
              <span className="flex items-center gap-1">Personalized learning</span> • 
              <span className="flex items-center gap-1">Official certificates</span>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ForStudents;