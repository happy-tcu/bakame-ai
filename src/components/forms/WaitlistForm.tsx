
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAnalytics } from '@/hooks/useAnalytics';

interface WaitlistFormProps {
  className?: string;
  compact?: boolean;
}

export const WaitlistForm = ({ className, compact = false }: WaitlistFormProps) => {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    company: '',
    solution_interest: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { trackFormSubmit } = useAnalytics();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.functions.invoke('waitlist', {
        body: formData
      });

      if (error) throw error;

      toast({
        title: "Welcome to the Waitlist!",
        description: data.message,
      });

      trackFormSubmit('waitlist_signup', { solution_interest: formData.solution_interest });
      
      // Reset form
      setFormData({
        email: '',
        name: '',
        company: '',
        solution_interest: ''
      });

    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to join waitlist. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (compact) {
    return (
      <form onSubmit={handleSubmit} className={`flex gap-2 ${className}`}>
        <Input
          type="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
          className="flex-1"
        />
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Joining...' : 'Join Waitlist'}
        </Button>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
      <div className="grid md:grid-cols-2 gap-4">
        <Input
          type="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <Input
          placeholder="Your Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </div>
      
      <div className="grid md:grid-cols-2 gap-4">
        <Input
          placeholder="Company (Optional)"
          value={formData.company}
          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
        />
        <Select
          value={formData.solution_interest}
          onValueChange={(value) => setFormData({ ...formData, solution_interest: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Solution Interest" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="education">Education Solutions</SelectItem>
            <SelectItem value="enterprise">Enterprise Solutions</SelectItem>
            <SelectItem value="government">Government Solutions</SelectItem>
            <SelectItem value="all">All Solutions</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button 
        type="submit" 
        disabled={isSubmitting}
        className="w-full"
      >
        {isSubmitting ? 'Joining...' : 'Join Waitlist'}
      </Button>
    </form>
  );
};
