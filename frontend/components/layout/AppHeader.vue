<template>
  <header class="sticky top-0 z-50 w-full" :class="isDark ? 'bg-black' : 'bg-white'">
    <nav class="container px-4 py-2 mx-auto relative min-h-[56px]">
      <!-- Logo (Absolute Left) -->
      <div class="absolute left-4 top-1/2 -translate-y-1/2">
        <NuxtLink to="/" class="flex items-center gap-2 font-bold text-sm" :class="isDark ? 'text-white' : 'text-black'">
          FinHack
        </NuxtLink>
      </div>

      <!-- Desktop Menu Items (Absolute Center) -->
      <div class="hidden md:flex items-center gap-6 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <NuxtLink to="/" class="nav-link text-xs transition-all duration-300" :class="isDark ? 'text-white hover:text-gray-300' : 'text-black hover:text-gray-600'">
          <span>Home</span>
        </NuxtLink>
        <NuxtLink to="/about" class="nav-link text-xs transition-all duration-300" :class="isDark ? 'text-white hover:text-gray-300' : 'text-black hover:text-gray-600'">
          <span>About</span>
        </NuxtLink>
      </div>

      <!-- Buttons + Mobile Toggle Container (Absolute Right) -->
      <div class="absolute right-4 top-1/2 -translate-y-1/2 flex items-center">
        <!-- Desktop Buttons -->
        <div class="hidden md:flex items-center gap-3">
          <!-- Theme Toggle Button -->
          <button @click="toggleDarkMode" class="p-2 rounded-full focus:outline-none" 
                  :class="isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-200'">
            <svg v-if="isDark" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-white">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-black">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.718 9.718 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
            </svg>
          </button>
          
          <CustomButton variant="ghost" className="login-button" as-child>
            <NuxtLink to="/sign-in" class="flex items-center gap-2 font-bold text-xs" :class="isDark ? 'text-white' : 'text-black'">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="22" height="22" :class="isDark ? 'text-white' : 'text-black'">
                <path stroke-linecap="round" stroke-linejoin="round" d="M7.864 4.243A7.5 7.5 0 0 1 19.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 0 0 4.5 10.5a7.464 7.464 0 0 1-1.15 3.993m1.989 3.559A11.209 11.209 0 0 0 8.25 10.5a3.75 3.75 0 1 1 7.5 0c0 .527-.021 1.049-.064 1.565M12 10.5a14.94 14.94 0 0 1-3.6 9.75m6.633-4.596a18.666 18.666 0 0 1-2.485 5.33" />
              </svg>
              Login
            </NuxtLink>
          </CustomButton>
          <CustomButton variant="outline" className="trial-button" as-child>
            <NuxtLink to="/sign-up" :class="isDark ? 'text-white' : 'text-black'">
              <div class="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="18" height="18" class="inline-block" :class="isDark ? 'text-white' : 'text-black'">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z" />
                </svg>
                <span class="font-bold">Start your trial</span>
              </div>
            </NuxtLink>
          </CustomButton>
        </div>

        <!-- Mobile Menu Button -->
        <div class="md:hidden flex items-center">
          <button @click="toggleMobileMenu" :class="isDark ? 'text-white' : 'text-black'" class="focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>
      </div>
    </nav>

    <!-- Mobile Menu Dropdown -->
    <div v-show="isMobileMenuOpen" class="md:hidden absolute top-full left-0 right-0 shadow-lg pb-4" :class="isDark ? 'bg-black' : 'bg-white'">
      <div class="flex flex-col items-center gap-4 pt-4">
         <NuxtLink to="/" class="nav-link text-sm transition-all duration-300" :class="isDark ? 'text-white hover:text-gray-300' : 'text-black hover:text-gray-600'" @click="toggleMobileMenu">
          <span>Home</span>
        </NuxtLink>
        <NuxtLink to="/about" class="nav-link text-sm transition-all duration-300" :class="isDark ? 'text-white hover:text-gray-300' : 'text-black hover:text-gray-600'" @click="toggleMobileMenu">
          <span>About</span>
        </NuxtLink>
        
        <!-- Theme Toggle Button (Mobile) -->
        <button @click="toggleDarkMode" class="p-2 rounded-full focus:outline-none flex items-center gap-2"
                :class="isDark ? 'text-white hover:bg-gray-800' : 'text-black hover:bg-gray-200'">
          <svg v-if="isDark" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.718 9.718 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
          </svg>
          <span class="text-sm">Toggle Theme</span>
        </button>
        
        <CustomButton variant="ghost" className="login-button" as-child>
          <NuxtLink to="/sign-in" class="flex items-center gap-2 font-bold" @click="toggleMobileMenu" :class="isDark ? 'text-white' : 'text-black'">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="20" height="20" :class="isDark ? 'text-white' : 'text-black'">
              <path stroke-linecap="round" stroke-linejoin="round" d="M7.864 4.243A7.5 7.5 0 0 1 19.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 0 0 4.5 10.5a7.464 7.464 0 0 1-1.15 3.993m1.989 3.559A11.209 11.209 0 0 0 8.25 10.5a3.75 3.75 0 1 1 7.5 0c0 .527-.021 1.049-.064 1.565M12 10.5a14.94 14.94 0 0 1-3.6 9.75m6.633-4.596a18.666 18.666 0 0 1-2.485 5.33" />
            </svg>
            <span class="text-[10px]">Login</span>
          </NuxtLink>
        </CustomButton>
        <CustomButton variant="outline" className="trial-button" as-child>
          <NuxtLink to="/sign-up" @click="toggleMobileMenu" :class="isDark ? 'text-white' : 'text-black'">
            <div class="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="16" height="16" class="inline-block" :class="isDark ? 'text-white' : 'text-black'">
                 <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z" />
              </svg>
              <span class="font-bold">Start your trial</span>
            </div>
          </NuxtLink>
        </CustomButton>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import CustomButton from '../ui/custombutton/CustomButton.vue';
import { useTheme } from '@/composables/useTheme';

// Get theme state and toggle function
const { isDark, toggleDarkMode } = useTheme();

// State for mobile menu
const isMobileMenuOpen = ref(false);

// Toggle mobile menu function
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};
</script>

<style scoped>
/* Ensure consistent button styling */
.trial-button {
  background-color: transparent !important;  
  border-radius: 9999px !important;
}

.login-button {
  background-color: transparent !important;
  border: none !important;
}

/* Navigation link styling */
.nav-link span {
  position: relative;
  display: inline-block;
}

.nav-link span::after {
  content: '';
  position: absolute;
  width: 0;
  height: 1px;
  bottom: -2px;
  left: 50%;
  background-color: v-bind('isDark ? "white" : "black"');
  transform: translateX(-50%);
  transition: width 0.3s ease;
  border-radius: 2px;
}

.nav-link:hover span::after {
  width: 100%;
}
</style> 