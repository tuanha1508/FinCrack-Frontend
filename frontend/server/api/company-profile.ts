import { defineEventHandler, getQuery } from 'h3'
import { FINNHUB_ENDPOINTS, FINNHUB_API_KEY } from '../../constants/api'

export default defineEventHandler(async (event) => {
  try {
    // Get the Finnhub API key
    const API_KEY = FINNHUB_API_KEY
    
    // Check if API key is available
    if (!API_KEY) {
      return {
        error: 'Finnhub API key is not configured.'
      }
    }
    
    const query = getQuery(event)
    const { symbol } = query
    
    if (!symbol) {
      return {
        error: 'Symbol parameter is required'
      }
    }

    // Make request to Finnhub API
    const response = await fetch(
      FINNHUB_ENDPOINTS.COMPANY_PROFILE(String(symbol)),
      {
        headers: {
          'User-Agent': 'FinHack/1.0',
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      }
    )
    
    if (!response.ok) {
      console.error(`Company profile API request failed with status ${response.status}`)
      
      // Provide more detailed error information based on status code
      let errorMessage = `API request failed with status ${response.status}.`;
      
      if (response.status === 401 || response.status === 403) {
        errorMessage += ' Your API key may be invalid or expired.';
      } else if (response.status === 429) {
        errorMessage += ' You have exceeded the rate limit. Please try again later.';
      } else if (response.status >= 500) {
        errorMessage += ' The Finnhub service is experiencing issues. Please try again later.';
      }
      
      return {
        error: errorMessage,
        status: response.status
      }
    }
    
    const data = await response.json()
    
    // Check if response is empty (Finnhub returns empty object when no data found)
    if (!data || Object.keys(data).length === 0) {
      return {
        error: `No profile data found for symbol: ${symbol}`,
        status: 404
      }
    }
    
    return data
    
  } catch (error) {
    console.error('Error fetching company profile:', error)
    return {
      error: 'Failed to fetch company profile',
      details: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}) 