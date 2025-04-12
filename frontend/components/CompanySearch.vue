<template>
  <div class="company-search">
    <h2 class="text-2xl font-bold mb-4">Company Search</h2>
    
    <!-- Search Form -->
    <div class="mb-6">
      <div class="flex gap-2 mb-2">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search for a company (e.g. Microsoft, AAPL)"
          class="flex-1 p-2 border rounded"
          @keyup.enter="handleSearch"
        />
        <button
          @click="handleSearch"
          class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          :disabled="isLoading"
        >
          {{ isLoading && currentAction === 'search' ? 'Searching...' : 'Search' }}
        </button>
      </div>
      <p v-if="error" class="text-red-500 text-sm">{{ error }}</p>
    </div>
    
    <!-- Search Results -->
    <div v-if="searchResults.length > 0" class="mb-6">
      <h3 class="text-xl font-semibold mb-2">Search Results</h3>
      <div class="overflow-x-auto">
        <table class="min-w-full bg-white border">
          <thead>
            <tr class="bg-gray-100">
              <th class="py-2 px-4 border text-left">Symbol</th>
              <th class="py-2 px-4 border text-left">Name</th>
              <th class="py-2 px-4 border text-left">Type</th>
              <th class="py-2 px-4 border text-left">Region</th>
              <th class="py-2 px-4 border text-left">Currency</th>
              <th class="py-2 px-4 border text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="result in searchResults" :key="result.symbol" class="hover:bg-gray-50">
              <td class="py-2 px-4 border font-medium">{{ result.symbol }}</td>
              <td class="py-2 px-4 border">{{ result.name }}</td>
              <td class="py-2 px-4 border">{{ result.type }}</td>
              <td class="py-2 px-4 border">{{ result.region }}</td>
              <td class="py-2 px-4 border">{{ result.currency }}</td>
              <td class="py-2 px-4 border">
                <button
                  @click="getCompanyDetails(result.symbol)"
                  class="text-blue-500 hover:text-blue-700 underline"
                  :disabled="isLoading"
                >
                  View Details
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    
    <!-- Company Details -->
    <div v-if="companyData" class="company-details bg-gray-50 p-4 rounded border">
      <div class="flex justify-between items-start mb-4">
        <h3 class="text-xl font-bold">{{ companyData.Name }}</h3>
        <div class="text-right">
          <div class="text-sm text-gray-600">{{ companyData.Exchange }}</div>
          <div class="font-medium">{{ companyData.Symbol }}</div>
        </div>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <h4 class="font-semibold mb-1">Industry</h4>
          <p>{{ companyData.Industry }}</p>
        </div>
        <div>
          <h4 class="font-semibold mb-1">Sector</h4>
          <p>{{ companyData.Sector }}</p>
        </div>
        <div>
          <h4 class="font-semibold mb-1">Country</h4>
          <p>{{ companyData.Country }}</p>
        </div>
        <div>
          <h4 class="font-semibold mb-1">Currency</h4>
          <p>{{ companyData.Currency }}</p>
        </div>
      </div>
      
      <div class="mb-4">
        <h4 class="font-semibold mb-1">Description</h4>
        <p class="text-sm">{{ companyData.Description }}</p>
      </div>
      
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div v-if="companyData.MarketCapitalization" class="bg-white p-3 rounded shadow-sm">
          <div class="text-sm text-gray-600">Market Cap</div>
          <div class="font-semibold">${{ formatLargeNumber(companyData.MarketCapitalization) }}</div>
        </div>
        <div v-if="companyData.PERatio" class="bg-white p-3 rounded shadow-sm">
          <div class="text-sm text-gray-600">P/E Ratio</div>
          <div class="font-semibold">{{ companyData.PERatio }}</div>
        </div>
        <div v-if="companyData.EPS" class="bg-white p-3 rounded shadow-sm">
          <div class="text-sm text-gray-600">EPS</div>
          <div class="font-semibold">{{ companyData.EPS }}</div>
        </div>
        <div v-if="companyData.DividendYield" class="bg-white p-3 rounded shadow-sm">
          <div class="text-sm text-gray-600">Dividend Yield</div>
          <div class="font-semibold">{{ companyData.DividendYield }}%</div>
        </div>
        <div v-if="companyData['WeekHigh52']" class="bg-white p-3 rounded shadow-sm">
          <div class="text-sm text-gray-600">52 Week High</div>
          <div class="font-semibold">${{ companyData['WeekHigh52'] }}</div>
        </div>
        <div v-if="companyData['WeekLow52']" class="bg-white p-3 rounded shadow-sm">
          <div class="text-sm text-gray-600">52 Week Low</div>
          <div class="font-semibold">${{ companyData['WeekLow52'] }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAlphaVantage } from '../composables/useAlphaVantage'

const searchQuery = ref('')
const currentAction = ref<'search' | 'details'>('search')

const { 
  isLoading, 
  error, 
  searchResults, 
  companyData, 
  search, 
  getCompany
} = useAlphaVantage()

/**
 * Handle search form submission
 */
async function handleSearch() {
  if (!searchQuery.value.trim()) return
  
  currentAction.value = 'search'
  await search(searchQuery.value)
}

/**
 * Get detailed company information for a ticker symbol
 */
async function getCompanyDetails(symbol: string) {
  currentAction.value = 'details'
  await getCompany(symbol)
}

/**
 * Format large numbers with K, M, B suffixes
 */
function formatLargeNumber(value: string): string {
  const num = parseFloat(value)
  if (isNaN(num)) return value
  
  if (num >= 1e12) return (num / 1e12).toFixed(2) + 'T'
  if (num >= 1e9) return (num / 1e9).toFixed(2) + 'B'
  if (num >= 1e6) return (num / 1e6).toFixed(2) + 'M'
  if (num >= 1e3) return (num / 1e3).toFixed(2) + 'K'
  
  return num.toString()
}
</script> 