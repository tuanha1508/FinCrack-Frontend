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
            Please check that the data files are accessible.
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
        <p class="text-muted-foreground">{{ displayInfo }}</p>
      </div>
      <UiButton size="sm" class="gap-2" @click="toggleCompanyWishlist">
        <Icon name="lucide:heart" class="h-4 w-4" :class="{'text-rose-500': isWishlisted, 'text-muted-foreground': !isWishlisted}" />
        {{ isWishlisted ? 'Remove from Watchlist' : 'Add to Watchlist' }}
      </UiButton>
    </div>

    <!-- Stock price and chart summary -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <UiCard class="md:col-span-2">
        <UiCardHeader class="flex flex-row items-center justify-between pb-2">
          <div>
            <UiCardTitle class="text-lg text-foreground">Overview Chart</UiCardTitle>
            <UiCardDescription>{{ company.symbol }}</UiCardDescription>
          </div>
          <UiSelect v-model="selectedTimeRange" @update:model-value="updateChartTimeRange">
            <UiSelectTrigger class="w-[150px]">
              <UiSelectValue placeholder="Time Range" />
            </UiSelectTrigger>
            <UiSelectContent>
              <UiSelectItem value="1W">1 Week</UiSelectItem>
              <UiSelectItem value="1M">1 Month</UiSelectItem>
              <UiSelectItem value="3M">3 Months</UiSelectItem>
              <UiSelectItem value="1Y">1 Year</UiSelectItem>
            </UiSelectContent>
          </UiSelect>
        </UiCardHeader>
        <UiCardContent>
          <div class="h-72 relative">
            <canvas ref="priceChartCanvas"></canvas>
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
                  <div class="text-xs text-muted-foreground">P/E Ratio</div>
                  <div class="font-medium">{{ stockData.peRatio.toFixed(2) }}</div>
                </div>
                <div>
                  <div class="text-xs text-muted-foreground">PEG Ratio</div>
                  <div class="font-medium">{{ stockData.pegRatio.toFixed(2) }}</div>
                </div>
                <div>
                  <div class="text-xs text-muted-foreground">P/B Ratio</div>
                  <div class="font-medium">{{ stockData.pbRatio.toFixed(2) }}</div>
                </div>
                <div>
                  <div class="text-xs text-muted-foreground">P/S Ratio</div>
                  <div class="font-medium">{{ stockData.psRatio.toFixed(2) }}</div>
                </div>
                <div>
                  <div class="text-xs text-muted-foreground">ROE</div>
                  <div class="font-medium">{{ stockData.roe.toFixed(2) }}%</div>
                </div>
                <div>
                  <div class="text-xs text-muted-foreground">RSI</div>
                  <div class="font-medium">{{ stockData.rsi.toFixed(2) }}</div>
                </div>
                <div>
                  <div class="text-xs text-muted-foreground">MACD Line</div>
                  <div class="font-medium">{{ stockData.macdLine.toFixed(2) }}</div>
                </div>
              </div>
            </div>
          </div>
        </UiCardContent>
      </UiCard>
    </div>
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
import { ref, watch, onMounted, computed } from 'vue';
import { Chart, ChartItem, registerables } from 'chart.js';
import { useWishlistStore } from '@/stores/wishlistStore';

// Register Chart.js components
Chart.register(...registerables);

// Define interfaces
interface Company {
  name: string;
  symbol: string;
  exchange?: string;
  currency?: string;
}

