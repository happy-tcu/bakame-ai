
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";

const Team = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    position: "",
    experience: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log("Form submitted:", formData);
    toast({
      title: "Application Submitted!",
      description: "Thank you for your interest. We'll be in touch soon.",
    });
    // Reset form
    setFormData({
      name: "",
      email: "",
      position: "",
      experience: "",
      message: ""
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}  
      <nav className="relative z-20 flex justify-between items-center p-6 md:p-8">
        <div className="text-2xl font-bold">Bakame Ai</div>
        <div className="hidden md:flex space-x-8">
          <a href="/" className="text-white/70 hover:text-white transition-colors">Home</a>
          <a href="/blog" className="text-white/70 hover:text-white transition-colors">Blog</a>
          <a href="/resources" className="text-white/70 hover:text-white transition-colors">Resources</a>
          <a href="/team" className="text-white hover:text-white transition-colors border-b-2 border-blue-400">Team</a>
          <a href="/admin" className="text-white/70 hover:text-white transition-colors">Admin</a>
        </div>
      </nav>

      <div className="relative z-10">
        {/* Leadership Team Section */}
        <div className="container mx-auto px-6 py-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                Leadership Team
              </h1>
              <p className="text-xl text-white/70 max-w-3xl mx-auto">
                Meet the visionary leaders driving innovation in offline AI and communication technology
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
              {[
                {
                  name: "Dr. Sarah Uwimana",
                  title: "Chief Executive Officer",
                  bio: "Former AI researcher at MIT with 15+ years in natural language processing and offline systems.",
                  image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop&crop=face"
                },
                {
                  name: "Jean-Claude Niyonsenga",
                  title: "Chief Technology Officer",
                  bio: "Expert in telecommunications infrastructure with deep experience in IVR systems across Africa.",
                  image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=400&fit=crop&crop=face"
                },
                {
                  name: "Dr. Aisha Mukamana",
                  title: "Head of Research",
                  bio: "Leading linguist specializing in Kinyarwanda language modeling and AI dataset development.",
                  image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=400&fit=crop&crop=face"
                },
                {
                  name: "Emmanuel Habimana",
                  title: "VP of Engineering",
                  bio: "Former Google engineer with expertise in scalable offline-first systems and edge computing.",
                  image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=400&fit=crop&crop=face"
                },
                {
                  name: "Grace Nyirahabimana",
                  title: "VP of Operations",
                  bio: "Operations leader with 12+ years scaling technology solutions across emerging markets.",
                  image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=400&fit=crop&crop=face"
                },
                {
                  name: "Patrick Nsengimana",
                  title: "Head of Partnerships",
                  bio: "Former World Bank advisor specializing in public-private partnerships for technology adoption.",
                  image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=400&fit=crop&crop=face"
                }
              ].map((leader, index) => (
                <div
                  key={index}
                  className="group bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105"
                >
                  <div className="mb-6">
                    <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-2 border-white/20 group-hover:border-white/40 transition-colors">
                      <img
                        src={leader.image}
                        alt={leader.name}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                      />
                    </div>
                    <h3 className="text-xl font-semibold text-white text-center mb-2">
                      {leader.name}
                    </h3>
                    <p className="text-blue-400 font-medium text-center mb-4">
                      {leader.title}
                    </p>
                  </div>
                  <p className="text-white/70 text-sm leading-relaxed text-center">
                    {leader.bio}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Join Our Team Section */}
        <div className="container mx-auto px-6 py-20">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                Join Our Diverse Team
              </h2>
              <p className="text-xl text-white/70 max-w-3xl mx-auto">
                We're always looking for passionate individuals who share our vision of revolutionizing communication through offline AI technology.
              </p>
            </div>

            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardHeader>
                <CardTitle className="text-2xl text-white text-center">
                  Career Application
                </CardTitle>
              </CardHeader>
              <CardContent>
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
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
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
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="position" className="text-white">Position of Interest</Label>
                    <Input
                      id="position"
                      name="position"
                      value={formData.position}
                      onChange={handleChange}
                      required
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                      placeholder="e.g., Software Engineer, AI Researcher, Product Manager"
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
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                      placeholder="e.g., 3-5 years"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-white">Tell us about yourself</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                      placeholder="Why are you interested in joining our team? What unique skills and perspective would you bring?"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-3 rounded-full transition-all duration-300 hover:scale-105"
                  >
                    Submit Application
                  </Button>
                </form>
              </CardContent>
            </Card>
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
              <a href="/team" className="hover:text-white transition-colors">Team</a>
              <a href="/admin" className="hover:text-white transition-colors">Admin</a>
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

export default Team;
