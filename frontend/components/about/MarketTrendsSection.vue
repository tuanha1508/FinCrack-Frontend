<template>
  <section class="py-16 px-4" :class="isDark ? 'bg-black' : 'bg-white'">
    <div class="container mx-auto">
      <div class="text-center max-w-3xl mx-auto mb-12">
        <h2 class="text-3xl font-bold mb-6" :class="isDark ? 'text-white' : 'text-black'">Market Trends</h2>
        <p class="text-lg" :class="isDark ? 'text-white' : 'text-gray-700'">
          Stay ahead with real-time market analytics and trend predictions powered by our advanced algorithms.
        </p>
      </div>
      
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <!-- Market Overview Card -->
        <div class="p-6 rounded-xl" :class="isDark ? 'border border-white bg-black' : 'border border-gray-300 bg-white'">
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-xl font-bold" :class="isDark ? 'text-white' : 'text-black'">Market Overview</h3>
            <div class="flex space-x-2">
              <button 
                v-for="period in ['1D', '1W', '1M', '3M', '1Y', 'All']" 
                :key="period"
                @click="activeTimePeriod = period"
                :class="[
                  'px-2 py-1 text-sm rounded', 
                  activeTimePeriod === period 
                    ? isDark ? 'bg-white text-black' : 'bg-black text-white'
                    : isDark ? 'bg-black text-white/70 hover:text-white' : 'bg-white text-black/70 hover:text-black'
                ]"
              >
                {{ period }}
              </button>
            </div>
          </div>
          
          <!-- Market Index Chart -->
          <div class="h-64 mb-4 rounded-lg p-4 relative" 
               :class="isDark ? 'bg-black/50 border border-white/20' : 'bg-gray-50 border border-gray-200'">
            <!-- Simulated chart line using SVG -->
            <ClientOnly>
              <svg class="w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" :stop-color="isDark ? 'white' : 'black'" stop-opacity="0.5" />
                    <stop offset="100%" :stop-color="isDark ? 'white' : 'black'" stop-opacity="0" />
                  </linearGradient>
                </defs>
                <path
                  :d="getMarketPath"
                  fill="none"
                  :stroke="isDark ? 'white' : 'black'"
                  stroke-width="0.5"
                />
                <path
                  :d="getMarketPathClosed"
                  fill="url(#chartGradient)"
                  stroke="none"
                />
              </svg>
            </ClientOnly>
            
            <!-- Chart values -->
            <div class="absolute top-2 left-2 rounded px-2 py-1" 
                 :class="isDark ? 'bg-black/70' : 'bg-white/70'">
              <div class="text-sm" :class="isDark ? 'text-white/80' : 'text-black/80'">S&P 500</div>
              <div class="font-bold text-lg" :class="isDark ? 'text-white' : 'text-black'">4,732.58</div>
              <div :class="isDark ? 'text-sm text-white' : 'text-sm text-black'">+54.53 (+1.16%)</div>
            </div>
          </div>
          
          <!-- Market Indices -->
          <div class="grid grid-cols-2 gap-4">
            <div v-for="(index, i) in marketIndices" :key="i" class="p-3 rounded-lg"
                 :class="isDark ? 'bg-black/50 border border-white/20' : 'bg-gray-50 border border-gray-200'">
              <div class="text-sm" :class="isDark ? 'text-white/70' : 'text-black/70'">{{ index.name }}</div>
              <div class="font-bold" :class="isDark ? 'text-white' : 'text-black'">{{ index.value }}</div>
              <div :class="index.change > 0 
                          ? (isDark ? 'text-white' : 'text-green-700') 
                          : (isDark ? 'text-red-500' : 'text-red-600')">
                {{ index.change > 0 ? '+' : '' }}{{ index.change }}%
              </div>
            </div>
          </div>
        </div>
        
        <!-- Sector Performance -->
        <div class="p-6 rounded-xl" :class="isDark ? 'border border-white bg-black' : 'border border-gray-300 bg-white'">
          <h3 class="text-xl font-bold mb-6" :class="isDark ? 'text-white' : 'text-black'">Sector Performance</h3>
          
          <div class="space-y-4">
            <div v-for="(sector, i) in sectorPerformance" :key="i" class="flex items-center">
              <div class="w-24 text-sm whitespace-nowrap" :class="isDark ? 'text-white' : 'text-black'">{{ sector.name }}</div>
              <div class="flex-grow mx-3">
                <div class="h-2 rounded-full overflow-hidden" :class="isDark ? 'bg-white/20' : 'bg-black/20'">
                  <div 
                    class="h-full rounded-full"
                    :class="sector.change > 0 
                           ? (isDark ? 'bg-white' : 'bg-black') 
                           : (isDark ? 'bg-red-500' : 'bg-red-600')" 
                    :style="{
                      width: `${Math.abs(sector.change) * 5}%`,
                      marginLeft: sector.change < 0 ? 'auto' : '0'
                    }"
                  ></div>
                </div>
              </div>
              <div 
                class="w-16 text-right font-medium"
                :class="sector.change > 0 
                       ? (isDark ? 'text-white' : 'text-black') 
                       : (isDark ? 'text-red-500' : 'text-red-600')"
              >
                {{ sector.change > 0 ? '+' : '' }}{{ sector.change }}%
              </div>
            </div>
          </div>
          
          <div class="mt-8">
            <h4 class="font-medium mb-3" :class="isDark ? 'text-white' : 'text-black'">Top Performing Stocks</h4>
            <div class="space-y-2">
              <div v-for="(stock, i) in topStocks" :key="i" class="grid grid-cols-12 p-2 rounded" 
                   :class="isDark ? 'hover:bg-white/5' : 'hover:bg-black/5'">
                <div class="col-span-4 font-medium" :class="isDark ? 'text-white' : 'text-black'">{{ stock.symbol }}</div>
                <div class="col-span-5" :class="isDark ? 'text-white/70' : 'text-black/70'">{{ stock.name }}</div>
                <div class="col-span-3 text-right font-medium" :class="isDark ? 'text-white' : 'text-green-700'">+{{ stock.change }}%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Market Insights -->
      <div class="p-6 rounded-xl" :class="isDark ? 'border border-white bg-black' : 'border border-gray-300 bg-white'">
        <h3 class="text-xl font-bold mb-4" :class="isDark ? 'text-white' : 'text-black'">Market Insights</h3>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="p-4 rounded-lg" :class="isDark ? 'bg-black/50 border border-white/20' : 'bg-gray-50 border border-gray-200'">
            <div class="text-lg font-medium mb-2" :class="isDark ? 'text-white' : 'text-black'">Bull/Bear Ratio</div>
            <div class="flex items-center justify-between">
              <div class="text-sm" :class="isDark ? 'text-white/70' : 'text-black/70'">Bearish</div>
              <div class="text-sm" :class="isDark ? 'text-white/70' : 'text-black/70'">Bullish</div>
            </div>
            <div class="h-2 rounded-full overflow-hidden my-2" :class="isDark ? 'bg-white/20' : 'bg-black/20'">
              <div class="h-full rounded-full" :class="isDark ? 'bg-white' : 'bg-black'" style="width: 68%"></div>
            </div>
            <div class="text-center font-bold" :class="isDark ? 'text-white' : 'text-black'">68% Bullish</div>
          </div>
          
          <div class="p-4 rounded-lg" :class="isDark ? 'bg-black/50 border border-white/20' : 'bg-gray-50 border border-gray-200'">
            <div class="text-lg font-medium mb-2" :class="isDark ? 'text-white' : 'text-black'">Fear & Greed Index</div>
            <div class="flex justify-center my-2">
              <div class="relative w-32 h-32">
                <!-- Circular gauge (simplified) -->
                <svg class="w-full h-full" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" fill="none" 
                          :stroke="isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)'" stroke-width="10" />
                  <path 
                    d="M50 5 A 45 45 0 0 1 95 50" 
                    fill="none" 
                    :stroke="isDark ? 'white' : 'black'" 
                    stroke-width="10"
                  />
                  <text x="50" y="50" text-anchor="middle" dominant-baseline="middle" 
                        :fill="isDark ? 'white' : 'black'" font-size="15" font-weight="bold">77</text>
                  <text x="50" y="65" text-anchor="middle" dominant-baseline="middle" 
                        :fill="isDark ? 'white' : 'black'" font-size="10">GREED</text>
                </svg>
              </div>
            </div>
            <div class="text-center text-sm" :class="isDark ? 'text-white/70' : 'text-black/70'">Updated daily at market close</div>
          </div>
          
          <div class="p-4 rounded-lg" :class="isDark ? 'bg-black/50 border border-white/20' : 'bg-gray-50 border border-gray-200'">
            <div class="text-lg font-medium mb-2" :class="isDark ? 'text-white' : 'text-black'">Market Volatility</div>
            <div class="flex items-center justify-between mb-1">
              <div class="text-sm" :class="isDark ? 'text-white/70' : 'text-black/70'">Low</div>
              <div class="text-sm" :class="isDark ? 'text-white/70' : 'text-black/70'">High</div>
            </div>
            <div class="h-2 rounded-full overflow-hidden mb-2" :class="isDark ? 'bg-white/20' : 'bg-black/20'">
              <div class="h-full rounded-full" :class="isDark ? 'bg-white' : 'bg-black'" style="width: 32%"></div>
            </div>
            <div class="text-center font-bold mb-2" :class="isDark ? 'text-white' : 'text-black'">VIX: 17.23 (-1.42)</div>
            <div class="text-center text-sm" :class="isDark ? 'text-white/70' : 'text-black/70'">Lower than average volatility</div>
          </div>
        </div>
      </div>
      
      <div class="mt-8 text-center">
        <button :class="isDark ? 'bg-white text-black hover:bg-gray-100' : 'bg-black text-white hover:bg-gray-800'" 
                class="px-8 py-3 rounded-lg transition-colors">View Full Market Analysis</button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useTheme } from '@/composables/useTheme';

