import ProgressChart from './ProgressChart';
import SkillsRadar from './SkillsRadar';
import LearningRoadmap from './LearningRoadmap';
import StatsCards from './StatsCards';

const ProgressDashboard = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">Your Learning Dashboard</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Track your progress, visualize your achievements, and see how far you've come in your English learning journey.
        </p>
      </div>

      {/* Stats Overview */}
      <StatsCards />

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProgressChart />
        <SkillsRadar />
      </div>

      {/* Learning Roadmap */}
      <LearningRoadmap />

      {/* Quick Actions */}
      <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800">
        <h3 className="text-xl font-semibold text-white mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 bg-[#4c9dff]/10 border border-[#4c9dff]/30 rounded-lg hover:bg-[#4c9dff]/20 transition-all duration-300 group">
            <div className="text-left">
              <p className="text-white font-semibold group-hover:text-[#4c9dff] transition-colors">Continue Learning</p>
              <p className="text-gray-400 text-sm mt-1">Resume your current lesson</p>
            </div>
          </button>
          
          <button className="p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg hover:bg-purple-500/20 transition-all duration-300 group">
            <div className="text-left">
              <p className="text-white font-semibold group-hover:text-purple-400 transition-colors">Practice Speaking</p>
              <p className="text-gray-400 text-sm mt-1">Improve pronunciation with AI</p>
            </div>
          </button>
          
          <button className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg hover:bg-green-500/20 transition-all duration-300 group">
            <div className="text-left">
              <p className="text-white font-semibold group-hover:text-green-400 transition-colors">Review Flashcards</p>
              <p className="text-gray-400 text-sm mt-1">Strengthen your vocabulary</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProgressDashboard;