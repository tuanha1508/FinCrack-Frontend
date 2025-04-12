import { defineNuxtRouteMiddleware, navigateTo, useAuth } from '#imports';
import type { RouteLocationNormalized } from 'vue-router';

/**
 * Authentication middleware
 * Redirects unauthenticated users to login page
 * Redirects authenticated users away from auth pages
 */
export default defineNuxtRouteMiddleware((to: RouteLocationNormalized) => {
  // Skip middleware in server side rendering
  if (process.server) return;
  
  const { isAuthenticated } = useAuth();
  const authPages = ['/sign-in', '/sign-up', '/forgot-password'];
  
  // Debug auth state for troubleshooting
  console.log(`Route: ${to.path}, Auth state: ${isAuthenticated.value}`);
  
  // If route is an auth page and user is authenticated, redirect to dashboard
  if (authPages.includes(to.path) && isAuthenticated.value) {
    console.log('Redirecting authenticated user from auth page to dashboard');
    return navigateTo('/dashboard');
  }
  
  // If route requires auth and user is not authenticated, redirect to login
  if (to.meta.requiresAuth && !isAuthenticated.value) {
    console.log('Redirecting unauthenticated user to login');
    return navigateTo('/sign-in');
  }
}); 