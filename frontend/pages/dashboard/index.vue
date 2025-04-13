<template>
  <div>
    <!-- Toast component for notifications -->
    <PvToast />
    
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

    <!-- Loading indicator -->
    <div v-if="isLoading" class="flex justify-center items-center py-4">
      <span class="loading loading-spinner loading-md"></span>
    </div>

    <!-- Error message if user data fetch fails but is not handled by toast -->
    <div v-if="!isLoading && !userData" class="alert alert-warning mb-6">
      <p>Unable to load your dashboard data. Please try again later.</p>
    </div>

    <!-- Company search bar -->
    <div class="mb-6">
      <CompanySearchBar @companySelected="handleCompanySelect" />
    </div>

    <!-- Company financial overview -->
    <CompanyFinancialOverview :company="selectedCompany" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { definePageMeta } from '#imports'
import CompanySearchBar from '@/components/dashboard/CompanySearchBar.vue'
import CompanyFinancialOverview from '@/components/dashboard/CompanyFinancialOverview.vue'
import { useUserService } from '@/services/user'
import type { UserData } from '@/services/user'
import { useToast } from 'primevue/usetoast'

// Set the dashboard layout
definePageMeta({
  layout: 'dashboard',
  middleware: ['auth'],
  requiresAuth: true,
})

const selectedCompany = ref<{
  name: string;
  symbol: string;
  exchange?: string;
  currency?: string;
} | null>(null);
const userData = ref<UserData | null>(null);
const isLoading = ref(false);
const toast = useToast();
const userService = useUserService();

const handleCompanySelect = (company: {
  name: string;
  symbol: string;
  exchange?: string;
  currency?: string;
}) => {
  selectedCompany.value = company;
};

// Fetch user data from database
const fetchUserData = async () => {
  isLoading.value = true;
  try {
    const response = await userService.getUserDashboardData();
    if (response.error) {
      toast.add({ severity: 'error', summary: 'Error', detail: 'Error loading user data: ' + response.error });
    } else if (response.data) {
      userData.value = response.data;
    }
  } catch (error: any) {
    toast.add({ severity: 'error', summary: 'Error', detail: 'Failed to load user data: ' + (error.message || 'Unknown error') });
  } finally {
    isLoading.value = false;
  }
};

// Fetch user data when component is mounted
onMounted(() => {
  fetchUserData();
});
</script> 