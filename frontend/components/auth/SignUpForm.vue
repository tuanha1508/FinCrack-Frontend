<template>
  <AuthFormWrapper 
    title="Sign up" 
    subtitle="Create an account to get started"
    :is-login="false"
  >
    <form @submit.prevent="handleSubmit">
      <FormInput
        id="name"
        v-model="name"
        label="Name"
        type="text"
        placeholder="John Doe"
        :required="true"
      />

      <FormInput
        id="email"
        v-model="email"
        label="Email"
        type="email"
        placeholder="m@example.com"
        :required="true"
      />

      <FormInput
        id="password"
        v-model="password"
        label="Password"
        type="password"
        :required="true"
        helper-text="Password must be at least 8 characters long"
      />

      <p v-if="error" class="text-red-500 text-xs mb-3">{{ error }}</p>

      <CustomButton 
        type="submit" 
        variant="default"
        :disabled="isLoading"
      >
        {{ isLoading ? 'Creating Account...' : 'Create Account' }}
      </CustomButton>
      
      <SocialAuthButtons 
        @google-auth="signUpWithGoogle"
        @github-auth="signUpWithGithub"
        @facebook-auth="signUpWithFacebook"
        @twitter-auth="signUpWithTwitter"
      />
    </form>
  </AuthFormWrapper>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuth } from '../../composables/useAuth';
import { useFormValidation } from '../../composables/useFormValidation';

// Import components
import AuthFormWrapper from './AuthFormWrapper.vue';
import FormInput from '../ui/forminput/FormInput.vue';
import CustomButton from '../ui/custombutton/CustomButton.vue';
import SocialAuthButtons from './SocialAuthButtons.vue';

// Form validation
const { validateField, validateEmail, validatePassword } = useFormValidation();

// Auth composable
const { 
  signup: signUp, 
  loginWithGoogle, 
  loginWithGithub,
  loginWithFacebook,
  loginWithTwitter,
  isLoading, 
  error 
} = useAuth();

// Form state
const name = ref('');
const email = ref('');
const password = ref('');

// Social signup methods - do nothing when clicked
const signUpWithGoogle = () => {};
const signUpWithGithub = () => {};
const signUpWithFacebook = () => {};
const signUpWithTwitter = () => {};

// Methods
const handleSubmit = async () => {
  // Validate form
  const isNameValid = validateField('name', { value: name.value, required: true });
  const isEmailValid = validateEmail(email.value);
  const isPasswordValid = validatePassword(password.value);
  
  if (!isNameValid || !isEmailValid || !isPasswordValid) {
    return;
  }
  
  // Submit form
  await signUp({ 
    name: name.value,
    email: email.value, 
    password: password.value 
  });
};
</script> 