import { defineNuxtPlugin, addRouteMiddleware } from '#imports';

export default defineNuxtPlugin(() => {
  // Override the existing manifest-route-rule middleware
  addRouteMiddleware('manifest-route-rule', () => {
    // This is an empty middleware that overrides the built-in one
  }, { global: true, override: true });
}); 