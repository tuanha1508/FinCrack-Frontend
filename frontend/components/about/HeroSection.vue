<template>
  <section class="py-12 md:py-20 px-8 overflow-hidden relative">
    <div class="absolute inset-0 z-0" :class="isDark ? 'bg-black' : 'bg-white'"></div>
    
    <div class="container mx-auto relative z-10">
      <div class="flex flex-col lg:flex-row items-center gap-10">
        <div class="lg:w-1/2 space-y-5">
          <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight" :class="isDark ? 'text-white' : 'text-black'">
            <span class="block">Finance Simplified</span>
            <span class="bg-clip-text text-transparent animate-gradient relative" 
                  :class="isDark ? 'bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600' : 
                  'bg-gradient-to-r from-blue-600 via-indigo-700 to-purple-800'">
              Success Amplified
              <span class="absolute -bottom-1 left-0 w-full h-0.5 animate-pulse rounded-full"
                    :class="isDark ? 'bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600' : 
                    'bg-gradient-to-r from-blue-600 via-indigo-700 to-purple-800'"></span>
            </span>
          </h1>
          <p class="text-base max-w-lg" :class="isDark ? 'text-white' : 'text-black'">
            Manage your investments, track performance, and make smarter financial decisions with our modern platform.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 pt-3 items-center">
            <button :class="isDark ? 'bg-white text-black hover:bg-gray-100' : 'bg-black text-white hover:bg-gray-800'" 
                    class="font-medium px-4 py-1.5 text-xs rounded-full transition-colors text-center min-w-[90px]">
              Get Started
            </button>
            <a href="#" class="text-xs group relative inline-block" :class="isDark ? 'text-white' : 'text-black'">
              See Demo 
              <span class="ml-1 group-hover:translate-x-1 transition-transform inline-block">→</span>
              <span class="absolute left-0 bottom-0 h-px w-0 transition-all duration-300 group-hover:w-full rounded-full"
                    :class="isDark ? 'bg-white' : 'bg-black'"></span>
            </a>
          </div>
        </div>
        
        <div class="lg:w-1/2 rounded-xl overflow-hidden shadow-2xl" 
             :class="isDark ? 'border border-white shadow-white/10' : 'border border-gray-300 shadow-black/10'">
          <div class="rounded-t-xl border-b p-3" 
               :class="isDark ? 'bg-black border-white' : 'bg-white border-gray-300'">
            <div class="flex space-x-2">
              <div class="w-2.5 h-2.5 rounded-full bg-red-500"></div>
              <div class="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
              <div class="w-2.5 h-2.5 rounded-full bg-green-500"></div>
            </div>
          </div>
          <div class="p-5 overflow-hidden" :class="isDark ? 'bg-black' : 'bg-white'">
            <!-- Portfolio Preview -->
            <div class="space-y-3">
              <div class="flex justify-between items-center">
                <h3 class="text-base font-medium" :class="isDark ? 'text-white' : 'text-black'">Your Portfolio</h3>
                <span class="font-medium text-sm" :class="isDark ? 'text-white' : 'text-black'">+12.42%</span>
              </div>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div class="stat-card" :class="isDark ? 'bg-black' : 'bg-white'">
                  <div class="stat-title text-xs" :class="isDark ? 'text-gray-400' : 'text-gray-600'">Total Value</div>
                  <div class="stat-value text-base" :class="isDark ? 'text-white' : 'text-black'">$124,582.43</div>
                  <div class="stat-desc flex items-center space-x-1 text-xs">
                    <span :class="isDark ? 'text-white' : 'text-black'">+$1,245.34 (2.4%)</span>
                    <span :class="isDark ? 'text-gray-400' : 'text-gray-600'">today</span>
                  </div>
                </div>
                
                <div class="stat-card" :class="isDark ? 'bg-black' : 'bg-white'">
                  <div class="stat-title text-xs" :class="isDark ? 'text-gray-400' : 'text-gray-600'">Investments</div>
                  <div class="stat-value text-base" :class="isDark ? 'text-white' : 'text-black'">12</div>
                  <div class="stat-desc text-xs" :class="isDark ? 'text-gray-400' : 'text-gray-600'">across 4 accounts</div>
                </div>
              </div>
              
              <div class="rounded-lg p-3 space-y-3" 
                   :class="isDark ? 'bg-black border border-white' : 'bg-white border border-gray-300'">
                <!-- Investment items -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useTheme } from '@/composables/useTheme';

// Get theme state
const { isDark } = useTheme();
</script>

<style scoped>
@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.animate-gradient {
  background-size: 200% 200%;
  animation: gradient 3s ease infinite;
}
</style> 