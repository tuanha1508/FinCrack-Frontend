<template>
  <section class="py-16 px-4" :class="isDark ? 'bg-black' : 'bg-white'">
    <div class="container mx-auto">
      <div class="text-center max-w-3xl mx-auto mb-16">
        <h2 class="text-3xl font-bold mb-6" :class="isDark ? 'text-white' : 'text-black'">See FinCrack In Action</h2>
        <p class="text-lg" :class="isDark ? 'text-white' : 'text-black'">
          Explore how our powerful dashboard features can transform your financial decision-making.
        </p>
      </div>
      
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <!-- Demo Feature 1: Dashboard Preview -->
        <div class="flex flex-col">
          <div class="rounded-xl overflow-hidden mb-8 h-[550px] flex flex-col transition-all duration-300 hover:translate-y-[-4px]" 
               :class="isDark ? 'bg-black border border-white/20 shadow-[0_0_35px_rgba(255,255,255,0.08)]' : 'bg-white border border-black/10 shadow-[0_10px_40px_rgba(0,0,0,0.1)]'">
            <!-- Dashboard Header section -->
            <div class="p-4 border-b" :class="isDark ? 'border-white/10' : 'border-black/10'">
              <div class="flex items-center justify-between">
                <h3 class="font-bold text-base" :class="isDark ? 'text-white' : 'text-black'">Financial Dashboard</h3>
                <div class="flex space-x-2">
                  <div class="w-3 h-3 rounded-full bg-red-500"></div>
                  <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div class="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
              </div>
            </div>

            <!-- Dashboard Content -->
            <div class="p-4 flex-1 overflow-y-auto">
              <!-- Company Summary Section -->
              <div class="mb-4 p-3 rounded-lg" :class="isDark ? 'bg-white/5' : 'bg-black/5'">
                <div class="flex items-center gap-3 mb-2">
                  <div class="w-10 h-10 rounded-lg flex items-center justify-center" :class="isDark ? 'bg-white/10' : 'bg-black/10'">
                    <Icon name="lucide:briefcase" class="w-5 h-5" :class="isDark ? 'text-white' : 'text-black'" />
                  </div>
                  <div>
                    <h4 class="font-medium text-sm" :class="isDark ? 'text-white' : 'text-black'">Apple Inc. (AAPL)</h4>
                    <p class="text-xs opacity-70" :class="isDark ? 'text-white' : 'text-black'">NASDAQ • USD</p>
                  </div>
                </div>
                
                <div class="grid grid-cols-3 gap-2 mt-3">
                  <div class="p-2 rounded" :class="isDark ? 'bg-white/10' : 'bg-black/10'">
                    <p class="text-xs opacity-70" :class="isDark ? 'text-white' : 'text-black'">Price</p>
                    <p class="text-sm font-medium" :class="isDark ? 'text-white' : 'text-black'">$174.79</p>
                  </div>
                  <div class="p-2 rounded" :class="isDark ? 'bg-white/10' : 'bg-black/10'">
                    <p class="text-xs opacity-70" :class="isDark ? 'text-white' : 'text-black'">Change</p>
                    <p class="text-sm font-medium text-green-500">+2.4%</p>
                  </div>
                  <div class="p-2 rounded" :class="isDark ? 'bg-white/10' : 'bg-black/10'">
                    <p class="text-xs opacity-70" :class="isDark ? 'text-white' : 'text-black'">Volume</p>
                    <p class="text-sm font-medium" :class="isDark ? 'text-white' : 'text-black'">58.3M</p>
                  </div>
                </div>
              </div>
              
              <!-- Financial Chart -->
              <div class="mb-4 p-3 rounded-lg" :class="isDark ? 'bg-white/5' : 'bg-black/5'">
                <div class="flex justify-between items-center mb-2">
                  <h4 class="text-sm font-medium" :class="isDark ? 'text-white' : 'text-black'">Performance</h4>
                  <div class="flex gap-2">
                    <span class="text-xs py-1 px-2 rounded-full cursor-pointer" :class="isDark ? 'bg-white/10 text-white' : 'bg-black/10 text-black'">1D</span>
                    <span class="text-xs py-1 px-2 rounded-full cursor-pointer" :class="isDark ? 'bg-white/20 text-white' : 'bg-black/20 text-black'">1W</span>
                    <span class="text-xs py-1 px-2 rounded-full cursor-pointer" :class="isDark ? 'bg-white/10 text-white' : 'bg-black/10 text-black'">1M</span>
                  </div>
                </div>
                
                <!-- Chart visualization -->
                <div class="h-32 rounded-md overflow-hidden">
                  <Chart 
                    type="line" 
                    :series="chartSeries"
                    :categories="chartCategories"
                    :options="chartOptions"
                    class="w-full h-full"
                  />
                </div>
              </div>
              
              <!-- Financial Metrics -->
              <div class="mb-4">
                <h4 class="text-sm font-medium mb-2" :class="isDark ? 'text-white' : 'text-black'">Key Metrics</h4>
                <div class="grid grid-cols-2 gap-2">
                  <div class="p-3 rounded-lg" :class="isDark ? 'bg-white/5' : 'bg-black/5'">
                    <p class="text-xs opacity-70" :class="isDark ? 'text-white' : 'text-black'">Market Cap</p>
                    <p class="text-sm font-medium" :class="isDark ? 'text-white' : 'text-black'">$2.75T</p>
                  </div>
                  <div class="p-3 rounded-lg" :class="isDark ? 'bg-white/5' : 'bg-black/5'">
                    <p class="text-xs opacity-70" :class="isDark ? 'text-white' : 'text-black'">P/E Ratio</p>
                    <p class="text-sm font-medium" :class="isDark ? 'text-white' : 'text-black'">28.91</p>
                  </div>
                  <div class="p-3 rounded-lg" :class="isDark ? 'bg-white/5' : 'bg-black/5'">
                    <p class="text-xs opacity-70" :class="isDark ? 'text-white' : 'text-black'">Revenue (TTM)</p>
                    <p class="text-sm font-medium" :class="isDark ? 'text-white' : 'text-black'">$394.33B</p>
                  </div>
                  <div class="p-3 rounded-lg" :class="isDark ? 'bg-white/5' : 'bg-black/5'">
                    <p class="text-xs opacity-70" :class="isDark ? 'text-white' : 'text-black'">Dividend Yield</p>
                    <p class="text-sm font-medium" :class="isDark ? 'text-white' : 'text-black'">0.53%</p>
                  </div>
                </div>
              </div>
              
              <!-- Recommendations Section -->
              <div class="mb-4">
                <h4 class="text-sm font-medium mb-2" :class="isDark ? 'text-white' : 'text-black'">Recommendations</h4>
                <div class="p-3 rounded-lg flex items-center gap-3" :class="isDark ? 'bg-white/5' : 'bg-black/5'">
                  <div class="w-8 h-8 rounded-full flex items-center justify-center bg-green-100">
                    <Icon name="lucide:trending-up" class="w-4 h-4 text-green-600" />
                  </div>
                  <div class="flex-1">
                    <p class="text-sm font-medium" :class="isDark ? 'text-white' : 'text-black'">Buy recommendation</p>
                    <p class="text-xs opacity-70" :class="isDark ? 'text-white' : 'text-black'">Strong growth potential in services segment</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <p class="text-base text-center px-4" :class="isDark ? 'text-white/80' : 'text-black/80'">
            Access comprehensive financial data and personalized recommendations in one intuitive dashboard.
          </p>
        </div>
        
        <!-- Demo Feature 2: Virtual Assistant -->
        <div class="flex flex-col">
          <div class="rounded-xl overflow-hidden mb-8 h-[550px] flex flex-col transition-all duration-300 hover:translate-y-[-4px]" 
               :class="isDark ? 'bg-black border border-white/20 shadow-[0_0_35px_rgba(255,255,255,0.08)]' : 'bg-white border border-black/10 shadow-[0_10px_40px_rgba(0,0,0,0.1)]'">
            <!-- Header section -->
            <div class="p-4 border-b" :class="isDark ? 'border-white/10' : 'border-black/10'">
              <div class="flex items-center justify-between">
                <h3 class="font-bold text-base" :class="isDark ? 'text-white' : 'text-black'">Virtual Financial Assistant</h3>
                <div class="flex space-x-2">
                  <div class="w-3 h-3 rounded-full bg-red-500"></div>
                  <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div class="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
              </div>
            </div>

            <!-- Main content -->
            <div class="p-6 flex-1 flex flex-col">
              <!-- Chat messages container with improved styling -->
              <div class="flex-1 flex flex-col space-y-6 overflow-y-auto">
                <!-- Bot message 1 -->
                <div v-if="visibleMessagesCount >= 1" class="flex gap-4 items-start animate-fadeIn">
                  <div class="w-10 h-10 rounded-full flex items-center justify-center" :class="isDark ? 'bg-white' : 'bg-black'">
                    <Icon name="lucide:bot" class="w-5 h-5" :class="isDark ? 'text-black' : 'text-white'" />
                  </div>
                  <div class="p-4 rounded-lg max-w-[80%] shadow-sm" 
                       :class="isDark ? 'bg-white/10 border border-white/5' : 'bg-black/10 border border-black/5'">
                    <p class="text-sm" :class="isDark ? 'text-white' : 'text-black'">
                      Hello! I'm your financial assistant. How can I help you today?
                    </p>
                  </div>
                </div>
                
                <!-- User message -->
                <div v-if="visibleMessagesCount >= 2" class="flex gap-4 items-start justify-end animate-fadeIn">
                  <div class="p-4 rounded-lg max-w-[80%] shadow-sm" 
                       :class="isDark ? 'bg-white/20 border border-white/10' : 'bg-black border border-black/20'">
                    <p class="text-sm" :class="isDark ? 'text-white' : 'text-white'">
                      How can I reduce my monthly expenses?
                    </p>
                  </div>
                  <div class="w-10 h-10 rounded-full flex items-center justify-center shadow-sm" :class="isDark ? 'bg-white/80' : 'bg-black/80'">
                    <span class="text-xs font-medium" :class="isDark ? 'text-black' : 'text-white'">You</span>
                  </div>
                </div>
                
                <!-- Bot message 2 -->
                <div v-if="visibleMessagesCount >= 3" class="flex gap-4 items-start animate-fadeIn">
                  <div class="w-10 h-10 rounded-full flex items-center justify-center" :class="isDark ? 'bg-white' : 'bg-black'">
                    <Icon name="lucide:bot" class="w-5 h-5" :class="isDark ? 'text-black' : 'text-white'" />
                  </div>
                  <div class="p-4 rounded-lg max-w-[80%] shadow-sm" 
                       :class="isDark ? 'bg-white/10 border border-white/5' : 'bg-black/10 border border-black/5'">
                    <p class="text-sm" :class="isDark ? 'text-white' : 'text-black'">
                      Based on your spending, I see opportunities to save on subscriptions. You're currently spending $95/month on services you rarely use. Would you like to see a breakdown?
                    </p>
                  </div>
                </div>
              </div>
              
              <!-- Message input area -->
              <div class="mt-6">
                <div class="relative flex items-center">
                  <input
                    type="text"
                    placeholder="Type your message..."
                    class="w-full px-4 py-2 pr-16 rounded-full text-sm focus:outline-none transition-all"
                    :class="isDark ? 'bg-white/5 border border-white/10 text-white focus:border-white/30' : 'bg-black/5 border border-black/10 text-black focus:border-black/30'"
                    readonly
                  />
                  <button 
                    class="absolute right-2 w-6 h-6 rounded-full flex items-center justify-center transition-all shadow-sm"
                    :class="isDark ? 'bg-white text-black hover:bg-white/90' : 'bg-black text-white hover:bg-black/90'"
                  >
                    <Icon name="lucide:send" class="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <p class="text-base text-center px-4" :class="isDark ? 'text-white/80' : 'text-black/80'">
            Get personalized financial advice and insights with our AI-powered assistant.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useTheme } from '@/composables/useTheme';
