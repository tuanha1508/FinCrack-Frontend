<template>
  <div class="w-full">
    <div class="relative" ref="searchContainer">
      <input
        v-model="searchQuery"
        type="text"
        class="w-full px-4 py-3 pl-10 pr-12 border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        placeholder="Search for a company (e.g., Apple, AAPL, Microsoft)"
        @keyup.enter="handleSearch"
        @focus="searchQuery.length > 1 && (showSuggestions = true)"
      />
      <div class="absolute left-3 top-0 h-full flex items-center pointer-events-none">
        <Icon 
          name="lucide:search" 
          class="text-muted-foreground w-5 h-5" 
        />
      </div>
      <button 
        v-if="searchQuery" 
        @click="clearSearch"
        class="absolute right-3 top-0 h-full flex items-center"
      >
        <Icon name="lucide:x" class="w-5 h-5" />
      </button>
    </div>

    <!-- Error message -->
    <div v-if="hasError" class="mt-2 text-sm text-rose-500">
      {{ errorMessage }}
    </div>

    <!-- Search suggestions -->
    <div v-if="showSuggestions && suggestions.length > 0" class="absolute z-20 mt-1 w-full bg-card border rounded-lg shadow-lg max-h-60 overflow-y-auto">
      <div 
        v-for="(company, index) in suggestions" 
        :key="index" 
        @click="selectCompany(company)"
        class="p-3 hover:bg-accent hover:text-accent-foreground cursor-pointer border-b last:border-0"
      >
        <div class="flex items-center justify-between">
          <div>
            <div class="font-medium">{{ company.name }}</div>
            <div class="text-xs text-muted-foreground">{{ company.symbol }}{{ company.currency ? ' • ' + company.currency : '' }}{{ company.exchange && company.exchange !== 'Unknown' ? ' • ' + company.exchange : '' }}</div>
          </div>
          <div class="flex items-center gap-2">
            <button 
              @click.stop="toggleWishlist(company.symbol)"
              class="p-1 hover:bg-primary/20 rounded"
              :class="isInWishlist(company.symbol) ? 'text-amber-500' : 'text-muted-foreground'"
              :title="isInWishlist(company.symbol) ? 'Remove from wishlist' : 'Add to wishlist'"
            >
              <Icon :name="isInWishlist(company.symbol) ? 'lucide:star' : 'lucide:star'" class="w-4 h-4" />
            </button>
            <Icon name="lucide:chevron-right" class="w-4 h-4 text-muted-foreground" />
          </div>
        </div>
      </div>
    </div>

    <!-- No results message -->
    <div v-if="showSuggestions && suggestions.length === 0 && !isLoading" class="absolute z-20 mt-1 w-full bg-card border rounded-lg shadow-lg p-4 text-center">
      <p class="text-muted-foreground">No companies found matching "{{ searchQuery }}"</p>
    </div>

    <!-- Loading state -->
    <div v-if="isLoading" class="flex justify-center items-center py-4">
      <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue';
import tickersData from '@/constants/tickers.json';
import { useWishlistStore } from '@/stores/wishlistStore';

interface Company {
  name: string;
  symbol: string;
  exchange?: string;
  type?: string;
  currency?: string;
}

// Convert the tickers data to Company array format
const companiesFromJson = Object.values(tickersData).map(company => ({
  name: company.title,
  symbol: company.ticker,
  exchange: 'Unknown', // Default value as it's not in the JSON
  currency: 'USD' // Default value as it's not in the JSON
}));

// Cache for search results
const searchCache = new Map<string, Company[]>();
const CACHE_SIZE_LIMIT = 20; // Limit cache size to prevent memory issues

const searchQuery = ref('');
const suggestions = ref<Company[]>([]);
const showSuggestions = ref(false);
const isLoading = ref(false);
const selectedCompany = ref<Company | null>(null);
const hasError = ref(false);
const errorMessage = ref('');
const searchContainer = ref<HTMLElement | null>(null);

// Get wishlist store
const wishlistStore = useWishlistStore();

// Click outside listener
onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});

const handleClickOutside = (event: Event) => {
  if (searchContainer.value && !searchContainer.value.contains(event.target as Node)) {
    showSuggestions.value = false;
  }
};

// Emit event when company is selected
const emit = defineEmits(['companySelected']);

// Watch for changes in search query
watch(searchQuery, (newQuery) => {
  if (newQuery.length > 1) {
    searchCompanies(newQuery);
    showSuggestions.value = true;
  } else {
    suggestions.value = [];
    showSuggestions.value = false;
    hasError.value = false;
  }
});

// Search for companies using JSON data
const searchCompanies = (query: string) => {
  isLoading.value = true;
  hasError.value = false;
  
  // Simulate API delay
  setTimeout(() => {
    const normalizedQuery = query.toLowerCase();
    
    // Check cache first
    if (searchCache.has(normalizedQuery)) {
      suggestions.value = searchCache.get(normalizedQuery) || [];
      isLoading.value = false;
      return;
    }
    
    const maxResults = 20; // Limit results for better performance
    let resultCount = 0;
    
    const results = companiesFromJson.filter(company => {
      // Exit early once we have enough matches
      if (resultCount >= maxResults) return false;
      
      const nameMatch = company.name.toLowerCase().includes(normalizedQuery);
      const symbolMatch = company.symbol.toLowerCase().includes(normalizedQuery);
      
      if (nameMatch || symbolMatch) {
        resultCount++;
        return true;
      }
      
      return false;
    });
    
    suggestions.value = results;
    
    // Cache the results for future use
    if (searchCache.size >= CACHE_SIZE_LIMIT) {
      // Remove the oldest entry if cache is full
      const cacheKeys = Array.from(searchCache.keys());
      if (cacheKeys.length > 0) {
        searchCache.delete(cacheKeys[0]);
      }
    }
    searchCache.set(normalizedQuery, results);
    
    isLoading.value = false;
  }, 300);
};

// Handle search submission
const handleSearch = () => {
  if (searchQuery.value) {
    searchCompanies(searchQuery.value);
    showSuggestions.value = true;
  }
};

// Clear search
const clearSearch = () => {
  searchQuery.value = '';
  suggestions.value = [];
  showSuggestions.value = false;
  hasError.value = false;
};

// Select a company
const selectCompany = (company: Company) => {
  selectedCompany.value = company;
  searchQuery.value = company.name;
  showSuggestions.value = false;
  emit('companySelected', company);
};

// Check if a company is in the wishlist
const isInWishlist = (symbol: string): boolean => {
  return wishlistStore.isInWishlist(symbol);
};

// Toggle wishlist status
const toggleWishlist = async (symbol: string) => {
  await wishlistStore.toggleWishlist(symbol);
};
</script> 