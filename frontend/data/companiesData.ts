/**
 * Hardcoded company data for financial display
 */

// Define interfaces for data structure
interface StockData {
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
}

interface FinancialData {
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

interface NewsItem {
  title: string;
  url: string;
  time_published: string;
  summary: string;
  source: string;
  overall_sentiment_score?: number;
}

interface CompanyData {
  stockData: StockData;
  financialData: FinancialData;
  news: NewsItem[];
}

// Company data with stock info, financials, and news
const companiesData: Record<string, CompanyData> = {
  "AAPL": {
    stockData: {
      price: 185.56,
      change: 2.35,
      changePercent: 1.28,
      open: 183.12,
      high: 186.40,
      low: 182.55,
      volume: 51385200,
      prevClose: 183.21,
      marketCap: 2870000000000,
      peRatio: 30.12,
      dividendYield: 0.52
    },
    financialData: {
      revenue: 394328000000,
      revenueGrowth: 3.41,
      grossProfit: 170782000000,
      grossProfitGrowth: 2.8,
      netIncome: 97158000000,
      netIncomeGrowth: 9.35,
      eps: 6.16,
      epsGrowth: 10.6,
      profitMargin: 24.64,
      profitMarginChange: 1.34
    },
    news: [
      {
        title: "Apple Unveils New AI Features for iPhone",
        url: "https://example.com/apple-ai",
        time_published: "2023-09-15T14:30:00Z",
        summary: "Apple introduces advanced AI capabilities in iOS 18, focusing on privacy and user experience.",
        source: "Tech News",
        overall_sentiment_score: 0.6
      },
      {
        title: "Apple's Services Revenue Hits All-Time High",
        url: "https://example.com/apple-services",
        time_published: "2023-09-10T09:15:00Z",
        summary: "The company's services segment continues to grow, reaching record revenue in the latest quarter.",
        source: "Financial Times",
        overall_sentiment_score: 0.8
      },
      {
        title: "Supply Chain Challenges Affect Apple Production",
        url: "https://example.com/apple-supply",
        time_published: "2023-09-05T16:45:00Z",
        summary: "Ongoing global supply issues create minor delays in Apple's production schedules.",
        source: "Business Insider",
        overall_sentiment_score: -0.2
      }
    ]
  },
  "MSFT": {
    stockData: {
      price: 415.32,
      change: 3.75,
      changePercent: 0.91,
      open: 412.17,
      high: 416.88,
      low: 411.23,
      volume: 18245700,
      prevClose: 411.57,
      marketCap: 3090000000000,
      peRatio: 38.42,
      dividendYield: 0.68
    },
    financialData: {
      revenue: 211915000000,
      revenueGrowth: 16.71,
      grossProfit: 147454000000,
      grossProfitGrowth: 17.2,
      netIncome: 72361000000,
      netIncomeGrowth: 18.88,
      eps: 9.72,
      epsGrowth: 19.7,
      profitMargin: 34.15,
      profitMarginChange: 0.62
    },
    news: [
      {
        title: "Microsoft Expands Azure AI Capabilities",
        url: "https://example.com/microsoft-azure-ai",
        time_published: "2023-09-16T11:20:00Z",
        summary: "New generative AI features added to Azure platform to boost enterprise productivity.",
        source: "Cloud Computing News",
        overall_sentiment_score: 0.7
      },
      {
        title: "Microsoft Teams Gets Major UI Overhaul",
        url: "https://example.com/microsoft-teams",
        time_published: "2023-09-12T08:30:00Z",
        summary: "Teams introduces new interface and performance improvements for better collaboration.",
        source: "Tech Today",
        overall_sentiment_score: 0.5
      },
      {
        title: "Microsoft Gaming Division Revenue Slows",
        url: "https://example.com/microsoft-gaming",
        time_published: "2023-09-08T14:15:00Z",
        summary: "Xbox sales fail to meet projections amid increased competition in gaming market.",
        source: "Game Industry",
        overall_sentiment_score: -0.3
      }
    ]
  },
  "GOOGL": {
    stockData: {
      price: 142.65,
      change: -0.87,
      changePercent: -0.61,
      open: 143.20,
      high: 144.12,
      low: 141.98,
      volume: 14587300,
      prevClose: 143.52,
      marketCap: 1800000000000,
      peRatio: 24.68,
      dividendYield: 0.0
    },
    financialData: {
      revenue: 305637000000,
      revenueGrowth: 13.82,
      grossProfit: 168802000000,
      grossProfitGrowth: 15.4,
      netIncome: 73795000000,
      netIncomeGrowth: 22.31,
      eps: 5.80,
      epsGrowth: 24.2,
      profitMargin: 24.15,
      profitMarginChange: 1.68
    },
    news: [
      {
        title: "Google Cloud Makes AI More Accessible",
        url: "https://example.com/google-cloud-ai",
        time_published: "2023-09-14T15:45:00Z",
        summary: "New tools launched to simplify AI deployment for small and medium businesses.",
        source: "Cloud News",
        overall_sentiment_score: 0.6
      },
      {
        title: "Google Search Algorithm Update Focuses on Quality",
        url: "https://example.com/google-search",
        time_published: "2023-09-11T10:20:00Z",
        summary: "Latest update aims to improve search results by prioritizing authoritative content.",
        source: "SEO Journal",
        overall_sentiment_score: 0.4
      },
      {
        title: "Antitrust Concerns Over Google's Ad Business",
        url: "https://example.com/google-antitrust",
        time_published: "2023-09-09T12:30:00Z",
        summary: "Regulators express concerns about Google's dominance in digital advertising market.",
        source: "Regulatory Times",
        overall_sentiment_score: -0.5
      }
    ]
  }
};

export default companiesData; 