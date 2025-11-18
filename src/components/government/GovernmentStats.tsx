
import { CheckCircle, Users, Clock, Shield } from "lucide-react";

const GovernmentStats = () => {
  const capabilities = [
    {
      icon: Clock,
      title: "Streamlined Service Delivery",
      description: "Automate routine inquiries and processes to help citizens get the information they need faster"
    },
    {
      icon: Users,
      title: "Enhanced Citizen Experience",
      description: "Provide consistent, accessible service through multiple channels including voice and text"
    },
    {
      icon: Shield,
      title: "Operational Efficiency",
      description: "Free up staff to focus on complex cases while AI handles routine queries and tasks"
    },
    {
      icon: CheckCircle,
      title: "Always Available",
      description: "Offer round-the-clock access to government services and information when citizens need it"
    }
  ];

  return (
    <div className="mb-20">
      <h2 className="text-3xl font-bold mb-12 text-center animate-fade-in text-foreground">Impact & Benefits</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {capabilities.map((capability, index) => (
          <div 
            key={capability.title}
            className="bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-border hover:border-border/50 hover:scale-105 hover:bg-card transition-all duration-500 animate-fade-in group"
            style={{animationDelay: `${index * 0.1}s`}}
          >
            <div className="w-12 h-12 bg-muted/50 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <capability.icon className="w-6 h-6 text-foreground" />
            </div>
            <h3 className="font-semibold text-foreground mb-2 group-hover:text-foreground transition-colors duration-300">
              {capability.title}
            </h3>
            <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
              {capability.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GovernmentStats;
