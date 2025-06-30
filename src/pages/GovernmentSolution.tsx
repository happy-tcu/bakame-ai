
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Building, Shield, Users, Phone } from "lucide-react";

const GovernmentSolution = () => {
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
          <div className="w-16 h-16 bg-green-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Building className="w-8 h-8 text-green-400" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
            Government Solutions
          </h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Secure, accessible, and reliable IVR systems that bring government services directly to citizens, regardless of location or connectivity.
          </p>
        </div>

        {/* How It Works Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-12 text-center">How Bakame AI Serves Citizens</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="text-lg font-semibold mb-3">Secure by Design</h3>
              <p className="text-white/70 text-sm">
                Government-grade security with end-to-end encryption and compliance with data protection regulations.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold mb-3">Universal Access</h3>
              <p className="text-white/70 text-sm">
                Works on any phone, in any language, ensuring all citizens can access government services.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
                <Phone className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold mb-3">Always Available</h3>
              <p className="text-white/70 text-sm">
                24/7 service availability, even during emergencies or infrastructure failures.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center mb-4">
                <Building className="w-6 h-6 text-orange-400" />
              </div>
              <h3 className="text-lg font-semibold mb-3">Scalable Infrastructure</h3>
              <p className="text-white/70 text-sm">
                Scales from local municipalities to national deployments with consistent performance.
              </p>
            </div>
          </div>
        </div>

        {/* Use Cases Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-12 text-center">Government Use Cases</h2>
          <div className="space-y-8">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
              <h3 className="text-2xl font-semibold mb-4 text-green-400">Citizen Services</h3>
              <p className="text-white/70 mb-4">
                Provide essential government services through voice interactions, from document requests to benefit applications, 
                making services accessible to all citizens regardless of literacy or technology access.
              </p>
              <div className="grid md:grid-cols-3 gap-4 mt-6">
                <div className="bg-white/5 rounded-lg p-4">
                  <h4 className="font-semibold text-green-300 mb-2">Document Services</h4>
                  <p className="text-white/60 text-sm">Birth certificates, ID cards, passport applications</p>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <h4 className="font-semibold text-green-300 mb-2">Benefits & Welfare</h4>
                  <p className="text-white/60 text-sm">Social security, healthcare, unemployment benefits</p>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <h4 className="font-semibold text-green-300 mb-2">Tax Services</h4>
                  <p className="text-white/60 text-sm">Tax filing assistance, payment processing, refund status</p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
              <h3 className="text-2xl font-semibold mb-4 text-blue-400">Emergency Services</h3>
              <p className="text-white/70 mb-4">
                Critical emergency response systems that work even when traditional infrastructure fails. 
                Provide real-time information, coordinate responses, and ensure citizen safety during crises.
              </p>
              <div className="grid md:grid-cols-3 gap-4 mt-6">
                <div className="bg-white/5 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-300 mb-2">Disaster Response</h4>
                  <p className="text-white/60 text-sm">Emergency alerts, evacuation instructions, resource coordination</p>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-300 mb-2">Health Emergency</h4>
                  <p className="text-white/60 text-sm">Medical triage, hospital capacity, health information</p>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-300 mb-2">Public Safety</h4>
                  <p className="text-white/60 text-sm">Crime reporting, safety alerts, community updates</p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
              <h3 className="text-2xl font-semibold mb-4 text-purple-400">Public Information</h3>
              <p className="text-white/70 mb-4">
                Disseminate important public information, policy updates, and educational content to citizens 
                in multiple languages, ensuring everyone stays informed about government initiatives.
              </p>
              <div className="grid md:grid-cols-3 gap-4 mt-6">
                <div className="bg-white/5 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-300 mb-2">Policy Updates</h4>
                  <p className="text-white/60 text-sm">New regulations, law changes, public consultations</p>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-300 mb-2">Public Health</h4>
                  <p className="text-white/60 text-sm">Health advisories, vaccination info, disease prevention</p>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-300 mb-2">Civic Education</h4>
                  <p className="text-white/60 text-sm">Voting information, civic duties, government processes</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-12 text-center">Impact & Benefits</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <div className="text-3xl font-bold text-green-400 mb-2">75%</div>
              <div className="text-white/70">Reduced Service Time</div>
            </div>
            <div className="text-center bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <div className="text-3xl font-bold text-blue-400 mb-2">90%</div>
              <div className="text-white/70">Citizen Satisfaction</div>
            </div>
            <div className="text-center bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <div className="text-3xl font-bold text-purple-400 mb-2">50%</div>
              <div className="text-white/70">Cost Savings</div>
            </div>
            <div className="text-center bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <div className="text-3xl font-bold text-orange-400 mb-2">24/7</div>
              <div className="text-white/70">Service Availability</div>
            </div>
          </div>
        </div>

        {/* Security & Compliance */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-12 text-center">Security & Compliance</h2>
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-green-400">Data Protection</h3>
                <ul className="space-y-3 text-white/70">
                  <li className="flex items-start">
                    <Shield className="w-4 h-4 mt-1 mr-3 text-green-400 flex-shrink-0" />
                    <span>End-to-end encryption for all voice data</span>
                  </li>
                  <li className="flex items-start">
                    <Shield className="w-4 h-4 mt-1 mr-3 text-green-400 flex-shrink-0" />
                    <span>GDPR and local data protection compliance</span>
                  </li>
                  <li className="flex items-start">
                    <Shield className="w-4 h-4 mt-1 mr-3 text-green-400 flex-shrink-0" />
                    <span>On-premise deployment options</span>
                  </li>
                  <li className="flex items-start">
                    <Shield className="w-4 h-4 mt-1 mr-3 text-green-400 flex-shrink-0" />
                    <span>Regular security audits and updates</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-blue-400">Government Standards</h3>
                <ul className="space-y-3 text-white/70">
                  <li className="flex items-start">
                    <Building className="w-4 h-4 mt-1 mr-3 text-blue-400 flex-shrink-0" />
                    <span>Accessibility compliance (WCAG)</span>
                  </li>
                  <li className="flex items-start">
                    <Building className="w-4 h-4 mt-1 mr-3 text-blue-400 flex-shrink-0" />
                    <span>Multi-language support requirements</span>
                  </li>
                  <li className="flex items-start">
                    <Building className="w-4 h-4 mt-1 mr-3 text-blue-400 flex-shrink-0" />
                    <span>Disaster recovery and continuity</span>
                  </li>
                  <li className="flex items-start">
                    <Building className="w-4 h-4 mt-1 mr-3 text-blue-400 flex-shrink-0" />
                    <span>Audit trails and reporting</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-white/5 backdrop-blur-sm rounded-3xl p-12 border border-white/10">
          <h2 className="text-3xl font-bold mb-6">Serve Your Citizens Better</h2>
          <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
            Join government agencies already using Bakame AI to provide accessible, secure, and reliable services to all citizens.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => navigate('/signup')}
              className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-green-600 hover:to-blue-600 transition-all duration-300 hover:scale-105"
            >
              Request Pilot Program
            </button>
            <button className="border border-white/30 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/10 transition-all duration-300 hover:scale-105">
              Government Demo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GovernmentSolution;
