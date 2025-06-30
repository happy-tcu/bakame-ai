
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Building2, Shield, Clock, BarChart3 } from "lucide-react";

const EnterpriseSolution = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="flex justify-between items-center p-6 md:p-8 border-b border-white/10">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => navigate('/')}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="text-2xl font-bold">Bakame Ai</div>
        </div>
        <div className="hidden md:flex space-x-8">
          <a href="/blog" className="text-white/70 hover:text-white transition-colors">Blog</a>
          <a href="/resources" className="text-white/70 hover:text-white transition-colors">Resources</a>
          <a href="/team" className="text-white/70 hover:text-white transition-colors">Team</a>
          <a href="/signup" className="text-white/70 hover:text-white transition-colors">Sign In</a>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-20">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Building2 className="w-8 h-8 text-purple-400" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Enterprise Solutions
          </h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Scalable, secure, and reliable IVR systems that transform customer service and internal communications for businesses of all sizes.
          </p>
        </div>

        {/* How It Works Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-12 text-center">How Bakame AI Powers Your Business</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold mb-3">Enterprise Security</h3>
              <p className="text-white/70 text-sm">
                Bank-level encryption and security protocols with on-premise deployment options for complete data control.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold mb-3">24/7 Availability</h3>
              <p className="text-white/70 text-sm">
                Always-on customer service that works even during internet outages or network failures.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="text-lg font-semibold mb-3">Advanced Analytics</h3>
              <p className="text-white/70 text-sm">
                Real-time insights and reporting to optimize customer interactions and business processes.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center mb-4">
                <Building2 className="w-6 h-6 text-orange-400" />
              </div>
              <h3 className="text-lg font-semibold mb-3">Seamless Integration</h3>
              <p className="text-white/70 text-sm">
                Easy integration with existing CRM, ERP, and business systems through robust APIs.
              </p>
            </div>
          </div>
        </div>

        {/* Use Cases Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-12 text-center">Enterprise Use Cases</h2>
          <div className="space-y-8">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
              <h3 className="text-2xl font-semibold mb-4 text-purple-400">Customer Service Automation</h3>
              <p className="text-white/70 mb-4">
                Handle customer inquiries, support tickets, and service requests 24/7 with intelligent voice interactions. 
                Reduce wait times and improve customer satisfaction while cutting operational costs.
              </p>
              <div className="grid md:grid-cols-3 gap-4 mt-6">
                <div className="bg-white/5 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-300 mb-2">Order Processing</h4>
                  <p className="text-white/60 text-sm">Automated order taking, status updates, and tracking information</p>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-300 mb-2">Technical Support</h4>
                  <p className="text-white/60 text-sm">Intelligent troubleshooting and issue resolution guidance</p>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-300 mb-2">Account Management</h4>
                  <p className="text-white/60 text-sm">Balance inquiries, payment processing, and account updates</p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
              <h3 className="text-2xl font-semibold mb-4 text-blue-400">Internal Communications</h3>
              <p className="text-white/70 mb-4">
                Streamline internal processes with voice-activated systems for HR, IT support, facilities management, 
                and employee information systems that work across all locations.
              </p>
              <div className="grid md:grid-cols-3 gap-4 mt-6">
                <div className="bg-white/5 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-300 mb-2">HR Services</h4>
                  <p className="text-white/60 text-sm">Leave requests, policy information, and benefits inquiries</p>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-300 mb-2">IT Helpdesk</h4>
                  <p className="text-white/60 text-sm">Password resets, system status, and technical assistance</p>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-300 mb-2">Facilities</h4>
                  <p className="text-white/60 text-sm">Room bookings, maintenance requests, and facility information</p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
              <h3 className="text-2xl font-semibold mb-4 text-green-400">Sales & Lead Management</h3>
              <p className="text-white/70 mb-4">
                Capture leads, qualify prospects, and provide product information through intelligent voice interactions. 
                Integrate with your CRM for seamless lead nurturing and follow-up processes.
              </p>
              <div className="grid md:grid-cols-3 gap-4 mt-6">
                <div className="bg-white/5 rounded-lg p-4">
                  <h4 className="font-semibold text-green-300 mb-2">Lead Qualification</h4>
                  <p className="text-white/60 text-sm">Automated prospect screening and scoring</p>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <h4 className="font-semibold text-green-300 mb-2">Product Info</h4>
                  <p className="text-white/60 text-sm">Detailed product specifications and pricing</p>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <h4 className="font-semibold text-green-300 mb-2">Appointment Setting</h4>
                  <p className="text-white/60 text-sm">Automated scheduling and calendar integration</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ROI Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-12 text-center">Return on Investment</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <div className="text-3xl font-bold text-green-400 mb-2">60%</div>
              <div className="text-white/70">Cost Reduction</div>
            </div>
            <div className="text-center bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <div className="text-3xl font-bold text-blue-400 mb-2">40%</div>
              <div className="text-white/70">Faster Response</div>
            </div>
            <div className="text-center bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <div className="text-3xl font-bold text-purple-400 mb-2">99.9%</div>
              <div className="text-white/70">Uptime</div>
            </div>
            <div className="text-center bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <div className="text-3xl font-bold text-orange-400 mb-2">85%</div>
              <div className="text-white/70">Customer Satisfaction</div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-white/5 backdrop-blur-sm rounded-3xl p-12 border border-white/10">
          <h2 className="text-3xl font-bold mb-6">Scale Your Business with AI</h2>
          <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
            Join leading enterprises already using Bakame AI to transform their customer experience and operational efficiency.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => navigate('/signup')}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 hover:scale-105"
            >
              Start Free Trial
            </button>
            <button className="border border-white/30 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/10 transition-all duration-300 hover:scale-105">
              Enterprise Demo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnterpriseSolution;
