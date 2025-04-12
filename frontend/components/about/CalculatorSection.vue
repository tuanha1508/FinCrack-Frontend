<template>
  <section :class="isDark ? 'bg-black' : 'bg-white'" class="py-16 px-4">
    <div class="container mx-auto">
      <div class="text-center max-w-3xl mx-auto mb-12">
        <h2 :class="isDark ? 'text-white' : 'text-black'" class="text-3xl font-bold mb-6">Investment Calculator</h2>
        <p :class="isDark ? 'text-white' : 'text-gray-700'" class="text-lg">
          Try our investment growth calculator to see how your investments could grow over time.
        </p>
      </div>
      
      <div class="max-w-4xl mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <!-- Calculator inputs -->
          <div :class="isDark ? 'bg-black border-white' : 'bg-white border-gray-200'" class="lg:col-span-2 p-6 rounded-xl border">
            <div class="space-y-6">
              <div>
                <label :class="isDark ? 'text-white' : 'text-gray-700'" class="block text-sm font-medium mb-2">Initial Investment</label>
                <div class="relative">
                  <span :class="isDark ? 'text-white/70' : 'text-gray-500'" class="absolute inset-y-0 left-0 pl-3 flex items-center">$</span>
                  <input 
                    v-model.number="initialInvestment" 
                    type="number" 
                    :class="isDark ? 'bg-black/50 border-white/30 text-white focus:ring-white' : 'bg-white border-gray-300 text-gray-900 focus:ring-gray-500'"
                    class="w-full pl-8 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
                    placeholder="10000"
                    min="0"
                  />
                </div>
              </div>
              
              <div>
                <label :class="isDark ? 'text-white' : 'text-gray-700'" class="block text-sm font-medium mb-2">Monthly Contribution</label>
                <div class="relative">
                  <span :class="isDark ? 'text-white/70' : 'text-gray-500'" class="absolute inset-y-0 left-0 pl-3 flex items-center">$</span>
                  <input 
                    v-model.number="monthlyContribution" 
                    type="number" 
                    :class="isDark ? 'bg-black/50 border-white/30 text-white focus:ring-white' : 'bg-white border-gray-300 text-gray-900 focus:ring-gray-500'"
                    class="w-full pl-8 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
                    placeholder="500"
                    min="0"
                  />
                </div>
              </div>
              
              <div>
                <label :class="isDark ? 'text-white' : 'text-gray-700'" class="block text-sm font-medium mb-2">Expected Annual Return (%)</label>
                <div class="relative">
                  <input 
                    v-model.number="annualReturn" 
                    type="number" 
                    :class="isDark ? 'bg-black/50 border-white/30 text-white focus:ring-white' : 'bg-white border-gray-300 text-gray-900 focus:ring-gray-500'"
                    class="w-full pl-4 pr-8 py-2 border rounded-lg focus:outline-none focus:ring-2"
                    placeholder="8"
                    min="0"
                    max="100"
                    step="0.1"
                  />
                  <span :class="isDark ? 'text-white/70' : 'text-gray-500'" class="absolute inset-y-0 right-0 pr-3 flex items-center">%</span>
                </div>
              </div>
              
              <div>
                <label :class="isDark ? 'text-white' : 'text-gray-700'" class="block text-sm font-medium mb-2">Investment Period (Years)</label>
                <input 
                  v-model.number="years" 
                  type="range" 
                  min="1" 
                  max="40" 
                  :class="isDark ? 'bg-white/30' : 'bg-gray-300'"
                  class="w-full h-2 rounded-lg appearance-none cursor-pointer"
                />
                <div :class="isDark ? 'text-white' : 'text-gray-700'" class="text-right">{{ years }} years</div>
              </div>
              
              <div>
                <label :class="isDark ? 'text-white' : 'text-gray-700'" class="block text-sm font-medium mb-2">Compound Frequency</label>
                <select 
                  v-model="compoundFrequency" 
                  :class="isDark ? 'bg-black/50 border-white/30 text-white focus:ring-white' : 'bg-white border-gray-300 text-gray-900 focus:ring-gray-500'"
                  class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
                >
                  <option value="1">Annually</option>
                  <option value="4">Quarterly</option>
                  <option value="12">Monthly</option>
                  <option value="365">Daily</option>
                </select>
              </div>
            </div>
          </div>
          
          <!-- Calculator results -->
          <div :class="isDark ? 'bg-black border-white' : 'bg-white border-gray-200'" class="lg:col-span-3 p-6 rounded-xl border">
            <div :class="isDark ? 'bg-black/50 border-white/20' : 'bg-gray-50 border-gray-200'" class="h-64 mb-8 flex items-center justify-center rounded-lg border overflow-hidden">
              <!-- Placeholder for chart -->
              <div class="w-full h-full p-4 flex items-center justify-center">
                <div v-if="totalValue > 0" class="w-full h-full relative">
                  <!-- Simplified chart visualization -->
                  <ClientOnly>
                    <div class="absolute bottom-0 left-0 w-full h-full flex items-end">
                      <!-- Add grid lines for better readability -->
                      <div class="absolute inset-0 grid grid-rows-4 w-full h-full" aria-hidden="true">
                        <div v-for="i in 4" :key="i" class="border-t" :class="isDark ? 'border-white/10' : 'border-black/10'"></div>
                      </div>
                      
                      <div
                        v-for="(value, index) in chartData"
                        :key="index"
                        :class="isDark ? 'bg-gradient-to-t from-white to-white/30' : 'bg-gradient-to-t from-black to-black/30'"
                        class="mx-0.5 rounded-t-sm"
                        :style="{
                          height: `${(value / Math.max(...chartData)) * 100}%`,
                          width: `${100 / chartData.length}%`
                        }"
                      ></div>
                    </div>
                  </ClientOnly>
                </div>
                <div v-else :class="isDark ? 'text-white/50' : 'text-gray-400'" class="text-lg">
                  Enter your investment details to see projected growth
                </div>
              </div>
            </div>
            
            <div class="grid grid-cols-2 gap-6">
              <div :class="isDark ? 'border-white/20 bg-black/50' : 'border-gray-200 bg-gray-50'" class="p-4 rounded-lg border">
                <div :class="isDark ? 'text-white/70' : 'text-gray-500'" class="text-sm mb-1">Total Contributions</div>
                <div :class="isDark ? 'text-white' : 'text-gray-900'" class="text-2xl font-bold">${{ formatCurrency(totalContributions) }}</div>
              </div>
              
              <div :class="isDark ? 'border-white/20 bg-black/50' : 'border-gray-200 bg-gray-50'" class="p-4 rounded-lg border">
                <div :class="isDark ? 'text-white/70' : 'text-gray-500'" class="text-sm mb-1">Interest Earned</div>
                <div :class="isDark ? 'text-white' : 'text-gray-900'" class="text-2xl font-bold">${{ formatCurrency(interestEarned) }}</div>
              </div>
              
              <div :class="isDark ? 'border-white/20 bg-black/50' : 'border-gray-200 bg-gray-50'" class="p-4 rounded-lg border">
                <div :class="isDark ? 'text-white/70' : 'text-gray-500'" class="text-sm mb-1">Final Balance</div>
                <div :class="isDark ? 'text-white' : 'text-gray-900'" class="text-2xl font-bold">${{ formatCurrency(totalValue) }}</div>
              </div>
              
              <div :class="isDark ? 'border-white/20 bg-black/50' : 'border-gray-200 bg-gray-50'" class="p-4 rounded-lg border">
                <div :class="isDark ? 'text-white/70' : 'text-gray-500'" class="text-sm mb-1">Annual Return</div>
                <div :class="isDark ? 'text-white' : 'text-gray-900'" class="text-2xl font-bold">{{ annualReturn }}%</div>
              </div>
            </div>
            
            <div class="mt-6 text-center">
              <button 
                :class="isDark ? 'bg-white text-black hover:bg-gray-100' : 'bg-black text-white hover:bg-gray-800'" 
                class="px-6 py-2 rounded-md font-medium transition-colors">
                Save Calculation
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useTheme } from '@/composables/useTheme'

