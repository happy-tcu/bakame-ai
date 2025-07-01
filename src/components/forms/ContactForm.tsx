
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAnalytics } from '@/hooks/useAnalytics';

interface ContactFormProps {
  defaultSolutionType?: string;
  className?: string;
}

export const ContactForm = ({ defaultSolutionType, className }: ContactFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
    solution_type: defaultSolutionType || ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { trackFormSubmit } = useAnalytics();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.functions.invoke('contact-form', {
        body: formData
      });

      if (error) throw error;

      toast({
        title: "Message Sent!",
        description: data.message,
      });

      trackFormSubmit('contact_form', { solution_type: formData.solution_type });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        company: '',
        message: '',
        solution_type: defaultSolutionType || ''
      });

    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`space-y-6 ${className}`}>
      <div className="grid md:grid-cols-2 gap-4">
        <Input
          placeholder="Your Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <Input
          type="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
      </div>
      
      <div className="grid md:grid-cols-2 gap-4">
        <Input
          placeholder="Company (Optional)"
          value={formData.company}
          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
        />
        <Select
          value={formData.solution_type}
          onValueChange={(value) => setFormData({ ...formData, solution_type: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Solution Interest" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="education">Education Solutions</SelectItem>
            <SelectItem value="enterprise">Enterprise Solutions</SelectItem>
            <SelectItem value="government">Government Solutions</SelectItem>
            <SelectItem value="general">General Inquiry</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Textarea
        placeholder="Your Message"
        value={formData.message}
        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        rows={4}
        required
      />

      <Button 
        type="submit" 
        disabled={isSubmitting}
        className="w-full"
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </Button>
    </form>
  );
};