// Define interface that matches our data source structure
interface StockData {
  price: number;
  change: number;
  changePercent: number;
  open: number;
  high: number;
  low: number;
  volume: number;
  peRatio: number;
  pbRatio: number;
  psRatio: number;
  pegRatio: number;
  roe: number;
  rsi: number;
  macdLine: number;
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

// Use the wishlist store
const wishlistStore = useWishlistStore();

// Computed property to check if the current company is in the wishlist
const isWishlisted = computed(() => {
  return props.company ? wishlistStore.isInWishlist(props.company.symbol) : false;
});

// Function to handle toggling wishlist status
const toggleCompanyWishlist = () => {
  if (props.company) {
    wishlistStore.toggleWishlist(props.company.symbol);
  }
};

// Chart references
const priceChartCanvas = ref<HTMLCanvasElement | null>(null);
let priceChart: Chart | null = null;

// Time range for chart
const selectedTimeRange = ref('1M');

// Chart data
const chartData = ref<any[]>([]);

// Stock data
const stockData = ref<StockData>({
  price: 0,
  change: 0,
  changePercent: 0,
  open: 0,
  high: 0,
  low: 0,
  volume: 0,
  peRatio: 0,
  pbRatio: 0,
  psRatio: 0,
  pegRatio: 0,
  roe: 0,
  rsi: 0,
  macdLine: 0
});

const isLoading = ref(false);
const errorMessage = ref('');
const hasApiError = ref(false);

// Format currency values
const formatCurrency = (value: number): string => {
  return isNaN(value) ? 'N/A' : value.toFixed(2);
};

// Format large numbers (billions, millions)
const formatLargeNumber = (value: number): string => {
  if (value === undefined || value === null || isNaN(value)) {
    return 'N/A';
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

// Helper function to safely handle numbers
const safeNumber = (value: any, defaultValue = 0): number => {
  if (value === null || value === undefined || isNaN(parseFloat(value))) {
    return defaultValue;
  }
  return parseFloat(value);
};

// Custom JSON parser to handle NaN values
const parseJsonSafely = async (response: Response) => {
  const text = await response.text();
  // Replace NaN, Infinity and -Infinity with null which is valid in JSON
  const safeText = text.replace(/\bNaN\b/g, "null")
                       .replace(/\b-?Infinity\b/g, "null");
  try {
    return JSON.parse(safeText);
  } catch (error: unknown) {
    console.error("JSON parse error:", error);
    throw new Error(`Invalid JSON response: ${error instanceof Error ? error.message : String(error)}`);
  }
};

// Load data for the company
const loadHardcodedData = (symbol: string) => {
  isLoading.value = true;
  hasApiError.value = false;
  errorMessage.value = '';
  
  // Default window size for technical indicators
  const WINDOW_SIZE = 14;
  
  // Fetch data from API endpoint using POST request
  fetch('http://localhost:5000/api/stock_data', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      company_input: symbol,
      window: WINDOW_SIZE
    })
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.statusText}`);
      }
      return parseJsonSafely(response);
    })
    .then(data => {
      // Check if request was successful
      if (!data.success) {
        throw new Error(data.error || 'Unknown error occurred');
      }
      
      updateDashboardWithApiData(data);
    })
    .catch(error => {
      console.error('Error loading data:', error);
      hasApiError.value = true;
      errorMessage.value = `Error loading data: ${error.message}`;
    })
    .finally(() => {
      isLoading.value = false;
    });
};

// Process API data and update dashboard
const updateDashboardWithApiData = (data: any) => {
  // Log the complete API response for debugging
  console.log('API Response structure:', data);
  
  // Extract historical data and update chart data
  const historicalData = data.chart_data || [];
  chartData.value = [...historicalData];
  
  // Extract metrics data with proper fallbacks
  const metricsData = data.metrics_data || {};
  console.log('Metrics data raw:', metricsData);
  
  // Get the latest historical data point and previous day
  const latestData = historicalData[0] || {};
  const prevDay = historicalData[1] || {};
  
  // Extract valuation and technical indicators with better structure handling
  // Based on the structure shown in the image
  const valuation = metricsData['valuation_and_profitability'];
                   
  const technical = metricsData['technical_indicators'];
  
  // Log extracted data structures
  console.log('Latest data:', latestData);
  console.log('Valuation metrics extracted:', valuation);
  console.log('Technical indicators extracted:', technical);
  
  // Get the latest price (prioritizing latest_price from technical indicators)
  const latestPrice = safeNumber(technical.latest_price);
  
  const prevClose = safeNumber(prevDay.Close);
  const priceChange = latestPrice- prevClose;
  const priceChangePercent = prevClose ? (priceChange / prevClose) * 100 : 0;
  
  // Update stock data with values from API with enhanced structure handling
  stockData.value = {
    price: latestPrice,
    change: safeNumber(data.change) || priceChange,
    changePercent: safeNumber(data.change_percent) || priceChangePercent,
    open: safeNumber(data.open) || safeNumber(latestData.Open),
    high: safeNumber(data.high) || safeNumber(latestData.High),
    low: safeNumber(data.low) || safeNumber(latestData.Low),
    volume: safeNumber(data.volume) || safeNumber(latestData.Volume),
    peRatio: safeNumber(valuation.pe_ratio) || safeNumber(data.pe_ratio) || 0,
    pbRatio: safeNumber(valuation.pb_ratio) || safeNumber(data.pb_ratio) || 0,
    psRatio: safeNumber(valuation.ps_ratio) || safeNumber(data.ps_ratio) || 0,
    pegRatio: safeNumber(valuation.peg_ratio) || safeNumber(data.peg_ratio) || 0,
    roe: safeNumber(valuation.roe * 100) || safeNumber(data.roe) || 0, // Convert from decimal to percentage if from valuation
    rsi: safeNumber(technical.rsi) || safeNumber(data.rsi) || 0,
    macdLine: safeNumber(technical.macd_line) || safeNumber(data.macd_line) || 0
  };
  
  // Log the final data being used to update the UI
  console.log('Final stock data for dashboard:', stockData.value);
  
  // Render the price chart with the updated data
  renderPriceChart();
};

// Format date for chart display
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

// Filter chart data based on selected time range
const filteredChartData = computed(() => {
  if (!chartData.value || chartData.value.length === 0) {
    return [];
  }

  const now = new Date();
  let startDate = new Date();

  switch (selectedTimeRange.value) {
    case '1D':
      startDate.setDate(now.getDate() - 1);
      break;
    case '1W':
      startDate.setDate(now.getDate() - 7);
      break;
    case '1M':
      startDate.setMonth(now.getMonth() - 1);
      break;
    case '3M':
      startDate.setMonth(now.getMonth() - 3);
      break;
    case '1Y':
      startDate.setFullYear(now.getFullYear() - 1);
      break;
    case '5Y':
      startDate.setFullYear(now.getFullYear() - 5);
      break;
    default:
      startDate.setMonth(now.getMonth() - 1); // Default to 1 month
  }

  return chartData.value
    .filter(item => new Date(item.Date) >= startDate)
    .sort((a, b) => new Date(a.Date).getTime() - new Date(b.Date).getTime());
});

// Update chart with new time range
const updateChartTimeRange = () => {
  if (priceChart) {
    renderPriceChart();
  }
};

// Render price chart
const renderPriceChart = () => {
  if (!priceChartCanvas.value) return;

  // Destroy existing chart if it exists
  if (priceChart) {
    priceChart.destroy();
  }

  const data = filteredChartData.value;
  if (!data || data.length === 0) return;

  const dates = data.map(item => formatDate(item.Date));
  const closePrices = data.map(item => item.Close);
  const emaPrices = data.map(item => item.EMA); // Assuming EMA is available in chartData
  const smaPrices = data.map(item => item.SMA); // Assuming SMA is available in chartData

  // Determine chart color based on price trend (using Close price)
  const isPositiveTrend = closePrices[0] <= closePrices[closePrices.length - 1];
  const closeColor = isPositiveTrend ? 'rgb(16, 185, 129)' : 'rgb(239, 68, 68)';
  const emaColor = 'rgb(59, 130, 246)'; // Blue for EMA
  const smaColor = 'rgb(249, 115, 22)'; // Orange for SMA

  priceChart = new Chart(priceChartCanvas.value as ChartItem, {
    type: 'line',
    data: {
      labels: dates,
      datasets: [
        {
          label: 'Close',
          data: closePrices,
          borderColor: closeColor,
          backgroundColor: closeColor + '10', // Lighter fill
          borderWidth: 2,
          pointRadius: 0.5,
          pointHoverRadius: 3,
          tension: 0.1,
          fill: false // Keep fill off for Close to avoid overlap
        },
        {
          label: 'EMA',
          data: emaPrices,
          borderColor: emaColor,
          backgroundColor: emaColor + '10',
          borderWidth: 1.5, // Slightly thinner
          pointRadius: 0,
          pointHoverRadius: 3,
          tension: 0.1,
          fill: false
        },
        {
          label: 'SMA',
          data: smaPrices,
          borderColor: smaColor,
          backgroundColor: smaColor + '10',
          borderWidth: 1.5, // Slightly thinner
          pointRadius: 0,
          pointHoverRadius: 3,
          tension: 0.1,
          fill: false
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true, // Enable the legend
          position: 'top',
          labels: {
            usePointStyle: false, // Ensure we use the box shape
            boxWidth: 20,      // Make the box wider like a line
            boxHeight: 2,      // Make the box shorter like a line
            font: {
              size: 10
            },
            padding: 10
          }
        },
        tooltip: {
          mode: 'index',
          intersect: false,
          callbacks: {
            label: (context) => `$${context.parsed.y.toFixed(2)}`
          }
        }
      },
      scales: {
        x: {
          grid: {
            display: false
          },
          ticks: {
            maxTicksLimit: 8,
            maxRotation: 0,
            font: {
              size: 10
            }
          }
        },
        y: {
          // @ts-ignore - Chart.js typing issue
          grid: {
            color: 'rgba(200, 200, 200, 0.2)'
          },
          ticks: {
            callback: (value) => `$${value}`
          }
        }
      },
      interaction: {
        mode: 'nearest',
        axis: 'x',
        intersect: false
      }
    }
  });
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

// Initialize chart when component is mounted
onMounted(() => {
  if (props.company) {
    loadHardcodedData(props.company.symbol);
  }
});

// Computed property to display exchange and currency cleanly
const displayInfo = computed(() => {
  if (!props.company) return '';

  const parts = [];
  // Only add exchange if it exists and is not 'Unknown'
  if (props.company.exchange && props.company.exchange !== 'Unknown') {
    parts.push(props.company.exchange);
  }
  // Add currency if it exists
  if (props.company.currency) {
    parts.push(props.company.currency);
  }

  // Join the parts with a separator, filtering out any empty strings
  return parts.filter(part => part).join(' • ');
});
</script> 