import { ref, computed, onMounted, watch } from 'vue';
import { useColorMode } from '#imports';

export const useTheme = () => {
  const colorMode = useColorMode();
  const isDark = computed(() => colorMode.value === 'dark');
  
  const toggleDarkMode = () => {
    colorMode.preference = isDark.value ? 'light' : 'dark';
  };
  
  // Apply dark class to document for Tailwind dark mode
  const applyDarkClass = (isDarkMode: boolean) => {
    if (typeof document !== 'undefined') {
      if (isDarkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  };
  
  // Watch for changes in dark mode and update document class
  watch(isDark, (newValue) => {
    applyDarkClass(newValue);
  }, { immediate: true });
  
  // Initialize dark mode based on system preference if not already set
  onMounted(() => {
    // Only access window in client-side environment
    if (typeof window !== 'undefined' && colorMode.preference === 'system') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      colorMode.preference = prefersDark ? 'dark' : 'light';
    }
    
    // Apply dark class on mount
    applyDarkClass(isDark.value);
  });
  
  return {
    isDark,
    toggleDarkMode,
    mode: colorMode
  };
}; 