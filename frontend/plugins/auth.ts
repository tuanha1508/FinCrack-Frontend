import { defineNuxtPlugin } from '#imports';
import type { NuxtApp } from 'nuxt/app';
import { useAuth } from '@/composables/useAuth';

/**
 * Auth plugin for Nuxt
 * Initializes authentication state from local storage
 * Sets up HTTP interceptors for auth token
 */
export default defineNuxtPlugin((nuxtApp: NuxtApp) => {
  // Skip on server
  if (process.server) return;
  
  // Get auth composable
  const { initAuth } = useAuth();
  
  // Initialize auth state
  initAuth();
  
  // Direct test of localStorage functionality
  if (process.client) {
    try {
      const testKey = 'auth_plugin_test';
      const testValue = `test_${Date.now()}`;
      
      // Try to store a test value
      localStorage.setItem(testKey, testValue);
      const retrieved = localStorage.getItem(testKey);
      
      console.log('Auth plugin localStorage test:', {
        success: testValue === retrieved,
        testValue,
        retrieved
      });
      
      // Clean up
      localStorage.removeItem(testKey);
      
      // Check if auth token already exists
      const authToken = localStorage.getItem('auth_token');
      console.log('Auth token on initialization:', authToken ? `${authToken.substring(0, 10)}...` : 'Not found');
      
    } catch (e) {
      console.error('Auth plugin localStorage test failed:', e);
    }
  }
  
  // Set up HTTP interceptors for auth token
  const TOKEN_KEY = 'auth_token';
  
  // Add interceptor to automatically attach the auth token to each request
  nuxtApp.hook('app:created', () => {
    if (process.client) {
      // Override fetch to add Authorization header
      const originalFetch = window.fetch;
      
      window.fetch = function(input, init) {
        const token = localStorage.getItem(TOKEN_KEY);
        
        if (token && init) {
          // Create headers if they don't exist
          if (!init.headers) {
            init.headers = {};
          }
          
          // Convert Headers object to plain object if needed
          if (init.headers instanceof Headers) {
            const plainHeaders: Record<string, string> = {};
            init.headers.forEach((value, key) => {
              plainHeaders[key] = value;
            });
            init.headers = plainHeaders;
          }
          
          // Add Authorization header with Bearer token
          init.headers = {
            ...init.headers as Record<string, string>,
            'Authorization': `Bearer ${token}`
          };
        }
        
        return originalFetch(input, init);
      };
      
      console.log('Auth token interceptor set up');
    }
  });
}); 