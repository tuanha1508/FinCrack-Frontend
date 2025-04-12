<template>
  <button
    :class="[
      'transition-all',
      variant === 'primary' && (isDark 
        ? 'bg-white text-black rounded-full text-xs px-4 py-1 h-auto font-bold hover:scale-105 hover:shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:border-opacity-80' 
        : 'bg-black text-white rounded-full text-xs px-4 py-1 h-auto font-bold hover:scale-105 hover:shadow-[0_0_15px_rgba(0,0,0,0.3)] hover:border-opacity-80'),
      variant === 'ghost' && 'bg-transparent border-none',
      variant === 'outline' && (isDark 
        ? 'bg-transparent border rounded-full text-xs px-4 py-1 h-auto hover:scale-105 hover:shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:border-opacity-80' 
        : 'bg-transparent border rounded-full text-xs px-4 py-1 h-auto hover:scale-105 hover:shadow-[0_0_15px_rgba(0,0,0,0.3)] hover:border-opacity-80'),
      variant === 'default' && (isDark 
        ? 'w-full py-2 px-2.5 rounded-full text-xs font-semibold cursor-pointer mb-5 bg-white text-black transition-all hover:opacity-90' 
        : 'w-full py-2 px-2.5 rounded-full text-xs font-semibold cursor-pointer mb-5 bg-black text-white transition-all hover:opacity-90'),
      className
    ]"
    :type="type"
    :disabled="disabled"
    @click="onClick"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { useTheme } from '@/composables/useTheme';

// Get theme state
const { isDark } = useTheme();

defineProps({
  variant: {
    type: String,
    default: 'default',
    validator: (value: string) => ['default', 'primary', 'outline', 'ghost'].includes(value)
  },
  className: {
    type: String,
    default: ''
  },
  type: {
    type: String as () => 'button' | 'submit' | 'reset',
    default: 'button',
    validator: (value: string) => ['button', 'submit', 'reset'].includes(value)
  },
  disabled: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>();

const onClick = (event: MouseEvent) => {
  emit('click', event);
};
</script> 