import { useApi } from './api';
import { LoginCredentials, SignupCredentials, User } from '@/composables/useAuth';

// Auth service response types
export interface AuthResponse {
  user: User;
  token?: string;
  access_token?: string;
}

/**
 * Authentication service for handling auth-related API requests
 */
export const useAuthService = () => {
  const api = useApi();

  // Login with email and password
  const login = async (credentials: LoginCredentials) => {
    console.log('Login request with:', { email: credentials.email });
    const response = await api.post<AuthResponse>('/auth/login', credentials);
    
    // Debug the response structure
    if (response.data) {
      console.log('Login response structure:', {
        hasAccessToken: !!response.data.access_token,
        hasToken: !!response.data.token,
        hasUser: !!response.data.user,
        rawResponse: JSON.stringify(response.data)
      });
    }
    
    return response;
  };

  // Register a new user
  const register = (userData: SignupCredentials) => 
    api.post<AuthResponse>('/auth/signup', userData);

  // OAuth login/signup
  const oauthLogin = (provider: string, code: string) => 
    api.post<AuthResponse>(`/auth/oauth/${provider}`, { code });

  // Request password reset
  const requestPasswordReset = (email: string) => 
    api.post<{ message: string }>('/auth/forgot-password', { email });

  // Reset password with token
  const resetPassword = (token: string, password: string) => 
    api.post<{ message: string }>('/auth/reset-password', { token, password });

  // Logout (invalidate token on server)
  const logout = () => 
    api.post<{ message: string }>('/auth/logout', {});

  // Get current user profile
  const getProfile = () => 
    api.get<User>('/auth/profile');

  return {
    login,
    register,
    oauthLogin,
    requestPasswordReset,
    resetPassword,
    logout,
    getProfile
  };
}; 