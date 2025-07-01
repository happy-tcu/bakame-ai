
import { Shield, Building } from "lucide-react";

const GovernmentSecurity = () => {
  return (
    <div className="mb-20">
      <h2 className="text-3xl font-bold mb-12 text-center animate-fade-in">Security & Compliance</h2>
      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 hover:border-white/20 transition-all duration-500 animate-fade-in">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="animate-fade-in" style={{animationDelay: '0.2s'}}>
            <h3 className="text-xl font-semibold mb-4 text-green-400">Data Protection</h3>
            <ul className="space-y-3 text-white/70">
              {[
                "End-to-end encryption for all voice data",
                "GDPR and local data protection compliance",
                "On-premise deployment options",
                "Regular security audits and updates"
              ].map((item, index) => (
                <li key={index} className="flex items-start hover:text-white/90 transition-colors duration-300" style={{animationDelay: `${0.3 + index * 0.1}s`}}>
                  <Shield className="w-4 h-4 mt-1 mr-3 text-green-400 flex-shrink-0 animate-pulse" style={{animationDelay: `${index * 0.2}s`}} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="animate-fade-in" style={{animationDelay: '0.4s'}}>
            <h3 className="text-xl font-semibold mb-4 text-blue-400">Government Standards</h3>
            <ul className="space-y-3 text-white/70">
              {[
                "Accessibility compliance (WCAG)",
                "Multi-language support requirements",
                "Disaster recovery and continuity",
                "Audit trails and reporting"
              ].map((item, index) => (
                <li key={index} className="flex items-start hover:text-white/90 transition-colors duration-300" style={{animationDelay: `${0.5 + index * 0.1}s`}}>
                  <Building className="w-4 h-4 mt-1 mr-3 text-blue-400 flex-shrink-0 animate-pulse" style={{animationDelay: `${index * 0.2 + 0.1}s`}} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GovernmentSecurity;
