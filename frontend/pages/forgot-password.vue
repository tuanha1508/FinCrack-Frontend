<template>
  <div class="min-h-screen flex items-center justify-center px-4 py-12" :class="isDark ? 'bg-black' : 'bg-white'">
    <div class="w-full max-w-[450px]">
      <div class="rounded-2xl shadow-xl overflow-hidden" :class="isDark ? 'bg-black' : 'bg-white'">
        <ForgotPasswordForm />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { definePageMeta } from '#imports';
import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm.vue';
import { useTheme } from '@/composables/useTheme';

// Get theme state
const { isDark } = useTheme();

definePageMeta({
  layout: 'default',
  pageTransition: {
    name: 'fade',
    mode: 'default',
    appear: true
  }
});
</script> 