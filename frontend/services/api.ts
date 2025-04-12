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

    try {
      const { data, error } = await useFetch(`${baseUrl}${endpoint}`, {
        method,
        body,
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
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