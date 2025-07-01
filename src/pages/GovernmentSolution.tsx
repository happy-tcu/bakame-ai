
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Building, Shield, Users, Phone, ChevronDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const GovernmentSolution = () => {
  const navigate = useNavigate();
  const [expandedUseCase, setExpandedUseCase] = useState<string | null>(null);
  const [countersVisible, setCountersVisible] = useState(false);
  const [animatedCounts, setAnimatedCounts] = useState({
    service: 0,
    satisfaction: 0,
    savings: 0,
    availability: 0
  });
  const statsRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for stats animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !countersVisible) {
          setCountersVisible(true);
          animateCounters();
        }
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, [countersVisible]);

  const animateCounters = () => {
    const targets = { service: 75, satisfaction: 90, savings: 50, availability: 24 };
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      const easeOutProgress = 1 - Math.pow(1 - progress, 3);

      setAnimatedCounts({
        service: Math.round(targets.service * easeOutProgress),
        satisfaction: Math.round(targets.satisfaction * easeOutProgress),
        savings: Math.round(targets.savings * easeOutProgress),
        availability: Math.round(targets.availability * easeOutProgress)
      });

      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, stepDuration);
  };

  const toggleUseCase = (useCase: string) => {
    setExpandedUseCase(expandedUseCase === useCase ? null : useCase);
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="flex justify-between items-center p-6 md:p-8 border-b border-white/10 animate-fade-in">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => navigate('/')}
            className="p-2 hover:bg-white/10 rounded-lg transition-all duration-300 hover:scale-110"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="text-2xl font-bold">Bakame Ai</div>
        </div>
        <div className="hidden md:flex space-x-8">
          <a href="/blog" className="text-white/70 hover:text-white transition-all duration-300 hover:scale-105">Blog</a>
          <a href="/resources" className="text-white/70 hover:text-white transition-all duration-300 hover:scale-105">Resources</a>
          <a href="/team" className="text-white/70 hover:text-white transition-all duration-300 hover:scale-105">Team</a>
          <a href="/signup" className="text-white/70 hover:text-white transition-all duration-300 hover:scale-105">Sign In</a>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-20">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="w-16 h-16 bg-green-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 animate-float animate-pulse-glow">
            <Building className="w-8 h-8 text-green-400" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent animate-fade-in" style={{animationDelay: '0.2s'}}>
            Government Solutions
          </h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto animate-fade-in" style={{animationDelay: '0.4s'}}>
            Secure, accessible, and reliable IVR systems that bring government services directly to citizens, regardless of location or connectivity.
          </p>
        </div>

        {/* How It Works Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-12 text-center animate-fade-in">How Bakame AI Serves Citizens</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Shield,
                title: "Secure by Design",
                description: "Government-grade security with end-to-end encryption and compliance with data protection regulations.",
                color: "green",
                delay: "0s"
              },
              {
                icon: Users,
                title: "Universal Access",
                description: "Works on any phone, in any language, ensuring all citizens can access government services.",
                color: "blue",
                delay: "0.1s"
              },
              {
                icon: Phone,
                title: "Always Available",
                description: "24/7 service availability, even during emergencies or infrastructure failures.",
                color: "purple",
                delay: "0.2s"
              },
              {
                icon: Building,
                title: "Scalable Infrastructure",
                description: "Scales from local municipalities to national deployments with consistent performance.",
                color: "orange",
                delay: "0.3s"
              }
            ].map((item, index) => (
              <div 
                key={index}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105 hover:bg-white/10 animate-fade-in group cursor-pointer"
                style={{animationDelay: item.delay}}
              >
                <div className={`w-12 h-12 bg-${item.color}-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <item.icon className={`w-6 h-6 text-${item.color}-400 group-hover:animate-pulse`} />
                </div>
                <h3 className="text-lg font-semibold mb-3 group-hover:text-white transition-colors duration-300">{item.title}</h3>
                <p className="text-white/70 text-sm group-hover:text-white/90 transition-colors duration-300">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Use Cases Section with Accordion */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-12 text-center animate-fade-in">Government Use Cases</h2>
          <div className="space-y-6">
            {[
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
            ].map((useCase, index) => (
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

        {/* Benefits Section with Animated Counters */}
        <div className="mb-20" ref={statsRef}>
          <h2 className="text-3xl font-bold mb-12 text-center animate-fade-in">Impact & Benefits</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { key: 'service', label: "Reduced Service Time", color: "green", suffix: "%" },
              { key: 'satisfaction', label: "Citizen Satisfaction", color: "blue", suffix: "%" },
              { key: 'savings', label: "Cost Savings", color: "purple", suffix: "%" },
              { key: 'availability', label: "Service Availability", color: "orange", suffix: "/7" }
            ].map((stat, index) => (
              <div 
                key={stat.key}
                className="text-center bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-white/20 hover:scale-105 hover:bg-white/10 transition-all duration-500 animate-fade-in group"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className={`text-3xl font-bold text-${stat.color}-400 mb-2 group-hover:scale-110 transition-transform duration-300`}>
                  {animatedCounts[stat.key as keyof typeof animatedCounts]}{stat.suffix}
                </div>
                <div className="text-white/70 group-hover:text-white/90 transition-colors duration-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Security & Compliance */}
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

        {/* CTA Section */}
        <div className="text-center bg-white/5 backdrop-blur-sm rounded-3xl p-12 border border-white/10 hover:border-white/20 transition-all duration-500 animate-fade-in">
          <h2 className="text-3xl font-bold mb-6">Serve Your Citizens Better</h2>
          <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
            Join government agencies already using Bakame AI to provide accessible, secure, and reliable services to all citizens.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => navigate('/signup')}
              className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-green-600 hover:to-blue-600 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-green-500/25"
            >
              Request Pilot Program
            </button>
            <button className="border border-white/30 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:border-white/50">
              Government Demo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GovernmentSolution;
