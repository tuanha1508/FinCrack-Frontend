<template>
  <UiCard>
    <UiCardHeader>
      <UiCardTitle class="text-foreground">Personal Profile Information</UiCardTitle>
      <UiCardDescription>Provide your details to get tailored service recommendations</UiCardDescription>
    </UiCardHeader>
    <UiCardContent>
      <form @submit.prevent="submitForm" class="space-y-6">
        <!-- Demographic Information -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Age -->
          <div class="space-y-2">
            <label for="age" class="text-sm font-medium">Age</label>
            <input
              id="age"
              v-model="formData.age"
              type="number"
              min="18"
              max="100"
              class="w-full rounded-md border border-input bg-background px-3 py-2"
              required
            />
          </div>

          <!-- Gender -->
          <div class="space-y-2">
            <label for="gender" class="text-sm font-medium">Gender</label>
            <UiSelect v-model="formData.gender" required>
              <UiSelectTrigger class="w-full">
                <UiSelectValue placeholder="Select gender" />
              </UiSelectTrigger>
              <UiSelectContent>
                <UiSelectItem value="Male">Male</UiSelectItem>
                <UiSelectItem value="Female">Female</UiSelectItem>
              </UiSelectContent>
            </UiSelect>
          </div>

          <!-- Marital Status -->
          <div class="space-y-2">
            <label for="maritalStatus" class="text-sm font-medium">Marital Status (Optional)</label>
            <UiSelect v-model="formData.maritalStatus">
              <UiSelectTrigger class="w-full">
                <UiSelectValue placeholder="Select marital status" />
              </UiSelectTrigger>
              <UiSelectContent>
                <UiSelectItem value="Single">Single</UiSelectItem>
                <UiSelectItem value="Married">Married</UiSelectItem>
                <UiSelectItem value="Divorced">Divorced</UiSelectItem>
                <UiSelectItem value="Widowed">Widowed</UiSelectItem>
              </UiSelectContent>
            </UiSelect>
          </div>

          <!-- Income Level -->
          <div class="space-y-2">
            <label for="incomeLevel" class="text-sm font-medium">Income Level (Optional)</label>
            <UiSelect v-model="formData.incomeLevel">
              <UiSelectTrigger class="w-full">
                <UiSelectValue placeholder="Select income level" />
              </UiSelectTrigger>
              <UiSelectContent>
                <UiSelectItem value="Low">Low</UiSelectItem>
                <UiSelectItem value="Medium">Medium</UiSelectItem>
                <UiSelectItem value="High">High</UiSelectItem>
              </UiSelectContent>
            </UiSelect>
          </div>

          <!-- Occupation -->
          <div class="space-y-2">
            <label for="occupation" class="text-sm font-medium">Occupation</label>
            <UiSelect v-model="formData.occupation" required>
              <UiSelectTrigger class="w-full">
                <UiSelectValue placeholder="Select occupation field" />
              </UiSelectTrigger>
              <UiSelectContent>
                <UiSelectItem value="IT and Technology">IT and Technology</UiSelectItem>
                <UiSelectItem value="Healthcare">Healthcare</UiSelectItem>
                <UiSelectItem value="Education">Education</UiSelectItem>
                <UiSelectItem value="Finance">Finance</UiSelectItem>
                <UiSelectItem value="Engineering">Engineering</UiSelectItem>
                <UiSelectItem value="Sales and Marketing">Sales and Marketing</UiSelectItem>
                <UiSelectItem value="Administration">Administration</UiSelectItem>
                <UiSelectItem value="Arts and Entertainment">Arts and Entertainment</UiSelectItem>
                <UiSelectItem value="Service Industry">Service Industry</UiSelectItem>
                <UiSelectItem value="Other">Other</UiSelectItem>
              </UiSelectContent>
            </UiSelect>
          </div>

          <!-- Residential Status -->
          <div class="space-y-2">
            <label for="residentialStatus" class="text-sm font-medium">Residential Status (Optional)</label>
            <UiSelect v-model="formData.residentialStatus">
              <UiSelectTrigger class="w-full">
                <UiSelectValue placeholder="Select residential status" />
              </UiSelectTrigger>
              <UiSelectContent>
                <UiSelectItem value="Owns house">Owns house</UiSelectItem>
                <UiSelectItem value="Rents">Rents</UiSelectItem>
                <UiSelectItem value="Living with parents">Living with parents</UiSelectItem>
              </UiSelectContent>
            </UiSelect>
          </div>

          <!-- Dependents -->
          <div class="space-y-2">
            <label for="dependents" class="text-sm font-medium">Number of Dependents</label>
            <input
              id="dependents"
              v-model.number="formData.dependents"
              type="number"
              min="0"
              max="10"
              class="w-full rounded-md border border-input bg-background px-3 py-2"
              required
            />
          </div>
        </div>

        <!-- Loan Inquiry Information -->
        <div>
          <h3 class="text-md font-medium mb-4">Recent Loan Inquiries</h3>
          
          <!-- 3 Month Inquiries -->
          <div class="mb-4">
            <h4 class="text-sm font-medium mb-2">Last 3 Months</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="flex items-center space-x-2">
                <Checkbox
                  id="last3MonthsPersonalLoanInq"
                  v-model="formData.last3MonthsPersonalLoanInq"
                  class="rounded-full border-2 border-primary"
                />
                <label for="last3MonthsPersonalLoanInq" class="text-sm">Personal Loan</label>
              </div>
              
              <div class="flex items-center space-x-2">
                <Checkbox
                  id="last3MonthsAutoLoanInq"
                  v-model="formData.last3MonthsAutoLoanInq"
                  class="rounded-full border-2 border-primary"
                />
                <label for="last3MonthsAutoLoanInq" class="text-sm">Auto Loan</label>
              </div>
              
              <div class="flex items-center space-x-2">
                <Checkbox
                  id="last3MonthsMortgagesInq"
                  v-model="formData.last3MonthsMortgagesInq"
                  class="rounded-full border-2 border-primary"
                />
                <label for="last3MonthsMortgagesInq" class="text-sm">Mortgage</label>
              </div>
              
              <div class="flex items-center space-x-2">
                <Checkbox
                  id="last3MonthsHomeEquityLoanInq"
                  v-model="formData.last3MonthsHomeEquityLoanInq"
                  class="rounded-full border-2 border-primary"
                />
                <label for="last3MonthsHomeEquityLoanInq" class="text-sm">Home Equity Loan</label>
              </div>
              
              <div class="flex items-center space-x-2">
                <Checkbox
                  id="last3MonthsStudentLoanInq"
                  v-model="formData.last3MonthsStudentLoanInq"
                  class="rounded-full border-2 border-primary"
                />
                <label for="last3MonthsStudentLoanInq" class="text-sm">Student Loan</label>
              </div>
              
              <div class="flex items-center space-x-2">
                <Checkbox
                  id="last3MonthsBusinessLoanInq"
                  v-model="formData.last3MonthsBusinessLoanInq"
                  class="rounded-full border-2 border-primary"
                />
                <label for="last3MonthsBusinessLoanInq" class="text-sm">Business Loan</label>
              </div>
              
              <div class="flex items-center space-x-2">
                <Checkbox
                  id="last3MonthsCreditCardInq"
                  v-model="formData.last3MonthsCreditCardInq"
                  class="rounded-full border-2 border-primary"
                />
                <label for="last3MonthsCreditCardInq" class="text-sm">Credit Card</label>
              </div>
            </div>
          </div>
          
          <!-- 6 Month Inquiries -->
          <div>
            <h4 class="text-sm font-medium mb-2">Last 4-6 Months</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="flex items-center space-x-2">
                <Checkbox
                  id="last6MonthsPersonalLoanInq"
                  v-model="formData.last6MonthsPersonalLoanInq"
                  class="rounded-full border-2 border-primary"
                />
                <label for="last6MonthsPersonalLoanInq" class="text-sm">Personal Loan</label>
              </div>
              
              <div class="flex items-center space-x-2">
                <Checkbox
                  id="last6MonthsAutoLoanInq"
                  v-model="formData.last6MonthsAutoLoanInq"
                  class="rounded-full border-2 border-primary"
                />
                <label for="last6MonthsAutoLoanInq" class="text-sm">Auto Loan</label>
              </div>
              
              <div class="flex items-center space-x-2">
                <Checkbox
                  id="last6MonthsMortgagesInq"
                  v-model="formData.last6MonthsMortgagesInq"
                  class="rounded-full border-2 border-primary"
                />
                <label for="last6MonthsMortgagesInq" class="text-sm">Mortgage</label>
              </div>
              
              <div class="flex items-center space-x-2">
                <Checkbox
                  id="last6MonthsHomeEquityLoanInq"
                  v-model="formData.last6MonthsHomeEquityLoanInq"
                  class="rounded-full border-2 border-primary"
                />
                <label for="last6MonthsHomeEquityLoanInq" class="text-sm">Home Equity Loan</label>
              </div>
              
              <div class="flex items-center space-x-2">
                <Checkbox
                  id="last6MonthsStudentLoanInq"
                  v-model="formData.last6MonthsStudentLoanInq"
                  class="rounded-full border-2 border-primary"
                />
                <label for="last6MonthsStudentLoanInq" class="text-sm">Student Loan</label>
              </div>
              
              <div class="flex items-center space-x-2">
                <Checkbox
                  id="last6MonthsBusinessLoanInq"
                  v-model="formData.last6MonthsBusinessLoanInq"
                  class="rounded-full border-2 border-primary"
                />
                <label for="last6MonthsBusinessLoanInq" class="text-sm">Business Loan</label>
              </div>
              
              <div class="flex items-center space-x-2">
                <Checkbox
                  id="last6MonthsCreditCardInq"
                  v-model="formData.last6MonthsCreditCardInq"
                  class="rounded-full border-2 border-primary"
                />
                <label for="last6MonthsCreditCardInq" class="text-sm">Credit Card</label>
              </div>
            </div>
          </div>
        </div>

        <!-- Submit Button -->
        <div class="flex justify-end">
          <UiButton type="submit" size="lg">Get Service Recommendations</UiButton>
        </div>
      </form>
    </UiCardContent>
  </UiCard>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue';
