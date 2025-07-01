
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const GovernmentDemo = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    organization: "",
    position: "",
    agencyType: "",
    citizenSize: "",
    currentSystems: "",
    primaryUseCase: "",
    timeline: "",
    budget: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('government_demo_requests')
        .insert([
          {
            first_name: formData.firstName,
            last_name: formData.lastName,
            email: formData.email,
            phone: formData.phone,
            organization: formData.organization,
            position: formData.position,
            agency_type: formData.agencyType,
            citizen_size: formData.citizenSize,
            current_systems: formData.currentSystems,
            primary_use_case: formData.primaryUseCase,
            timeline: formData.timeline,
            budget: formData.budget,
            status: 'pending'
          }
        ]);

      if (error) {
        console.error('Error submitting government demo request:', error);
        toast({
          title: "Error",
          description: "Failed to submit your demo request. Please try again.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Demo Request Submitted",
          description: "We'll contact you within 24 hours to schedule your government pilot program demo.",
        });
        
        // Reset form
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          organization: "",
          position: "",
          agencyType: "",
          citizenSize: "",
          currentSystems: "",
          primaryUseCase: "",
          timeline: "",
          budget: ""
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="flex justify-between items-center p-6 md:p-8 border-b border-white/10 animate-fade-in">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => navigate('/solutions/government')}
            className="p-2 hover:bg-white/10 rounded-lg transition-all duration-300 hover:scale-110"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="text-2xl font-bold">Bakame Ai</div>
        </div>
        <div className="hidden md:flex space-x-8">
          <a href="/blog" className="text-white/70 hover:text-white transition-all duration-300 hover:scale-105">Blog</a>
          <a href="/resources" className="text-white/70 hover:text-white transition-all duration-300 hover:scale-105">Resources</a>
          <a href="/team" className="text-white/70 hover:text-white transition-all duration-300 hover:scale-105">Team</a>
          <a href="/signup" className="text-white/70 hover:text-white transition-all duration-300 hover:scale-105">Sign In</a>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
              Request Government Pilot Program
            </h1>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Join forward-thinking government agencies already using Bakame AI to serve citizens better. 
              Fill out this form to schedule your personalized demo and pilot program.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Information */}
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-white">Contact Information</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="firstName" className="text-white">First Name *</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-white">Last Name *</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-white">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-white">Phone Number</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                    />
                  </div>
                </div>
              </div>

              {/* Organization Information */}
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-white">Organization Details</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="organization" className="text-white">Government Agency/Organization *</Label>
                    <Input
                      id="organization"
                      value={formData.organization}
                      onChange={(e) => handleInputChange("organization", e.target.value)}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="position" className="text-white">Your Position/Title *</Label>
                    <Input
                      id="position"
                      value={formData.position}
                      onChange={(e) => handleInputChange("position", e.target.value)}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                      required
                    />
                  </div>
                  <div>
                    <Label className="text-white">Agency Type *</Label>
                    <Select value={formData.agencyType} onValueChange={(value) => handleInputChange("agencyType", value)}>
                      <SelectTrigger className="bg-white/10 border-white/20 text-white">
                        <SelectValue placeholder="Select agency type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="federal">Federal Agency</SelectItem>
                        <SelectItem value="state">State Government</SelectItem>
                        <SelectItem value="local">Local Government</SelectItem>
                        <SelectItem value="municipal">Municipal</SelectItem>
                        <SelectItem value="county">County</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-white">Citizens Served</Label>
                    <Select value={formData.citizenSize} onValueChange={(value) => handleInputChange("citizenSize", value)}>
                      <SelectTrigger className="bg-white/10 border-white/20 text-white">
                        <SelectValue placeholder="Select population size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">Under 10,000</SelectItem>
                        <SelectItem value="medium">10,000 - 100,000</SelectItem>
                        <SelectItem value="large">100,000 - 1M</SelectItem>
                        <SelectItem value="xlarge">Over 1M</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Project Details */}
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-white">Project Requirements</h2>
                <div>
                  <Label className="text-white">Primary Use Case *</Label>
                  <RadioGroup 
                    value={formData.primaryUseCase} 
                    onValueChange={(value) => handleInputChange("primaryUseCase", value)}
                    className="mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="citizen-services" id="citizen-services" />
                      <Label htmlFor="citizen-services" className="text-white">Citizen Services & Support</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="emergency" id="emergency" />
                      <Label htmlFor="emergency" className="text-white">Emergency Response</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="internal" id="internal" />
                      <Label htmlFor="internal" className="text-white">Internal Operations</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="multilingual" id="multilingual" />
                      <Label htmlFor="multilingual" className="text-white">Multilingual Support</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="accessibility" id="accessibility" />
                      <Label htmlFor="accessibility" className="text-white">Accessibility Solutions</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-white">Implementation Timeline</Label>
                    <Select value={formData.timeline} onValueChange={(value) => handleInputChange("timeline", value)}>
                      <SelectTrigger className="bg-white/10 border-white/20 text-white">
                        <SelectValue placeholder="Select timeline" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="immediate">Immediate (1-3 months)</SelectItem>
                        <SelectItem value="short">Short-term (3-6 months)</SelectItem>
                        <SelectItem value="medium">Medium-term (6-12 months)</SelectItem>
                        <SelectItem value="long">Long-term (12+ months)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-white">Budget Range</Label>
                    <Select value={formData.budget} onValueChange={(value) => handleInputChange("budget", value)}>
                      <SelectTrigger className="bg-white/10 border-white/20 text-white">
                        <SelectValue placeholder="Select budget range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pilot">Pilot Program (Under $50K)</SelectItem>
                        <SelectItem value="small">Small Scale ($50K - $100K)</SelectItem>
                        <SelectItem value="medium">Medium Scale ($100K - $500K)</SelectItem>
                        <SelectItem value="large">Large Scale ($500K+)</SelectItem>
                        <SelectItem value="enterprise">Enterprise (Contact for pricing)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="currentSystems" className="text-white">Current Systems & Challenges</Label>
                  <textarea
                    id="currentSystems"
                    value={formData.currentSystems}
                    onChange={(e) => handleInputChange("currentSystems", e.target.value)}
                    className="w-full mt-2 p-3 bg-white/10 border border-white/20 rounded-md text-white placeholder:text-white/50 min-h-[100px]"
                    placeholder="Tell us about your current communication systems and the challenges you're facing..."
                  />
                </div>
              </div>

              <div className="flex justify-center pt-6">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-12 py-4 rounded-full font-semibold text-lg hover:from-green-600 hover:to-blue-600 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-green-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Submitting..." : "Submit Demo Request"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GovernmentDemo;
