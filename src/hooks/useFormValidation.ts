
import { useState, useEffect } from 'react';

export interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  consultationType: string;
  preferredDate: string;
  preferredTime: string;
  message: string;
}

export const useFormValidation = (initialData: FormData) => {
  const [formData, setFormData] = useState<FormData>(initialData);
  const [validationErrors, setValidationErrors] = useState<{[key: string]: string}>({});
  const [isFormValid, setIsFormValid] = useState(false);

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

  // Check form validity
  useEffect(() => {
    const requiredFields = ['name', 'email', 'consultationType'];
    const hasRequiredFields = requiredFields.every(field => formData[field as keyof FormData].trim());
    const hasNoErrors = Object.values(validationErrors).every(error => !error);
    setIsFormValid(hasRequiredFields && hasNoErrors);
  }, [formData, validationErrors]);

  const validateAllFields = () => {
    let allErrors: {[key: string]: string} = {};
    Object.keys(formData).forEach(key => {
      const errors = validateField(key, formData[key as keyof FormData]);
      allErrors = { ...allErrors, ...errors };
    });
    setValidationErrors(allErrors);
    return !Object.values(allErrors).some(error => error);
  };

  const resetForm = () => {
    setFormData(initialData);
    setValidationErrors({});
  };

  return {
    formData,
    validationErrors,
    isFormValid,
    handleInputChange,
    validateAllFields,
    resetForm
  };
};