import { Checkbox } from '@/components/ui/checkbox';

// Define the form data output interface
interface FormDataOutput {
  "Age": number;
  "Gender": string;
  "Marital Status": string;
  "Income Level": string;
  "Occupation": string;
  "Residential Status": string;
  "Dependents": number;
  "last_3months_personal_loan_inq": boolean;
  "last_3months_auto_loan_inq": boolean;
  "last_3months_mortgages_inq": boolean;
  "last_3months_home_equity_loan_inq": boolean;
  "last_3months_student_loan_inq": boolean;
  "last_3months_business_loan_inq": boolean;
  "last_3months_credit_card_inq": boolean;
  "last_6months_personal_loan_inq": boolean;
  "last_6months_auto_loan_inq": boolean;
  "last_6months_mortgages_inq": boolean;
  "last_6months_home_equity_loan_inq": boolean;
  "last_6months_student_loan_inq": boolean;
  "last_6months_business_loan_inq": boolean;
  "last_6months_credit_card_inq": boolean;
}

// Define type-safe emits
const emit = defineEmits<{
  (e: 'submit', data: FormDataOutput): void
}>();

// Form data structure
const formData = ref({
  age: '',
  gender: '',
  maritalStatus: '',
  incomeLevel: '',
  occupation: '',
  residentialStatus: '',
  dependents: 0,
  last3MonthsPersonalLoanInq: false,
  last3MonthsAutoLoanInq: false,
  last3MonthsMortgagesInq: false,
  last3MonthsHomeEquityLoanInq: false,
  last3MonthsStudentLoanInq: false,
  last3MonthsBusinessLoanInq: false,
  last3MonthsCreditCardInq: false,
  last6MonthsPersonalLoanInq: false,
  last6MonthsAutoLoanInq: false,
  last6MonthsMortgagesInq: false,
  last6MonthsHomeEquityLoanInq: false,
  last6MonthsStudentLoanInq: false,
  last6MonthsBusinessLoanInq: false,
  last6MonthsCreditCardInq: false
});

