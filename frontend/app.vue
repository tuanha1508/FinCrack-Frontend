<template>
  <div class="min-h-screen" :class="isDark ? 'bg-black text-white' : 'bg-white text-black'">
    <NuxtLayout>
      <div class="page-container relative">
        <NuxtPage />
      </div>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { useTheme } from '@/composables/useTheme';

// Get theme state
const { isDark } = useTheme();
</script>

<style>
.page-container {
  min-height: 70vh; /* Ensure container has sufficient height */
}
</style> 