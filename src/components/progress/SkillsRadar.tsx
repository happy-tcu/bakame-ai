import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Legend
} from 'recharts';

const SkillsRadar = () => {
  // Sample skills data - in production, this would come from your API
  const skillsData = [
    { skill: 'Speaking', level: 78, maxLevel: 100 },
    { skill: 'Listening', level: 85, maxLevel: 100 },
    { skill: 'Reading', level: 92, maxLevel: 100 },
    { skill: 'Writing', level: 70, maxLevel: 100 },
    { skill: 'Grammar', level: 88, maxLevel: 100 },
    { skill: 'Vocabulary', level: 75, maxLevel: 100 }
  ];

  const formatSkillData = skillsData.map(item => ({
    ...item,
    fullMark: 100
  }));

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-white mb-2">Skills Balance</h3>
        <p className="text-gray-400 text-sm">Your proficiency across different areas</p>
      </div>

      <ResponsiveContainer width="100%" height={350}>
        <RadarChart data={formatSkillData}>
          <defs>
            <linearGradient id="radarGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4c9dff" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#4c9dff" stopOpacity={0.1}/>
            </linearGradient>
          </defs>
          <PolarGrid 
            stroke="rgba(255,255,255,0.1)" 
            strokeDasharray="3 3"
          />
          <PolarAngleAxis 
            dataKey="skill"
            tick={{ fill: '#999', fontSize: 12 }}
            className="text-gray-400"
          />
          <PolarRadiusAxis 
            angle={90}
            domain={[0, 100]}
            tick={{ fill: '#666', fontSize: 10 }}
            tickCount={5}
          />
          <Radar 
            name="Current Level" 
            dataKey="level" 
            stroke="#4c9dff"
            strokeWidth={2}
            fill="#4c9dff"
            fillOpacity={0.4}
          />
        </RadarChart>
      </ResponsiveContainer>

      <div className="space-y-3 mt-6">
        {skillsData.map((skill) => (
          <div key={skill.skill} className="flex items-center justify-between">
            <span className="text-gray-400 text-sm w-24">{skill.skill}</span>
            <div className="flex-1 mx-4">
              <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#4c9dff] to-[#4c9dff]/60 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${skill.level}%` }}
                />
              </div>
            </div>
            <span className="text-white text-sm font-semibold w-12 text-right">
              {skill.level}%
            </span>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-gray-800 flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-xs">Strongest Skill</p>
          <p className="text-white font-semibold">Reading (92%)</p>
        </div>
        <div className="text-right">
          <p className="text-gray-400 text-xs">Needs Practice</p>
          <p className="text-white font-semibold">Writing (70%)</p>
        </div>
      </div>
    </div>
  );
};

export default SkillsRadar;