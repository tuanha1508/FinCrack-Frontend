<template>
  <footer :class="isDark ? 'bg-black border-gray-800' : 'bg-white border-gray-200'" class="border-t py-2">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-5 gap-0.5">
        <!-- Logo column -->
        <div class="flex items-center justify-center md:justify-start">
          <div :class="isDark ? 'bg-white' : 'bg-black'" class="rounded-full inline-block p-1">
            <svg width="30" height="30" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6">
              <circle cx="30" cy="30" r="30" :fill="isDark ? 'white' : 'black'"/>
              <text x="50%" y="25%" text-anchor="middle" dominant-baseline="middle" font-weight="bold" font-size="6" :fill="isDark ? 'black' : 'white'">USE</text>
              <path d="M30 40C35.5228 40 40 35.5228 40 30C40 24.4772 35.5228 20 30 20C24.4772 20 20 24.4772 20 30C20 35.5228 24.4772 40 30 40Z" fill="none" :stroke="isDark ? 'black' : 'white'" stroke-width="2"/>
              <text x="50%" y="70%" text-anchor="middle" dominant-baseline="middle" font-weight="bold" font-size="6" :fill="isDark ? 'black' : 'white'">PARKING</text>
            </svg>
          </div>
        </div>
        
        <!-- Features column -->
        <div>
          <h4 :class="isDark ? 'text-white' : 'text-black'" class="font-medium mb-2 text-xs">Features</h4>
          <ul class="space-y-1">
            <li><NuxtLink to="/plan" :class="isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'" class="transition-colors text-[10px]">Plan</NuxtLink></li>
            <li><NuxtLink to="/build" :class="isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'" class="transition-colors text-[10px]">Build</NuxtLink></li>
            <li><NuxtLink to="/insights" :class="isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'" class="transition-colors text-[10px]">Insights</NuxtLink></li>
          </ul>
        </div>
        
        <!-- Product column -->
        <div>
          <h4 :class="isDark ? 'text-white' : 'text-black'" class="font-medium mb-2 text-xs">Product</h4>
          <ul class="space-y-1">
            <li><NuxtLink to="/pricing" :class="isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'" class="transition-colors text-[10px]">Pricing</NuxtLink></li>
            <li><NuxtLink to="/method" :class="isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'" class="transition-colors text-[10px]">Method</NuxtLink></li>
            <li><NuxtLink to="/integrations" :class="isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'" class="transition-colors text-[10px]">Integrations</NuxtLink></li>
          </ul>
        </div>
        
        <!-- Company column -->
        <div>
          <h4 :class="isDark ? 'text-white' : 'text-black'" class="font-medium mb-2 text-xs">Company</h4>
          <ul class="space-y-1">
            <li><NuxtLink to="/about" :class="isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'" class="transition-colors text-[10px]">About</NuxtLink></li>
            <li><NuxtLink to="/customers" :class="isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'" class="transition-colors text-[10px]">Customers</NuxtLink></li>
            <li><NuxtLink to="/careers" :class="isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'" class="transition-colors text-[10px]">Careers</NuxtLink></li>
          </ul>
        </div>
        
        <!-- Resources column -->
        <div>
          <h4 :class="isDark ? 'text-white' : 'text-black'" class="font-medium mb-2 text-xs">Resources</h4>
          <ul class="space-y-1">
            <li><NuxtLink to="/api" :class="isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'" class="transition-colors text-[10px]">API</NuxtLink></li>
            <li><NuxtLink to="/status" :class="isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'" class="transition-colors text-[10px]">Status</NuxtLink></li>
            <li><NuxtLink to="/documentation" :class="isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'" class="transition-colors text-[10px]">Documentation</NuxtLink></li>
          </ul>
        </div>
      </div>
      
      <!-- Footer bottom section -->
      <div class="mt-4 pt-2 flex flex-col md:flex-row justify-center items-center gap-2">
        <p :class="isDark ? 'text-gray-400' : 'text-gray-600'" class="text-[9px] text-center">&copy; {{ currentYear }} FinCrack. All rights reserved.</p>
        
        <!-- Social links -->
        <div class="flex space-x-3 ml-0 md:ml-4">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" :class="isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'" class="transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" :class="isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'" class="transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" :class="isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'" class="transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useTheme } from '@/composables/useTheme';

// Get theme state
const { isDark } = useTheme();

// Use computed property for consistent year rendering
const currentYear = computed(() => new Date().getFullYear());
</script> 