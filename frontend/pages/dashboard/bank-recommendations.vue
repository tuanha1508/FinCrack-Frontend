<template>
  <div>
    <!-- Page title and actions -->
    <div class="flex justify-between items-center mb-6">
      <div>
        <h1 class="text-2xl font-semibold text-foreground">Bank Recommendations</h1>
        <p class="text-muted-foreground">Get personalized bank recommendations based on your preferences</p>
      </div>
      <div class="flex items-center gap-2" v-if="showResults">
        <UiButton variant="outline" size="sm" class="gap-2" @click="resetForm">
          <Icon name="lucide:chevron-left" class="h-4 w-4" />
          Back to Form
        </UiButton>
        <UiButton variant="outline" size="sm" class="gap-2" @click="refreshRecommendations">
          <Icon name="lucide:refresh-cw" class="h-4 w-4" />
          Refresh
        </UiButton>
      </div>
    </div>

    <!-- Form Section -->
    <div v-if="!showResults">
      <form @submit.prevent="submitForm" class="space-y-8">
        <!-- Ranking Preferences Section -->
        <RankingPreferences 
          :formData="formData as any" 
          :rankOptions="rankOptions" 
          :branchOptions="branchOptions" 
        />

        <!-- Banking Services Section -->
        <BankingServices :formData="formData" />

        <!-- Customer Type Section -->
        <CustomerType :formData="formData" />

        <!-- Submit Button -->
        <div class="flex justify-end">
          <UiButton type="submit" size="lg">Get Bank Recommendations</UiButton>
        </div>
      </form>
    </div>

    <!-- Results Section -->
    <div v-if="showResults">
      <!-- Your preference summary -->
      <PreferenceSummary 
        :formData="formData as any" 
        :servicePreferences="servicePreferences" 
        :customerTypePreferences="customerTypePreferences" 
        :formatLabel="formatLabel" 
      />

      <!-- Match score explanation -->
      <div class="rounded-lg bg-muted/40 p-4 mb-6 flex items-center">
        <Icon name="lucide:info" class="h-5 w-5 text-primary mr-3 flex-shrink-0" />
        <p class="text-sm">Our matching algorithm considers your preferences for banking features, services needed, and customer profile to calculate a match score. Banks with higher scores align better with your requirements.</p>
      </div>

      <!-- Bank recommendations list -->
      <div class="space-y-6">
        <BankCard v-for="(bank, index) in recommendedBanks" :key="index" :bank="bank" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { definePageMeta } from '#imports';
import RankingPreferences from '@/components/bank/RankingPreferences.vue';
import BankingServices from '@/components/bank/BankingServices.vue';
import CustomerType from '@/components/bank/CustomerType.vue';
import PreferenceSummary from '@/components/bank/PreferenceSummary.vue';
import BankCard from '@/components/bank/BankCard.vue';
import { useBankForm } from '@/composables/useBankForm';
import { useBankRecommendations } from '@/composables/useBankRecommendations';
import { formatBankRequestData } from '@/utils/bankApi';
import { watch } from 'vue';

// Set the dashboard layout
definePageMeta({
  layout: 'dashboard'
});

// Use composables
const { 
  formData, 
  showResults, 
  servicePreferences, 
  customerTypePreferences, 
  formatLabel, 
  resetForm,
  rankOptions,
  branchOptions
} = useBankForm();

const { 
  recommendedBanks, 
  isLoading, 
  error, 
  fetchRecommendations 
} = useBankRecommendations();

// Custom submit form that calls the API
const submitForm = async () => {
  // Check if all ranking fields have values
  const requiredRankFields = [
    'digitalInterfaceRank',
    'numberOfBranches',
    'greenInitiativesRank',
    'feeLevelRank',
    'internationalSupportRank',
    'interestRateRangeRank',
    'customerServiceQualityRank',
    'capitalAdequacyRank'
  ] as const;
  
  const missingFields = requiredRankFields.filter(field => 
    formData.value[field] === null || formData.value[field] === undefined
  );
  
  if (missingFields.length > 0) {
    alert('Please fill in all rank fields before submitting.');
    return;
  }

  // Show the results section
  showResults.value = true;
  
  // Format the data for the API and fetch recommendations
  const requestData = formatBankRequestData(formData.value);
  await fetchRecommendations(requestData);
};

// Refresh recommendations function for the refresh button
const refreshRecommendations = async () => {
  const requestData = formatBankRequestData(formData.value);
  await fetchRecommendations(requestData);
};

// Watch for errors
watch(error, (newError) => {
  if (newError) {
    console.error('Bank recommendation error:', newError);
    // Optionally show an error message to the user
  }
});
</script>

<style scoped>
/* Custom styling can be added here if needed */
</style> 