// Get theme state
const { isDark } = useTheme()

// Form inputs with reactive state
const initialInvestment = ref(10000)
const monthlyContribution = ref(500)
const annualReturn = ref(8)
const years = ref(10)
const compoundFrequency = ref('12') // Monthly compounding by default

// Computed values for the calculator
const totalContributions = computed(() => {
  return initialInvestment.value + (monthlyContribution.value * 12 * years.value)
})

const totalValue = computed(() => {
  // Convert annual rate to rate per period
  const r = annualReturn.value / 100 / parseInt(compoundFrequency.value)
  const n = parseInt(compoundFrequency.value) * years.value
  
  // Calculate future value of initial investment
  let futureValue = initialInvestment.value * Math.pow(1 + r, n)
  
  // Calculate future value of periodic payments
  if (monthlyContribution.value > 0) {
    const monthlyRate = r
    const numberOfContributions = n
    const periodicPayment = monthlyContribution.value * (parseInt(compoundFrequency.value) / 12)
    
    futureValue += periodicPayment * ((Math.pow(1 + monthlyRate, numberOfContributions) - 1) / monthlyRate)
  }
  
  return futureValue
})

const interestEarned = computed(() => {
  return totalValue.value - totalContributions.value
})

// Generate chart data for visualization
const chartData = computed(() => {
  const data = []
  const periods = years.value
  
  for (let year = 0; year <= periods; year++) {
    // Same formula as above but for each year
    const r = annualReturn.value / 100 / parseInt(compoundFrequency.value)
    const n = parseInt(compoundFrequency.value) * year
    
    let value = initialInvestment.value * Math.pow(1 + r, n)
    
    if (monthlyContribution.value > 0) {
      const monthlyRate = r
      const numberOfContributions = n
      const periodicPayment = monthlyContribution.value * (parseInt(compoundFrequency.value) / 12)
      
      value += periodicPayment * ((Math.pow(1 + monthlyRate, numberOfContributions) - 1) / monthlyRate)
    }
    
    data.push(value)
  }
  
  return data
})

// Format currency values
const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value)
}
</script> 