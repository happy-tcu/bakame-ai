
import { AlertCircle, CheckCircle } from 'lucide-react';

interface FormFieldProps {
  id: string;
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  onFocus: (fieldName: string) => void;
  onBlur: () => void;
  focusedField: string | null;
  error?: string;
  placeholder?: string;
  options?: { value: string; label: string }[];
  rows?: number;
  min?: string;
}

export const FormField = ({
  id,
  name,
  label,
  type = 'text',
  required = false,
  value,
  onChange,
  onFocus,
  onBlur,
  focusedField,
  error,
  placeholder,
  options,
  rows,
  min
}: FormFieldProps) => {
  const getFieldIcon = (hasError: boolean) => {
    if (hasError) return <AlertCircle className="h-4 w-4 text-red-400" />;
    if (value && !hasError) return <CheckCircle className="h-4 w-4 text-green-400" />;
    return null;
  };

  const getFieldClasses = () => {
    return `w-full px-4 py-3 bg-white/10 border rounded-lg text-white placeholder-white/50 focus:outline-none transition-all duration-300 ${
      focusedField === name 
        ? 'border-blue-400 shadow-lg shadow-blue-400/20 scale-105' 
        : error 
          ? 'border-red-400' 
          : value && !error
            ? 'border-green-400'
            : 'border-white/20'
    }`;
  };

  return (
    <div className="space-y-1">
      <label htmlFor={id} className="block text-sm font-medium text-white mb-2">
        {label} {required && '*'}
      </label>
      <div className="relative">
        {type === 'select' ? (
          <select
            id={id}
            name={name}
            required={required}
            value={value}
            onChange={onChange}
            onFocus={() => onFocus(name)}
            onBlur={onBlur}
            className={getFieldClasses()}
          >
            {options?.map(option => (
              <option key={option.value} value={option.value} className="bg-black text-white">
                {option.label}
              </option>
            ))}
          </select>
        ) : type === 'textarea' ? (
          <textarea
            id={id}
            name={name}
            rows={rows || 4}
            value={value}
            onChange={onChange}
            onFocus={() => onFocus(name)}
            onBlur={onBlur}
            className={`${getFieldClasses()} resize-none`}
            placeholder={placeholder}
          />
        ) : (
          <input
            type={type}
            id={id}
            name={name}
            required={required}
            value={value}
            onChange={onChange}
            onFocus={() => onFocus(name)}
            onBlur={onBlur}
            min={min}
            className={getFieldClasses()}
            placeholder={placeholder}
          />
        )}
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          {getFieldIcon(!!error)}
        </div>
      </div>
      {error && (
        <p className="text-red-400 text-sm mt-1 animate-fade-in">{error}</p>
      )}
    </div>
  );
};
