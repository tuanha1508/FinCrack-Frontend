<template>
  <section class="py-16 px-4" :class="isDark ? 'bg-black' : 'bg-white'">
    <div class="container mx-auto">
      <div class="text-center max-w-3xl mx-auto mb-12">
        <h2 class="text-3xl font-bold mb-6" :class="isDark ? 'text-white' : 'text-black'">Powerful Dashboard Features</h2>
        <p class="text-lg" :class="isDark ? 'text-white' : 'text-black'">
          Our comprehensive suite of financial tools helps you take control of your finances with ease.
        </p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- Feature 1: Virtual Assistant -->
        <div class="p-6 rounded-xl transition-all" :class="isDark ? 'bg-white/5 hover:bg-white/10' : 'bg-black/5 hover:bg-black/10'">
          <div class="flex items-center gap-4 mb-4">
            <div class="w-12 h-12 rounded-full flex items-center justify-center" :class="isDark ? 'bg-white/10' : 'bg-black/10'">
              <Icon name="lucide:bot" class="w-6 h-6" :class="isDark ? 'text-white' : 'text-black'" />
            </div>
            <h3 class="text-xl font-bold" :class="isDark ? 'text-white' : 'text-black'">Virtual Assistant</h3>
          </div>
          <p class="text-base mb-4" :class="isDark ? 'text-white' : 'text-black'">
            Get personalized financial advice and answers to your questions with our AI-powered assistant.
          </p>
          <div class="flex items-center">
            <NuxtLink to="/dashboard/virtual-assistant" class="text-sm font-medium inline-flex items-center gap-1 transition-all" 
                     :class="isDark ? 'text-white hover:opacity-80' : 'text-black hover:opacity-80'">
              Try it now 
              <Icon name="lucide:arrow-right" class="w-4 h-4" />
            </NuxtLink>
          </div>
        </div>
        
        <!-- Feature 2: Analytics -->
        <div class="p-6 rounded-xl transition-all" :class="isDark ? 'bg-white/5 hover:bg-white/10' : 'bg-black/5 hover:bg-black/10'">
          <div class="flex items-center gap-4 mb-4">
            <div class="w-12 h-12 rounded-full flex items-center justify-center" :class="isDark ? 'bg-white/10' : 'bg-black/10'">
              <Icon name="lucide:bar-chart-2" class="w-6 h-6" :class="isDark ? 'text-white' : 'text-black'" />
            </div>
            <h3 class="text-xl font-bold" :class="isDark ? 'text-white' : 'text-black'">Financial Analytics</h3>
          </div>
          <p class="text-base mb-4" :class="isDark ? 'text-white' : 'text-black'">
            Visualize your financial data with powerful charts and insights to make informed decisions.
          </p>
          <div class="flex items-center">
            <NuxtLink to="/dashboard/analytics" class="text-sm font-medium inline-flex items-center gap-1 transition-all" 
                     :class="isDark ? 'text-white hover:opacity-80' : 'text-black hover:opacity-80'">
              View analytics 
              <Icon name="lucide:arrow-right" class="w-4 h-4" />
            </NuxtLink>
          </div>
        </div>
        
        <!-- Feature 3: Recommendations -->
        <div class="p-6 rounded-xl transition-all" :class="isDark ? 'bg-white/5 hover:bg-white/10' : 'bg-black/5 hover:bg-black/10'">
          <div class="flex items-center gap-4 mb-4">
            <div class="w-12 h-12 rounded-full flex items-center justify-center" :class="isDark ? 'bg-white/10' : 'bg-black/10'">
              <Icon name="lucide:lightbulb" class="w-6 h-6" :class="isDark ? 'text-white' : 'text-black'" />
            </div>
            <h3 class="text-xl font-bold" :class="isDark ? 'text-white' : 'text-black'">Smart Recommendations</h3>
          </div>
          <p class="text-base mb-4" :class="isDark ? 'text-white' : 'text-black'">
            Receive personalized banking and service recommendations based on your financial profile.
          </p>
          <div class="flex items-center">
            <NuxtLink to="/dashboard/recommendations" class="text-sm font-medium inline-flex items-center gap-1 transition-all" 
                     :class="isDark ? 'text-white hover:opacity-80' : 'text-black hover:opacity-80'">
              Get recommendations 
              <Icon name="lucide:arrow-right" class="w-4 h-4" />
            </NuxtLink>
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