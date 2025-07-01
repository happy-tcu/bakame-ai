
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import VideoModal from '@/components/VideoModal';
import { WaitlistForm } from '@/components/forms/WaitlistForm';
import { ContactForm } from '@/components/forms/ContactForm';
import { useAnalytics } from '@/hooks/useAnalytics';
import { Monitor, Shield, Users, Zap, Play, CheckCircle, Star, ArrowRight } from 'lucide-react';

const Index = () => {
  const [showVideoModal, setShowVideoModal] = useState(false);
  const { trackButtonClick } = useAnalytics();

  const handleWatchDemo = () => {
    trackButtonClick('watch_demo_hero');
    setShowVideoModal(true);
  };

  const handleGetStarted = () => {
    trackButtonClick('get_started_hero');
    // Scroll to waitlist form
    document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-20 pb-16">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-8 animate-fade-in">
              <Star className="w-4 h-4 mr-2" />
              Trusted by 10,000+ educators worldwide
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight animate-fade-in-up">
              Transform Education with
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> AI-Powered</span> Learning
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in-up delay-100">
              Bakame AI revolutionizes how students learn and teachers teach with intelligent, adaptive technology that personalizes education for every learner.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in-up delay-200">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                onClick={handleGetStarted}
              >
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-2 border-gray-300 hover:border-blue-500 px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 hover:shadow-lg"
                onClick={handleWatchDemo}
              >
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center animate-fade-in-up delay-300">
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">98%</div>
                <div className="text-gray-600">Student Satisfaction</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-600 mb-2">45%</div>
                <div className="text-gray-600">Faster Learning</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600 mb-2">10k+</div>
                <div className="text-gray-600">Active Users</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-orange-600 mb-2">24/7</div>
                <div className="text-gray-600">AI Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Bakame AI?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our AI-powered platform adapts to every student's learning style, providing personalized education at scale.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow duration-300 border-0 bg-gradient-to-br from-blue-50 to-blue-100">
              <CardContent className="p-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-blue-600 rounded-xl flex items-center justify-center">
                  <Monitor className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Smart Learning</h3>
                <p className="text-gray-600">AI adapts to each student's pace and learning style for optimal outcomes.</p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow duration-300 border-0 bg-gradient-to-br from-purple-50 to-purple-100">
              <CardContent className="p-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-purple-600 rounded-xl flex items-center justify-center">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Secure Platform</h3>
                <p className="text-gray-600">Enterprise-grade security ensures student data privacy and protection.</p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow duration-300 border-0 bg-gradient-to-br from-green-50 to-green-100">
              <CardContent className="p-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-green-600 rounded-xl flex items-center justify-center">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Collaborative</h3>
                <p className="text-gray-600">Connect students, teachers, and parents in one unified platform.</p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow duration-300 border-0 bg-gradient-to-br from-orange-50 to-orange-100">
              <CardContent className="p-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-orange-600 rounded-xl flex items-center justify-center">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Lightning Fast</h3>
                <p className="text-gray-600">Instant feedback and real-time analytics for immediate insights.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Transform Your Educational Experience
              </h2>
              <p className="text-xl text-gray-600">
                Join thousands of educators who are already using AI to enhance learning outcomes.
              </p>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300">
                <CheckCircle className="h-12 w-12 text-green-500 mb-6" />
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">For Students</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    Personalized learning paths
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    Instant feedback and support
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    Engaging interactive content
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    Progress tracking
                  </li>
                </ul>
              </div>
              
              <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300">
                <CheckCircle className="h-12 w-12 text-blue-500 mb-6" />
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">For Teachers</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                    Automated grading system
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                    Detailed student analytics
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                    Curriculum management
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                    Real-time classroom insights
                  </li>
                </ul>
              </div>
              
              <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300">
                <CheckCircle className="h-12 w-12 text-purple-500 mb-6" />
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">For Schools</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-purple-500 mr-3 mt-0.5 flex-shrink-0" />
                    Improved learning outcomes
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-purple-500 mr-3 mt-0.5 flex-shrink-0" />
                    Reduced administrative burden
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-purple-500 mr-3 mt-0.5 flex-shrink-0" />
                    Data-driven decisions
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-purple-500 mr-3 mt-0.5 flex-shrink-0" />
                    Cost-effective scaling
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-xl text-gray-600">
                Contact us to learn more about how Bakame AI can transform your educational experience.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-2xl p-8">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Waitlist Section */}
      <section id="waitlist" className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-white mb-6">
              Join the Waitlist
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Be among the first to experience the future of AI-powered education.
            </p>
            
            <div className="bg-white rounded-2xl p-8">
              <WaitlistForm />
            </div>
          </div>
        </div>
      </section>

      <VideoModal 
        isOpen={showVideoModal} 
        onClose={() => setShowVideoModal(false)}
        videoId="dQw4w9WgXcQ"
      />
    </div>
  );
};

export default Index;
