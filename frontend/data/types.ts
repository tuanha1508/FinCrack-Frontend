/**
 * Common type definitions for financial data
 */

// Stock market data
export interface StockData {
  price: number;
  change: number;
  changePercent: number;
  open: number;
  high: number;
  low: number;
  volume: number;
  prevClose: number;
  marketCap: number;
  peRatio: number;
  dividendYield: number;
  pegRatio: number;
  roe: number;
  rsi: number;
  pbRatio: number;
  roa: number;
  macdLine: number;
  psRatio: number;
}

// Company financial data
export interface FinancialData {
  revenue: number;
  revenueGrowth: number;
  grossProfit: number;
  grossProfitGrowth: number;
  netIncome: number;
  netIncomeGrowth: number;
  eps: number;
  epsGrowth: number;
  profitMargin: number;
  profitMarginChange: number;
}

// News article data
export interface NewsItem {
  title: string;
  url: string;
  time_published: string;
  summary: string;
  source: string;
  overall_sentiment_score?: number;
}

// Complete company data including stock, financial, and news information
export interface CompanyData {
  stockData: StockData;
  financialData: FinancialData;
  news: NewsItem[];
}

// Basic company information
export interface Company {
  name: string;
  symbol: string;
  exchange?: string;
  currency?: string;
}

// Wishlist item with extended financial data 
export interface WishlistItem extends Company {
  marketCap?: string | number;
  changePercent: number;
  price?: string | number;
  peRatio?: number | string;
  revenue?: string | number;
  sector?: string;
  industry?: string;
  country?: string;
} 