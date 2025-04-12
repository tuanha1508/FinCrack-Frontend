/**
 * API URLs and constants
 * 
 * This file centralizes all Finnhub API-related constants used throughout the application.
 */

// Finnhub API base URL and key
export const FINNHUB_BASE_URL = 'https://finnhub.io/api/v1'
export const FINNHUB_API_KEY = 'cvsttqhr01qhup0t27agcvsttqhr01qhup0t27b0'

// API endpoints for Finnhub
export const FINNHUB_ENDPOINTS = {
  QUOTE: (symbol: string) => 
    `${FINNHUB_BASE_URL}/quote?symbol=${symbol}&token=${FINNHUB_API_KEY}`,
  COMPANY_PROFILE: (symbol: string) => 
    `${FINNHUB_BASE_URL}/stock/profile2?symbol=${symbol}&token=${FINNHUB_API_KEY}`,
  SYMBOL_SEARCH: (query: string) => 
    `${FINNHUB_BASE_URL}/search?q=${query}&token=${FINNHUB_API_KEY}`,
  COMPANY_NEWS: (symbol: string, from: string, to: string) => 
    `${FINNHUB_BASE_URL}/company-news?symbol=${symbol}&from=${from}&to=${to}&token=${FINNHUB_API_KEY}`,
  MARKET_NEWS: () => 
    `${FINNHUB_BASE_URL}/news?category=general&token=${FINNHUB_API_KEY}`,
  FINANCIALS: (symbol: string) => 
    `${FINNHUB_BASE_URL}/stock/metric?symbol=${symbol}&metric=all&token=${FINNHUB_API_KEY}`,
  EARNINGS: (symbol: string) => 
    `${FINNHUB_BASE_URL}/stock/earnings?symbol=${symbol}&token=${FINNHUB_API_KEY}`,
  // Additional endpoints for features previously using Alpha Vantage
  COMPANY_OVERVIEW: (symbol: string) =>
    `${FINNHUB_BASE_URL}/stock/profile2?symbol=${symbol}&token=${FINNHUB_API_KEY}`,
  BASIC_FINANCIALS: (symbol: string) =>
    `${FINNHUB_BASE_URL}/stock/metric?symbol=${symbol}&metric=all&token=${FINNHUB_API_KEY}`
} 