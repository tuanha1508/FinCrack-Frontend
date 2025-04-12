<template>
  <div class="min-h-screen" :class="isDark ? 'bg-black' : 'bg-white'">
    <!-- Hero section with large brand name -->
    <section class="container mx-auto px-4 h-screen flex flex-col items-center justify-start pt-50">
      <h1 class="text-8xl md:text-[10rem] lg:text-[12rem] font-bold text-center tracking-tight font-gugi" 
          :class="isDark ? 'text-white' : 'text-black'">
        FinHack
      </h1>
      <div class="mt-12 flex flex-row gap-6">
        <router-link to="/sign-in" 
                     :class="isDark ? 'bg-white text-black hover:bg-gray-100' : 'bg-black text-white hover:bg-gray-800'" 
                     class="px-8 h-8 font-medium rounded-full transition-colors flex items-center justify-center">
          Try here
        </router-link>
        <router-link to="/about" class="group px-6 h-8 font-medium flex items-center relative"
                      :class="isDark ? 'text-white' : 'text-black'">
          <span class="relative">
            See what we have now
            <span class="absolute h-0.5 w-0 left-1/2 -translate-x-1/2 bottom-0 group-hover:w-full transition-all duration-300 rounded-full"
                  :class="isDark ? 'bg-white' : 'bg-black'"></span>
          </span>
          <span class="ml-2">→</span>
        </router-link>
      </div>
    </section>
    <!-- The navbar and footer are provided by the default layout -->
  </div>
</template>

<script setup lang="ts">
import { useTheme } from '@/composables/useTheme';

// Get theme state
const { isDark } = useTheme();
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Gugi&display=swap');
.font-gugi {
  font-family: 'Gugi', cursive;
}
</style> 