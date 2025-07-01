
import { useState, useEffect, useRef } from "react";

const GovernmentStats = () => {
  const [countersVisible, setCountersVisible] = useState(false);
  const [animatedCounts, setAnimatedCounts] = useState({
    service: 0,
    satisfaction: 0,
    savings: 0,
    availability: 0
  });
  const statsRef = useRef<HTMLDivElement>(null);

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

  const stats = [
    { key: 'service', label: "Reduced Service Time", color: "green", suffix: "%" },
    { key: 'satisfaction', label: "Citizen Satisfaction", color: "blue", suffix: "%" },
    { key: 'savings', label: "Cost Savings", color: "purple", suffix: "%" },
    { key: 'availability', label: "Service Availability", color: "orange", suffix: "/7" }
  ];

  return (
    <div className="mb-20" ref={statsRef}>
      <h2 className="text-3xl font-bold mb-12 text-center animate-fade-in">Impact & Benefits</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
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
  );
};

export default GovernmentStats;
