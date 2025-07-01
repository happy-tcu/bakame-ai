
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const GovernmentUseCases = () => {
  const [expandedUseCase, setExpandedUseCase] = useState<string | null>(null);

  const toggleUseCase = (useCase: string) => {
    setExpandedUseCase(expandedUseCase === useCase ? null : useCase);
  };

  const useCases = [
    {
      id: "citizen-services",
      title: "Citizen Services",
      color: "green",
      description: "Provide essential government services through voice interactions, from document requests to benefit applications, making services accessible to all citizens regardless of literacy or technology access.",
      subcategories: [
        { title: "Document Services", description: "Birth certificates, ID cards, passport applications" },
        { title: "Benefits & Welfare", description: "Social security, healthcare, unemployment benefits" },
        { title: "Tax Services", description: "Tax filing assistance, payment processing, refund status" }
      ]
    },
    {
      id: "emergency-services",
      title: "Emergency Services",
      color: "blue",
      description: "Critical emergency response systems that work even when traditional infrastructure fails. Provide real-time information, coordinate responses, and ensure citizen safety during crises.",
      subcategories: [
        { title: "Disaster Response", description: "Emergency alerts, evacuation instructions, resource coordination" },
        { title: "Health Emergency", description: "Medical triage, hospital capacity, health information" },
        { title: "Public Safety", description: "Crime reporting, safety alerts, community updates" }
      ]
    },
    {
      id: "public-information",
      title: "Public Information",
      color: "purple",
      description: "Disseminate important public information, policy updates, and educational content to citizens in multiple languages, ensuring everyone stays informed about government initiatives.",
      subcategories: [
        { title: "Policy Updates", description: "New regulations, law changes, public consultations" },
        { title: "Public Health", description: "Health advisories, vaccination info, disease prevention" },
        { title: "Civic Education", description: "Voting information, civic duties, government processes" }
      ]
    }
  ];

  return (
    <div className="mb-20">
      <h2 className="text-3xl font-bold mb-12 text-center animate-fade-in">Government Use Cases</h2>
      <div className="space-y-6">
        {useCases.map((useCase, index) => (
          <div 
            key={useCase.id}
            className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-white/20 transition-all duration-500 animate-fade-in"
            style={{animationDelay: `${index * 0.1}s`}}
          >
            <div 
              className="p-8 cursor-pointer hover:bg-white/5 transition-all duration-300"
              onClick={() => toggleUseCase(useCase.id)}
            >
              <div className="flex justify-between items-center">
                <h3 className={`text-2xl font-semibold text-${useCase.color}-400 flex items-center`}>
                  {useCase.title}
                  <ChevronDown 
                    className={`ml-4 w-6 h-6 transition-transform duration-300 ${
                      expandedUseCase === useCase.id ? 'rotate-180' : ''
                    }`}
                  />
                </h3>
              </div>
              <p className="text-white/70 mt-4 transition-all duration-300">
                {useCase.description}
              </p>
            </div>
            
            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
              expandedUseCase === useCase.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}>
              <div className="px-8 pb-8">
                <div className="grid md:grid-cols-3 gap-4 mt-6">
                  {useCase.subcategories.map((sub, subIndex) => (
                    <div 
                      key={subIndex}
                      className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-all duration-300 hover:scale-105"
                      style={{animationDelay: `${subIndex * 0.1}s`}}
                    >
                      <h4 className={`font-semibold text-${useCase.color}-300 mb-2`}>{sub.title}</h4>
                      <p className="text-white/60 text-sm">{sub.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GovernmentUseCases;
