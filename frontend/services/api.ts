import { useFetch, useRuntimeConfig } from '#imports';

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
  const baseUrl = config.public.apiBaseUrl || '/api';

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
    const authToken = process.client ? localStorage.getItem('auth_token') : null;
    
    // Debug token info
    if (process.client) {
      if (authToken) {
        console.log(`API Request to ${endpoint} with token: ${authToken.substring(0, 10)}...`);
      } else {
        console.log(`API Request to ${endpoint} with NO token found in localStorage`);
        
        // Attempt to set token again for debugging
        if (endpoint.includes('/auth/login') || endpoint.includes('/auth/signup')) {
          console.log('This is a login/signup request, no token expected');
        } else {
          console.log('Non-auth request without token - this might indicate an authentication issue');
        }
      }
    }
    
    // If using admin bypass token, return mock responses for auth-related endpoints
    // Use startsWith to handle tokens with timestamps
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
      if (endpoint === '/user/profile') {
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
      if (endpoint === '/user/dashboard') {
        return {
          data: {
            id: 'admin-local',
            name: 'Local Admin',
            email: 'admin@local',
            accountInfo: {
              createdAt: new Date().toISOString(),
              lastLogin: new Date().toISOString(),
              status: 'active'
            },
            dashboardData: {
              accountBalance: 100000,
              savingsGoal: 250000,
              recentTransactions: [],
              investmentPerformance: {
                totalValue: 75000,
                changePercent: 5.2,
                changeAmount: 3700
              }
            }
          } as unknown as T,
          status: 200,
        };
      }
      
      // Handle logout request
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
      
      const { data, error } = await useFetch(`${baseUrl}${endpoint}`, {
        method,
        body,
        headers: requestHeaders,
      });

      if (error.value) {
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