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
                <!-- Dashboard preview image or mockup -->
                <div class="aspect-video" 
                     :class="isDark ? 'bg-white/5' : 'bg-black/5'">
                  <div class="absolute inset-0 flex items-center justify-center">
                    <div class="text-center">
                      <Icon name="lucide:layout-dashboard" class="w-16 h-16 mx-auto mb-2" 
                           :class="isDark ? 'text-white/70' : 'text-black/70'" />
                      <p class="text-sm font-medium" :class="isDark ? 'text-white' : 'text-black'">
                        Dashboard Preview
                      </p>
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