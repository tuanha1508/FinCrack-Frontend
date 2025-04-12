/**
 * Centralized API Service
 * 
 * This file serves as the main entry point for all API calls in the application.
 * It exports all the functionality from the Finnhub API utility.
 */

// Re-export everything from the Finnhub utility
export * from './finnhub';

// For backward compatibility, also export Alpha Vantage functions
// These will use Finnhub under the hood
export * from './alphaVantage';

/**
 * API utility functions for the application
 */

/**
 * Fetches company news from our server-side API which proxies the Finnhub API
 * @param symbol Stock symbol (e.g., AAPL)
 * @param from Start date in YYYY-MM-DD format
 * @param to End date in YYYY-MM-DD format
 * @returns Array of news items or error object
 */
export async function fetchCompanyNews(symbol: string, from: string, to: string) {
  try {
    const response = await fetch(`/api/finnhub-news?symbol=${symbol}&from=${from}&to=${to}`);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `Request failed with status ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching company news:', error);
    throw error;
  }
} 