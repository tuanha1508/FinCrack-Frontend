<template>
  <div>
    <!-- Page title and actions -->
    <div class="flex justify-between items-center mb-6">
      <div>
        <h1 class="text-2xl font-semibold text-foreground">My Watchlist</h1>
        <p class="text-muted-foreground">Track and monitor your favorite companies</p>
      </div>
      <div class="flex gap-2">
        <UiButton size="sm" variant="outline" @click="preloadSampleData" class="gap-2" v-if="wishlistedCompanies.length === 0">
          <Icon name="lucide:plus" class="h-4 w-4" />
          Load Sample Data
        </UiButton>
        <UiButton size="sm" class="gap-2" v-if="wishlistedCompanies.length > 0">
          <Icon name="lucide:download" class="h-4 w-4" />
          Export Watchlist
        </UiButton>
      </div>
    </div>

    <!-- Empty state -->
    <div v-if="wishlistedCompanies.length === 0" class="flex flex-col items-center justify-center py-16 border border-dashed rounded-lg">
      <Icon name="lucide:star" class="h-16 w-16 text-muted-foreground mb-4" />
      <h3 class="text-lg font-medium text-foreground mb-2">No companies in your watchlist</h3>
      <p class="text-muted-foreground max-w-md text-center mb-6">Add companies to your watchlist to track their performance and financial metrics</p>
      <UiButton @click="preloadSampleData">Add Sample Companies</UiButton>
    </div>

    <!-- Wishlist Table -->
    <div v-else class="mb-6">
      <!-- Filters and Search -->
      <div class="flex justify-between items-center mb-4">
        <div class="relative w-72">
          <input 
            type="text" 
            v-model="searchQuery" 
            placeholder="Search companies..."
            class="w-full px-3 py-2 border rounded-md pr-10"
          />
          <Icon name="lucide:search" class="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </div>
        <div class="flex gap-2">
          <select v-model="sortBy" class="px-3 py-2 border rounded-md text-sm">
            <option value="name">Name</option>
            <option value="price">Price</option>
            <option value="changePercent">Change %</option>
            <option value="marketCap">Market Cap</option>
            <option value="peRatio">P/E Ratio</option>
            <option value="revenue">Revenue</option>
            <option value="sector">Sector</option>
          </select>
          <select v-model="sortOrder" class="px-3 py-2 border rounded-md text-sm">
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>

      <!-- Wishlist Table -->
      <div class="border rounded-lg overflow-hidden">
        <!-- Table Header -->
        <div class="grid grid-cols-12 gap-4 px-4 py-3 bg-muted/30 font-medium text-sm">
          <div class="col-span-3">Company</div>
          <div class="col-span-1 text-right">Price</div>
          <div class="col-span-1 text-right">Change %</div>
          <div class="col-span-2 text-right">Market Cap</div>
          <div class="col-span-1 text-right">P/E</div>
          <div class="col-span-2">Sector</div>
          <div class="col-span-2 flex justify-end">Actions</div>
        </div>
        
        <!-- Table Body -->
        <div>
          <div
            v-for="company in filteredAndSortedCompanies"
            :key="company.symbol"
            class="grid grid-cols-12 gap-4 items-center px-4 py-3 border-t first:border-t-0 hover:bg-muted/10 transition-colors"
          >
            <!-- Company Info -->
            <div class="col-span-3 flex items-center gap-3">
              <div class="w-8 h-8 rounded-md flex items-center justify-center" 
                   :style="`background-color: ${getCompanyColor(company.symbol)}`">
                <span class="text-white font-medium">{{ company.symbol.substring(0, 2) }}</span>
              </div>
              <div>
                <div class="font-medium text-sm">{{ company.name }}</div>
                <div class="text-xs text-muted-foreground flex items-center gap-1">
                  <span>{{ company.symbol }}</span>
                  <span class="text-muted-foreground/50">•</span>
                  <span>{{ company.exchange }}</span>
                </div>
              </div>
            </div>
            
            <!-- Price -->
            <div class="col-span-1 text-right font-medium">
              {{ typeof company.price === 'number' ? company.price.toLocaleString('en-US', { style: 'currency', currency: company.currency || 'USD', minimumFractionDigits: 2 }) : company.price }}
            </div>
            
            <!-- Change % -->
            <div
              class="col-span-1 text-right font-medium"
              :class="{ 'text-green-600': company.changePercent > 0, 'text-red-600': company.changePercent < 0, 'text-muted-foreground': company.changePercent === 0 }"
            >
              {{ company.changePercent > 0 ? '+' : '' }}{{ company.changePercent.toFixed(2) }}%
            </div>
            
            <!-- Market Cap -->
            <div class="col-span-2 text-right text-sm">
              {{ company.marketCap }}
            </div>
            
            <!-- P/E Ratio -->
            <div class="col-span-1 text-right text-sm">
              {{ company.peRatio }}
            </div>
            
            <!-- Sector -->
            <div class="col-span-2 text-sm">
              <span class="inline-flex px-2 py-1 bg-muted/30 rounded-full text-xs">
                {{ company.sector || 'N/A' }}
              </span>
            </div>
            
            <!-- Actions -->
            <div class="col-span-2 flex justify-end gap-2">
              <UiButton variant="ghost" size="sm" @click="viewCompanyDetails(company)">
                <Icon name="lucide:chart" class="h-4 w-4" />
                <span class="sr-only">View Details</span>
              </UiButton>
              <UiButton variant="ghost" size="sm" @click.stop="wishlistStore.removeFromWishlist(company.symbol)">
                <Icon name="lucide:trash-2" class="h-4 w-4" />
                <span class="sr-only">Remove</span>
              </UiButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { definePageMeta } from '#imports';
