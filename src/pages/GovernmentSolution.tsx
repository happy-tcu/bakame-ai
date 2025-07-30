import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import GovernmentHero from "../components/government/GovernmentHero";
import GovernmentFeatures from "../components/government/GovernmentFeatures";
import GovernmentUseCases from "../components/government/GovernmentUseCases";
import GovernmentStats from "../components/government/GovernmentStats";
import GovernmentSecurity from "../components/government/GovernmentSecurity";
import GovernmentCTA from "../components/government/GovernmentCTA";
const GovernmentSolution = () => {
  const navigate = useNavigate();
  return <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="flex justify-between items-center p-6 md:p-8 border-b border-white/10 animate-fade-in">
        <div className="flex items-center space-x-4">
          <button onClick={() => navigate('/')} className="p-2 hover:bg-white/10 rounded-lg transition-all duration-300 hover:scale-110">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="text-2xl font-bold">Bakame Ai</div>
        </div>
        <div className="hidden md:flex space-x-8">
          <a href="/blog" className="text-white/70 hover:text-white transition-all duration-300 hover:scale-105">Blog</a>
          
          <a href="/team" className="text-white/70 hover:text-white transition-all duration-300 hover:scale-105">Team</a>
          
        </div>
      </nav>

      <div className="container mx-auto px-6 py-20">
        <GovernmentHero />
        <GovernmentFeatures />
        <GovernmentUseCases />
        <GovernmentStats />
        <GovernmentSecurity />
        <GovernmentCTA />
      </div>
    </div>;
};
export default GovernmentSolution;