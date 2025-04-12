// Form validation
export const PASSWORD_MIN_LENGTH = 8;

// API endpoints
export const API_BASE_URL = '/api';
export const AUTH_ENDPOINTS = {
  LOGIN: `${API_BASE_URL}/auth/login`,
  SIGNUP: `${API_BASE_URL}/auth/signup`,
  FORGOT_PASSWORD: `${API_BASE_URL}/auth/forgot-password`,
  RESET_PASSWORD: `${API_BASE_URL}/auth/reset-password`,
  VERIFY_EMAIL: `${API_BASE_URL}/auth/verify-email`,
};

// Animation durations
export const ANIMATION_DURATION = {
  FAST: 150,
  MEDIUM: 300,
  SLOW: 500,
};

// UI Constants
export const UI = {
  BREAKPOINTS: {
    SM: 640,
    MD: 768,
    LG: 1024,
    XL: 1280,
    XXL: 1536,
  },
  CONTAINER_PADDING: {
    DEFAULT: '2rem',
  },
};

// Route names
export const ROUTES = {
  HOME: '/',
  LOGIN: '/sign-in',
  SIGNUP: '/sign-up',
  FORGOT_PASSWORD: '/forgot-password',
  PROFILE: '/profile',
};

// Form validation messages
export const VALIDATION_MESSAGES = {
  REQUIRED: 'This field is required',
  EMAIL_INVALID: 'Please enter a valid email address',
  PASSWORD_SHORT: `Password must be at least ${PASSWORD_MIN_LENGTH} characters long`,
  PASSWORDS_DONT_MATCH: 'Passwords do not match',
}; 