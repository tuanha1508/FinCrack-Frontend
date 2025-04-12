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
  
  // TODO: Set up HTTP interceptors for auth token
  // This would be added once the backend is implemented
}); 