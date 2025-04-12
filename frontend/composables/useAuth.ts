import { ref } from 'vue';
import { useRouter } from 'vue-router';

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

export function useAuth() {
  const router = useRouter();
  const isAuthenticated = ref(false);
  const isLoading = ref(false);
  const error = ref('');
  const user = ref<User | null>(null);

  // Mock auth functions - replace with real API calls
  const login = async (credentials: LoginCredentials) => {
    isLoading.value = true;
    error.value = '';
    
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Simulate successful login
      isAuthenticated.value = true;
      user.value = {
        email: credentials.email,
        name: 'User Name' // This would come from the API
      };
      
      // Navigate to home page
      router.push('/');
    } catch (err) {
      error.value = 'Invalid email or password';
    } finally {
      isLoading.value = false;
    }
  };

  const signup = async (credentials: SignupCredentials) => {
    isLoading.value = true;
    error.value = '';
    
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Simulate successful signup
      isAuthenticated.value = false;
      user.value = null;
      
      // Navigate to sign-in page instead of home page
      router.push('/sign-in');
    } catch (err) {
      error.value = 'Error creating account';
    } finally {
      isLoading.value = false;
    }
  };

  const loginWithGoogle = async (isSignUp = false) => {
    isLoading.value = true;
    error.value = '';
    
    try {
      // Mock API call for OAuth
      await new Promise(resolve => setTimeout(resolve, 800));
      
      if (isSignUp) {
        // If used for sign-up, redirect to sign-in
        router.push('/sign-in');
      } else {
        // Normal login flow
        isAuthenticated.value = true;
        user.value = {
          email: 'user@gmail.com', 
          name: 'Google User'
        };
        
        router.push('/');
      }
    } catch (err) {
      error.value = 'Google login failed';
    } finally {
      isLoading.value = false;
    }
  };

  const loginWithGithub = async (isSignUp = false) => {
    isLoading.value = true;
    error.value = '';
    
    try {
      // Mock API call for OAuth
      await new Promise(resolve => setTimeout(resolve, 800));
      
      if (isSignUp) {
        // If used for sign-up, redirect to sign-in
        router.push('/sign-in');
      } else {
        // Normal login flow
        isAuthenticated.value = true;
        user.value = {
          email: 'user@github.com', 
          name: 'Github User'
        };
        
        router.push('/');
      }
    } catch (err) {
      error.value = 'Github login failed';
    } finally {
      isLoading.value = false;
    }
  };

  const loginWithFacebook = async (isSignUp = false) => {
    isLoading.value = true;
    error.value = '';
    
    try {
      // Mock API call for OAuth
      await new Promise(resolve => setTimeout(resolve, 800));
      
      if (isSignUp) {
        // If used for sign-up, redirect to sign-in
        router.push('/sign-in');
      } else {
        // Normal login flow
        isAuthenticated.value = true;
        user.value = {
          email: 'user@facebook.com', 
          name: 'Facebook User'
        };
        
        router.push('/');
      }
    } catch (err) {
      error.value = 'Facebook login failed';
    } finally {
      isLoading.value = false;
    }
  };

  const loginWithTwitter = async (isSignUp = false) => {
    isLoading.value = true;
    error.value = '';
    
    try {
      // Mock API call for OAuth
      await new Promise(resolve => setTimeout(resolve, 800));
      
      if (isSignUp) {
        // If used for sign-up, redirect to sign-in
        router.push('/sign-in');
      } else {
        // Normal login flow
        isAuthenticated.value = true;
        user.value = {
          email: 'user@twitter.com', 
          name: 'Twitter User'
        };
        
        router.push('/');
      }
    } catch (err) {
      error.value = 'Twitter login failed';
    } finally {
      isLoading.value = false;
    }
  };

  const logout = async () => {
    // Mock logout
    await new Promise(resolve => setTimeout(resolve, 300));
    
    isAuthenticated.value = false;
    user.value = null;
    router.push('/sign-in');
  };

  const resetPassword = async (email: string) => {
    isLoading.value = true;
    error.value = '';
    
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Return success
      return true;
    } catch (err) {
      error.value = 'Error resetting password';
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
    login,
    signup,
    loginWithGoogle,
    loginWithGithub,
    loginWithFacebook,
    loginWithTwitter,
    logout,
    resetPassword
  };
} 