<template>
  <UiCard>
    <UiCardHeader>
      <UiCardTitle>Banking Services Needed</UiCardTitle>
      <UiCardDescription>Select the banking services that interest you.</UiCardDescription>
    </UiCardHeader>
    <UiCardContent>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <!-- Auto Loans -->
        <div class="flex items-center space-x-2">
          <Checkbox
            id="autoLoans"
            v-model="formData.autoLoans"
            class="rounded-full border-2 border-primary"
          />
          <label for="autoLoans" class="text-sm font-medium">Auto Loans</label>
        </div>

        <!-- Credit Cards -->
        <div class="flex items-center space-x-2">
          <Checkbox
            id="creditCards"
            v-model="formData.creditCards"
            class="rounded-full border-2 border-primary"
          />
          <label for="creditCards" class="text-sm font-medium">Credit Cards</label>
        </div>

        <!-- Global Banking -->
        <div class="flex items-center space-x-2">
          <Checkbox
            id="globalBanking"
            v-model="formData.globalBanking"
            class="rounded-full border-2 border-primary"
          />
          <label for="globalBanking" class="text-sm font-medium">Global Banking</label>
        </div>

        <!-- Investments -->
        <div class="flex items-center space-x-2">
          <Checkbox
            id="investments"
            v-model="formData.investments"
            class="rounded-full border-2 border-primary"
          />
          <label for="investments" class="text-sm font-medium">Investment Services</label>
        </div>

        <!-- Loans -->
        <div class="flex items-center space-x-2">
          <Checkbox
            id="loans"
            v-model="formData.loans"
            class="rounded-full border-2 border-primary"
          />
          <label for="loans" class="text-sm font-medium">Personal Loans</label>
        </div>

        <!-- Mortgages -->
        <div class="flex items-center space-x-2">
          <Checkbox
            id="mortgages"
            v-model="formData.mortgages"
            class="rounded-full border-2 border-primary"
          />
          <label for="mortgages" class="text-sm font-medium">Mortgages</label>
        </div>

        <!-- Savings Accounts -->
        <div class="flex items-center space-x-2">
          <Checkbox
            id="savingsAccounts"
            v-model="formData.savingsAccounts"
            class="rounded-full border-2 border-primary"
          />
          <label for="savingsAccounts" class="text-sm font-medium">Savings Accounts</label>
        </div>
      </div>
    </UiCardContent>
  </UiCard>
</template>

<script setup lang="ts">
import { Checkbox } from '@/components/ui/checkbox';

defineProps<{
  formData: {
    autoLoans: boolean;
    creditCards: boolean;
    globalBanking: boolean;
    investments: boolean;
    loans: boolean;
    mortgages: boolean;
    savingsAccounts: boolean;
  };
}>();
</script> 