import { computed, ref, onMounted, onUnmounted } from 'vue';
import Chart from '@/components/ui/chart/Chart.vue';

// Get theme state
const { isDark } = useTheme();

// State for controlling message visibility
const visibleMessagesCount = ref(0);
const totalMessages = 3; // Total number of messages in the demo
let messageInterval: NodeJS.Timeout | null = null;

// Function to show messages sequentially
const showMessages = () => {
  if (visibleMessagesCount.value < totalMessages) {
    visibleMessagesCount.value++;
  } else {
    // Optional: Reset or stop after all messages are shown
    if (messageInterval) clearInterval(messageInterval);
  }
};

// Start the interval when the component is mounted
onMounted(() => {
  visibleMessagesCount.value = 0; // Reset on mount
  messageInterval = setInterval(showMessages, 1500); // Show a new message every 1.5 seconds
});

// Clear the interval when the component is unmounted
onUnmounted(() => {
  if (messageInterval) clearInterval(messageInterval);
});

// Define chart data with Neon Green color
const chartSeries = computed(() => [
  {
    name: 'Monthly Expenses',
    data: [3200, 2800, 3800, 3000, 4200, 3600, 3900],
    // Neon Green Color Scheme
    borderColor: '#39FF14', // Neon green line
    backgroundColor: 'rgba(57, 255, 20, 0.1)', // Transparent neon green fill
    pointBackgroundColor: '#39FF14', // Neon green points
    pointBorderColor: '#39FF14', // Neon green point border
    pointHoverBackgroundColor: '#39FF14', // Neon green hover points
    pointHoverBorderColor: 'rgba(57, 255, 20, 0.8)', // Slightly less transparent border on hover
    borderWidth: 2,
    pointBorderWidth: 1,
    pointHoverBorderWidth: 2,
    pointRadius: 4,
    pointHoverRadius: 6,
    fill: true,
    tension: 0.4,
  }
]);

