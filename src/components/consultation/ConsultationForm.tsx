
import { useState } from 'react';
import { Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { FormField } from './FormField';
import { useFormValidation, FormData } from '@/hooks/useFormValidation';

const initialFormData: FormData = {
  name: '',
  email: '',
  phone: '',
  company: '',
  consultationType: 'general',
  preferredDate: '',
  preferredTime: '',
  message: ''
};

export const ConsultationForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const { toast } = useToast();

  const {
    formData,
    validationErrors,
    isFormValid,
    handleInputChange,
    validateAllFields,
    resetForm
  } = useFormValidation(initialFormData);

  const handleFocus = (fieldName: string) => {
    setFocusedField(fieldName);
  };

  const handleBlur = () => {
    setFocusedField(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!validateAllFields()) {
      setIsSubmitting(false);
      return;
    }

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    toast({
      title: "Consultation Scheduled!",
      description: "We'll contact you within 24 hours to confirm your consultation time.",
    });

    resetForm();
    setIsSubmitting(false);
  };

  const consultationTypes = [
    { value: 'general', label: 'General Consultation' },
    { value: 'technical', label: 'Technical Implementation' },
    { value: 'custom', label: 'Custom Solution Design' },
    { value: 'enterprise', label: 'Enterprise Deployment' },
    { value: 'government', label: 'Government Solutions' },
    { value: 'education', label: 'Education Sector' }
  ];

  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
  ];

  return (
    <Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-500 transform hover:scale-[1.02] animate-fade-in delay-200">
      <CardHeader>
        <CardTitle className="text-2xl text-white flex items-center">
          <Calendar className="mr-2 h-6 w-6" />
          Book Your Consultation
        </CardTitle>
        <CardDescription className="text-white/70">
          Fill out the form below and we'll get back to you within 24 hours.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <FormField
              id="name"
              name="name"
              label="Full Name"
              required
              value={formData.name}
              onChange={handleInputChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              focusedField={focusedField}
              error={validationErrors.name}
              placeholder="Your full name"
            />
            <FormField
              id="email"
              name="email"
              label="Email Address"
              type="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              focusedField={focusedField}
              error={validationErrors.email}
              placeholder="your@email.com"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <FormField
              id="phone"
              name="phone"
              label="Phone Number"
              type="tel"
              value={formData.phone}
              onChange={handleInputChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              focusedField={focusedField}
              error={validationErrors.phone}
              placeholder="+1 (555) 123-4567"
            />
            <FormField
              id="company"
              name="company"
              label="Company/Organization"
              value={formData.company}
              onChange={handleInputChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              focusedField={focusedField}
              placeholder="Your organization"
            />
          </div>

          <FormField
            id="consultationType"
            name="consultationType"
            label="Consultation Type"
            type="select"
            required
            value={formData.consultationType}
            onChange={handleInputChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            focusedField={focusedField}
            options={consultationTypes}
          />

          <div className="grid md:grid-cols-2 gap-4">
            <FormField
              id="preferredDate"
              name="preferredDate"
              label="Preferred Date"
              type="date"
              value={formData.preferredDate}
              onChange={handleInputChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              focusedField={focusedField}
              min={new Date().toISOString().split('T')[0]}
            />
            <FormField
              id="preferredTime"
              name="preferredTime"
              label="Preferred Time (EST)"
              type="select"
              value={formData.preferredTime}
              onChange={handleInputChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              focusedField={focusedField}
              options={[
                { value: '', label: 'Select time' },
                ...timeSlots.map(time => ({ value: time, label: time }))
              ]}
            />
          </div>

          <FormField
            id="message"
            name="message"
            label="Additional Information"
            type="textarea"
            value={formData.message}
            onChange={handleInputChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            focusedField={focusedField}
            placeholder="Tell us about your specific needs, current challenges, or any questions you have..."
            rows={4}
          />

          <Button
            type="submit"
            disabled={isSubmitting || !isFormValid}
            className={`w-full font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform ${
              isFormValid && !isSubmitting
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 hover:scale-105 shadow-lg shadow-blue-500/25'
                : 'bg-gray-600 cursor-not-allowed opacity-50'
            }`}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Scheduling...
              </div>
            ) : (
              'Schedule Consultation'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
