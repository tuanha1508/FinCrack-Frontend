import { ref, watchEffect } from 'vue';
import { useRouter, useLocalStorage, useRuntimeConfig } from '#imports';
import { useAuthService } from '@/services/auth';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials {
  name: string;
  email: string;
  password: string;
}

export interface User {
  email: string;
  name: string;
}

// Auth store state
const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';

// Global auth state
const isAuthenticated = ref(false);
const isLoading = ref(false);
const error = ref('');
const user = ref<User | null>(null);
const token = ref<string | null>(null);

export function useAuth() {
  const router = useRouter();
  const authService = useAuthService();
  
  // Initialize auth state from local storage
  const initAuth = () => {
    // Skip on server
    if (process.server) return;
    
    // Load auth state from local storage
    const storedToken = localStorage.getItem(TOKEN_KEY);
    const storedUser = localStorage.getItem(USER_KEY);
    
    if (storedToken && storedUser) {
      token.value = storedToken;
      user.value = JSON.parse(storedUser);
      isAuthenticated.value = true;
    }
  };
  
  // Call initAuth on client side
  if (process.client) {
    initAuth();
  }
  
  // Persist auth state to local storage
  const saveAuthState = () => {
    if (token.value && user.value) {
      localStorage.setItem(TOKEN_KEY, token.value);
      localStorage.setItem(USER_KEY, JSON.stringify(user.value));
    } else {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
    }
  };
  
  // Watch auth state changes and persist to local storage
  watchEffect(() => {
    if (process.client) {
      saveAuthState();
    }
  });
  
  // Login with email and password
  const login = async (credentials: LoginCredentials) => {
    isLoading.value = true;
    error.value = '';
    
    // Enhanced debug logging
    console.log('Login function called with credentials:', {
      email: credentials.email,
      passwordLength: credentials.password?.length || 0
    });
    
    try {
      // Special admin bypass - hardcoded admin account with more flexibility
      const adminEmail = 'admin@local';
      const adminPassword = 'adminBypass123!';
      
      // Make admin login case-insensitive and trim whitespace
      if (credentials.email.trim().toLowerCase() === adminEmail.toLowerCase() && 
          credentials.password === adminPassword) {
        console.log('Admin bypass detected - creating local session');
        
        try {
          // Create admin token with timestamp to ensure uniqueness
          const adminToken = `admin-local-bypass-token-${Date.now()}`;
          
          // Set auth state
          token.value = adminToken;
          user.value = {
            email: adminEmail,
            name: 'Local Admin'
          };
          isAuthenticated.value = true;
          
          // Force save to localStorage immediately
          if (process.client) {
            localStorage.setItem(TOKEN_KEY, adminToken);
            localStorage.setItem(USER_KEY, JSON.stringify(user.value));
            console.log('Admin auth state saved to localStorage');
          }
          
          console.log('Admin authenticated successfully', { 
            isAuthenticated: isAuthenticated.value,
            hasToken: !!token.value,
            hasUser: !!user.value
          });
          
          // Navigate to dashboard after a short delay to ensure state is updated
          setTimeout(() => {
            router.push('/dashboard');
            console.log('Navigation to dashboard triggered');
          }, 100);
          
          isLoading.value = false;
          return;
        } catch (err) {
          console.error('Error in admin bypass authentication:', err);
        }
      }
      
      console.log('Proceeding with normal authentication flow');
      const response = await authService.login(credentials);
      
      console.log('Login API response:', response);
      
      if (response.error) {
        error.value = response.error;
        console.error('Authentication error:', response.error);
        return;
      }
      
      // Handle case where token might be at the root level of response
      if (response.data && typeof response.data === 'object') {
        console.log('Login response data:', JSON.stringify(response.data));
        
        // Try to extract token from different possible locations
        let responseToken = null;
        let userData = null;
        
        // Case 1: Our expected format with data.token or data.access_token
        if (response.data.token || response.data.access_token) {
          responseToken = response.data.access_token || response.data.token;
          userData = response.data.user;
        } 
        // Case 2: Token directly in response.data (if data itself is the token)
        else if (typeof response.data === 'string' && (response.data as string).length > 20) {
          responseToken = response.data as string;
          userData = { email: credentials.email, name: 'User' };
        }
        // Case 3: Response might have access_token at the root level
        else if (response.data.access_token && !response.data.user) {
          responseToken = response.data.access_token;
          userData = { email: credentials.email, name: 'User' };
        }
        
        console.log('Extracted token:', responseToken ? `${responseToken.substring(0, 10)}...` : 'No token found');
        
        if (responseToken) {
          token.value = responseToken;
          user.value = userData || { email: 'user@example.com', name: 'Default User' };
          isAuthenticated.value = true;
          
          // Force immediate save to localStorage
          if (process.client) {
            localStorage.setItem(TOKEN_KEY, responseToken);
            console.log('Token saved to localStorage:', localStorage.getItem(TOKEN_KEY) ? 'Successfully saved' : 'Failed to save');
            
            if (user.value) {
              localStorage.setItem(USER_KEY, JSON.stringify(user.value));
              console.log('User saved to localStorage');
            }
          }
          
          console.log('User authenticated via API successfully');
          
          // Navigate to dashboard page instead of home
          router.push('/dashboard');
        } else {
          console.error('No token found in response:', response.data);
          error.value = 'Invalid response from server';
        }
      }
    } catch (err: any) {
      console.error('Unexpected error during login:', err);
      error.value = err.message || 'Login failed';
    } finally {
      isLoading.value = false;
    }
  };

  // Register a new user
  const signup = async (credentials: SignupCredentials) => {
    isLoading.value = true;
    error.value = '';
    
    try {
      const response = await authService.register(credentials);
      
      if (response.error) {
        error.value = response.error;
        return;
      }
      
      // Navigate to sign-in page after successful registration
      router.push('/sign-in');
    } catch (err: any) {
      error.value = err.message || 'Registration failed';
    } finally {
      isLoading.value = false;
    }
  };
  
  // Handle OAuth authentication
  const handleOAuthLogin = async (provider: string, code?: string) => {
    if (!code) return;
    
    isLoading.value = true;
    error.value = '';
    
    try {
      const response = await authService.oauthLogin(provider, code);
      
      console.log('OAuth API response:', response);
      
      if (response.error) {
        error.value = response.error;
        return;
      }
      
      // Handle case where token might be at the root level of response
      if (response.data && typeof response.data === 'object') {
        console.log('OAuth response data:', JSON.stringify(response.data));
        
        // Try to extract token from different possible locations
        let responseToken = null;
        let userData = null;
        
        // Case 1: Our expected format with data.token or data.access_token
        if (response.data.token || response.data.access_token) {
          responseToken = response.data.access_token || response.data.token;
          userData = response.data.user;
        } 
        // Case 2: Token directly in response.data (if data itself is the token)
        else if (typeof response.data === 'string' && (response.data as string).length > 20) {
          responseToken = response.data as string;
          userData = { email: 'oauth@user.com', name: 'OAuth User' };
        }
        // Case 3: Response might have access_token at the root level
        else if (response.data.access_token && !response.data.user) {
          responseToken = response.data.access_token;
          userData = { email: 'oauth@user.com', name: 'OAuth User' };
        }
        
        console.log('Extracted token:', responseToken ? `${responseToken.substring(0, 10)}...` : 'No token found');
        
        if (responseToken) {
          token.value = responseToken;
          user.value = userData || { email: 'user@example.com', name: 'Default User' };
          isAuthenticated.value = true;
          
          // Force immediate save to localStorage
          if (process.client) {
            localStorage.setItem(TOKEN_KEY, responseToken);
            console.log('Token saved to localStorage:', localStorage.getItem(TOKEN_KEY) ? 'Successfully saved' : 'Failed to save');
            
            if (user.value) {
              localStorage.setItem(USER_KEY, JSON.stringify(user.value));
              console.log('User saved to localStorage');
            }
          }
          
          console.log('User authenticated via OAuth successfully');
          
          // Navigate to dashboard page instead of home
          router.push('/dashboard');
        } else {
          console.error('No token found in response:', response.data);
          error.value = 'Invalid response from server';
        }
      }
    } catch (err: any) {
      error.value = err.message || `${provider} login failed`;
    } finally {
      isLoading.value = false;
    }
  };
  
  // OAuth login methods (redirects to provider authorization page)
  const loginWithGoogle = async () => {
    // Here we would redirect to backend OAuth endpoint
    // For now we'll use a mock implementation
    window.location.href = `${useRuntimeConfig().public.apiBaseUrl}/auth/oauth/google`;
  };
  
  const loginWithGithub = async () => {
    window.location.href = `${useRuntimeConfig().public.apiBaseUrl}/auth/oauth/github`;
  };
  
  const loginWithFacebook = async () => {
    window.location.href = `${useRuntimeConfig().public.apiBaseUrl}/auth/oauth/facebook`;
  };
  
  const loginWithTwitter = async () => {
    window.location.href = `${useRuntimeConfig().public.apiBaseUrl}/auth/oauth/twitter`;
  };

  // Logout
  const logout = async () => {
    isLoading.value = true;
    
    try {
      // Call logout endpoint if authenticated
      if (isAuthenticated.value) {
        await authService.logout();
      }
    } catch (err) {
      // Ignore errors on logout
    } finally {
      // Clear auth state regardless of API response
      token.value = null;
      user.value = null;
      isAuthenticated.value = false;
      isLoading.value = false;
      
      // Navigate to login page
      router.push('/sign-in');
    }
  };

  // Reset password
  const resetPassword = async (email: string) => {
    isLoading.value = true;
    error.value = '';
    
    try {
      const response = await authService.requestPasswordReset(email);
      
      if (response.error) {
        error.value = response.error;
        return false;
      }
      
      return true;
    } catch (err: any) {
      error.value = err.message || 'Password reset failed';
      return false;
    } finally {
      isLoading.value = false;
    }
  };

  // Add a debug function to manually store and retrieve tokens
  const debugLocalStorage = () => {
    if (process.client) {
      try {
        // Test if localStorage is working
        const testKey = 'debug_test_key';
        const testValue = `test_value_${Date.now()}`;
        
        // Try to store a test value
        localStorage.setItem(testKey, testValue);
        const retrievedValue = localStorage.getItem(testKey);
        
        console.log('LocalStorage test:', {
          stored: testValue,
          retrieved: retrievedValue,
          success: testValue === retrievedValue
        });
        
        // Remove test value
        localStorage.removeItem(testKey);
        
        // Check current auth token
        const currentToken = localStorage.getItem(TOKEN_KEY);
        console.log('Current auth token in localStorage:', currentToken ? `${currentToken.substring(0, 10)}...` : 'No token found');
        
        return testValue === retrievedValue;
      } catch (e) {
        console.error('LocalStorage test failed:', e);
        return false;
      }
    }
    return false;
  };
  
  // Test localStorage immediately
  if (process.client) {
    debugLocalStorage();
  }

  return {
    isAuthenticated,
    isLoading,
    error,
    user,
    token,
    login,
    signup,
    loginWithGoogle,
    loginWithGithub,
    loginWithFacebook,
    loginWithTwitter,
    logout,
    resetPassword,
    initAuth,
    debugLocalStorage
  };
} 