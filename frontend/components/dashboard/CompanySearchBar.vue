<template>
  <div class="w-full">
    <div class="relative">
      <input
        v-model="searchQuery"
        type="text"
        class="w-full px-4 py-3 pl-10 pr-12 border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        placeholder="Search for a company (e.g., Apple, AAPL, Microsoft)"
        @keyup.enter="handleSearch"
      />
      <Icon 
        name="lucide:search" 
        class="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" 
      />
      <button 
        v-if="searchQuery" 
        @click="clearSearch"
        class="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
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
          <Icon name="lucide:chevron-right" class="w-4 h-4 text-muted-foreground" />
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
import { ref, watch } from 'vue';

interface Company {
  name: string;
  symbol: string;
  exchange: string;
  type?: string;
  currency?: string;
}

const searchQuery = ref('');
const suggestions = ref<Company[]>([]);
const showSuggestions = ref(false);
const isLoading = ref(false);
const selectedCompany = ref<Company | null>(null);
const hasError = ref(false);
const errorMessage = ref('');

// Emit event when company is selected
const emit = defineEmits(['companySelected']);

// Watch for changes in search query
watch(searchQuery, (newQuery) => {
  if (newQuery.length > 1) {
    searchCompanies(newQuery);
  } else {
    suggestions.value = [];
    showSuggestions.value = false;
    hasError.value = false;
  }
});

// Search for companies using the API
const searchCompanies = async (query: string) => {
  isLoading.value = true;
  hasError.value = false;
  
  try {
    const response = await fetch(`/api/company-search?searchTerm=${encodeURIComponent(query)}`);
    
    // Check if response is JSON before parsing
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('Server returned non-JSON response. The server might be down or restarting.');
    }
    
    const data = await response.json();
    
    if (data.error) {
      console.error('Error from API:', data.error);
      errorMessage.value = data.error;
      hasError.value = true;
      
      // Use mock data if available
      if (data.mockData && data.mockData.length > 0) {
        suggestions.value = data.mockData;
        showSuggestions.value = true;
      } else {
        suggestions.value = [];
        showSuggestions.value = false;
      }
    } else {
      suggestions.value = data.map((item: any) => ({
        name: item.name,
        symbol: item.symbol,
        exchange: item.exchange || 'Unknown',
        currency: item.currency || ''
      }));
      showSuggestions.value = true;
    }
  } catch (error) {
    console.error('Error searching companies:', error);
    hasError.value = true;
    errorMessage.value = 'Server error or connection issue. Please try again later.';
    suggestions.value = [];
    showSuggestions.value = false;
    
    // Provide mock data for a better user experience during server issues
    suggestions.value = [
      { symbol: 'AAPL', name: 'Apple Inc.', exchange: 'NASDAQ' },
      { symbol: 'MSFT', name: 'Microsoft Corporation', exchange: 'NASDAQ' },
      { symbol: 'AMZN', name: 'Amazon.com Inc.', exchange: 'NASDAQ' },
      { symbol: 'GOOGL', name: 'Alphabet Inc.', exchange: 'NASDAQ' },
      { symbol: 'META', name: 'Meta Platforms Inc.', exchange: 'NASDAQ' }
    ];
    showSuggestions.value = true;
  } finally {
    isLoading.value = false;
  }
};

// Handle search submission
const handleSearch = () => {
  if (searchQuery.value) {
    searchCompanies(searchQuery.value);
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
</script> 