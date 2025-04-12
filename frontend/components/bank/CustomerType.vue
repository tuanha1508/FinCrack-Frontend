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

const props = defineProps<{
  formData: {
    customerType: string;
  };
}>();

const emit = defineEmits(['update:formData']);

// Create a ref to track the selected radio value
const selectedRadioValue = ref(props.formData.customerType || '');

// Update the radio value when formData changes
const updateSelectedRadio = () => {
  selectedRadioValue.value = props.formData.customerType || '';
};

// Watch for changes in the formData
watchEffect(updateSelectedRadio);

// Handle radio change events
const handleRadioChange = (value: string) => {
  const updatedFormData = {
    ...props.formData,
    customerType: value
  };
  
  // Emit the update event
  emit('update:formData', updatedFormData);
};
</script> 