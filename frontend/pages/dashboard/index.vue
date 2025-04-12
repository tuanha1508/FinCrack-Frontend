<template>
  <div>
    <!-- Page title and actions -->
    <div class="flex justify-between items-center mb-6">
      <div>
        <h1 class="text-2xl font-semibold text-foreground">Company Financial Explorer</h1>
        <p class="text-muted-foreground">Search and analyze public company financial information</p>
      </div>
      <UiButton size="sm" class="gap-2">
        <Icon name="lucide:download" class="h-4 w-4" />
        Export Report
      </UiButton>
    </div>

    <!-- Company search bar -->
    <div class="mb-6">
      <CompanySearchBarHardcoded @companySelected="handleCompanySelect" />
    </div>

    <!-- Company financial overview -->
    <CompanyFinancialOverviewHardcoded :company="selectedCompany" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { definePageMeta } from '#imports'
import CompanySearchBarHardcoded from '@/components/dashboard/CompanySearchBarHardcoded.vue'
import CompanyFinancialOverviewHardcoded from '@/components/dashboard/CompanyFinancialOverviewHardcoded.vue'

// Set the dashboard layout
definePageMeta({
  layout: 'dashboard'
})

interface Company {
  name: string;
  symbol: string;
  exchange: string;
}

const selectedCompany = ref<Company | null>(null);

const handleCompanySelect = (company: Company) => {
  selectedCompany.value = company;
};
</script> 