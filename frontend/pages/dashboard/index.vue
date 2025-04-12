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

    <!-- User data overview -->
    <div v-if="userData" class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div class="bg-card rounded-lg shadow-sm p-4">
        <h3 class="text-sm font-medium text-muted-foreground mb-1">Account Balance</h3>
        <p class="text-2xl font-semibold">
          {{ userData.dashboardData?.accountBalance ? `$${userData.dashboardData.accountBalance.toLocaleString()}` : 'N/A' }}
        </p>
      </div>
      <div class="bg-card rounded-lg shadow-sm p-4">
        <h3 class="text-sm font-medium text-muted-foreground mb-1">Savings Goal</h3>
        <p class="text-2xl font-semibold">
          {{ userData.dashboardData?.savingsGoal ? `$${userData.dashboardData.savingsGoal.toLocaleString()}` : 'N/A' }}
        </p>
      </div>
      <div class="bg-card rounded-lg shadow-sm p-4">
        <h3 class="text-sm font-medium text-muted-foreground mb-1">Investment Performance</h3>
        <p class="text-2xl font-semibold flex items-center">
          {{ userData.dashboardData?.investmentPerformance?.totalValue ? `$${userData.dashboardData.investmentPerformance.totalValue.toLocaleString()}` : 'N/A' }}
          <span 
            v-if="userData.dashboardData?.investmentPerformance?.changePercent"
            :class="userData.dashboardData.investmentPerformance.changePercent >= 0 ? 'text-green-500' : 'text-red-500'"
            class="text-sm ml-2">
            {{ userData.dashboardData.investmentPerformance.changePercent >= 0 ? '↑' : '↓' }}
            {{ Math.abs(userData.dashboardData.investmentPerformance.changePercent).toFixed(2) }}%
          </span>
        </p>
      </div>
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
      <CompanySearchBarHardcoded @companySelected="handleCompanySelect" />
    </div>

    <!-- Company financial overview -->
    <CompanyFinancialOverviewHardcoded :company="selectedCompany" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { definePageMeta } from '#imports'
import CompanySearchBarHardcoded from '@/components/dashboard/CompanySearchBarHardcoded.vue'
import CompanyFinancialOverviewHardcoded from '@/components/dashboard/CompanyFinancialOverviewHardcoded.vue'
import { useUserService } from '@/services/user'
import type { UserData } from '@/services/user'
import { useToast } from 'primevue/usetoast'

// Set the dashboard layout
definePageMeta({
  layout: 'dashboard',
  middleware: ['auth'],
  requiresAuth: true,
})

interface Company {
  name: string;
  symbol: string;
  exchange: string;
}

const selectedCompany = ref<Company | null>(null);
const userData = ref<UserData | null>(null);
const isLoading = ref(false);
const toast = useToast();
const userService = useUserService();

const handleCompanySelect = (company: Company) => {
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