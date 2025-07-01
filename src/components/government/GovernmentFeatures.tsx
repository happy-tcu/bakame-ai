
import { Shield, Users, Phone, Building } from "lucide-react";

const GovernmentFeatures = () => {
  const features = [
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
  ];

  return (
    <div className="mb-20">
      <h2 className="text-3xl font-bold mb-12 text-center animate-fade-in">How Bakame AI Serves Citizens</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((item, index) => (
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
  );
};

export default GovernmentFeatures;
