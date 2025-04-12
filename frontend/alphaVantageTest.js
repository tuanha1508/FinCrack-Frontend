// Alpha Vantage API test script
import 'dotenv/config'; // Load environment variables from .env file
import fetch from 'node-fetch';

// Get API key from environment variables
const ALPHA_VANTAGE_API_KEY = process.env.NUXT_ALPHA_VANTAGE_API_KEY;
const ALPHA_VANTAGE_BASE_URL = 'https://www.alphavantage.co/query';

// Test symbol and search term
const SYMBOL = 'MSFT';
const SEARCH_TERM = 'Microsoft';

/**
 * Search for company tickers
 * @param {string} keywords - Search keywords
 * @returns {Promise<object>} Search results
 */
async function searchTickers(keywords) {
  try {
    const response = await fetch(
      `${ALPHA_VANTAGE_BASE_URL}?function=SYMBOL_SEARCH&keywords=${encodeURIComponent(keywords)}&apikey=${ALPHA_VANTAGE_API_KEY}`,
      { headers: { 'User-Agent': 'FinHack/1.0' } }
    );
    
    if (!response.ok) {
      throw new Error(`API request failed with status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error searching for tickers:', error);
    throw error;
  }
}

/**
 * Get company overview data
 * @param {string} symbol - Company ticker symbol
 * @returns {Promise<object>} Company overview data
 */
async function getCompanyOverview(symbol) {
  try {
    const response = await fetch(
      `${ALPHA_VANTAGE_BASE_URL}?function=OVERVIEW&symbol=${encodeURIComponent(symbol)}&apikey=${ALPHA_VANTAGE_API_KEY}`,
      { headers: { 'User-Agent': 'FinHack/1.0' } }
    );
    
    if (!response.ok) {
      throw new Error(`API request failed with status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error getting company overview:', error);
    throw error;
  }
}

async function testAlphaVantageAPI() {
  console.log('Testing Alpha Vantage API...');
  
  // Check if API key is available
  if (!ALPHA_VANTAGE_API_KEY) {
    console.error('Error: Alpha Vantage API Key is missing. Please set NUXT_ALPHA_VANTAGE_API_KEY in .env file.');
    return;
  }
  
  try {
    // Test ticker search
    console.log('\nTesting Alpha Vantage ticker search:');
    console.log(`Searching for: ${SEARCH_TERM}`);
    const searchResults = await searchTickers(SEARCH_TERM);
    
    if (searchResults.bestMatches && searchResults.bestMatches.length > 0) {
      console.log(`Found ${searchResults.bestMatches.length} results.`);
      console.log('First result:', JSON.stringify(searchResults.bestMatches[0]));
    } else {
      console.log('No search results found or unexpected response format:', searchResults);
    }
    
    // Test company overview
    console.log('\nTesting Alpha Vantage company overview:');
    console.log(`Getting overview for: ${SYMBOL}`);
    const overviewData = await getCompanyOverview(SYMBOL);
    
    if (overviewData && overviewData.Symbol) {
      console.log('Company overview data received:');
      console.log('Name:', overviewData.Name);
      console.log('Exchange:', overviewData.Exchange);
      console.log('Industry:', overviewData.Industry);
      console.log('Description excerpt:', overviewData.Description?.substring(0, 100) + '...');
    } else {
      console.log('No company overview data found or unexpected response format:', overviewData);
    }
    
  } catch (error) {
    console.error('Error testing Alpha Vantage API:', error);
  }
}

testAlphaVantageAPI(); 