
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAnalytics } from '@/components/analytics/AnalyticsProvider';

interface ContactFormProps {
  className?: string;
}

export const ContactForm = ({ className = "" }: ContactFormProps) => {
  const { toast } = useToast();
  const { trackEvent } = useAnalytics();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
    solution_type: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('contact_submissions')
        .insert([{
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          subject: formData.subject,
          message: formData.message,
          solution_type: formData.solution_type,
          status: 'new'
        }]);

      if (error) {
        console.error('Error submitting contact form:', error);
        toast({
          title: "Error",
          description: "Failed to send your message. Please try again.",
          variant: "destructive",
        });
      } else {
        trackEvent('contact_form_submitted', { solution_type: formData.solution_type });
        toast({
          title: "Message Sent",
          description: "Thank you for your message. We'll get back to you soon!",
        });
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          subject: '',
          message: '',
          solution_type: '',
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
    <div className={`bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 ${className}`}>
      <h2 className="text-2xl font-bold text-white mb-6">Get in Touch</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="name" className="text-white">Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              required
            />
          </div>
          <div>
            <Label htmlFor="email" className="text-white">Email *</Label>
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
            <Label htmlFor="phone" className="text-white">Phone</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
          </div>
          <div>
            <Label htmlFor="company" className="text-white">Company</Label>
            <Input
              id="company"
              value={formData.company}
              onChange={(e) => handleInputChange("company", e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
          </div>
        </div>

        <div>
          <Label className="text-white">Solution Interest</Label>
          <Select value={formData.solution_type} onValueChange={(value) => handleInputChange("solution_type", value)}>
            <SelectTrigger className="bg-white/10 border-white/20 text-white">
              <SelectValue placeholder="Select a solution" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="education">Education</SelectItem>
              <SelectItem value="enterprise">Enterprise</SelectItem>
              <SelectItem value="government">Government</SelectItem>
              <SelectItem value="general">General Inquiry</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="subject" className="text-white">Subject</Label>
          <Input
            id="subject"
            value={formData.subject}
            onChange={(e) => handleInputChange("subject", e.target.value)}
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
          />
        </div>

        <div>
          <Label htmlFor="message" className="text-white">Message *</Label>
          <Textarea
            id="message"
            value={formData.message}
            onChange={(e) => handleInputChange("message", e.target.value)}
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50 min-h-[120px]"
            placeholder="Tell us about your needs..."
            required
          />
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-full font-semibold text-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 hover:scale-105 disabled:opacity-50"
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </Button>
      </form>
    </div>
  );
};
