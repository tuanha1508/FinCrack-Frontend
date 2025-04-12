<template>
  <div class="flex flex-col gap-3 mb-5">
    <p :class="isDark ? 'text-gray-500' : 'text-gray-600'" class="text-center text-xs">Or continue with</p>
    <div class="flex justify-center gap-3">
      <button 
        type="button" 
        :class="isDark ? 'border-gray-700 hover:bg-gray-900' : 'border-gray-300 hover:bg-gray-100'"
        class="p-2 rounded-full border transition-all"
        @click="$emit('google-auth')"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 30 30" fill="none" :class="isDark ? 'text-white' : 'text-black'">
          <path d="M15.00391,3c-6.629,0 -12.00391,5.373 -12.00391,12c0,6.627 5.37491,12 12.00391,12c10.01,0 12.26517,-9.293 11.32617,-14h-1.33008h-2.26758h-7.73242v4h7.73828c-0.88958,3.44825 -4.01233,6 -7.73828,6c-4.418,0 -8,-3.582 -8,-8c0,-4.418 3.582,-8 8,-8c2.009,0 3.83914,0.74575 5.24414,1.96875l2.8418,-2.83984c-2.134,-1.944 -4.96903,-3.12891 -8.08203,-3.12891z" :fill="isDark ? '#ffffff' : '#000000'"></path>
        </svg>
      </button>
      <button 
        type="button" 
        :class="isDark ? 'border-gray-700 hover:bg-gray-900' : 'border-gray-300 hover:bg-gray-100'"
        class="p-2 rounded-full border transition-all"
        v-if="showGithub"
        @click="$emit('github-auth')"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" :class="isDark ? 'text-white' : 'text-black'">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M12 0C5.37 0 0 5.37 0 12C0 17.31 3.435 21.795 8.205 23.385C8.805 23.49 9.03 23.13 9.03 22.815C9.03 22.53 9.015 21.585 9.015 20.58C6 21.135 5.22 19.845 4.98 19.17C4.845 18.825 4.26 17.76 3.75 17.475C3.33 17.25 2.73 16.695 3.735 16.68C4.68 16.665 5.355 17.55 5.58 17.91C6.66 19.725 8.385 19.215 9.075 18.9C9.18 18.12 9.495 17.595 9.84 17.295C7.17 16.995 4.38 15.96 4.38 11.37C4.38 10.065 4.845 8.985 5.61 8.145C5.49 7.845 5.07 6.615 5.73 4.965C5.73 4.965 6.735 4.65 9.03 6.195C9.99 5.925 11.01 5.79 12.03 5.79C13.05 5.79 14.07 5.925 15.03 6.195C17.325 4.635 18.33 4.965 18.33 4.965C18.99 6.615 18.57 7.845 18.45 8.145C19.215 8.985 19.68 10.05 19.68 11.37C19.68 15.975 16.875 16.995 14.205 17.295C14.64 17.67 15.015 18.39 15.015 19.515C15.015 21.12 15 22.41 15 22.815C15 23.13 15.225 23.505 15.825 23.385C18.2072 22.5807 20.2772 21.0497 21.7437 19.0074C23.2101 16.965 23.9993 14.5143 24 12C24 5.37 18.63 0 12 0Z" :fill="isDark ? '#ffffff' : '#000000'" />
        </svg>
      </button>
      <button 
        type="button" 
        :class="isDark ? 'border-gray-700 hover:bg-gray-900' : 'border-gray-300 hover:bg-gray-100'"
        class="p-2 rounded-full border transition-all"
        v-if="showFacebook"
        @click="$emit('facebook-auth')"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 30 30" fill="none" :class="isDark ? 'text-white' : 'text-black'">
          <path d="M15,3c-6.627,0 -12,5.373 -12,12c0,6.016 4.432,10.984 10.206,11.852v-8.672h-2.969v-3.154h2.969v-2.099c0,-3.475 1.693,-5 4.581,-5c1.383,0 2.115,0.103 2.461,0.149v2.753h-1.97c-1.226,0 -1.654,1.163 -1.654,2.473v1.724h3.593l-0.487,3.154h-3.106v8.697c5.857,-0.794 10.376,-5.802 10.376,-11.877c0,-6.627 -5.373,-12 -12,-12z" :fill="isDark ? '#ffffff' : '#000000'"></path>
        </svg>
      </button>
      <button 
        type="button" 
        :class="isDark ? 'border-gray-700 hover:bg-gray-900' : 'border-gray-300 hover:bg-gray-100'"
        class="p-2 rounded-full border transition-all"
        v-if="showTwitter"
        @click="$emit('twitter-auth')"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" :class="isDark ? 'text-white' : 'text-black'">
          <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTheme } from '@/composables/useTheme';

// Get theme state
const { isDark } = useTheme();

defineProps({
  showGithub: {
    type: Boolean,
    default: true
  },
  showFacebook: {
    type: Boolean,
    default: true
  },
  showTwitter: {
    type: Boolean,
    default: true
  }
});

defineEmits<{
  (e: 'google-auth'): void
  (e: 'github-auth'): void
  (e: 'facebook-auth'): void
  (e: 'twitter-auth'): void
}>();
</script> 