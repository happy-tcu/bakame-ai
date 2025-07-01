
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, User, Building2, Phone, Mail, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const ScheduleConsultation = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    consultationType: 'general',
    preferredDate: '',
    preferredTime: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<{[key: string]: string}>({});
  const [isFormValid, setIsFormValid] = useState(false);
  const { toast } = useToast();

  const validateField = (name: string, value: string) => {
    const errors: {[key: string]: string} = {};
    
    switch (name) {
      case 'name':
        if (!value.trim()) errors.name = 'Name is required';
        else if (value.trim().length < 2) errors.name = 'Name must be at least 2 characters';
        break;
      case 'email':
        if (!value.trim()) errors.email = 'Email is required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) errors.email = 'Please enter a valid email';
        break;
      case 'phone':
        if (value && !/^[\+]?[1-9][\d]{0,15}$/.test(value.replace(/[\s\-\(\)]/g, ''))) {
          errors.phone = 'Please enter a valid phone number';
        }
        break;
    }
    
    return errors;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Real-time validation
    const fieldErrors = validateField(name, value);
    setValidationErrors(prev => ({
      ...prev,
      ...fieldErrors,
      [name]: fieldErrors[name] || ''
    }));
  };

  const handleFocus = (fieldName: string) => {
    setFocusedField(fieldName);
  };

  const handleBlur = () => {
    setFocusedField(null);
  };

  // Check form validity
  useEffect(() => {
    const requiredFields = ['name', 'email', 'consultationType'];
    const hasRequiredFields = requiredFields.every(field => formData[field as keyof typeof formData].trim());
    const hasNoErrors = Object.values(validationErrors).every(error => !error);
    setIsFormValid(hasRequiredFields && hasNoErrors);
  }, [formData, validationErrors]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate all fields
    let allErrors: {[key: string]: string} = {};
    Object.keys(formData).forEach(key => {
      const errors = validateField(key, formData[key as keyof typeof formData]);
      allErrors = { ...allErrors, ...errors };
    });

    if (Object.values(allErrors).some(error => error)) {
      setValidationErrors(allErrors);
      setIsSubmitting(false);
      return;
    }

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    toast({
      title: "Consultation Scheduled!",
      description: "We'll contact you within 24 hours to confirm your consultation time.",
    });

    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      consultationType: 'general',
      preferredDate: '',
      preferredTime: '',
      message: ''
    });
    setValidationErrors({});
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

  const getFieldIcon = (fieldName: string, hasError: boolean) => {
    if (hasError) return <AlertCircle className="h-4 w-4 text-red-400" />;
    if (formData[fieldName as keyof typeof formData] && !hasError) return <CheckCircle className="h-4 w-4 text-green-400" />;
    return null;
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Enhanced background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-green-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/3 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-500/3 rounded-full blur-3xl animate-pulse delay-500 transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      <div className="relative z-10">
        <div className="container mx-auto px-6 py-12">
          <Link to="/resources" className="inline-flex items-center text-white/70 hover:text-white mb-8 transition-colors group">
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Resources
          </Link>

          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent mb-6 animate-fade-in">
                Schedule Consultation
              </h1>
              <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto animate-fade-in delay-100">
                Book a personalized consultation with our experts to discuss your IVR deployment needs and explore custom solutions.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Enhanced Consultation Form */}
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
                      <div className="space-y-1">
                        <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                          Full Name *
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleInputChange}
                            onFocus={() => handleFocus('name')}
                            onBlur={handleBlur}
                            className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white placeholder-white/50 focus:outline-none transition-all duration-300 ${
                              focusedField === 'name' 
                                ? 'border-blue-400 shadow-lg shadow-blue-400/20 scale-105' 
                                : validationErrors.name 
                                  ? 'border-red-400' 
                                  : formData.name && !validationErrors.name
                                    ? 'border-green-400'
                                    : 'border-white/20'
                            }`}
                            placeholder="Your full name"
                          />
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            {getFieldIcon('name', !!validationErrors.name)}
                          </div>
                        </div>
                        {validationErrors.name && (
                          <p className="text-red-400 text-sm mt-1 animate-fade-in">{validationErrors.name}</p>
                        )}
                      </div>
                      <div className="space-y-1">
                        <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                          Email Address *
                        </label>
                        <div className="relative">
                          <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleInputChange}
                            onFocus={() => handleFocus('email')}
                            onBlur={handleBlur}
                            className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white placeholder-white/50 focus:outline-none transition-all duration-300 ${
                              focusedField === 'email' 
                                ? 'border-blue-400 shadow-lg shadow-blue-400/20 scale-105' 
                                : validationErrors.email 
                                  ? 'border-red-400' 
                                  : formData.email && !validationErrors.email
                                    ? 'border-green-400'
                                    : 'border-white/20'
                            }`}
                            placeholder="your@email.com"
                          />
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            {getFieldIcon('email', !!validationErrors.email)}
                          </div>
                        </div>
                        {validationErrors.email && (
                          <p className="text-red-400 text-sm mt-1 animate-fade-in">{validationErrors.email}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label htmlFor="phone" className="block text-sm font-medium text-white mb-2">
                          Phone Number
                        </label>
                        <div className="relative">
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            onFocus={() => handleFocus('phone')}
                            onBlur={handleBlur}
                            className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white placeholder-white/50 focus:outline-none transition-all duration-300 ${
                              focusedField === 'phone' 
                                ? 'border-blue-400 shadow-lg shadow-blue-400/20 scale-105' 
                                : validationErrors.phone 
                                  ? 'border-red-400' 
                                  : formData.phone && !validationErrors.phone
                                    ? 'border-green-400'
                                    : 'border-white/20'
                            }`}
                            placeholder="+1 (555) 123-4567"
                          />
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            {getFieldIcon('phone', !!validationErrors.phone)}
                          </div>
                        </div>
                        {validationErrors.phone && (
                          <p className="text-red-400 text-sm mt-1 animate-fade-in">{validationErrors.phone}</p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="company" className="block text-sm font-medium text-white mb-2">
                          Company/Organization
                        </label>
                        <input
                          type="text"
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          onFocus={() => handleFocus('company')}
                          onBlur={handleBlur}
                          className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white placeholder-white/50 focus:outline-none transition-all duration-300 ${
                            focusedField === 'company' 
                              ? 'border-blue-400 shadow-lg shadow-blue-400/20 scale-105' 
                              : 'border-white/20'
                          }`}
                          placeholder="Your organization"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="consultationType" className="block text-sm font-medium text-white mb-2">
                        Consultation Type *
                      </label>
                      <select
                        id="consultationType"
                        name="consultationType"
                        required
                        value={formData.consultationType}
                        onChange={handleInputChange}
                        onFocus={() => handleFocus('consultationType')}
                        onBlur={handleBlur}
                        className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white focus:outline-none transition-all duration-300 ${
                          focusedField === 'consultationType' 
                            ? 'border-blue-400 shadow-lg shadow-blue-400/20 scale-105' 
                            : 'border-white/20'
                        }`}
                      >
                        {consultationTypes.map(type => (
                          <option key={type.value} value={type.value} className="bg-black text-white">
                            {type.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="preferredDate" className="block text-sm font-medium text-white mb-2">
                          Preferred Date
                        </label>
                        <input
                          type="date"
                          id="preferredDate"
                          name="preferredDate"
                          value={formData.preferredDate}
                          onChange={handleInputChange}
                          onFocus={() => handleFocus('preferredDate')}
                          onBlur={handleBlur}
                          min={new Date().toISOString().split('T')[0]}
                          className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white focus:outline-none transition-all duration-300 ${
                            focusedField === 'preferredDate' 
                              ? 'border-blue-400 shadow-lg shadow-blue-400/20 scale-105' 
                              : 'border-white/20'
                          }`}
                        />
                      </div>
                      <div>
                        <label htmlFor="preferredTime" className="block text-sm font-medium text-white mb-2">
                          Preferred Time (EST)
                        </label>
                        <select
                          id="preferredTime"
                          name="preferredTime"
                          value={formData.preferredTime}
                          onChange={handleInputChange}
                          onFocus={() => handleFocus('preferredTime')}
                          onBlur={handleBlur}
                          className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white focus:outline-none transition-all duration-300 ${
                            focusedField === 'preferredTime' 
                              ? 'border-blue-400 shadow-lg shadow-blue-400/20 scale-105' 
                              : 'border-white/20'
                          }`}
                        >
                          <option value="" className="bg-black text-white">Select time</option>
                          {timeSlots.map(time => (
                            <option key={time} value={time} className="bg-black text-white">
                              {time}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-white mb-2">
                        Additional Information
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        value={formData.message}
                        onChange={handleInputChange}
                        onFocus={() => handleFocus('message')}
                        onBlur={handleBlur}
                        className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white placeholder-white/50 focus:outline-none transition-all duration-300 resize-none ${
                          focusedField === 'message' 
                            ? 'border-blue-400 shadow-lg shadow-blue-400/20 scale-105' 
                            : 'border-white/20'
                        }`}
                        placeholder="Tell us about your specific needs, current challenges, or any questions you have..."
                      />
                    </div>

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

              {/* Enhanced Consultation Info */}
              <div className="space-y-6">
                <Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-500 transform hover:scale-[1.02] animate-fade-in delay-300">
                  <CardHeader>
                    <CardTitle className="text-xl text-white flex items-center">
                      <Clock className="mr-2 h-5 w-5 text-blue-400" />
                      What to Expect
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 text-white/70">
                    <div className="flex items-start space-x-3 group hover:text-white/90 transition-colors">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0 group-hover:animate-pulse"></div>
                      <p>30-60 minute video call with our technical experts</p>
                    </div>
                    <div className="flex items-start space-x-3 group hover:text-white/90 transition-colors">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0 group-hover:animate-pulse"></div>
                      <p>Assessment of your current infrastructure and needs</p>
                    </div>
                    <div className="flex items-start space-x-3 group hover:text-white/90 transition-colors">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0 group-hover:animate-pulse"></div>
                      <p>Custom solution recommendations and implementation roadmap</p>
                    </div>
                    <div className="flex items-start space-x-3 group hover:text-white/90 transition-colors">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0 group-hover:animate-pulse"></div>
                      <p>Q&A session and next steps discussion</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-500 transform hover:scale-[1.02] animate-fade-in delay-400">
                  <CardHeader>
                    <CardTitle className="text-xl text-white flex items-center">
                      <User className="mr-2 h-5 w-5 text-green-400" />
                      Our Experts
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-white/70">
                    <p className="hover:text-white/90 transition-colors">• 10+ years of IVR deployment experience</p>
                    <p className="hover:text-white/90 transition-colors">• Specialists in offline and hybrid solutions</p>
                    <p className="hover:text-white/90 transition-colors">• Government and enterprise certified</p>
                    <p className="hover:text-white/90 transition-colors">• Multi-language support expertise</p>
                  </CardContent>
                </Card>

                <Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-500 transform hover:scale-[1.02] animate-fade-in delay-500">
                  <CardHeader>
                    <CardTitle className="text-xl text-white">Alternative Contact</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-white/70">
                    <div className="flex items-center space-x-3 hover:text-white/90 transition-colors group">
                      <Mail className="h-4 w-4 group-hover:text-blue-400 transition-colors" />
                      <span>consultations@bakame.ai</span>
                    </div>
                    <div className="flex items-center space-x-3 hover:text-white/90 transition-colors group">
                      <Phone className="h-4 w-4 group-hover:text-green-400 transition-colors" />
                      <span>+1 (555) 123-4567</span>
                    </div>
                    <div className="flex items-center space-x-3 hover:text-white/90 transition-colors group">
                      <Building2 className="h-4 w-4 group-hover:text-purple-400 transition-colors" />
                      <span>Available Mon-Fri, 9 AM - 5 PM EST</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleConsultation;