import { useWishlistStore } from '@/stores/wishlistStore';
import wishlistData from '@/data/wishlistData';
import type { WishlistItem } from '@/data/types';

// Define page meta
definePageMeta({
  layout: 'dashboard',
  middleware: ['auth'],
  requiresAuth: true,
});

// Setup router for navigation
const router = useRouter();

// Access wishlist store
const wishlistStore = useWishlistStore();

// Search and sort state
const searchQuery = ref('');
const sortBy = ref('name');
const sortOrder = ref('asc');

// Computed property for wishlisted companies with details
const wishlistedCompanies = computed<WishlistItem[]>(() => {
  return wishlistStore.wishlist
    .map(symbol => {
      // Return data from our mock wishlist data
      if (wishlistData[symbol]) {
        return wishlistData[symbol];
      }
      return null;
    })
    .filter((item): item is WishlistItem => item !== null);
});

// Filtered and sorted companies
const filteredAndSortedCompanies = computed(() => {
  // First filter by search query
  let results = wishlistedCompanies.value;
  
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    results = results.filter(company => 
      company.name.toLowerCase().includes(query) ||
      company.symbol.toLowerCase().includes(query) ||
      (company.sector && company.sector.toLowerCase().includes(query)) ||
      (company.industry && company.industry.toLowerCase().includes(query))
    );
  }
  
  // Then sort by selected criteria
  results = [...results].sort((a, b) => {
    // Handle different data types appropriately
    let valA = (a as any)[sortBy.value];
    let valB = (b as any)[sortBy.value];
    
    // Handle string representations of numbers (like "2.87T")
    if (typeof valA === 'string' && typeof valB === 'string') {
      // Try string comparison
      if (sortOrder.value === 'asc') {
        return valA.localeCompare(valB);
      } else {
        return valB.localeCompare(valA);
      }
    }
    
    // Handle numeric values
    if (sortOrder.value === 'asc') {
      return valA > valB ? 1 : -1;
    } else {
      return valA < valB ? 1 : -1;
    }
  });
  
  return results;
});

// Function to view company details
const viewCompanyDetails = (company: WishlistItem) => {
  router.push(`/dashboard/companies/${company.symbol}`);
};

// Function to generate a consistent color based on company symbol
const getCompanyColor = (symbol: string) => {
  const colors = [
    '#4F46E5', '#0EA5E9', '#10B981', '#F59E0B', '#EF4444',
    '#8B5CF6', '#EC4899', '#6366F1', '#84CC16', '#14B8A6'
  ];
  
  // Simple hash function
  let hash = 0;
  for (let i = 0; i < symbol.length; i++) {
    hash = ((hash << 5) - hash) + symbol.charCodeAt(i);
    hash = hash & hash; // Convert to 32bit integer
  }
  
  // Get a positive index
  const index = Math.abs(hash) % colors.length;
  return colors[index];
};

// Function to preload sample data for empty watchlists
const preloadSampleData = () => {
  const sampleSymbols = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA'];
  
  // Clear existing wishlist
  while (wishlistStore.wishlist.length > 0) {
    wishlistStore.removeFromWishlist(wishlistStore.wishlist[0]);
  }
  
  // Add sample companies
  sampleSymbols.forEach(symbol => {
    wishlistStore.addToWishlist(symbol);
  });
};
</script> 