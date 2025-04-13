/**
 * Finnhub API utility functions
 * 
 * This file contains utility functions for interacting with the Finnhub API.
 * It provides type-safe interfaces and handles API responses.
 */

import { FINNHUB_ENDPOINTS } from '../constants/api';

// Quote data interface
export interface Quote {
  c: number;      // Current price
  d: number;      // Change
  dp: number;     // Percent change
  h: number;      // High price of the day
  l: number;      // Low price of the day
  o: number;      // Open price of the day
  pc: number;     // Previous close price
  t: number;      // Timestamp
}

// Company profile interface
export interface CompanyProfile {
  country: string;
  currency: string;
  exchange: string;
  finnhubIndustry: string;
  ipo: string;
  logo: string;
  marketCapitalization: number;
  name: string;
  phone: string;
  shareOutstanding: number;
  ticker: string;
  weburl: string;
}

// Symbol search result interface
export interface SymbolSearchResult {
  description: string;
  displaySymbol: string;
  symbol: string;
  type: string;
}

// Symbol search response interface
export interface SymbolSearchResponse {
  count: number;
  result: SymbolSearchResult[];
}

// News article interface
export interface NewsArticle {
  category: string;
  datetime: number;
  headline: string;
  id: number;
  image: string;
  related: string;
  source: string;
  summary: string;
  url: string;
}

// Company financial metrics interface
export interface FinancialMetrics {
  metric: Record<string, number | string>;
  metricType: string;
  series: Record<string, any>;
}

// Earnings data interface
export interface EarningsData {
  actual: number;
  estimate: number;
  period: string;
  quarter: number;
  surprise: number;
  surprisePercent: number;
  symbol: string;
  year: number;
}

/**
 * Get real-time quote data for a specific symbol
 * @param symbol - Stock ticker symbol
 * @returns Promise with quote data
 */
export async function getQuote(symbol: string): Promise<Quote> {
  // Input validation
  if (!symbol || symbol.trim() === '') {
    throw new Error('Ticker symbol is required');
  }

  try {
    const encodedSymbol = encodeURIComponent(symbol.trim().toUpperCase());
    const response = await fetch(FINNHUB_ENDPOINTS.QUOTE(encodedSymbol), {
      headers: {
        'User-Agent': 'FinCrack/1.0'
      }
    });

    if (!response.ok) {
      throw new Error(`API request failed with status: ${response.status}`);
    }

    return await response.json() as Quote;
  } catch (error) {
    console.error('Error getting quote:', error);
    throw error;
  }
}

/**
 * Get company profile information
 * @param symbol - Stock ticker symbol
 * @returns Promise with company profile data
 */
export async function getCompanyProfile(symbol: string): Promise<CompanyProfile | null> {
  // Input validation
  if (!symbol || symbol.trim() === '') {
    throw new Error('Ticker symbol is required');
  }

  try {
    const encodedSymbol = encodeURIComponent(symbol.trim().toUpperCase());
    const response = await fetch(FINNHUB_ENDPOINTS.COMPANY_PROFILE(encodedSymbol), {
      headers: {
        'User-Agent': 'FinCrack/1.0'
      }
    });

    if (!response.ok) {
      throw new Error(`API request failed with status: ${response.status}`);
    }

    const data = await response.json();
    
    // Check if response is empty (returns empty object when symbol not found)
    if (!data || Object.keys(data).length === 0) {
      return null;
    }
    
    return data as CompanyProfile;
  } catch (error) {
    console.error('Error getting company profile:', error);
    throw error;
  }
}

/**
 * Search for symbols by query string
 * @param query - Search query string
 * @returns Promise with search results
 */
export async function searchSymbols(query: string): Promise<SymbolSearchResult[]> {
  // Input validation
  if (!query || query.trim() === '') {
    throw new Error('Search query is required');
  }

  try {
    const encodedQuery = encodeURIComponent(query.trim());
    const response = await fetch(FINNHUB_ENDPOINTS.SYMBOL_SEARCH(encodedQuery), {
      headers: {
        'User-Agent': 'FinCrack/1.0'
      }
    });

    if (!response.ok) {
      throw new Error(`API request failed with status: ${response.status}`);
    }

    const data = await response.json() as SymbolSearchResponse;
    
    // Check if we have results
    if (!data.result || !Array.isArray(data.result)) {
      return [];
    }
    
    return data.result;
  } catch (error) {
    console.error('Error searching for symbols:', error);
    throw error;
  }
}

