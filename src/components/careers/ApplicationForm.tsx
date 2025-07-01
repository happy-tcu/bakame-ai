
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";

interface ApplicationFormProps {
  initialPosition?: string;
}

const ApplicationForm = ({ initialPosition = "" }: ApplicationFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    position: initialPosition,
    experience: "",
    resume: "",
    message: ""
  });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setFormData(prev => ({ ...prev, position: initialPosition }));
  }, [initialPosition]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Application submitted:", formData);
    toast({
      title: "Application Submitted!",
      description: "Thank you for your interest. We'll be in touch within 48 hours."
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

  return (
    <div id="application-form" className={`transition-all duration-700 ease-out delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      <div className="bg-gray-800/30 border border-gray-700/50 rounded-lg p-8 hover:bg-gray-800/40 hover:border-gray-600/50 transition-all duration-300">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4 text-white">Apply to Bakame AI</h2>
          <p className="text-gray-300">
            Don't see a role that fits? We're always looking for exceptional talent.
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 group">
              <Label htmlFor="name" className="text-white font-medium group-focus-within:text-blue-400 transition-colors">
                Full Name
              </Label>
              <Input 
                id="name" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                required 
                className="border-gray-600 bg-gray-800/50 text-white focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-200" 
                placeholder="Enter your full name" 
              />
            </div>
            <div className="space-y-2 group">
              <Label htmlFor="email" className="text-white font-medium group-focus-within:text-blue-400 transition-colors">
                Email Address
              </Label>
              <Input 
                id="email" 
                name="email" 
                type="email" 
                value={formData.email} 
                onChange={handleChange} 
                required 
                className="border-gray-600 bg-gray-800/50 text-white focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-200" 
                placeholder="Enter your email" 
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 group">
              <Label htmlFor="position" className="text-white font-medium group-focus-within:text-blue-400 transition-colors">
                Position of Interest
              </Label>
              <Input 
                id="position" 
                name="position" 
                value={formData.position} 
                onChange={handleChange} 
                required 
                className="border-gray-600 bg-gray-800/50 text-white focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-200" 
                placeholder="e.g., Senior AI Engineer" 
              />
            </div>
            <div className="space-y-2 group">
              <Label htmlFor="experience" className="text-white font-medium group-focus-within:text-blue-400 transition-colors">
                Years of Experience
              </Label>
              <Input 
                id="experience" 
                name="experience" 
                value={formData.experience} 
                onChange={handleChange} 
                required 
                className="border-gray-600 bg-gray-800/50 text-white focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-200" 
                placeholder="e.g., 3-5 years" 
              />
            </div>
          </div>

          <div className="space-y-2 group">
            <Label htmlFor="resume" className="text-white font-medium group-focus-within:text-blue-400 transition-colors">
              Resume/Portfolio Link
            </Label>
            <Input 
              id="resume" 
              name="resume" 
              type="url" 
              value={formData.resume} 
              onChange={handleChange} 
              className="border-gray-600 bg-gray-800/50 text-white focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-200" 
              placeholder="https://your-portfolio.com or LinkedIn profile" 
            />
          </div>

          <div className="space-y-2 group">
            <Label htmlFor="message" className="text-white font-medium group-focus-within:text-blue-400 transition-colors">
              Why do you want to join Bakame AI?
            </Label>
            <Textarea 
              id="message" 
              name="message" 
              value={formData.message} 
              onChange={handleChange} 
              required 
              rows={4} 
              className="border-gray-600 bg-gray-800/50 text-white focus:border-blue-500 focus:ring-blue-500/20 resize-none transition-all duration-200" 
              placeholder="Tell us what excites you about our mission and how you'd contribute to our team..." 
            />
          </div>

          <Button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/20"
          >
            Submit Application
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ApplicationForm;
