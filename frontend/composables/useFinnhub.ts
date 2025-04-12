/**
 * Finnhub API composable
 * 
 * This composable provides reactive state and methods for interacting with the Finnhub API.
 * It wraps the utility functions with Vue's reactivity system for seamless use in components.
 */

import { ref } from 'vue';
import * as finnhubService from '~/utils/finnhub';
import type {
  Quote,
  CompanyProfile,
  SymbolSearchResult,
  NewsArticle,
  FinancialMetrics,
  EarningsData
} from '~/utils/finnhub';

export function useFinnhub() {
  // Reactive state
  const isLoading = ref(false);
  const error = ref<Error | null>(null);

  // Reactive data containers
  const quote = ref<Quote | null>(null);
  const companyProfile = ref<CompanyProfile | null>(null);
  const searchResults = ref<SymbolSearchResult[]>([]);
  const companyNews = ref<NewsArticle[]>([]);
  const marketNews = ref<NewsArticle[]>([]);
  const financials = ref<FinancialMetrics | null>(null);
  const earnings = ref<EarningsData[]>([]);

  /**
   * Reset error and loading state before making API calls
   */
  const resetState = () => {
    isLoading.value = true;
    error.value = null;
  };

  /**
   * Fetch real-time quote data
   * @param symbol - Stock ticker symbol
   */
  const fetchQuote = async (symbol: string) => {
    resetState();
    try {
      quote.value = await finnhubService.getQuote(symbol);
    } catch (err) {
      error.value = err instanceof Error ? err : new Error(String(err));
      quote.value = null;
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * Fetch company profile data
   * @param symbol - Stock ticker symbol
   */
  const fetchCompanyProfile = async (symbol: string) => {
    resetState();
    try {
      companyProfile.value = await finnhubService.getCompanyProfile(symbol);
    } catch (err) {
      error.value = err instanceof Error ? err : new Error(String(err));
      companyProfile.value = null;
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * Search for symbols
   * @param query - Search query string
   */
  const searchSymbols = async (query: string) => {
    resetState();
    try {
      searchResults.value = await finnhubService.searchSymbols(query);
    } catch (err) {
      error.value = err instanceof Error ? err : new Error(String(err));
      searchResults.value = [];
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * Fetch company news articles
   * @param symbol - Stock ticker symbol
   * @param from - Start date in YYYY-MM-DD format
   * @param to - End date in YYYY-MM-DD format
   */
  const fetchCompanyNews = async (symbol: string, from: string, to: string) => {
    resetState();
    try {
      companyNews.value = await finnhubService.getCompanyNews(symbol, from, to);
    } catch (err) {
      error.value = err instanceof Error ? err : new Error(String(err));
      companyNews.value = [];
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * Fetch general market news
   */
  const fetchMarketNews = async () => {
    resetState();
    try {
      marketNews.value = await finnhubService.getMarketNews();
    } catch (err) {
      error.value = err instanceof Error ? err : new Error(String(err));
      marketNews.value = [];
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * Fetch company financial metrics
   * @param symbol - Stock ticker symbol
   */
  const fetchFinancials = async (symbol: string) => {
    resetState();
    try {
      financials.value = await finnhubService.getFinancials(symbol);
    } catch (err) {
      error.value = err instanceof Error ? err : new Error(String(err));
      financials.value = null;
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * Fetch company earnings data
   * @param symbol - Stock ticker symbol
   */
  const fetchEarnings = async (symbol: string) => {
    resetState();
    try {
      earnings.value = await finnhubService.getEarnings(symbol);
    } catch (err) {
      error.value = err instanceof Error ? err : new Error(String(err));
      earnings.value = [];
    } finally {
      isLoading.value = false;
    }
  };

  return {
    // Reactive state
    isLoading,
    error,
    quote,
    companyProfile,
    searchResults,
    companyNews,
    marketNews,
    financials,
    earnings,

    // Methods
    fetchQuote,
    fetchCompanyProfile,
    searchSymbols,
    fetchCompanyNews,
    fetchMarketNews,
    fetchFinancials,
    fetchEarnings
  };
} 