import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, User, Building, Mail, Phone, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const DemoScheduling = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    role: "",
    useCase: "",
    preferredDate: "",
    preferredTime: "",
    requirements: ""
  });

  const useCases = [
    "Government Services",
    "Enterprise Customer Support", 
    "Educational Institution",
    "Healthcare Communication",
    "Emergency Response",
    "Multi-language Support",
    "Other"
  ];

  const timeSlots = [
    "9:00 AM - 10:00 AM",
    "10:00 AM - 11:00 AM", 
    "11:00 AM - 12:00 PM",
    "2:00 PM - 3:00 PM",
    "3:00 PM - 4:00 PM",
    "4:00 PM - 5:00 PM"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitted(true);
      toast({
        title: "Demo Scheduled Successfully!",
        description: "We'll send you a calendar invite within 15 minutes.",
      });
    }, 1000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="max-w-2xl mx-auto text-center p-8">
          <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Demo Scheduled Successfully!</h1>
          <p className="text-muted-foreground mb-8">
            Thank you for your interest in Bakame AI. We've received your demo request and will send you a calendar invite within 15 minutes.
          </p>
          <div className="bg-card border border-border rounded-lg p-6 mb-8">
            <h3 className="font-semibold mb-4">What to Expect:</h3>
            <ul className="text-left space-y-2 text-muted-foreground">
              <li>• 30-minute personalized demonstration</li>
              <li>• Live Q&A with our technical team</li>
              <li>• Custom use case discussion</li>
              <li>• Implementation timeline and pricing</li>
            </ul>
          </div>
          <Button onClick={() => navigate('/')} className="mr-4">
            Return Home
          </Button>
          <Button onClick={() => navigate('/pricing')} variant="outline">
            View Pricing
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="flex justify-between items-center p-6 md:p-8 border-b border-border">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => navigate('/')} 
            className="p-2 hover:bg-muted rounded-lg transition-all duration-300 hover:scale-110"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="text-2xl font-bold">Bakame AI</div>
        </div>
        <div className="hidden md:flex space-x-8">
          <button 
            onClick={() => navigate('/pricing')} 
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Pricing
          </button>
          <button 
            onClick={() => navigate('/enterprise-solution')} 
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Enterprise
          </button>
          <button 
            onClick={() => navigate('/contact')} 
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Contact
          </button>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Schedule Your Personalized Demo
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              See Bakame AI in action with a live demonstration tailored to your organization's needs.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="outline" className="border-primary/30 text-primary">
                <Calendar className="w-3 h-3 mr-1" />
                30-minute session
              </Badge>
              <Badge variant="outline" className="border-primary/30 text-primary">
                <User className="w-3 h-3 mr-1" />
                No commitment required
              </Badge>
              <Badge variant="outline" className="border-primary/30 text-primary">
                <Clock className="w-3 h-3 mr-1" />
                Available within 24 hours
              </Badge>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  Demo Request Form
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input 
                        id="firstName"
                        required
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input 
                        id="lastName"
                        required
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Business Email *</Label>
                    <Input 
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input 
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="company">Organization *</Label>
                      <Input 
                        id="company"
                        required
                        value={formData.company}
                        onChange={(e) => handleInputChange('company', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="role">Your Role *</Label>
                      <Input 
                        id="role"
                        required
                        value={formData.role}
                        onChange={(e) => handleInputChange('role', e.target.value)}
                        className="mt-1"
                        placeholder="e.g., IT Director, CTO"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="useCase">Primary Use Case *</Label>
                    <Select onValueChange={(value) => handleInputChange('useCase', value)} required>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select your primary use case" />
                      </SelectTrigger>
                      <SelectContent>
                        {useCases.map((useCase) => (
                          <SelectItem key={useCase} value={useCase}>
                            {useCase}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="preferredDate">Preferred Date *</Label>
                      <Input 
                        id="preferredDate"
                        type="date"
                        required
                        value={formData.preferredDate}
                        onChange={(e) => handleInputChange('preferredDate', e.target.value)}
                        className="mt-1"
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                    <div>
                      <Label htmlFor="preferredTime">Preferred Time (EST) *</Label>
                      <Select onValueChange={(value) => handleInputChange('preferredTime', value)} required>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select time slot" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeSlots.map((slot) => (
                            <SelectItem key={slot} value={slot}>
                              {slot}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="requirements">Specific Requirements or Questions</Label>
                    <Textarea 
                      id="requirements"
                      value={formData.requirements}
                      onChange={(e) => handleInputChange('requirements', e.target.value)}
                      className="mt-1"
                      placeholder="Tell us about your specific needs, expected user volume, integration requirements, etc."
                      rows={4}
                    />
                  </div>

                  <Button type="submit" className="w-full bg-primary hover:opacity-90 text-primary-foreground">
                    Schedule Demo
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Demo Details */}
            <div className="space-y-6">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle>What You'll See in the Demo</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <Phone className="w-3 h-3 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Live Voice Interaction</h4>
                      <p className="text-muted-foreground text-sm">Experience real-time AI voice conversations tailored to your use case</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <Building className="w-3 h-3 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Custom Configuration</h4>
                      <p className="text-muted-foreground text-sm">See how to configure the system for your organization's workflows</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <Mail className="w-3 h-3 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Integration Options</h4>
                      <p className="text-muted-foreground text-sm">Learn about API integrations and deployment options</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle>Demo Preparation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    To make the most of your demo session, please prepare:
                  </p>
                  <ul className="space-y-2 text-muted-foreground text-sm">
                    <li>• Specific use cases you want to explore</li>
                    <li>• Expected user volume and usage patterns</li>
                    <li>• Integration requirements with existing systems</li>
                    <li>• Timeline for potential deployment</li>
                    <li>• Key stakeholders who should attend</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">Need Enterprise Solutions?</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    For large deployments requiring custom features, white-labeling, or on-premise installation, 
                    our enterprise team can provide specialized demonstrations.
                  </p>
                  <Button 
                    onClick={() => navigate('/contact')} 
                    variant="outline" 
                    size="sm"
                  >
                    Contact Enterprise Sales
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoScheduling;