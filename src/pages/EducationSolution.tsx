
import { useNavigate } from "react-router-dom";
import { ArrowLeft, BookOpen, Users, Wifi, WifiOff } from "lucide-react";

const EducationSolution = () => {
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
          <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <BookOpen className="w-8 h-8 text-blue-400" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Education Solutions
          </h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Empowering educational institutions with offline-first IVR systems that work in any environment, from remote villages to urban campuses.
          </p>
        </div>

        {/* How It Works Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-12 text-center">How Bakame AI Works for Education</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
                <WifiOff className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Offline-First Design</h3>
              <p className="text-white/70">
                Works completely offline, perfect for schools in remote areas with limited internet connectivity. All processing happens locally on the device.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Multi-Language Support</h3>
              <p className="text-white/70">
                Built-in support for Kinyarwanda, English, French, and Swahili, making education accessible to students in their native languages.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Interactive Learning</h3>
              <p className="text-white/70">
                Students can access course materials, submit assignments, and receive feedback through voice interactions, even without smartphones.
              </p>
            </div>
          </div>
        </div>

        {/* Use Cases Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-12 text-center">Educational Use Cases</h2>
          <div className="space-y-8">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
              <h3 className="text-2xl font-semibold mb-4 text-blue-400">Remote Learning Support</h3>
              <p className="text-white/70 mb-4">
                Students in rural areas can access lectures, participate in discussions, and complete assignments using basic phones. 
                The system works entirely offline, storing content locally and syncing when connectivity is available.
              </p>
              <ul className="list-disc list-inside text-white/60 space-y-2">
                <li>Voice-based course delivery</li>
                <li>Assignment submission via voice</li>
                <li>Progress tracking without internet</li>
              </ul>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
              <h3 className="text-2xl font-semibold mb-4 text-purple-400">Language Learning</h3>
              <p className="text-white/70 mb-4">
                Interactive language learning programs that help students practice pronunciation, vocabulary, and conversation skills 
                in multiple languages, with AI-powered feedback and corrections.
              </p>
              <ul className="list-disc list-inside text-white/60 space-y-2">
                <li>Pronunciation practice and correction</li>
                <li>Vocabulary building exercises</li>
                <li>Conversational AI tutoring</li>
              </ul>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
              <h3 className="text-2xl font-semibold mb-4 text-green-400">Administrative Services</h3>
              <p className="text-white/70 mb-4">
                Automated systems for student enrollment, grade inquiries, schedule information, and parent-teacher communication, 
                all accessible through simple phone calls.
              </p>
              <ul className="list-disc list-inside text-white/60 space-y-2">
                <li>Student information systems</li>
                <li>Grade and attendance queries</li>
                <li>Parent communication portal</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-12 text-center">Key Benefits</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-blue-400">For Students</h3>
              <ul className="space-y-4 text-white/70">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>Access education from anywhere, even without internet</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>Learn in their native language</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>No need for expensive devices or data plans</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>Personalized learning experiences</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-purple-400">For Institutions</h3>
              <ul className="space-y-4 text-white/70">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>Reach students in remote areas</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>Reduce infrastructure costs</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>Automate administrative tasks</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>Improve student engagement and retention</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-white/5 backdrop-blur-sm rounded-3xl p-12 border border-white/10">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Education?</h2>
          <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
            Join schools and universities already using Bakame AI to provide accessible, offline education to their students.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => navigate('/signup')}
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 hover:scale-105"
            >
              Get Started Today
            </button>
            <button className="border border-white/30 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/10 transition-all duration-300 hover:scale-105">
              Schedule Demo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationSolution;
