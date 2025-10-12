import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
  Legend
} from 'recharts';

const ProgressChart = () => {
  // Sample data - in production, this would come from your API
  const weeklyData = [
    { day: 'Mon', lessons: 3, xp: 45, accuracy: 78 },
    { day: 'Tue', lessons: 5, xp: 75, accuracy: 82 },
    { day: 'Wed', lessons: 4, xp: 60, accuracy: 75 },
    { day: 'Thu', lessons: 6, xp: 90, accuracy: 88 },
    { day: 'Fri', lessons: 4, xp: 65, accuracy: 85 },
    { day: 'Sat', lessons: 7, xp: 105, accuracy: 92 },
    { day: 'Sun', lessons: 5, xp: 80, accuracy: 87 }
  ];

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
          <p className="text-2xl font-bold text-[#4c9dff]">450</p>
          <p className="text-xs text-gray-400 mt-1">Total XP</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-white">32</p>
          <p className="text-xs text-gray-400 mt-1">Lessons Completed</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-green-500">84%</p>
          <p className="text-xs text-gray-400 mt-1">Avg. Accuracy</p>
        </div>
      </div>
    </div>
  );
};

export default ProgressChart;