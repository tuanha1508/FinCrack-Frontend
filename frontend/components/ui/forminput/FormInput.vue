<template>
  <div class="mb-3">
    <label :for="id" class="block mb-1 font-medium text-xs">{{ label }}</label>
    <input 
      :id="id"
      :value="modelValue"
      :type="type"
      :placeholder="placeholder"
      :required="required"
      :class="[
        type === 'password' && 'letter-spacing-2',
        error ? 'border-red-500 focus:border-red-600' : 
          isDark ? 'border-gray-700 focus:border-gray-500 bg-black text-white placeholder:text-gray-600' : 
                 'border-gray-300 focus:border-gray-700 bg-white text-black placeholder:text-gray-500',
        className
      ]"
      class="w-full py-2 px-2.5 rounded-lg border text-xs transition-colors focus:outline-none"
      @input="updateValue"
    />
    <p v-if="error" class="text-red-500 text-xs mt-1">{{ error }}</p>
    <p v-else-if="helperText" :class="isDark ? 'text-gray-400' : 'text-gray-600'" class="text-xs mt-1">{{ helperText }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useTheme } from '@/composables/useTheme';

// Get theme state
const { isDark } = useTheme();

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'text'
  },
  id: {
    type: String,
    required: true
  },
  placeholder: {
    type: String,
    default: ''
  },
  required: {
    type: Boolean,
    default: false
  },
  helperText: {
    type: String,
    default: ''
  },
  error: {
    type: String,
    default: ''
  },
  className: {
    type: String,
    default: ''
  }
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>();

const updateValue = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value);
};
</script>

<style scoped>
.letter-spacing-2 {
  letter-spacing: 2px;
}
</style> 