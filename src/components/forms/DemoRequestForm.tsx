
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAnalytics } from '@/hooks/useAnalytics';

interface DemoRequestFormProps {
  defaultSolutionType?: string;
  className?: string;
  onSuccess?: () => void;
}

export const DemoRequestForm = ({ defaultSolutionType, className, onSuccess }: DemoRequestFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    solution_type: defaultSolutionType || '',
    message: '',
    preferred_date: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { trackFormSubmit } = useAnalytics();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.functions.invoke('demo-request', {
        body: formData
      });

      if (error) throw error;

      toast({
        title: "Demo Requested!",
        description: data.message,
      });

      trackFormSubmit('demo_request', { solution_type: formData.solution_type });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        solution_type: defaultSolutionType || '',
        message: '',
        preferred_date: ''
      });

      onSuccess?.();

    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to submit demo request. Please try again.",
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
          placeholder="Company"
          value={formData.company}
          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
        />
        <Input
          placeholder="Phone Number"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <Select
          value={formData.solution_type}
          onValueChange={(value) => setFormData({ ...formData, solution_type: value })}
          required
        >
          <SelectTrigger>
            <SelectValue placeholder="Solution Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="education">Education Solutions</SelectItem>
            <SelectItem value="enterprise">Enterprise Solutions</SelectItem>
            <SelectItem value="government">Government Solutions</SelectItem>
          </SelectContent>
        </Select>
        
        <Input
          type="datetime-local"
          placeholder="Preferred Date & Time"
          value={formData.preferred_date}
          onChange={(e) => setFormData({ ...formData, preferred_date: e.target.value })}
        />
      </div>

      <Textarea
        placeholder="Additional Message (Optional)"
        value={formData.message}
        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        rows={3}
      />

      <Button 
        type="submit" 
        disabled={isSubmitting}
        className="w-full"
      >
        {isSubmitting ? 'Submitting...' : 'Schedule Demo'}
      </Button>
    </form>
  );
};
