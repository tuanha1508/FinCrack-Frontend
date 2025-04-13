/**
 * Mock data for wishlisted companies
 * This data provides detailed financial information for companies that might be in a user's wishlist
 */

import { WishlistItem } from '@/data/types';

// Companies that might be added to a wishlist with realistic financial data
const wishlistData: Record<string, WishlistItem> = {
  "AAPL": {
    symbol: "AAPL",
    name: "Apple Inc.",
    exchange: "NASDAQ",
    currency: "USD",
    marketCap: "2.87T",
    changePercent: 1.28,
    price: 185.56,
    peRatio: 30.12,
    revenue: "394.3B",
    sector: "Technology",
    industry: "Consumer Electronics",
    country: "United States"
  },
  "MSFT": {
    symbol: "MSFT",
    name: "Microsoft Corp",
    exchange: "NASDAQ",
    currency: "USD",
    marketCap: "3.09T",
    changePercent: 0.91,
    price: 415.32,
    peRatio: 38.42,
    revenue: "211.9B",
    sector: "Technology",
    industry: "Software",
    country: "United States"
  },
  "GOOGL": {
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    exchange: "NASDAQ",
    currency: "USD",
    marketCap: "1.80T",
    changePercent: -0.61,
    price: 142.65,
    peRatio: 24.68,
    revenue: "305.6B",
    sector: "Technology",
    industry: "Internet Content & Information",
    country: "United States"
  },
  "AMZN": {
    symbol: "AMZN",
    name: "Amazon.com Inc",
    exchange: "NASDAQ",
    currency: "USD",
    marketCap: "1.70T",
    changePercent: 0.58,
    price: 178.95,
    peRatio: 52.64,
    revenue: "554.0B",
    sector: "Consumer Cyclical",
    industry: "Internet Retail",
    country: "United States"
  },
  "TSLA": {
    symbol: "TSLA",
    name: "Tesla, Inc.",
    exchange: "NASDAQ",
    currency: "USD",
    marketCap: "694.8B",
    changePercent: -2.13,
    price: 218.32,
    peRatio: 55.91,
    revenue: "96.8B",
    sector: "Consumer Cyclical",
    industry: "Auto Manufacturers",
    country: "United States"
  },
  "META": {
    symbol: "META",
    name: "Meta Platforms, Inc.",
    exchange: "NASDAQ",
    currency: "USD",
    marketCap: "1.07T",
    changePercent: 1.46,
    price: 415.89,
    peRatio: 24.17,
    revenue: "134.9B",
    sector: "Technology",
    industry: "Internet Content & Information",
    country: "United States"
  },
  "NVDA": {
    symbol: "NVDA",
    name: "NVIDIA Corp",
    exchange: "NASDAQ",
    currency: "USD",
    marketCap: "2.10T",
    changePercent: 2.37,
    price: 851.98,
    peRatio: 78.88,
    revenue: "44.9B",
    sector: "Technology",
    industry: "Semiconductors",
    country: "United States"
  },
  "JPM": {
    symbol: "JPM",
    name: "JPMorgan Chase & Co",
    exchange: "NYSE",
    currency: "USD",
    marketCap: "550.2B",
    changePercent: 0.42,
    price: 190.75,
    peRatio: 11.54,
    revenue: "154.9B",
    sector: "Financial Services",
    industry: "Banks - Diversified",
    country: "United States"
  },
  "V": {
    symbol: "V",
    name: "Visa Inc.",
    exchange: "NYSE",
    currency: "USD",
    marketCap: "528.6B",
    changePercent: 0.73,
    price: 258.43,
    peRatio: 31.62,
    revenue: "32.6B",
    sector: "Financial Services",
    industry: "Credit Services",
    country: "United States"
  },
  "JNJ": {
    symbol: "JNJ",
    name: "Johnson & Johnson",
    exchange: "NYSE",
    currency: "USD",
    marketCap: "381.2B",
    changePercent: -0.89,
    price: 158.56,
    peRatio: 13.89,
    revenue: "85.2B",
    sector: "Healthcare",
    industry: "Drug Manufacturers - General",
    country: "United States"
  },
  "WMT": {
    symbol: "WMT",
    name: "Walmart Inc",
    exchange: "NYSE",
    currency: "USD",
    marketCap: "514.8B",
    changePercent: 1.07,
    price: 68.32,
    peRatio: 28.52,
    revenue: "648.1B",
    sector: "Consumer Defensive",
    industry: "Discount Stores",
    country: "United States"
  },
  "PG": {
    symbol: "PG",
    name: "Procter & Gamble Co",
    exchange: "NYSE",
    currency: "USD",
    marketCap: "389.1B",
    changePercent: 0.54,
    price: 165.21,
    peRatio: 27.15,
    revenue: "82.0B",
    sector: "Consumer Defensive",
    industry: "Household & Personal Products",
    country: "United States"
  }
};

export default wishlistData; 