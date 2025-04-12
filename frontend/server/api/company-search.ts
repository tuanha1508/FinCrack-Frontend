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
    const { searchTerm, limit = 10 } = query
    
    if (!searchTerm) {
      return {
        error: 'Search term is required'
      }
    }

    // Make request to Finnhub Symbol Search API
    // Construct the URL manually to ensure we're using Finnhub
    const finnhubUrl = `https://finnhub.io/api/v1/search?q=${encodeURIComponent(String(searchTerm))}&exchange=US&token=${API_KEY}`
    
    const response = await fetch(finnhubUrl, {
      headers: {
        'User-Agent': 'FinHack/1.0',
        'X-Finnhub-Token': API_KEY
      }
    })
    
    if (!response.ok) {
      console.error(`Search API request failed with status ${response.status}`)
      
      // Provide more detailed error information based on status code
      let errorMessage = `API request failed with status ${response.status}.`;
      
      if (response.status === 401 || response.status === 403) {
        errorMessage += ' Your API key may be invalid or expired.';
      } else if (response.status === 429) {
        errorMessage += ' You have exceeded the rate limit. Please try again later.';
      } else if (response.status >= 500) {
        errorMessage += ' The Finnhub service is experiencing issues. Please try again later.';
      }
      
      // Return error with mock data for development/testing
      return {
        error: errorMessage,
        status: response.status,
        mockData: [
          { symbol: 'AAPL', name: 'Apple Inc.', exchange: 'NASDAQ', type: 'stock', currency: 'USD' },
          { symbol: 'MSFT', name: 'Microsoft Corporation', exchange: 'NASDAQ', type: 'stock', currency: 'USD' },
          { symbol: 'AMZN', name: 'Amazon.com Inc.', exchange: 'NASDAQ', type: 'stock', currency: 'USD' },
          { symbol: 'GOOGL', name: 'Alphabet Inc.', exchange: 'NASDAQ', type: 'stock', currency: 'USD' },
          { symbol: 'META', name: 'Meta Platforms Inc.', exchange: 'NASDAQ', type: 'stock', currency: 'USD' }
        ]
      }
    }
    
    const data = await response.json()
    
    // Format response to match expected structure
    // Finnhub returns results in a different structure
    if (data.result && Array.isArray(data.result)) {
      // Map Finnhub format to the expected format
      const formattedResults = data.result.slice(0, Number(limit)).map((item: any) => ({
        symbol: item.symbol,
        name: item.description,
        type: item.type,
        // Finnhub doesn't provide these fields, so we'll use defaults or empty values
        region: 'US',
        currency: 'USD',
        exchange: ''
      }));
      
      return formattedResults;
    }
    
    // Check if data is empty or has an error
    if (!data.result || !Array.isArray(data.result) || data.result.length === 0) {
      return {
        error: `No results found for: ${searchTerm}`,
        status: 404,
        // Return mock data for empty results
        mockData: [
          { symbol: 'AAPL', name: 'Apple Inc.', exchange: 'NASDAQ', type: 'stock', currency: 'USD' },
          { symbol: 'MSFT', name: 'Microsoft Corporation', exchange: 'NASDAQ', type: 'stock', currency: 'USD' },
          { symbol: 'AMZN', name: 'Amazon.com Inc.', exchange: 'NASDAQ', type: 'stock', currency: 'USD' },
          { symbol: 'GOOGL', name: 'Alphabet Inc.', exchange: 'NASDAQ', type: 'stock', currency: 'USD' },
          { symbol: 'META', name: 'Meta Platforms Inc.', exchange: 'NASDAQ', type: 'stock', currency: 'USD' }
        ]
      }
    }
    
    return data
    
  } catch (error) {
    console.error('Error performing company search:', error)
    return {
      error: 'Failed to search for companies',
      details: error instanceof Error ? error.message : 'Unknown error',
      // Provide fallback mock data in case of errors
      mockData: [
        { symbol: 'AAPL', name: 'Apple Inc.', exchange: 'NASDAQ', type: 'stock', currency: 'USD' },
        { symbol: 'MSFT', name: 'Microsoft Corporation', exchange: 'NASDAQ', type: 'stock', currency: 'USD' },
        { symbol: 'AMZN', name: 'Amazon.com Inc.', exchange: 'NASDAQ', type: 'stock', currency: 'USD' },
        { symbol: 'GOOGL', name: 'Alphabet Inc.', exchange: 'NASDAQ', type: 'stock', currency: 'USD' },
        { symbol: 'META', name: 'Meta Platforms Inc.', exchange: 'NASDAQ', type: 'stock', currency: 'USD' }
      ]
    }
  }
}) 