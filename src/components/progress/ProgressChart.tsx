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
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/components/auth/AuthContext';
import { Loader2, BookOpen } from 'lucide-react';
import { useMemo } from 'react';

interface ProgressChartProps {
  sessions?: any[];
  progress?: any;
}

const ProgressChart = ({ sessions: propSessions, progress: propProgress }: ProgressChartProps = {}) => {
  const { user } = useAuth();
  
  // Fetch sessions data if not provided via props
  const { data: sessionsData, isLoading: sessionsLoading } = useQuery({
    queryKey: ['/api/sessions'],
    enabled: !!user && !propSessions
  });
  
  // Fetch progress data if not provided via props
  const { data: progressData, isLoading: progressLoading } = useQuery({
    queryKey: ['/api/progress'],
    enabled: !!user && !propProgress
  });
  
  const sessions = propSessions || (sessionsData as any)?.sessions || [];
  const progress = propProgress || (progressData as any)?.progress || {};
  const isLoading = sessionsLoading || progressLoading;
  
  // Process sessions data for the last 7 days
  const weeklyData = useMemo(() => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const today = new Date();
    const currentWeek = [];
    
    // Initialize all days with zero data
    for (let i = 0; i < 7; i++) {
      currentWeek.push({
        day: days[i],
        lessons: 0,
        xp: 0,
        accuracy: 0,
        sessionCount: 0
      });
    }
    
    // Process actual session data from the last 7 days
    sessions.forEach((session: any) => {
      if (!session.created_at) return;
      
      const sessionDate = new Date(session.created_at);
      const daysDiff = Math.floor((today.getTime() - sessionDate.getTime()) / (1000 * 60 * 60 * 24));
      
      // Only include sessions from the last 7 days
      if (daysDiff < 7 && daysDiff >= 0) {
        const sessionDayIndex = sessionDate.getDay();
        const adjustedIndex = sessionDayIndex === 0 ? 6 : sessionDayIndex - 1; // Convert Sunday from 0 to 6
        
        if (currentWeek[adjustedIndex]) {
          currentWeek[adjustedIndex].lessons += 1;
          currentWeek[adjustedIndex].xp += 15; // Default XP per session
          currentWeek[adjustedIndex].sessionCount += 1;
          
          // Calculate accuracy from session score if available
          const score = parseFloat(session.score || '0');
          if (score > 0) {
            // Update accuracy as a running average
            const currentAccuracy = currentWeek[adjustedIndex].accuracy;
            const currentCount = currentWeek[adjustedIndex].sessionCount - 1;
            currentWeek[adjustedIndex].accuracy = 
              (currentAccuracy * currentCount + score) / currentWeek[adjustedIndex].sessionCount;
          }
        }
      }
    });
    
    // Round accuracy values
    currentWeek.forEach(day => {
      day.accuracy = Math.round(day.accuracy);
    });
    
    return currentWeek;
  }, [sessions]);

  // Calculate summary statistics
  const stats = useMemo(() => {
    const totalXP = progress.total_xp || 0;
    const totalLessons = sessions.length || 0;
    
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
    
    return {
      totalXP,
      totalLessons,
      avgAccuracy
    };
  }, [sessions, progress]);

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

  // Show loading state
  if (isLoading) {
    return (
      <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800">
        <div className="flex items-center justify-center h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
        </div>
      </div>
    );
  }

  // Show empty state for new users
  const hasData = weeklyData.some(day => day.lessons > 0);
  if (!hasData && sessions.length === 0) {
    return (
      <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800">
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-white mb-2">Weekly Progress</h3>
          <p className="text-gray-400 text-sm">Your learning activity over the past 7 days</p>
        </div>
        
        <div className="flex flex-col items-center justify-center h-[300px] text-center">
          <BookOpen className="h-12 w-12 text-gray-600 mb-4" />
          <p className="text-white font-semibold mb-2">No activity yet this week</p>
          <p className="text-gray-400 text-sm max-w-xs">
            Start your first lesson to see your progress tracked here!
          </p>
        </div>
        
        <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-800">
          <div className="text-center">
            <p className="text-2xl font-bold text-[#4c9dff]">{stats.totalXP}</p>
            <p className="text-xs text-gray-400 mt-1">Total XP</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-white">{stats.totalLessons}</p>
            <p className="text-xs text-gray-400 mt-1">Lessons Completed</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-500">{stats.avgAccuracy}%</p>
            <p className="text-xs text-gray-400 mt-1">Avg. Accuracy</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-white mb-2">Weekly Progress</h3>
        <p className="text-gray-400 text-sm">Your learning activity over the past 7 days</p>
      </div>

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
          <p className="text-2xl font-bold text-[#4c9dff]">{stats.totalXP}</p>
          <p className="text-xs text-gray-400 mt-1">Total XP</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-white">{stats.totalLessons}</p>
          <p className="text-xs text-gray-400 mt-1">Lessons Completed</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-green-500">{stats.avgAccuracy}%</p>
          <p className="text-xs text-gray-400 mt-1">Avg. Accuracy</p>
        </div>
      </div>
    </div>
  );
};

export default ProgressChart;