// Get theme state
const { isDark } = useTheme();

// Active time period for market overview chart
const activeTimePeriod = ref('1M');

// Sample market indices data
const marketIndices = [
  { name: "DOW", value: "38,254.18", change: 1.05 },
  { name: "NASDAQ", value: "15,927.90", change: 1.60 },
  { name: "RUSSELL 2000", value: "2,026.89", change: -0.58 },
  { name: "10Y TREASURY", value: "4.268", change: 0.23 }
];

// Sample sector performance data
const sectorPerformance = [
  { name: "Technology", change: 2.4 },
  { name: "Healthcare", change: 1.2 },
  { name: "Financials", change: 0.8 },
  { name: "Energy", change: -1.5 },
  { name: "Utilities", change: -0.7 },
  { name: "Real Estate", change: 0.3 }
];

// Sample top performing stocks
const topStocks = [
  { symbol: "NVDA", name: "NVIDIA Corp", change: 5.2 },
  { symbol: "AAPL", name: "Apple Inc", change: 3.8 },
  { symbol: "MSFT", name: "Microsoft", change: 2.9 }
];

// Generate random market path for demonstration
const pointCount = 100;
const marketPoints = Array.from({ length: pointCount }, (_, i) => {
  const x = i;
  // Create a trend with some randomness
  const progress = i / pointCount;
  const trend = 25 - 10 * progress + 5 * Math.sin(progress * Math.PI * 2);
  // Using a deterministic value instead of Math.random() to prevent hydration mismatch
  // Use a seeded pseudo-random function based on the index
  const seedValue = Math.sin(i * 9876) * 10000;
  const deterministicRandom = Math.abs(seedValue - Math.floor(seedValue));
  const noise = deterministicRandom * 3 - 1.5;
  const y = Math.max(0, Math.min(40, trend + noise));
  return { x, y };
});

// Create SVG path for the chart line
const getMarketPath = computed(() => {
  return marketPoints.map((point, i) => 
    `${i === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
  ).join(' ');
});

// Create closed path for the gradient fill area
const getMarketPathClosed = computed(() => {
  return [
    marketPoints.map((point, i) => 
      `${i === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
    ).join(' '),
    `L ${pointCount - 1} 40 L 0 40 Z`
  ].join(' ');
});
</script> 