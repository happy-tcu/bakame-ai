
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";
import { MapPin, Clock, DollarSign, Heart, Zap, Target, Globe, Users, Coffee, Lightbulb, Award } from "lucide-react";
import "../styles/animations.css";

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
      department: "Engineering",
      location: "San Francisco, CA / Remote",
      type: "Full-time",
      salary: "$140k - $180k",
      description: "Lead the development of our offline AI communication systems. Work with cutting-edge technology to revolutionize how people communicate without traditional infrastructure.",
      requirements: ["5+ years in AI/ML engineering", "Python, TensorFlow/PyTorch", "Experience with NLP models", "Strong problem-solving skills", "Experience with distributed systems"]
    },
    {
      title: "Product Manager - AI Solutions",
      department: "Product",
      location: "New York, NY / Remote",
      type: "Full-time",
      salary: "$120k - $160k",
      description: "Drive product strategy for our innovative offline IVR systems. Shape the future of communication technology and make it accessible to everyone, everywhere.",
      requirements: ["3+ years product management", "AI/tech product experience", "Strong analytical skills", "Excellent communication", "Experience with B2B/B2G products"]
    },
    {
      title: "UX/UI Designer",
      department: "Design",
      location: "Austin, TX / Remote",
      type: "Full-time",
      salary: "$90k - $130k",
      description: "Design intuitive interfaces for complex AI systems. Create user experiences that make advanced technology accessible to users with varying technical backgrounds.",
      requirements: ["4+ years UX/UI design", "Figma, Adobe Creative Suite", "Experience with complex systems", "Portfolio required", "Accessibility design knowledge"]
    },
    {
      title: "AI Research Scientist",
      department: "Research",
      location: "Remote",
      type: "Full-time",
      salary: "$160k - $200k",
      description: "Conduct groundbreaking research in offline AI communication. Publish papers and contribute to the advancement of accessible AI technology.",
      requirements: ["PhD in CS/AI/ML", "Published research papers", "Python, PyTorch/TensorFlow", "Strong mathematical background", "Experience with NLP/Speech processing"]
    },
    {
      title: "DevOps Engineer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      salary: "$110k - $150k",
      description: "Build and maintain the infrastructure that powers our AI systems. Ensure scalability, reliability, and security of our offline communication platforms.",
      requirements: ["3+ years DevOps experience", "AWS/GCP/Azure", "Docker, Kubernetes", "CI/CD pipelines", "Infrastructure as Code"]
    },
    {
      title: "AI Research Intern",
      department: "Research",
      location: "Remote",
      type: "Internship",
      salary: "$25/hour",
      description: "Contribute to groundbreaking research in offline AI communication. Perfect for students passionate about AI innovation and social impact.",
      requirements: ["Currently pursuing CS/AI degree", "Python programming", "Machine learning fundamentals", "Research experience preferred", "Strong academic record"]
    }
  ];

  const companyValues = [
    { 
      icon: Heart, 
      title: "Impact First", 
      description: "We're building technology that connects people regardless of infrastructure limitations. Every line of code serves a greater purpose." 
    },
    { 
      icon: Users, 
      title: "Inclusive Innovation", 
      description: "Diversity drives innovation. We welcome perspectives from all backgrounds to build truly accessible solutions." 
    },
    { 
      icon: Lightbulb, 
      title: "Continuous Learning", 
      description: "The AI field evolves rapidly. We invest in our team's growth through conferences, courses, and research time." 
    },
    { 
      icon: Award, 
      title: "Excellence & Quality", 
      description: "We maintain the highest standards in everything we do, from code quality to user experience." 
    }
  ];

  const perks = [
    { icon: Heart, title: "Health & Wellness", description: "Comprehensive health, dental, vision, and mental health coverage" },
    { icon: Zap, title: "Innovation Time", description: "20% time for personal projects and research initiatives" },
    { icon: Target, title: "Learning Budget", description: "$3,000 annual budget for conferences, courses, and certifications" },
    { icon: Globe, title: "Remote Flexibility", description: "Work from anywhere with flexible hours and timezone support" },
    { icon: Coffee, title: "Equipment & Setup", description: "Top-tier equipment plus $1,000 home office setup allowance" },
    { icon: Users, title: "Team Retreats", description: "Quarterly team gatherings and annual company retreat" }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}  
      <nav className="relative z-20 flex justify-between items-center p-6 md:p-8">
        <div className="text-2xl font-bold">Bakame Ai</div>
        <div className="hidden md:flex space-x-8">
          <a href="/" className="text-white/70 hover:text-white transition-colors">Home</a>
          <a href="/blog" className="text-white/70 hover:text-white transition-colors">Blog</a>
          <a href="/resources" className="text-white/70 hover:text-white transition-colors">Resources</a>
          <a href="/team" className="text-white hover:text-white transition-colors border-b-2 border-blue-400">Careers</a>
        </div>
      </nav>

      <div className="relative z-10">
        {/* Hero Section */}
        <div className="container mx-auto px-6 py-20">
          <div className="max-w-6xl mx-auto">
            <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
                Build the Future of Communication
              </h1>
              <p className="text-xl text-white/70 max-w-3xl mx-auto mb-8">
                Join our mission to make AI-powered communication accessible to everyone, everywhere. 
                Help us create technology that works without traditional infrastructure limitations.
              </p>
              <div className="mt-8 w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
            </div>

            {/* Company Values */}
            <div className={`mb-20 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
              <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                Our Values
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {companyValues.map((value, index) => {
                  const Icon = value.icon;
                  return (
                    <Card key={index} className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300">
                      <CardContent className="p-6 text-center">
                        <Icon className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-white mb-3">{value.title}</h3>
                        <p className="text-white/70 text-sm leading-relaxed">{value.description}</p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* Benefits & Perks */}
            <div className={`mb-20 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
              <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                Why Join Bakame AI?
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {perks.map((perk, index) => {
                  const Icon = perk.icon;
                  return (
                    <Card key={index} className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <Icon className="w-8 h-8 text-blue-400 mt-1 flex-shrink-0" />
                          <div>
                            <h3 className="text-lg font-semibold text-white mb-2">{perk.title}</h3>
                            <p className="text-white/70 text-sm">{perk.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* Job Listings */}
            <div className={`mb-20 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
              <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                Open Positions
              </h2>
              <div className="space-y-6">
                {jobListings.map((job, index) => (
                  <Card key={index} className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300">
                    <CardContent className="p-8">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                        <div className="mb-4 lg:mb-0">
                          <h3 className="text-2xl font-bold text-white mb-2">{job.title}</h3>
                          <div className="flex flex-wrap gap-3">
                            <Badge variant="secondary" className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                              {job.department}
                            </Badge>
                            <div className="flex items-center text-white/70 text-sm">
                              <MapPin className="w-4 h-4 mr-1" />
                              {job.location}
                            </div>
                            <div className="flex items-center text-white/70 text-sm">
                              <Clock className="w-4 h-4 mr-1" />
                              {job.type}
                            </div>
                            <div className="flex items-center text-white/70 text-sm">
                              <DollarSign className="w-4 h-4 mr-1" />
                              {job.salary}
                            </div>
                          </div>
                        </div>
                        <Button 
                          className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold px-6 py-2 rounded-full transition-all duration-300 hover:scale-105"
                          onClick={() => {
                            setFormData({ ...formData, position: job.title });
                            document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' });
                          }}
                        >
                          Apply Now
                        </Button>
                      </div>
                      <p className="text-white/80 mb-4 leading-relaxed">{job.description}</p>
                      <div>
                        <h4 className="text-white font-semibold mb-2">Requirements:</h4>
                        <ul className="text-white/70 space-y-1">
                          {job.requirements.map((req, reqIndex) => (
                            <li key={reqIndex} className="flex items-start">
                              <span className="text-blue-400 mr-2">•</span>
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Application Form */}
            <div id="application-form" className={`transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300 relative overflow-hidden">
                {/* Animated background elements */}
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
                  <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                </div>
                
                <CardHeader className="relative z-10 text-center">
                  <CardTitle className="text-3xl text-white mb-4">
                    Ready to Make an Impact?
                  </CardTitle>
                  <p className="text-white/70">
                    Send us your application and let's revolutionize communication together
                  </p>
                </CardHeader>
                <CardContent className="relative z-10">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-white">Full Name</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-blue-400 transition-colors"
                          placeholder="Enter your full name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-white">Email Address</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-blue-400 transition-colors"
                          placeholder="Enter your email"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="position" className="text-white">Position of Interest</Label>
                        <Input
                          id="position"
                          name="position"
                          value={formData.position}
                          onChange={handleChange}
                          required
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-blue-400 transition-colors"
                          placeholder="e.g., Senior AI Engineer"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="experience" className="text-white">Years of Experience</Label>
                        <Input
                          id="experience"
                          name="experience"
                          value={formData.experience}
                          onChange={handleChange}
                          required
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-blue-400 transition-colors"
                          placeholder="e.g., 3-5 years"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="resume" className="text-white">Resume/Portfolio Link</Label>
                      <Input
                        id="resume"
                        name="resume"
                        type="url"
                        value={formData.resume}
                        onChange={handleChange}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-blue-400 transition-colors"
                        placeholder="https://your-portfolio.com or LinkedIn profile"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-white">Why do you want to join Bakame AI?</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={4}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-blue-400 transition-colors resize-none"
                        placeholder="Tell us what excites you about our mission and how you'd contribute to our team..."
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-3 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
                    >
                      Submit Application
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="container mx-auto px-6 py-12 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-2xl font-bold mb-4 md:mb-0">Bakame Ai</div>
            <div className="flex space-x-8 text-white/70">
              <a href="/" className="hover:text-white transition-colors">Home</a>
              <a href="/blog" className="hover:text-white transition-colors">Blog</a>
              <a href="/resources" className="hover:text-white transition-colors">Resources</a>
              <a href="/team" className="hover:text-white transition-colors">Careers</a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-white/10 text-center text-white/50">
            <p>&copy; 2024 Bakame Ai. Revolutionizing communication through intelligent offline IVR systems.</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Careers;
