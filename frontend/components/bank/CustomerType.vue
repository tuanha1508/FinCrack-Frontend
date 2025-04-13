<template>
  <UiCard>
    <UiCardHeader>
      <UiCardTitle>Your Customer Type</UiCardTitle>
      <UiCardDescription>Select the option that best describes you.</UiCardDescription>
    </UiCardHeader>
    <UiCardContent>
      <RadioGroup
        v-model="selectedRadioValue"
        class="grid grid-cols-1 md:grid-cols-3 gap-4"
        @update:modelValue="handleRadioChange"
      >
        <!-- Global Customers -->
        <div class="flex items-center space-x-2">
          <RadioGroupItem id="globalCustomers" value="globalCustomers" class="border-2 border-primary" />
          <label for="globalCustomers" class="text-sm font-medium cursor-pointer">
            Global Customer
          </label>
        </div>

        <!-- Professionals -->
        <div class="flex items-center space-x-2">
          <RadioGroupItem id="professionals" value="professionals" class="border-2 border-primary" />
          <label for="professionals" class="text-sm font-medium cursor-pointer">
            Professional
          </label>
        </div>

        <!-- SMEs -->
        <div class="flex items-center space-x-2">
          <RadioGroupItem id="smes" value="smes" class="border-2 border-primary" />
          <label for="smes" class="text-sm font-medium cursor-pointer">
            Small/Medium Business
          </label>
        </div>

        <!-- Seniors -->
        <div class="flex items-center space-x-2">
          <RadioGroupItem id="seniors" value="seniors" class="border-2 border-primary" />
          <label for="seniors" class="text-sm font-medium cursor-pointer">
            Senior
          </label>
        </div>

        <!-- Students -->
        <div class="flex items-center space-x-2">
          <RadioGroupItem id="students" value="students" class="border-2 border-primary" />
          <label for="students" class="text-sm font-medium cursor-pointer">
            Student
          </label>
        </div>

        <!-- Tech-Savvy -->
        <div class="flex items-center space-x-2">
          <RadioGroupItem id="techSavvy" value="techSavvy" class="border-2 border-primary" />
          <label for="techSavvy" class="text-sm font-medium cursor-pointer">
            Tech-Savvy
          </label>
        </div>
      </RadioGroup>
    </UiCardContent>
  </UiCard>
</template>

<script setup lang="ts">
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { computed, ref, watchEffect } from 'vue';

// Define the expected boolean flags for customer types
// Remove the incorrect expectation of a single `customerType: string`
const props = defineProps<{
  formData: {
    globalCustomers: boolean;
    professionals: boolean;
    smes: boolean;
    seniors: boolean;
    students: boolean;
    techSavvy: boolean;
    // Allow other properties potentially present in formData
    [key: string]: any; 
  };
}>();

const emit = defineEmits(['update:formData']);

// Define the possible customer type keys
const customerTypeKeys = ['globalCustomers', 'professionals', 'smes', 'seniors', 'students', 'techSavvy'] as const;

// Ref to track the selected radio value (which corresponds to the key)
const selectedRadioValue = ref('');

// Update the selectedRadioValue based on which boolean flag is true
const updateSelectedRadio = () => {
  const selectedKey = customerTypeKeys.find(key => props.formData[key]);
  selectedRadioValue.value = selectedKey || '';
};

// Watch for changes in the formData's boolean flags
watchEffect(updateSelectedRadio);

// Handle radio change: set the selected boolean flag to true and others to false
const handleRadioChange = (value: string) => {
  // Ensure the value is one of the known keys
  if (!customerTypeKeys.includes(value as any)) return;

  const updatedFormData = { ...props.formData };
  
  // Set all customer type flags to false initially
  customerTypeKeys.forEach(key => {
    updatedFormData[key] = false;
  });
  
  // Set the selected customer type flag to true
  updatedFormData[value] = true;
  
  // Emit the update event with the modified formData
  emit('update:formData', updatedFormData);
};
</script> 