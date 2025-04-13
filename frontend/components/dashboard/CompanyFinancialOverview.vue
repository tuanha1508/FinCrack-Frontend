<template>
  <div v-if="company" class="space-y-6">
    <!-- Loading overlay -->
    <div v-if="isLoading" class="fixed inset-0 bg-background/80 flex items-center justify-center z-50">
      <div class="text-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
        <p class="text-muted-foreground">Loading financial data...</p>
      </div>
    </div>

    <!-- API Error message -->
    <div v-if="hasApiError" class="p-4 bg-rose-100 border border-rose-200 rounded-md text-rose-700 mb-4">
      <div class="flex items-start">
        <Icon name="lucide:alert-circle" class="mr-2 h-5 w-5 text-rose-500 mt-0.5" />
        <div>
          <h3 class="font-semibold">API Error</h3>
          <p>{{ errorMessage }}</p>
          <p class="mt-2 text-sm">
            Please check your Financial Modeling Prep API key configuration.
            <a href="https://site.financialmodelingprep.com/" target="_blank" class="underline font-medium">
              Get an API key here
            </a>
          </p>
        </div>
      </div>
    </div>

    <!-- Company header -->
    <div class="flex items-center justify-between">
      <div>
        <div class="flex items-center gap-2">
          <h2 class="text-2xl font-bold text-foreground">{{ company.name }}</h2>
          <span class="px-2 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">{{ company.symbol }}</span>
          <UiButton v-if="!isLoading" variant="ghost" size="icon" @click="refreshData" title="Refresh data">
            <Icon name="lucide:refresh-cw" class="h-4 w-4" />
          </UiButton>
          <div v-else class="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
        </div>
        <p class="text-muted-foreground">{{ company.exchange }}{{ company.currency ? ' • ' + company.currency : '' }}</p>
      </div>
      <UiButton size="sm" class="gap-2">
        <Icon name="lucide:heart" class="h-4 w-4" />
        Add to Watchlist
      </UiButton>
    </div>

    <!-- Stock price and chart summary -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <UiCard class="md:col-span-2">
        <UiCardHeader class="flex flex-row items-center justify-between pb-2">
          <div>
            <UiCardTitle class="text-lg text-foreground">Price Chart</UiCardTitle>
            <UiCardDescription>{{ company.symbol }} stock performance</UiCardDescription>
          </div>
          <UiSelect defaultValue="1M">
            <UiSelectTrigger class="w-[100px]">
              <UiSelectValue placeholder="Time Range" />
            </UiSelectTrigger>
            <UiSelectContent>
              <UiSelectItem value="1D">1 Day</UiSelectItem>
              <UiSelectItem value="1W">1 Week</UiSelectItem>
              <UiSelectItem value="1M">1 Month</UiSelectItem>
              <UiSelectItem value="3M">3 Months</UiSelectItem>
              <UiSelectItem value="1Y">1 Year</UiSelectItem>
              <UiSelectItem value="5Y">5 Years</UiSelectItem>
            </UiSelectContent>
          </UiSelect>
        </UiCardHeader>
        <UiCardContent>
          <div class="h-72">
            <!-- Chart component would go here -->
            <div class="h-full w-full flex items-center justify-center bg-muted/10 rounded-md">
              <p class="text-muted-foreground">Price chart visualization</p>
            </div>
          </div>
        </UiCardContent>
      </UiCard>

      <UiCard>
        <UiCardHeader class="pb-2">
          <UiCardTitle class="text-lg text-foreground">Current Price</UiCardTitle>
        </UiCardHeader>
        <UiCardContent>
          <div class="space-y-4">
            <div>
              <div class="text-3xl font-bold text-foreground">${{ formatCurrency(stockData.price) }}</div>
              <div class="flex items-center mt-1">
                <div 
                  :class="stockData.changePercent >= 0 ? 'text-emerald-500' : 'text-rose-500'"
                  class="flex items-center text-sm"
                >
                  <Icon 
                    :name="stockData.changePercent >= 0 ? 'lucide:trending-up' : 'lucide:trending-down'" 
                    class="mr-1 h-4 w-4" 
                  />
                  <span>{{ stockData.changePercent >= 0 ? '+' : '' }}{{ stockData.changePercent.toFixed(2) }}%</span>
                </div>
                <div class="text-sm text-muted-foreground ml-2">
                  ${{ stockData.change >= 0 ? '+' : '' }}{{ stockData.change.toFixed(2) }}
                </div>
              </div>
            </div>

            <div class="border-t pt-4">
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <div class="text-xs text-muted-foreground">Market Cap</div>
                  <div class="font-medium">${{ formatLargeNumber(stockData.marketCap) }}</div>
                </div>
                <div>
                  <div class="text-xs text-muted-foreground">Volume</div>
                  <div class="font-medium">{{ formatLargeNumber(stockData.volume) }}</div>
                </div>
                <div>
                  <div class="text-xs text-muted-foreground">P/E Ratio</div>
                  <div class="font-medium">{{ stockData.peRatio.toFixed(2) }}</div>
                </div>
                <div>
                  <div class="text-xs text-muted-foreground">Dividend Yield</div>
                  <div class="font-medium">{{ stockData.dividendYield.toFixed(2) }}%</div>
                </div>
              </div>
            </div>
          </div>
        </UiCardContent>
      </UiCard>
    </div>

    <!-- Financial metrics -->
    <UiCard>
      <UiCardHeader>
        <UiCardTitle class="text-lg text-foreground">Financial Highlights</UiCardTitle>
        <UiCardDescription>Key financial metrics for {{ company.name }}</UiCardDescription>
      </UiCardHeader>
      <UiCardContent>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="space-y-2">
            <h3 class="text-sm font-medium text-muted-foreground">Revenue (TTM)</h3>
            <div class="text-2xl font-bold text-foreground">${{ formatLargeNumber(financialData.revenue) }}</div>
            <div class="flex items-center text-xs">
              <span 
                :class="financialData.revenueGrowth >= 0 ? 'text-emerald-500' : 'text-rose-500'"
              >
                {{ financialData.revenueGrowth >= 0 ? '+' : '' }}{{ financialData.revenueGrowth.toFixed(2) }}% YoY
              </span>
            </div>
          </div>
          
          <div class="space-y-2">
            <h3 class="text-sm font-medium text-muted-foreground">Net Income (TTM)</h3>
            <div class="text-2xl font-bold text-foreground">${{ formatLargeNumber(financialData.netIncome) }}</div>
            <div class="flex items-center text-xs">
              <span 
                :class="financialData.netIncomeGrowth >= 0 ? 'text-emerald-500' : 'text-rose-500'"
              >
                {{ financialData.netIncomeGrowth >= 0 ? '+' : '' }}{{ financialData.netIncomeGrowth.toFixed(2) }}% YoY
              </span>
            </div>
          </div>
          
          <div class="space-y-2">
            <h3 class="text-sm font-medium text-muted-foreground">EPS (TTM)</h3>
            <div class="text-2xl font-bold text-foreground">${{ financialData.eps.toFixed(2) }}</div>
            <div class="flex items-center text-xs">
              <span 
                :class="financialData.epsGrowth >= 0 ? 'text-emerald-500' : 'text-rose-500'"
              >
                {{ financialData.epsGrowth >= 0 ? '+' : '' }}{{ financialData.epsGrowth.toFixed(2) }}% YoY
              </span>
            </div>
          </div>
          
          <div class="space-y-2">
            <h3 class="text-sm font-medium text-muted-foreground">Profit Margin</h3>
            <div class="text-2xl font-bold text-foreground">{{ financialData.profitMargin.toFixed(2) }}%</div>
            <div class="flex items-center text-xs">
              <span 
                :class="financialData.profitMarginChange >= 0 ? 'text-emerald-500' : 'text-rose-500'"
              >
                {{ financialData.profitMarginChange >= 0 ? '+' : '' }}{{ financialData.profitMarginChange.toFixed(2) }}% YoY
              </span>
            </div>
          </div>
        </div>
      </UiCardContent>
    </UiCard>

    <!-- News and Analysis -->
    <UiCard>
      <UiCardHeader>
        <UiCardTitle class="text-lg text-foreground">Recent News</UiCardTitle>
        <UiCardDescription>Latest updates about {{ company.name }}</UiCardDescription>
      </UiCardHeader>
      <UiCardContent>
        <div v-if="newsLoading" class="flex justify-center my-6">
          <div class="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
        </div>
        
        <div v-else-if="newsError" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {{ newsError }}
        </div>
        
        <div v-else class="space-y-4">
          <div v-for="(article, i) in companyNews" :key="i" class="flex items-start gap-4 pb-4 border-b last:border-0 last:pb-0">
            <div class="flex-1">
              <div class="flex items-center gap-2 mb-1">
                <h4 class="font-medium text-foreground">{{ article.title }}</h4>
                <span 
                  v-if="article.overall_sentiment_score" 
                  class="text-xs px-2 py-0.5 rounded-full" 
                  :class="getSentimentClass(article.overall_sentiment_score)"
                >
                  {{ formatSentiment(article.overall_sentiment_score) }}
                </span>
              </div>
              <p class="text-sm text-muted-foreground line-clamp-2">{{ article.summary }}</p>
              <div class="mt-2 flex justify-between items-center">
                <span class="text-xs text-muted-foreground">{{ article.source }} · {{ formatDate(article.time_published) }}</span>
                <a 
                  :href="article.url" 
                  target="_blank"
                  class="text-xs text-primary flex items-center hover:underline"
                >
                  Read more
                  <Icon name="lucide:external-link" class="ml-1 h-3 w-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </UiCardContent>
    </UiCard>
  </div>
  <div v-else class="flex justify-center items-center h-64">
    <div class="text-center">
      <Icon name="lucide:search" class="h-12 w-12 text-muted-foreground mx-auto mb-4" />
      <h3 class="text-lg font-medium text-foreground mb-2">Search for a company</h3>
      <p class="text-muted-foreground max-w-md">Enter a company name or ticker symbol to view detailed financial information</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import companiesData from '@/data/companiesData';

