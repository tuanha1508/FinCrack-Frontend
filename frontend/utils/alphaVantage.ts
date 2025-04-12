/**
 * Redirect file for Alpha Vantage API functions
 * 
 * This file redirects Alpha Vantage API calls to use Finnhub API instead.
 * It maintains backward compatibility with existing code.
 */

import { FINNHUB_ENDPOINTS, FINNHUB_API_KEY } from '../constants/api';
import { 
  CompanyProfile, 
  FinancialMetrics,
  SymbolSearchResult 
} from './finnhub';

// Interface for ticker search results (compatible with original Alpha Vantage format)
export interface TickerSearchResult {
  symbol: string;
  name: string;
  type: string;
  region: string;
  marketOpen: string;
  marketClose: string;
  timezone: string;
  currency: string;
  matchScore: string;
}

// Interface for ticker search response
export interface TickerSearchResponse {
  bestMatches: TickerSearchResult[];
}

// Interface for company overview data
export interface CompanyOverview {
  Symbol?: string;
  AssetType?: string;
  Name?: string;
  Description?: string;
  CIK?: string;
  Exchange?: string;
  Currency?: string;
  Country?: string;
  Sector?: string;
  Industry?: string;
  Address?: string;
  FiscalYearEnd?: string;
  LatestQuarter?: string;
  MarketCapitalization?: string;
  EBITDA?: string;
  PERatio?: string;
  PEGRatio?: string;
  BookValue?: string;
  DividendPerShare?: string;
  DividendYield?: string;
  EPS?: string;
  RevenuePerShareTTM?: string;
  ProfitMargin?: string;
  OperatingMarginTTM?: string;
  ReturnOnAssetsTTM?: string;
  ReturnOnEquityTTM?: string;
  RevenueTTM?: string;
  GrossProfitTTM?: string;
  DilutedEPSTTM?: string;
  QuarterlyEarningsGrowthYOY?: string;
  QuarterlyRevenueGrowthYOY?: string;
  AnalystTargetPrice?: string;
  TrailingPE?: string;
  ForwardPE?: string;
  PriceToSalesRatioTTM?: string;
  PriceToBookRatio?: string;
  EVToRevenue?: string;
  EVToEBITDA?: string;
  Beta?: string;
  'WeekHigh52'?: string;
  'WeekLow52'?: string;
  'DayMovingAverage50'?: string;
  'DayMovingAverage200'?: string;
  SharesOutstanding?: string;
  DividendDate?: string;
  ExDividendDate?: string;
  // Error response properties
  'Error Message'?: string;
  Information?: string;
  Note?: string;
}

/**
 * Search for company tickers matching the provided keywords using Finnhub
 * @param keywords - Search terms for company ticker/name
 * @returns Promise with search results in Alpha Vantage format
 */
export async function searchTickers(keywords: string): Promise<TickerSearchResult[]> {
  // Input validation
  if (!keywords || keywords.trim() === '') {
    throw new Error('Search keywords are required');
  }

  try {
    const encodedKeywords = encodeURIComponent(keywords.trim());
    // Construct the Finnhub URL directly instead of using the ENDPOINTS object
    const finnhubUrl = `https://finnhub.io/api/v1/search?q=${encodedKeywords}&token=${FINNHUB_API_KEY}`;
    
    const response = await fetch(finnhubUrl, {
      headers: {
        'User-Agent': 'FinHack/1.0',
        'X-Finnhub-Token': FINNHUB_API_KEY
      }
    });

    if (!response.ok) {
      throw new Error(`API request failed with status: ${response.status}`);
    }

    const data = await response.json();
    
    // Check if we have results and convert to Alpha Vantage format
    if (!data.result || !Array.isArray(data.result)) {
      return [];
    }
    
    // Map Finnhub results to Alpha Vantage format
    return data.result.map((item: SymbolSearchResult): TickerSearchResult => {
      return {
        symbol: item.symbol,
        name: item.description,
        type: item.type,
        region: 'US', // Default to US as Finnhub doesn't provide this
        marketOpen: '09:30', // Default NYSE hours
        marketClose: '16:00', // Default NYSE hours
        timezone: 'UTC-5', // Default EST
        currency: 'USD', // Default USD
        matchScore: '1.0' // No equivalent in Finnhub
      };
    });
  } catch (error) {
    console.error('Error searching for tickers:', error);
    throw error;
  }
}

/**
 * Get company overview data for a specific ticker symbol using Finnhub
 * @param symbol - The stock ticker symbol
 * @returns Promise with company overview data in Alpha Vantage format
 */
export async function getCompanyOverview(symbol: string): Promise<CompanyOverview | null> {
  // Input validation
  if (!symbol || symbol.trim() === '') {
    throw new Error('Ticker symbol is required');
  }

  try {
    const encodedSymbol = encodeURIComponent(symbol.trim().toUpperCase());
    
    // Get company profile from Finnhub - use direct URL
    const profileUrl = `https://finnhub.io/api/v1/stock/profile2?symbol=${encodedSymbol}&token=${FINNHUB_API_KEY}`;
    const profileResponse = await fetch(profileUrl, {
      headers: {
        'User-Agent': 'FinHack/1.0',
        'X-Finnhub-Token': FINNHUB_API_KEY
      }
    });

    if (!profileResponse.ok) {
      throw new Error(`API request failed with status: ${profileResponse.status}`);
    }

    const profileData = await profileResponse.json() as CompanyProfile;
    
    // Check if response is empty
    if (!profileData || Object.keys(profileData).length === 0) {
      return null;
    }
    
    // Get financials from Finnhub - use direct URL
    const financialsUrl = `https://finnhub.io/api/v1/stock/metric?symbol=${encodedSymbol}&metric=all&token=${FINNHUB_API_KEY}`;
    const financialsResponse = await fetch(financialsUrl, {
      headers: {
        'User-Agent': 'FinHack/1.0',
        'X-Finnhub-Token': FINNHUB_API_KEY
      }
    });

    let financialsData: FinancialMetrics | null = null;
    
    if (financialsResponse.ok) {
      const data = await financialsResponse.json();
      if (data && Object.keys(data).length > 0) {
        financialsData = data;
      }
    }
    
    // Convert Finnhub data to Alpha Vantage format
    return {
      Symbol: profileData.ticker,
      AssetType: 'Common Stock',
      Name: profileData.name,
      Description: '',
      Exchange: profileData.exchange,
      Currency: profileData.currency,
      Country: profileData.country,
      Sector: profileData.finnhubIndustry,
      Industry: profileData.finnhubIndustry,
      MarketCapitalization: profileData.marketCapitalization?.toString(),
      SharesOutstanding: profileData.shareOutstanding?.toString(),
      // Add financial metrics if available
      PERatio: financialsData?.metric?.peBasicExclExtraTTM?.toString() || '',
      EPS: financialsData?.metric?.epsBasicExclExtraItemsTTM?.toString() || '',
      // Default values for other fields
      'WeekHigh52': '',
      'WeekLow52': '',
      Beta: '',
    };
  } catch (error) {
    console.error('Error getting company overview:', error);
    throw error;
  }
} 