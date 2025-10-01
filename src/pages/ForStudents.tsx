import { useNavigate } from "react-router-dom";
import { Trophy, Gamepad2, Target, Rocket, Star, Users, TrendingUp, Zap, Medal, Heart, Sparkles, Volume2, MessageSquare, Play, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";

const ForStudents = () => {
  const navigate = useNavigate();
  const [activeFeature, setActiveFeature] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(65);
  const [achievements, setAchievements] = useState([
    { unlocked: true, name: "First Steps", icon: "🎯" },
    { unlocked: true, name: "Word Master", icon: "📚" },
    { unlocked: true, name: "Conversation Pro", icon: "💬" },
    { unlocked: false, name: "Grammar Guru", icon: "🏆" },
    { unlocked: false, name: "Native Speaker", icon: "🌟" },
    { unlocked: false, name: "English Champion", icon: "👑" }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentLevel(78);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

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
      <section className="relative z-10 container mx-auto px-6 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center mb-6 space-x-2">
            {["🎮", "🎯", "🏆", "🌟", "🚀"].map((emoji, index) => (
              <span
                key={index}
                className="text-4xl animate-bounce"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {emoji}
              </span>
            ))}
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
            Learn English the Fun Way with AI
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Level up your English skills with games, challenges, and AI friends who help you practice speaking without fear. Join millions of students having fun while learning!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={() => navigate("/try")}
              className="bg-white text-black hover:bg-gray-200 text-lg px-8 py-4 transform hover:scale-105 transition-all"
            >
              <Gamepad2 className="mr-2 h-5 w-5" />
              Start Playing Now
            </Button>
            <Button
              variant="outline"
              className="text-lg px-8 py-4 border-gray-500/50 hover:bg-gray-500/10"
            >
              <Trophy className="mr-2 h-5 w-5 text-gray-400" />
              See Leaderboard
            </Button>
          </div>
        </div>
      </section>

      {/* Gamification Preview */}
      <section className="relative z-10 container mx-auto px-6 py-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          Your Learning Adventure Awaits! 🎮
        </h2>
        
        {/* Progress & Level Section */}
        <div className="max-w-4xl mx-auto mb-12">
          <Card className="bg-gradient-to-br from-gray-500/10 to-gray-500/10 border-gray-500/30">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl">Your Progress</CardTitle>
                  <CardDescription>Level 12 • English Explorer</CardDescription>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-gray-500">2,450</div>
                  <div className="text-sm text-muted-foreground">XP Points</div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Next Level Progress</span>
                    <span className="text-gray-500 font-medium">{currentLevel}%</span>
                  </div>
                  <Progress value={currentLevel} className="h-3 bg-gray-200 dark:bg-gray-900">
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
                        <span className="text-2xl">{achievement.icon}</span>
                        <span className="text-sm font-medium">{achievement.name}</span>
                        {achievement.unlocked && <Sparkles className="h-4 w-4 text-gray-400" />}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Fun Learning Features */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            {
              icon: Gamepad2,
              title: "Language Games",
              description: "Play word puzzles, grammar races, and vocabulary battles",
              color: "gray",
              features: ["Daily Challenges", "Multiplayer Modes", "Reward System"]
            },
            {
              icon: Users,
              title: "Peer Circles",
              description: "Practice with friends and students from around the world",
              color: "gray",
              features: ["Group Conversations", "Study Buddies", "Team Competitions"]
            },
            {
              icon: Trophy,
              title: "Achievements & Rewards",
              description: "Unlock badges, climb leaderboards, and earn certificates",
              color: "gray",
              features: ["100+ Badges", "Monthly Tournaments", "Real Certificates"]
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
                <div className={`w-12 h-12 bg-gradient-to-r from-${feature.color}-500/20 to-${feature.color}-400/20 rounded-lg flex items-center justify-center mb-3`}>
                  <feature.icon className={`h-6 w-6 text-${feature.color}-500`} />
                </div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">{feature.description}</CardDescription>
                <div className="space-y-2">
                  {feature.features.map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Interactive Learning Preview */}
      <section className="relative z-10 container mx-auto px-6 py-16 bg-muted/30">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          Practice Without Fear 💬
        </h2>
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* AI Tutor Chat Preview */}
          <div className="bg-card rounded-xl p-6 border-2 border-gray-500/30">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-gray-500 to-gray-500 rounded-full flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold">AI Buddy - Luna</h3>
                <p className="text-sm text-muted-foreground">Always here to help!</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-gray-500/10 rounded-lg p-3 max-w-[80%]">
                <p className="text-sm">Hi! I'm Luna, your AI English buddy! 🌟 Want to practice talking about your hobbies?</p>
              </div>
              <div className="bg-muted rounded-lg p-3 max-w-[80%] ml-auto">
                <p className="text-sm">Yes! I love playing soccer and video games!</p>
              </div>
              <div className="bg-gray-500/10 rounded-lg p-3 max-w-[80%]">
                <p className="text-sm">That's awesome! Tell me about your favorite video game. What makes it special? 🎮</p>
              </div>
              <div className="flex items-center gap-2 mt-4">
                <Volume2 className="h-5 w-5 text-gray-500" />
                <span className="text-sm text-muted-foreground">Click to practice speaking</span>
              </div>
            </div>
          </div>

          {/* Learning Stats */}
          <div className="space-y-6">
            <Card className="bg-gradient-to-br from-gray-500/10 to-gray-500/10 border-gray-500/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-gray-500" />
                  Your Growth This Month
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { skill: "Speaking Confidence", progress: 85, change: "+25%" },
                    { skill: "Vocabulary", progress: 72, change: "+18%" },
                    { skill: "Grammar", progress: 68, change: "+15%" },
                    { skill: "Listening", progress: 90, change: "+30%" }
                  ].map((stat, index) => (
                    <div key={index}>
                      <div className="flex justify-between text-sm mb-1">
                        <span>{stat.skill}</span>
                        <span className="text-gray-500 font-medium">{stat.change}</span>
                      </div>
                      <Progress value={stat.progress} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-500/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Medal className="h-5 w-5 text-gray-500" />
                  This Week's Challenge
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Complete 5 speaking sessions to unlock the "Conversation Master" badge!
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex -space-x-2">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-8 h-8 rounded-full border-2 border-background flex items-center justify-center ${
                          i < 3 ? "bg-gray-500" : "bg-muted"
                        }`}
                      >
                        {i < 3 ? "✓" : ""}
                      </div>
                    ))}
                  </div>
                  <span className="text-sm font-medium">3/5 Complete</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="relative z-10 container mx-auto px-6 py-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          Students Like You Are Succeeding! 🌟
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            {
              name: "Alex M.",
              age: "15 years old",
              country: "Brazil",
              story: "I was too shy to speak English in class. After 3 months with Bakame AI, I won my school's English speech competition!",
              achievement: "From Shy to Confident",
              avatar: "🧑‍🎓"
            },
            {
              name: "Priya S.",
              age: "14 years old",
              country: "India",
              story: "The games make learning so fun! I don't even realize I'm studying. My grades went from C to A in just one semester!",
              achievement: "Grade Improvement",
              avatar: "👩‍🎓"
            },
            {
              name: "Jin W.",
              age: "16 years old",
              country: "China",
              story: "I love competing with friends on the leaderboard. We practice together every day and help each other improve!",
              achievement: "Team Learning Champion",
              avatar: "👨‍🎓"
            }
          ].map((story, index) => (
            <Card key={index} className="hover:scale-105 transition-all duration-300">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <span className="text-4xl">{story.avatar}</span>
                  <div>
                    <CardTitle className="text-lg">{story.name}</CardTitle>
                    <CardDescription>{story.age} • {story.country}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Badge className="mb-3 bg-gradient-to-r from-gray-500/20 to-gray-500/20 text-gray-600 dark:text-gray-400 border-gray-500/30">
                  {story.achievement}
                </Badge>
                <p className="text-muted-foreground italic">"{story.story}"</p>
                <div className="flex gap-1 mt-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-gray-500 text-gray-500" />
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Interactive Elements Preview */}
      <section className="relative z-10 container mx-auto px-6 py-16 bg-muted/30">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          Cool Features You'll Love! 🚀
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {[
            {
              icon: MessageSquare,
              title: "Voice Messages",
              description: "Send voice notes to AI tutors and get instant feedback",
              color: "gray"
            },
            {
              icon: Heart,
              title: "Streak Counter",
              description: "Keep your daily streak alive and earn bonus points",
              color: "red"
            },
            {
              icon: Zap,
              title: "Power-Ups",
              description: "Use special abilities to boost your learning speed",
              color: "gray"
            },
            {
              icon: Users,
              title: "Study Groups",
              description: "Create or join groups with classmates and friends",
              color: "gray"
            }
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-card rounded-xl p-6 border border-border hover:border-gray-500/50 transition-all duration-300 hover:scale-105 cursor-pointer"
            >
              <div className={`w-12 h-12 bg-${feature.color}-500/20 rounded-lg flex items-center justify-center mb-4`}>
                <feature.icon className={`h-6 w-6 text-${feature.color}-500`} />
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
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Your Adventure? 🎮
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join millions of students learning English the fun way. No more boring textbooks - just games, friends, and AI buddies!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => navigate("/try")}
                className="bg-gradient-to-r from-gray-500 to-gray-500 text-white hover:opacity-90 text-lg px-8 py-4 transform hover:scale-105 transition-all"
              >
                <Rocket className="mr-2 h-5 w-5" />
                Start Learning Free
              </Button>
              <Button
                variant="outline"
                className="text-lg px-8 py-4 border-gray-500/50 hover:bg-gray-500/10"
              >
                <Play className="mr-2 h-5 w-5" />
                Watch Demo Video
              </Button>
            </div>
            <p className="mt-6 text-sm text-muted-foreground">
              ✨ Free to start • 🎮 No boring lessons • 🏆 Win real prizes
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ForStudents;