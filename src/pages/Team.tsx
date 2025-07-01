
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";
import { MapPin, Clock, ArrowRight, Users, Lightbulb, Heart, Target } from "lucide-react";

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
    },
    {
      title: "Product Manager - AI Solutions",
      team: "Product",
      location: "New York, NY",
      type: "Full-time",
      description: "Drive product strategy for our innovative offline IVR systems. Shape the future of communication technology and make it accessible to everyone, everywhere.",
    },
    {
      title: "Machine Learning Research Scientist",
      team: "Research",
      location: "Remote",
      type: "Full-time",
      description: "Conduct groundbreaking research in offline AI communication. Publish papers and contribute to the advancement of accessible AI technology.",
    },
    {
      title: "UX Designer",
      team: "Design",
      location: "Austin, TX",
      type: "Full-time",
      description: "Design intuitive interfaces for complex AI systems. Create user experiences that make advanced technology accessible to users with varying technical backgrounds.",
    },
    {
      title: "DevOps Engineer",
      team: "Engineering",
      location: "Remote",
      type: "Full-time",
      description: "Build and maintain the infrastructure that powers our AI systems. Ensure scalability, reliability, and security of our offline communication platforms.",
    },
    {
      title: "AI Research Intern",
      team: "Research",
      location: "Remote",
      type: "Internship",
      description: "Contribute to groundbreaking research in offline AI communication. Perfect for students passionate about AI innovation and social impact.",
    }
  ];

  const values = [
    {
      icon: Heart,
      title: "Impact-driven",
      description: "We're building technology that connects people regardless of infrastructure limitations."
    },
    {
      icon: Users,
      title: "Collaborative",
      description: "We believe diverse perspectives drive innovation and build truly accessible solutions."
    },
    {
      icon: Lightbulb,
      title: "Curious",
      description: "We invest in continuous learning through research, conferences, and dedicated innovation time."
    },
    {
      icon: Target,
      title: "Excellence",
      description: "We maintain the highest standards in everything we do, from code quality to user experience."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navigation */}
      <nav className="flex justify-between items-center p-6 md:p-8 border-b border-gray-800">
        <div className="text-2xl font-bold text-white">Bakame AI</div>
        <div className="hidden md:flex space-x-8">
          <a href="/" className="text-gray-300 hover:text-white transition-colors">Home</a>
          <a href="/blog" className="text-gray-300 hover:text-white transition-colors">Blog</a>
          <a href="/resources" className="text-gray-300 hover:text-white transition-colors">Resources</a>
          <a href="/team" className="text-white font-medium border-b-2 border-blue-500">Careers</a>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Hero Section */}
        <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white leading-tight">
            Join us in building the future of communication
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Help us create AI-powered communication systems that work everywhere, 
            for everyone, regardless of infrastructure limitations.
          </p>
        </div>

        {/* Values Section */}
        <div className={`mb-20 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <h2 className="text-3xl font-bold mb-12 text-white">Our values</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="flex items-start space-x-4">
                  <div className="bg-blue-600/20 p-3 rounded-lg">
                    <Icon className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">{value.title}</h3>
                    <p className="text-gray-300 leading-relaxed">{value.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Benefits Section */}
        <div className={`mb-20 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <h2 className="text-3xl font-bold mb-12 text-white">Benefits & perks</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-white mb-2">Health & wellness</h3>
                <p className="text-gray-300">Comprehensive medical, dental, and vision coverage</p>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">Learning & development</h3>
                <p className="text-gray-300">$3,000 annual budget for conferences and courses</p>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">Innovation time</h3>
                <p className="text-gray-300">20% time for personal projects and research</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-white mb-2">Flexible work</h3>
                <p className="text-gray-300">Remote-first with flexible hours</p>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">Equipment</h3>
                <p className="text-gray-300">Top-tier equipment plus home office setup</p>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">Team events</h3>
                <p className="text-gray-300">Quarterly gatherings and annual retreats</p>
              </div>
            </div>
          </div>
        </div>

        {/* Job Listings */}
        <div className={`mb-20 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <h2 className="text-3xl font-bold mb-12 text-white">Open roles</h2>
          <div className="space-y-6">
            {jobListings.map((job, index) => (
              <div key={index} className="border border-gray-700 bg-gray-800/50 rounded-lg p-8 hover:border-gray-600 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">{job.title}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-300">
                      <span className="bg-gray-700 px-3 py-1 rounded-full">{job.team}</span>
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
                    className="group border-gray-600 bg-transparent text-white hover:bg-gray-700"
                    onClick={() => {
                      setFormData({ ...formData, position: job.title });
                      document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    Apply
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
                <p className="text-gray-300 leading-relaxed">{job.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Application Form */}
        <div id="application-form" className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4 text-white">Apply to Bakame AI</h2>
              <p className="text-gray-300">
                Don't see a role that fits? We're always looking for exceptional talent.
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white font-medium">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="border-gray-600 bg-gray-800 text-white focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Enter your full name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white font-medium">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="border-gray-600 bg-gray-800 text-white focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="position" className="text-white font-medium">Position of Interest</Label>
                  <Input
                    id="position"
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                    required
                    className="border-gray-600 bg-gray-800 text-white focus:border-blue-500 focus:ring-blue-500"
                    placeholder="e.g., Senior AI Engineer"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="experience" className="text-white font-medium">Years of Experience</Label>
                  <Input
                    id="experience"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    required
                    className="border-gray-600 bg-gray-800 text-white focus:border-blue-500 focus:ring-blue-500"
                    placeholder="e.g., 3-5 years"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="resume" className="text-white font-medium">Resume/Portfolio Link</Label>
                <Input
                  id="resume"
                  name="resume"
                  type="url"
                  value={formData.resume}
                  onChange={handleChange}
                  className="border-gray-600 bg-gray-800 text-white focus:border-blue-500 focus:ring-blue-500"
                  placeholder="https://your-portfolio.com or LinkedIn profile"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-white font-medium">Why do you want to join Bakame AI?</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="border-gray-600 bg-gray-800 text-white focus:border-blue-500 focus:ring-blue-500 resize-none"
                  placeholder="Tell us what excites you about our mission and how you'd contribute to our team..."
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors"
              >
                Submit Application
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-12">
        <div className="max-w-4xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <div className="text-xl font-bold text-white mb-4 md:mb-0">Bakame AI</div>
          <div className="flex space-x-8 text-gray-300">
            <a href="/" className="hover:text-white transition-colors">Home</a>
            <a href="/blog" className="hover:text-white transition-colors">Blog</a>
            <a href="/resources" className="hover:text-white transition-colors">Resources</a>
            <a href="/team" className="hover:text-white transition-colors">Careers</a>
          </div>
        </div>
        <div className="max-w-4xl mx-auto px-6 mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; 2024 Bakame AI. Revolutionizing communication through intelligent offline IVR systems.</p>
        </div>
      </footer>
    </div>
  );
};

export default Careers;
