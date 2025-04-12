<template>
  <div class="flex flex-col min-h-screen" :class="isDark ? 'bg-black' : 'bg-white'">
    <AppHeader />
    
    <main class="flex-grow">
      <slot />
    </main>
    
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import AppHeader from '@/components/layout/AppHeader.vue';
import AppFooter from '@/components/layout/AppFooter.vue';
import { useTheme } from '@/composables/useTheme';

// Get theme state
const { isDark } = useTheme();
</script>

<style scoped>
/* Ensure consistent button styling */
.trial-button {
  background-color: transparent !important;  
  border: 1px solid !important;
  border-radius: 9999px !important;
}

.login-button {
  background-color: transparent !important;
  border: none !important;
}

.login-button:hover,
.login-button:focus,
.login-button:active,
.login-button:focus-visible {
  background-color: transparent !important;
  outline: none !important;
  box-shadow: none !important;
}

.nav-link {
  padding: 0.25rem 0.5rem;
}

.nav-link span {
  position: relative;
  display: inline-block;
}

.nav-link span::after {
  content: '';
  position: absolute;
  width: 0;
  height: 1px;
  bottom: -2px;
  left: 50%;
  background-color: v-bind('isDark ? "white" : "black"');
  transform: translateX(-50%);
  transition: width 0.3s ease;
  border-radius: 1px;
}

.nav-link:hover span::after {
  width: 100%;
}
</style> 