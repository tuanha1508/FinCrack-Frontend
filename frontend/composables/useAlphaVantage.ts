import { ref } from 'vue'
import { 
  searchTickers, 
  getCompanyOverview, 
  type TickerSearchResult, 
  type CompanyOverview 
} from '../utils/alphaVantage'

/**
 * Composable providing Alpha Vantage API functions for Vue components
 */
export function useAlphaVantage() {
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const searchResults = ref<TickerSearchResult[]>([])
  const companyData = ref<CompanyOverview | null>(null)

  /**
   * Search for company tickers matching the provided keywords
   * @param keywords Search terms for company ticker/name
   */
  async function search(keywords: string): Promise<void> {
    isLoading.value = true
    error.value = null
    searchResults.value = []

    try {
      searchResults.value = await searchTickers(keywords)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred during ticker search'
      console.error('Ticker search error:', err)
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Get company overview data for a specific ticker symbol
   * @param symbol The stock ticker symbol
   */
  async function getCompany(symbol: string): Promise<void> {
    isLoading.value = true
    error.value = null
    companyData.value = null

    try {
      companyData.value = await getCompanyOverview(symbol)
      
      if (!companyData.value) {
        error.value = `No data found for symbol: ${symbol}`
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred while fetching company data'
      console.error('Company overview error:', err)
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Clear all current data and error states
   */
  function reset(): void {
    error.value = null
    searchResults.value = []
    companyData.value = null
  }

  return {
    // State
    isLoading,
    error,
    searchResults,
    companyData,
    
    // Actions
    search,
    getCompany,
    reset
  }
} 