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

    <!-- Wishlist Section -->
    <div v-if="wishlistedCompanies.length > 0" class="mb-6 border border-black p-4 bg-white text-black">
      <h2 class="text-xl font-semibold mb-4 text-black">My Wishlist</h2>
      <div class="space-y-2">
        <!-- Wishlist Header -->
        <div class="grid grid-cols-12 gap-4 px-2 py-1 border-b border-black font-medium text-xs text-black">
          <div class="col-span-3">Company</div>
          <div class="col-span-2 text-right">Market Cap</div>
          <div class="col-span-1 text-right">Change %</div>
          <div class="col-span-2 text-right">Last Price</div>
          <div class="col-span-1 text-right">P/E</div>
          <div class="col-span-1 text-right">Revenue</div>
          <div class="col-span-2 flex justify-end">Actions</div>
        </div>
        <!-- Wishlist Items -->
        <div
          v-for="company in wishlistedCompanies"
          :key="company.symbol"
          class="grid grid-cols-12 gap-4 items-center px-2 py-2 border-b border-black/10 hover:bg-black/5 cursor-pointer"
          @click="selectWishlistedCompany(company)"
        >
          <!-- Company Info -->
          <div class="col-span-3 flex items-center gap-2">
             <!-- Placeholder for Logo -->
            <div class="w-6 h-6 bg-black flex items-center justify-center text-white text-xs rounded-sm flex-shrink-0">
               {{ company.symbol.charAt(0) }}
            </div>
            <div>
              <div class="font-medium truncate text-sm">{{ company.name }}</div>
              <div class="text-xs text-black/60">
                <!-- Placeholder for Exchange/Flag -->
                <span>{{ company.symbol }}</span>
              </div>
            </div>
          </div>
          <!-- Indicators (Placeholders) -->
          <div class="col-span-2 text-right text-sm font-medium">{{ company.marketCap }}</div>
          <div
             class="col-span-1 text-right text-sm font-medium"
             :class="{ 'text-black': company.changePercent >= 0 }"
           >
             {{ company.changePercent >= 0 ? '+' : '' }}{{ company.changePercent.toFixed(1) }}%
           </div>
          <div class="col-span-2 text-right text-sm font-medium">{{ company.price }}</div>
          <div class="col-span-1 text-right text-sm">{{ company.peRatio }}</div>
          <div class="col-span-1 text-right text-sm">{{ company.revenue }}</div>
           <!-- Actions -->
          <div class="col-span-2 flex justify-end">
             <button
               @click.stop="wishlistStore.removeFromWishlist(company.symbol)"
               title="Remove from Wishlist"
               class="p-1 hover:bg-black/10 rounded"
             >
               <Icon name="lucide:x" class="h-4 w-4 text-black" />
             </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Company financial overview -->
    <CompanyFinancialOverview :company="selectedCompany" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { definePageMeta } from '#imports'
import CompanySearchBar from '@/components/dashboard/CompanySearchBar.vue'
import CompanyFinancialOverview from '@/components/dashboard/CompanyFinancialOverview.vue'
import { useUserService } from '@/services/user'
import type { UserData } from '@/services/user'
import { useToast } from 'primevue/usetoast'
import { useWishlistStore } from '@/stores/wishlistStore'
import tickersData from '@/constants/tickers.json'

// Set the dashboard layout
definePageMeta({
  layout: 'dashboard',
  middleware: ['auth'],
  requiresAuth: true,
})

// Define basic company interface used across components
interface Company {
  name: string;
  symbol: string;
  exchange?: string;
  currency?: string;
}

// Define interface for wishlist items including placeholder data
interface WishlistItem extends Company {
  marketCap?: string | number;
  changePercent: number; // Made non-optional with default
  price?: string | number;
  peRatio?: number | string;
  revenue?: string | number; // Added placeholder
  // logo?: string; // Placeholder for logo URL if needed later
  // exchangeFlag?: string; // Placeholder for flag if needed later
}

const selectedCompany = ref<Company | null>(null);
const userData = ref<UserData | null>(null);
const isLoading = ref(false);
const toast = useToast();
const userService = useUserService();

// Use the wishlist store
const wishlistStore = useWishlistStore();

// Create a map for quick ticker lookups
const tickerMap = computed(() => {
  const map = new Map<string, { title: string; ticker: string }>();
  Object.values(tickersData).forEach(t => map.set(t.ticker, t));
  return map;
});

// Computed property for wishlisted companies with details
const wishlistedCompanies = computed<WishlistItem[]>(() => {
  return wishlistStore.wishlist
    .map(symbol => {
      const companyInfo = tickerMap.value.get(symbol);
      if (companyInfo) {
        // Explicitly create an object matching WishlistItem structure
        const item: WishlistItem = {
          name: companyInfo.title,
          symbol: companyInfo.ticker,
          // Provide default/placeholder values
          marketCap: 'N/A', // Placeholder
          changePercent: 0.0, // Default
          price: 'N/A', // Placeholder
          peRatio: 'N/A', // Placeholder
          revenue: 'N/A', // Placeholder
          // Optional fields from Company interface
          exchange: 'N/A', // Placeholder or fetch if available
          currency: 'N/A' // Placeholder or fetch if available
        };
        return item;
      }
      return null; // Return null if company info not found
    })
    .filter((item): item is WishlistItem => item !== null); // Filter out the null values correctly
});

const handleCompanySelect = (company: Company) => {
  selectedCompany.value = company;
};

// Function to select a company from the wishlist
const selectWishlistedCompany = (company: Company) => {
  selectedCompany.value = company;
   // Optional: Scroll to the overview component
   // const overviewElement = document.getElementById('company-financial-overview'); // Assuming the overview component has this ID
   // overviewElement?.scrollIntoView({ behavior: 'smooth' });
};

// Fetch user data from database
const fetchUserData = async () => {
  isLoading.value = true;
  try {
    const response = await userService.getUserData();
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