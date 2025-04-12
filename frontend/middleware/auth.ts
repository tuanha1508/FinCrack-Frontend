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
  
  // If route is an auth page and user is authenticated, redirect to home
  if (authPages.includes(to.path) && isAuthenticated.value) {
    return navigateTo('/');
  }
  
  // If route requires auth and user is not authenticated, redirect to login
  if (to.meta.requiresAuth && !isAuthenticated.value) {
    return navigateTo('/sign-in');
  }
}); 