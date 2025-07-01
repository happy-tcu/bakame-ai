
import { useNavigate } from "react-router-dom";

const GovernmentCTA = () => {
  const navigate = useNavigate();

  return (
    <div className="text-center bg-white/5 backdrop-blur-sm rounded-3xl p-12 border border-white/10 hover:border-white/20 transition-all duration-500 animate-fade-in">
      <h2 className="text-3xl font-bold mb-6">Serve Your Citizens Better</h2>
      <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
        Join government agencies already using Bakame AI to provide accessible, secure, and reliable services to all citizens.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button 
          onClick={() => navigate('/government-demo')}
          className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-green-600 hover:to-blue-600 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-green-500/25"
        >
          Request Pilot Program
        </button>
        <button className="border border-white/30 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:border-white/50">
          Government Demo
        </button>
      </div>
    </div>
  );
};

export default GovernmentCTA;
