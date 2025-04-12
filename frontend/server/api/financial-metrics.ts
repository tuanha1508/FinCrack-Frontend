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

    // Get both company profile and financial metrics from Finnhub
    const [profileResponse, financialsResponse] = await Promise.all([
      fetch(
        FINNHUB_ENDPOINTS.COMPANY_PROFILE(String(symbol)),
        { headers: { 'User-Agent': 'FinHack/1.0' } }
      ),
      fetch(
        FINNHUB_ENDPOINTS.FINANCIALS(String(symbol)),
        { headers: { 'User-Agent': 'FinHack/1.0' } }
      )
    ]);
    
    if (!profileResponse.ok || !financialsResponse.ok) {
      return {
        error: `API request failed with status: ${!profileResponse.ok ? profileResponse.status : financialsResponse.status}`,
        details: 'There might be an issue with the Finnhub service or your API key.'
      }
    }
    
    const profileData = await profileResponse.json();
    const financialsData = await financialsResponse.json();
    
    // Check if we have valid data
    if (!profileData || Object.keys(profileData).length === 0) {
      return {
        error: `No profile data found for symbol: ${symbol}`,
        details: 'Symbol may be invalid or not supported by Finnhub'
      }
    }

    // Extract metrics from Finnhub's data structure
    // Finnhub data structure is different from Alpha Vantage
    const metrics = financialsData?.metric || {};
    const currentDate = new Date().toISOString().split('T')[0];
    
    // Restructure the data to provide a similar response format to what the frontend expects
    const result: any = {
      metrics: {
        [0]: {
          symbol: profileData.ticker,
          date: currentDate,
          peRatio: metrics.peBasicExclExtraTTM?.toString() || null,
          pegRatio: metrics.pegNormalizedAnnual?.toString() || null,
          dividendYield: metrics.dividendYieldIndicatedAnnual?.toString() || null,
          dividendPerShare: metrics.dividendPerShareAnnual?.toString() || null,
          marketCap: profileData.marketCapitalization?.toString() || null,
          enterpriseValue: metrics.enterpriseValueOverEBITDA?.toString() || null,
          evToSales: metrics.evToSalesTTM?.toString() || null,
          evToEbitda: metrics.evToEBITDATTM?.toString() || null,
          bookValuePerShare: metrics.bookValuePerShareQuarterly?.toString() || null,
          priceToBookRatio: metrics.pbQuarterly?.toString() || null
        }
      },
      ratios: {
        [0]: {
          symbol: profileData.ticker,
          date: currentDate,
          returnOnEquity: metrics.roeTTM?.toString() || null,
          returnOnAssets: metrics.roaTTM?.toString() || null,
          profitMargin: metrics.netProfitMarginTTM?.toString() || null,
          operatingMargin: metrics.operatingMarginTTM?.toString() || null,
          revenuePerShare: metrics.revenuePerShareTTM?.toString() || null,
          debtToEquity: metrics.totalDebtOverTotalEquityQuarterly?.toString() || null,
          currentRatio: metrics.currentRatioQuarterly?.toString() || null,
          priceToSalesRatio: metrics.psTTM?.toString() || null
        }
      },
      growth: {
        [0]: {
          symbol: profileData.ticker,
          date: currentDate,
          revenueGrowth: metrics.revenueGrowthQuarterlyYoy?.toString() || null,
          earningsGrowth: metrics.epsGrowthQuarterlyYoy?.toString() || null,
          dividendGrowth: metrics.dividendGrowthRate5Y?.toString() || null,
          epsgrowth: metrics.epsGrowth3Y?.toString() || null
        }
      }
    };
    
    return result;
    
  } catch (error) {
    console.error('Error fetching financial metrics:', error)
    return {
      error: 'Failed to fetch financial metrics',
      details: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}) 