const chartCategories = computed(() => ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']);

// Adapt chart options for the Chart.vue component, ensuring theme reactivity
const chartOptions = computed(() => ({
  animation: {
    duration: 1200,
    easing: 'easeInOutQuart'
  },
  plugins: {
    legend: {
      display: false
    },
    tooltip: {
      // Keep tooltip theme-adaptive for readability
      backgroundColor: isDark.value ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.9)', 
      titleColor: isDark.value ? '#FFFFFF' : '#000000',
      bodyColor: isDark.value ? '#FFFFFF' : '#000000',
      bodyFont: {
        family: 'Inter, sans-serif',
        size: 12
      },
      titleFont: {
        family: 'Inter, sans-serif',
        size: 14,
        weight: 'bold'
      },
      padding: 12,
      cornerRadius: 8,
      displayColors: false, // Don't show the neon green square in tooltip
      borderColor: isDark.value ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)',
      borderWidth: 1,
      callbacks: {
        label: (context: any) => `$${context.raw.toLocaleString()}`,
        title: (items: any) => items.length > 0 ? `${chartSeries.value[items[0].datasetIndex].name} - ${items[0].label}` : ''
      }
    }
  },
  scales: {
    x: {
      grid: {
        display: false
      },
      ticks: {
        color: isDark.value ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
        font: {
          family: 'Inter, sans-serif', 
          size: 10
        },
        maxRotation: 0
      },
      border: {
        display: false
      }
    },
    y: {
      grid: {
        color: isDark.value ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        drawTicks: false,
        borderDash: [5, 5]
      },
      ticks: {
        padding: 10,
        color: isDark.value ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
        font: {
          family: 'Inter, sans-serif',
          size: 10
        },
        callback: (value: number) => `$${Math.round(value/1000)}K`
      },
      border: {
        display: false
      },
      beginAtZero: true
    }
  },
  elements: {
    line: {
      borderWidth: 2,
      borderJoinStyle: 'round'
    },
    point: {
      hitRadius: 10
    }
  },
  interaction: {
    mode: 'index',
    intersect: false
  },
  hover: {
    mode: 'index',
    intersect: false
  }
}));
</script>

<style scoped>
.animate-fadeIn {
  opacity: 0;
  animation: fadeIn 0.5s ease-in-out forwards;
  animation-delay: var(--delay, 0s);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style> 