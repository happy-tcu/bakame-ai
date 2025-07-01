
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";
import { MapPin, Clock, ArrowRight, Users, Lightbulb, Heart, Target, Sparkles, Building, Globe } from "lucide-react";

const Careers = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    position: "",
    experience: "",
    resume: "",
    message: ""
  });

  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Application submitted:", formData);
    toast({
      title: "Application Submitted!",
      description: "Thank you for your interest. We'll be in touch within 48 hours.",
    });
    setFormData({
      name: "",
      email: "",
      position: "",
      experience: "",
      resume: "",
      message: ""
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const jobListings = [
    {
      title: "Senior AI Engineer",
      team: "Engineering",
      location: "San Francisco, CA",
      type: "Full-time",
      description: "Lead the development of our offline AI communication systems and work with cutting-edge technology to revolutionize how people communicate without traditional infrastructure.",
      isNew: true,
    },
    {
      title: "Product Manager - AI Solutions",
      team: "Product",
      location: "New York, NY",
      type: "Full-time",
      description: "Drive product strategy for our innovative offline IVR systems. Shape the future of communication technology and make it accessible to everyone, everywhere.",
      isNew: false,
    },
    {
      title: "Machine Learning Research Scientist",
      team: "Research",
      location: "Remote",
      type: "Full-time",
      description: "Conduct groundbreaking research in offline AI communication. Publish papers and contribute to the advancement of accessible AI technology.",
      isNew: true,
    },
    {
      title: "UX Designer",
      team: "Design",
      location: "Austin, TX",
      type: "Full-time",
      description: "Design intuitive interfaces for complex AI systems. Create user experiences that make advanced technology accessible to users with varying technical backgrounds.",
      isNew: false,
    },
    {
      title: "DevOps Engineer",
      team: "Engineering",
      location: "Remote",
      type: "Full-time",
      description: "Build and maintain the infrastructure that powers our AI systems. Ensure scalability, reliability, and security of our offline communication platforms.",
      isNew: false,
    },
    {
      title: "AI Research Intern",
      team: "Research",
      location: "Remote",
      type: "Internship",
      description: "Contribute to groundbreaking research in offline AI communication. Perfect for students passionate about AI innovation and social impact.",
      isNew: true,
    }
  ];

  const values = [
    {
      icon: Heart,
      title: "Impact-driven",
      description: "We're building technology that connects people regardless of infrastructure limitations.",
      color: "text-red-500"
    },
    {
      icon: Users,
      title: "Collaborative",
      description: "We believe diverse perspectives drive innovation and build truly accessible solutions.",
      color: "text-blue-500"
    },
    {
      icon: Lightbulb,
      title: "Curious",
      description: "We invest in continuous learning through research, conferences, and dedicated innovation time.",
      color: "text-yellow-500"
    },
    {
      icon: Target,
      title: "Excellence",
      description: "We maintain the highest standards in everything we do, from code quality to user experience.",
      color: "text-green-500"
    }
  ];

  const stats = [
    { number: "50+", label: "Team Members", icon: Users },
    { number: "15+", label: "Countries", icon: Globe },
    { number: "3", label: "Offices", icon: Building },
    { number: "100%", label: "Remote-First", icon: Sparkles }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="flex justify-between items-center p-6 md:p-8 bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50">
        <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Bakame AI
        </div>
        <div className="hidden md:flex space-x-8">
          <a href="/" className="text-gray-600 hover:text-blue-600 transition-colors">Home</a>
          <a href="/blog" className="text-gray-600 hover:text-blue-600 transition-colors">Blog</a>
          <a href="/resources" className="text-gray-600 hover:text-blue-600 transition-colors">Resources</a>
          <a href="/team" className="text-blue-600 font-medium">Careers</a>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Hero Section */}
        <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4 mr-2" />
            We're hiring amazing people
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent leading-tight">
            Join us in building the
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              future of communication
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Help us create AI-powered communication systems that work everywhere, 
            for everyone, regardless of infrastructure limitations.
          </p>
        </div>

        {/* Stats Section */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-8 mb-20 transition-all duration-1000 delay-100 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="text-center group">
                <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                  <Icon className="w-8 h-8 mx-auto mb-3 text-blue-600 group-hover:scale-110 transition-transform" />
                  <div className="text-3xl font-bold text-gray-900 mb-1">{stat.number}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Values Section */}
        <div className={`mb-20 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our values</h2>
            <p className="text-xl text-gray-600">The principles that guide everything we do</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="group">
                  <div className="bg-white/70 backdrop-blur-sm p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100/50">
                    <div className="flex items-start space-x-6">
                      <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-4 rounded-xl group-hover:scale-110 transition-transform">
                        <Icon className={`w-8 h-8 ${value.color}`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                        <p className="text-gray-600 leading-relaxed">{value.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Benefits Section */}
        <div className={`mb-20 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Benefits & perks</h2>
            <p className="text-xl text-gray-600">We invest in our people's growth and well-being</p>
          </div>
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-sm border border-gray-100/50">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { title: "Health & wellness", desc: "Comprehensive medical, dental, and vision coverage", icon: "🏥" },
                { title: "Learning & development", desc: "$3,000 annual budget for conferences and courses", icon: "📚" },
                { title: "Innovation time", desc: "20% time for personal projects and research", icon: "💡" },
                { title: "Flexible work", desc: "Remote-first with flexible hours", icon: "🌍" },
                { title: "Equipment", desc: "Top-tier equipment plus home office setup", icon: "💻" },
                { title: "Team events", desc: "Quarterly gatherings and annual retreats", icon: "🎉" },
              ].map((benefit, index) => (
                <div key={index} className="text-center group">
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{benefit.icon}</div>
                  <h3 className="font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{benefit.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Job Listings */}
        <div className={`mb-20 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Open roles</h2>
            <p className="text-xl text-gray-600">Find your next opportunity with us</p>
          </div>
          <div className="space-y-6">
            {jobListings.map((job, index) => (
              <div 
                key={index} 
                className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100/50 group"
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <div className="flex items-center mb-3">
                      <h3 className="text-2xl font-semibold text-gray-900 mr-3">{job.title}</h3>
                      {job.isNew && (
                        <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                          New
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center space-x-6 text-gray-600 mb-4">
                      <span className="bg-gray-100 px-3 py-1 rounded-full text-sm font-medium">{job.team}</span>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {job.location}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {job.type}
                      </div>
                    </div>
                  </div>
                  <Button 
                    variant="outline"
                    className={`group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 ${hoveredCard === index ? 'scale-105' : ''}`}
                    onClick={() => {
                      setFormData({ ...formData, position: job.title });
                      document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    Apply
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
                <p className="text-gray-600 leading-relaxed text-lg">{job.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Application Form */}
        <div id="application-form" className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-12 border border-gray-100/50">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent">
                Apply to Bakame AI
              </h2>
              <p className="text-xl text-gray-600">
                Don't see a role that fits? We're always looking for exceptional talent.
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="name" className="text-gray-900 font-medium text-lg">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500 bg-white/80 backdrop-blur-sm"
                    placeholder="Enter your full name"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="email" className="text-gray-900 font-medium text-lg">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500 bg-white/80 backdrop-blur-sm"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="position" className="text-gray-900 font-medium text-lg">Position of Interest</Label>
                  <Input
                    id="position"
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                    required
                    className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500 bg-white/80 backdrop-blur-sm"
                    placeholder="e.g., Senior AI Engineer"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="experience" className="text-gray-900 font-medium text-lg">Years of Experience</Label>
                  <Input
                    id="experience"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    required
                    className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500 bg-white/80 backdrop-blur-sm"
                    placeholder="e.g., 3-5 years"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="resume" className="text-gray-900 font-medium text-lg">Resume/Portfolio Link</Label>
                <Input
                  id="resume"
                  name="resume"
                  type="url"
                  value={formData.resume}
                  onChange={handleChange}
                  className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500 bg-white/80 backdrop-blur-sm"
                  placeholder="https://your-portfolio.com or LinkedIn profile"
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="message" className="text-gray-900 font-medium text-lg">Why do you want to join Bakame AI?</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 resize-none bg-white/80 backdrop-blur-sm"
                  placeholder="Tell us what excites you about our mission and how you'd contribute to our team..."
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-4 rounded-xl transition-all duration-300 hover:scale-105 text-lg"
              >
                Submit Application
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-md border-t border-gray-200/50 py-12">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <div className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4 md:mb-0">
            Bakame AI
          </div>
          <div className="flex space-x-8 text-gray-600">
            <a href="/" className="hover:text-blue-600 transition-colors">Home</a>
            <a href="/blog" className="hover:text-blue-600 transition-colors">Blog</a>
            <a href="/resources" className="hover:text-blue-600 transition-colors">Resources</a>
            <a href="/team" className="hover:text-blue-600 transition-colors">Careers</a>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-6 mt-8 pt-8 border-t border-gray-200/50 text-center text-gray-500">
          <p>&copy; 2024 Bakame AI. Revolutionizing communication through intelligent offline IVR systems.</p>
        </div>
      </footer>
    </div>
  );
};

export default Careers;
