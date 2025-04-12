<template>
  <div class="w-full p-6" :class="isDark ? 'text-white' : 'text-black'">
    <h1 class="text-xl font-bold mb-1.5 tracking-tight">{{ title }}</h1>
    <p :class="isDark ? 'text-gray-400' : 'text-gray-600'" class="mb-5 text-xs leading-relaxed">{{ subtitle }}</p>

    <slot />

    <div v-if="showAuthLinks" class="text-center text-xs">
      <template v-if="isLogin">
        Don't have an account? <NuxtLink to="/sign-up" class="font-semibold relative animated-underline" :class="isDark ? 'text-white' : 'text-black'">Sign up</NuxtLink>
      </template>
      <template v-else>
        Already have an account? <NuxtLink to="/sign-in" class="font-semibold relative animated-underline" :class="isDark ? 'text-white' : 'text-black'">Sign in</NuxtLink>
      </template>
    </div>
  </div>
</template>

<style scoped>
.animated-underline {
  display: inline-block;
}

.animated-underline::after {
  content: '';
  position: absolute;
  width: 0;
  height: 1px;
  bottom: 0;
  left: 0;
  background-color: v-bind('isDark ? "white" : "black"');
  transition: width 0.3s ease;
}

.animated-underline:hover::after {
  width: 100%;
}
</style>

<script setup lang="ts">
import { useTheme } from '@/composables/useTheme';

// Get theme state
const { isDark } = useTheme();

defineProps({
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    required: true
  },
  isLogin: {
    type: Boolean,
    default: true
  },
  showAuthLinks: {
    type: Boolean,
    default: true
  }
});
</script> 