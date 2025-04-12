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
      
      if (response.error) {
        error.value = response.error;
        console.error('Authentication error:', response.error);
        return;
      }
      
      if (response.data) {
        token.value = response.data.token;
        user.value = response.data.user;
        isAuthenticated.value = true;
        
        console.log('User authenticated via API successfully');
        
        // Navigate to dashboard page instead of home
        router.push('/dashboard');
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
      
      if (response.error) {
        error.value = response.error;
        return;
      }
      
      if (response.data) {
        token.value = response.data.token;
        user.value = response.data.user;
        isAuthenticated.value = true;
        
        // Navigate to dashboard page instead of home
        router.push('/dashboard');
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
    initAuth
  };
} 