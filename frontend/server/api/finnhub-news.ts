import { defineEventHandler, getQuery } from 'h3'
import { FINNHUB_API_KEY, FINNHUB_BASE_URL } from '../../constants/api'

/**
 * Finnhub API proxy for fetching company news
 * 
 * This endpoint bypasses CORS issues by acting as a server-side proxy
 * to the Finnhub API, correctly setting the X-Finnhub-Token header
 * 
 * Required parameters:
 * - symbol: Stock symbol (e.g., AAPL)
 * - from: Start date in YYYY-MM-DD format
 * - to: End date in YYYY-MM-DD format
 */

export default defineEventHandler(async (event) => {
  try {
    // Get query parameters
    const query = getQuery(event)
    const { symbol, from, to } = query
    
    if (!symbol || !from || !to) {
      return {
        error: 'Symbol, from, and to parameters are required'
      }
    }
    
    // Check if API key is available
    if (!FINNHUB_API_KEY) {
      return {
        error: 'No valid Finnhub API key provided'
      }
    }

    // Make request to Finnhub company-news API
    const response = await fetch(
      `${FINNHUB_BASE_URL}/company-news?symbol=${String(symbol)}&from=${String(from)}&to=${String(to)}`,
      {
        headers: {
          'User-Agent': 'FinHack/1.0',
          'Content-Type': 'application/json',
          'X-Finnhub-Token': FINNHUB_API_KEY
        }
      }
    )
    
    if (!response.ok) {
      console.error(`Finnhub News API request failed with status ${response.status}`)
      
      // Handle specific error codes
      if (response.status === 401 || response.status === 403) {
        return {
          error: 'API authentication failed. Please check your Finnhub API key.',
          status: response.status
        }
      } else if (response.status === 429) {
        return {
          error: 'API rate limit exceeded. Please try again later.',
          status: response.status
        }
      }
      
      return {
        error: `API request failed with status ${response.status}. Please check Finnhub API status.`,
        status: response.status
      }
    }
    
    const data = await response.json()
    
    // Check if the response is an array with news items
    if (!Array.isArray(data) || data.length === 0) {
      console.warn(`No news data found for symbol: ${symbol}`)
      return {
        error: `No news found for symbol: ${symbol}`
      }
    }
    
    return data
    
  } catch (error) {
    console.error('Error fetching company news:', error)
    return {
      error: 'Failed to fetch company news',
      details: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}) 