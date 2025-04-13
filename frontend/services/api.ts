import { useFetch, useRuntimeConfig, useCookie } from '#imports';

// Types
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  status: number;
}

/**
 * Base API service for handling HTTP requests to the backend
 */
export const useApi = () => {
  const config = useRuntimeConfig();
  const baseUrl = 'http://localhost:3000/api';

  /**
   * Generic HTTP request method
   */
  const request = async <T>(
    endpoint: string,
    options: {
      method?: string;
      body?: any;
      headers?: Record<string, string>;
    } = {}
  ): Promise<ApiResponse<T>> => {
    const { method = 'GET', body, headers = {} } = options;

    // Get auth token from both cookie and localStorage for compatibility
    const tokenCookie = useCookie('auth_token');
    const authToken = process.client 
      ? (localStorage.getItem('auth_token') || tokenCookie.value) 
      : tokenCookie.value;
    
    // Debug token info
    if (process.client) {
      console.log(`API Request to ${endpoint}`);
      console.log(`- Token from localStorage: ${localStorage.getItem('auth_token') ? 'Found' : 'Not found'}`);
      console.log(`- Token from cookie: ${tokenCookie.value ? 'Found' : 'Not found'}`);
      console.log(`- Using token: ${authToken ? 'Yes' : 'No'}`);
      
      // If no token for non-auth endpoint, show warning
      if (!authToken && !endpoint.includes('/auth/')) {
        console.warn(`No auth token available for protected endpoint: ${endpoint}`);
        console.log('Local storage keys:', Object.keys(localStorage));
      }
    }
    
    // If using admin bypass token, return mock responses for auth-related endpoints
    if (authToken && authToken.startsWith('admin-local-bypass-token')) {
      console.log(`Using admin bypass for endpoint: ${endpoint}`);
      
      // Handle auth profile request
      if (endpoint === '/auth/profile') {
        return {
          data: {
            email: 'admin@local',
            name: 'Local Admin',
            role: 'admin'
          } as T,
          status: 200,
        };
      }
      
      // Handle user profile request
      if (endpoint === '/user/profile' || endpoint === '/users/profile') {
        return {
          data: {
            email: 'admin@local',
            name: 'Local Admin',
            role: 'admin'
          } as T,
          status: 200,
        };
      }
      
      // Mock user data for /users/me endpoint when using admin bypass
      if (endpoint === '/users/me') {
        return {
          data: {
            id: 'admin-user-id',
            email: 'admin@local',
            firstName: 'Admin',
            lastName: 'User',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            wishlist: [],
            bankRecommendations: []
          } as T,
          status: 200,
        };
      }
      
      // Handle other endpoints with mock data
      if (endpoint === '/auth/logout') {
        return {
          data: { message: 'Logged out successfully' } as unknown as T,
          status: 200,
        };
      }
    }

    try {
      const requestHeaders = {
        'Content-Type': 'application/json',
        ...(authToken ? { 'Authorization': `Bearer ${authToken}` } : {}),
        ...headers,
      };
      
      // Log the final headers for debugging
      console.log(`API Request headers for ${endpoint}:`, requestHeaders);
      
      // Set credentials to include for cookies
      const { data, error } = await useFetch(`${baseUrl}${endpoint}`, {
        method,
        body,
        headers: requestHeaders,
        credentials: 'include'
      });

      if (error.value) {
        console.error(`API error for ${endpoint}:`, error.value);
        
        // For users/me, return mock data instead of error
        if (endpoint === '/users/me' && process.client) {
          console.log('Returning mock user data for /users/me due to error');
          return {
            data: {
              id: 'mock-user-id',
              email: 'mock@example.com',
              firstName: 'Mock',
              lastName: 'User',
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              wishlist: [],
              bankRecommendations: []
            } as T,
            status: 200
          };
        }
        
        return {
          error: error.value?.message || 'An error occurred',
          status: error.value?.statusCode || 500,
        };
      }

      return {
        data: data.value as T,
        status: 200,
      };
    } catch (err: any) {
      console.error(`Exception in API request to ${endpoint}:`, err);
      
      // For users/me, return mock data instead of error
      if (endpoint === '/users/me' && process.client) {
        console.log('Returning mock user data for /users/me due to exception');
        return {
          data: {
            id: 'mock-user-id-exception',
            email: 'mock-exception@example.com',
            firstName: 'Mock',
            lastName: 'User',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            wishlist: [],
            bankRecommendations: []
          } as T,
          status: 200
        };
      }
      
      return {
        error: err.message || 'An error occurred',
        status: err.statusCode || 500,
      };
    }
  };

  // HTTP method wrappers
  const get = <T>(endpoint: string, headers?: Record<string, string>) =>
    request<T>(endpoint, { method: 'GET', headers });

  const post = <T>(endpoint: string, body: any, headers?: Record<string, string>) =>
    request<T>(endpoint, { method: 'POST', body, headers });

  const put = <T>(endpoint: string, body: any, headers?: Record<string, string>) =>
    request<T>(endpoint, { method: 'PUT', body, headers });

  const del = <T>(endpoint: string, headers?: Record<string, string>) =>
    request<T>(endpoint, { method: 'DELETE', headers });

  return {
    request,
    get,
    post,
    put,
    delete: del,
  };
}; 