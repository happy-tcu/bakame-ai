import { useNavigate } from "react-router-dom";
import { ArrowLeft, BookOpen, Users, Wifi, WifiOff, Play, CheckCircle, TrendingUp, Languages } from "lucide-react";
import { useState, useEffect } from "react";

const EducationSolution = () => {
  const navigate = useNavigate();
  const [activeCard, setActiveCard] = useState(0);
  const [studentCount, setStudentCount] = useState(0);
  const [schoolCount, setSchoolCount] = useState(0);
  const [completionRate, setCompletionRate] = useState(0);
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);
  const [progressAnimated, setProgressAnimated] = useState(false);

  // Animated counters
  useEffect(() => {
    const animateCounters = () => {
      const duration = 2000;
      const steps = 60;
      const increment = duration / steps;

      let currentStep = 0;
      const timer = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        
        setStudentCount(Math.floor(25000 * progress));
        setSchoolCount(Math.floor(150 * progress));
        setCompletionRate(Math.floor(92 * progress));

        if (currentStep >= steps) {
          clearInterval(timer);
        }
      }, increment);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounters();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.5 }
    );

    const statsSection = document.getElementById('stats-section');
    if (statsSection) {
      observer.observe(statsSection);
    }

    return () => observer.disconnect();
  }, []);

  // Animate progress bars when section comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setProgressAnimated(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );

    const featuresSection = document.getElementById('features-section');
    if (featuresSection) {
      observer.observe(featuresSection);
    }

    return () => observer.disconnect();
  }, []);

  // Auto-rotate feature cards
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % 3);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Navigation */}
      <nav className="flex justify-between items-center p-6 md:p-8 border-b border-white/10 backdrop-blur-sm sticky top-0 z-50">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => navigate('/')}
            className="p-2 hover:bg-white/10 rounded-lg transition-all duration-300 hover:scale-105"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="text-2xl font-bold">Bakame Ai</div>
        </div>
        <div className="hidden md:flex space-x-8">
          <a href="/blog" className="text-white/70 hover:text-white transition-colors hover:scale-105 transform duration-200">Blog</a>
          <a href="/resources" className="text-white/70 hover:text-white transition-colors hover:scale-105 transform duration-200">Resources</a>
          <a href="/team" className="text-white/70 hover:text-white transition-colors hover:scale-105 transform duration-200">Team</a>
          <a href="/signup" className="text-white/70 hover:text-white transition-colors hover:scale-105 transform duration-200">Sign In</a>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-20">
        {/* Hero Section with English Learning Focus */}
        <div className="text-center mb-16 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-3xl animate-pulse"></div>
          <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 animate-bounce">
            <Languages className="w-8 h-8 text-blue-400" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent animate-fade-in">
            English Learning Solutions
          </h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto animate-fade-in">
            Master English through offline-first IVR technology that works anywhere, anytime. Perfect for students in remote areas or those without internet access.
          </p>
          
          {/* Live Stats */}
          <div id="stats-section" className="grid grid-cols-3 gap-8 mt-12 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">{studentCount.toLocaleString()}+</div>
              <div className="text-white/60 text-sm">English Learners</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">{schoolCount}+</div>
              <div className="text-white/60 text-sm">Schools Connected</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">{completionRate}%</div>
              <div className="text-white/60 text-sm">Completion Rate</div>
            </div>
          </div>
        </div>

        {/* Interactive How It Works Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-12 text-center">How Bakame AI Works for English Learning</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: WifiOff,
                title: "Offline-First Design",
                description: "Learn English completely offline using basic phones. No internet required - perfect for rural areas with limited connectivity.",
                color: "blue"
              },
              {
                icon: Languages,
                title: "Native Language Bridge",
                description: "Start learning English from your native language - Kinyarwanda, French, or Swahili. Gradual transition to full English immersion.",
                color: "purple"
              },
              {
                icon: Users,
                title: "Interactive Conversations",
                description: "Practice speaking, listening, and pronunciation through AI-powered conversations. Get instant feedback on your English skills.",
                color: "green"
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className={`bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 transition-all duration-500 hover:scale-105 hover:bg-white/10 cursor-pointer ${
                  activeCard === index ? 'ring-2 ring-blue-400/50 scale-105' : ''
                }`}
                onMouseEnter={() => setActiveCard(index)}
              >
                <div className={`w-12 h-12 bg-${feature.color}-500/20 rounded-lg flex items-center justify-center mb-4 transition-all duration-300`}>
                  <feature.icon className={`w-6 h-6 text-${feature.color}-400`} />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-white/70">{feature.description}</p>
                <div className="mt-4 w-full bg-white/10 rounded-full h-1">
                  <div 
                    className={`h-1 bg-${feature.color}-400 rounded-full transition-all duration-1000 ${
                      activeCard === index ? 'w-full' : 'w-0'
                    }`}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced English Learning Specific Features */}
        <div id="features-section" className="mb-20">
          <h2 className="text-3xl font-bold mb-12 text-center">English Learning Features</h2>
          <div className="space-y-8">
            {[
              {
                title: "Pronunciation Practice",
                description: "Perfect your English pronunciation with AI-powered feedback. Practice individual sounds, words, and sentences with real-time corrections and suggestions for improvement.",
                features: [
                  { name: "Phonetic sound practice", progress: 95 },
                  { name: "Word pronunciation drills", progress: 88 },
                  { name: "Sentence rhythm and intonation", progress: 92 },
                  { name: "Accent reduction exercises", progress: 85 }
                ],
                color: "blue",
                icon: Languages,
                stats: { accuracy: "95%", improvement: "+23%" }
              },
              {
                title: "Vocabulary Building",
                description: "Expand your English vocabulary through interactive exercises and contextual learning. Learn new words in context with practical examples and usage scenarios.",
                features: [
                  { name: "Daily vocabulary challenges", progress: 90 },
                  { name: "Contextual word learning", progress: 93 },
                  { name: "Synonyms and antonyms practice", progress: 87 },
                  { name: "Industry-specific terminology", progress: 82 }
                ],
                color: "purple",
                icon: BookOpen,
                stats: { retention: "89%", newWords: "150/week" }
              },
              {
                title: "Grammar Mastery",
                description: "Master English grammar rules through interactive exercises and practical applications. From basic sentence structure to complex grammatical concepts.",
                features: [
                  { name: "Tense practice and usage", progress: 91 },
                  { name: "Sentence structure building", progress: 86 },
                  { name: "Common grammar mistakes correction", progress: 94 },
                  { name: "Advanced grammar concepts", progress: 79 }
                ],
                color: "green",
                icon: CheckCircle,
                stats: { accuracy: "91%", mastery: "78%" }
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className={`bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 transition-all duration-500 group cursor-pointer transform ${
                  hoveredFeature === index ? 'scale-[1.02] bg-white/10 shadow-2xl shadow-blue-500/10' : 'hover:bg-white/8'
                }`}
                onMouseEnter={() => setHoveredFeature(index)}
                onMouseLeave={() => setHoveredFeature(null)}
              >
                <div className="flex flex-col lg:flex-row items-start space-y-6 lg:space-y-0 lg:space-x-8">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className={`w-16 h-16 bg-${feature.color}-500/20 rounded-xl flex items-center justify-center transition-all duration-500 ${
                      hoveredFeature === index ? 'scale-110 rotate-6' : 'group-hover:scale-105'
                    }`}>
                      <feature.icon className={`w-8 h-8 text-${feature.color}-400 transition-all duration-300`} />
                    </div>
                    <div className="flex-1">
                      <h3 className={`text-2xl font-semibold mb-4 text-${feature.color}-400 transition-all duration-300`}>
                        {feature.title}
                      </h3>
                      <p className="text-white/70 mb-6 transition-all duration-300 group-hover:text-white/90">
                        {feature.description}
                      </p>
                      
                      {/* Interactive Progress Bars */}
                      <div className="space-y-4">
                        {feature.features.map((feat, featureIndex) => (
                          <div key={featureIndex} className="group/item">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center space-x-2">
                                <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                                <span className="text-sm text-white/80 transition-colors duration-300 group-hover/item:text-white">
                                  {feat.name}
                                </span>
                              </div>
                              <span className={`text-xs font-medium text-${feature.color}-400 transition-all duration-300`}>
                                {feat.progress}%
                              </span>
                            </div>
                            <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                              <div 
                                className={`h-2 bg-gradient-to-r from-${feature.color}-400 to-${feature.color}-500 rounded-full transition-all duration-1000 ease-out ${
                                  progressAnimated ? `w-[${feat.progress}%]` : 'w-0'
                                }`}
                                style={{ 
                                  width: progressAnimated ? `${feat.progress}%` : '0%',
                                  transitionDelay: `${featureIndex * 200}ms`
                                }}
                              >
                                <div className="w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Interactive Stats Panel */}
                  <div className={`bg-white/5 rounded-lg p-4 border border-white/10 transition-all duration-500 ${
                    hoveredFeature === index ? 'bg-white/10 scale-105' : ''
                  }`}>
                    <h4 className={`text-sm font-medium text-${feature.color}-400 mb-3`}>Performance Stats</h4>
                    <div className="space-y-2">
                      {Object.entries(feature.stats).map(([key, value], statIndex) => (
                        <div key={key} className="flex justify-between items-center">
                          <span className="text-xs text-white/60 capitalize">{key}:</span>
                          <span className={`text-sm font-bold text-${feature.color}-400 transition-all duration-300 ${
                            hoveredFeature === index ? 'scale-110' : ''
                          }`}>
                            {value}
                          </span>
                        </div>
                      ))}
                    </div>
                    
                    {/* Mini Chart Visualization */}
                    <div className="mt-3 flex space-x-1 h-8 items-end">
                      {[65, 78, 85, 92, 88, 95].map((height, i) => (
                        <div 
                          key={i}
                          className={`bg-${feature.color}-400/30 rounded-sm flex-1 transition-all duration-500`}
                          style={{ 
                            height: `${height * 0.3}px`,
                            transitionDelay: hoveredFeature === index ? `${i * 50}ms` : '0ms'
                          }}
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Animated Border Effect */}
                <div className={`absolute inset-0 rounded-xl bg-gradient-to-r from-${feature.color}-500/20 via-transparent to-${feature.color}-500/20 opacity-0 transition-opacity duration-500 ${
                  hoveredFeature === index ? 'opacity-100' : ''
                }`}></div>
              </div>
            ))}
          </div>
        </div>

        {/* Other Educational Use Cases */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-12 text-center">Other Educational Applications</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Remote Learning Support",
                description: "Access course materials, participate in discussions, and complete assignments using basic phones for any subject.",
                icon: Play,
                color: "blue"
              },
              {
                title: "Administrative Services",
                description: "Automated systems for student enrollment, grade inquiries, schedule information, and parent-teacher communication.",
                icon: Users,
                color: "purple"
              }
            ].map((useCase, index) => (
              <div 
                key={index}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-500 group"
              >
                <div className="flex items-start space-x-4">
                  <div className={`w-10 h-10 bg-${useCase.color}-500/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <useCase.icon className={`w-5 h-5 text-${useCase.color}-400`} />
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-xl font-semibold mb-2 text-${useCase.color}-400`}>{useCase.title}</h3>
                    <p className="text-white/70">{useCase.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Benefits Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-12 text-center">Key Benefits</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold mb-6 text-blue-400 flex items-center">
                <TrendingUp className="w-6 h-6 mr-2" />
                For English Learners
              </h3>
              {[
                "Learn English from anywhere, even without internet",
                "Start from your native language and progress gradually",
                "No need for expensive devices or data plans",
                "Personalized learning pace and content"
              ].map((benefit, index) => (
                <div key={index} className="flex items-start group cursor-pointer">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0 group-hover:scale-150 transition-transform duration-300"></div>
                  <span className="text-white/70 group-hover:text-white transition-colors duration-300">{benefit}</span>
                </div>
              ))}
            </div>
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold mb-6 text-purple-400 flex items-center">
                <BookOpen className="w-6 h-6 mr-2" />
                For Schools
              </h3>
              {[
                "Reach students in remote areas without internet",
                "Reduce infrastructure costs for English programs",
                "Track student progress and engagement",
                "Support teachers with automated assessments"
              ].map((benefit, index) => (
                <div key={index} className="flex items-start group cursor-pointer">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 mr-3 flex-shrink-0 group-hover:scale-150 transition-transform duration-300"></div>
                  <span className="text-white/70 group-hover:text-white transition-colors duration-300">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced CTA Section */}
        <div className="text-center bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-sm rounded-3xl p-12 border border-white/10 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 animate-pulse"></div>
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-6">Ready to Transform English Learning?</h2>
            <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
              Join thousands of students already improving their English skills with Bakame AI's offline-first approach.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => navigate('/signup')}
                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25"
              >
                Start Learning English
              </button>
              <button className="border border-white/30 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:border-white/60">
                Schedule Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationSolution;
