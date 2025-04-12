// API test script
require('dotenv').config(); // Load environment variables from .env file

// Get API key from environment variables
const ALPHA_VANTAGE_API_KEY = process.env.NUXT_ALPHA_VANTAGE_API_KEY;
const ALPHA_VANTAGE_BASE_URL = 'https://www.alphavantage.co/query';
const SYMBOL = 'AAPL';

async function testEndpoints() {
  console.log('Testing Alpha Vantage API...');
  
  // Check if API key is available
  if (!ALPHA_VANTAGE_API_KEY) {
    console.error('Error: Alpha Vantage API Key is missing. Please set NUXT_ALPHA_VANTAGE_API_KEY in .env file.');
    return;
  }
  
  try {
    // Test company overview endpoint
    console.log('\nTesting Alpha Vantage company overview endpoint:');
    const overviewResponse = await fetch(
      `${ALPHA_VANTAGE_BASE_URL}?function=OVERVIEW&symbol=${SYMBOL}&apikey=${ALPHA_VANTAGE_API_KEY}`,
      { headers: { 'User-Agent': 'FinHack/1.0' } }
    );
    
    console.log(`Status: ${overviewResponse.status}`);
    if (!overviewResponse.ok) {
      console.error('Company overview API request failed');
    } else {
      const overviewData = await overviewResponse.json();
      console.log('Overview data received:', JSON.stringify(overviewData).substring(0, 100) + '...');
    }
    
    // Test ticker search endpoint
    console.log('\nTesting Alpha Vantage ticker search endpoint:');
    const searchResponse = await fetch(
      `${ALPHA_VANTAGE_BASE_URL}?function=SYMBOL_SEARCH&keywords=Microsoft&apikey=${ALPHA_VANTAGE_API_KEY}`,
      { headers: { 'User-Agent': 'FinHack/1.0' } }
    );
    
    console.log(`Status: ${searchResponse.status}`);
    if (!searchResponse.ok) {
      console.error('Ticker search API request failed');
    } else {
      const searchData = await searchResponse.json();
      console.log('Search data received:', JSON.stringify(searchData).substring(0, 100) + '...');
    }
    
  } catch (error) {
    console.error('Error testing endpoints:', error);
  }
}

testEndpoints(); 