<template>
  <section class="py-16 px-4" :class="isDark ? 'bg-black' : 'bg-white'">
    <div class="container mx-auto">
      <div class="max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-xl" 
           :class="isDark ? 'bg-black border border-white/10' : 'bg-white border border-black/10'">
        <div class="p-8 md:p-12">
          <div class="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 class="text-3xl font-bold mb-4" :class="isDark ? 'text-white' : 'text-black'">
                Ready to Take Control of Your Finances?
              </h2>
              <p class="text-lg mb-6" :class="isDark ? 'text-white' : 'text-black'">
                Sign up now and get instant access to all our powerful dashboard features, intelligent recommendations, and financial insights.
              </p>
              <div class="flex flex-col sm:flex-row gap-4">
                <button class="px-6 py-3 rounded-full font-medium text-sm transition-all"
                        :class="isDark ? 'bg-white text-black hover:bg-white/90' : 'bg-black text-white hover:bg-black/90'">
                  Create Free Account
                </button>
                <NuxtLink to="/dashboard" 
                          class="px-6 py-3 rounded-full font-medium text-sm transition-all border"
                          :class="isDark ? 'border-white text-white hover:bg-white/10' : 'border-black text-black hover:bg-black/10'">
                  Explore Dashboard
                </NuxtLink>
              </div>
            </div>
            <div class="rounded-xl overflow-hidden shadow-lg" 
                 :class="isDark ? 'bg-black border border-white/20' : 'bg-white border border-black/10'">
              <div class="relative">
                <!-- Simplified Dashboard Mockup -->
                <div class="aspect-video flex flex-col overflow-hidden" 
                     :class="isDark ? 'bg-black' : 'bg-white'">
                  <!-- Header -->
                  <div class="h-4 px-2 flex items-center border-b" :class="isDark ? 'border-white/10' : 'border-black/10'">
                    <div class="flex space-x-1">
                      <div class="w-1.5 h-1.5 rounded-full bg-red-500"></div>
                      <div class="w-1.5 h-1.5 rounded-full bg-yellow-500"></div>
                      <div class="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                    </div>
                  </div>
                  <!-- Body with Sidebar & Content -->
                  <div class="flex-1 flex">
                    <!-- Sidebar -->
                    <div class="w-8 border-r" :class="isDark ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'">
                      <div class="h-4 w-4 mx-auto mt-2 rounded-full" :class="isDark ? 'bg-white/10' : 'bg-black/10'"></div>
                      <div class="space-y-1.5 mt-2 px-1.5">
                        <div class="h-1.5 w-full rounded-sm" :class="isDark ? 'bg-white/10' : 'bg-black/10'"></div>
                        <div class="h-1.5 w-3/4 rounded-sm" :class="isDark ? 'bg-white/10' : 'bg-black/10'"></div>
                        <div class="h-1.5 w-5/6 rounded-sm" :class="isDark ? 'bg-white/10' : 'bg-black/10'"></div>
                      </div>
                    </div>
                    <!-- Main Content Area -->
                    <div class="flex-1 p-2 space-y-2">
                      <!-- Small Chart Placeholder -->
                      <div class="h-6 rounded border" :class="isDark ? 'border-white/10' : 'border-black/10'">
                        <!-- Very simple line representation -->
                        <svg viewBox="0 0 50 10" class="w-full h-full">
                          <polyline points="2,8 10,3 20,6 30,4 40,7 48,5" 
                                    :stroke="isDark ? '#39FF14' : '#10B981'" 
                                    fill="none" stroke-width="0.5" />
                        </svg>
                      </div>
                      <!-- Data Blocks -->
                      <div class="grid grid-cols-2 gap-1">
                        <div class="h-4 rounded" :class="isDark ? 'bg-white/10' : 'bg-black/10'"></div>
                        <div class="h-4 rounded" :class="isDark ? 'bg-white/10' : 'bg-black/10'"></div>
                        <div class="h-4 rounded" :class="isDark ? 'bg-white/10' : 'bg-black/10'"></div>
                        <div class="h-4 rounded" :class="isDark ? 'bg-white/10' : 'bg-black/10'"></div>
                      </div>
                    </div>
                  </div>
                </div>
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