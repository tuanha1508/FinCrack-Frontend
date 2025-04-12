import { defineEventHandler, getQuery } from 'h3'
import { FINNHUB_ENDPOINTS, FINNHUB_API_KEY, FINNHUB_BASE_URL } from '../../constants/api'
import { useRuntimeConfig } from '#imports'

/**
 * Finnhub API integration for company news
 * 
 * This endpoint fetches company news from Finnhub
 * Endpoint: /company-news
 * Documentation: https://finnhub.io/docs/api/company-news
 * 
 * Required parameters:
 * - symbol: Stock symbol (e.g., AAPL)
 * 
 * Optional parameters:
 * - limit: Number of news items to return (defaults to 10)
 * - from: Start date in YYYY-MM-DD format (defaults to 30 days ago)
 * - to: End date in YYYY-MM-DD format (defaults to today)
 */

// Format date to YYYY-MM-DD
function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

// Get default date range (last 30 days)
function getDefaultDateRange(): { from: string, to: string } {
  const today = new Date();
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(today.getDate() - 30);
  
  return {
    from: formatDate(thirtyDaysAgo),
    to: formatDate(today)
  };
}

// Mock data for fallback in case of API errors
const MOCK_NEWS = [
  {
    category: "company news",
    datetime: Date.now(),
    headline: "Company Announces Strong Q2 Results",
    id: 1,
    image: "https://example.com/images/1.jpg",
    related: "AAPL",
    source: "FinHack News",
    summary: "The company reported earnings that exceeded market expectations, driving stock price up by 5% in after-hours trading.",
    url: "https://example.com/news/1"
  },
  {
    category: "technology",
    datetime: Date.now() - 86400000,
    headline: "New Product Launch Next Month",
    id: 2,
    image: "https://example.com/images/2.jpg",
    related: "AAPL",
    source: "Market Insider",
    summary: "The company is set to launch an innovative new product next month, which analysts predict could increase market share significantly.",
    url: "https://example.com/news/2"
  },
  {
    category: "business",
    datetime: Date.now() - 172800000,
    headline: "Strategic Partnership Announced",
    id: 3,
    image: "https://example.com/images/3.jpg",
    related: "AAPL",
    source: "Business Daily",
    summary: "A new strategic partnership has been announced that will expand the company's reach into emerging markets.",
    url: "https://example.com/news/3"
  },
  {
    category: "analysis",
    datetime: Date.now() - 259200000,
    headline: "Industry Analysis: Market Trends",
    id: 4,
    image: "https://example.com/images/4.jpg",
    related: "AAPL",
    source: "Financial Times",
    summary: "New industry report highlights favorable trends that could benefit the company in the coming fiscal year.",
    url: "https://example.com/news/4"
  },
  {
    category: "executive",
    datetime: Date.now() - 345600000,
    headline: "CEO Interview: Future Outlook",
    id: 5,
    image: "https://example.com/images/5.jpg",
    related: "AAPL",
    source: "Bloomberg",
    summary: "In an exclusive interview, the CEO shared insights about the company's long-term vision and upcoming initiatives.",
    url: "https://example.com/news/5"
  }
]

export default defineEventHandler(async (event) => {
  try {
    // Get Finnhub API key
    const API_KEY = FINNHUB_API_KEY
    
    // Get query parameters
    const query = getQuery(event)
    const { symbol, limit = 10, from, to } = query
    
    if (!symbol) {
      return {
        error: 'Symbol parameter is required'
      }
    }
    
    // Check if API key is available
    if (!API_KEY) {
      console.log('Using mock news data - No valid Finnhub API key provided')
      return {
        feed: MOCK_NEWS.map(item => ({
          ...item,
          related: String(symbol)
        }))
      }
    }

    // Get date range - use provided dates or default to last 30 days
    const dateRange = getDefaultDateRange();
    const fromDate = from ? String(from) : dateRange.from;
    const toDate = to ? String(to) : dateRange.to;

    // Make request to Finnhub company-news API
    const response = await fetch(
      `${FINNHUB_BASE_URL}/company-news?symbol=${String(symbol)}&from=${fromDate}&to=${toDate}&token=${API_KEY}`,
      {
        headers: {
          'User-Agent': 'FinHack/1.0',
          'Content-Type': 'application/json'
        }
      }
    )
    
    if (!response.ok) {
      console.error(`Finnhub News API request failed with status ${response.status}`)
      
      // Handle specific error codes
      if (response.status === 401 || response.status === 403) {
        return {
          error: 'API authentication failed. Please check your Finnhub API key.',
          status: response.status,
          feed: MOCK_NEWS
        }
      } else if (response.status === 429) {
        return {
          error: 'API rate limit exceeded. Please try again later.',
          status: response.status,
          feed: MOCK_NEWS
        }
      }
      
      return {
        error: `API request failed with status ${response.status}. Please check Finnhub API status.`,
        status: response.status,
        feed: MOCK_NEWS
      }
    }
    
    const data = await response.json()
    
    // Check if the response is an array with news items
    if (!Array.isArray(data) || data.length === 0) {
      console.warn(`No news data found for symbol: ${symbol}`)
      return {
        error: `No news found for symbol: ${symbol}`,
        feed: MOCK_NEWS.map(item => ({
          ...item,
          related: String(symbol)
        }))
      }
    }
    
    // Apply limit
    const limitedData = Number(limit) > 0 
      ? data.slice(0, Number(limit))
      : data;
    
    return {
      feed: limitedData
    }
    
  } catch (error) {
    console.error('Error fetching stock news:', error)
    return {
      error: 'Failed to fetch stock news',
      details: error instanceof Error ? error.message : 'Unknown error',
      feed: MOCK_NEWS
    }
  }
}) 