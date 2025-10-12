import { CheckCircle2, Lock, PlayCircle, Star } from 'lucide-react';

interface RoadmapNode {
  id: number;
  title: string;
  description: string;
  xp: number;
  status: 'completed' | 'current' | 'locked';
  level: string;
  duration: string;
}

const LearningRoadmap = () => {
  const roadmapData: RoadmapNode[] = [
    {
      id: 1,
      title: "Getting Started",
      description: "Learn basic greetings and introductions",
      xp: 50,
      status: 'completed',
      level: 'Beginner',
      duration: '30 min'
    },
    {
      id: 2,
      title: "Essential Vocabulary",
      description: "Master 100 most common English words",
      xp: 75,
      status: 'completed',
      level: 'Beginner',
      duration: '45 min'
    },
    {
      id: 3,
      title: "Basic Conversations",
      description: "Practice everyday dialogues",
      xp: 100,
      status: 'current',
      level: 'Beginner',
      duration: '1 hour'
    },
    {
      id: 4,
      title: "Grammar Fundamentals",
      description: "Understand sentence structure",
      xp: 125,
      status: 'locked',
      level: 'Intermediate',
      duration: '1.5 hours'
    },
    {
      id: 5,
      title: "Business English",
      description: "Professional communication skills",
      xp: 150,
      status: 'locked',
      level: 'Intermediate',
      duration: '2 hours'
    },
    {
      id: 6,
      title: "Advanced Speaking",
      description: "Fluent conversation techniques",
      xp: 200,
      status: 'locked',
      level: 'Advanced',
      duration: '2 hours'
    }
  ];

  const getNodeIcon = (status: string) => {
    switch(status) {
      case 'completed':
        return <CheckCircle2 className="w-6 h-6 text-[#4c9dff]" />;
      case 'current':
        return <PlayCircle className="w-6 h-6 text-white animate-pulse" />;
      case 'locked':
        return <Lock className="w-5 h-5 text-gray-500" />;
      default:
        return null;
    }
  };

  const getNodeStyles = (status: string) => {
    switch(status) {
      case 'completed':
        return 'bg-[#4c9dff]/20 border-[#4c9dff] shadow-lg shadow-[#4c9dff]/20';
      case 'current':
        return 'bg-gray-800 border-white shadow-lg shadow-white/20 animate-subtle-glow';
      case 'locked':
        return 'bg-gray-900/50 border-gray-700 opacity-60';
      default:
        return '';
    }
  };

  const totalXP = roadmapData.filter(node => node.status === 'completed').reduce((acc, node) => acc + node.xp, 0);
  const maxXP = roadmapData.reduce((acc, node) => acc + node.xp, 0);
  const progressPercentage = (totalXP / maxXP) * 100;

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-semibold text-white">Learning Path</h3>
          <span className="text-[#4c9dff] font-semibold">{totalXP} / {maxXP} XP</span>
        </div>
        <p className="text-gray-400 text-sm">Your journey to English fluency</p>
        
        <div className="mt-4">
          <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#4c9dff] to-[#4c9dff]/60 rounded-full transition-all duration-700 ease-out shadow-lg shadow-[#4c9dff]/30"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <p className="text-xs text-gray-400 mt-2">Overall Progress: {Math.round(progressPercentage)}% Complete</p>
        </div>
      </div>

      <div className="relative">
        {/* Connecting Line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-700"></div>
        <div 
          className="absolute left-8 top-0 w-0.5 bg-gradient-to-b from-[#4c9dff] to-[#4c9dff]/20 transition-all duration-700"
          style={{ height: `${(roadmapData.findIndex(n => n.status === 'current') / roadmapData.length) * 100}%` }}
        ></div>

        <div className="space-y-6">
          {roadmapData.map((node, index) => (
            <div key={node.id} className="relative flex items-start gap-4">
              {/* Node Circle */}
              <div className={`relative z-10 w-16 h-16 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${getNodeStyles(node.status)}`}>
                {getNodeIcon(node.status)}
              </div>

              {/* Content Card */}
              <div 
                className={`flex-1 rounded-lg border p-4 transition-all duration-300 hover:shadow-lg ${
                  node.status === 'completed' 
                    ? 'bg-gray-800 border-gray-700 hover:border-[#4c9dff]/50' 
                    : node.status === 'current'
                    ? 'bg-gray-800 border-[#4c9dff] shadow-md shadow-[#4c9dff]/20'
                    : 'bg-gray-900/30 border-gray-800 cursor-not-allowed'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className={`font-semibold mb-1 ${node.status === 'locked' ? 'text-gray-500' : 'text-white'}`}>
                      {node.title}
                    </h4>
                    <p className={`text-sm mb-3 ${node.status === 'locked' ? 'text-gray-600' : 'text-gray-400'}`}>
                      {node.description}
                    </p>
                    
                    <div className="flex items-center gap-4 text-xs">
                      <span className={`px-2 py-1 rounded ${
                        node.level === 'Beginner' ? 'bg-green-500/20 text-green-400' :
                        node.level === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {node.level}
                      </span>
                      <span className="text-gray-500">{node.duration}</span>
                      <span className="text-[#4c9dff] font-semibold">+{node.xp} XP</span>
                    </div>
                  </div>

                  {node.status === 'current' && (
                    <button className="ml-4 px-4 py-2 bg-[#4c9dff] text-white rounded-lg font-semibold text-sm hover:bg-[#4c9dff]/80 transition-colors">
                      Continue
                    </button>
                  )}
                  
                  {node.status === 'completed' && (
                    <Star className="ml-4 w-5 h-5 text-yellow-500" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 p-4 bg-gradient-to-r from-[#4c9dff]/10 to-transparent rounded-lg border border-[#4c9dff]/20">
        <div className="flex items-center gap-3">
          <Star className="w-5 h-5 text-yellow-500" />
          <div>
            <p className="text-white font-semibold">Next Milestone</p>
            <p className="text-gray-400 text-sm">Complete "Basic Conversations" to unlock Grammar Fundamentals</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningRoadmap;