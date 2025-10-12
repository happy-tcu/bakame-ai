import { Trophy, Flame, Target, TrendingUp, Award, BookOpen } from 'lucide-react';

const StatsCards = () => {
  const stats = [
    {
      icon: Flame,
      label: 'Current Streak',
      value: '7',
      unit: 'days',
      change: '+2 from last week',
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/20',
      borderColor: 'border-orange-500/30'
    },
    {
      icon: Trophy,
      label: 'Total XP',
      value: '1,245',
      unit: 'points',
      change: '+125 this week',
      color: 'text-[#4c9dff]',
      bgColor: 'bg-[#4c9dff]/20',
      borderColor: 'border-[#4c9dff]/30'
    },
    {
      icon: Target,
      label: 'Current Level',
      value: '12',
      unit: 'Intermediate',
      change: '88% to Level 13',
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/20',
      borderColor: 'border-purple-500/30'
    },
    {
      icon: BookOpen,
      label: 'Lessons Completed',
      value: '48',
      unit: 'total',
      change: '12 this month',
      color: 'text-green-500',
      bgColor: 'bg-green-500/20',
      borderColor: 'border-green-500/30'
    }
  ];

  const achievements = [
    { id: 1, title: 'First Steps', description: 'Complete your first lesson', completed: true, icon: Award },
    { id: 2, title: 'Week Warrior', description: '7-day streak', completed: true, icon: Flame },
    { id: 3, title: 'Vocabulary Master', description: 'Learn 100 words', completed: false, icon: BookOpen },
    { id: 4, title: 'Perfect Score', description: '100% accuracy in 5 lessons', completed: false, icon: Target }
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div 
              key={index}
              className={`bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border ${stat.borderColor} hover:shadow-xl transition-all duration-300 hover:scale-105`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <TrendingUp className="w-4 h-4 text-green-400" />
              </div>
              
              <div className="space-y-2">
                <p className="text-gray-400 text-sm">{stat.label}</p>
                <div className="flex items-baseline gap-2">
                  <span className={`text-3xl font-bold ${stat.color}`}>{stat.value}</span>
                  <span className="text-gray-500 text-sm">{stat.unit}</span>
                </div>
                <p className="text-xs text-gray-500">{stat.change}</p>
              </div>

              {/* Mini Progress Bar */}
              <div className="mt-4 h-1 bg-gray-800 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${stat.bgColor} rounded-full animate-pulse`}
                  style={{ width: '75%' }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Achievements Section */}
      <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800">
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-white mb-2">Recent Achievements</h3>
          <p className="text-gray-400 text-sm">Your learning milestones</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements.map((achievement) => {
            const Icon = achievement.icon;
            return (
              <div 
                key={achievement.id}
                className={`flex items-center gap-4 p-4 rounded-lg border transition-all duration-300 ${
                  achievement.completed 
                    ? 'bg-[#4c9dff]/10 border-[#4c9dff]/30 hover:bg-[#4c9dff]/20' 
                    : 'bg-gray-800/30 border-gray-700 opacity-60'
                }`}
              >
                <div className={`p-3 rounded-full ${
                  achievement.completed ? 'bg-[#4c9dff]/20' : 'bg-gray-800'
                }`}>
                  <Icon className={`w-5 h-5 ${
                    achievement.completed ? 'text-[#4c9dff]' : 'text-gray-500'
                  }`} />
                </div>
                <div className="flex-1">
                  <h4 className={`font-semibold ${
                    achievement.completed ? 'text-white' : 'text-gray-500'
                  }`}>
                    {achievement.title}
                  </h4>
                  <p className={`text-sm ${
                    achievement.completed ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {achievement.description}
                  </p>
                </div>
                {achievement.completed && (
                  <div className="text-[#4c9dff]">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Motivational Quote */}
      <div className="bg-gradient-to-r from-[#4c9dff]/10 to-purple-500/10 rounded-xl p-6 border border-[#4c9dff]/20">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white/10 rounded-lg">
            <Trophy className="w-6 h-6 text-yellow-500" />
          </div>
          <div>
            <p className="text-white font-semibold mb-1">Keep up the great work!</p>
            <p className="text-gray-400 text-sm">
              You're in the top 15% of learners this week. Your consistency is paying off!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsCards;