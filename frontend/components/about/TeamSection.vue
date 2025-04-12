<template>
  <section class="py-16 px-4" :class="isDark ? 'bg-black' : 'bg-white'">
    <div class="container mx-auto">
      <div class="text-center max-w-3xl mx-auto mb-12">
        <h2 class="text-3xl font-bold mb-6" :class="isDark ? 'text-white' : 'text-black'">Meet Our Team</h2>
        <p class="text-lg" :class="isDark ? 'text-white' : 'text-gray-700'">
          We're a diverse team of financial experts, engineers, and designers passionate about making finance accessible to everyone.
        </p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <!-- Team Member 1 -->
        <div class="text-center">
          <div class="w-32 h-32 rounded-full mx-auto mb-4 overflow-hidden" :class="isDark ? 'bg-white/20' : 'bg-black/10'">
            <!-- Team member photo placeholder -->
          </div>
          <h3 class="text-xl font-bold" :class="isDark ? 'text-white' : 'text-black'">Sarah Johnson</h3>
          <p class="mb-2" :class="isDark ? 'text-white' : 'text-gray-700'">CEO & Founder</p>
          <p class="text-sm" :class="isDark ? 'text-white' : 'text-gray-600'">Former investment banker with 15+ years of experience in financial markets.</p>
        </div>
        
        <!-- Team Member 2 -->
        <div class="text-center">
          <div class="w-32 h-32 rounded-full mx-auto mb-4 overflow-hidden" :class="isDark ? 'bg-white/20' : 'bg-black/10'">
            <!-- Team member photo placeholder -->
          </div>
          <h3 class="text-xl font-bold" :class="isDark ? 'text-white' : 'text-black'">Michael Chen</h3>
          <p class="mb-2" :class="isDark ? 'text-white' : 'text-gray-700'">CTO</p>
          <p class="text-sm" :class="isDark ? 'text-white' : 'text-gray-600'">Fintech pioneer with expertise in building scalable financial platforms.</p>
        </div>
        
        <!-- Team Member 3 -->
        <div class="text-center">
          <div class="w-32 h-32 rounded-full mx-auto mb-4 overflow-hidden" :class="isDark ? 'bg-white/20' : 'bg-black/10'">
            <!-- Team member photo placeholder -->
          </div>
          <h3 class="text-xl font-bold" :class="isDark ? 'text-white' : 'text-black'">Aisha Patel</h3>
          <p class="mb-2" :class="isDark ? 'text-white' : 'text-gray-700'">Head of Product</p>
          <p class="text-sm" :class="isDark ? 'text-white' : 'text-gray-600'">Product visionary focused on creating intuitive financial tools.</p>
        </div>
        
        <!-- Team Member 4 -->
        <div class="text-center">
          <div class="w-32 h-32 rounded-full mx-auto mb-4 overflow-hidden" :class="isDark ? 'bg-white/20' : 'bg-black/10'">
            <!-- Team member photo placeholder -->
          </div>
          <h3 class="text-xl font-bold" :class="isDark ? 'text-white' : 'text-black'">James Wilson</h3>
          <p class="mb-2" :class="isDark ? 'text-white' : 'text-gray-700'">Lead Data Scientist</p>
          <p class="text-sm" :class="isDark ? 'text-white' : 'text-gray-600'">Financial analyst with a PhD in machine learning and financial modeling.</p>
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