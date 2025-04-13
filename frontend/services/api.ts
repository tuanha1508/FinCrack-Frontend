import { useFetch, useRuntimeConfig } from '#imports';

// Define TOKEN_KEY to match the one in useAuth.ts
const TOKEN_KEY = 'auth_token';

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

    // Check for admin bypass token in localStorage
    const authToken = process.client ? localStorage.getItem(TOKEN_KEY) : null;
    
    // Debug token info - reduced logging
    if (process.client && !authToken && !endpoint.includes('/auth/login') && !endpoint.includes('/auth/signup')) {
      console.log(`API Request to ${endpoint} with no token - possible auth issue`);
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
      
      // Handle user dashboard data
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
      
      // Use native fetch instead of useFetch
      const response = await fetch(`${baseUrl}${endpoint}`, {
        method,
        body: body ? JSON.stringify(body) : undefined,
        headers: requestHeaders,
        credentials: 'include', // Include cookies if necessary
      });
      
      let data;
      let errorMessage;
      
      try {
        data = await response.json();
      } catch (e) {
        // Handle non-JSON responses
        const text = await response.text();
        errorMessage = text || 'Invalid response format';
      }
      
      if (!response.ok) {
        // Only log errors, not successful responses
        console.error(`API Error [${endpoint}] ${response.status}: ${data?.message || errorMessage || response.statusText}`);
        return {
          error: data?.message || errorMessage || `Error ${response.status}: ${response.statusText}`,
          status: response.status,
        };
      }

      return {
        data: data as T,
        status: response.status,
      };
    } catch (err: any) {
      console.error(`API Exception [${endpoint}]:`, err.message);
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