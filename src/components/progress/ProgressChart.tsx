import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
  Legend
} from 'recharts';
import { Book, TrendingUp, BarChart3 } from 'lucide-react';

interface Session {
  id?: string;
  completed_at?: string;
  xp_earned?: number;
  accuracy?: number;
}

interface ProgressChartProps {
  sessions?: Session[];
  totalXP?: number;
  lessonsCompleted?: number;
}

const ProgressChart = ({ sessions = [], totalXP = 0, lessonsCompleted = 0 }: ProgressChartProps) => {
  // Process session data for the last 7 days
  const processWeeklyData = () => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const weekData = [];

    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dayName = days[date.getDay() === 0 ? 6 : date.getDay() - 1];
      
      // Filter sessions for this day
      const daySessions = sessions.filter(session => {
        if (!session.completed_at) return false;
        const sessionDate = new Date(session.completed_at);
        sessionDate.setHours(0, 0, 0, 0);
        return sessionDate.getTime() === date.getTime();
      });

      // Calculate daily stats
      const dailyXP = daySessions.reduce((sum, s) => sum + (s.xp_earned || 0), 0);
      const dailyLessons = daySessions.length;
      const avgAccuracy = daySessions.length > 0
        ? Math.round(daySessions.reduce((sum, s) => sum + (s.accuracy || 0), 0) / daySessions.length)
        : 0;

      weekData.push({
        day: dayName,
        lessons: dailyLessons,
        xp: dailyXP,
        accuracy: avgAccuracy
      });
    }

    return weekData;
  };

  const weeklyData = processWeeklyData();
  const hasData = sessions.length > 0;
  
  // Calculate average accuracy for all sessions
  const avgAccuracy = sessions.length > 0
    ? Math.round(sessions.reduce((sum, s) => sum + (s.accuracy || 0), 0) / sessions.length)
    : 0;

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-900 border border-gray-700 rounded-lg p-3 shadow-xl">
          <p className="text-white font-semibold mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value}
              {entry.name === 'Accuracy' ? '%' : ''}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-white mb-2">Weekly Progress</h3>
        <p className="text-gray-400 text-sm">Your learning activity over the past 7 days</p>
      </div>

      {hasData ? (
        <>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={weeklyData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorXp" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4c9dff" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#4c9dff" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorAccuracy" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis 
                dataKey="day" 
                stroke="#999"
                tick={{ fill: '#999' }}
              />
              <YAxis 
                stroke="#999"
                tick={{ fill: '#999' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                wrapperStyle={{ 
                  paddingTop: '20px',
                  color: '#999'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="xp" 
                stroke="#4c9dff" 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#colorXp)"
                name="XP Earned"
              />
              <Area 
                type="monotone" 
                dataKey="accuracy" 
                stroke="#10b981" 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#colorAccuracy)"
                name="Accuracy"
              />
            </AreaChart>
          </ResponsiveContainer>

          <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-800">
            <div className="text-center">
              <p className="text-2xl font-bold text-[#4c9dff]">{totalXP}</p>
              <p className="text-xs text-gray-400 mt-1">Total XP</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-white">{lessonsCompleted}</p>
              <p className="text-xs text-gray-400 mt-1">Lessons Completed</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-500">{avgAccuracy}%</p>
              <p className="text-xs text-gray-400 mt-1">Avg. Accuracy</p>
            </div>
          </div>
        </>
      ) : (
        // Empty state
        <div className="flex flex-col items-center justify-center h-[300px] text-center">
          <BarChart3 className="w-16 h-16 text-gray-600 mb-4" />
          <h4 className="text-white font-semibold mb-2">No Progress Data Yet</h4>
          <p className="text-gray-400 text-sm max-w-xs">
            Start your first lesson to begin tracking your learning progress. 
            Your activity will appear here once you complete sessions.
          </p>
          <button className="mt-6 px-4 py-2 bg-[#4c9dff] text-white rounded-lg hover:bg-[#4c9dff]/80 transition-colors">
            Start First Lesson
          </button>
        </div>
      )}
    </div>
  );
};

export default ProgressChart;