// Define interfaces
interface Company {
  name: string;
  symbol: string;
  exchange?: string;
  currency?: string;
}

// Define interfaces that match our data source structure
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

// News Item interface
interface NewsItem {
  title: string;
  url: string;
  time_published: string;
  summary: string;
  source: string;
  overall_sentiment_score?: number;
}

// Define component name
defineOptions({
  name: 'CompanyFinancialOverview'
});

// Define props
const props = defineProps({
  company: {
    type: Object as () => Company | null,
    default: null
  }
});

// Hardcoded company stock data
const stockData = ref<StockData>({
  price: 0,
  change: 0,
  changePercent: 0,
  open: 0,
  high: 0,
  low: 0,
  volume: 0, 
  prevClose: 0,
  marketCap: 0,
  peRatio: 0,
  dividendYield: 0
});

// Hardcoded financial data
const financialData = ref<FinancialData>({
  revenue: 0,
  revenueGrowth: 0, 
  grossProfit: 0,
  grossProfitGrowth: 0,
  netIncome: 0,
  netIncomeGrowth: 0,
  eps: 0,
  epsGrowth: 0,
  profitMargin: 0,
  profitMarginChange: 0
});

const isLoading = ref(false);
const errorMessage = ref('');
const hasApiError = ref(false);

// News data
const companyNews = ref<NewsItem[]>([]);
const newsLoading = ref(false);
const newsError = ref<string | null>(null);

