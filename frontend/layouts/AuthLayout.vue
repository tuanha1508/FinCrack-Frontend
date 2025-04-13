<template>
  <div class="min-h-screen bg-black flex flex-col md:flex-row">
    <!-- Left side: branding and background -->
    <div class="w-full md:w-1/2 hidden md:flex items-center justify-center bg-gradient-to-r from-gray-900 to-black p-6">
      <div class="max-w-md">
        <h1 class="text-4xl font-bold text-white mb-6">FinCrack</h1>
        <p class="text-gray-300 text-xl leading-relaxed mb-8">Your Financial Journey Starts Here.</p>
        <div class="space-y-4 text-gray-400">
          <div class="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <span>Smart Financial Analytics</span>
          </div>
          <div class="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <span>Personalized Investment Strategies</span>
          </div>
          <div class="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <span>Secure and Private</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Right side: authentication forms -->
    <div class="w-full md:w-1/2 flex items-center justify-center p-6">
      <div class="w-full max-w-md bg-black border border-gray-800 rounded-lg">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Auth layout is a wrapper for authentication pages
</script>

<style scoped>
/* Add any auth layout specific styles here */
</style> 