/**
 * Get company news articles
 * @param symbol - Stock ticker symbol
 * @param from - Start date in YYYY-MM-DD format
 * @param to - End date in YYYY-MM-DD format
 * @returns Promise with news articles
 */
export async function getCompanyNews(symbol: string, from: string, to: string): Promise<NewsArticle[]> {
  // Input validation
  if (!symbol || symbol.trim() === '') {
    throw new Error('Ticker symbol is required');
  }
  
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!from || !dateRegex.test(from)) {
    throw new Error('From date must be in YYYY-MM-DD format');
  }
  
  if (!to || !dateRegex.test(to)) {
    throw new Error('To date must be in YYYY-MM-DD format');
  }

  try {
    const encodedSymbol = encodeURIComponent(symbol.trim().toUpperCase());
    const response = await fetch(FINNHUB_ENDPOINTS.COMPANY_NEWS(encodedSymbol, from, to), {
      headers: {
        'User-Agent': 'FinCrack/1.0'
      }
    });

    if (!response.ok) {
      throw new Error(`API request failed with status: ${response.status}`);
    }

    const data = await response.json();
    
    // Check if response is an array
    if (!Array.isArray(data)) {
      return [];
    }
    
    return data as NewsArticle[];
  } catch (error) {
    console.error('Error getting company news:', error);
    throw error;
  }
}

/**
 * Get general market news
 * @returns Promise with market news articles
 */
export async function getMarketNews(): Promise<NewsArticle[]> {
  try {
    const response = await fetch(FINNHUB_ENDPOINTS.MARKET_NEWS(), {
      headers: {
        'User-Agent': 'FinCrack/1.0'
      }
    });

    if (!response.ok) {
      throw new Error(`API request failed with status: ${response.status}`);
    }

    const data = await response.json();
    
    // Check if response is an array
    if (!Array.isArray(data)) {
      return [];
    }
    
    return data as NewsArticle[];
  } catch (error) {
    console.error('Error getting market news:', error);
    throw error;
  }
}

/**
 * Get company financial metrics
 * @param symbol - Stock ticker symbol
 * @returns Promise with financial metrics
 */
export async function getFinancials(symbol: string): Promise<FinancialMetrics | null> {
  // Input validation
  if (!symbol || symbol.trim() === '') {
    throw new Error('Ticker symbol is required');
  }

  try {
    const encodedSymbol = encodeURIComponent(symbol.trim().toUpperCase());
    const response = await fetch(FINNHUB_ENDPOINTS.FINANCIALS(encodedSymbol), {
      headers: {
        'User-Agent': 'FinCrack/1.0'
      }
    });

    if (!response.ok) {
      throw new Error(`API request failed with status: ${response.status}`);
    }

    const data = await response.json();
    
    // Check if response is empty
    if (!data || Object.keys(data).length === 0) {
      return null;
    }
    
    return data as FinancialMetrics;
  } catch (error) {
    console.error('Error getting financials:', error);
    throw error;
  }
}

/**
 * Get company earnings data
 * @param symbol - Stock ticker symbol
 * @returns Promise with earnings data
 */
export async function getEarnings(symbol: string): Promise<EarningsData[]> {
  // Input validation
  if (!symbol || symbol.trim() === '') {
    throw new Error('Ticker symbol is required');
  }

  try {
    const encodedSymbol = encodeURIComponent(symbol.trim().toUpperCase());
    const response = await fetch(FINNHUB_ENDPOINTS.EARNINGS(encodedSymbol), {
      headers: {
        'User-Agent': 'FinCrack/1.0'
      }
    });

    if (!response.ok) {
      throw new Error(`API request failed with status: ${response.status}`);
    }

    const data = await response.json();
    
    // Check if response is an array
    if (!Array.isArray(data)) {
      return [];
    }
    
    return data as EarningsData[];
  } catch (error) {
    console.error('Error getting earnings data:', error);
    throw error;
  }
} 