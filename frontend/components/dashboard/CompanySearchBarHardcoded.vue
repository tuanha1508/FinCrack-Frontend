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
import { ref, watch, onMounted, onUnmounted } from 'vue';

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
const searchContainer = ref<HTMLElement | null>(null);

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

// Hardcoded company data
const hardcodedCompanies: Company[] = [
  { name: 'Apple Inc.', symbol: 'AAPL', exchange: 'NASDAQ', currency: 'USD' },
  { name: 'Microsoft Corporation', symbol: 'MSFT', exchange: 'NASDAQ', currency: 'USD' },
  { name: 'Amazon.com Inc.', symbol: 'AMZN', exchange: 'NASDAQ', currency: 'USD' },
  { name: 'Alphabet Inc.', symbol: 'GOOGL', exchange: 'NASDAQ', currency: 'USD' },
  { name: 'Meta Platforms Inc.', symbol: 'META', exchange: 'NASDAQ', currency: 'USD' },
  { name: 'Tesla, Inc.', symbol: 'TSLA', exchange: 'NASDAQ', currency: 'USD' },
  { name: 'NVIDIA Corporation', symbol: 'NVDA', exchange: 'NASDAQ', currency: 'USD' },
  { name: 'Netflix, Inc.', symbol: 'NFLX', exchange: 'NASDAQ', currency: 'USD' },
  { name: 'Adobe Inc.', symbol: 'ADBE', exchange: 'NASDAQ', currency: 'USD' },
  { name: 'PayPal Holdings, Inc.', symbol: 'PYPL', exchange: 'NASDAQ', currency: 'USD' },
  { name: 'Intel Corporation', symbol: 'INTC', exchange: 'NASDAQ', currency: 'USD' },
  { name: 'Cisco Systems, Inc.', symbol: 'CSCO', exchange: 'NASDAQ', currency: 'USD' },
  { name: 'Advanced Micro Devices, Inc.', symbol: 'AMD', exchange: 'NASDAQ', currency: 'USD' },
  { name: 'Salesforce, Inc.', symbol: 'CRM', exchange: 'NYSE', currency: 'USD' },
  { name: 'Oracle Corporation', symbol: 'ORCL', exchange: 'NYSE', currency: 'USD' },
  { name: 'International Business Machines', symbol: 'IBM', exchange: 'NYSE', currency: 'USD' },
  { name: 'Walmart Inc.', symbol: 'WMT', exchange: 'NYSE', currency: 'USD' },
  { name: 'JPMorgan Chase & Co.', symbol: 'JPM', exchange: 'NYSE', currency: 'USD' },
  { name: 'Bank of America Corporation', symbol: 'BAC', exchange: 'NYSE', currency: 'USD' },
  { name: 'Johnson & Johnson', symbol: 'JNJ', exchange: 'NYSE', currency: 'USD' }
];

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

// Search for companies using hardcoded data
const searchCompanies = (query: string) => {
  isLoading.value = true;
  hasError.value = false;
  
  // Simulate API delay
  setTimeout(() => {
    const normalizedQuery = query.toLowerCase();
    
    suggestions.value = hardcodedCompanies.filter(company => 
      company.name.toLowerCase().includes(normalizedQuery) || 
      company.symbol.toLowerCase().includes(normalizedQuery)
    );
    
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
</script> 