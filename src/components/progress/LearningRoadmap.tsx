import { CheckCircle2, Lock, PlayCircle, Star, BookOpen, Target } from 'lucide-react';

interface LearningRoadmapProps {
  currentLevel?: number;
  totalXP?: number;
  lessonsCompleted?: number;
}

const LearningRoadmap = ({ currentLevel = 1, totalXP = 0, lessonsCompleted = 0 }: LearningRoadmapProps) => {
  // Determine user's current learning stage based on level/XP
  const getUserStage = () => {
    if (totalXP < 100) return 0; // Beginner
    if (totalXP < 300) return 1; // Elementary  
    if (totalXP < 600) return 2; // Pre-Intermediate
    if (totalXP < 1000) return 3; // Intermediate
    if (totalXP < 1500) return 4; // Upper-Intermediate
    return 5; // Advanced
  };

  const currentStage = getUserStage();

  // Dynamic roadmap based on CEFR levels
  const roadmapStages = [
    {
      id: 1,
      title: "Beginner (A1)",
      description: "Basic phrases, greetings, and simple vocabulary",
      xpRequired: 0,
      level: 'Beginner',
      milestones: ["First words", "Basic greetings", "Numbers & colors"]
    },
    {
      id: 2,
      title: "Elementary (A2)",
      description: "Everyday expressions and basic conversation",
      xpRequired: 100,
      level: 'Elementary',
      milestones: ["Daily activities", "Shopping", "Simple descriptions"]
    },
    {
      id: 3,
      title: "Pre-Intermediate (B1)",
      description: "Handle travel situations and express opinions",
      xpRequired: 300,
      level: 'Pre-Intermediate',
      milestones: ["Travel English", "Expressing opinions", "Past experiences"]
    },
    {
      id: 4,
      title: "Intermediate (B2)",
      description: "Complex topics and spontaneous interaction",
      xpRequired: 600,
      level: 'Intermediate',
      milestones: ["Complex discussions", "News & media", "Professional topics"]
    },
    {
      id: 5,
      title: "Upper-Intermediate (C1)",
      description: "Fluent expression and academic/professional use",
      xpRequired: 1000,
      level: 'Upper-Intermediate',
      milestones: ["Academic English", "Business communication", "Cultural nuances"]
    },
    {
      id: 6,
      title: "Advanced (C2)",
      description: "Native-like proficiency and mastery",
      xpRequired: 1500,
      level: 'Advanced',
      milestones: ["Native fluency", "Complex literature", "Professional expertise"]
    }
  ];

  // Calculate progress percentage
  const calculateProgress = () => {
    const currentStageData = roadmapStages[currentStage];
    const nextStageData = roadmapStages[currentStage + 1];
    
    if (!nextStageData) return 100; // Max level reached
    
    const xpInCurrentStage = totalXP - currentStageData.xpRequired;
    const xpNeededForNextStage = nextStageData.xpRequired - currentStageData.xpRequired;
    
    return Math.min(100, Math.round((xpInCurrentStage / xpNeededForNextStage) * 100));
  };

  const progressPercentage = calculateProgress();

  // Empty state for new users
  if (lessonsCompleted === 0) {
    return (
      <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800">
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Target className="w-16 h-16 text-gray-600 mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">Start Your Learning Journey</h3>
          <p className="text-gray-400 max-w-md mb-6">
            Your personalized learning path will appear here as you progress. 
            Complete your first lesson to begin tracking your journey to fluency!
          </p>
          <button className="px-6 py-3 bg-[#4c9dff] text-white rounded-lg hover:bg-[#4c9dff]/80 transition-colors">
            Begin First Lesson
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-semibold text-white">Your Learning Path</h3>
          <span className="text-[#4c9dff] font-semibold">{totalXP} XP Earned</span>
        </div>
        <p className="text-gray-400 text-sm">Progress through CEFR levels to achieve fluency</p>
        
        {/* Current Stage Progress */}
        <div className="mt-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-400">
              {roadmapStages[currentStage].title}
            </span>
            {roadmapStages[currentStage + 1] && (
              <span className="text-gray-400">
                {roadmapStages[currentStage + 1].title}
              </span>
            )}
          </div>
          <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#4c9dff] to-[#4c9dff]/60 rounded-full transition-all duration-700 ease-out shadow-lg shadow-[#4c9dff]/30"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <p className="text-xs text-gray-400 mt-2">
            {progressPercentage}% to next level • {lessonsCompleted} lessons completed
          </p>
        </div>
      </div>

      {/* Simplified Stage Display */}
      <div className="space-y-4">
        {roadmapStages.map((stage, index) => {
          const status = index < currentStage ? 'completed' : 
                        index === currentStage ? 'current' : 'locked';
          
          return (
            <div 
              key={stage.id} 
              className={`rounded-lg border p-4 transition-all ${
                status === 'completed' ? 'bg-gray-800/50 border-gray-700' :
                status === 'current' ? 'bg-gray-800 border-[#4c9dff] shadow-md shadow-[#4c9dff]/20' :
                'bg-gray-900/30 border-gray-800 opacity-60'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  {status === 'completed' && <CheckCircle2 className="w-5 h-5 text-[#4c9dff]" />}
                  {status === 'current' && <PlayCircle className="w-5 h-5 text-white animate-pulse" />}
                  {status === 'locked' && <Lock className="w-4 h-4 text-gray-500" />}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className={`font-semibold ${status === 'locked' ? 'text-gray-500' : 'text-white'}`}>
                      {stage.title}
                    </h4>
                    <span className={`text-xs ${status === 'locked' ? 'text-gray-600' : 'text-[#4c9dff]'}`}>
                      {stage.xpRequired} XP Required
                    </span>
                  </div>
                  
                  <p className={`text-sm mb-2 ${status === 'locked' ? 'text-gray-600' : 'text-gray-400'}`}>
                    {stage.description}
                  </p>
                  
                  {status === 'current' && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {stage.milestones.map((milestone, i) => (
                        <span key={i} className="px-2 py-1 bg-gray-700/50 rounded text-xs text-gray-300">
                          {milestone}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Next Goal */}
      {roadmapStages[currentStage + 1] && (
        <div className="mt-6 p-4 bg-gradient-to-r from-[#4c9dff]/10 to-transparent rounded-lg border border-[#4c9dff]/20">
          <div className="flex items-center gap-3">
            <Star className="w-5 h-5 text-yellow-500" />
            <div>
              <p className="text-white font-semibold">Next Goal</p>
              <p className="text-gray-400 text-sm">
                Earn {roadmapStages[currentStage + 1].xpRequired - totalXP} more XP to reach {roadmapStages[currentStage + 1].title}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LearningRoadmap;