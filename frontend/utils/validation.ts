import { VALIDATION_MESSAGES, PASSWORD_MIN_LENGTH } from '@/constants';

/**
 * Validates whether a string is a valid email address
 * @param email The email address to validate
 * @returns True if the email is valid, false otherwise
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validates an email field and sets the appropriate error if invalid
 * @param email The email to validate
 * @param errors Object to store error messages
 * @returns True if valid, false otherwise
 */
export const validateEmail = (email: string, errors: Record<string, string | undefined>): boolean => {
  if (!email) {
    errors.email = VALIDATION_MESSAGES.REQUIRED;
    return false;
  }
  
  if (!isValidEmail(email)) {
    errors.email = VALIDATION_MESSAGES.EMAIL_INVALID;
    return false;
  }
  
  return true;
};

/**
 * Validates a required field and sets the appropriate error if invalid
 * @param value The value to validate
 * @param fieldName The name of the field in the errors object
 * @param errors Object to store error messages
 * @returns True if valid, false otherwise
 */
export const validateRequired = (
  value: string, 
  fieldName: string, 
  errors: Record<string, string | undefined>
): boolean => {
  if (!value) {
    errors[fieldName] = VALIDATION_MESSAGES.REQUIRED;
    return false;
  }
  
  return true;
};

/**
 * Validates a password field and sets the appropriate error if invalid
 * @param password The password to validate
 * @param errors Object to store error messages
 * @returns True if valid, false otherwise
 */
export const validatePassword = (
  password: string, 
  errors: Record<string, string | undefined>
): boolean => {
  if (!password) {
    errors.password = VALIDATION_MESSAGES.REQUIRED;
    return false;
  }
  
  if (password.length < PASSWORD_MIN_LENGTH) {
    errors.password = VALIDATION_MESSAGES.PASSWORD_SHORT;
    return false;
  }
  
  return true;
};

/**
 * Validates that two passwords match
 * @param password The main password
 * @param confirmPassword The confirmation password
 * @param errors Object to store error messages
 * @returns True if valid, false otherwise
 */
export const validatePasswordsMatch = (
  password: string,
  confirmPassword: string,
  errors: Record<string, string | undefined>
): boolean => {
  if (password !== confirmPassword) {
    errors.confirmPassword = VALIDATION_MESSAGES.PASSWORDS_DONT_MATCH;
    return false;
  }
  
  return true;
}; 