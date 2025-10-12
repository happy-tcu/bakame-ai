import { CheckCircle2, Lock, Trophy, Target, Award } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/components/auth/AuthContext';
import { Loader2, BookOpen } from 'lucide-react';
import { useMemo } from 'react';

interface LearningRoadmapProps {
  totalXP?: number;
  currentLevel?: number;
}

const LearningRoadmap = ({ totalXP: propXP, currentLevel: propLevel }: LearningRoadmapProps = {}) => {
  const { user } = useAuth();
  
  // Fetch progress data if not provided via props
  const { data: progressData, isLoading } = useQuery({
    queryKey: ['/api/progress'],
    enabled: !!user && !propXP && !propLevel
  });
  
  const progress = (progressData as any)?.progress || {};
  const totalXP = propXP !== undefined ? propXP : (progress.total_xp || 0);
  const currentLevel = propLevel || Math.floor(totalXP / 100) || 1;
  
  // Define level milestones based on XP
  const levelMilestones = useMemo(() => [
    {
      level: 1,
      title: "Beginner",
      description: "Master basic greetings and essential phrases",
      xpRequired: 0,
      features: ["Basic vocabulary", "Simple greetings", "Common phrases"],
      color: "green"
    },
    {
      level: 5,
      title: "Elementary",
      description: "Build foundation with everyday conversations",
      xpRequired: 500,
      features: ["Daily conversations", "Basic grammar", "100+ words"],
      color: "blue"
    },
    {
      level: 10,
      title: "Pre-Intermediate",
      description: "Express yourself in familiar situations",
      xpRequired: 1000,
      features: ["Complex sentences", "Past & future tense", "Travel English"],
      color: "purple"
    },
    {
      level: 15,
      title: "Intermediate",
      description: "Communicate confidently in most contexts",
      xpRequired: 1500,
      features: ["Business English", "Email writing", "Phone conversations"],
      color: "yellow"
    },
    {
      level: 20,
      title: "Upper-Intermediate",
      description: "Handle complex discussions and debates",
      xpRequired: 2000,
      features: ["Academic English", "Presentations", "Native-like fluency"],
      color: "orange"
    },
    {
      level: 30,
      title: "Advanced",
      description: "Master native-level communication skills",
      xpRequired: 3000,
      features: ["Perfect grammar", "Cultural nuances", "Professional writing"],
      color: "red"
    }
  ], []);
  
  // Calculate progress through levels
  const levelProgress = useMemo(() => {
    const xpForCurrentLevel = currentLevel * 100;
    const xpForNextLevel = (currentLevel + 1) * 100;
    const progressInLevel = totalXP - (currentLevel - 1) * 100;
    const progressPercentage = (progressInLevel / 100) * 100;
    
    return {
      current: currentLevel,
      xpInLevel: progressInLevel,
      xpNeeded: 100,
      percentage: Math.min(progressPercentage, 100),
      xpToNext: xpForNextLevel - totalXP
    };
  }, [totalXP, currentLevel]);

  const getNodeIcon = (milestone: any) => {
    if (totalXP >= milestone.xpRequired) {
      return <CheckCircle2 className="w-6 h-6 text-[#4c9dff]" />;
    } else if (totalXP + 200 >= milestone.xpRequired) {
      return <Target className="w-6 h-6 text-white animate-pulse" />;
    } else {
      return <Lock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getNodeStyles = (milestone: any) => {
    if (totalXP >= milestone.xpRequired) {
      return 'bg-[#4c9dff]/20 border-[#4c9dff] shadow-lg shadow-[#4c9dff]/20';
    } else if (totalXP + 200 >= milestone.xpRequired) {
      return 'bg-gray-800 border-white shadow-lg shadow-white/20';
    } else {
      return 'bg-gray-900/50 border-gray-700 opacity-60';
    }
  };

  if (isLoading) {
    return (
      <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800">
        <div className="flex items-center justify-center h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
        </div>
      </div>
    );
  }

  // Show empty state for brand new users
  if (totalXP === 0) {
    return (
      <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800">
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-white mb-2">Your Learning Journey</h3>
          <p className="text-gray-400 text-sm">Progress through levels by earning XP</p>
        </div>
        
        <div className="flex flex-col items-center justify-center h-[300px] text-center">
          <Trophy className="h-12 w-12 text-gray-600 mb-4" />
          <p className="text-white font-semibold mb-2">Begin Your Journey</p>
          <p className="text-gray-400 text-sm max-w-xs">
            Complete lessons to earn XP and unlock new levels. Each level brings new features and challenges!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-semibold text-white">Level Progression</h3>
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-[#4c9dff]" />
            <span className="text-[#4c9dff] font-semibold">Level {currentLevel}</span>
          </div>
        </div>
        <p className="text-gray-400 text-sm">Your journey through English mastery</p>
        
        {/* Current Level Progress */}
        <div className="mt-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-400">Level {currentLevel} Progress</span>
            <span className="text-white">{levelProgress.xpInLevel} / {levelProgress.xpNeeded} XP</span>
          </div>
          <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#4c9dff] to-[#4c9dff]/60 rounded-full transition-all duration-700 ease-out shadow-lg shadow-[#4c9dff]/30"
              style={{ width: `${levelProgress.percentage}%` }}
            />
          </div>
          <p className="text-xs text-gray-400 mt-2">
            {levelProgress.xpToNext} XP to Level {currentLevel + 1}
          </p>
        </div>
      </div>

      <div className="relative">
        {/* Connecting Line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-700"></div>
        <div 
          className="absolute left-8 top-0 w-0.5 bg-gradient-to-b from-[#4c9dff] to-[#4c9dff]/20 transition-all duration-700"
          style={{ 
            height: `${Math.min((totalXP / 3000) * 100, 100)}%` 
          }}
        ></div>

        <div className="space-y-6">
          {levelMilestones.map((milestone, index) => {
            const isUnlocked = totalXP >= milestone.xpRequired;
            const isNext = totalXP < milestone.xpRequired && totalXP + 500 >= milestone.xpRequired;
            
            return (
              <div key={milestone.level} className="relative flex items-start gap-4">
                {/* Node Circle */}
                <div className={`relative z-10 w-16 h-16 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${getNodeStyles(milestone)}`}>
                  {getNodeIcon(milestone)}
                </div>

                {/* Content Card */}
                <div 
                  className={`flex-1 rounded-lg border p-4 transition-all duration-300 ${
                    isUnlocked 
                      ? 'bg-gray-800 border-gray-700 hover:border-[#4c9dff]/50' 
                      : isNext
                      ? 'bg-gray-800 border-gray-600 hover:border-gray-500'
                      : 'bg-gray-900/30 border-gray-800'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className={`font-semibold mb-1 ${!isUnlocked ? 'text-gray-500' : 'text-white'}`}>
                        Level {milestone.level}: {milestone.title}
                      </h4>
                      <p className={`text-sm mb-3 ${!isUnlocked ? 'text-gray-600' : 'text-gray-400'}`}>
                        {milestone.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2">
                        {milestone.features.map((feature, i) => (
                          <span 
                            key={i}
                            className={`text-xs px-2 py-1 rounded ${
                              isUnlocked 
                                ? 'bg-[#4c9dff]/20 text-[#4c9dff]'
                                : 'bg-gray-800 text-gray-600'
                            }`}
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                      
                      <div className="mt-3 text-xs text-gray-500">
                        {isUnlocked ? (
                          <span className="text-green-400">✓ Unlocked</span>
                        ) : (
                          <span>Requires {milestone.xpRequired} XP ({milestone.xpRequired - totalXP} more needed)</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Next Goal */}
      <div className="mt-8 p-4 bg-gradient-to-r from-[#4c9dff]/10 to-transparent rounded-lg border border-[#4c9dff]/20">
        <div className="flex items-center gap-3">
          <Trophy className="w-5 h-5 text-yellow-500" />
          <div>
            <p className="text-white font-semibold">Next Goal</p>
            <p className="text-gray-400 text-sm">
              {levelProgress.xpToNext} XP to reach Level {currentLevel + 1}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningRoadmap;