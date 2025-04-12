import { ref, computed } from 'vue';

export interface FormValidation {
  value: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  errorMessage?: string;
}

export function useFormValidation() {
  const errors = ref<Record<string, string>>({});
  
  const validateField = (
    fieldName: string, 
    validation: FormValidation
  ): boolean => {
    const { value, required, minLength, maxLength, pattern, errorMessage } = validation;
    
    // Clear previous error
    errors.value[fieldName] = '';
    
    // Required check
    if (required && !value.trim()) {
      errors.value[fieldName] = errorMessage || `${fieldName} is required`;
      return false;
    }
    
    // Min length check
    if (minLength !== undefined && value.length < minLength) {
      errors.value[fieldName] = errorMessage || `${fieldName} must be at least ${minLength} characters`;
      return false;
    }
    
    // Max length check
    if (maxLength !== undefined && value.length > maxLength) {
      errors.value[fieldName] = errorMessage || `${fieldName} must be less than ${maxLength} characters`;
      return false;
    }
    
    // Pattern check
    if (pattern && !pattern.test(value)) {
      errors.value[fieldName] = errorMessage || `${fieldName} format is invalid`;
      return false;
    }
    
    return true;
  };
  
  const validateEmail = (email: string, fieldName = 'Email'): boolean => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return validateField(fieldName.toLowerCase(), {
      value: email,
      required: true,
      pattern: emailPattern,
      errorMessage: 'Please enter a valid email address'
    });
  };
  
  const validatePassword = (password: string, fieldName = 'Password'): boolean => {
    return validateField(fieldName.toLowerCase(), {
      value: password,
      required: true,
      minLength: 8,
      errorMessage: 'Password must be at least 8 characters long'
    });
  };
  
  const validateForm = (validations: Record<string, FormValidation>): boolean => {
    let isValid = true;
    
    for (const [fieldName, validation] of Object.entries(validations)) {
      if (!validateField(fieldName, validation)) {
        isValid = false;
      }
    }
    
    return isValid;
  };
  
  return {
    errors,
    validateField,
    validateEmail,
    validatePassword,
    validateForm
  };
} 