// Format currency values
const formatCurrency = (value: number): string => {
  return value.toFixed(2);
};

// Format large numbers (billions, millions)
const formatLargeNumber = (value: number): string => {
  if (value === undefined || value === null) {
    return '0';
  }
  
  if (value >= 1000000000000) {
    return `${(value / 1000000000000).toFixed(2)}T`;
  } else if (value >= 1000000000) {
    return `${(value / 1000000000).toFixed(2)}B`;
  } else if (value >= 1000000) {
    return `${(value / 1000000).toFixed(2)}M`;
  } else if (value >= 1000) {
    return `${(value / 1000).toFixed(2)}K`;
  }
  return value.toString();
};

// Load hardcoded data for the company
const loadHardcodedData = (symbol: string) => {
  isLoading.value = true;
  hasApiError.value = false;
  errorMessage.value = '';
  newsLoading.value = true;
  newsError.value = null;
  
  // Simulate API delay
  setTimeout(() => {
    const companyKey = Object.keys(companiesData).find(key => key === symbol) || 'AAPL';
    const data = companiesData[companyKey];
    
    // Update stock data
    stockData.value = data.stockData;
    
    // Update financial data
    financialData.value = data.financialData;
    
    // Update news
    companyNews.value = data.news;
    
    // Update loading states
    isLoading.value = false;
    newsLoading.value = false;
  }, 800); // Add a delay to simulate real API call
};

// Format date
const formatDate = (timestamp: string): string => {
  if (!timestamp) return "";
  const date = new Date(timestamp);
  return date.toLocaleString();
};

// Get sentiment class
const getSentimentClass = (score: number): string => {
  if (score > 0.25) return "bg-green-100 text-green-800";
  if (score < -0.25) return "bg-red-100 text-red-800";
  return "bg-yellow-100 text-yellow-800";
};

// Format sentiment
const formatSentiment = (score: number): string => {
  if (score > 0.25) return "Positive";
  if (score < -0.25) return "Negative";
  return "Neutral";
};

// Watch for changes in company and load data
watch(() => props.company, (newCompany) => {
  if (newCompany) {
    loadHardcodedData(newCompany.symbol);
  }
}, { immediate: true });

// Add a refresh function
const refreshData = () => {
  if (props.company) {
    loadHardcodedData(props.company.symbol);
  }
};
</script> 