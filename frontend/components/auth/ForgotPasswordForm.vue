<template>
  <AuthFormWrapper 
    title="Forgot Password" 
    subtitle="Enter your email address to reset your password"
    :is-login="true"
  >
    <form @submit.prevent="handleSubmit">
      <FormInput
        id="email"
        v-model="email"
        label="Email"
        type="email"
        placeholder="m@example.com"
        :required="true"
      />

      <p v-if="error" class="text-red-500 text-xs mb-3">{{ error }}</p>
      <p v-if="successMessage" class="text-green-500 text-xs mb-3">{{ successMessage }}</p>

      <CustomButton 
        type="submit" 
        variant="default"
        :disabled="isLoading"
      >
        {{ isLoading ? 'Processing...' : 'Reset Password' }}
      </CustomButton>
      
      <div class="text-center text-xs mt-5">
        <NuxtLink to="/sign-in" :class="isDark ? 'text-white' : 'text-black'" class="font-semibold relative animated-underline">Back to login</NuxtLink>
      </div>
    </form>
  </AuthFormWrapper>
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
import { ref } from 'vue';
import { useAuth } from '@/composables/useAuth';
import { useFormValidation } from '@/composables/useFormValidation';
import { useTheme } from '@/composables/useTheme';

// Get theme state
const { isDark } = useTheme();

// Import components
import AuthFormWrapper from './AuthFormWrapper.vue';
import FormInput from '@/components/ui/forminput/FormInput.vue';
import CustomButton from '@/components/ui/custombutton/CustomButton.vue';

// Form validation
const { validateEmail } = useFormValidation();

// Auth composable
const { resetPassword, isLoading, error } = useAuth();

// Form state
const email = ref('');
const successMessage = ref('');

// Methods
const handleSubmit = async () => {
  // Validate form
  const isEmailValid = validateEmail(email.value);
  
  if (!isEmailValid) {
    return;
  }
  
  // Submit form
  const success = await resetPassword(email.value);
  
  if (success) {
    successMessage.value = 'Password reset instructions sent to your email';
    email.value = '';
  }
};
</script> 