// Submit form function
const submitForm = () => {
  // Format data to match expected JSON structure
  const formattedData: FormDataOutput = {
    "Age": formData.value.age ? parseInt(formData.value.age as string) : 0,
    "Gender": formData.value.gender,
    "Marital Status": formData.value.maritalStatus,
    "Income Level": formData.value.incomeLevel,
    "Occupation": formData.value.occupation,
    "Residential Status": formData.value.residentialStatus,
    "Dependents": formData.value.dependents,
    "last_3months_personal_loan_inq": formData.value.last3MonthsPersonalLoanInq,
    "last_3months_auto_loan_inq": formData.value.last3MonthsAutoLoanInq,
    "last_3months_mortgages_inq": formData.value.last3MonthsMortgagesInq,
    "last_3months_home_equity_loan_inq": formData.value.last3MonthsHomeEquityLoanInq,
    "last_3months_student_loan_inq": formData.value.last3MonthsStudentLoanInq,
    "last_3months_business_loan_inq": formData.value.last3MonthsBusinessLoanInq,
    "last_3months_credit_card_inq": formData.value.last3MonthsCreditCardInq,
    "last_6months_personal_loan_inq": formData.value.last6MonthsPersonalLoanInq,
    "last_6months_auto_loan_inq": formData.value.last6MonthsAutoLoanInq,
    "last_6months_mortgages_inq": formData.value.last6MonthsMortgagesInq,
    "last_6months_home_equity_loan_inq": formData.value.last6MonthsHomeEquityLoanInq,
    "last_6months_student_loan_inq": formData.value.last6MonthsStudentLoanInq,
    "last_6months_business_loan_inq": formData.value.last6MonthsBusinessLoanInq,
    "last_6months_credit_card_inq": formData.value.last6MonthsCreditCardInq
  };

  // Emit form data to parent component
  emit('submit', formattedData);
};
</script>

<style scoped>
/* Remove spinner controls from number inputs */
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield; /* Firefox */
}
</style> 